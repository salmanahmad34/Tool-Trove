import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, HelpCircle, Sliders, ShieldCheck, Zap, 
  ChevronRight, Award, Compass, ArrowRight, DollarSign 
} from 'lucide-react';
import SEOManager from './SEOManager';

// Dynamic Database for all 34 utilities
const SEO_DATABASE = {
  // --- PDF TOOLS ---
  'PDF Merge': {
    intro: "The ToolTrove PDF Merge utility is a highly secure, lightning-fast tool that allows you to combine multiple PDF documents into a single, unified file. Operating entirely in your browser sandbox, this tool eliminates the risk of private document leakage.",
    howItWorks: "Using HTML5 File Reader APIs and client-side memory streams, our engine concatenates individual PDF document layers into a unified block structure. It runs entirely on your local CPU without sending any bytes to external cloud servers.",
    beginnerGuide: "What is PDF Merging? PDFs are composed of structured objects representing text, fonts, and images. Merging combines these distinct trees into a single document structure. It is vital for compiling portfolios, medical bills, or corporate reports.",
    useCases: [
      "Freelancers: Combine monthly invoices into a single corporate billing package.",
      "Students: Merge separate homework assignments or research chapters before submission.",
      "Legal Advisors: Compile multiple evidentiary declarations and cover letters."
    ],
    benefits: ["Absolute Privacy: Files never touch a server.", "Instant Speeds: Zero round-trip delay.", "No Size Caps: Work with high-resolution documents locally."],
    steps: [
      "Upload or drag-and-drop multiple PDF files into the workbench.",
      "Arrange the file sequence easily by dragging files in your preferred order.",
      "Click 'Merge PDF' and save the combined document instantly to your local device."
    ],
    practices: [
      "Ensure all individual PDFs have identical orientation (portrait or landscape) for visual consistency.",
      "Compress your source files before merging to minimize the final unified file size.",
      "Double-check page numbers in individual documents before executing the compile step."
    ],
    faqs: [
      { q: "Is there a limit on the number of PDFs I can merge?", a: "No. Since calculations occur entirely on your local device, you can merge as many documents as your local RAM can handle." },
      { q: "Are my private documents safe?", a: "100% yes. ToolTrove uses zero database buffers and has no server backends. Your PDFs remain local at all times." }
    ]
  },
  'PDF Split': {
    intro: "Split large PDF files into distinct, single-page files or custom page ranges instantly. ToolTrove's PDF Split tool helps you dissect bulky catalogs, tax returns, or legal binders right inside your web browser.",
    howItWorks: "Our browser engine extracts selected binary offsets and constructs independent cross-reference tables (xref) for the specific page intervals, letting you export individual pages in seconds.",
    beginnerGuide: "What is PDF Splitting? In a multi-page PDF, index tables define which text/images render on which page. Splitting separates these indexes into standalone files, reducing weight and isolating information.",
    useCases: [
      "Accountants: Extract single tax forms from large annual financial filings.",
      "Real Estate: Separate individual property agreements from composite binders.",
      "Educators: Disseminate specific book chapters to different classes."
    ],
    benefits: ["Offline-friendly: Works completely without an active internet connection.", "Super fast: Extracts page packets in milliseconds.", "Precision: Select exact page numbers or ranges."],
    steps: [
      "Select your target multi-page PDF file.",
      "Specify your split range (e.g. 'Pages 1-3' or 'Extract All Pages').",
      "Click 'Split PDF' to download the processed file instantly."
    ],
    practices: [
      "Double-check page number alignments by viewing the preview thumbnail.",
      "Rename extracted segments immediately to avoid confusion with the main parent document.",
      "Keep standard backups of the parent PDF before splitting."
    ],
    faqs: [
      { q: "Can I split password-protected PDFs?", a: "You must first decrypt or enter the passcode to allow the local browser sandbox to parse and split the document layers." },
      { q: "Do extracted pages lose visual resolution?", a: "No. The split tool copies raw vector pathways and image references, ensuring zero quality degradation." }
    ]
  },
  'PDF Compressor': {
    intro: "Reduce PDF sizes safely without sacrificing text readability. ToolTrove's PDF Compressor scales down large images and flattens redundant font parameters entirely on the client side.",
    howItWorks: "This tool compresses internal high-resolution raster images using custom local downscaling algorithms, while stripping away unreferenced metadata tags to secure low byte weights.",
    beginnerGuide: "Why are PDFs so large? Large PDFs usually contain uncompressed embedded images and redundant subset fonts. Compression optimizes these media vectors, yielding highly shareable file sizes.",
    useCases: [
      "Job Applicants: Compress portfolio attachments to fit tight email recruitment limits.",
      "E-commerce: Reduce digital product manual sizes to speed up checkout delivery.",
      "Government Submissions: Fit administrative file submission portals (usually capped at 2MB)."
    ],
    benefits: ["Extreme compression ratios: Up to 90% reduction.", "Local rendering: Sensitive details remain completely offline.", "Sharp text: Only heavy raster elements are downscaled."],
    steps: [
      "Choose the heavy PDF file you wish to compress.",
      "Select your desired compression level (Balanced, Maximum, or High Quality).",
      "Click 'Compress PDF' and download your streamlined file instantly."
    ],
    practices: [
      "Select 'High Quality' if your PDF contains fine legal print or detailed architectural schematics.",
      "Use 'Balanced' for standard resumes, office memos, and standard invoices.",
      "Audit final output layouts to ensure embedded diagrams remain fully legible."
    ],
    faqs: [
      { q: "Does this compressor support native text search?", a: "Yes. It does not rasterize the pages; native document text pathways and searchable words remain fully preserved." },
      { q: "What is the optimal compression level?", a: "Balanced compression yields the best ratio of visual clarity to byte reduction for standard office use cases." }
    ]
  },

  // --- BUSINESS TOOLS ---
  'GST Calculator': {
    intro: "Compute CGST, SGST, IGST tax components instantly. Our professional GST Slab Calculator helps small business owners, freelancers, and accountants audit ledger items against official Indian GST slabs.",
    howItWorks: "The calculation engine runs basic slab arithmetic natively on input values using custom JS tax formulas, immediately isolating tax amounts for Inclusive and Exclusive scenarios.",
    beginnerGuide: "What is GST in India? The Goods and Services Tax (GST) is a unified, multi-stage indirect tax structure categorized into CGST (Central), SGST (State), and IGST (Integrated). Standard rates are 5%, 12%, 18%, and 28%.",
    useCases: [
      "Retailers: Verify item price tax portions before writing client receipts.",
      "Freelancers: Calculate exact 18% IGST to add to professional software service billing.",
      "Audit Compliance: Calculate monthly state CGST and SGST ratios for GST GSTR filings."
    ],
    benefits: ["Compliance-Ready: Updated with official Indian tax rates.", "Instant toggling: Shift between Exclusive and Inclusive tax modes.", "Ledger breakdown: Displays individual CGST, SGST, and IGST totals."],
    steps: [
      "Enter the base net price of your product or service.",
      "Select the official GST rate slab (5%, 12%, 18%, or 28%).",
      "Click 'Calculate Exclusive' or 'Calculate Inclusive' to reveal detailed tax portions."
    ],
    practices: [
      "Use Inclusive GST when calculating from final cash retail retail transactions.",
      "Use Exclusive GST when adding professional tax rates on top of freelance project estimates.",
      "Audit your state boundaries: use CGST/SGST for intra-state billing, and IGST for inter-state clients."
    ],
    faqs: [
      { q: "What is Inclusive vs Exclusive GST?", a: "Exclusive GST adds tax on top of your base price. Inclusive GST calculates the tax portion already embedded in the final selling price." },
      { q: "Does this tool store financial ledger details?", a: "No. ToolTrove calculates everything locally. Your private financial calculations never touch the cloud." }
    ]
  },
  'EMI Calculator': {
    intro: "Plan your loans wisely with our high-fidelity EMI Loan Calculator. Graph monthly payments, total payable interest, and amortization schedules instantly to make smart borrowing decisions.",
    howItWorks: "Using standard financial equations, our engine computes equal monthly installments based on principal, annual interest rates, and loan tenures, updating the amortization table instantly.",
    beginnerGuide: "What is an EMI? An Equated Monthly Installment (EMI) represents a fixed payment amount made by a borrower to a lender at a specified date each calendar month, combining both principal and interest portions.",
    useCases: [
      "Home Buyers: Calculate housing loan options across multiple commercial banking rates.",
      "Car Loans: Plan auto finance budgets before walking into dealer showrooms.",
      "Business Owners: Audit capital equipment loans to protect monthly cash flow margins."
    ],
    benefits: ["Full amortization charts: View month-by-month principal and interest decay.", "Interactive sliders: Change rates dynamically to observe instant shifts.", "Smart ratios: Computes the precise ratio of total interest against original principal."],
    steps: [
      "Specify your target loan principal amount.",
      "Select the annual interest rate (compounded monthly).",
      "Adjust loan tenure in years or months and view your dynamic payment schedule."
    ],
    practices: [
      "Ensure you use the exact compounded rate provided by bank terms.",
      "Review the amortization schedule to see how extra prepayments accelerate principal decay.",
      "Keep total monthly EMIs below 40% of your net monthly income to prevent default stress."
    ],
    faqs: [
      { q: "Are processing fees included in the EMI calculations?", a: "No. This tool isolates basic principal and compounding interest calculations. Add bank processing fees separately." },
      { q: "Does this match bank schedules?", a: "Yes. It uses standard international bank interest formulas, ensuring decimal-perfect projections." }
    ]
  },

  // --- IMAGE TOOLS ---
  'Background Remover': {
    intro: "Remove image backgrounds instantly in your browser. Rebuilt using advanced MediaPipe human segmentation, this tool extracts subjects cleanly while preserving hair, clothing, and limbs without server uploads.",
    howItWorks: "By utilizing local client-side WebGL canvas processing and human body segmentation models, this tool isolates subject coordinates, creates a transparent alpha mask, and applies edge feathering completely offline.",
    beginnerGuide: "How does transparent segmentation work? In standard digital images, every pixel is defined by RGB values. Transparency adds an Alpha channel (RGBA) defining opacity. AI models classify which pixels represent the main subject, setting the background alpha channel to zero.",
    useCases: [
      "E-commerce Sellers: Generate transparent product images for eBay, Amazon, or Shopify listings.",
      "Social Media Creators: Crop profile images or design high-converting YouTube thumbnails.",
      "Corporate HR: Build clean, unified team rosters with transparent background headshots."
    ],
    benefits: ["Absolute Privacy: No remote server uploads. Your personal photos remain on your machine.", "Vibrant Quality: Preserves high resolution subject details without stretching.", "Dynamic Backgrounds: Export as transparent PNG, plain white, blur, or custom HEX solid colors."],
    steps: [
      "Upload or drop your JPG/PNG photo into the visual workspace.",
      "Our AI segmenter analyzes and removes the background instantly.",
      "Select white, transparent, blur, or solid colored background replacements.",
      "Download your high-resolution PNG image with one click."
    ],
    practices: [
      "Use photos with clear subject-to-background contrast to aid edge classification.",
      "Apply slight boundary feathering when placing subjects on top of new custom colored backdrops.",
      "Upload high-resolution source files to guarantee crisp export details."
    ],
    faqs: [
      { q: "Does it support pet or object background removal?", a: "Our premium model is highly optimized for human faces, hair, and clothing layers, but it easily segment-crops high-contrast objects." },
      { q: "Is there an image size limit?", a: "No. Because image compiling takes place locally in your browser's WebGL context, there are zero server upload caps." }
    ]
  },
  'QR Generator': {
    intro: "Generate stunning, highly scannable QR codes with our premium client-side AI Stylist. Choose between square or smooth round matrices, test color safety contrast ratings in real-time, and embed center logos securely.",
    howItWorks: "Our local generator compiles text into a high error correction (Level 'H') QR matrix grid, dynamically checking HSL contrast values, mapping round dot coordinates, and rendering clean SVGs or PNG canvases.",
    beginnerGuide: "What is a QR Code? Quick Response (QR) codes are two-dimensional matrix barcodes. They feature tracking alignment squares at three corners, allowing mobile cameras to parse encoded link vectors instantly, even if skewed.",
    useCases: [
      "Retail Shops: Create safe UPI/Paytm payment code stickers for customer billing counters.",
      "Digital Portfolios: Print resume stickers linking directly to your personal GitHub Page.",
      "Event Organizers: Generate scannable Google Maps directions for invitations."
    ],
    benefits: ["100% Scannable: Automatic WCAG AA contrast ratio safety check.", "Design Variety: Elegant Cyberpunk, Neon, and Minimalist presets.", "Clean Exports: Lossless vector SVGs, Retina-grade PNGs, and A4 print templates."],
    steps: [
      "Type or paste your destination URL into the text analyzer.",
      "Select an AI Design Assistant preset or customize colors and margins.",
      "Upload your company logo to embed inside the QR code center.",
      "Click 'Download Crisp PNG' or 'Export Scalable SVG' for production use."
    ],
    practices: [
      "Always maintain a clean Quiet Zone (margin) around the QR code to aid mobile scanners.",
      "Keep foreground-to-background contrast above 4.5:1. Avoid light yellow or pastel dots on white.",
      "Test scan the code on both Android and iOS devices before printing high volumes."
    ],
    faqs: [
      { q: "Why did my QR code fail the safety check?", a: "Your foreground and background color choices are too close in luminance. Choose highly contrasting tones to guarantee scanning." },
      { q: "Is there a scan limit?", a: "No. These are static standard codes that run client-side. They never expire and allow infinite scans." }
    ]
  },

  // --- DEVELOPER TOOLS ---
  'JSON Formatter': {
    intro: "Validate, beautify, and minify raw JSON payloads in real time. ToolTrove's JSON Formatter provides developers with a secure browser editor that parses data maps instantly with complete data privacy.",
    howItWorks: "Our sandbox parses the raw text stream using local `JSON.parse` logic, formats spacing tokens programmatically, and renders colored syntax nodes directly in a responsive, glassmorphic code workspace.",
    beginnerGuide: "What is JSON? JavaScript Object Notation (JSON) is a lightweight, text-based, human-readable data interchange format. It relies on key-value pairs and ordered lists, serving as the backbone for modern web APIs.",
    useCases: [
      "Frontend Engineers: Beautify minified API payloads during debugging.",
      "Data Analysts: Clean up raw database outputs to analyze deep key-value maps.",
      "Technical Writers: Format code blocks nicely before writing technical tutorials."
    ],
    benefits: ["100% Private: Sensitive API keys, user lists, and corporate data never leave your browser.", "Syntax Highlighting: Clear color mapping for strings, numbers, booleans, and nulls.", "Instant Minification: Toggle between styled tabs to shrink data weights in one tap."],
    steps: [
      "Paste your raw, messy, or minified JSON text into the editor window.",
      "Our system validates structure and formats key nodes instantly.",
      "Click 'Copy Result' or toggle 'Minify' to shrink spacing arrays."
    ],
    practices: [
      "Always ensure keys are enclosed in double quotes (`\"key\"`) to meet standard JSON compliance rules.",
      "Check trailing commas at the end of objects, as they trigger parsing syntax exceptions in JS.",
      "Use minified views when transferring raw data payloads over network calls to save bandwidth."
    ],
    faqs: [
      { q: "What happens if my JSON is invalid?", a: "The compiler highlights the exact line number and parsing error, letting you isolate missing brackets or trailing quotes instantly." },
      { q: "Can this handle massive datasets?", a: "Yes. Our client-side rendering handles large JSON arrays smoothly within your local system memory limits." }
    ]
  }
};

// Fallback/Generic Template Generator for unmapped tools to guarantee high-density content for all 34 tools
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
    steps: [
      `Launch the ${toolName} page from the ToolTrove directory.`,
      `Enter your custom input parameters, files, or text variables in the workspace.`,
      `Watch the tool compile outcomes instantly. Save or copy your results.`
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

/**
 * ToolSEOContent Component
 * Renders high-density educational SEO articles, FAQs, guides, and related tools below each tool workbench.
 */
export default function ToolSEOContent({ toolName, category }) {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Fetch tool-specific content or construct fallback
  const content = SEO_DATABASE[toolName] || getFallbackSEOContent(toolName, category.title);

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
        "step": content.steps.map((step, idx) => ({
          "@type": "HowToStep",
          "position": idx + 1,
          "text": step
        }))
      }
    ]
  };

  // Get related tools in the same category
  const relatedTools = category.tools
    .filter(t => t !== toolName)
    .slice(0, 3);

  return (
    <div className="mt-20 border-t border-slate-200/80 pt-16 max-w-5xl mx-auto space-y-16">
      {/* Dynamic Client-Side Meta & Schema Injection */}
      <SEOManager 
        title={`${toolName} — Free & Secure ${category.title}`}
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
            <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
              Ultimate Guide to <span className="text-[#ff5c1a]">{toolName}</span>
            </h2>
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

          {/* Section 4: Step-by-Step Instructions */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Sliders className="text-[#ff5c1a] w-5 h-5 shrink-0" /> Step-by-Step Instructions
            </h3>
            <ol className="space-y-3">
              {content.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-[#ff5c1a] font-black text-xs shrink-0">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Section 5: Best Practices */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Sliders className="text-[#ff5c1a] w-5 h-5 shrink-0" /> Best Practices & Power Tips
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
          {relatedTools.length > 0 && (
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
