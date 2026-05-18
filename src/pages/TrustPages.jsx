import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ShieldCheck, ShieldAlert, Award, Compass, Send, CheckCircle, 
  Mail, MessageSquare, MapPin, Sparkles, Clock, Globe, ArrowRight,
  BookOpen, Calendar, ArrowLeft
} from 'lucide-react';
import SEOManager from '../components/SEOManager';
import { OwlMascot } from '../components/Mascots';
import { INSIGHTS_ARTICLES } from '../components/BlogData';

// ==================== 1. ABOUT PAGE ====================
export function AboutPage() {
  const [activeStory, setActiveStory] = useState(0);

  const timeline = [
    { year: "2024", title: "The Sandbox Vision", desc: "ToolTrove was conceptualized with a simple, disruptive idea: Why should users upload sensitive private files to remote cloud servers for basic modifications? We set out to build a 100% serverless, local-first utility workspace." },
    { year: "2025", title: "Refining Client-Side Power", desc: "We fully migrated our compiler blocks to modern Javascript, HTML5 Canvas, WebGL, and client-side processing APIs. We rolled out 30+ fully working, local-only offline tools." },
    { year: "2026", title: "Premium AI Co-Processing", desc: "Deployed local AI-assisted Presets, smart contrast engines, and mascot-driven guidance. ToolTrove is recognized as India's #1 secure browser utility suite." }
  ];

  return (
    <div className="pt-36 pb-20 px-6 max-w-5xl mx-auto space-y-16">
      <SEOManager 
        title="About Our Safe Sandbox — ToolTrove"
        description="Learn about ToolTrove's mission to protect digital data sovereignty through local client-side processing. Meet our design philosophies and technology stack."
      />

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 text-orange-600 border border-orange-100 rounded-full text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Our Mission & Technology
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          Simplifying the Web with <span className="text-[#ff5c1a]">Local-First</span> Utilities
        </h1>
        <p className="text-slate-500 font-semibold leading-relaxed text-sm md:text-base">
          ToolTrove is an innovative, high-fidelity platform offering over 50+ professional browser utility tools completely free of charge. No signups, no paid limits, and absolute privacy.
        </p>
      </div>

      {/* Core Philosophies */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <ShieldCheck className="text-emerald-500 w-8 h-8" />, title: "Absolute Sovereignty", desc: "Your data is yours alone. Our local-first execution ensures no PDF files, invoices, photos, or passwords ever leave your machine." },
          { icon: <Zap className="text-orange-500 w-8 h-8" />, title: "Instant Compilation", desc: "No backend upload delays, zero server wait queues. Tools process data instantly on your GPU/CPU for hyper-speed output." },
          { icon: <Award className="text-violet-500 w-8 h-8" />, title: "100% Free Forever", desc: "We are committed to helping small businesses, MSMEs, creators, and developers build professional products with zero hidden fees." }
        ].map((phil, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-200 transition-all space-y-4">
            <div className="p-3 bg-slate-50 rounded-2xl w-max shadow-inner">{phil.icon}</div>
            <h3 className="text-lg font-black text-slate-800">{phil.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-semibold">{phil.desc}</p>
          </div>
        ))}
      </div>

      {/* Interactive Story Timeline */}
      <div className="p-8 md:p-12 rounded-[2.5rem] bg-slate-950 text-white shadow-xl grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">The Chronicle</span>
          <h2 className="text-3xl font-black">Our Journey to 2026</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            From a tiny sandbox script project to a trusted utility platform processing millions of local actions daily, ToolTrove represents the power of client-side computing.
          </p>
          <div className="flex gap-2">
            {timeline.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveStory(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeStory === idx ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-3 min-h-[160px] flex flex-col justify-center">
          <span className="text-orange-400 text-xs font-black uppercase tracking-wider">{timeline[activeStory].title}</span>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {timeline[activeStory].desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== 2. PRIVACY POLICY ====================
export function PrivacyPage() {
  return (
    <div className="pt-36 pb-20 px-6 max-w-4xl mx-auto space-y-12">
      <SEOManager 
        title="Privacy Guarantee & Data CCPA — ToolTrove"
        description="Read ToolTrove's strict privacy framework. Discover how our client-side sandbox ensures no files, passwords, or images are ever uploaded to any database."
      />

      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-xs font-black uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Local-First Guarantee
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-500 font-semibold text-xs leading-relaxed">
          Last updated: May 18, 2026. Effective globally under GDPR & CCPA frameworks.
        </p>
      </div>

      <div className="bg-emerald-50/50 border border-emerald-150 p-6 rounded-3xl text-emerald-800 text-xs font-semibold leading-relaxed space-y-2 max-w-3xl mx-auto">
        <h4 className="font-black text-emerald-900 flex items-center gap-1.5 text-sm">
          <ShieldCheck className="w-5 h-5 shrink-0" /> Dynamic Client-Side Processing Statement
        </h4>
        <p>
          Unlike traditional utility portals that force you to upload documents to cloud servers, ToolTrove executes all core calculations, formats, PDF splits/merges, password updates, and image compressions completely inside your browser's local sandbox memory space. Zero bytes ever leave your device.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-8">
        
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">1. Information We Never Collect</h2>
          <p>
            Because our architecture operates without cloud backends, we do not, cannot, and will never collect or access:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Any PDF files, invoices, or personal documents you merge, split, or compress.</li>
            <li>Any passwords, usernames, or key codes generated in our Security tools.</li>
            <li>Any images, headshots, or product photos cropped or background-segmented in our Canvas tools.</li>
            <li>Any financial variables, loan amounts, or corporate ledger figures inputted into our calculators.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">2. Cookies & Analytics</h2>
          <p>
            To help optimize website interface performance and monitor traffic volumes, we utilize basic, non-personally identifiable browser analytical frameworks. These trackers register general geographical region, device browser type, and tool click events. They never collect, store, or tag any data inputted into the utilities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">3. AdSense and Advertising Rules</h2>
          <p>
            ToolTrove partners with Google AdSense to serve clean, responsive advertising placements. These placements utilize browser cookies to serve interest-based ads based on your generic browsing history. You may opt out of personalized advertisements at any time by visiting the official Google Ads Settings page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">4. Third-Party Links</h2>
          <p>
            Our tools might include internal/external recommendations pointing to similar developers, or educational guides. We do not assume responsibility for the privacy practices of external domains. Always inspect third-party privacy guidelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">5. Contact Our Privacy Officer</h2>
          <p>
            If you have questions regarding our local sandboxing protocols or wish to request details about compliance under CCPA and GDPR rules, email us immediately at <span className="font-bold text-slate-900">privacy@tooltrove.space</span>.
          </p>
        </section>
      </div>
    </div>
  );
}

// ==================== 3. TERMS & CONDITIONS ====================
export function TermsPage() {
  return (
    <div className="pt-36 pb-20 px-6 max-w-4xl mx-auto space-y-12">
      <SEOManager 
        title="Terms of Service & Licensing — ToolTrove"
        description="Review ToolTrove's acceptable terms of use. Fully understand our local-only execution warranties and free software usage provisions."
      />

      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 text-[#ff5c1a] border border-orange-100 rounded-full text-xs font-black uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" /> Terms and Warranties
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Terms & Conditions
        </h1>
        <p className="text-slate-500 font-semibold text-xs leading-relaxed">
          Effective Date: May 18, 2026
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-8">
        
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and utilizing ToolTrove, you agree to comply with and be bound by these legal Terms and Conditions, including all privacy terms. If you do not accept these guidelines, you must cease using the platform immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">2. Free Software License & Permitted Use</h2>
          <p>
            ToolTrove grants users a personal, non-exclusive, non-transferable, revocable license to utilize all available online utilities for both personal and commercial operations free of charge. You may not distribute, scrape, copy, or replicate our source code scripts or compile the backend platforms to run competitors without explicit consent.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">3. Client-Side Warranty Disclaimer</h2>
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-amber-800 text-xs font-semibold leading-relaxed space-y-2">
            <h4 className="font-black text-amber-900 flex items-center gap-1.5 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" /> Tool Accuracy & Disclaimer Note
            </h4>
            <p>
              ToolTrove provides calculations, splits, conversions, and AI presets 'AS IS' without warranties of any kind. While our financial and developer utilities are decimal-perfect and extensively audited, users must double-check calculations (e.g. GST slabs or loan EMIs) before using them in tax filings or corporate audits. ToolTrove assumes zero liability for business errors.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">4. Intellectual Property</h2>
          <p>
            All custom components, custom brand logos, CSS tokens, assets, mascot graphics, and written educational articles are the protected intellectual property of ToolTrove.
          </p>
        </section>
      </div>
    </div>
  );
}

// ==================== 4. CONTACT PAGE ====================
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mascotText, setMascotText] = useState("Hoot! I'm the Wise Owl. Drop us a message, and I'll fly it over to our developer team in the morning!");

  const handleSend = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setMascotText("Hoo-hoo! I'm carrying your letter across the digital skies right now! Just a moment...");
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setMascotText("Hoot! Success! Your message has been safely delivered to our developer trove. I will bring an answer back to your email inbox within 24 hours!");
    }, 2000);
  };

  return (
    <div className="pt-36 pb-20 px-6 max-w-5xl mx-auto space-y-16">
      <SEOManager 
        title="Contact Our Developer Team — ToolTrove"
        description="Have custom feature ideas, bug submissions, or licensing queries? Write to our developer trove directly with this secure portal."
      />

      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 text-[#ff5c1a] border border-orange-100 rounded-full text-xs font-black uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" /> Direct Support Trove
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Get in Touch With Us
        </h1>
        <p className="text-slate-500 font-semibold leading-relaxed text-sm">
          Have an idea for a new client-side tool? Encountered a visual bug? Drop us a line, and we will get back to you immediately.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        {/* Left Side: Dynamic Mascot & Contact Details */}
        <div className="md:col-span-2 space-y-8 flex flex-col justify-between">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-6 text-center md:text-left">
            <div className="flex justify-center md:justify-start gap-4 items-center">
              <div className="p-3 bg-orange-500 text-white rounded-2xl shadow-lg">
                <OwlMascot />
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-sm">Wise Owl Helper</h4>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Active Guide
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-600 font-bold leading-relaxed bg-white border border-slate-150 p-4 rounded-2xl relative shadow-sm">
              {mascotText}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-600">
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-[#ff5c1a]"><Mail className="w-5 h-5" /></div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Email support</span>
                <span className="font-bold text-slate-800 text-sm">support@tooltrove.space</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-emerald-500"><Globe className="w-5 h-5" /></div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Location hub</span>
                <span className="font-bold text-slate-800 text-sm">Bengaluru, Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive glassmorphism form */}
        <div className="md:col-span-3">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-xl relative overflow-hidden">
            
            {success ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Letter Safely Sent!</h3>
                <p className="text-slate-500 font-semibold leading-relaxed text-sm max-w-xs mx-auto">
                  Our owl flew straight into the developer hub. We will review your ideas and answer your email address in 24 hours.
                </p>
                <button 
                  onClick={() => { setSuccess(false); setForm({ name:'', email:'', subject:'', message:'' }); }}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-600 uppercase tracking-wider block">Your Name</label>
                    <input 
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#ff5c1a] focus:bg-white rounded-2xl outline-none font-semibold text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-600 uppercase tracking-wider block">Email Address</label>
                    <input 
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. vikram@startup.in"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#ff5c1a] focus:bg-white rounded-2xl outline-none font-semibold text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-600 uppercase tracking-wider block">Subject Matter</label>
                  <input 
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Feature Suggestion: PDF OCR Indian Language support"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#ff5c1a] focus:bg-white rounded-2xl outline-none font-semibold text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-600 uppercase tracking-wider block">Message Payload</label>
                  <textarea 
                    rows="4"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your ideas or report a tool issue in detail here..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#ff5c1a] focus:bg-white rounded-2xl outline-none font-semibold text-sm transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-slate-900 hover:bg-[#ff5c1a] text-white font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-5 h-5 animate-spin" /> Dispatching Owl...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Send className="w-4 h-4" /> Send Secure Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== 5. BLOG OVERVIEW PAGE ====================
export function BlogPage() {
  const navigate = useNavigate();

  return (
    <div className="pt-36 pb-20 px-6 max-w-6xl mx-auto space-y-16">
      <SEOManager 
        title="ToolTrove Chronicles & Professional Guides"
        description="Unlock expert strategies in tech security, data safety, Indian tax GSTR filings, and client-side design hacks."
      />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 text-orange-600 border border-orange-100 rounded-full text-xs font-black uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> ToolTrove Chronicles
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
          Knowledge & <span className="text-[#ff5c1a]">Tech Strategies</span>
        </h1>
        <p className="text-slate-500 font-semibold leading-relaxed text-sm md:text-base">
          Read deeply researched guides on local browser security frameworks, business accounting structures, and smart utility hacks.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INSIGHTS_ARTICLES.map((article) => (
          <div
            key={article.id}
            onClick={() => navigate(`/blog/${article.id}`)}
            className="group cursor-pointer flex flex-col justify-between p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-orange-300 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className={`px-3 py-1 rounded-xl text-[10px] font-black border ${article.color}`}>
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                  <Clock className="w-3.5 h-3.5" /> {article.readTime}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-orange-500 transition-colors mb-3">
                {article.title}
              </h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6 line-clamp-3">
                {article.excerpt}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400">{article.date}</span>
              <span className="text-[#ff5c1a] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== 6. SINGLE ARTICLE PAGE ====================
export function ArticlePage() {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const article = INSIGHTS_ARTICLES.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="pt-40 pb-20 text-center space-y-6">
        <h2 className="text-3xl font-black text-slate-800">Article Not Found</h2>
        <p className="text-slate-400">The requested educational chronicle does not exist or has been archived.</p>
        <button 
          onClick={() => navigate('/blog')}
          className="px-6 py-2.5 bg-slate-950 text-white font-bold rounded-xl"
        >
          Back to Chronicles
        </button>
      </div>
    );
  }

  return (
    <div className="pt-36 pb-20 px-6 max-w-4xl mx-auto space-y-8">
      <SEOManager 
        title={article.title}
        description={article.excerpt}
      />

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest">
        <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <span className="text-slate-300">/</span>
        <Link to="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600 truncate max-w-[200px]">{article.title}</span>
      </div>

      <button 
        onClick={() => navigate('/blog')}
        className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-orange-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Chronicles
      </button>

      {/* Title & Metadata */}
      <div className="space-y-4">
        <span className={`inline-block px-3 py-1 rounded-xl text-xs font-black border ${article.color}`}>
          {article.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-bold border-y border-slate-100 py-4">
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {article.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
        </div>
      </div>

      {/* Article Content Body */}
      <div className="space-y-10 text-slate-600 text-sm md:text-base leading-relaxed font-medium pt-4">
        {article.content.map((sec, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-lg md:text-xl font-black text-slate-800">{sec.subtitle}</h3>
            <p className="text-slate-650">{sec.paragraph}</p>
          </div>
        ))}
      </div>

      {/* Action CTA box linking to category */}
      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-150 flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
        <div>
          <h4 className="font-black text-slate-900 text-lg">Put this knowledge into practice!</h4>
          <p className="text-slate-400 text-xs font-semibold mt-1">Unlock seamless client-side speeds in our custom toolbox.</p>
        </div>
        <button 
          onClick={() => navigate(article.toolLink)}
          className="px-8 py-3.5 bg-orange-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all text-xs"
        >
          {article.cta} →
        </button>
      </div>
    </div>
  );
}
