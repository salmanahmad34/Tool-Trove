import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, BookOpen, Clock, Calendar, ArrowLeft, ArrowRight, 
  ChevronRight, HelpCircle, User, Tag, Heart, List, 
  ExternalLink, Lightbulb, Share2, Sparkles, Filter 
} from 'lucide-react';
import SEOManager from '../components/SEOManager';
import { INSIGHTS_ARTICLES } from '../components/BlogData';
import { trackSearch, trackInteraction } from '../utils/analytics';

// Helper to clean up category paths matching primary routes
const getCategoryPath = (cat) => {
  const norm = cat.toLowerCase();
  if (norm.includes('pdf')) return 'pdf';
  if (norm.includes('image')) return 'image';
  if (norm.includes('business')) return 'business';
  if (norm.includes('security')) return 'security';
  if (norm.includes('developer') || norm.includes('dev')) return 'developer';
  return 'pdf';
};

// ==================== 1. BLOG HOME PAGE OVERVIEW ====================
export function BlogPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Debounced search query tracker to prevent analytics spamming
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') return;
    const timer = setTimeout(() => {
      trackSearch(searchQuery, 'blog_search');
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Available Categories
  const categories = ['All', 'PDF Tools', 'AI Tools', 'Image Tools', 'Business Tools', 'Productivity'];

  // Filter and Search Articles
  const filteredArticles = INSIGHTS_ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.some(sec => sec.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) || sec.paragraph.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Featured Article (e.g. latest article or first match)
  const featuredArticle = searchQuery === '' && selectedCategory === 'All' ? INSIGHTS_ARTICLES[0] : null;
  const regularArticles = featuredArticle 
    ? filteredArticles.filter(a => a.id !== featuredArticle.id) 
    : filteredArticles;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      <SEOManager 
        title="ToolTrove Chronicles — Premium Technology & Privacy Guides"
        description="Expand your digital knowledge with expert insights, step-by-step guides, and strategies for PDF compression, local AI scriptwriting, GST accounting, and WebGL image segmentation."
      />

      {/* Hero Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 text-orange-600 border border-orange-100 rounded-full text-xs font-black uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> Educational Hub
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          ToolTrove <span className="text-[#ff5c1a]">Chronicles</span>
        </h1>
        <p className="text-slate-500 font-semibold leading-relaxed text-sm md:text-base">
          Read high-density tutorials about secure offline sandboxing, pixel-perfect layouts, AI resume strategies, and business compliance.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, tags, or keywords..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 focus:bg-white focus:border-orange-500 rounded-2xl outline-none text-sm font-semibold transition-all shadow-inner focus:shadow-md"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-lg text-xs font-bold transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Carousel Slider */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by Category
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin snap-x touch-pan-x">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black shrink-0 snap-start transition-all cursor-pointer border ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article (Hero Placement) */}
      {featuredArticle && (
        <div 
          onClick={() => navigate(`/blog/${featuredArticle.id}`)}
          className="group cursor-pointer bg-white rounded-[2.5rem] border border-slate-200/80 shadow-2xl hover:shadow-orange-100 hover:border-orange-300 transition-all duration-300 grid md:grid-cols-2 overflow-hidden max-w-6xl mx-auto md:h-96"
        >
          {/* Cover Placeholder */}
          <div className="bg-gradient-to-tr from-slate-950 to-slate-800 p-8 md:p-12 flex flex-col justify-between text-white relative group-hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none"></div>
            <span className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs font-black tracking-wider w-max uppercase">
              ★ Featured Post
            </span>
            <div className="space-y-2">
              <span className="text-orange-400 text-xs font-black tracking-widest uppercase">
                {featuredArticle.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-snug group-hover:text-orange-400 transition-colors">
                {featuredArticle.title}
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/60 font-bold border-t border-white/10 pt-4">
              <span>{featuredArticle.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 md:p-12 flex flex-col justify-between bg-white text-slate-800">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Summary & Excerpt</span>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
                {featuredArticle.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredArticle.id.split('-').slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-orange-500 hover:text-orange-600 transition-colors pt-6 md:pt-0">
              <span>Read Premium Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      )}

      {/* Grid List of Regular Articles */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 max-w-6xl mx-auto">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="text-orange-500 w-5 h-5 shrink-0" />
            {searchQuery || selectedCategory !== 'All' ? 'Filter Results' : 'Articles & Tutorials'}
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-xs font-bold ml-1">
              {filteredArticles.length}
            </span>
          </h3>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {regularArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/blog/${article.id}`)}
                className="group cursor-pointer flex flex-col justify-between p-6 rounded-[2rem] bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-300 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black border ${article.color || 'text-slate-600 bg-slate-100 border-slate-200'}`}>
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 leading-snug group-hover:text-orange-500 transition-colors mb-3">
                    {article.title}
                  </h4>
                  <p className="text-slate-400 text-xs font-semibold leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">{article.date}</span>
                  <span className="text-[#ff5c1a] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Post <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl max-w-4xl mx-auto space-y-4">
            <HelpCircle className="w-16 h-16 text-orange-500 mx-auto animate-bounce" />
            <h4 className="text-2xl font-black text-slate-800">No Articles Found</h4>
            <p className="text-slate-400 text-xs font-semibold max-w-xs mx-auto">
              Our guides are constantly updating, but we couldn't match your exact search criteria. Try general tags (e.g. 'PDF', 'AI', 'invoicing').
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-6 py-2.5 bg-slate-950 text-white font-bold rounded-xl text-xs hover:bg-orange-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== 2. DETAILED BLOG POST READER ====================
export function ArticlePage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const sectionRefs = useRef({});

  // Fetch target article
  const article = INSIGHTS_ARTICLES.find(a => a.id === articleId);

  // Scroll active section observer
  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of article.content) {
        const element = document.getElementById(section.subtitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.subtitle);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  if (!article) {
    return (
      <div className="pt-40 pb-20 text-center space-y-6 max-w-md mx-auto">
        <HelpCircle className="w-20 h-20 text-orange-500 mx-auto animate-bounce" />
        <h2 className="text-3xl font-black text-slate-800">Post Not Found</h2>
        <p className="text-slate-400 font-semibold">The requested educational post does not exist or has been archived.</p>
        <button 
          onClick={() => navigate('/blog')}
          className="px-8 py-4 bg-slate-950 text-white font-bold rounded-2xl hover:bg-orange-500 transition-all text-xs"
        >
          Return to Blog Overview
        </button>
      </div>
    );
  }

  // Smooth scroll helper
  const scrollToHeading = (subtitle) => {
    const id = subtitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth'
      });
      setActiveSection(subtitle);
    }
  };

  // Get related tools / categories
  const relatedPosts = INSIGHTS_ARTICLES.filter(
    a => a.category === article.category && a.id !== article.id
  ).slice(0, 3);

  // Generate Breadcrumbs JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tooltrove.space/" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://tooltrove.space/blog" },
          { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://tooltrove.space/blog/${article.id}` }
        ]
      },
      {
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.excerpt,
        "datePublished": "2026-05-19T09:00:00Z",
        "author": {
          "@type": "Organization",
          "name": "ToolTrove Editorial"
        }
      }
    ]
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <SEOManager 
        title={`${article.title} — ToolTrove`}
        description={`${article.excerpt.slice(0, 150)}...`}
        schema={schema}
      />

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
        <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <Link to="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-600 truncate max-w-[200px]">{article.title}</span>
      </div>

      <button 
        onClick={() => navigate('/blog')}
        className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-orange-500 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog Home
      </button>

      {/* Grid Layout: Sidebar and Main Article */}
      <div className="grid lg:grid-cols-4 gap-12 items-start">
        
        {/* Left Side: Table of Contents (Sticky on Desktop) */}
        <div className="hidden lg:block sticky top-32 border border-slate-200/80 rounded-3xl p-6 bg-white shadow-md space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <List className="w-4 h-4 text-orange-500" /> Table of Contents
          </h4>
          <div className="space-y-2">
            {article.content.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => scrollToHeading(sec.subtitle)}
                className={`w-full text-left text-xs py-2 px-3 rounded-xl transition-all cursor-pointer font-bold leading-normal ${
                  activeSection === sec.subtitle 
                    ? 'bg-orange-50 text-orange-600 border border-orange-100/50 translate-x-1 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 hover:translate-x-1'
                }`}
              >
                {sec.subtitle}
              </button>
            ))}
          </div>
        </div>

        {/* Center / Right Column: Article content */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* Main Title Banner */}
          <div className="space-y-4">
            <span className={`inline-block px-3 py-1 rounded-xl text-xs font-black border ${article.color || 'text-slate-600 bg-slate-100 border-slate-200'}`}>
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {article.title}
            </h1>
            
            {/* Metadata bar */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-bold border-y border-slate-100 py-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {article.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> By ToolTrove Editorial</span>
            </div>
          </div>

          {/* Excerpt callout */}
          <div className="p-6 bg-slate-50 border-l-4 border-orange-500 rounded-r-3xl text-slate-600 text-sm leading-relaxed font-semibold italic">
            "{article.excerpt}"
          </div>

          {/* Expandable Table of Contents for Mobile Screens */}
          <div className="lg:hidden p-5 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-3">
            <h5 className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <List className="w-4 h-4 text-orange-500" /> Guide Sections
            </h5>
            <div className="grid gap-1.5">
              {article.content.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToHeading(sec.subtitle)}
                  className="text-left text-xs py-1.5 text-slate-500 hover:text-orange-500 font-bold"
                >
                  • {sec.subtitle}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Article Sections Content */}
          <div className="space-y-12 text-slate-650 text-sm md:text-base leading-relaxed font-medium pt-4 border-b border-slate-100 pb-10">
            {article.content.map((sec, idx) => {
              const elementId = sec.subtitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <section 
                  key={idx} 
                  id={elementId}
                  className="space-y-4 scroll-mt-28"
                >
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-orange-500 shrink-0" />
                    {sec.subtitle}
                  </h3>
                  <p className="text-slate-650 leading-relaxed font-semibold text-xs md:text-sm">
                    {sec.paragraph}
                  </p>
                </section>
              );
            })}
          </div>

          {/* Interaction area */}
          <div className="flex items-center gap-4 py-4 border-b border-slate-100">
            <button 
              onClick={() => { 
                const newLiked = !hasLiked;
                setLikes(likes + (newLiked ? 1 : -1)); 
                setHasLiked(newLiked); 
                trackInteraction(newLiked ? 'like_article' : 'unlike_article', article.title);
              }}
              className={`px-4 py-2 border rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                hasLiked 
                  ? 'bg-rose-50 border-rose-200 text-rose-600 scale-105' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{likes > 0 ? `${likes} Hearts` : 'Heart Post'}</span>
            </button>
            
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("🔗 Post link copied directly to your clipboard!");
                trackInteraction('share_article_link', article.title);
              }}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Post</span>
            </button>
          </div>

          {/* Monitization space display placement banner */}
          <div className="p-6 rounded-3xl bg-slate-900/5 border border-slate-900/10 text-center space-y-3 relative overflow-hidden group shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none"></div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-900/10 text-slate-500 rounded-md text-[9px] font-black uppercase tracking-wider">
              Sponsored Placement
            </div>
            <div className="h-28 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-white/40 group-hover:bg-white/80 transition-colors">
              <span className="text-slate-400 font-bold text-xs">High-CPM Premium Banner Slot</span>
              <p className="text-[10px] text-slate-300 mt-1">Responsive AdSense slot optimized for mobile displays</p>
            </div>
          </div>

          {/* Action Call-to-Action Card linking back to ToolTrove utilities */}
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-tr from-slate-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
            <div className="space-y-2 relative z-10 text-center md:text-left">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-orange-500 text-white rounded-md text-[9px] font-black uppercase tracking-wider">
                ⚡ Premium Sandbox
              </span>
              <h4 className="font-black text-white text-xl">Put this knowledge into practice!</h4>
              <p className="text-slate-400 text-xs font-semibold max-w-md">
                Try this compliant client-side calculation, split, or conversion in our zero-latency offline browser sandbox.
              </p>
            </div>
            <Link 
              to={article.toolLink}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-200 transition-all text-xs shrink-0 relative z-10 text-center scale-95 hover:scale-100"
            >
              {article.cta || 'Launch Tool Now'} →
            </Link>
            <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Related Articles Footer */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6 pt-10 border-t border-slate-100">
              <h4 className="font-black text-slate-900 text-lg uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="text-orange-500 w-5 h-5 shrink-0" /> Recommended for You
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(rp => (
                  <div 
                    key={rp.id}
                    onClick={() => { navigate(`/blog/${rp.id}`); window.scrollTo(0,0); }}
                    className="group cursor-pointer p-5 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest block mb-2">{rp.category}</span>
                      <h5 className="font-black text-slate-800 text-xs leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">{rp.title}</h5>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-3 mt-4">
                      <span>{rp.readTime}</span>
                      <span className="text-orange-500 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Read →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
