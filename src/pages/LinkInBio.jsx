import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Plus, Trash2, Download, Copy, Check, ExternalLink, 
  Mail, LayoutGrid, RefreshCw, Smartphone, Image as ImageIcon, 
  Settings, Link2, Monitor, X
} from 'lucide-react';
import { Instagram, Linkedin, Youtube, Twitter, Github } from '../components/SocialIcons';
import { callGemmaAI } from '../utils/ai';

export default function LinkInBio() {
  const navigate = useNavigate();
  
  // Customization States
  const [profileName, setProfileName] = useState('Alex Creator');
  const [bio, setBio] = useState('Digital artist & tech enthusiast building modern experiences.');
  const [location, setLocation] = useState('Neo-Tokyo, CA');
  const [profilePic, setProfilePic] = useState('https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300');
  
  const [copied, setCopied] = useState(false);
  const [aiDescription, setAiDescription] = useState('');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  // Social Links (Dynamic)
  const [socials, setSocials] = useState([
    { id: '1', platform: 'instagram', url: 'https://instagram.com/alex' },
    { id: '2', platform: 'twitter', url: 'https://twitter.com/alex' },
    { id: '3', platform: 'linkedin', url: 'https://linkedin.com/in/alex' },
    { id: '4', platform: 'youtube', url: 'https://youtube.com/c/alex' }
  ]);

  // Product/Link Cards (Dynamic)
  const [cards, setCards] = useState([
    { 
      id: '1', 
      title: 'My Latest Portfolio', 
      description: 'Check out my recent design projects and case studies.', 
      imageUrl: '', 
      link: 'https://portfolio.com', 
      category: 'Work', 
      accentColor: '#9d4edd' 
    },
    { 
      id: '2', 
      title: 'YouTube Masterclass', 
      description: 'Learn how to build modern UI components from scratch.', 
      imageUrl: '', 
      link: 'https://youtube.com', 
      category: 'Course', 
      accentColor: '#3a86ff' 
    }
  ]);

  // Advanced Customization
  const [customization, setCustomization] = useState({
    primaryColor: '#9d4edd',
    secondaryColor: '#3a86ff',
    glowIntensity: 50,
    animationSpeed: 'normal' // slow, normal, fast
  });

  // Load from LocalStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('tooltrove_dashboard_items');
    if (savedItems) {
      const items = JSON.parse(savedItems);
      const project = items.find(i => i.type === 'link-in-bio');
      if (project && project.config) {
        setProfileName(project.config.profileName || profileName);
        setBio(project.config.bio || bio);
        setLocation(project.config.location || location);
        setProfilePic(project.config.profilePic || profilePic);
        setSocials(project.config.socials || socials);
        setCards(project.config.cards || cards);
        setCustomization(project.config.customization || customization);
      }
    }
  }, []);

  // Save changes to Dashboard items
  const handleSave = () => {
    const savedItems = localStorage.getItem('tooltrove_dashboard_items') 
      ? JSON.parse(localStorage.getItem('tooltrove_dashboard_items')) 
      : [];
    
    const existingIdx = savedItems.findIndex(i => i.type === 'link-in-bio');
    const project = {
      type: 'link-in-bio',
      title: profileName + "'s Link-in-Bio",
      updatedAt: new Date().toLocaleDateString(),
      config: { profileName, bio, location, profilePic, socials, cards, customization }
    };

    if (existingIdx > -1) {
      savedItems[existingIdx] = project;
    } else {
      savedItems.push(project);
    }
    localStorage.setItem('tooltrove_dashboard_items', JSON.stringify(savedItems));
    alert('Project successfully saved to your Dashboard!');
  };

  const handleReset = () => {
    if(window.confirm('Reset all fields to default?')) {
      setProfileName('Alex Creator');
      setBio('Digital artist & tech enthusiast building modern experiences.');
      setLocation('Neo-Tokyo, CA');
      setProfilePic('https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300');
      setSocials([{ id: '1', platform: 'instagram', url: 'https://instagram.com/' }]);
      setCards([{ id: '1', title: 'New Link', description: '', imageUrl: '', link: 'https://', category: 'Link', accentColor: '#9d4edd' }]);
      setCustomization({ primaryColor: '#9d4edd', secondaryColor: '#3a86ff', glowIntensity: 50, animationSpeed: 'normal' });
    }
  };

  // Image Upload Handler (FileReader to Base64)
  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  // --- Dynamic Social Array Handlers ---
  const addSocial = () => {
    setSocials([...socials, { id: Date.now().toString(), platform: 'instagram', url: 'https://' }]);
  };
  const updateSocial = (id, field, val) => {
    setSocials(socials.map(s => s.id === id ? { ...s, [field]: val } : s));
  };
  const removeSocial = (id) => {
    setSocials(socials.filter(s => s.id !== id));
  };

  // --- Dynamic Card Array Handlers ---
  const addCard = () => {
    setCards([...cards, { 
      id: Date.now().toString(), 
      title: 'New Card', 
      description: '', 
      imageUrl: '', 
      link: 'https://', 
      category: 'Link', 
      accentColor: customization.primaryColor 
    }]);
  };
  const updateCard = (id, field, val) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: val } : c));
  };
  const removeCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
  };

  // --- AI Generator ---
  const generateBioWithAI = async () => {
    if (!aiDescription.trim()) return;
    setIsGeneratingBio(true);
    try {
      const sys = "You are a professional copywriting assistant. Generate a punchy, engaging, and professional bio (maximum 150 characters) based on the user's description. Return ONLY the bio string. No headers or quotes.";
      const generated = await callGemmaAI(sys, `Write a short bio for: ${aiDescription}`);
      setBio(generated.replace(/^["']|["']$/g, '').trim());
    } catch (err) {
      alert("AI request failed: " + err.message);
    } finally {
      setIsGeneratingBio(false);
    }
  };

  // --- Helper to render SVG string for HTML Export ---
  const getSocialIconSVG = (platform) => {
    switch(platform) {
      case 'instagram': return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`;
      case 'linkedin': return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;
      case 'twitter': return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`;
      case 'youtube': return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>`;
      case 'github': return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;
      case 'tiktok': return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1z"/></svg>`;
      case 'email': return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
      default: return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
    }
  };

  const getSocialIconComponent = (platform, className) => {
    switch(platform) {
      case 'instagram': return <Instagram className={className} />;
      case 'linkedin': return <Linkedin className={className} />;
      case 'twitter': return <Twitter className={className} />;
      case 'youtube': return <Youtube className={className} />;
      case 'github': return <Github className={className} />;
      case 'tiktok': return <div className={className} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1z"/></svg></div>;
      case 'email': return <Mail className={className} />;
      default: return <Link2 className={className} />;
    }
  };

  // --- Export HTML Function ---
  const downloadHTML = () => {
    const animDuration = customization.animationSpeed === 'slow' ? '15s' : customization.animationSpeed === 'fast' ? '5s' : '10s';
    
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profileName} | Link in Bio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #0f1419;
      --primary: ${customization.primaryColor};
      --secondary: ${customization.secondaryColor};
      --text-main: #ffffff;
      --text-muted: rgba(255, 255, 255, 0.7);
      --glass-bg: rgba(255, 255, 255, 0.05);
      --glass-border: rgba(255, 255, 255, 0.1);
      --glow-intensity: ${customization.glowIntensity / 100};
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
    
    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 3rem 1rem;
      position: relative;
      overflow-x: hidden;
      background-image: 
        radial-gradient(circle at 15% 50%, rgba(157, 78, 221, calc(0.15 * var(--glow-intensity))), transparent 40%),
        radial-gradient(circle at 85% 30%, rgba(58, 134, 255, calc(0.15 * var(--glow-intensity))), transparent 40%);
      background-size: 200% 200%;
      animation: bgPulse ${animDuration} ease-in-out infinite alternate;
    }

    @keyframes bgPulse {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }

    .container { width: 100%; max-width: 450px; display: flex; flex-direction: column; gap: 2rem; z-index: 10; }

    .profile { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .avatar-wrapper {
      position: relative; width: 110px; height: 110px; border-radius: 50%; padding: 4px;
      background: linear-gradient(45deg, var(--primary), var(--secondary));
      background-size: 300% 300%;
      animation: borderCycle 4s ease infinite;
      box-shadow: 0 0 calc(30px * var(--glow-intensity)) var(--primary);
    }
    @keyframes borderCycle {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .avatar-wrapper img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid var(--bg-dark); background-color: var(--bg-dark); }
    .profile-name { font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; }
    .profile-bio { font-weight: 400; color: var(--text-muted); line-height: 1.5; font-size: 0.95rem; }
    .profile-location {
      font-size: 0.85rem; font-weight: 600; background: var(--glass-bg); border: 1px solid var(--glass-border);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 0.4rem 1rem; border-radius: 2rem; color: var(--secondary);
    }

    .social-strip { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; }
    .social-icon {
      width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
      background: var(--glass-bg); backdrop-filter: blur(10px); border: 1px solid var(--glass-border); color: var(--text-main);
      text-decoration: none; transition: all 0.3s ease; position: relative;
    }
    .social-icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; position: relative; z-index: 2; }
    .social-icon::before {
      content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--primary); opacity: 0; transition: opacity 0.3s ease; z-index: 1;
    }
    .social-icon:hover { border-color: var(--primary); color: #fff; transform: translateY(-3px); box-shadow: 0 0 calc(20px * var(--glow-intensity)) var(--primary); }
    .social-icon:hover::before { opacity: 1; }
    .social-icon:nth-child(even):before { background: var(--secondary); }
    .social-icon:nth-child(even):hover { border-color: var(--secondary); box-shadow: 0 0 calc(20px * var(--glow-intensity)) var(--secondary); }

    .links-wrapper { display: flex; flex-direction: column; gap: 1rem; }
    .link-card {
      position: relative; display: flex; align-items: center; padding: 1rem 1.25rem; background: var(--glass-bg);
      backdrop-filter: blur(12px); border: 1px solid var(--glass-border); border-radius: 1rem; text-decoration: none;
      color: var(--text-main); overflow: hidden; transition: all 0.3s ease;
    }
    .link-card::after {
      content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background: linear-gradient(90deg, var(--primary), var(--secondary));
      opacity: 0.5; transition: opacity 0.3s ease;
    }
    .link-card:hover {
      transform: scale(1.02); background: rgba(255, 255, 255, 0.08); border-color: var(--secondary);
      box-shadow: 0 0 calc(25px * var(--glow-intensity)) rgba(58, 134, 255, 0.3);
    }
    .link-card:hover::after { opacity: 1; }
    .card-icon { margin-right: 1rem; color: var(--secondary); display: flex; align-items: center; justify-content: center; }
    .card-icon img { width: 44px; height: 44px; border-radius: 12px; object-fit: cover; }
    .card-icon svg { width: 24px; height: 24px; stroke-width: 2; }
    .card-content { flex-grow: 1; display: flex; flex-direction: column; }
    .card-badge { align-self: flex-start; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; color: var(--primary); }
    .card-title { font-weight: 800; font-size: 1.05rem; background: linear-gradient(90deg, #fff, #ddd); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 2px; transition: all 0.3s ease; }
    .link-card:hover .card-title { background: linear-gradient(90deg, var(--primary), var(--secondary)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
    .card-desc { font-size: 0.8rem; color: var(--text-muted); }
    
    .footer-credit { text-align: center; font-size: 0.75rem; color: var(--text-muted); opacity: 0.5; margin-top: 2rem; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="profile">
      <div class="avatar-wrapper">
        <img src="${profilePic}" alt="${profileName}" />
      </div>
      <h1 class="profile-name">${profileName}</h1>
      <p class="profile-bio">${bio}</p>
      ${location ? `<div class="profile-location">📍 ${location}</div>` : ''}
    </div>

    <div class="social-strip">
      ${socials.map(s => `
        <a href="${s.url}" class="social-icon" target="_blank" aria-label="${s.platform}">
          ${getSocialIconSVG(s.platform)}
        </a>
      `).join('')}
    </div>

    <div class="links-wrapper">
      ${cards.map(c => `
        <a href="${c.link}" class="link-card" target="_blank">
          ${c.imageUrl ? `
            <div class="card-icon">
              <img src="${c.imageUrl}" alt="Icon" />
            </div>
          ` : `
            <div class="card-icon" style="color: ${c.accentColor}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
            </div>
          `}
          <div class="card-content">
            ${c.category ? `<span class="card-badge" style="color: ${c.accentColor}">${c.category}</span>` : ''}
            <h2 class="card-title">${c.title}</h2>
            ${c.description ? `<p class="card-desc">${c.description}</p>` : ''}
          </div>
        </a>
      `).join('')}
    </div>
    
    <div class="footer-credit">⚡ Compiled by ToolTrove</div>
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
    <div className="w-full max-w-7xl mx-auto pt-32 pb-20 px-4 md:px-6 touch-latency-fix">
      
      {/* Header breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-slate-500 font-bold hover:text-slate-900 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Home
          </button>
          <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-orange-500 font-black text-sm uppercase tracking-wider hidden sm:inline">Modern Gradient Dark Editor</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* ==================== LEFT CONFIG PANEL ==================== */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Action Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                <Settings className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Editor Controls</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={handleReset} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase transition-colors">
                Reset
              </button>
              <button onClick={handleSave} className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm">
                Save
              </button>
              <button onClick={downloadHTML} className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> HTML
              </button>
            </div>
          </div>

          {/* Profile Config */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-2">Profile Details</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Profile Name</label>
                <input 
                  type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Location</label>
                <input 
                  type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase">Avatar Image (Upload or URL)</label>
              <div className="flex gap-2">
                <input 
                  type="text" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder="Paste URL here..."
                  className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-indigo-500"
                />
                <label className="px-4 py-3 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-xl cursor-pointer hover:bg-indigo-100 transition-colors flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" /> Upload
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setProfilePic)} />
                </label>
              </div>
            </div>

            {/* AI Generator Box */}
            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                <h5 className="font-black text-xs text-indigo-700 uppercase tracking-widest">AI Bio Writer</h5>
              </div>
              <div className="flex gap-2">
                <input
                  type="text" value={aiDescription} onChange={(e) => setAiDescription(e.target.value)}
                  placeholder="e.g. Graphic designer from NY"
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-400"
                />
                <button
                  onClick={generateBioWithAI} disabled={isGeneratingBio || !aiDescription.trim()}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all"
                >
                  {isGeneratingBio ? '...' : 'Write'}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase">Bio Text (Max 150 chars)</label>
              <textarea 
                rows="2" maxLength="150" value={bio} onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>

          {/* Social Links Panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="font-black text-sm text-slate-900">Social Links</h4>
              <button onClick={addSocial} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-indigo-100">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            
            <div className="space-y-3">
              {socials.map((social) => (
                <div key={social.id} className="flex gap-2 items-center p-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <select 
                    value={social.platform} 
                    onChange={(e) => updateSocial(social.id, 'platform', e.target.value)}
                    className="p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="github">GitHub</option>
                    <option value="tiktok">TikTok</option>
                    <option value="email">Email</option>
                    <option value="other">Other Link</option>
                  </select>
                  <input 
                    type="text" value={social.url} onChange={(e) => updateSocial(social.id, 'url', e.target.value)}
                    className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none font-mono" placeholder="URL"
                  />
                  <button onClick={() => removeSocial(social.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Link Cards Panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="font-black text-sm text-slate-900">Product / Link Cards</h4>
              <button onClick={addCard} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-indigo-100">
                <Plus className="w-3 h-3" /> Add Card
              </button>
            </div>

            <div className="space-y-4">
              {cards.map((card, idx) => (
                <div key={card.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative space-y-3">
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={() => removeCard(card.id)} className="p-1.5 bg-white text-rose-500 border border-slate-200 shadow-sm hover:bg-rose-50 rounded-lg">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Card #{idx + 1}</div>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    <input type="text" value={card.title} onChange={(e) => updateCard(card.id, 'title', e.target.value)} placeholder="Card Title" className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none" />
                    <input type="text" value={card.category} onChange={(e) => updateCard(card.id, 'category', e.target.value)} placeholder="Badge/Category (e.g. Product)" className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none" />
                  </div>
                  <input type="text" value={card.description} onChange={(e) => updateCard(card.id, 'description', e.target.value)} placeholder="Short Description (Max 80 chars)" maxLength="80" className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none" />
                  <input type="text" value={card.link} onChange={(e) => updateCard(card.id, 'link', e.target.value)} placeholder="Destination URL" className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono outline-none" />
                  
                  <div className="flex items-center gap-3">
                    <input type="color" value={card.accentColor} onChange={(e) => updateCard(card.id, 'accentColor', e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" title="Accent Color" />
                    <input type="text" value={card.imageUrl} onChange={(e) => updateCard(card.id, 'imageUrl', e.target.value)} placeholder="Image URL (optional)" className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono outline-none" />
                    <label className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl cursor-pointer hover:bg-indigo-100 flex-shrink-0">
                      <ImageIcon className="w-4 h-4" />
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (res) => updateCard(card.id, 'imageUrl', res))} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Customization */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-2">Global Customization</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{customization.primaryColor}</span>
                    <input type="color" value={customization.primaryColor} onChange={(e) => setCustomization({...customization, primaryColor: e.target.value})} className="w-8 h-8 rounded cursor-pointer" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase">Secondary Color</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{customization.secondaryColor}</span>
                    <input type="color" value={customization.secondaryColor} onChange={(e) => setCustomization({...customization, secondaryColor: e.target.value})} className="w-8 h-8 rounded cursor-pointer" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                    <label>Glow Intensity</label>
                    <span>{customization.glowIntensity}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={customization.glowIntensity} onChange={(e) => setCustomization({...customization, glowIntensity: e.target.value})} className="w-full accent-indigo-500" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Animation Speed</label>
                  <select value={customization.animationSpeed} onChange={(e) => setCustomization({...customization, animationSpeed: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none">
                    <option value="slow">Slow & Subtle</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast & Energetic</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ==================== RIGHT MOBILE PREVIEW PANEL ==================== */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-4">
          
          <div className="text-center font-black text-xs uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2">
            <Monitor className="w-4 h-4" /> Live Responsive Preview
          </div>

          <div className="mx-auto w-[320px] md:w-[360px] h-[640px] bg-slate-950 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col overflow-hidden">
            
            {/* Camera speaker bezel */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 border border-slate-800 rounded-full z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-slate-950 rounded-full ml-3 border border-slate-800"></div>
            </div>

            {/* Custom Preview Wrapper */}
            <div 
              className="flex-1 rounded-[2.5rem] overflow-y-auto overflow-x-hidden text-center select-none scrollbar-none relative"
              style={{
                backgroundColor: '#0f1419',
                color: '#ffffff',
                backgroundImage: `radial-gradient(circle at 15% 50%, ${customization.primaryColor}${Math.floor(customization.glowIntensity * 2.5).toString(16).padStart(2, '0')}, transparent 50%), radial-gradient(circle at 85% 30%, ${customization.secondaryColor}${Math.floor(customization.glowIntensity * 2.5).toString(16).padStart(2, '0')}, transparent 50%)`,
                backgroundSize: '100% 100%' // Static in preview to save GPU, animation handles movement
              }}
            >
              <div className="px-5 py-14 min-h-full flex flex-col gap-6 relative z-10">
                
                {/* Profile */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-[100px] h-[100px] rounded-full p-[3px]"
                    style={{
                      background: `linear-gradient(45deg, ${customization.primaryColor}, ${customization.secondaryColor})`,
                      boxShadow: `0 0 ${customization.glowIntensity * 0.3}px ${customization.primaryColor}`
                    }}
                  >
                    <img src={profilePic} alt={profileName} className="w-full h-full rounded-full object-cover border-2 border-[#0f1419] bg-[#0f1419]" />
                  </div>
                  <div>
                    <h1 className="text-[1.35rem] font-black leading-tight">{profileName}</h1>
                    <p className="text-[0.8rem] font-medium opacity-80 max-w-[250px] mx-auto mt-1.5">{bio}</p>
                    {location && (
                      <div 
                        className="inline-block mt-3 px-3 py-1 text-[0.7rem] font-bold rounded-full border"
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: customization.secondaryColor }}
                      >
                        📍 {location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Socials */}
                <div className="flex flex-wrap justify-center gap-3">
                  {socials.map(s => (
                    <div 
                      key={s.id} 
                      className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                    >
                      {getSocialIconComponent(s.platform, 'w-4 h-4 text-white')}
                    </div>
                  ))}
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-3 w-full">
                  {cards.map(c => (
                    <div 
                      key={c.id} 
                      className="w-full p-4 rounded-2xl border text-left flex items-center gap-3"
                      style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                    >
                      {c.imageUrl ? (
                        <img src={c.imageUrl} className="w-10 h-10 rounded-xl object-cover shrink-0" alt="card" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/5" style={{ color: c.accentColor }}>
                          <ExternalLink className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        {c.category && <div className="text-[0.6rem] font-black uppercase tracking-wider mb-0.5" style={{ color: c.accentColor }}>{c.category}</div>}
                        <h3 className="text-[0.9rem] font-black leading-tight text-white">{c.title}</h3>
                        {c.description && <p className="text-[0.65rem] opacity-70 mt-1">{c.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* bottom home button indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-800 rounded-full z-50"></div>
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

function ChevronRightIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
    </svg>
  );
}
