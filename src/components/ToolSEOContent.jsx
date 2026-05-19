import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, HelpCircle, Sliders, ShieldCheck, Zap, 
  ChevronRight, Award, Compass, ArrowRight, DollarSign, Lightbulb 
} from 'lucide-react';
import SEOManager from './SEOManager';
import { SEO_DATABASE } from './SEODatabase';

// Fallback/Generic Template Generator for unmapped tools just in case
const getFallbackSEOContent = (toolName, catTitle) => {
  return {
    intro: `The ToolTrove ${toolName} utility is a premium, client-side tool created to deliver absolute precision, privacy, and speed. Built for designers, developers, business owners, and creators, this tool processes your data entirely within your local browser sandbox.`,
    howItWorks: `Our engine leverages client-side JavaScript APIs and highly optimized local browser memory structures to compile and execute ${toolName} tasks. No external server API calls are made, meaning zero latency and zero data leaks.`,
    beginnerGuide: `Understanding ${toolName}: Utilities like this process variables using local execution loops. Instead of sending private data packets over the network, your browser's CPU executes the algorithms natively, which keeps your workflow secure and offline-capable.`,
    useCases: [
      `Professional Workflows: Integrate ${toolName} into your daily work routines to save time and streamline digital deliverables.`,
      `Students & Educators: Use this easy-to-understand sandbox to learn core concepts and calculate formulas accurately.`,
      `Indian Small Businesses: Leverage this tool for daily administrative, media, or development requirements free of charge.`
    ],
    benefits: [
      "GDPR & CCPA Compliant: Complete data privacy since zero bytes leave your device.",
      "High Performance: Instant local processing with zero server delay.",
      "Free Access: Unlimited usage with no paid limits or mandatory registration."
    ],
    tips: [
      `Launch the ${toolName} page from the ToolTrove directory.`,
      `Enter your custom input parameters, files, or text variables in the workspace.`,
      `Watch the tool compile outcomes instantly.`
    ],
    practices: [
      "Bookmark this tool to access it instantly when working offline.",
      "Verify your input values for optimal results.",
      "Provide constructive mascot feedback if you require custom features."
    ],
    faqs: [
      { q: `Is using ${toolName} free?`, a: "Yes, it is 100% free with no hidden charges, premium paywalls, or registrations." },
      { q: "Where does my data go?", a: "Nowhere. All calculations are executed locally inside your web browser's temporary sandbox." }
    ]
  };
};

export default function ToolSEOContent({ toolName, category }) {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Fetch tool-specific content or construct fallback
  const content = SEO_DATABASE[toolName] || getFallbackSEOContent(toolName, category?.title || 'Utility');

  // Generate dynamic JSON-LD FAQ/HowTo schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "HowTo",
        "name": `How to use ${toolName} online on ToolTrove`,
        "description": content.intro,
        "step": content.tips.map((step, idx) => ({
          "@type": "HowToStep",
          "position": idx + 1,
          "text": step
        }))
      }
    ]
  };

  // Get related tools in the same category
  const relatedTools = category?.tools
    ? category.tools.filter(t => t !== toolName).slice(0, 3)
    : [];

  return (
    <div className="mt-20 border-t border-slate-200/80 pt-16 max-w-5xl mx-auto space-y-16">
      {/* Dynamic Client-Side Meta & Schema Injection */}
      <SEOManager 
        title={`${toolName} — Free & Secure ${category?.title || 'Utility'}`}
        description={`${toolName} on ToolTrove. ${content.intro.slice(0, 140)}... 100% free, offline, and secure client-side utility.`}
        schema={schema}
      />

      {/* Grid Layout for SEO Articles */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Educational Articles */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Header */}
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-orange-50 text-orange-600 border border-orange-100 rounded-full text-xs font-black uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" /> User Guide & Technical Knowledge
            </span>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
              Ultimate Guide to <span className="text-[#ff5c1a]">{toolName}</span>
            </h1>
            <p className="text-slate-500 font-semibold leading-relaxed text-sm md:text-base">
              {content.intro}
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 1: How It Works */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Zap className="text-[#ff5c1a] w-5 h-5 shrink-0" /> How It Works (Client-Side Logic)
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {content.howItWorks}
            </p>
          </div>

          {/* Section 2: Beginner Explanation */}
          <div className="space-y-4 p-6 bg-slate-50 border border-slate-150 rounded-3xl">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Compass className="text-orange-500 w-5 h-5 shrink-0" /> Beginner's Educational Guide
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {content.beginnerGuide}
            </p>
          </div>

          {/* Section 3: Use Cases */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Award className="text-[#ff5c1a] w-5 h-5 shrink-0" /> Target Use Cases & Applications
            </h3>
            <ul className="space-y-3">
              {content.useCases.map((uc, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5c1a] mt-2 shrink-0"></span>
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Pro Tips & Shortcuts */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Lightbulb className="text-amber-500 w-5 h-5 shrink-0" /> Pro Tips & Quick Shortcuts
            </h3>
            <ul className="space-y-3">
              {content.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5: Best Practices */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Sliders className="text-[#ff5c1a] w-5 h-5 shrink-0" /> Industry Best Practices
            </h3>
            <ul className="space-y-3">
              {content.practices.map((pr, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                  <span>{pr}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Sidebar (FAQs & Ad slots & Related) */}
        <div className="space-y-8">
          
          {/* AdSense Placement Placeholder */}
          <div className="p-6 rounded-3xl bg-slate-900/5 border border-slate-900/10 text-center space-y-3 shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none"></div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-900/10 text-slate-600 rounded-md text-[9px] font-black uppercase tracking-wider">
              <DollarSign className="w-3 h-3" /> Sponsored Placements
            </div>
            <div className="h-48 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-4 bg-white/40 group-hover:bg-white/80 transition-colors">
              <span className="text-slate-400 font-bold text-xs">High-CPM Premium Ad Space</span>
              <p className="text-[10px] text-slate-300 mt-1 max-w-[180px]">Auto-optimizing responsive display banner placement</p>
            </div>
          </div>

          {/* Core Benefits */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
            <h4 className="font-black text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-3">Why Use ToolTrove?</h4>
            <div className="space-y-3">
              {content.benefits.map((ben, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-bold text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 uppercase tracking-wider text-xs px-1">Frequently Asked Questions</h4>
            <div className="space-y-2">
              {content.faqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-5 py-3.5 font-bold text-slate-700 hover:text-orange-500 flex items-center justify-between text-xs transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-orange-500 shrink-0 text-base font-black ml-2">
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-slate-500 text-xs leading-relaxed border-t border-slate-50 pt-2 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools / Internal Links */}
          {relatedTools.length > 0 && category && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
              <h4 className="font-black text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-3">Related Utilities</h4>
              <div className="space-y-2.5">
                {relatedTools.map(rt => (
                  <Link 
                    key={rt}
                    to={`/tools/${category.path}/${encodeURIComponent(rt)}`}
                    className="flex items-center justify-between text-xs font-bold text-slate-600 hover:text-[#ff5c1a] group transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-500 transition-colors" />
                      {rt}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
