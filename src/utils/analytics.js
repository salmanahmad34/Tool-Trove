// --- Safe Google Analytics & Microsoft Clarity Wrapper ---
// Bypasses console errors if tracking endpoints are blocked by browser adblock extensions.

/**
 * Log page view virtual routes inside the SPA
 */
export function trackPageView(path) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href
    });
    console.log(`[Analytics] Tracked PageView: ${path}`);
  }
}

/**
 * Log when a specific converter, creator, or calculator is utilized
 */
export function trackToolUsage(toolId, category) {
  if (typeof window !== 'undefined') {
    // 1. Google Analytics Event
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'use_tool', {
        tool_id: toolId,
        tool_category: category,
        event_category: 'Engagement',
        event_label: `Tool: ${toolId}`
      });
    }

    // 2. Microsoft Clarity Custom Tag
    if (typeof window.clarity === 'function') {
      window.clarity('set', 'tool_used', toolId);
      window.clarity('set', 'tool_category', category);
    }
    console.log(`[Analytics] Tracked Tool Usage: ${toolId} (${category})`);
  }
}

/**
 * Log search entries in the blog or main sandbox
 */
export function trackSearch(query, section = 'general') {
  if (!query || query.trim() === '') return;
  
  if (typeof window !== 'undefined') {
    // 1. Google Analytics Event
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'search', {
        search_term: query,
        search_section: section
      });
    }

    // 2. Microsoft Clarity Custom Tag
    if (typeof window.clarity === 'function') {
      window.clarity('set', 'search_term', query);
      window.clarity('set', 'search_section', section);
    }
    console.log(`[Analytics] Tracked Search: "${query}" in section ${section}`);
  }
}

/**
 * Log interactions like copy links, downloads, and shares
 */
export function trackInteraction(action, label) {
  if (typeof window !== 'undefined') {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'interaction', {
        interaction_action: action,
        interaction_label: label,
        event_category: 'Interaction'
      });
    }
    console.log(`[Analytics] Tracked Interaction: ${action} -> ${label}`);
  }
}

/**
 * Log scroll depth threshold milestones (25%, 50%, 75%, 100%)
 */
export function trackScrollDepth(depthPercentage, title) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'scroll_depth', {
      depth: depthPercentage,
      page_title: title,
      event_category: 'Engagement',
      event_label: `Scrolled: ${depthPercentage}%`
    });
    console.log(`[Analytics] Tracked Scroll Depth: ${depthPercentage}% on "${title}"`);
  }
}
