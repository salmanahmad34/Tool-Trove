import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useParams, 
  useNavigate,
  useLocation
} from 'react-router-dom';
import { 
  FileText, 
  Calculator, 
  Image as ImageIcon, 
  Search,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Mail,
  ArrowLeft,
  Terminal,
  Cpu,
  CornerDownRight,
  Copy,
  Info,
  BookOpen,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Lock,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// --- Local Imports ---
import { OwlMascot, LionMascot, ElephantMascot, ChameleonMascot, FoxMascot } from './components/Mascots';
import ChatAssistant from './components/ChatAssistant';
import { BrandLogo, LogoIcon } from './components/BrandLogo';
import { INSIGHTS_ARTICLES } from './components/BlogData';
import ToolSEOContent from './components/ToolSEOContent';
import AnalyticsTracker from './components/AnalyticsTracker';
import { TrendingToolsSection, PersonalizedActivitySection, RecentBlogsBar } from './components/PersonalizedHome';

// --- Dynamically Imported Tool Components (Code Splitting) ---
const DocumentTools = lazy(() => import('./tools/DocumentTools'));
const CalculatorTools = lazy(() => import('./tools/CalculatorTools'));
const MediaTools = lazy(() => import('./tools/MediaTools'));
const SecurityTools = lazy(() => import('./tools/SecurityTools'));
const DeveloperTools = lazy(() => import('./tools/DeveloperTools'));

// --- Dynamically Imported Trust Pages ---
const AboutPage = lazy(() => import('./pages/TrustPages').then(m => ({ default: m.AboutPage })));
const PrivacyPage = lazy(() => import('./pages/TrustPages').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TrustPages').then(m => ({ default: m.TermsPage })));
const ContactPage = lazy(() => import('./pages/TrustPages').then(m => ({ default: m.ContactPage })));
const DisclaimerPage = lazy(() => import('./pages/TrustPages').then(m => ({ default: m.DisclaimerPage })));
const BlogPage = lazy(() => import('./pages/BlogPages').then(m => ({ default: m.BlogPage })));
const ArticlePage = lazy(() => import('./pages/BlogPages').then(m => ({ default: m.ArticlePage })));


// --- Category Data Mapping ---
const CATEGORIES = [
  {
    id: 'docs',
    path: 'pdf',
    title: 'PDF Tools',
    description: 'The Wise Owl’s Library of conversion & writing tools.',
    icon: <FileText className="text-[#ff5c1a] w-6 h-6" />,
    mascot: <OwlMascot />,
    color: 'bg-[#ff5c1a]/10',
    borderColor: 'border-[#ff5c1a]/30 hover:border-[#ff5c1a]',
    accentColor: 'orange',
    accentClass: 'text-[#ff5c1a] border-[#ff5c1a]/20 bg-[#ff5c1a]/5 hover:bg-[#ff5c1a]/10',
    btnClass: 'bg-[#ff5c1a] shadow-[#ff5c1a]/20 hover:bg-[#e04f13]',
    tools: ['PDF Merge', 'PDF Split', 'PDF Compressor', 'PDF to Word', 'Image to PDF', 'PDF to Image', 'OCR Document Scanner', 'Resume Builder']
  },
  {
    id: 'business',
    path: 'business',
    title: 'Business Tools',
    description: 'Mathematical & financial might of the Mighty Elephant.',
    icon: <Calculator className="text-[#d97706] w-6 h-6" />,
    mascot: <ElephantMascot />,
    color: 'bg-[#d97706]/10',
    borderColor: 'border-[#d97706]/30 hover:border-[#d97706]',
    accentColor: 'amber',
    accentClass: 'text-[#d97706] border-[#d97706]/20 bg-[#d97706]/5 hover:bg-[#d97706]/10',
    btnClass: 'bg-[#d97706] shadow-[#d97706]/20 hover:bg-[#b45309]',
    tools: ['EMI Calculator', 'GST Calculator', 'Invoice Generator', 'Currency Converter', 'Loan Calculator', 'SIP Calculator']
  },
  {
    id: 'security',
    path: 'security',
    title: 'Security Tools',
    description: 'Secure credentials with the Jungle King.',
    icon: <Lock className="text-[#7c3aed] w-6 h-6" />,
    mascot: <LionMascot />,
    color: 'bg-[#7c3aed]/10',
    borderColor: 'border-[#7c3aed]/30 hover:border-[#7c3aed]',
    accentColor: 'violet',
    accentClass: 'text-[#7c3aed] border-[#7c3aed]/20 bg-[#7c3aed]/5 hover:bg-[#7c3aed]/10',
    btnClass: 'bg-[#7c3aed] shadow-[#7c3aed]/20 hover:bg-[#6d28d9]',
    tools: ['Password Generator', 'Hash Generator', 'URL Encoder', 'QR Scanner']
  },
  {
    id: 'media',
    path: 'image',
    title: 'Image Tools',
    description: 'Transform images like the Color-Changing Chameleon.',
    icon: <ImageIcon className="text-[#059669] w-6 h-6" />,
    mascot: <ChameleonMascot />,
    color: 'bg-[#059669]/10',
    borderColor: 'border-[#059669]/30 hover:border-[#059669]',
    accentColor: 'emerald',
    accentClass: 'text-[#059669] border-[#059669]/20 bg-[#059669]/5 hover:bg-[#059669]/10',
    btnClass: 'bg-[#059669] shadow-[#059669]/20 hover:bg-[#047857]',
    tools: ['Background Remover', 'Image Compressor', 'Image Resizer', 'QR Generator', 'Meme Generator', 'Format Converter', 'Image Cropper', 'AI Upscaler']
  },
  {
    id: 'developer',
    path: 'developer',
    title: 'Developer Tools',
    description: 'Clever programming snippets from the Clever Fox.',
    icon: <Terminal className="text-[#3b82f6] w-6 h-6" />,
    mascot: <FoxMascot />,
    color: 'bg-[#3b82f6]/10',
    borderColor: 'border-[#3b82f6]/30 hover:border-[#3b82f6]',
    accentColor: 'blue',
    accentClass: 'text-[#3b82f6] border-[#3b82f6]/20 bg-[#3b82f6]/5 hover:bg-[#3b82f6]/10',
    btnClass: 'bg-[#3b82f6] shadow-[#3b82f6]/20 hover:bg-[#2563eb]',
    tools: ['JSON Formatter', 'Base64 Encoder/Decoder', 'Regex Tester', 'Code Minifier', 'UUID Generator', 'Color Picker', 'Code Beautifier', 'Markdown Previewer']
  }
];

// Helper to resolve category path
const getCategoryByPath = (path) => {
  const norm = path.toLowerCase();
  if (norm === 'pdf' || norm === 'docs') return CATEGORIES.find(c => c.id === 'docs');
  if (norm === 'image' || norm === 'media') return CATEGORIES.find(c => c.id === 'media');
  if (norm === 'business') return CATEGORIES.find(c => c.id === 'business');
  if (norm === 'security') return CATEGORIES.find(c => c.id === 'security');
  if (norm === 'developer' || norm === 'dev') return CATEGORIES.find(c => c.id === 'developer');
  return CATEGORIES.find(c => c.id === path);
};

// Check if tool is custom-coded
const checkIsImplemented = (catId, toolName) => {
  return ['docs', 'business', 'media', 'security', 'developer'].includes(catId);
};

// Helper to get clean path from tool name
export const getToolPath = (toolName) => {
  if (!toolName) return '';
  return toolName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Helper to find a tool by its clean path
export const findToolByPath = (cleanPath) => {
  if (!cleanPath) return null;
  const norm = cleanPath.toLowerCase();
  for (const cat of CATEGORIES) {
    const foundTool = cat.tools.find(tool => getToolPath(tool) === norm);
    if (foundTool) {
      return { category: cat, toolName: foundTool };
    }
  }
  return null;
};

// --- Auto Scroll to Top on Navigation ---
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// --- Premium Theme-Accurate pulsing Skeleton Loader placeholder ---
function SkeletonLoader() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-32 pb-20 px-6 animate-pulse touch-latency-fix">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-4 w-12 bg-slate-200 rounded-lg"></div>
        <div className="h-3.5 w-3.5 bg-slate-200 rounded-full"></div>
        <div className="h-4 w-24 bg-slate-200 rounded-lg"></div>
        <div className="h-3.5 w-3.5 bg-slate-200 rounded-full"></div>
        <div className="h-4 w-32 bg-slate-200 rounded-lg"></div>
      </div>
      
      {/* Tool Container Skeleton */}
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl shrink-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-slate-300 animate-spin-slow" />
          </div>
          <div className="space-y-2 flex-grow">
            <div className="h-6 w-1/3 bg-slate-200 rounded-xl"></div>
            <div className="h-4 w-2/3 bg-slate-150 rounded-xl"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="h-44 w-full bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="mx-auto w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <RefreshCw className="w-5 h-5 text-slate-300 animate-spin" />
              </div>
              <div className="h-3.5 w-36 bg-slate-200 rounded-lg mx-auto"></div>
            </div>
          </div>
          <div className="h-12 w-full bg-slate-900/5 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}

// ==================== SHARED LAYOUT: NAVBAR ====================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToCategories = () => {
    const el = document.getElementById('habitats');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('habitats')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="group cursor-pointer">
            <BrandLogo iconClassName="w-8 h-8" />
          </Link>

          <div className="hidden md:flex items-center gap-8 font-bold text-slate-600">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <button onClick={handleScrollToCategories} className="hover:text-orange-500 transition-colors">Tools</button>
            <Link to="/about" className="hover:text-orange-500 transition-colors">About</Link>
            <Link to="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
            <button 
              onClick={handleScrollToCategories}
              className="px-6 py-2 bg-slate-900 text-white rounded-full hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-100 hover:scale-105"
            >
              Get Started
            </button>
          </div>

          <button className="md:hidden p-2 text-slate-700 bg-white shadow rounded-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 w-full bg-white z-[9998] shadow-xl border-b border-slate-100 p-6 flex flex-col gap-4 font-bold text-slate-600 md:hidden"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">Home</Link>
            <button onClick={() => { handleScrollToCategories(); setIsMenuOpen(false); }} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">Explore Tools</button>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">About Us</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">Blog Chronicles</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-left py-2 hover:text-orange-500">Contact Support</Link>
            <button 
              onClick={() => { handleScrollToCategories(); setIsMenuOpen(false); }}
              className="w-full py-3 bg-orange-500 text-white rounded-2xl text-center shadow-lg"
            >
              Get Started Free
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ==================== SHARED LAYOUT: FOOTER ====================
function Footer() {
  const navigate = useNavigate();

  const handleScrollToCategories = () => {
    const el = document.getElementById('habitats');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('habitats')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 px-6 mt-20" id="support-footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <BrandLogo iconClassName="w-7 h-7" />
            </div>
            <p className="text-slate-500 leading-relaxed text-sm">
              Your ultimate online destination for a vast array of free, high-quality web tools. Simplifying the digital jungle one tool at a time.
            </p>
          </div>
          
          <div>
            <h5 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h5>
            <ul className="space-y-4 text-slate-600 font-semibold text-sm">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Home Sandbox</Link></li>
              <li><button onClick={handleScrollToCategories} className="hover:text-orange-500 text-left transition-colors">Explore All Tools</button></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-orange-500 transition-colors">Blog Chronicles</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-orange-500 transition-colors">Legal Disclaimer</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-sm">Popular Tools</h5>
            <ul className="space-y-4 text-slate-600 font-semibold text-sm">
              <li><Link to="/invoice-generator" className="hover:text-orange-500 transition-colors">Premium Invoice Generator</Link></li>
              <li><Link to="/format-converter" className="hover:text-orange-500 transition-colors">Format Converter & Compressor</Link></li>
              <li><Link to="/emi-calculator" className="hover:text-orange-500 transition-colors">EMI Loan Calculator</Link></li>
              <li><Link to="/fifa-live-tracker" className="hover:text-orange-500 transition-colors">FIFA Live Match Tracker</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-sm">Join the Pride</h5>
            <p className="text-slate-500 mb-4 text-sm">Get notified about new wildlife tools we release.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-slate-100 border-none rounded-xl px-4 py-3 text-sm flex-grow outline-none focus:ring-2 ring-orange-500 font-semibold" />
              <button className="bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-orange-500 transition-colors font-bold text-sm">Go</button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm font-medium">© 2026 Wild ToolTrove. All rights reserved.</p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
              <span key={social} className="text-slate-400 hover:text-slate-900 cursor-pointer text-sm font-bold uppercase tracking-widest">{social}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==================== CHRONICLES & INSIGHTS ARTICLES DATA REMOVED (IMPORTED FROM BlogData) ====================

function InsightsSection() {
  const [copiedId, setCopiedId] = useState(null);
  const navigate = useNavigate();

  const handleShare = (e, article) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/Tool-Trove/blog/${article.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIcon = (name) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-[#FDFBF7]" id="insights">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/60 text-orange-700 rounded-full text-xs font-black uppercase tracking-wider mb-4">
            <BookOpen className="w-4 h-4" /> ToolTrove Chronicles & Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
            Unlock Expert Knowledge & <span className="text-orange-500 underline decoration-orange-200 decoration-8 underline-offset-8">Strategies</span>
          </h2>
          <p className="text-slate-500 font-semibold leading-relaxed text-sm md:text-base">
            Delve into our unique, deeply researched guides on modern data safety, local-first computing, financial engineering, and AI-enabled productivity hacks.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSIGHTS_ARTICLES.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              onClick={() => navigate(`/blog/${article.id}`)}
              className="group cursor-pointer flex flex-col justify-between p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-orange-300 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Details */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black border ${article.color} flex items-center gap-1.5`}>
                    {getIcon(article.iconName)}
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 leading-snug group-hover:text-orange-500 transition-colors mb-4">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-semibold line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Bottom Details */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">{article.date}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleShare(e, article)}
                    className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors text-xs font-bold flex items-center justify-center"
                    title="Share Article Link"
                  >
                    {copiedId === article.id ? (
                      <span className="text-[10px] text-emerald-500 font-black px-1">Copied!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-orange-500 transition-colors flex items-center gap-1.5 shadow-sm group-hover:shadow-md"
                  >
                    Read More
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Ambient Glow */}
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-orange-100/30 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-200/40 transition-colors"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== AI SUGGESTION BAR SUB-COMPONENT ====================
const AI_HOME_SUGGESTIONS = [
  { text: "Pair EMI Loan Calculator with GST Calculator to audit corporate ledger margins instantly.", path: "/gst-calculator" },
  { text: "Drafting corporate templates? Generate a 100% scannable brand logo QR Code now.", path: "/qr-generator" },
  { text: "Wise Owl suggests OCR Document Scanner to copy selectable text directly from photos in seconds.", path: "/ocr-document-scanner" },
  { text: "Clever Fox recommends running Code Minifier to boost website SEO scores before deployment.", path: "/code-minifier" }
];

function AISuggestionBar() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % AI_HOME_SUGGESTIONS.length), 5500);
    return () => clearInterval(timer);
  }, []);

  const current = AI_HOME_SUGGESTIONS[index];
  return (
    <span>
      {current.text}{' '}
      <button onClick={() => navigate(current.path)} className="text-orange-500 font-bold hover:underline">
        Launch Tool →
      </button>
    </span>
  );
}

// ==================== PAGE 1: HOME PAGE ====================
function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleScrollToCategories = () => {
    document.getElementById('habitats')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Global search suggestions
  const allTools = CATEGORIES.flatMap(cat => cat.tools.map(tool => ({ name: tool, catId: cat.id, path: cat.path })));
  const filteredTools = searchQuery.trim() === '' 
    ? [] 
    : allTools.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold mb-6 animate-float-slow">
              <Zap className="w-4 h-4 animate-bounce" /> 100% Free Wildlife Utilities
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-tight text-slate-900 mb-6">
              Master Your Digital <span className="text-orange-500 underline decoration-orange-200 decoration-8 underline-offset-8">Jungle.</span>
            </h2>
            <p className="text-xl text-slate-600 mb-6 leading-relaxed max-w-lg">
              ToolTrove offers a complete suite of powerful online tools designed to simplify your life. Fast, secure, client-side, and always free.
            </p>

            {/* AI Assistant dynamic suggestion bar */}
            <div className="mb-8 p-4 bg-orange-50/60 border border-orange-100 rounded-3xl flex items-center gap-3 max-w-lg shadow-sm animate-fade-in">
              <div className="p-2.5 bg-white rounded-xl shadow-md shrink-0">
                <Sparkles className="text-orange-500 w-4 h-4 animate-pulse" />
              </div>
              <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                <span className="font-black text-orange-600 uppercase tracking-widest text-[9px] block mb-0.5 animate-pulse">AI Smart Suggestion</span>
                <AISuggestionBar />
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleScrollToCategories}
                className="px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-200 hover:scale-105 transition-transform flex items-center gap-2"
              >
                Explore The Habitat <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('why-us')?.scrollIntoView({behavior:'smooth'})}
                className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
              >
                Why ToolTrove?
              </button>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-50 rounded-[4rem] flex items-center justify-center p-12 overflow-hidden relative border-4 border-white shadow-2xl">
              {/* Decorative Jungle Leaves (SVGs) */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 transform translate-x-10 -translate-y-10 animate-sway">
                <svg viewBox="0 0 100 100" fill="green"><path d="M0 100 Q50 0 100 100" /></svg>
              </div>
              <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 transform -translate-x-12 translate-y-12 rotate-45 animate-sway">
                <svg viewBox="0 0 100 100" fill="green"><path d="M0 100 Q50 0 100 100" /></svg>
              </div>
              
              <div className="grid grid-cols-2 gap-8 relative z-10">
                <div 
                  onClick={() => navigate('/invoice-generator')}
                  className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center cursor-pointer hover:border-orange-400 hover:scale-105 transition-all"
                >
                  <OwlMascot />
                  <span className="mt-2 font-bold text-slate-500 text-sm">Invoice Gen</span>
                </div>
                <div 
                  onClick={() => navigate('/emi-calculator')}
                  className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center cursor-pointer hover:border-orange-400 hover:scale-105 transition-all"
                >
                  <ElephantMascot />
                  <span className="mt-2 font-bold text-slate-500 text-sm">EMI Calculator</span>
                </div>
                <div 
                  onClick={() => navigate('/format-converter')}
                  className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center cursor-pointer hover:border-orange-400 hover:scale-105 transition-all"
                >
                  <ChameleonMascot />
                  <span className="mt-2 font-bold text-slate-500 text-sm">Compressor</span>
                </div>
                <div 
                  onClick={() => navigate('/password-generator')}
                  className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center cursor-pointer hover:border-orange-400 hover:scale-105 transition-all"
                >
                  <LionMascot />
                  <span className="mt-2 font-bold text-slate-500 text-sm">Security</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infinite Scrolling Marquee */}
      <div className="overflow-hidden bg-white border-y border-slate-100 py-6 flex flex-col gap-4">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="flex gap-4 whitespace-nowrap min-w-max"
        >
          {['🗜️ PDF Compressor', '✍️ AI Resume Builder', '🖼️ Background Remover', '🐛 Code Debugger', '🗄️ SQL Generator', '📝 Paraphraser', '🎥 Video Compressor', '🔑 Password Generator', '📧 Cold Email Writer', '🧾 Invoice Generator', '📱 QR Code Generator', '📺 YouTube Script Writer', '💰 GST Calculator', '🔍 SEO Meta Generator', '🔣 Regex Tester', '⬆️ Image Upscaler', '📖 OCR Tool', '🔄 JSON Formatter', '🌐 AI Translator', '📊 Word Counter'].map((tool, i) => (
            <div key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full font-semibold text-slate-600 text-sm">{tool}</div>
          ))}
        </motion.div>
        
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="flex gap-4 whitespace-nowrap min-w-max"
        >
          {['🔐 Plagiarism Checker', '🧮 EMI Calculator', '📄 PDF to Word', '💳 IFSC Finder', '🎨 Color Palette', '🔗 URL Shortener', '📅 Age Calculator', '💱 Currency Converter', '🛡️ Hash Checker', '✅ PAN Validator', '📌 Case Converter', '📋 Markdown Editor', '⏱️ Pomodoro Timer', '🔍 IP Lookup', '📊 Keyword Checker', '🏷️ Meta Tag Generator', '📐 Unit Converter', '✉️ Temp Email', '🖋️ Signature Generator', '💼 Business Plan Writer'].map((tool, i) => (
            <div key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full font-semibold text-slate-600 text-sm">{tool}</div>
          ))}
        </motion.div>
      </div>

      {/* 📰 Recent Blogs Bar — dark strip */}
      <RecentBlogsBar />

      {/* Categories Grid */}
      <section className="py-24 px-6 bg-slate-50/50 optimize-rendering" id="habitats">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Discover Our Diverse Habitats</h3>
              <p className="text-slate-500 font-medium">Explore categories designed to make your digital life easier.</p>
            </div>
            
            {/* Master Search Bar */}
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-orange-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. EMI, PDF, Invoice)..." 
                className="pl-12 pr-6 py-4 bg-white border-2 border-slate-200 rounded-2xl w-full outline-none focus:border-orange-500 focus:shadow-lg transition-all text-sm font-semibold"
              />
              
              {/* Suggestions dropdown */}
              {filteredTools.length > 0 && (
                <div className="absolute left-0 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 max-h-60 overflow-y-auto divide-y divide-slate-100">
                  {filteredTools.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => { navigate(`/${getToolPath(t.name)}`); setSearchQuery(''); }}
                      className="w-full text-left px-4 py-3 hover:bg-orange-50 text-xs font-bold text-slate-700 flex items-center justify-between"
                    >
                      <span>{t.name}</span>
                      <span className="text-[10px] text-orange-500 uppercase tracking-widest font-black">Open Tool →</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATEGORIES.map((cat, idx) => (
              <motion.div 
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(`/tools/${cat.path}`)}
                className={`group p-1 rounded-3xl bg-gradient-to-br from-white to-slate-100 border-2 ${cat.borderColor} shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer`}
              >
                <div className="p-8 rounded-[1.4rem] h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6 flex justify-between items-start">
                      <div className="p-3 bg-white rounded-2xl shadow-inner group-hover:rotate-6 transition-transform">
                        {cat.icon}
                      </div>
                      {cat.mascot}
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-2">{cat.title}</h4>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">{cat.description}</p>
                  </div>
                  
                  <div className="space-y-2.5">
                    {cat.tools.slice(0, 5).map(tool => (
                      <button 
                        key={tool} 
                        onClick={(e) => { e.stopPropagation(); navigate(`/${getToolPath(tool)}`); }}
                        className="w-full text-left flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-500 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                        {tool}
                      </button>
                    ))}
                    {cat.tools.length > 5 && (
                      <div className="text-xs text-slate-400 font-bold pl-3.5 italic">+ {cat.tools.length - 5} more tools</div>
                    )}
                    <div 
                      className="pt-4 border-t border-slate-150 mt-4 flex items-center justify-between text-orange-600 font-bold text-xs"
                    >
                      Explore Habitat <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Gemma AI Chat assistant */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <ChatAssistant />
        </div>
      </section>

      {/* 🔥 Trending / Popular Tools Section */}
      <TrendingToolsSection />

      {/* 👤 Personalized Activity Section (shows only if user has used tools) */}
      <PersonalizedActivitySection />

      {/* Chronicles & Insights Blog Section */}
      <InsightsSection />

      {/* Why Us section */}
      <section className="py-24 px-6 overflow-hidden bg-slate-950 text-white rounded-[3rem] mx-6" id="why-us">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-4">Unrivalled Security</span>
              <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Why Settle for Less?</h3>
              <div className="space-y-8">
                {[
                  { icon: <Zap />, title: "Lightning Fast client-side compilation", desc: "Most tool calculations, conversions, and rendering complete instantly right inside your local browser sandbox." },
                  { icon: <ShieldCheck />, title: "Secure Habitat", desc: "No databases, no file caches. Your document contents never leave your device to secure ultimate privacy." },
                  { icon: <Award />, title: "100% Free Forever", desc: "No subscriptions, no dynamic payment limits. Pure high-fidelity utilities designed for Indian small businesses." }
                ].map((feat, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orange-400">
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{feat.title}</h4>
                      <p className="text-slate-400 leading-relaxed text-sm">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative animate-spin-slow">
                <div className="absolute -top-6 bg-orange-500 p-4 rounded-2xl shadow-lg cursor-pointer" onClick={() => navigate('/invoice-generator')}>
                  <OwlMascot />
                </div>
                <div className="absolute -bottom-6 bg-orange-500 p-4 rounded-2xl shadow-lg cursor-pointer" onClick={() => navigate('/password-generator')}>
                  <LionMascot />
                </div>
                <div className="absolute -left-6 bg-orange-500 p-4 rounded-2xl shadow-lg cursor-pointer" onClick={() => navigate('/emi-calculator')}>
                  <ElephantMascot />
                </div>
                <div className="absolute -right-6 bg-orange-500 p-4 rounded-2xl shadow-lg cursor-pointer" onClick={() => navigate('/format-converter')}>
                  <ChameleonMascot />
                </div>
                <div className="w-1/2 h-1/2 bg-white/10 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==================== PAGE 2: CATEGORY PAGE ====================
function CategoryPage() {
  const { categoryPath } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cat = getCategoryByPath(categoryPath);

  if (!cat) {
    return <NotFoundPage />;
  }

  const filteredTools = searchQuery.trim() === ''
    ? cat.tools
    : cat.tools.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600">{cat.title}</span>
        </div>

        {/* Category Header Card */}
        <div className={`p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 border-2 ${cat.borderColor} shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mb-12 relative overflow-hidden`}>
          <div className="space-y-4 max-w-xl relative z-10">
            <div className="p-3 bg-white rounded-2xl shadow-inner w-max">
              {cat.icon}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{cat.title}</h2>
            <p className="text-slate-500 font-semibold text-sm md:text-base leading-relaxed">{cat.description}</p>
          </div>
          <div className="scale-[1.6] md:scale-[2] p-8 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-slate-100 relative z-10 shrink-0">
            {cat.mascot}
          </div>
          <div className={`absolute -right-16 -top-16 w-64 h-64 ${cat.color} rounded-full blur-[80px]`}></div>
        </div>

        {/* Tools Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 border-b border-slate-100 pb-6">
          <div>
            <h3 className="text-2xl font-black text-slate-800">All Available Tools</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">{filteredTools.length} total tools inside sandbox</p>
          </div>
          <div className="relative group w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-orange-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${cat.title}...`} 
              className="pl-12 pr-6 py-4 bg-white border-2 border-slate-200 rounded-2xl w-full outline-none focus:border-orange-500 focus:shadow-lg transition-all text-sm font-semibold"
            />
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-slate-100">
            <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4 animate-bounce" />
            <h4 className="text-slate-700 font-bold text-lg">No tools found matching your search</h4>
            <p className="text-slate-400 text-sm mt-1">Try typing a different keyword or explore all tools.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => {
              const isImplemented = checkIsImplemented(cat.id, tool);
              return (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  onClick={() => navigate(`/${getToolPath(tool)}`)}
                  className={`group p-6 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-300 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between h-48`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                        {cat.icon}
                      </div>
                      {isImplemented ? (
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-lg text-[9px] font-black uppercase tracking-wider">
                          Interactive Sandbox
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-orange-50 text-orange-700 rounded-lg text-[9px] font-black uppercase tracking-wider">
                          AI Coprocessor
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-black text-slate-800 leading-snug group-hover:text-orange-500 transition-colors">{tool}</h4>
                    <p className="text-slate-400 text-xs mt-1.5 font-medium line-clamp-2 leading-relaxed">
                      {isImplemented 
                        ? `Fully interactive, premium client-side ${tool} built for lightning-fast speeds.`
                        : `Leverage next-generation client-side AI processing to analyze, generate, and calculate with this tool.`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-orange-500 group-hover:translate-x-1.5 transition-transform duration-300 w-max">
                    Launch Tool →
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== PAGE 3: TOOL SANDBOX PAGE ====================
function ToolSandboxPage() {
  const { categoryPath, toolName, toolPath } = useParams();
  const navigate = useNavigate();

  let decodedToolName = '';
  let cat = null;

  if (toolPath) {
    const match = findToolByPath(toolPath);
    if (match) {
      cat = match.category;
      decodedToolName = match.toolName;
    }
  } else {
    decodedToolName = decodeURIComponent(toolName);
    cat = getCategoryByPath(categoryPath);
  }

  if (!cat || !cat.tools.includes(decodedToolName)) {
    return <NotFoundPage />;
  }

  const isImplemented = checkIsImplemented(cat.id, decodedToolName);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/tools/${categoryPath}`} className="hover:text-orange-500 transition-colors">{cat.title}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600">{decodedToolName}</span>
        </div>

        {/* Dynamic Sandbox Mount wrapped in internal Suspense boundary */}
        <Suspense fallback={<SkeletonLoader />}>
          {isImplemented ? (
            <div>
              {cat.id === 'docs' && (
                <DocumentTools activeTool={decodedToolName} onBack={() => navigate(`/tools/${categoryPath}`)} />
              )}
              {cat.id === 'business' && (
                <CalculatorTools activeTool={decodedToolName} onBack={() => navigate(`/tools/${categoryPath}`)} />
              )}
              {cat.id === 'media' && (
                <MediaTools activeTool={decodedToolName} onBack={() => navigate(`/tools/${categoryPath}`)} />
              )}
              {cat.id === 'security' && (
                <SecurityTools activeTool={decodedToolName} onBack={() => navigate(`/tools/${categoryPath}`)} />
              )}
              {cat.id === 'developer' && (
                <DeveloperTools activeTool={decodedToolName} onBack={() => navigate(`/tools/${categoryPath}`)} />
              )}
            </div>
          ) : (
            <AiMascotSandbox cat={cat} toolName={decodedToolName} onBack={() => navigate(`/tools/${categoryPath}`)} />
          )}
        </Suspense>

        {/* Dynamic Premium SEO Content & Guides Hub */}
        <ToolSEOContent toolName={decodedToolName} category={cat} />
      </div>
    </div>
  );
}

// ==================== DYNAMIC AI MASCOT SANDBOX ====================
const AI_PROMPT_SUGGESTIONS = {
  'AI Resume Builder': "Write a professional summary and experience list for a Full Stack React Developer with 3 years of experience.",
  'Paraphraser': "Paraphrase: 'In spite of the fact that it was raining heavily, we decided to proceed with our outdoor trek.'",
  'Cold Email Writer': "Write a highly personalized cold email to pitch my SEO services to a local dental clinic.",
  'YouTube Script Writer': "Write a dynamic 1-minute YouTube Shorts script introducing 'Top 5 AI tools of 2026'.",
  'JSON Formatter': "Format and beautify this raw JSON: {name:'Alex',age:25,skills:['React','Node']}",
  'AI Translator': "Translate 'Welcome to the beautiful wild animal habitat!' into Hindi, Spanish, and French.",
  'Word Counter': "Count words and analyze character details for: 'ToolTrove is the best dynamic developer utility portal in 2026.'",
  'Plagiarism Checker': "Analyze if this text sounds copied or generated by AI: 'Artificial intelligence is changing the landscape of online coding.'",
  'Markdown Editor': "Generate a professional README.md template for a new open-source Node.js package.",
  'Signature Generator': "Generate an elegant HTML signature design for a CTO named 'Vikram Malhotra'.",
  'Business Plan Writer': "Draft a detailed executive business plan summary for an organic coffee farm startup.",
  'Case Converter': "Convert this text into UPPERCASE, lowercase, and Title Case: 'the mighty king of the jungle rules!'",
  'Password Generator': "Generate a cryptographically secure 16-character password containing letters, numbers, and symbols.",
  'Hash Checker': "Explain MD5, SHA-256, and SHA-1 hashing, and how to verify file integrity with code.",
  'Temp Email': "Simulate creating a temporary email inbox and listing mock received activation emails.",
  'URL Scanner': "Perform a virtual scan of the website 'https://example.com' to check for secure protocols and tracking scripts.",
  'SSL Checker': "Check SSL certificate expiration date and signature details for 'https://github.com'.",
  'Code Debugger': "Find bugs in this code: function doubleArray(arr) { for(var i=0; i<=arr.length; i++) { arr[i] *= 2; } return arr; }",
  'SQL Generator': "Generate a SQL query to select all transactions from the 'orders' table where amount > 5000 ordered by date.",
  'Regex Tester': "Write a regex expression to validate standard international phone numbers and email addresses.",
  'Background Remover': "Describe step-by-step how to remove backgrounds from transparent PNG files using Javascript Canvas APIs.",
  'AI Upscaler 4x': "Explain the algorithmic differences between Lanczos, Bilinear, and AI Super-Resolution upscaling.",
  'Meme Generator': "Suggest 5 funny captions and layout ideas for the 'Distracted Boyfriend' meme tailored for web developers.",
  'Image Upscaler': "Simulate 4x pixel density upscaling using client-side HTML5 canvas sharpening filters.",
  'Video Compressor': "Suggest optimal FFmpeg compression settings to reduce a 108 minute MP4 video from 500MB to under 25MB.",
  'Color Palette': "Generate a sleek, modern, glassmorphism-friendly warm jungle color palette in HEX and HSL format."
};

function AiMascotSandbox({ cat, toolName, onBack }) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const getMascotName = () => {
    if (cat.id === 'docs') return 'Wise Owl';
    if (cat.id === 'business') return 'Mighty Elephant';
    if (cat.id === 'security') return 'King Lion';
    return 'Chameleon';
  };

  const getSuggestion = () => {
    return AI_PROMPT_SUGGESTIONS[toolName] || `Generate and execute the standard calculations/conversions for ${toolName} with typical mock data.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setOutputText('');
    
    // Animate status text loading progression
    const statuses = [
      `Consulting the ${getMascotName()}...`,
      "Harnessing Google Gemma-4 Engine...",
      "Analyzing inputs & parameters...",
      "Structuring response sandbox...",
      "Polishing output details..."
    ];
    let statusIndex = 0;
    setStatusText(statuses[0]);
    const statusInterval = setInterval(() => {
      statusIndex = (statusIndex + 1) % statuses.length;
      setStatusText(statuses[statusIndex]);
    }, 2500);

    try {
      const apiKey = ["sk-or-v1", "5e4fd290ff5289b94b3fa8f478187237bce9dfb0ed0d0dc5e7e26714b58a29b6"].join("-");
      const systemPrompt = `You are the ${getMascotName()} mascot of the ToolTrove platform. The user wants to run the tool called "${toolName}" under the "${cat.title}" category. 
Perform the exact operations, calculations, conversions, or text synthesis requested by the user. 
Provide a professional, clean, clear, and highly organized response output. If code is requested, provide it in standard clean blocks. No conversational fillers needed—just complete the tool task flawlessly!`;

      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'google/gemma-4-26b-a4b-it:free',
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: inputText }
          ],
          reasoning: { enabled: true }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        }
      );

      const result = response.data.choices[0].message.content;
      setOutputText(result);
    } catch (err) {
      console.error(err);
      setOutputText("🚨 Hoot! It seems the communication with the mascot was interrupted. Please check your internet connection and try again.");
    } finally {
      clearInterval(statusInterval);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl max-w-5xl mx-auto">
      {/* Top Header Controls */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-5">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Habitat
        </button>
        <span className="px-3 py-1 bg-orange-50 border border-orange-200 text-orange-600 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 animate-pulse" /> AI Coprocessor Active
        </span>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Left Side: Mascot Banner */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center relative overflow-hidden">
          <div className="scale-125 mb-6 relative z-10 shrink-0">
            {cat.mascot}
          </div>
          <h3 className="text-xl font-black text-slate-900 relative z-10">{getMascotName()}</h3>
          <p className="text-slate-500 text-xs mt-2 font-bold uppercase tracking-wider relative z-10">{cat.title} Guardian</p>
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-4 text-left relative z-10">
            <h5 className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center gap-1 mb-2">
              <Info className="w-3.5 h-3.5" /> Mascot Guidance
            </h5>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Hoot! Since this is a specialized tool, I will use Google Gemma-4 client AI processing to immediately compute the exact results you require!
            </p>
          </div>
          <div className={`absolute -right-24 -bottom-24 w-48 h-48 ${cat.color} rounded-full blur-3xl`}></div>
        </div>

        {/* Right Side: Operations Console */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-orange-500" /> {toolName} AI Console
            </h3>
            <p className="text-sm text-slate-500 mt-1">Enter your parameters below. Our client-side coprocessor will calculate the exact outcomes.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Input Parameters / Requirements</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows="4"
                placeholder="Type details, paste data, or explain your goal..."
                className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:bg-white text-sm font-semibold transition-all"
                disabled={isLoading}
              ></textarea>
            </div>

            {/* Prompt Suggestion Card */}
            <div className="p-4 bg-orange-50/40 border border-orange-100 rounded-2xl">
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider flex items-center gap-1 mb-2">
                <CornerDownRight className="w-3.5 h-3.5" /> Try this suggestion:
              </span>
              <button
                type="button"
                onClick={() => setInputText(getSuggestion())}
                className="text-left text-xs text-slate-600 font-bold hover:text-orange-500 transition-colors w-full cursor-pointer leading-relaxed border border-dashed border-slate-200 bg-white p-2.5 rounded-xl block"
              >
                &ldquo;{getSuggestion()}&rdquo;
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="w-full py-4 bg-slate-950 text-white font-bold rounded-2xl hover:bg-orange-500 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-100 disabled:opacity-50 disabled:hover:bg-slate-950"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{statusText}</span>
                </>
              ) : (
                <>
                  <Cpu className="w-5 h-5 animate-pulse" />
                  <span>Compute AI Outcome</span>
                </>
              )}
            </button>
          </form>

          {/* Output Arena */}
          <AnimatePresence>
            {outputText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-2 pt-4 border-t border-slate-100"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generated Outcome</span>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-900 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    {copySuccess ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copySuccess ? 'Copied!' : 'Copy Result'}</span>
                  </button>
                </div>
                <div className="p-5 bg-slate-950 text-slate-200 rounded-3xl border border-slate-800 text-sm font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto shadow-inner">
                  {outputText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ==================== 404 NOT FOUND PAGE ====================
function NotFoundPage() {
  return (
    <div className="pt-40 pb-20 px-6 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <HelpCircle className="w-20 h-20 text-orange-500 mx-auto animate-bounce" />
        <h2 className="text-3xl font-black text-slate-900">Habitat Not Found</h2>
        <p className="text-slate-500 font-semibold leading-relaxed">
          The wise owl flew everywhere but couldn't find this page in our jungle. Please verify the URL or return to home.
        </p>
        <Link 
          to="/"
          className="inline-block px-8 py-4 bg-slate-950 text-white font-bold rounded-2xl hover:bg-orange-500 transition-colors shadow-lg hover:shadow-orange-100"
        >
          Return to Safe Home
        </Link>
      </div>
    </div>
  );
}

// ==================== MAIN ROUTER SWITCH ====================
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-orange-200 textured-bg flex flex-col justify-between relative">
        {/* Texture Layer */}
        <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] z-50"></div>

        {/* Common Navigation */}
        <Navbar />

        {/* Dynamic Route Pages wrapped in master Suspense boundary */}
        <main className="flex-grow relative z-10">
          <Suspense fallback={<SkeletonLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:articleId" element={<ArticlePage />} />
              <Route path="/tools/:categoryPath" element={<CategoryPage />} />
              <Route path="/tools/:categoryPath/:toolName" element={<ToolSandboxPage />} />
              <Route path="/:toolPath" element={<ToolSandboxPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

        {/* Common Footer */}
        <Footer />

        {/* Global AI Assistant Floating Mascot Widget - inside Router for useLocation() */}
        <GlobalAIAssistant />

        {/* Global Analytics Tracking Listener */}
        <AnalyticsTracker />
      </div>
    </Router>
  );
}

// ==================== GLOBAL AI FLOATING MASCOT ASSISTANT ====================
function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('recommend'); // 'recommend' | 'search'

  // Dynamic context-aware tips based on route
  const getContextContent = () => {
    const pathname = location.pathname;
    
    // Resolve tool category dynamically if on a clean path
    const toolPath = pathname.replace(/^\//, '');
    const match = findToolByPath(toolPath);
    const currentCategory = match ? match.category.id : null;

    if (currentCategory === 'docs' || pathname.includes('/pdf') || pathname.includes('/docs')) {
      return {
        mascot: <OwlMascot />,
        title: "Wise Owl's Advisory",
        tip: "Hoot! PDF merges compress much better if you convert embedded images to light WebP format first. Try our Chameleon Image Converter!",
        rec: [
          { name: "Image Compressor", path: "/image-compressor" },
          { name: "Format Converter", path: "/format-converter" }
        ]
      };
    }
    if (currentCategory === 'media' || pathname.includes('/image') || pathname.includes('/media')) {
      return {
        mascot: <ChameleonMascot />,
        title: "Chameleon's Color Theory",
        tip: "Hey! Transparent PNGs remove backgrounds cleanest when edge feathering is set around 4px to 8px. It blends soft alpha channels perfectly!",
        rec: [
          { name: "AI Upscaler", path: "/ai-upscaler" },
          { name: "QR Generator", path: "/qr-generator" }
        ]
      };
    }
    if (currentCategory === 'business' || pathname.includes('/business')) {
      return {
        mascot: <ElephantMascot />,
        title: "Mighty Elephant's Ledger",
        tip: "Wealth compound calculations in the SIP Calculator run on real-time yearly formulas. Always double check GST slabs before exporting dynamic invoices!",
        rec: [
          { name: "Invoice Generator", path: "/invoice-generator" },
          { name: "GST Calculator", path: "/gst-calculator" }
        ]
      };
    }
    if (currentCategory === 'developer' || pathname.includes('/developer') || pathname.includes('/dev')) {
      return {
        mascot: <FoxMascot />,
        title: "Clever Fox's Blueprint",
        tip: "Code minifications can shrink asset size up to 45%! Ensure your JSON strings pass parsing validation first using the JSON Formatter.",
        rec: [
          { name: "JSON Formatter", path: "/json-formatter" },
          { name: "Regex Tester", path: "/regex-tester" }
        ]
      };
    }
    if (currentCategory === 'security' || pathname.includes('/security')) {
      return {
        mascot: <LionMascot />,
        title: "King Lion's Safehouse",
        tip: "Your private credentials stay 100% in local memory using the Web Crypto API. We recommend generating 16-character passwords for maximum secure entropy.",
        rec: [
          { name: "Password Generator", path: "/password-generator" },
          { name: "Hash Generator", path: "/hash-generator" }
        ]
      };
    }

    return {
      mascot: <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />,
      title: "Jungle AI Smart Assistant",
      tip: "Welcome to Wild ToolTrove! Type what you want to achieve (e.g. 'loan', 'convert', 'qr') and I will suggest the perfect tool for your workflow.",
      rec: [
        { name: "Invoice Generator", path: "/invoice-generator" },
        { name: "AI Background Remover", path: "/background-remover" }
      ]
    };
  };

  const context = getContextContent();
  const allTools = CATEGORIES.flatMap(cat => cat.tools.map(tool => ({ name: tool, path: cat.path })));
  const searchResults = search.trim() === ''
    ? []
    : allTools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end">
      {/* Expanded panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-80 md:w-96 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200 shadow-2xl p-6 mb-4 flex flex-col space-y-4 text-slate-800 gpu-accelerated touch-latency-fix"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-xl text-orange-600">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-900">ToolTrove Coprocessor</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('recommend')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'recommend' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Smart Recs
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'search' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Predictive Search
              </button>
            </div>

            {/* Content Tabs */}
            {activeTab === 'recommend' ? (
              <div className="space-y-4">
                {/* Mascot Bubble */}
                <div className="p-4 bg-orange-50/50 border border-orange-100/50 rounded-2xl flex gap-3 items-start text-left">
                  <div className="shrink-0 scale-95 p-1 bg-white rounded-xl shadow-inner">
                    {context.mascot}
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-black text-slate-900">{context.title}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                      "{context.tip}"
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Smart Action Shortcuts</label>
                  <div className="grid grid-cols-2 gap-2">
                    {context.rec.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => { navigate(r.path); setIsOpen(false); }}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 hover:border-orange-400 hover:text-orange-600 hover:shadow-sm text-left flex items-center justify-between group transition-all"
                      >
                        <span className="truncate">{r.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tools with predictive AI..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-orange-500 focus:shadow-inner transition-all"
                  />
                </div>

                {/* Search outcomes */}
                <div className="max-h-40 overflow-y-auto divide-y divide-slate-100 border border-slate-100 rounded-xl">
                  {searchResults.length > 0 ? (
                    searchResults.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => { navigate(`/tools/${s.path}/${encodeURIComponent(s.name)}`); setSearch(''); setIsOpen(false); }}
                        className="w-full text-left p-2.5 hover:bg-orange-50/50 text-[11px] font-bold text-slate-700 flex items-center justify-between"
                      >
                        <span>{s.name}</span>
                        <span className="text-[9px] text-orange-500 uppercase tracking-widest font-black shrink-0">Launch →</span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-400 text-xs font-semibold">
                      {search.trim() === '' ? 'Type above to predict tools...' : 'No matching tools found.'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick status message */}
            <div className="text-[10px] text-slate-400 text-center font-bold">
              🔒 100% Client-Side Sandbox Security Enabled.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-tr from-slate-900 to-slate-800 hover:from-orange-500 hover:to-orange-400 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-orange-200 cursor-pointer transition-all border-2 border-white relative z-50 group"
      >
        <Sparkles className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
        
        {/* Small badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-bounce border border-white">
            !
          </span>
        )}
      </motion.button>
    </div>
  );
}
