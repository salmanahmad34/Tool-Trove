import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Bot, Terminal, Brain, Layers } from 'lucide-react';
import { LogoIcon } from './BrandLogo';
import { motion, AnimatePresence } from 'framer-motion';

const ROTATING_DEMOS = [
  {
    title: "Document Vector Extraction",
    category: "PDF Parser Engine",
    query: "Extract structured tables and font parameters from quarterly_report.pdf",
    thinking: "Wise Owl analyzing PDF streams... Mapping typography matrix... Mapped 14 page layers. Restoring tables...",
    outcome: `[SUCCESS] Compiled PDF Page Table Index:
- Ingested: 1,489.2 KB
- Recovered Columns: [Date, ClientID, InvoiceTotal, TaxSplit]
- Saved Vector Layout: 100% compliant XML
- Generated Output: editable Microsoft Word (.docx)`
  },
  {
    title: "Image Alpha Isolate",
    category: "Canvas Edge Processor",
    query: "Isolate foreground subject from portrait_raw.jpg and feather bounds by 5px",
    thinking: "Chameleon Scanning canvas pixels... Extracting background colors... Isolate color RGB(243, 244, 246) with tolerance 30%... Feather bounds...",
    outcome: `[SUCCESS] Isolated Foreground Subject:
- Original Resolution: 2048 x 2048px
- Active Mask Bounds: 43.2% transparent alpha layer
- Filter Applied: 5px edge Gaussian feather
- In-Browser Export: Transparent PNG`
  },
  {
    title: "Systematic Wealth Projection",
    category: "SIP Math Compiler",
    query: "Calculate compound growth for Monthly SIP of $500, Rate 12%, for 15 Years",
    thinking: "Elephant Calculator processing amortization formula... Running 180 compounding loop checks... Aggregating annual returns...",
    outcome: `[SUCCESS] Financial Projections Compiled:
- Total Invested Amount: $90,000.00
- Est. Wealth Returns: $162,286.00
- Future Maturity Balance: $252,286.00
- SVG Amortization Ratio: 35.6% Principal / 64.4% Interest`
  },
  {
    title: "Schema Prettify & Validate",
    category: "Developer Validator",
    query: "Beautify and lint raw nested JSON object with 2-space indentation",
    thinking: "Clever Fox parsing bracket bounds... Checking commas... Restoring valid JSON structure...",
    outcome: `{
  "status": "active",
  "client": "ToolTrove Sandbox",
  "services": [
    { "name": "Format Converter", "type": "canvas" },
    { "name": "Base64 Encoder", "type": "utf8" }
  ],
  "latencyMs": 0.04
}`
  }
];

export default function ChatAssistant() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);
  const [demoIndex, setDemoIndex] = useState(0);
  const [typedQuery, setTypedQuery] = useState("");
  const [step, setStep] = useState(0); // 0: typing query, 1: thinking, 2: completed outcome
  const [thinkingProcess, setThinkingProcess] = useState("");
  const [typedOutcome, setTypedOutcome] = useState("");

  const activeDemo = ROTATING_DEMOS[demoIndex];

  // Intersection Observer to pause execution loops when scrolled out of view
  useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.05 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  // Rotate between demonstrations automatically
  useEffect(() => {
    if (!isInView) return; // Freeze CPU loop if not in viewport

    let queryInterval, thinkingTimeout, outcomeInterval, nextDemoTimeout;
    setStep(0);
    setTypedQuery("");
    setThinkingProcess("");
    setTypedOutcome("");

    // Step 1: Type the simulated user query
    let charIdx = 0;
    const fullQuery = activeDemo.query;
    queryInterval = setInterval(() => {
      if (charIdx <= fullQuery.length) {
        setTypedQuery(fullQuery.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(queryInterval);
        // Step 2: Transition to simulated thinking
        setStep(1);
        setThinkingProcess("Initializing client-side engine...");
        
        let thinkIdx = 0;
        const thinkingInterval = setInterval(() => {
          const statuses = [
            "Allocating canvas buffers...",
            activeDemo.thinking,
            "Structuring sandboxed elements...",
            "Polishing output details..."
          ];
          if (thinkIdx < statuses.length) {
            setThinkingProcess(statuses[thinkIdx]);
            thinkIdx++;
          } else {
            clearInterval(thinkingInterval);
            // Step 3: Transition to outcome
            setStep(2);
            let outcomeCharIdx = 0;
            const fullOutcome = activeDemo.outcome;
            outcomeInterval = setInterval(() => {
              if (outcomeCharIdx <= fullOutcome.length) {
                setTypedOutcome(fullOutcome.slice(0, outcomeCharIdx));
                outcomeCharIdx += 4; // Fast typing simulation
              } else {
                clearInterval(outcomeInterval);
                // Step 4: Wait and proceed to the next demo
                nextDemoTimeout = setTimeout(() => {
                  setDemoIndex((prev) => (prev + 1) % ROTATING_DEMOS.length);
                }, 5000);
              }
            }, 10);
          }
        }, 1500);
      }
    }, 40);

    return () => {
      clearInterval(queryInterval);
      clearInterval(outcomeInterval);
      clearTimeout(nextDemoTimeout);
    };
  }, [demoIndex, isInView]);

  return (
    <div ref={containerRef} className="bg-slate-950 rounded-[2.5rem] p-6 md:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800 animate-fade-in gpu-accelerated">
      {/* Background Orbs & Lights */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* CSS Floating Particles Animation Container */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-2 h-2 bg-orange-400 rounded-full top-[10%] left-[20%] animate-float-slow"></div>
        <div className="absolute w-3.5 h-3.5 bg-orange-500/30 rounded-full top-[60%] left-[80%] animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-[40%] left-[70%] animate-float-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-center relative z-10">
        
        {/* Left Side: Pitch and Pulsing Orb */}
        <div className="lg:col-span-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> 100% In-Browser Compilation
          </div>
          
          <h3 className="text-3xl md:text-5xl font-black leading-tight text-slate-100">
            Intelligent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Client Computing.</span>
          </h3>
          
          <p className="text-slate-400 leading-relaxed text-sm font-semibold">
            Watch our platform compile complex tasks entirely on your CPU. No files or inputs ever traverse network nodes, offering absolute visual transparency and maximum corporate data privacy.
          </p>

          {/* Glowing orbital simulation */}
          <div className="pt-4 flex items-center gap-6">
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              {/* Pulsing rings */}
              <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping pointer-events-none"></div>
              <div className="absolute -inset-2 bg-orange-500/5 rounded-full animate-pulse pointer-events-none"></div>
              <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-full shadow-lg flex items-center justify-center relative z-10 border border-orange-300">
                <Brain className="text-white w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <h5 className="font-black text-sm text-slate-200">Active Coprocessor Engine</h5>
              <p className="text-xs text-slate-400 mt-0.5">Simulating real-time local compiler workflows</p>
            </div>
          </div>
        </div>

        {/* Right Side: Showcase Console Screen */}
        <div className="lg:col-span-3">
          <div className="flex flex-col h-[400px] bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md relative">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
                <div>
                  <h4 className="font-black text-xs text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-orange-500" /> ToolTrove Sandbox
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{activeDemo.category} Active</p>
                </div>
              </div>
              
              <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-orange-400 rounded-lg text-[9px] font-black uppercase tracking-wider">
                Read-Only Showcase
              </span>
            </div>

            {/* Display Screen */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 font-mono text-xs select-none">
              
              {/* User Prompt */}
              <div className="space-y-1 bg-slate-950/40 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Input Requirement
                </div>
                <div className="text-slate-200 pl-3.5 border-l border-slate-800 leading-relaxed font-semibold italic">
                  "{typedQuery}"<span className="animate-pulse">|</span>
                </div>
              </div>

              {/* Engine Processing */}
              {step >= 1 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                    <LogoIcon className="w-3.5 h-3.5 animate-pulse" /> In-Browser Calculation
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-slate-400 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></div>
                      <span className="font-bold text-[10px] uppercase text-amber-400/80">Thinking:</span>
                    </div>
                    <p className="pl-3.5 border-l border-slate-800 text-slate-300 italic">{thinkingProcess}</p>
                  </div>
                </div>
              )}

              {/* Result Compilation */}
              {step >= 2 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5" /> Output Outcome
                  </div>
                  <div className="bg-slate-950 border border-slate-800 text-emerald-400 rounded-2xl p-4 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-48 scrollbar-none shadow-inner font-semibold">
                    {typedOutcome}
                  </div>
                </div>
              )}

            </div>

            {/* Simulated locked footer input block */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/30 flex gap-2 items-center">
              <div className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-[11px] text-slate-500 font-semibold italic flex justify-between items-center select-none">
                <span>Showcase mode is active. Choose any tool above to operate...</span>
                <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
