import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Plus, Trash2, Download, Copy, Check, ArrowLeft,
  Layout, Eye, Code, ArrowUp, ArrowDown, RefreshCw, 
  Terminal, Cpu, Award, Zap, Globe, Layers, Save
} from 'lucide-react';
import { Github, Linkedin, Twitter } from '../components/SocialIcons';
import { callGemmaAI } from '../utils/ai';

// Predefined Skill Badges database with shield formats
const SKILLS_DB = {
  Frontend: [
    { name: 'React', badge: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' },
    { name: 'Vue', badge: 'https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D' },
    { name: 'Angular', badge: 'https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white' },
    { name: 'TypeScript', badge: 'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' },
    { name: 'JavaScript', badge: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' },
    { name: 'TailwindCSS', badge: 'https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white' },
    { name: 'HTML5', badge: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' },
    { name: 'CSS3', badge: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' },
    { name: 'Next.js', badge: 'https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white' }
  ],
  Backend: [
    { name: 'Node.js', badge: 'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' },
    { name: 'Express', badge: 'https://img.shields.io/badge/Express.js-404D59?style=for-the-badge' },
    { name: 'Python', badge: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white' },
    { name: 'Django', badge: 'https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white' },
    { name: 'Go', badge: 'https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white' },
    { name: 'Rust', badge: 'https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white' },
    { name: 'FastAPI', badge: 'https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white' }
  ],
  Databases: [
    { name: 'PostgreSQL', badge: 'https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' },
    { name: 'MongoDB', badge: 'https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white' },
    { name: 'MySQL', badge: 'https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white' },
    { name: 'Redis', badge: 'https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white' },
    { name: 'Firebase', badge: 'https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white' }
  ],
  Tools: [
    { name: 'Docker', badge: 'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white' },
    { name: 'Git', badge: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white' },
    { name: 'AWS', badge: 'https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white' },
    { name: 'Kubernetes', badge: 'https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white' },
    { name: 'Figma', badge: 'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white' }
  ]
};

// Available Themes for the Markdown output style
const THEMES = [
  { id: 'hacker-dev', name: 'Hacker Dev', fontClass: 'font-mono', color: '#10B981' },
  { id: 'creative-emoji', name: 'Creative Emoji', fontClass: 'font-sans', color: '#EC4899' },
  { id: 'minimal-ats', name: 'Minimal ATS', fontClass: 'font-serif', color: '#0F172A' },
  { id: 'badge-animated', name: 'Sleek Dark', fontClass: 'font-sans', color: '#3B82F6' }
];

export default function GithubReadme() {
  const navigate = useNavigate();

  // Basic Information States
  const [githubUser, setGithubUser] = useState('johndoe');
  const [fullName, setFullName] = useState('John Doe');
  const [tagline, setTagline] = useState('Full Stack Developer obsessed with scalable API nodes and beautiful UI.');
  const [email, setEmail] = useState('john@example.com');
  const [linkedinUser, setLinkedinUser] = useState('john-doe');
  const [twitterUser, setTwitterUser] = useState('john_tweets');
  
  // Custom sections layout
  const [sections, setSections] = useState([
    { id: 'header', type: 'header', title: '👋 Welcome to My Space', visible: true },
    { id: 'about', type: 'about', title: '🚀 About Me', visible: true, text: 'I am a software engineer specialized in building robust browser-sandbox compilers and highly performance-optimized client structures.' },
    { id: 'skills', type: 'skills', title: '🛠️ Tech Stack', visible: true },
    { id: 'stats', type: 'stats', title: '📊 GitHub Statistics', visible: true, showStatsCard: true, showTopLanguages: true },
    { id: 'projects', type: 'projects', title: '💡 Highlighted Projects', visible: true, list: [
        { name: '🚀 Antigravity sandbox', desc: 'Secure local-first client virtual execution system written in pure Javascript.' },
        { name: '⚡ ToolTrove platform', desc: 'Premium multi-utility kit built on vanilla CSS modules and code-split bundlers.' }
      ]
    }
  ]);

  // Selected Skills/Badges list
  const [selectedSkills, setSelectedSkills] = useState(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Git']);
  
  // Design settings
  const [selectedTheme, setSelectedTheme] = useState('hacker-dev');
  const [previewMode, setPreviewMode] = useState('preview'); // 'preview' | 'markdown'
  const [copied, setCopied] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('A developer building an AI compiler sandbox in WebAssembly');
  const [isGenerating, setIsGenerating] = useState(false);

  // Reorder sections
  const moveSection = (index, direction) => {
    const nextIdx = index + direction;
    if (nextIdx < 0 || nextIdx >= sections.length) return;
    const reordered = [...sections];
    const temp = reordered[index];
    reordered[index] = reordered[nextIdx];
    reordered[nextIdx] = temp;
    setSections(reordered);
  };

  // Toggle section visibility
  const toggleVisibility = (id) => {
    setSections(sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  // Update a specific section property
  const updateSectionProp = (id, prop, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [prop]: value } : s));
  };

  // Add a project block
  const addProject = () => {
    setSections(sections.map(s => {
      if (s.type === 'projects') {
        return {
          ...s,
          list: [...s.list, { name: 'New Project Name', desc: 'Description of key milestones & tech stack.' }]
        };
      }
      return s;
    }));
  };

  // Remove a project block
  const removeProject = (pIdx) => {
    setSections(sections.map(s => {
      if (s.type === 'projects') {
        return {
          ...s,
          list: s.list.filter((_, idx) => idx !== pIdx)
        };
      }
      return s;
    }));
  };

  // Update a project block
  const updateProject = (pIdx, field, val) => {
    setSections(sections.map(s => {
      if (s.type === 'projects') {
        const newList = [...s.list];
        newList[pIdx] = { ...newList[pIdx], [field]: val };
        return { ...s, list: newList };
      }
      return s;
    }));
  };

  // Toggle skills selected state
  const toggleSkill = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  // Compile final markdown content based on selections
  const compileMarkdown = () => {
    let md = '';

    sections.forEach(s => {
      if (!s.visible) return;

      if (s.type === 'header') {
        if (selectedTheme === 'hacker-dev') {
          md += `# 👾 ${s.title}\n\n`;
          md += `\`\`\`bash\n$ whoami --name "${fullName}" --role "${tagline}"\n\`\`\`\n\n`;
        } else if (selectedTheme === 'creative-emoji') {
          md += `# ✨ ${s.title} ✨\n\n`;
          md += `### Hey there! I'm **${fullName}** 👋\n\n> 🌈 *${tagline}*\n\n`;
        } else if (selectedTheme === 'minimal-ats') {
          md += `# ${fullName}\n\n`;
          md += `*${tagline}*\n\n`;
        } else {
          md += `<div align="center">\n  <h1>⚡ ${fullName} ⚡</h1>\n  <p><strong>${tagline}</strong></p>\n</div>\n\n---\n\n`;
        }
      }

      if (s.type === 'about') {
        md += `## ${s.title}\n\n${s.text}\n\n`;
      }

      if (s.type === 'skills') {
        md += `## ${s.title}\n\n<p align="left">\n`;
        selectedSkills.forEach(skill => {
          let found = null;
          Object.values(SKILLS_DB).forEach(list => {
            const match = list.find(it => it.name === skill);
            if (match) found = match;
          });
          if (found) {
            md += `  <a href="#"><img src="${found.badge}" alt="${skill}" /></a>\n`;
          }
        });
        md += `</p>\n\n`;
      }

      if (s.type === 'stats') {
        md += `## ${s.title}\n\n`;
        md += `<p align="left">\n`;
        if (s.showStatsCard) {
          md += `  <img src="https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&theme=${selectedTheme === 'hacker-dev' ? 'dark' : selectedTheme === 'badge-animated' ? 'tokyonight' : 'radical'}" alt="GitHub Stats" />\n`;
        }
        if (s.showTopLanguages) {
          md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUser}&layout=compact&theme=${selectedTheme === 'hacker-dev' ? 'dark' : selectedTheme === 'badge-animated' ? 'tokyonight' : 'radical'}" alt="Top Languages" />\n`;
        }
        md += `</p>\n\n`;
      }

      if (s.type === 'projects') {
        md += `## ${s.title}\n\n`;
        s.list.forEach(proj => {
          md += `- **${proj.name}**\n  *${proj.desc}*\n`;
        });
        md += `\n`;
      }
    });

    // Append Social links / Contact footer
    md += `## 🤝 Connect with Me\n\n`;
    md += `<p align="left">\n`;
    if (linkedinUser) {
      md += `  <a href="https://linkedin.com/in/${linkedinUser}" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
    }
    if (twitterUser) {
      md += `  <a href="https://twitter.com/${twitterUser}" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white" alt="Twitter" /></a>\n`;
    }
    if (email) {
      md += `  <a href="mailto:${email}"><img src="https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>\n`;
    }
    md += `</p>\n`;

    return md;
  };

  // Call OpenRouter Gemma-4 to write the About me section
  const handleAIEnhanceAbout = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const sys = "You are a professional software engineer resume and readme copywriter inside ToolTrove. Synthesize a powerful and developer-focused About Me paragraph (strictly max 220 characters) written in the first person. Highlight professional goals and high-entropy technical vocabulary based on user prompt. Return ONLY the paragraph string without headers, quotes or tags.";
      const response = await callGemmaAI(sys, `Write an intro paragraph about: ${aiPrompt}`);
      
      const cleanText = response.replace(/^["']|["']$/g, '').trim();
      updateSectionProp('about', 'text', cleanText);
    } catch (err) {
      alert("AI request failed: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save to dashboard inside browser storage
  const handleSaveProject = () => {
    const savedItems = localStorage.getItem('tooltrove_dashboard_items') 
      ? JSON.parse(localStorage.getItem('tooltrove_dashboard_items')) 
      : [];
    
    const existingIdx = savedItems.findIndex(i => i.type === 'github-readme');
    const project = {
      type: 'github-readme',
      title: `${fullName}'s GitHub README`,
      updatedAt: new Date().toLocaleDateString(),
      config: { githubUser, fullName, tagline, email, linkedinUser, twitterUser, sections, selectedSkills, selectedTheme }
    };

    if (existingIdx > -1) {
      savedItems[existingIdx] = project;
    } else {
      savedItems.push(project);
    }
    localStorage.setItem('tooltrove_dashboard_items', JSON.stringify(savedItems));
    alert('Project successfully saved to your Dashboard!');
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(compileMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdownFile = () => {
    const blob = new Blob([compileMarkdown()], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'README.md';
    a.click();
  };

  const currentTheme = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

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
        <span className="text-orange-500 font-black text-sm uppercase tracking-wider">GitHub README Generator</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* ==================== LEFT CONFIG PANEL ==================== */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Action buttons bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">README Engine</h3>
                <p className="text-xs text-slate-500 font-medium">Build, configure and export standard profile markdowns.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveProject}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save
              </button>
              <button
                onClick={downloadMarkdownFile}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>

          {/* Profile Identity Details */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-orange-500" /> Basic Identity
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold outline-none focus:bg-white focus:border-orange-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">GitHub Username</label>
                <input 
                  type="text" 
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono outline-none focus:bg-white focus:border-orange-500 transition-all text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">Tagline / Professional Pitch</label>
              <input 
                type="text" 
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold outline-none focus:bg-white focus:border-orange-500 transition-all"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 flex items-center gap-1"><Linkedin className="w-3 h-3" /> LinkedIn</label>
                <input 
                  type="text" 
                  value={linkedinUser}
                  onChange={(e) => setLinkedinUser(e.target.value)}
                  placeholder="username"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-orange-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 flex items-center gap-1"><Twitter className="w-3 h-3" /> Twitter</label>
                <input 
                  type="text" 
                  value={twitterUser}
                  onChange={(e) => setTwitterUser(e.target.value)}
                  placeholder="username"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-orange-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 flex items-center gap-1"><Globe className="w-3 h-3" /> Email</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-orange-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Drag & Drop Re-ordering simulated section controls */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-500" /> README Section Blocks Structure
            </h4>
            
            <div className="space-y-4">
              {sections.map((sec, idx) => (
                <div key={sec.id} className={`p-4 rounded-2xl border transition-all flex flex-col gap-3 ${sec.visible ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-100/40 border-slate-100 opacity-60'}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={sec.visible} 
                        onChange={() => toggleVisibility(sec.id)}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300"
                      />
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wider">{sec.type}: {sec.title}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => moveSection(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-colors"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => moveSection(idx, 1)}
                        disabled={idx === sections.length - 1}
                        className="p-1 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-colors"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Section-specific custom configs inside blocks */}
                  {sec.visible && sec.type === 'about' && (
                    <div className="space-y-4 pt-2 border-t border-slate-200/50">
                      {/* AI integration text enhancer */}
                      <div className="p-4 bg-gradient-to-br from-orange-50/60 to-transparent border border-orange-100 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                          <h5 className="font-black text-[10px] text-orange-700 uppercase tracking-widest">Gemma AI Section Enricher</h5>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="Describe your goals e.g. Frontend developer focusing on Wasm compilers..."
                            className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-orange-400"
                          />
                          <button
                            onClick={handleAIEnhanceAbout}
                            disabled={isGenerating || !aiPrompt.trim()}
                            className="px-3.5 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1"
                          >
                            {isGenerating ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'Write'}
                          </button>
                        </div>
                      </div>

                      <textarea 
                        rows="3"
                        value={sec.text}
                        onChange={(e) => updateSectionProp(sec.id, 'text', e.target.value)}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-orange-500 transition-all resize-none"
                      />
                    </div>
                  )}

                  {sec.visible && sec.type === 'stats' && (
                    <div className="flex flex-wrap gap-6 pt-2 border-t border-slate-200/50 text-xs font-bold text-slate-600">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={sec.showStatsCard}
                          onChange={(e) => updateSectionProp(sec.id, 'showStatsCard', e.target.checked)}
                          className="rounded text-orange-500 focus:ring-orange-400"
                        />
                        GitHub General Stats
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={sec.showTopLanguages}
                          onChange={(e) => updateSectionProp(sec.id, 'showTopLanguages', e.target.checked)}
                          className="rounded text-orange-500 focus:ring-orange-400"
                        />
                        Top Languages Card
                      </label>
                    </div>
                  )}

                  {sec.visible && sec.type === 'projects' && (
                    <div className="space-y-4 pt-2 border-t border-slate-200/50">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Highlight Blocks</span>
                        <button 
                          onClick={addProject}
                          className="px-2.5 py-1 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors flex items-center gap-0.5"
                        >
                          <Plus className="w-3 h-3" /> Add Project
                        </button>
                      </div>

                      <div className="space-y-3">
                        {sec.list.map((proj, pIdx) => (
                          <div key={pIdx} className="p-3 bg-white border border-slate-200 rounded-xl flex gap-2 items-start">
                            <div className="flex-1 space-y-2">
                              <input 
                                type="text"
                                value={proj.name}
                                onChange={(e) => updateProject(pIdx, 'name', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                              />
                              <input 
                                type="text"
                                value={proj.desc}
                                onChange={(e) => updateProject(pIdx, 'desc', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 outline-none"
                              />
                            </div>
                            <button 
                              onClick={() => removeProject(pIdx)}
                              className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

          {/* Interactive Skills Selection Database */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-500" /> Interactive Badge Database
            </h4>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              Select languages, frameworks and libraries to immediately compile their gorgeous, uniform flat-style badges into your markup headers.
            </p>

            <div className="space-y-6">
              {Object.entries(SKILLS_DB).map(([category, skills]) => (
                <div key={category} className="space-y-2">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{category}</span>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => {
                      const isSelected = selectedSkills.includes(skill.name);
                      return (
                        <button
                          key={skill.name}
                          onClick={() => toggleSkill(skill.name)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                            isSelected 
                              ? 'border-orange-500 bg-orange-50/20 text-orange-600' 
                              : 'border-slate-200 text-slate-600 hover:border-slate-350 bg-white'
                          }`}
                        >
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Theme styling selection */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-500" /> Typography & Outline Styles
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                  {t.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ==================== RIGHT LIVE PREVIEW PANEL ==================== */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
          
          {/* Tabs bar */}
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="font-black text-xs uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-orange-500" /> live README screen
            </span>

            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setPreviewMode('preview')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${previewMode === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Visual Live
              </button>
              <button 
                onClick={() => setPreviewMode('markdown')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${previewMode === 'markdown' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Raw Markdown
              </button>
            </div>
          </div>

          {/* Outer container */}
          <div className="bg-slate-950 rounded-[2.5rem] p-6 shadow-2xl border border-slate-800 flex flex-col max-h-[640px] overflow-hidden">
            
            {/* Scrollable preview canvas */}
            <div className={`flex-1 overflow-y-auto pr-2 pb-6 space-y-6 text-slate-300 font-sans text-sm select-none scrollbar-thin transition-all duration-300 relative ${currentTheme.fontClass}`}>
              
              {previewMode === 'preview' ? (
                <div className="space-y-6">
                  {/* Output sections rendered visually */}
                  {sections.map(s => {
                    if (!s.visible) return null;

                    return (
                      <div key={s.id} className="space-y-3">
                        {s.type === 'header' && (
                          <div className={selectedTheme === 'hacker-dev' ? 'text-emerald-400 font-mono border-b border-emerald-950 pb-4' : 'text-white'}>
                            {selectedTheme === 'hacker-dev' ? (
                              <>
                                <h1 className="text-xl font-black">{`# 👾 ${s.title}`}</h1>
                                <div className="mt-3 p-3 bg-slate-900 border border-emerald-900/30 rounded-xl text-xs">
                                  <span>{`$ whoami --name "${fullName}" --role "${tagline}"`}</span>
                                </div>
                              </>
                            ) : selectedTheme === 'creative-emoji' ? (
                              <>
                                <h1 className="text-2xl font-black text-pink-400">{`✨ ${s.title} ✨`}</h1>
                                <h3 className="text-md font-bold mt-2">{`Hey there! I'm ${fullName} 👋`}</h3>
                                <p className="text-xs text-slate-400 italic mt-1">{`🌈 "${tagline}"`}</p>
                              </>
                            ) : (
                              <>
                                <h1 className="text-2xl font-black text-slate-100">{fullName}</h1>
                                <p className="text-xs text-slate-400 mt-1">{tagline}</p>
                              </>
                            )}
                          </div>
                        )}

                        {s.type === 'about' && (
                          <div className="space-y-2">
                            <h3 className="text-md font-black text-slate-200 border-b border-slate-800 pb-2">{s.title}</h3>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">{s.text}</p>
                          </div>
                        )}

                        {s.type === 'skills' && (
                          <div className="space-y-2">
                            <h3 className="text-md font-black text-slate-200 border-b border-slate-800 pb-2">{s.title}</h3>
                            <div className="flex flex-wrap gap-2 py-1">
                              {selectedSkills.map(skill => {
                                let found = null;
                                Object.values(SKILLS_DB).forEach(list => {
                                  const m = list.find(it => it.name === skill);
                                  if (m) found = m;
                                });
                                return found ? (
                                  <img key={skill} src={found.badge} alt={skill} className="h-6 rounded object-contain" />
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}

                        {s.type === 'stats' && (
                          <div className="space-y-3">
                            <h3 className="text-md font-black text-slate-200 border-b border-slate-800 pb-2">{s.title}</h3>
                            <div className="flex flex-col md:flex-row gap-3">
                              {s.showStatsCard && (
                                <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center flex-1">
                                  <span className="text-[10px] text-slate-400 font-mono">📊 {githubUser}'s Stats Card</span>
                                </div>
                              )}
                              {s.showTopLanguages && (
                                <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center flex-1">
                                  <span className="text-[10px] text-slate-400 font-mono">🔤 Most Used Languages</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {s.type === 'projects' && (
                          <div className="space-y-2">
                            <h3 className="text-md font-black text-slate-200 border-b border-slate-800 pb-2">{s.title}</h3>
                            <div className="space-y-3 font-medium">
                              {s.list.map((proj, pIdx) => (
                                <div key={pIdx} className="space-y-0.5">
                                  <h5 className="text-xs font-black text-slate-200">{`- ${proj.name}`}</h5>
                                  <p className="text-[11px] text-slate-400 pl-3 leading-relaxed">{proj.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Visual Social Footer */}
                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    <h3 className="text-md font-black text-slate-200 pb-2">🤝 Connect with Me</h3>
                    <div className="flex flex-wrap gap-2">
                      {linkedinUser && <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" />}
                      {twitterUser && <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white" alt="Twitter" />}
                      {email && <img src="https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white" alt="Email" />}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto shadow-inner text-emerald-400 select-all">
                  {compileMarkdown()}
                </div>
              )}

            </div>

            {/* device footer */}
            <div className="text-[9px] font-black tracking-widest uppercase opacity-40 pt-4 mt-2 border-t border-slate-800 w-full text-center text-slate-400">
              ⚡ Compiled by ToolTrove Sandbox
            </div>

          </div>

          {/* Copy buttons */}
          <div className="flex gap-2 justify-center max-w-sm mx-auto">
            <button
              onClick={handleCopyMarkdown}
              className="flex-1 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500 animate-bounce" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied MD Code!' : 'Copy Raw Markdown'}
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
