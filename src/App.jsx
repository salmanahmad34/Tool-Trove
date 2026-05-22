import React, { useState, useEffect, lazy, Suspense } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate,
  useLocation
} from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Sparkles, Terminal, FileText, RefreshCw, Layers, ShieldCheck, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Local Imports ---
import { BrandLogo, LogoIcon } from './components/BrandLogo';
import AnalyticsTracker from './components/AnalyticsTracker';
import ErrorBoundary from './components/ErrorBoundary';

// --- Dynamically Imported Premium Identity Core Pages ---
const LinkInBio = lazy(() => import('./pages/LinkInBio'));
const GithubReadme = lazy(() => import('./pages/GithubReadme'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// --- Dynamically Imported Trust Pages ---
const AboutPage = lazy(() => import('./pages/TrustPages').then(m => ({ default: m.AboutPage })));
const PrivacyPage = lazy(() => import('./pages/TrustPages').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TrustPages').then(m => ({ default: m.TermsPage })));
const ContactPage = lazy(() => import('./pages/TrustPages').then(m => ({ default: m.ContactPage })));
const DisclaimerPage = lazy(() => import('./pages/TrustPages').then(m => ({ default: m.DisclaimerPage })));
const BlogPage = lazy(() => import('./pages/BlogPages').then(m => ({ default: m.BlogPage })));
const ArticlePage = lazy(() => import('./pages/BlogPages').then(m => ({ default: m.ArticlePage })));

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
      <div className="flex items-center gap-2 mb-8">
        <div className="h-4 w-12 bg-slate-200 rounded-lg"></div>
        <div className="h-3.5 w-3.5 bg-slate-200 rounded-full"></div>
        <div className="h-4 w-24 bg-slate-200 rounded-lg"></div>
      </div>
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl shrink-0 flex items-center justify-center">
            <LogoIcon className="w-8 h-8 text-slate-300 animate-pulse" />
          </div>
          <div className="space-y-2 flex-grow">
            <div className="h-6 w-1/3 bg-slate-200 rounded-xl"></div>
            <div className="h-4 w-2/3 bg-slate-150 rounded-xl"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-44 w-full bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex items-center justify-center">
            <div className="mx-auto w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <RefreshCw className="w-5 h-5 text-slate-300 animate-spin" />
            </div>
          </div>
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

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="group cursor-pointer flex-shrink-0 overflow-visible flex items-center min-w-[200px]">
            <BrandLogo iconClassName="w-8 h-8 flex-shrink-0" />
          </Link>

          <div className="hidden lg:flex items-center gap-6 font-bold text-slate-600 text-sm">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <Link to="/link-in-bio" className="hover:text-orange-500 transition-colors">Link in Bio</Link>
            <Link to="/github-readme" className="hover:text-orange-500 transition-colors">README</Link>
            <Link to="/dashboard" className="hover:text-orange-500 transition-colors">Dashboard</Link>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-orange-500 transition-all shadow-md hover:scale-105"
            >
              Get Started
            </button>
          </div>

          <button className="lg:hidden p-2 text-slate-700 bg-white shadow rounded-xl flex-shrink-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 w-full bg-white z-[9998] shadow-xl border-b border-slate-100 p-6 flex flex-col gap-4 font-bold text-slate-600 lg:hidden"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">Home</Link>
            <Link to="/link-in-bio" onClick={() => setIsMenuOpen(false)} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">Link in Bio</Link>
            <Link to="/github-readme" onClick={() => setIsMenuOpen(false)} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">README Builder</Link>
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">Dashboard</Link>
            <button 
              onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}
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
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 px-6 mt-20" id="support-footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <BrandLogo iconClassName="w-7 h-7" />
            </div>
            <p className="text-slate-500 leading-relaxed text-sm">
              Your ultimate online destination for high-end digital identity optimization, powered by AI.
            </p>
          </div>
          
          <div>
            <h5 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-sm">Products</h5>
            <ul className="space-y-4 text-slate-600 font-semibold text-sm">
              <li><Link to="/link-in-bio" className="hover:text-orange-500 transition-colors">Link-In-Bio Builder</Link></li>
              <li><Link to="/github-readme" className="hover:text-orange-500 transition-colors">GitHub README Builder</Link></li>
              <li><Link to="/dashboard" className="hover:text-orange-500 transition-colors">Creator Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-sm">Trust & Privacy</h5>
            <ul className="space-y-4 text-slate-600 font-semibold text-sm">
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-sm">100% Secure</h5>
            <p className="text-slate-500 mb-4 text-sm font-semibold">Build and manage your professional identity securely. Always safe, always reliable.</p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm font-medium">© 2026 ToolTrove. All rights reserved.</p>
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

// ==================== PAGE: HOME ====================
function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full text-slate-800">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-[#FDFBF7]">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-100/40 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-yellow-100/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Side: Copy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/60 text-orange-700 rounded-full text-xs font-black uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" /> AI-Powered Digital Identity Suite
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight"
            >
              Your Digital Identity, <span className="text-orange-500 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Perfected.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 font-semibold leading-relaxed"
            >
              Create AI-powered Link in Bio pages and GitHub READMEs from one premium workspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => navigate('/link-in-bio')}
                className="px-8 py-4 bg-slate-950 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group hover:-translate-y-1"
              >
                Create Link in Bio <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/github-readme')}
                className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-400 font-black text-sm uppercase tracking-wider rounded-2xl transition-all hover:-translate-y-1"
              >
                Build README
              </button>
            </motion.div>
          </div>

          {/* Right Side: Premium Glassmorphism Floating Cards */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Card 1: Link in Bio Suite */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-10 left-10 w-72 bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-3xl shadow-2xl z-30 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center mb-4 shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-black text-xl text-slate-900 mb-2">Link in Bio Suite</h3>
              <p className="text-sm font-semibold text-slate-500">Unify your social presence with beautiful, conversion-optimized micro-landing pages.</p>
            </motion.div>

            {/* Card 2: GitHub README AI */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-1/2 right-0 -translate-y-1/2 w-72 bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-3xl shadow-2xl z-20 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white flex items-center justify-center mb-4 shadow-lg">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="font-black text-xl text-slate-900 mb-2">GitHub README AI</h3>
              <p className="text-sm font-semibold text-slate-500">Generate developer profiles that highlight your stack, stats, and top repositories.</p>
            </motion.div>



             {/* Small 4th Card: AI Optimization */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute top-20 right-10 w-40 bg-white/80 backdrop-blur-sm border border-white p-4 rounded-2xl shadow-xl z-40 hover:-translate-y-1 transition-transform duration-300 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-xs text-slate-900">AI Engine</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Optimized</p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}

// ==================== 404 NOT FOUND PAGE ====================
function NotFoundPage() {
  return (
    <div className="pt-40 pb-20 px-6 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <HelpCircle className="w-20 h-20 text-orange-500 mx-auto animate-bounce" />
        <h2 className="text-3xl font-black text-slate-900">Page Not Found</h2>
        <p className="text-slate-500 font-semibold leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          to="/"
          className="inline-block px-8 py-4 bg-slate-950 text-white font-bold rounded-2xl hover:bg-orange-500 transition-colors shadow-lg"
        >
          Return to Home
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
      <ErrorBoundary>
        <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-orange-200 textured-bg flex flex-col justify-between relative">
          <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] z-50"></div>

          <Navbar />

          <main className="flex-grow relative z-10">
            <Suspense fallback={<SkeletonLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/link-in-bio" element={<LinkInBio />} />
                <Route path="/github-readme" element={<GithubReadme />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:articleId" element={<ArticlePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />

          <AnalyticsTracker />
        </div>
      </ErrorBoundary>
    </Router>
  );
}
