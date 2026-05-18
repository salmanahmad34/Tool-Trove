import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Dynamic SEO and JSON-LD Schema Manager
 * Updates page title, meta tags, canonical link, and injects structured schema on change.
 */
export default function SEOManager({ 
  title, 
  description, 
  canonicalPath = "", 
  schema = null 
}) {
  const location = useLocation();
  const baseUrl = "https://www.tooltrove.space";
  const fullCanonicalUrl = `${baseUrl}${canonicalPath || location.pathname}`;

  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title 
      ? `${title} | ToolTrove — 100% Free AI Utilities`
      : "ToolTrove — 150+ Free Online AI Tools & Developer Utilities";
    document.title = formattedTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description || "India's #1 free online tool platform. 150+ professional tools — PDF tools, AI writing, developer utilities, images & more. 100% client-side safe.");

    // 3. Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonicalUrl);

    // 4. Update Open Graph Elements
    updateMetaTag('property="og:title"', formattedTitle);
    updateMetaTag('property="og:description"', description);
    updateMetaTag('property="og:url"', fullCanonicalUrl);

    // 5. Inject dynamic JSON-LD Structured Data Schema
    let scriptSchema = document.getElementById('dynamic-ld-json');
    if (scriptSchema) {
      scriptSchema.remove();
    }

    if (schema) {
      scriptSchema = document.createElement('script');
      scriptSchema.id = 'dynamic-ld-json';
      scriptSchema.type = 'application/ld+json';
      scriptSchema.innerHTML = JSON.stringify(schema);
      document.head.appendChild(scriptSchema);
    }

    // Clean up schema on unmount to keep DOM clean
    return () => {
      const existing = document.getElementById('dynamic-ld-json');
      if (existing) existing.remove();
    };
  }, [title, description, fullCanonicalUrl, schema]);

  // Helper to safely set meta attribute values
  const updateMetaTag = (selector, value) => {
    if (!value) return;
    let element = document.querySelector(`meta[${selector}]`);
    if (!element) {
      const parts = selector.split('=');
      element = document.createElement('meta');
      element.setAttribute(parts[0].trim(), parts[1].replace(/"/g, '').trim());
      document.head.appendChild(element);
    }
    element.setAttribute('content', value);
  };

  return null; // Side-effect only component
}
