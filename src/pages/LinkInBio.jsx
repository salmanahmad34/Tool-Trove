import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Plus, Trash2, Download, QrCode, Eye, Copy, Check, 
  ExternalLink, Mail, 
  Globe, Palette, Type, Image as ImageIcon, ArrowLeft, LayoutGrid, 
  TrendingUp, RefreshCw, Smartphone
} from 'lucide-react';
import { Instagram, Linkedin, Youtube, Twitter } from '../components/SocialIcons';
import { callGemmaAI } from '../utils/ai';

// Predefined Fonts
const FONTS = [
  { id: 'sans', name: 'Plus Jakarta Sans (Modern)', className: 'font-sans' },
  { id: 'serif', name: 'Lora (Elegant Serif)', className: 'font-serif' },
  { id: 'mono', name: 'Fira Code (Tech Mono)', className: 'font-mono' }
];

// Predefined Themes with complete visual attributes
const THEMES = [
  {
    id: 'minimalist',
    name: 'Minimalist Dark',
    bgClass: 'bg-slate-950 text-slate-100',
    cardClass: 'bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800',
    buttonColor: '#1E293B',
    accentColor: '#F8FAFC',
    textColor: '#F8FAFC',
    bioColor: '#94A3B8'
  },
  {
    id: 'creative',
    name: 'Creative Gradient',
    bgClass: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white',
    cardClass: 'bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30',
    buttonColor: 'rgba(255,255,255,0.2)',
    accentColor: '#FFFFFF',
    textColor: '#FFFFFF',
    bioColor: '#FFE4E6'
  },
  {
    id: 'professional',
    name: 'Executive Corporate',
    bgClass: 'bg-slate-50 text-slate-900',
    cardClass: 'bg-white border-2 border-slate-200 shadow-md text-slate-700 hover:border-orange-500 hover:bg-slate-50',
    buttonColor: '#FFFFFF',
    accentColor: '#EA580C',
    textColor: '#0F172A',
    bioColor: '#64748B'
  },
  {
    id: 'modern-glass',
    name: 'Modern Glassmorphic',
    bgClass: 'bg-gradient-to-tr from-indigo-900 to-slate-900 text-slate-100 relative overflow-hidden',
    cardClass: 'bg-white/10 backdrop-blur-md border border-white/10 text-slate-100 hover:bg-white/15 hover:border-white/20 shadow-lg',
    buttonColor: 'rgba(255,255,255,0.1)',
    accentColor: '#A5B4FC',
    textColor: '#F8FAFC',
    bioColor: '#CBD5E1'
  },
  {
    id: 'trendy-neon',
    name: 'Cyberpunk Neon',
    bgClass: 'bg-black text-emerald-400 border border-emerald-950',
    cardClass: 'bg-zinc-950 border border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]',
    buttonColor: '#09090B',
    accentColor: '#10B981',
    textColor: '#10B981',
    bioColor: '#059669'
  }
];

export default function LinkInBio() {
  const navigate = useNavigate();
  
  // Customization States
  const [profileName, setProfileName] = useState('Sarah Jenkins');
  const [bio, setBio] = useState('Product designer crafting secure sandboxes @ToolTrove. Explaining tech with minimal visuals.');
  const [profilePic, setProfilePic] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150');
  const [selectedFont, setSelectedFont] = useState('sans');
  const [selectedTheme, setSelectedTheme] = useState('creative');
  const [copied, setCopied] = useState(false);
  const [analytics, setAnalytics] = useState({ views: 182, clicks: {} });

  // Social Links
  const [socials, setSocials] = useState({
    instagram: 'sarah_design',
    linkedin: 'sarah-jenkins-designer',
    youtube: 'SarahDesigns',
    twitter: 'sarah_tweets',
    email: 'sarah@tooltrove.com'
  });

  // Custom Links Blocks
  const [links, setLinks] = useState([
    { id: '1', title: '💼 Hire Me / Design Portfolio', url: 'https://sarahjenkins.design', clicks: 42 },
    { id: '2', title: '🎨 Download Free Figma Templates', url: 'https://figma.com/@sarah', clicks: 89 },
    { id: '3', title: '💻 Read My Weekly Tech Blog', url: 'https://blog.sarah.design', clicks: 51 }
  ]);

  // AI Inputs
  const [aiDescription, setAiDescription] = useState('Vibrant creative UI designer focusing on glassmorphism and accessibility');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  // Sync analytics with localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tooltrove_link_analytics');
    if (saved) {
      setAnalytics(JSON.parse(saved));
    } else {
      const initialClicks = {};
      links.forEach(l => { initialClicks[l.id] = l.clicks; });
      const init = { views: 182, clicks: initialClicks };
      setAnalytics(init);
      localStorage.setItem('tooltrove_link_analytics', JSON.stringify(init));
    }
  }, []);

  // Save changes to Dashboard items (localStorage)
  const saveToDashboard = () => {
    const savedItems = localStorage.getItem('tooltrove_dashboard_items') 
      ? JSON.parse(localStorage.getItem('tooltrove_dashboard_items')) 
      : [];
    
    // Check if this project already exists
    const existingIdx = savedItems.findIndex(i => i.type === 'link-in-bio');
    const project = {
      type: 'link-in-bio',
      title: profileName + "'s Link-in-Bio",
      updatedAt: new Date().toLocaleDateString(),
      config: { profileName, bio, profilePic, selectedFont, selectedTheme, socials, links }
    };

    if (existingIdx > -1) {
      savedItems[existingIdx] = project;
    } else {
      savedItems.push(project);
    }
    localStorage.setItem('tooltrove_dashboard_items', JSON.stringify(savedItems));
  };

  const handleSave = () => {
    saveToDashboard();
    alert('Project successfully saved to your Dashboard!');
  };

  // Add Link Block
  const addLink = () => {
    const newId = Date.now().toString();
    setLinks([...links, { id: newId, title: 'Custom Link Title', url: 'https://', clicks: 0 }]);
  };

  // Remove Link Block
  const removeLink = (id) => {
    setLinks(links.filter(l => l.id !== id));
  };

  // Update Link Block
  const updateLink = (id, field, val) => {
    setLinks(links.map(l => l.id === id ? { ...l, [field]: val } : l));
  };

  // Simulate Clicks in Mock Device
  const simulateClick = (linkId, url) => {
    const updatedClicks = { ...analytics.clicks, [linkId]: (analytics.clicks[linkId] || 0) + 1 };
    const updated = { ...analytics, clicks: updatedClicks };
    setAnalytics(updated);
    localStorage.setItem('tooltrove_link_analytics', JSON.stringify(updated));
    window.open(url, '_blank');
  };

  // AI Bio Generator Call
  const generateBioWithAI = async () => {
    if (!aiDescription.trim()) return;
    setIsGeneratingBio(true);
    try {
      const sys = "You are a professional copywriting assistant inside ToolTrove's Link-in-Bio builder. Generate a punchy, engaging, and professional bio (maximum 120 characters) based on the user's description. Return ONLY the bio string. No headers, quotes, or conversational filler.";
      const generated = await callGemmaAI(sys, `Write a short bio for: ${aiDescription}`);
      setBio(generated.replace(/^["']|["']$/g, '').trim());
    } catch (err) {
      alert("AI request failed: " + err.message);
    } finally {
      setIsGeneratingBio(false);
    }
  };

  // Theme Object
  const theme = THEMES.find(t => t.id === selectedTheme) || THEMES[0];
  const font = FONTS.find(f => f.id === selectedFont) || FONTS[0];

  // Export shareable standalone single-file HTML code
  const downloadHTML = () => {
    const customStyles = `
      body {
        font-family: system-ui, -apple-system, sans-serif;
        backgroundClass: ${selectedTheme === 'minimalist' ? '#020617' : selectedTheme === 'trendy-neon' ? '#000000' : 'linear-gradient(to bottom right, #C084FC, #F43F5E, #FB923C)'};
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
      .card {
        width: 100%;
        max-width: 480px;
        padding: 2.5rem 1.5rem;
        text-align: center;
        border-radius: 2rem;
      }
    `;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profileName} | Link in Bio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: sans-serif; }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4 md:p-8 ${theme.bgClass}">
  <div class="w-full max-w-md text-center space-y-6 ${font.className}">
    <!-- Profile -->
    <div class="flex flex-col items-center space-y-4">
      <img src="${profilePic}" alt="${profileName}" class="w-24 h-24 rounded-full border-4 border-white/50 object-cover shadow-lg">
      <div>
        <h1 class="text-2xl font-black tracking-tight" style="color: ${theme.textColor}">${profileName}</h1>
        <p class="text-sm mt-2 font-medium max-w-sm px-4" style="color: ${theme.bioColor}">${bio}</p>
      </div>
    </div>

    <!-- Social Links -->
    <div class="flex justify-center gap-4 py-2">
      ${socials.instagram ? `<a href="https://instagram.com/${socials.instagram}" target="_blank" class="p-2.5 rounded-full hover:scale-110 transition-transform" style="background-color: ${theme.buttonColor}; color: ${theme.textColor}"><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>` : ''}
      ${socials.linkedin ? `<a href="https://linkedin.com/in/${socials.linkedin}" target="_blank" class="p-2.5 rounded-full hover:scale-110 transition-transform" style="background-color: ${theme.buttonColor}; color: ${theme.textColor}"><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>` : ''}
      ${socials.twitter ? `<a href="https://twitter.com/${socials.twitter}" target="_blank" class="p-2.5 rounded-full hover:scale-110 transition-transform" style="background-color: ${theme.buttonColor}; color: ${theme.textColor}"><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>` : ''}
      ${socials.email ? `<a href="mailto:${socials.email}" class="p-2.5 rounded-full hover:scale-110 transition-transform" style="background-color: ${theme.buttonColor}; color: ${theme.textColor}"><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18zm21.518 2L12 12.713 2.482 5zm-19.518 14v-11.817l10 7.877 10-7.877v11.817z"/></svg></a>` : ''}
    </div>

    <!-- Link Blocks -->
    <div class="space-y-4 px-2">
      ${links.map(l => `
        <a 
          href="${l.url}" 
          target="_blank" 
          class="block py-4 px-6 rounded-2xl font-bold transition-all hover:scale-102 flex justify-between items-center ${theme.cardClass}"
        >
          <span>${l.title}</span>
          <svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      `).join('')}
    </div>

    <div class="pt-8 text-[10px] opacity-40" style="color: ${theme.textColor}">
      Powered by ToolTrove Sandbox • Secure In-Browser Identity
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${profileName.toLowerCase().replace(/\s+/g, '-')}-link-in-bio.html`;
    a.click();
  };

  const copyShareableLink = () => {
    const mockUrl = `https://salmanahmad34.github.io/Tool-Trove/#/link-in-bio-preview?user=${encodeURIComponent(profileName)}`;
    navigator.clipboard.writeText(mockUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pt-32 pb-20 px-6 touch-latency-fix">
      
      {/* Header breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-1.5 text-slate-500 font-bold hover:text-slate-900 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </button>
        <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-orange-500 font-black text-sm uppercase tracking-wider">Link in Bio Generator</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* ==================== LEFT CONFIG PANEL ==================== */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main settings card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex justify-between items-start flex-wrap gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Custom Identity Designer</h3>
                  <p className="text-xs text-slate-500 font-medium">Build your premium multi-theme Link-In-Bio sandbox.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md"
                >
                  Save Project
                </button>
                <button
                  onClick={downloadHTML}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> HTML
                </button>
              </div>
            </div>

            {/* Profile Config */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Profile Name</label>
                <input 
                  type="text" 
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold outline-none focus:bg-white focus:border-orange-500 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Avatar Image URL</label>
                <input 
                  type="text" 
                  value={profilePic}
                  onChange={(e) => setProfilePic(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono outline-none focus:bg-white focus:border-orange-500 transition-all text-xs"
                />
              </div>
            </div>

            {/* AI Generator Box */}
            <div className="p-5 bg-gradient-to-br from-orange-50/60 to-transparent border border-orange-100 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                <h5 className="font-black text-xs text-orange-700 uppercase tracking-widest">Gemma AI Bio Generator</h5>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                Type a brief line about your core expertise, and we will formulate a highly optimized professional bio automatically.
              </p>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiDescription}
                  onChange={(e) => setAiDescription(e.target.value)}
                  placeholder="e.g. Fullstack React engineer and content creator focused on clean UI code"
                  className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-orange-400 focus:shadow-inner"
                />
                <button
                  onClick={generateBioWithAI}
                  disabled={isGeneratingBio || !aiDescription.trim()}
                  className="px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
                >
                  {isGeneratingBio ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Write'}
                </button>
              </div>
            </div>

            {/* Bio textarea */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Bio Text (Max 120 chars)</label>
              <textarea 
                rows="2"
                maxLength="120"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:bg-white focus:border-orange-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Social Links Panel */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-orange-500" /> Social Identity Channels
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><Instagram className="w-3 h-3" /> Instagram Handle</label>
                <input 
                  type="text" 
                  value={socials.instagram}
                  onChange={(e) => setSocials({...socials, instagram: e.target.value})}
                  placeholder="username"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><Linkedin className="w-3 h-3" /> LinkedIn Handle</label>
                <input 
                  type="text" 
                  value={socials.linkedin}
                  onChange={(e) => setSocials({...socials, linkedin: e.target.value})}
                  placeholder="sarah-jenkins"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><Twitter className="w-3 h-3" /> Twitter Handle</label>
                <input 
                  type="text" 
                  value={socials.twitter}
                  onChange={(e) => setSocials({...socials, twitter: e.target.value})}
                  placeholder="username"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><Mail className="w-3 h-3" /> Email Address</label>
                <input 
                  type="text" 
                  value={socials.email}
                  onChange={(e) => setSocials({...socials, email: e.target.value})}
                  placeholder="you@domain.com"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Links Blocks Panel */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-orange-500" /> Custom Links Blocks
              </h4>
              
              <button 
                onClick={addLink}
                className="px-3.5 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Block
              </button>
            </div>

            <div className="space-y-4">
              {links.map((link, idx) => (
                <div key={link.id} className="p-4 bg-slate-50/50 border border-slate-200 rounded-2xl flex flex-col md:flex-row gap-3 items-end">
                  <div className="flex-1 space-y-3 w-full">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                      placeholder="Custom Button Label"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                      placeholder="Destination URL (https://...)"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-2.5 py-1 bg-white border border-slate-200 rounded-xl">
                      Clicks: {analytics.clicks[link.id] || 0}
                    </div>
                    <button 
                      onClick={() => removeLink(link.id)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Theme & Styling Selection */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Type className="w-4 h-4 text-orange-500" /> Theme Styling Engines
            </h4>

            {/* Themes grid */}
            <div className="space-y-4">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Design Presets</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTheme(t.id)}
                    className={`p-3 rounded-2xl border-2 text-[10px] font-black uppercase tracking-wider transition-all text-center ${
                      selectedTheme === t.id 
                        ? 'border-orange-500 bg-orange-50/20 text-orange-600 shadow-sm' 
                        : 'border-slate-200 text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    {t.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Font selector */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Typography Preset</label>
              <div className="grid grid-cols-3 gap-3">
                {FONTS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFont(f.id)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedFont === f.id 
                        ? 'border-orange-500 bg-orange-50/10 text-orange-600' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {f.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Analytics simulation log */}
          <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-orange-500" /> Link-In-Bio Analytics Logs
              </h4>
              <span className="px-2.5 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-md text-[9px] font-black uppercase">
                Active Tracking
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl text-center space-y-1">
                <span className="text-2xl font-black text-slate-100">{analytics.views}</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Profile Views</p>
              </div>

              <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl text-center space-y-1">
                <span className="text-2xl font-black text-emerald-400">
                  {Object.values(analytics.clicks).reduce((a, b) => a + b, 0)}
                </span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Links Clicked</p>
              </div>
            </div>
          </div>

        </div>

        {/* ==================== RIGHT MOBILE PREVIEW PANEL ==================== */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
          
          <div className="text-center font-black text-xs uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2">
            <Smartphone className="w-4 h-4" /> Live Mobile Sandbox Preview
          </div>

          {/* Standalone simulated smartphone frame */}
          <div className="mx-auto w-[320px] md:w-[360px] h-[640px] bg-slate-950 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col overflow-hidden">
            
            {/* Camera speaker bezel */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 border border-slate-800 rounded-full z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-slate-950 rounded-full ml-3 border border-slate-800"></div>
            </div>

            {/* Dynamic scrollable canvas container matching selections */}
            <div className={`flex-1 rounded-[2.5rem] overflow-y-auto px-6 py-14 flex flex-col justify-between items-center text-center select-none scrollbar-none transition-all duration-300 relative ${theme.bgClass}`}>
              
              {/* Blur elements forModern Glass */}
              {selectedTheme === 'modern-glass' && (
                <>
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none"></div>
                </>
              )}

              <div className="w-full space-y-6">
                
                {/* Avatar & Identifiers */}
                <div className="flex flex-col items-center space-y-3">
                  <img 
                    src={profilePic} 
                    alt={profileName}
                    className="w-20 h-20 rounded-full border-2 border-white/50 object-cover shadow-md hover:scale-105 transition-transform" 
                  />
                  
                  <div>
                    <h4 
                      className={`text-lg font-black tracking-tight ${font.className}`}
                      style={{ color: theme.textColor }}
                    >
                      {profileName}
                    </h4>
                    <p 
                      className="text-xs font-semibold leading-relaxed max-w-[240px] mt-1.5 mx-auto"
                      style={{ color: theme.bioColor }}
                    >
                      {bio}
                    </p>
                  </div>
                </div>

                {/* Social icons */}
                <div className="flex justify-center gap-3.5 py-1">
                  {socials.instagram && (
                    <a 
                      href={`https://instagram.com/${socials.instagram}`}
                      target="_blank"
                      className="p-2 rounded-full hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: theme.buttonColor, color: theme.textColor }}
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}

                  {socials.linkedin && (
                    <a 
                      href={`https://linkedin.com/in/${socials.linkedin}`}
                      target="_blank"
                      className="p-2 rounded-full hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: theme.buttonColor, color: theme.textColor }}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}

                  {socials.twitter && (
                    <a 
                      href={`https://twitter.com/${socials.twitter}`}
                      target="_blank"
                      className="p-2 rounded-full hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: theme.buttonColor, color: theme.textColor }}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}

                  {socials.email && (
                    <a 
                      href={`mailto:${socials.email}`}
                      className="p-2 rounded-full hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: theme.buttonColor, color: theme.textColor }}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Custom Card Link Blocks */}
                <div className="space-y-3.5 w-full">
                  {links.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => simulateClick(link.id, link.url)}
                      className={`w-full py-3 px-5 rounded-xl font-black text-xs flex justify-between items-center transition-all ${theme.cardClass} ${font.className}`}
                    >
                      <span>{link.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  ))}
                </div>

              </div>

              {/* device footer */}
              <div 
                className="text-[9px] font-black tracking-widest uppercase opacity-40 pt-6 mt-4 w-full"
                style={{ color: theme.textColor }}
              >
                ⚡ Compiled by ToolTrove
              </div>

            </div>

            {/* bottom home button indicator */}
            <div className="h-10 w-full flex items-center justify-center shrink-0">
              <div className="w-28 h-1 bg-slate-800 rounded-full"></div>
            </div>

          </div>

          {/* Copy link buttons */}
          <div className="flex gap-2 justify-center max-w-sm mx-auto">
            <button
              onClick={copyShareableLink}
              className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500 animate-bounce" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied URL!' : 'Copy Preview Link'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

// Simple internal helper wrapper to ensure clean chevron rendering
function ChevronRightIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
    </svg>
  );
}
