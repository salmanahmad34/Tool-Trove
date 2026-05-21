import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Clock, Sparkles, ChevronRight, TrendingUp,
  BookOpen, ArrowUpRight, Star, BarChart2, Zap, User,
  RefreshCw, ArrowRight, History
} from 'lucide-react';
import {
  getTopTools, getUserRecentTools, getUserFavoriteCategory,
  getRelatedTools, hasUserActivity, getTotalVisits,
  DEFAULT_POPULAR_TOOLS, CATEGORY_META
} from '../utils/usageTracker';
import { INSIGHTS_ARTICLES } from './BlogData';

// ── Category dot color helper ──────────────────────────────
function CategoryDot({ category }) {
  const meta = CATEGORY_META[category];
  return meta ? (
    <span className={`inline-block w-2 h-2 rounded-full ${meta.dot} shrink-0`} />
  ) : null;
}

function CategoryBadge({ category }) {
  const meta = CATEGORY_META[category];
  if (!meta) return null;
  return (
    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border ${meta.color} uppercase tracking-wider`}>
      {meta.label}
    </span>
  );
}

// ── Tool Card — reusable small card ───────────────────────
function ToolCard({ tool, index, showRank = false, showLastUsed = false }) {
  const navigate = useNavigate();
  const path = tool.path || `/${tool.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

  const lastUsedLabel = tool.lastUsed || tool.visitedAt
    ? (() => {
        const d = new Date(tool.lastUsed || tool.visitedAt);
        const diff = Math.floor((Date.now() - d) / 60000);
        if (diff < 1) return 'Just now';
        if (diff < 60) return `${diff}m ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
        return `${Math.floor(diff / 1440)}d ago`;
      })()
    : null;

  return (
    <motion.button
      key={tool.name}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      onClick={() => navigate(path)}
      className="group w-full text-left p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-orange-300 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 relative overflow-hidden"
    >
      {/* Rank badge */}
      {showRank && (
        <span className="absolute top-2 right-2 text-[9px] font-black text-slate-300 uppercase tracking-widest">
          #{index + 1}
        </span>
      )}

      {/* Category color dot */}
      <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${CATEGORY_META[tool.category]?.color?.split(' ').filter(c => c.startsWith('bg-')).join(' ') || 'bg-slate-100'}`}>
        <CategoryDot category={tool.category} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-black text-sm text-slate-800 group-hover:text-orange-500 transition-colors truncate leading-tight">
          {tool.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {showLastUsed && lastUsedLabel ? (
            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5" /> {lastUsedLabel}
            </span>
          ) : (
            <CategoryBadge category={tool.category} />
          )}
          {tool.visits > 1 && (
            <span className="text-[10px] text-slate-400 font-bold">· {tool.visits} uses</span>
          )}
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all shrink-0" />

      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-orange-50/0 group-hover:to-orange-50/60 transition-all rounded-2xl pointer-events-none" />
    </motion.button>
  );
}

// ════════════════════════════════════════════════════════════
// SECTION A — 🔥 Trending / Popular Tools
// ════════════════════════════════════════════════════════════
function TrendingToolsSection() {
  const [topTools, setTopTools] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    setTopTools(getTopTools(12));
  }, []);

  const categories = ['all', 'docs', 'business', 'media', 'security', 'developer'];

  const filtered = activeFilter === 'all'
    ? topTools
    : topTools.filter(t => t.category === activeFilter);

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-[#FDFBF7] to-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5 animate-pulse" /> Trending in Jungle
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Most Popular <span className="text-orange-500">Tools</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-semibold">
              Tools our jungle explorers reach for every single day.
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                  activeFilter === cat
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {cat === 'all' ? '🌿 All' : CATEGORY_META[cat]?.label || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {filtered.slice(0, 8).map((tool, idx) => (
              <ToolCard key={tool.name} tool={tool} index={idx} showRank={true} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/tools/pdf')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-100 hover:scale-105"
          >
            Explore All Tools <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// SECTION B — 👤 Aapki Activity (Personalized — conditional)
// ════════════════════════════════════════════════════════════
function PersonalizedActivitySection() {
  const [recentTools, setRecentTools] = useState([]);
  const [favCategory, setFavCategory] = useState(null);
  const [relatedTools, setRelatedTools] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [hasActivity, setHasActivity] = useState(false);
  const navigate = useNavigate();

  const refresh = useCallback(() => {
    const activity = hasUserActivity();
    setHasActivity(activity);
    if (!activity) return;

    const recent = getUserRecentTools(6);
    const fav = getUserFavoriteCategory();
    const visits = getTotalVisits();

    setRecentTools(recent);
    setFavCategory(fav);
    setTotalVisits(visits);

    // Related tools: based on most recently used tool
    if (recent.length > 0) {
      const related = getRelatedTools(recent[0].name)
        .slice(0, 4)
        .map(name => {
          // Find category for this related tool
          const found = DEFAULT_POPULAR_TOOLS.find(t => t.name === name);
          return found || { name, category: 'docs', path: `/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` };
        });
      setRelatedTools(related);
    }
  }, []);

  useEffect(() => {
    refresh();
    // Re-check on window focus (user might have used a tool in another tab)
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, [refresh]);

  // Don't render if no activity yet
  if (!hasActivity) return null;

  const favMeta = favCategory ? CATEGORY_META[favCategory] : null;

  return (
    <section className="py-16 px-6 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-600 border border-violet-100 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
              <User className="w-3.5 h-3.5" /> Your Activity
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Welcome Back, <span className="text-orange-500">Explorer!</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-semibold">
              Personalized for you · {totalVisits} tool {totalVisits === 1 ? 'visit' : 'visits'} tracked
            </p>
          </div>

          {/* Fav category badge */}
          {favMeta && (
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border ${favMeta.color} text-sm font-black`}>
              <Star className="w-4 h-4" />
              <span>Favourite: {favMeta.label}</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left: Recently Used Tools */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Recently Used</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {recentTools.slice(0, 6).map((tool, idx) => (
                <ToolCard key={tool.name + idx} tool={tool} index={idx} showLastUsed={true} />
              ))}
            </div>
          </div>

          {/* Right: Related / You Might Like */}
          {relatedTools.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">You Might Like</h3>
              </div>
              <div className="space-y-3">
                {relatedTools.map((tool, idx) => (
                  <ToolCard key={tool.name + idx} tool={tool} index={idx} />
                ))}
              </div>

              {/* Mascot tip box */}
              <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                  <span className="text-orange-600 font-black block mb-1">🦉 Wise Owl Tip</span>
                  Based on your recent tools, these companions will supercharge your workflow!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Tools Used', value: Object.keys(getUserRecentTools(100)).length || recentTools.length, icon: <Zap className="w-4 h-4" /> },
            { label: 'Total Visits', value: totalVisits, icon: <BarChart2 className="w-4 h-4" /> },
            { label: 'Fav Category', value: favMeta?.label?.split(' ')[0] || '—', icon: <Star className="w-4 h-4" /> },
            { label: 'Tools Available', value: '40+', icon: <TrendingUp className="w-4 h-4" /> },
          ].map((stat, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl text-orange-500 shadow-sm shrink-0">{stat.icon}</div>
              <div>
                <p className="text-lg font-black text-slate-900">{stat.value}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// SECTION C — 📰 Recent Blogs (Top 3, compact)
// ════════════════════════════════════════════════════════════
function RecentBlogsBar() {
  const navigate = useNavigate();
  // Show the 3 most recent articles (first 3 in the array)
  const recent = INSIGHTS_ARTICLES.slice(0, 3);

  return (
    <section className="px-6 py-10 bg-gradient-to-r from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Label */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <BookOpen className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Latest From Blog</p>
              <h3 className="text-white font-black text-lg">Fresh Chronicles</h3>
            </div>
          </div>

          {/* Blog cards — horizontal scroll on mobile */}
          <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none flex-1">
            {recent.map((article, idx) => (
              <motion.button
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(`/blog/${article.id}`)}
                className="group flex-shrink-0 w-64 text-left p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-orange-400/40 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black border ${article.color} uppercase tracking-wider`}>
                    {article.category}
                  </span>
                  {idx === 0 && (
                    <span className="px-2 py-0.5 bg-orange-500 text-white rounded-lg text-[9px] font-black uppercase tracking-wider animate-pulse">
                      New
                    </span>
                  )}
                </div>
                <p className="text-white font-bold text-xs leading-snug group-hover:text-orange-300 transition-colors line-clamp-2 mb-2">
                  {article.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                  <span>{article.readTime}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-orange-400 group-hover:rotate-45 transition-all" />
                </div>
              </motion.button>
            ))}
          </div>

          {/* View all blogs */}
          <button
            onClick={() => navigate('/blog')}
            className="shrink-0 px-5 py-3 bg-orange-500 text-white font-bold text-sm rounded-2xl hover:bg-orange-400 transition-all shadow-lg hover:shadow-orange-500/20 hover:scale-105 flex items-center gap-2 whitespace-nowrap"
          >
            All Articles <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN EXPORT — combine all 3 sections
// ════════════════════════════════════════════════════════════
export { TrendingToolsSection, PersonalizedActivitySection, RecentBlogsBar };
