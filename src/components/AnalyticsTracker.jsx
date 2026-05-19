import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackScrollDepth, trackToolUsage } from '../utils/analytics';

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
