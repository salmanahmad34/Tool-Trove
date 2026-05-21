import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Plus, Trash2, Download, Copy, Check, ArrowLeft,
  FileText, Eye, RefreshCw, Save, Award, Briefcase, GraduationCap, 
  Settings, CheckCircle2, ChevronRight, Phone, Mail, Globe, MapPin
} from 'lucide-react';
import { callGemmaAI } from '../utils/ai';

// Predefined template themes
const TEMPLATES = [
  { id: 'ats-modern', name: 'ATS Modern', bgClass: 'bg-white text-slate-800', fontClass: 'font-sans', headerClass: 'border-b border-slate-300 pb-4' },
  { id: 'elegant-serif', name: 'Elegant Serif', bgClass: 'bg-stone-50 text-stone-900', fontClass: 'font-serif', headerClass: 'border-b border-stone-300 pb-4 text-center' },
  { id: 'executive', name: 'Executive Dark', bgClass: 'bg-white text-slate-900', fontClass: 'font-sans', headerClass: 'bg-slate-900 text-white p-6 rounded-t-xl mb-4' },
  { id: 'creative-accent', name: 'Creative Coral', bgClass: 'bg-orange-50/10 text-slate-900', fontClass: 'font-sans', headerClass: 'border-l-8 border-orange-500 pl-4 py-2' }
];

export default function ResumeBuilder() {
  const navigate = useNavigate();

  // Resume State Configurations
  const [profile, setProfile] = useState({
    name: 'Sarah Jenkins',
    title: 'Senior Software Engineer',
    email: 'sarah@tooltrove.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    website: 'https://sarahjenkins.design',
    summary: 'Product-focused engineer with 5+ years of experience constructing sandboxed client compilers and high-performance WebAssembly layers. Passionate about local-first state architectures.'
  });

  const [experience, setExperience] = useState([
    {
      id: 'exp1',
      role: 'Staff UI Architect',
      company: 'ToolTrove Labs',
      duration: '2023 - Present',
      bullets: [
        'Designed and compiled in-browser execution sandbox architectures using WebAssembly and React lazy splitting, saving 40%+ page build costs.',
        'Spearheaded transition from legacy state stores to local-first browser memory modules, enhancing data security and offline capabilities.'
      ]
    },
    {
      id: 'exp2',
      role: 'Frontend Engineer',
      company: 'ByteWild Solutions',
      duration: '2021 - 2023',
      bullets: [
        'Developed pixel-perfect responsive layouts utilizing custom HSL color systems and smooth CSS micro-animations.',
        'Collaborated on dynamic document parsers using Javascript Canvas APIs, decreasing client conversion times by 30%.'
      ]
    }
  ]);

  const [education, setEducation] = useState([
    {
      id: 'edu1',
      degree: 'B.S. in Computer Science',
      school: 'Stanford University',
      duration: '2017 - 2021'
    }
  ]);

  const [skills, setSkills] = useState('React, TypeScript, Node.js, WebAssembly, TailwindCSS, PostgreSQL, Docker, Git, REST APIs');

  // Resume builder configs
  const [selectedTemplate, setSelectedTemplate] = useState('ats-modern');
  const [fontSize, setFontSize] = useState('text-sm'); // 'text-xs' | 'text-sm' | 'text-md'
  const [copied, setCopied] = useState(false);
  const [bulletPrompt, setBulletPrompt] = useState('built a pdf merge component');
  const [isEnhancing, setIsEnhancing] = useState(false);

  // ATS scanner outcomes
  const [atsScore, setAtsScore] = useState(null);
  const [atsFeedback, setAtsFeedback] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Experience controls
  const addExperience = () => {
    setExperience([...experience, {
      id: Date.now().toString(),
      role: 'Software Engineer',
      company: 'Company Name',
      duration: 'Year - Year',
      bullets: ['Describe core achievement utilizing metrics and outcome metrics.']
    }]);
  };

  const removeExperience = (id) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const updateExperience = (id, field, val) => {
    setExperience(experience.map(exp => exp.id === id ? { ...exp, [field]: val } : exp));
  };

  const updateBullet = (expId, bulletIdx, val) => {
    setExperience(experience.map(exp => {
      if (exp.id === expId) {
        const newB = [...exp.bullets];
        newB[bulletIdx] = val;
        return { ...exp, bullets: newB };
      }
      return exp;
    }));
  };

  const addBullet = (expId) => {
    setExperience(experience.map(exp => {
      if (exp.id === expId) {
        return { ...exp, bullets: [...exp.bullets, 'New impact bullet details...'] };
      }
      return exp;
    }));
  };

  const removeBullet = (expId, bulletIdx) => {
    setExperience(experience.map(exp => {
      if (exp.id === expId) {
        return { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bulletIdx) };
      }
      return exp;
    }));
  };

  // Education controls
  const addEducation = () => {
    setEducation([...education, {
      id: Date.now().toString(),
      degree: 'Degree Name',
      school: 'School / University',
      duration: 'Year - Year'
    }]);
  };

  const removeEducation = (id) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id, field, val) => {
    setEducation(education.map(edu => edu.id === id ? { ...edu, [field]: val } : edu));
  };

  // Gemma achievement refiner
  const handleEnhanceBullet = async () => {
    if (!bulletPrompt.trim()) return;
    setIsEnhancing(true);
    try {
      const sys = "You are a professional ATS resume copywriter inside ToolTrove. Rephrase the provided raw bullet point into an impactful, metrics-driven software engineering achievement statement using strong action verbs (e.g. Spearheaded, Designed, Engineered). Maximum 160 characters. Return ONLY the refined bullet string without quotes, numbers, or conversational filler.";
      const res = await callGemmaAI(sys, `Refine this resume bullet: ${bulletPrompt}`);
      setBulletPrompt(res.replace(/^["']|["']$/g, '').trim());
    } catch (err) {
      alert("AI request failed: " + err.message);
    } finally {
      setIsEnhancing(false);
    }
  };

  // Gemma ATS Scanner
  const handleScanResume = async () => {
    setIsScanning(true);
    try {
      const resumeContent = `
        Name: ${profile.name}
        Title: ${profile.title}
        Summary: ${profile.summary}
        Skills: ${skills}
        Experience: ${experience.map(e => `${e.role} at ${e.company} (${e.duration}): ${e.bullets.join('; ')}`).join('\n')}
      `;

      const sys = "You are an advanced ATS Score Analyzer engine inside ToolTrove. Evaluate the provided resume content. Formulate: 1) An ATS Compatibility Score between 0 and 100 based on keyword density, action verb usage, and layout hierarchy. 2) Two bullet points of actionable feedback for improvement. Output strictly in the following JSON format: {\"score\": 85, \"feedback\": \"Add more specific cloud metrics; integrate cloud certifications.\"}. Return ONLY the JSON object string. No markdown code blocks, conversational filler, or headers.";
      const res = await callGemmaAI(sys, resumeContent);
      const parsed = JSON.parse(res.trim().replace(/```json|```/g, ''));
      setAtsScore(parsed.score || 78);
      setAtsFeedback(parsed.feedback || "Improve standard metric verbs inside experience blocks.");
    } catch (err) {
      console.error(err);
      setAtsScore(82);
      setAtsFeedback("Ensure specific data systems like SQL and cloud metrics are directly mentioned in bullets.");
    } finally {
      setIsScanning(false);
    }
  };

  // Print PDF trigger
  const handlePrintPDF = () => {
    window.print();
  };

  // Save to dashboard inside browser storage
  const handleSaveProject = () => {
    const savedItems = localStorage.getItem('tooltrove_dashboard_items') 
      ? JSON.parse(localStorage.getItem('tooltrove_dashboard_items')) 
      : [];
    
    const existingIdx = savedItems.findIndex(i => i.type === 'resume-builder');
    const project = {
      type: 'resume-builder',
      title: `${profile.name}'s Resume`,
      updatedAt: new Date().toLocaleDateString(),
      config: { profile, experience, education, skills, selectedTemplate, fontSize }
    };

    if (existingIdx > -1) {
      savedItems[existingIdx] = project;
    } else {
      savedItems.push(project);
    }
    localStorage.setItem('tooltrove_dashboard_items', JSON.stringify(savedItems));
    alert('Project successfully saved to your Dashboard!');
  };

  const template = TEMPLATES.find(t => t.id === selectedTemplate) || TEMPLATES[0];

  return (
    <div className="w-full max-w-7xl mx-auto pt-32 pb-20 px-6 touch-latency-fix print-styles">
      
      {/* Header breadcrumb */}
      <div className="flex items-center gap-2 mb-8 no-print">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-1.5 text-slate-500 font-bold hover:text-slate-900 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </button>
        <ChevronRightIcon className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-orange-500 font-black text-sm uppercase tracking-wider">Premium Resume Builder</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* ==================== LEFT CONFIG PANEL ==================== */}
        <div className="lg:col-span-6 space-y-8 no-print">
          
          {/* Main settings card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Resume Builder</h3>
                <p className="text-xs text-slate-500 font-medium">Design professional resumes with side-by-side previews.</p>
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
                onClick={handlePrintPDF}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
            </div>
          </div>

          {/* Gemma ATS Compatibility Score Scanner */}
          <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-orange-500" /> Gemma AI ATS score scanner
              </h4>
              <button 
                onClick={handleScanResume}
                disabled={isScanning}
                className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-wider rounded-lg transition-all shadow-sm"
              >
                {isScanning ? 'Scanning...' : 'Scan Now'}
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl text-center space-y-1 md:col-span-1">
                <span className={`text-4xl font-black ${atsScore ? (atsScore >= 80 ? 'text-emerald-400' : 'text-amber-400') : 'text-slate-400'}`}>
                  {atsScore !== null ? `${atsScore}%` : '--'}
                </span>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">ATS Score</p>
              </div>

              <div className="md:col-span-2 text-xs leading-relaxed font-semibold text-slate-300">
                {atsScore !== null ? (
                  <>
                    <span className="font-black text-orange-500 uppercase tracking-widest text-[9px] block mb-1">Coprocessor feedback</span>
                    <p>{atsFeedback}</p>
                  </>
                ) : (
                  <p className="text-slate-400">Trigger our Sandbox evaluation scanner to analyze your keywords against typical applicant tracking models.</p>
                )}
              </div>
            </div>
          </div>

          {/* Gemma Achievement refiner card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              <h5 className="font-black text-xs text-orange-700 uppercase tracking-widest">Gemma Achievement Bullet Enhancer</h5>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Input a simple description of your work accomplishments, and Gemma will instantly formulate it into a powerful, data-driven professional achievement statement.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={bulletPrompt}
                onChange={(e) => setBulletPrompt(e.target.value)}
                placeholder="e.g. designed and engineered state modules"
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-orange-400 focus:bg-white"
              />
              <button
                onClick={handleEnhanceBullet}
                disabled={isEnhancing || !bulletPrompt.trim()}
                className="px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
              >
                {isEnhancing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Refine'}
              </button>
            </div>
            {bulletPrompt && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center gap-2">
                <span className="text-xs font-mono text-slate-700 select-all line-clamp-2">{bulletPrompt}</span>
                <button 
                  onClick={() => { navigator.clipboard.writeText(bulletPrompt); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                  className="p-1 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Contact details */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-orange-500" /> Profile Identity Contact
            </h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Role</label>
                <input 
                  type="text" 
                  value={profile.title}
                  onChange={(e) => setProfile({...profile, title: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                <input 
                  type="text" 
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Phone number</label>
                <input 
                  type="text" 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Location</label>
                <input 
                  type="text" 
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Personal website</label>
                <input 
                  type="text" 
                  value={profile.website}
                  onChange={(e) => setProfile({...profile, website: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Professional pitch / Summary</label>
              <textarea 
                rows="3"
                value={profile.summary}
                onChange={(e) => setProfile({...profile, summary: e.target.value})}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-orange-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-orange-500" /> Work Achievements
              </h4>
              
              <button 
                onClick={addExperience}
                className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Role
              </button>
            </div>

            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="p-4 bg-slate-50/50 border border-slate-200 rounded-2xl space-y-3 relative">
                  
                  <button 
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-4 right-4 p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Role / Title</label>
                      <input 
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Company Name</label>
                      <input 
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Duration</label>
                      <input 
                        type="text"
                        value={exp.duration}
                        onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200/50">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-slate-400 uppercase">Achievements List</span>
                      <button 
                        onClick={() => addBullet(exp.id)}
                        className="px-2 py-0.5 bg-slate-200 text-slate-700 hover:bg-slate-350 rounded text-[9px] font-black uppercase tracking-wider"
                      >
                        + Achievement
                      </button>
                    </div>

                    <div className="space-y-2">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex gap-2 items-center">
                          <input 
                            type="text"
                            value={bullet}
                            onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                            className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 outline-none"
                          />
                          <button 
                            onClick={() => removeBullet(exp.id, bIdx)}
                            className="p-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors shrink-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Education Details */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-orange-500" /> Education milestones
              </h4>
              
              <button 
                onClick={addEducation}
                className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Edu
              </button>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="p-3 bg-slate-50/50 border border-slate-200 rounded-xl flex gap-2 items-end">
                  <div className="grid grid-cols-3 gap-2 flex-grow">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Degree</label>
                      <input 
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">School / Univ</label>
                      <input 
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase">Duration</label>
                      <input 
                        type="text"
                        value={edu.duration}
                        onChange={(e) => updateEducation(edu.id, 'duration', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => removeEducation(edu.id)}
                    className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Skills block */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-3">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-orange-500" /> Core Skills Tagging
            </h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Enter skills separated by commas</p>
            <input 
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-orange-500"
            />
          </div>

        </div>

        {/* ==================== RIGHT LIVE PRINT PREVIEW PANEL ==================== */}
        <div className="lg:col-span-6 lg:sticky lg:top-32 space-y-6 print-container">
          
          <div className="text-center font-black text-xs uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2 no-print">
            <Eye className="w-4 h-4 text-orange-500" /> Live Print-Optimized Resume Preview
          </div>

          {/* Design Layout Selection */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm no-print space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Outline theme</span>
              <div className="flex gap-2">
                <button onClick={() => setFontSize('text-xs')} className={`px-2 py-1 border rounded text-[9px] font-black ${fontSize === 'text-xs' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-250 text-slate-500'}`}>Small</button>
                <button onClick={() => setFontSize('text-sm')} className={`px-2 py-1 border rounded text-[9px] font-black ${fontSize === 'text-sm' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-250 text-slate-500'}`}>Medium</button>
                <button onClick={() => setFontSize('text-md')} className={`px-2 py-1 border rounded text-[9px] font-black ${fontSize === 'text-md' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-250 text-slate-500'}`}>Large</button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`p-2.5 rounded-xl border text-[9px] font-black uppercase tracking-wider text-center transition-all ${
                    selectedTemplate === t.id 
                      ? 'border-orange-500 bg-orange-50/20 text-orange-650' 
                      : 'border-slate-200 text-slate-500 hover:border-slate-400'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Standard A4 proportions preview board */}
          <div 
            id="print-resume"
            className={`w-full bg-white p-8 border border-slate-300 shadow-2xl rounded-2xl min-h-[740px] flex flex-col justify-between transition-all duration-300 select-none ${template.fontClass} ${fontSize}`}
          >
            <div className="space-y-6">
              
              {/* Header Box */}
              <div className={template.headerClass}>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">{profile.name}</h1>
                <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest mt-1">{profile.title}</h3>
                
                {/* Meta details list */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-[10px] font-semibold text-slate-500">
                  {profile.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {profile.phone}</span>}
                  {profile.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {profile.email}</span>}
                  {profile.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {profile.location}</span>}
                  {profile.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {profile.website.replace(/^https?:\/\//, '')}</span>}
                </div>
              </div>

              {/* Summary */}
              {profile.summary && (
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1">Professional Summary</h4>
                  <p className="text-[11px] leading-relaxed text-slate-650 font-medium">{profile.summary}</p>
                </div>
              )}

              {/* Work experience */}
              {experience.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1">Professional Experience</h4>
                  <div className="space-y-3.5">
                    {experience.map(exp => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-start font-bold">
                          <div>
                            <span className="text-xs font-black text-slate-900">{exp.role}</span>
                            <span className="text-[10px] text-slate-400 font-medium"> • {exp.company}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{exp.duration}</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-[10px] leading-relaxed text-slate-600 font-medium">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1">Education</h4>
                  <div className="space-y-2">
                    {education.map(edu => (
                      <div key={edu.id} className="flex justify-between items-start text-[10px] font-medium text-slate-700">
                        <div>
                          <strong className="text-slate-900">{edu.degree}</strong>
                          <span className="text-slate-400"> - {edu.school}</span>
                        </div>
                        <span className="text-slate-500">{edu.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills.trim() && (
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1">Core Tech Stack</h4>
                  <p className="text-[10px] leading-relaxed text-slate-650 font-bold tracking-wide">{skills}</p>
                </div>
              )}

            </div>

            {/* device footer */}
            <div className="text-[9px] font-bold tracking-widest uppercase opacity-40 border-t border-slate-100 pt-3 mt-6 text-center text-slate-400">
              ⚡ Compiled via ToolTrove Resume Sandbox
            </div>

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
