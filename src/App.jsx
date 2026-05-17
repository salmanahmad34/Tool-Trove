import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Calculator, 
  Image as ImageIcon, 
  Trophy, 
  Search,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  SearchCheck,
  CheckCircle,
  HelpCircle,
  Mail,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Local Imports ---
import { OwlMascot, LionMascot, ElephantMascot, ChameleonMascot } from './components/Mascots';
import ChatAssistant from './components/ChatAssistant';
import DocumentTools from './tools/DocumentTools';
import CalculatorTools from './tools/CalculatorTools';
import MediaTools from './tools/MediaTools';
import SportsTools from './tools/SportsTools';

const CATEGORIES = [
  {
    id: 'docs',
    title: 'PDF Tools',
    description: 'The Wise Owl’s Library of conversion tools. (24 tools)',
    icon: <FileText className="text-[#ff5c1a] w-6 h-6" />,
    mascot: <OwlMascot />,
    color: 'bg-[#ff5c1a]/10',
    borderColor: 'border-[#ff5c1a]/30 hover:border-[#ff5c1a]',
    accentColor: 'orange',
    tools: ['PDF Compressor', 'PDF to Word', 'E-Sign', 'OCR Tool', 'Merge PDF', 'AI Resume Builder', 'Paraphraser', 'Cold Email Writer', 'YouTube Script Writer', 'JSON Formatter', 'AI Translator', 'Word Counter', 'Plagiarism Checker', 'Markdown Editor', 'Signature Generator', 'Business Plan Writer', 'Case Converter']
  },
  {
    id: 'business',
    title: 'Business Tools',
    description: 'Mathematical might of the Mighty Elephant. (20 tools)',
    icon: <Calculator className="text-[#d97706] w-6 h-6" />,
    mascot: <ElephantMascot />,
    color: 'bg-[#d97706]/10',
    borderColor: 'border-[#d97706]/30 hover:border-[#d97706]',
    accentColor: 'amber',
    tools: ['GST Calculator', 'EMI Calculator', 'Invoice Generator', 'IFSC Finder', 'PAN Validator', 'Invoice Generator India', 'PAN Card Validator', 'Age Calculator', 'Currency Converter', 'Unit Converter', 'SEO Meta Generator', 'Keyword Checker', 'Meta Tag Generator', 'Pomodoro Timer', 'IP Lookup', 'URL Shortener']
  },
  {
    id: 'security',
    title: 'Security Tools',
    description: 'Track the pride with the King of the Jungle. (8 tools)',
    icon: <ShieldCheck className="text-[#7c3aed] w-6 h-6" />,
    mascot: <LionMascot />,
    color: 'bg-[#7c3aed]/10',
    borderColor: 'border-[#7c3aed]/30 hover:border-[#7c3aed]',
    accentColor: 'violet',
    tools: ['Password Generator', 'Hash Checker', 'Temp Email', 'URL Scanner', 'SSL Checker', 'Code Debugger', 'SQL Generator', 'Regex Tester']
  },
  {
    id: 'media',
    title: 'Image Tools',
    description: 'Transform like the Color-Changing Chameleon. (18 tools)',
    icon: <ImageIcon className="text-[#059669] w-6 h-6" />,
    mascot: <ChameleonMascot />,
    color: 'bg-[#059669]/10',
    borderColor: 'border-[#059669]/30 hover:border-[#059669]',
    accentColor: 'emerald',
    tools: ['Background Remover', 'AI Upscaler 4x', 'Format Converter', 'Meme Generator', 'Image Upscaler', 'Video Compressor', 'Color Palette']
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Search and Workbench States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState(null); // name of the selected tool
  const [activeCat, setActiveCat] = useState(null); // id of current active category

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter tools based on query
  const allTools = CATEGORIES.flatMap(cat => cat.tools.map(tool => ({ name: tool, catId: cat.id })));
  const filteredTools = searchQuery.trim() === '' 
    ? [] 
    : allTools.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelectTool = (toolName, catId) => {
    setActiveTool(toolName);
    setActiveCat(catId);
    
    // Smooth scroll down to workbench
    setTimeout(() => {
      document.getElementById('workbench')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleScrollToCategories = () => {
    document.getElementById('habitats')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-orange-200 textured-bg">
      {/* Texture Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] z-50"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => { setActiveTab('home'); setActiveTool(null); window.scrollTo({top:0, behavior:'smooth'}); }}>
            <div className="p-2 bg-orange-500 rounded-2xl shadow-lg shadow-orange-200 group-hover:rotate-12 transition-transform">
              <Sparkles className="text-white w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              TOOL<span className="text-orange-500">TROVE</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 font-bold text-slate-600">
            <button onClick={() => { setActiveTab('home'); setActiveTool(null); }} className={`hover:text-orange-500 transition-colors ${activeTab === 'home' && !activeTool ? 'text-orange-500' : ''}`}>Home</button>
            <button onClick={handleScrollToCategories} className="hover:text-orange-500 transition-colors">Tools</button>
            <button onClick={() => document.getElementById('why-us')?.scrollIntoView({behavior:'smooth'})} className="hover:text-orange-500 transition-colors">About</button>
            <button onClick={() => document.getElementById('support-footer')?.scrollIntoView({behavior:'smooth'})} className="hover:text-orange-500 transition-colors">Contact</button>
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
            <button onClick={() => { setActiveTab('home'); setActiveTool(null); setIsMenuOpen(false); }} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">Home</button>
            <button onClick={() => { handleScrollToCategories(); setIsMenuOpen(false); }} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">Explore Tools</button>
            <button onClick={() => { document.getElementById('why-us')?.scrollIntoView({behavior:'smooth'}); setIsMenuOpen(false); }} className="text-left py-2 hover:text-orange-500 border-b border-slate-50">About Us</button>
            <button onClick={() => { document.getElementById('support-footer')?.scrollIntoView({behavior:'smooth'}); setIsMenuOpen(false); }} className="text-left py-2 hover:text-orange-500">Contact Support</button>
            <button 
              onClick={() => { handleScrollToCategories(); setIsMenuOpen(false); }}
              className="w-full py-3 bg-orange-500 text-white rounded-2xl text-center shadow-lg"
            >
              Get Started Free
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
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
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              ToolTrove offers a complete suite of powerful online tools designed to simplify your life. Fast, secure, client-side, and always free.
            </p>
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
                <motion.div 
                  onClick={() => handleSelectTool('Invoice Generator', 'business')}
                  className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center cursor-pointer hover:border-orange-400 hover:scale-105 transition-all"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <OwlMascot />
                  <span className="mt-2 font-bold text-slate-500 text-sm">Invoice Gen</span>
                </motion.div>
                <motion.div 
                  onClick={() => handleSelectTool('EMI Calculator', 'business')}
                  className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center cursor-pointer hover:border-orange-400 hover:scale-105 transition-all"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <ElephantMascot />
                  <span className="mt-2 font-bold text-slate-500 text-sm">EMI Calculator</span>
                </motion.div>
                <motion.div 
                  onClick={() => handleSelectTool('Format Converter', 'media')}
                  className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center cursor-pointer hover:border-orange-400 hover:scale-105 transition-all"
                  animate={{ x: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <ChameleonMascot />
                  <span className="mt-2 font-bold text-slate-500 text-sm">Compressor</span>
                </motion.div>
                <motion.div 
                  onClick={() => handleSelectTool('Password Generator', 'security')}
                  className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center cursor-pointer hover:border-orange-400 hover:scale-105 transition-all"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity }}
                >
                  <LionMascot />
                  <span className="mt-2 font-bold text-slate-500 text-sm">Security</span>
                </motion.div>
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
          {['🗜️ PDF Compressor', '✍️ AI Resume Builder', '🖼️ Background Remover', '🐛 Code Debugger', '🗄️ SQL Generator', '📝 Paraphraser', '🎥 Video Compressor', '🔑 Password Generator', '📧 Cold Email Writer', '🧾 Invoice Generator', '📱 QR Code Generator', '📺 YouTube Script Writer', '💰 GST Calculator', '🔍 SEO Meta Generator', '🔣 Regex Tester', '⬆️ Image Upscaler', '📖 OCR Tool', '🔄 JSON Formatter', '🌐 AI Translator', '📊 Word Counter', '🗜️ PDF Compressor', '✍️ AI Resume Builder', '🖼️ Background Remover', '🐛 Code Debugger', '🗄️ SQL Generator', '📝 Paraphraser', '🎥 Video Compressor', '🔑 Password Generator', '📧 Cold Email Writer'].map((tool, i) => (
            <div key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full font-semibold text-slate-600 text-sm">{tool}</div>
          ))}
        </motion.div>
        
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="flex gap-4 whitespace-nowrap min-w-max"
        >
          {['🔐 Plagiarism Checker', '🧮 EMI Calculator', '📄 PDF to Word', '💳 IFSC Finder', '🎨 Color Palette', '🔗 URL Shortener', '📅 Age Calculator', '💱 Currency Converter', '🛡️ Hash Checker', '✅ PAN Validator', '📌 Case Converter', '📋 Markdown Editor', '⏱️ Pomodoro Timer', '🔍 IP Lookup', '📊 Keyword Checker', '🏷️ Meta Tag Generator', '📐 Unit Converter', '✉️ Temp Email', '🖋️ Signature Generator', '💼 Business Plan Writer', '🔐 Plagiarism Checker', '🧮 EMI Calculator', '📄 PDF to Word', '💳 IFSC Finder', '🎨 Color Palette', '🔗 URL Shortener', '📅 Age Calculator', '💱 Currency Converter', '🛡️ Hash Checker'].map((tool, i) => (
            <div key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full font-semibold text-slate-600 text-sm">{tool}</div>
          ))}
        </motion.div>
      </div>

      {/* Dynamic Tools Workbench (Renders selected tool) */}
      <AnimatePresence>
        {activeTool && (
          <motion.section 
            id="workbench"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="py-16 px-6 bg-orange-50/30 border-y border-orange-100"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-500 rounded-full animate-ping"></span>
                  <span className="font-bold text-xs text-orange-600 uppercase tracking-widest">Active Tool Sandbox</span>
                </div>
                <button
                  onClick={() => setActiveTool(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-900 hover:text-white font-bold text-xs transition-colors"
                >
                  Close Workbench ×
                </button>
              </div>

              {/* Conditional tool rendering */}
              {(activeCat === 'docs' || activeTool === 'Invoice Generator' || activeTool === 'Invoice Generator India') && <DocumentTools activeTool={activeTool} onBack={() => setActiveTool(null)} />}
              {(activeCat === 'business' && activeTool !== 'Invoice Generator' && activeTool !== 'Invoice Generator India') && <CalculatorTools activeTool={activeTool} onBack={() => setActiveTool(null)} />}
              {activeCat === 'media' && <MediaTools activeTool={activeTool} onBack={() => setActiveTool(null)} />}
              {activeCat === 'security' && <SportsTools activeTool={activeTool} onBack={() => setActiveTool(null)} />}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Categories & Habitation Grid */}
      <section className="py-20 px-6 bg-slate-50/50" id="habitats">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Discover Our Diverse Habitats</h3>
              <p className="text-slate-500 font-medium">Explore categories designed to make your digital life easier.</p>
            </div>
            
            {/* Search Bar Panel */}
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-orange-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. EMI, PDF, Invoice)..." 
                className="pl-12 pr-6 py-4 bg-white border-2 border-slate-200 rounded-2xl w-full outline-none focus:border-orange-500 focus:shadow-lg transition-all text-sm font-semibold"
              />
              
              {/* Dropdown for Search Suggestions */}
              {filteredTools.length > 0 && (
                <div className="absolute left-0 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 max-h-60 overflow-y-auto divide-y divide-slate-100">
                  {filteredTools.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => { handleSelectTool(t.name, t.catId); setSearchQuery(''); }}
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

          {/* Grid Layout of Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATEGORIES.map((cat, idx) => (
              <motion.div 
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group p-1 rounded-3xl bg-gradient-to-br from-white to-slate-100 border-2 ${cat.borderColor} shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer`}
              >
                <div className={`p-8 rounded-[1.4rem] h-full flex flex-col`}>
                  <div className="mb-6 flex justify-between items-start">
                    <div className="p-3 bg-white rounded-2xl shadow-inner group-hover:rotate-6 transition-transform">
                      {cat.icon}
                    </div>
                    {cat.mascot}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">{cat.title}</h4>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">{cat.description}</p>
                  
                  <div className="space-y-2.5">
                    {cat.tools.slice(0, 6).map(tool => (
                      <button 
                        key={tool} 
                        onClick={() => handleSelectTool(tool, cat.id)}
                        className="w-full text-left flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-500 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                        {tool}
                      </button>
                    ))}
                    {cat.tools.length > 6 && (
                      <div className="text-xs text-slate-400 font-bold pl-3.5 italic">+ {cat.tools.length - 6} more tools (Search to use)</div>
                    )}
                    <div 
                      onClick={() => handleSelectTool(cat.tools[0], cat.id)}
                      className="pt-4 border-t border-slate-150 mt-4 flex items-center justify-between text-orange-600 font-bold text-xs"
                    >
                      Interact inside Habitat <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Gemma 4 AI Chat Assistant Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ChatAssistant />
        </div>
      </section>

      {/* Why Us / Feature Section */}
      <section className="py-24 px-6 overflow-hidden bg-slate-950 text-white" id="why-us">
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
              <motion.div 
                className="w-64 h-64 md:w-80 md:h-80 bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -top-6 bg-orange-500 p-4 rounded-2xl shadow-lg shadow-orange-500/40 cursor-pointer" onClick={() => handleSelectTool('Invoice Generator', 'business')}>
                  <OwlMascot />
                </div>
                <div className="absolute -bottom-6 bg-orange-500 p-4 rounded-2xl shadow-lg shadow-orange-500/40 cursor-pointer" onClick={() => handleSelectTool('Password Generator', 'security')}>
                  <LionMascot />
                </div>
                <div className="absolute -left-6 bg-orange-500 p-4 rounded-2xl shadow-lg shadow-orange-500/40 cursor-pointer" onClick={() => handleSelectTool('EMI Calculator', 'business')}>
                  <ElephantMascot />
                </div>
                <div className="absolute -right-6 bg-orange-500 p-4 rounded-2xl shadow-lg shadow-orange-500/40 cursor-pointer" onClick={() => handleSelectTool('Format Converter', 'media')}>
                  <ChameleonMascot />
                </div>
                <div className="w-1/2 h-1/2 bg-white/10 rounded-full blur-xl"></div>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <Sparkles className="text-orange-400 w-12 h-12 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-20 pb-10 px-6" id="support-footer">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-orange-500 rounded-xl">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <h1 className="text-xl font-black text-slate-900">TOOLTROVE</h1>
              </div>
              <p className="text-slate-500 leading-relaxed text-sm">
                Your ultimate online destination for a vast array of free, high-quality web tools. Simplifying the digital jungle one tool at a time.
              </p>
            </div>
            
            <div>
              <h5 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h5>
              <ul className="space-y-4 text-slate-600 font-semibold text-sm">
                <li onClick={() => { setActiveTool(null); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-orange-500 cursor-pointer transition-colors">Home Sandbox</li>
                <li onClick={handleScrollToCategories} className="hover:text-orange-500 cursor-pointer transition-colors">Explore All Tools</li>
                <li onClick={() => document.getElementById('why-us')?.scrollIntoView({behavior:'smooth'})} className="hover:text-orange-500 cursor-pointer transition-colors">About Us</li>
                <li onClick={() => document.getElementById('support-footer')?.scrollIntoView({behavior:'smooth'})} className="hover:text-orange-500 cursor-pointer transition-colors">Contact Support</li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-sm">Popular Tools</h5>
              <ul className="space-y-4 text-slate-600 font-semibold text-sm">
                <li onClick={() => handleSelectTool('Invoice Gen', 'docs')} className="hover:text-orange-500 cursor-pointer transition-colors">Premium Invoice Generator</li>
                <li onClick={() => handleSelectTool('Format Converter', 'media')} className="hover:text-orange-500 cursor-pointer transition-colors">Format Converter & Compressor</li>
                <li onClick={() => handleSelectTool('EMI Calc', 'calc')} className="hover:text-orange-500 cursor-pointer transition-colors">EMI Loan Calculator</li>
                <li onClick={() => handleSelectTool('FIFA Live Tracker', 'sports')} className="hover:text-orange-500 cursor-pointer transition-colors">FIFA Live Match Tracker</li>
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
    </div>
  );
}
