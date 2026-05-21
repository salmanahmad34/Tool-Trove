import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackScrollDepth, trackToolUsage } from '../utils/analytics';
import { recordToolVisit } from '../utils/usageTracker';

// All known tools — mirrors CATEGORIES in App.jsx (kept here to avoid circular import)
const ALL_TOOLS_FLAT = [
  // docs
  { name: 'PDF Merge', cat: 'docs' }, { name: 'PDF Split', cat: 'docs' },
  { name: 'PDF Compressor', cat: 'docs' }, { name: 'PDF to Word', cat: 'docs' },
  { name: 'Image to PDF', cat: 'docs' }, { name: 'PDF to Image', cat: 'docs' },
  { name: 'OCR Document Scanner', cat: 'docs' }, { name: 'Resume Builder', cat: 'docs' },
  // business
  { name: 'EMI Calculator', cat: 'business' }, { name: 'GST Calculator', cat: 'business' },
  { name: 'Invoice Generator', cat: 'business' }, { name: 'Currency Converter', cat: 'business' },
  { name: 'Loan Calculator', cat: 'business' }, { name: 'SIP Calculator', cat: 'business' },
  // security
  { name: 'Password Generator', cat: 'security' }, { name: 'Hash Generator', cat: 'security' },
  { name: 'URL Encoder', cat: 'security' }, { name: 'QR Scanner', cat: 'security' },
  // media
  { name: 'Background Remover', cat: 'media' }, { name: 'Image Compressor', cat: 'media' },
  { name: 'Image Resizer', cat: 'media' }, { name: 'QR Generator', cat: 'media' },
  { name: 'Meme Generator', cat: 'media' }, { name: 'Format Converter', cat: 'media' },
  { name: 'Image Cropper', cat: 'media' }, { name: 'AI Upscaler', cat: 'media' },
  // developer
  { name: 'JSON Formatter', cat: 'developer' }, { name: 'Base64 Encoder/Decoder', cat: 'developer' },
  { name: 'Regex Tester', cat: 'developer' }, { name: 'Code Minifier', cat: 'developer' },
  { name: 'UUID Generator', cat: 'developer' }, { name: 'Color Picker', cat: 'developer' },
  { name: 'Code Beautifier', cat: 'developer' }, { name: 'Markdown Previewer', cat: 'developer' },
];

function toCleanPath(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function findToolByCleanPath(cleanPath) {
  const norm = cleanPath.toLowerCase();
  return ALL_TOOLS_FLAT.find(t => toCleanPath(t.name) === norm) || null;
}

export default function AnalyticsTracker() {
  const location = useLocation();
  const milestonesTracked = useRef({ '25': false, '50': false, '75': false, '100': false });
  const currentPagePath = useRef('');

  // --- 1. Track virtual PageViews and Auto-Detect Tool Usage ---
  useEffect(() => {
    const path = location.pathname;
    // Log pageview
    trackPageView(path);
    
    // Dynamic Tool Usage Auto-detection
    const parts = path.split('/').filter(Boolean);
    if (parts.length > 0) {
      if (parts[0] === 'tools' && parts.length >= 3) {
        // e.g. /tools/document/compress-pdf
        const category = parts[1];
        const toolId = parts[2];
        trackToolUsage(toolId, category);
      } else if (parts.length === 1 && !['about', 'contact', 'privacy', 'terms', 'disclaimer', 'blog'].includes(parts[0])) {
        // e.g. /compress-pdf (clean path clean url tools)
        trackToolUsage(parts[0], 'clean_url');
      }
    }

    // --- localStorage Personalization Tracking ---
    // Match the current path to a known tool and record it
    const cleanPath = parts[parts.length - 1]; // last segment
    if (cleanPath && !['about', 'contact', 'privacy', 'terms', 'disclaimer', 'blog', ''].includes(cleanPath)) {
      const match = findToolByCleanPath(cleanPath);
      if (match) {
        const toolPath = '/' + toCleanPath(match.name);
        recordToolVisit(match.name, match.cat, toolPath);
      }
    }

    // Reset scroll depth tracking milestones for the new page route
    milestonesTracked.current = { '25': false, '50': false, '75': false, '100': false };
    currentPagePath.current = path;
  }, [location]);


  // --- 2. Track Scroll Depths Throttled Observers (25%, 50%, 75%, 100%) ---
  useEffect(() => {
    let throttleTimeout = null;

    const handleScroll = () => {
      if (throttleTimeout) return;

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
        
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return; // Prevent divide by zero on short pages

        const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
        const title = document.title;
        const milestones = [25, 50, 75, 100];

        milestones.forEach((milestone) => {
          if (scrollPercent >= milestone && !milestonesTracked.current[milestone]) {
            // Mark as tracked
            milestonesTracked.current[milestone] = true;
            // Dispatch GA/Clarity event
            trackScrollDepth(milestone, title);
          }
        });
      }, 300); // 300ms throttle interval is perfect for performance
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [location.pathname]); // Re-bind handles on path change so titles update correctly

  return null; // pure logical analytics helper
}
