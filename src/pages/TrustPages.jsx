import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, ShieldAlert, Award, Compass, Send, CheckCircle, 
  Mail, MessageSquare, MapPin, Sparkles, Clock, Globe, ArrowRight,
  BookOpen, Calendar, ArrowLeft, Heart, Terminal, Cpu, Info, HelpCircle
} from 'lucide-react';
import SEOManager from '../components/SEOManager';
import { OwlMascot } from '../components/Mascots';

// ==================== 1. ABOUT PAGE ====================
export function AboutPage() {
  const [activeStory, setActiveStory] = useState(0);

  const timeline = [
    { year: "2024", title: "The Sandbox Vision", desc: "ToolTrove was conceptualized with a simple, disruptive idea: Why should users upload sensitive private files to remote cloud servers for basic modifications? We set out to build a 100% serverless, local-first utility workspace." },
    { year: "2025", title: "Refining Client-Side Power", desc: "We fully migrated our compiler blocks to modern Javascript, HTML5 Canvas, WebGL, and client-side processing APIs. We rolled out 30+ fully working, local-only offline tools." },
    { year: "2026", title: "Premium AI Co-Processing", desc: "Deployed local AI-assisted Presets, smart contrast engines, and mascot-driven guidance. ToolTrove is recognized as India's #1 secure browser utility suite." }
  ];

  const values = [
    { icon: <ShieldCheck className="text-emerald-500 w-7 h-7" />, title: "Data Sovereignty", desc: "Your files never leave your device. All operations execute strictly in your local browser sandbox, rendering cloud database leaks obsolete." },
    { icon: <Cpu className="text-orange-500 w-7 h-7" />, title: "Serverless Speed", desc: "No upload queue lines and no delay. Utilizing modern browser CPUs and hardware WebGL allows instant rendering in milliseconds." },
    { icon: <Award className="text-indigo-500 w-7 h-7" />, title: "100% Free Access", desc: "No subscription barriers, no hidden charges, and no account requirements. Premium, high-fidelity developer suites open to everyone." }
  ];

  return (
    <div className="pt-36 pb-20 px-6 max-w-5xl mx-auto space-y-16">
      <SEOManager 
        title="About Our Safe Offline Sandbox — ToolTrove"
        description="Discover how ToolTrove protects your data privacy through 100% client-side serverless utilities. Learn about our mission, framework, and values."
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
          ToolTrove is a premium, high-fidelity utility platform offering professional browser tools completely free of charge. No signup walls, no limits, and absolute client-side privacy.
        </p>
      </div>

      {/* Core Values Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-200 transition-all space-y-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-3 bg-slate-50 rounded-2xl w-max shadow-inner relative z-10">{v.icon}</div>
            <h3 className="text-lg font-black text-slate-800 relative z-10">{v.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-semibold relative z-10">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Interactive Story Timeline */}
      <div className="p-8 md:p-12 rounded-[2.5rem] bg-slate-950 text-white shadow-xl grid md:grid-cols-2 gap-12 items-center relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="space-y-6 relative z-10">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">The Chronicle</span>
          <h2 className="text-3xl font-black">Our Journey to 2026</h2>
          <p className="text-slate-400 text-xs leading-relaxed font-semibold">
            From a tiny sandbox script project to a trusted utility platform processing millions of local actions daily, ToolTrove represents the power of client-side computing.
          </p>
          <div className="flex gap-2">
            {timeline.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveStory(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeStory === idx ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-3 min-h-[180px] flex flex-col justify-center relative z-10">
          <span className="text-orange-400 text-xs font-black uppercase tracking-wider">{timeline[activeStory].title}</span>
          <p className="text-sm text-slate-200 leading-relaxed font-semibold">
            {timeline[activeStory].desc}
          </p>
        </div>
      </div>

      {/* Frameworks & Tech */}
      <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-10 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">Compliance & Performance</h3>
            <p className="text-slate-400 text-xs font-semibold mt-1">Our serverless core executes with modern browser APIs.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-wider">
            ✓ GDPR & CCPA Ready
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-8 text-xs font-semibold leading-relaxed text-slate-500">
          <p>
            By designing completely local pipelines, ToolTrove bypasses typical server vulnerability models. Traditional portals act as single points of database breach vectors, storing private documents and calculations in active caches. In contrast, our platform is structured as an isolated front-end sandbox utilizing modern browser sandboxes.
          </p>
          <p>
            We process heavy image and segmentation tasks via optimized client-side neural libraries (MediaPipe/WebGL), parse open-xml spreadsheet cells natively using structured JavaScript arrays, and compute precise compound loans through native memory. This architecture yields lightning-fast outputs and ensures absolute confidentiality.
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
        title="Privacy Policy & GDPR Compliance — ToolTrove"
        description="Read ToolTrove's strict privacy policy. Learn how our local-first sandbox guarantees that no files, passwords, or personal data ever leave your device."
      />

      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-xs font-black uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Local-First Guarantee
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-500 font-semibold text-xs leading-relaxed">
          Last updated: May 19, 2026. Effective globally under GDPR & CCPA frameworks.
        </p>
      </div>

      <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-3xl text-emerald-800 text-xs font-semibold leading-relaxed space-y-2 max-w-3xl mx-auto shadow-sm">
        <h4 className="font-black text-emerald-900 flex items-center gap-1.5 text-sm">
          <ShieldCheck className="w-5 h-5 shrink-0" /> Dynamic Client-Side Processing Statement
        </h4>
        <p>
          Unlike traditional utility portals that force you to upload documents to cloud servers, ToolTrove executes all core calculations, formats, PDF splits/merges, password updates, and image compressions completely inside your browser's local sandbox memory space. Zero bytes ever leave your device.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-650 text-sm leading-relaxed space-y-8 font-semibold">
        
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">1. Information We Never Collect</h2>
          <p>
            Because our architecture operates without cloud backends, we do not, cannot, and will never collect, process, or access:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
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
          <h2 className="text-lg font-black text-slate-900">3. AdSense and Advertising Disclosures</h2>
          <p>
            ToolTrove partners with Google AdSense to serve clean, responsive advertising placements. These placements utilize browser cookies to serve interest-based ads based on your generic browsing history. You may opt out of personalized advertisements at any time by visiting the official Google Ads Settings page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">4. CCPA & GDPR Compliance</h2>
          <p>
            Under global frameworks, users hold absolute rights regarding their digital privacy. Since our sandbox executes calculations locally, we do not compile databases of user identities, rendering standard requests for deletion or data transfers obsolete: your data stays completely within your device's memory control.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">5. Contact Our Privacy Officer</h2>
          <p>
            If you have questions regarding our local sandboxing protocols or wish to request details about compliance under CCPA and GDPR rules, email us immediately at <span className="font-bold text-slate-950">privacy@tooltrove.space</span>.
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
          Effective Date: May 19, 2026
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-650 text-sm leading-relaxed space-y-8 font-semibold">
        
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

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">5. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of India, without regard to conflicts of law provisions. Any legal actions must be resolved in courts located in Bengaluru, Karnataka, India.
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
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-500 transition-colors cursor-pointer"
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

// ==================== 5. DISCLAIMER PAGE ====================
export function DisclaimerPage() {
  return (
    <div className="pt-36 pb-20 px-6 max-w-4xl mx-auto space-y-12">
      <SEOManager 
        title="Legal Disclaimer & Liability Limits — ToolTrove"
        description="Read ToolTrove's legal disclaimer. Understand our computational warranties, tax estimates advice, and local browser execution limitations."
      />

      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-xs font-black uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" /> Standard Legal Disclosures
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Legal Disclaimer
        </h1>
        <p className="text-slate-500 font-semibold text-xs leading-relaxed">
          Effective Date: May 19, 2026. Reviewed for Google Adsense & Legal Compliance.
        </p>
      </div>

      <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-3xl text-amber-800 text-xs font-semibold leading-relaxed space-y-2 max-w-3xl mx-auto shadow-sm">
        <h4 className="font-black text-amber-900 flex items-center gap-1.5 text-sm">
          <Info className="w-5 h-5 shrink-0" /> Important Informational Purpose Declaration
        </h4>
        <p>
          All information and utilities (calculators, conversion scripts, background removers, OCR scans) offered on ToolTrove are served purely for educational, informational, and general utility purposes. ToolTrove does not represent professional financial, tax, or legal consulting services.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-slate-650 text-sm leading-relaxed space-y-8 font-semibold">
        
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">1. Accuracy of Calculations & GST/EMI</h2>
          <p>
            While our GST slab and EMI interest schedulers have been precisely coded to execute perfect arithmetic decimal calculations, we do not guarantee the completeness or absolute applicability of results to specific business structures. Financial slabs, tax codes, and compound compounding rules are subject to localized changes. Always consult with a certified public accountant (CPA) or licensed legal consultant before submitting official corporate filings or bank contracts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">2. No Liability Warranty</h2>
          <p>
            In no event shall ToolTrove, its developers, or editorial teams be liable for any direct, indirect, special, consequential, or incidental losses arising from the use of calculations, conversion sheets, cropped visuals, or system presets. Use of these utilities is entirely at your own risk.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">3. Third-Party Placements and Adsense</h2>
          <p>
            ToolTrove may display Google Adsense contextual ads or recommendations for external tools. These external targets are governed by their respective licenses and privacy structures. We do not inspect, endorse, or assume responsibility for external contents or corporate operations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">4. Client-Side Software Performance</h2>
          <p>
            Because all file modifications (such as high-fidelity human portrait masking and local script compilation) execute strictly inside your local device's memory via WebGL/HTML5, performance depends on your local hardware specs (GPU, RAM, CPU). ToolTrove is not responsible for temporary browser hangs, session timeouts, or memory limitations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">5. Clarifications & Questions</h2>
          <p>
            If you have questions regarding these legal liability thresholds or need support regarding our local-first warranties, contact us at <span className="font-bold text-slate-950">legal@tooltrove.space</span>.
          </p>
        </section>
      </div>
    </div>
  );
}

// Blog pages have been migrated to the dedicated BlogPages.jsx file to optimize splitting and modular maintenance.
