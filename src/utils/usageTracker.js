// ============================================================
// ToolTrove Usage Tracker — localStorage-based Personalization
// Tracks tool visits per browser session. No backend needed.
// ============================================================

const STATS_KEY = 'tt_tool_stats';     // Per-tool visit counts
const RECENT_KEY = 'tt_recent_tools';   // Ordered recent tool list
const MAX_RECENT = 12;                   // Max recent tools to store

// --- Default "Popular" tools (shown before any real data exists) ---
export const DEFAULT_POPULAR_TOOLS = [
  { name: 'Invoice Generator',      category: 'business', path: '/invoice-generator' },
  { name: 'PDF Merge',              category: 'docs',     path: '/pdf-merge' },
  { name: 'Background Remover',     category: 'media',    path: '/background-remover' },
  { name: 'Password Generator',     category: 'security', path: '/password-generator' },
  { name: 'EMI Calculator',         category: 'business', path: '/emi-calculator' },
  { name: 'Image Compressor',       category: 'media',    path: '/image-compressor' },
  { name: 'JSON Formatter',         category: 'developer',path: '/json-formatter' },
  { name: 'QR Generator',           category: 'media',    path: '/qr-generator' },
  { name: 'GST Calculator',         category: 'business', path: '/gst-calculator' },
  { name: 'PDF Compressor',         category: 'docs',     path: '/pdf-compressor' },
  { name: 'Resume Builder',         category: 'docs',     path: '/resume-builder' },
  { name: 'Hash Generator',         category: 'security', path: '/hash-generator' },
];

// Category metadata for display
export const CATEGORY_META = {
  docs:      { label: 'PDF Tools',       color: 'text-[#ff5c1a] bg-[#ff5c1a]/10 border-[#ff5c1a]/30', dot: 'bg-[#ff5c1a]' },
  business:  { label: 'Business Tools',  color: 'text-[#d97706] bg-[#d97706]/10 border-[#d97706]/30', dot: 'bg-[#d97706]' },
  security:  { label: 'Security Tools',  color: 'text-[#7c3aed] bg-[#7c3aed]/10 border-[#7c3aed]/30', dot: 'bg-[#7c3aed]' },
  media:     { label: 'Image Tools',     color: 'text-[#059669] bg-[#059669]/10 border-[#059669]/30', dot: 'bg-[#059669]' },
  developer: { label: 'Developer Tools', color: 'text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/30', dot: 'bg-[#3b82f6]' },
};

// Related tools map — for "You might also like" section
const RELATED_MAP = {
  'Invoice Generator':      ['GST Calculator', 'Currency Converter', 'PDF Merge'],
  'EMI Calculator':         ['Loan Calculator', 'SIP Calculator', 'GST Calculator'],
  'GST Calculator':         ['Invoice Generator', 'EMI Calculator', 'Currency Converter'],
  'SIP Calculator':         ['EMI Calculator', 'Loan Calculator', 'Currency Converter'],
  'Currency Converter':     ['EMI Calculator', 'GST Calculator', 'Invoice Generator'],
  'Loan Calculator':        ['EMI Calculator', 'SIP Calculator', 'GST Calculator'],
  'PDF Merge':              ['PDF Split', 'PDF Compressor', 'PDF to Word'],
  'PDF Split':              ['PDF Merge', 'PDF Compressor', 'PDF to Image'],
  'PDF Compressor':         ['PDF Merge', 'Image Compressor', 'PDF to Word'],
  'PDF to Word':            ['PDF Merge', 'OCR Document Scanner', 'Resume Builder'],
  'Image to PDF':           ['PDF Merge', 'PDF Compressor', 'Image Compressor'],
  'PDF to Image':           ['Image Compressor', 'Image Resizer', 'Format Converter'],
  'OCR Document Scanner':   ['PDF to Word', 'PDF Merge', 'Resume Builder'],
  'Resume Builder':         ['Invoice Generator', 'OCR Document Scanner', 'PDF Merge'],
  'Background Remover':     ['Image Compressor', 'Format Converter', 'Image Resizer'],
  'Image Compressor':       ['Background Remover', 'Image Resizer', 'Format Converter'],
  'Image Resizer':          ['Image Compressor', 'Image Cropper', 'Format Converter'],
  'QR Generator':           ['Password Generator', 'URL Encoder', 'QR Scanner'],
  'Meme Generator':         ['Image Resizer', 'Image Compressor', 'Background Remover'],
  'Format Converter':       ['Image Compressor', 'Background Remover', 'Image Resizer'],
  'Image Cropper':          ['Image Resizer', 'Image Compressor', 'Background Remover'],
  'AI Upscaler':            ['Image Compressor', 'Image Resizer', 'Format Converter'],
  'Password Generator':     ['Hash Generator', 'URL Encoder', 'QR Generator'],
  'Hash Generator':         ['Password Generator', 'URL Encoder', 'QR Scanner'],
  'URL Encoder':            ['Password Generator', 'Hash Generator', 'QR Generator'],
  'QR Scanner':             ['QR Generator', 'URL Encoder', 'Hash Generator'],
  'JSON Formatter':         ['Base64 Encoder/Decoder', 'Regex Tester', 'Code Minifier'],
  'Base64 Encoder/Decoder': ['JSON Formatter', 'URL Encoder', 'Hash Generator'],
  'Regex Tester':           ['JSON Formatter', 'Code Minifier', 'Code Beautifier'],
  'Code Minifier':          ['Code Beautifier', 'JSON Formatter', 'Regex Tester'],
  'UUID Generator':         ['Password Generator', 'Hash Generator', 'Base64 Encoder/Decoder'],
  'Color Picker':           ['Meme Generator', 'Image Resizer', 'Format Converter'],
  'Code Beautifier':        ['Code Minifier', 'JSON Formatter', 'Regex Tester'],
  'Markdown Previewer':     ['Code Beautifier', 'JSON Formatter', 'Resume Builder'],
};

// --- Read stats safely ---
function readStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

// --- Write stats safely ---
function writeStats(stats) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch {}
}

// --- Read recent list ---
function readRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

// --- Write recent list ---
function writeRecent(list) {
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch {}
}

// ============================================================
// PUBLIC API
// ============================================================

/**
 * Call this whenever a user visits / uses a tool.
 * @param {string} toolName — exact tool name from CATEGORIES
 * @param {string} category — category id (docs, business, etc.)
 * @param {string} path     — clean URL path e.g. /invoice-generator
 */
export function recordToolVisit(toolName, category, path) {
  if (!toolName || !category) return;

  // 1. Update stats
  const stats = readStats();
  if (!stats[toolName]) {
    stats[toolName] = { visits: 0, category, path, lastUsed: null };
  }
  stats[toolName].visits += 1;
  stats[toolName].lastUsed = new Date().toISOString();
  stats[toolName].path = path || stats[toolName].path;
  writeStats(stats);

  // 2. Update recent list (most recent first, no duplicates)
  const recent = readRecent().filter(t => t.name !== toolName);
  recent.unshift({ name: toolName, category, path, visitedAt: new Date().toISOString() });
  writeRecent(recent.slice(0, MAX_RECENT));
}

/**
 * Returns top N most-visited tools (from localStorage).
 * Falls back to DEFAULT_POPULAR_TOOLS if not enough data.
 */
export function getTopTools(n = 8) {
  const stats = readStats();
  const tracked = Object.entries(stats)
    .sort(([, a], [, b]) => b.visits - a.visits)
    .slice(0, n)
    .map(([name, data]) => ({ name, ...data }));

  if (tracked.length >= n) return tracked;

  // Merge with defaults to fill up to n
  const trackedNames = new Set(tracked.map(t => t.name));
  const extras = DEFAULT_POPULAR_TOOLS
    .filter(t => !trackedNames.has(t.name))
    .slice(0, n - tracked.length);

  return [...tracked, ...extras];
}

/**
 * Returns the user's N most recently visited tools.
 */
export function getUserRecentTools(n = 4) {
  return readRecent().slice(0, n);
}

/**
 * Returns the user's most-used category id.
 */
export function getUserFavoriteCategory() {
  const stats = readStats();
  if (Object.keys(stats).length === 0) return null;
  const catCounts = {};
  Object.values(stats).forEach(({ category, visits }) => {
    catCounts[category] = (catCounts[category] || 0) + visits;
  });
  return Object.entries(catCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || null;
}

/**
 * Returns related tools for a given tool name.
 */
export function getRelatedTools(toolName) {
  return RELATED_MAP[toolName] || [];
}

/**
 * Returns true if the user has any tracking data (has used at least 1 tool).
 */
export function hasUserActivity() {
  return readRecent().length > 0;
}

/**
 * Returns total number of tool visits by this user.
 */
export function getTotalVisits() {
  const stats = readStats();
  return Object.values(stats).reduce((sum, t) => sum + t.visits, 0);
}
