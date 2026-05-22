import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Trash2, ArrowLeft, LayoutGrid, Award, ShieldCheck, 
  ChevronRight, RefreshCw, FolderOpen, Heart, Eye, ArrowUpRight, Zap
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tooltrove_dashboard_items');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Delete an item
  const handleDelete = (index, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this custom creation from local storage?")) return;
    const updated = items.filter((_, idx) => idx !== index);
    setItems(updated);
    localStorage.setItem('tooltrove_dashboard_items', JSON.stringify(updated));
  };

  // Launch project editor
  const handleLaunch = (type) => {
    if (type === 'link-in-bio') navigate('/link-in-bio');
    else if (type === 'github-readme') navigate('/github-readme');
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
        <span className="text-orange-500 font-black text-sm uppercase tracking-wider">Dynamic Dashboard</span>
      </div>

      {/* Hero Welcome banner */}
      <div className="bg-slate-950 text-white rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden mb-12">
        <div className="max-w-xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-xs font-black uppercase">
            <Zap className="w-3.5 h-3.5 animate-pulse" /> Sandbox Launcher Active
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Welcome to Your <span className="text-orange-500 underline decoration-orange-200 decoration-8 underline-offset-8">Identity Suite</span></h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Manage your saved Link-in-Bios and custom GitHub README files. All profiles remain completely in your browser memory for ultimate privacy.
          </p>
        </div>

        {/* Backdrop visual glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-orange-500" /> Saved Identity Projects
          </h3>
          <span className="px-2.5 py-0.5 bg-orange-50 text-orange-700 rounded-lg text-[10px] font-black uppercase">
            {items.length} saved projects
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl p-8 space-y-6 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <LayoutGrid className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-slate-800 font-black text-xl">Start Building Your Digital Identity</h4>
              <p className="text-slate-500 text-sm max-w-md mx-auto font-medium">
                You do not have any saved bios or markdowns. Click any builder shortcut below to launch your next project!
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button 
                onClick={() => navigate('/link-in-bio')}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md"
              >
                Create Link-in-Bio
              </button>
              <button 
                onClick={() => navigate('/github-readme')}
                className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md"
              >
                Build README
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => handleLaunch(item.type)}
                className="group cursor-pointer bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-300 hover:-translate-y-1.5 transition-all flex flex-col justify-between h-52 relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 border-b border-slate-50 pb-3">
                    <span className="px-3 py-1 bg-orange-50 border border-orange-100 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-wider">
                      {item.type.replace('-', ' ')}
                    </span>
                    <button 
                      onClick={(e) => handleDelete(idx, e)}
                      className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-colors z-10 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-lg font-black text-slate-800 leading-snug group-hover:text-orange-550 transition-colors truncate">{item.title}</h4>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1.5">Updated: {item.updatedAt}</p>
                </div>

                <div className="flex items-center justify-between text-xs font-black text-orange-500 group-hover:translate-x-1.5 transition-transform duration-300 w-max pt-4 border-t border-slate-50 mt-4">
                  Open Project Editor <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        )}
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
