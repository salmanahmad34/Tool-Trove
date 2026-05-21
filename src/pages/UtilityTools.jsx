import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Download, Copy, Check, ArrowLeft, QrCode, Scan, 
  Link as LinkIcon, BarChart3, FileText, Image as ImageIcon, Eye, 
  RefreshCw, Upload, Terminal, Globe, ArrowUpRight, CopyCheck
} from 'lucide-react';
import { callGemmaAI } from '../utils/ai';

export default function UtilityTools() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('qr'); // 'qr' | 'shortener' | 'ocr' | 'preview'

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
        <span className="text-orange-500 font-black text-sm uppercase tracking-wider">Supporting Utilities</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* ==================== LEFT TABS DRAWER ==================== */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 space-y-1">
            <h4 className="font-black text-sm uppercase tracking-wider text-orange-500">Utilities Hub</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Digital Sandbox Toolset</p>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { id: 'qr', label: 'QR Generator & Scanner', icon: <QrCode className="w-4 h-4" /> },
              { id: 'shortener', label: 'URL Shortener & Analytics', icon: <LinkIcon className="w-4 h-4" /> },
              { id: 'ocr', label: 'OCR Document Scanner', icon: <FileText className="w-4 h-4" /> },
              { id: 'preview', label: 'Smart Link Preview', icon: <Eye className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full p-4 rounded-2xl border-2 font-black text-xs uppercase tracking-wider text-left flex items-center gap-3 transition-all ${
                  activeTab === tab.id 
                    ? 'border-orange-500 bg-orange-50/20 text-orange-650 shadow-sm' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ==================== RIGHT CONTENT MODULE ==================== */}
        <div className="lg:col-span-9 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl min-h-[580px] flex flex-col justify-between">
          <div>
            {activeTab === 'qr' && <QRModule />}
            {activeTab === 'shortener' && <ShortenerModule />}
            {activeTab === 'ocr' && <OCRModule />}
            {activeTab === 'preview' && <LinkPreviewModule />}
          </div>

          <div className="pt-8 border-t border-slate-100 mt-8 text-center text-[10px] font-black tracking-widest text-slate-400 uppercase">
            🔒 Sandbox Protected • 100% Secure Client Execution
          </div>
        </div>

      </div>

    </div>
  );
}

// ==========================================
// 1. SMART QR CODE GENERATOR & SCANNER
// ==========================================
function QRModule() {
  const [qrText, setQrText] = useState('https://tooltrove.com');
  const [qrColor, setQrColor] = useState('#0F172A');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [logoOption, setLogoOption] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  
  // Scanner states
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (qrText.trim()) {
      const cleanColor = qrColor.replace('#', '');
      const cleanBg = bgColor.replace('#', '');
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrText)}&color=${cleanColor}&bgcolor=${cleanBg}`);
    }
  }, [qrText, qrColor, bgColor]);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanResult('');
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(`Parsed Content: "${qrText}"\nFormat: QR_CODE\nProtocol: HTTPS`);
    }, 2000);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.target = '_blank';
    a.download = 'tooltrove-qrcode.png';
    a.click();
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-black text-slate-900">QR Generator & Scanner</h3>
        <p className="text-sm text-slate-500 mt-1">Generate branded, colored QR codes or scan profiles in sandbox.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Generator Controls */}
        <div className="space-y-4">
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">QR Configurations</span>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 block">QR Destination text/URL</label>
            <input 
              type="text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">Foreground Color</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-none"
                />
                <span className="text-xs font-mono font-bold text-slate-500">{qrColor}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">Background Color</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-none"
                />
                <span className="text-xs font-mono font-bold text-slate-500">{bgColor}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <input 
                type="checkbox" 
                checked={logoOption}
                onChange={(e) => setLogoOption(e.target.checked)}
                className="rounded text-orange-500 focus:ring-orange-400"
              />
              Inject ToolTrove Core Brand Logo
            </label>
          </div>
        </div>

        {/* Visual Preview Display */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-250/60 relative">
          {qrCodeUrl ? (
            <div className="relative p-4 bg-white border border-slate-200 rounded-2xl shadow-md">
              <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 object-contain" />
              {logoOption && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-orange-500 font-black text-xs tracking-tighter">T</span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-48 h-48 bg-slate-150 rounded-2xl animate-pulse"></div>
          )}

          <button 
            onClick={handleDownload}
            className="mt-5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
          >
            <Download className="w-3.5 h-3.5" /> Save QR Code
          </button>
        </div>
      </div>

      {/* QR Interactive Scanner Bezel */}
      <div className="border-t border-slate-150 pt-8 space-y-4">
        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Smart QR Scanner Sandbox</span>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-center items-center">
            {isScanning ? (
              <>
                <div className="w-full h-1.5 bg-emerald-500 absolute top-0 left-0 animate-scanner"></div>
                <Scan className="w-10 h-10 text-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-mono mt-3 uppercase tracking-widest">Scanning local-camera array...</span>
              </>
            ) : (
              <>
                <Scan className="w-10 h-10 text-slate-500" />
                <button 
                  onClick={handleSimulateScan}
                  className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Simulate Camera Scan
                </button>
              </>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-600 block">Scanner Outcomes</label>
            <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs rounded-2xl border border-slate-800 whitespace-pre leading-relaxed min-h-[100px]">
              {scanResult || "Awaiting scanning parameters..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. URL SHORTENER & ANALYTICS
// ==========================================
function ShortenerModule() {
  const [longUrl, setLongUrl] = useState('https://github.com/salmanahmad34/Tool-Trove');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [analytics, setAnalytics] = useState([
    { path: '/blog-preview', url: 'https://sarahjenkins.design', clicks: 84 },
    { path: '/github-readme', url: 'https://github.com/salmanahmad34', clicks: 142 }
  ]);

  // AI share snippet states
  const [aiSnippet, setAiSnippet] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShorten = () => {
    if (!longUrl.trim()) return;
    const randomPath = '/' + Math.random().toString(36).substring(2, 7);
    setShortUrl(`https://tooltrove.sh${randomPath}`);
    setAnalytics([{ path: randomPath, url: longUrl, clicks: 1 }, ...analytics]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAISnippet = async () => {
    if (!longUrl.trim()) return;
    setIsGenerating(true);
    try {
      const sys = "You are a professional social media manager inside ToolTrove. Formulate a catchy, highly engaging, and viral tweet/post (maximum 160 characters) to promote the provided destination link. Include standard relevant dev/tech hashtags. Return ONLY the promotional post text without headers, quotes or brackets.";
      const res = await callGemmaAI(sys, `Write promotional snippet for: ${longUrl}`);
      setAiSnippet(res.replace(/^["']|["']$/g, '').trim());
    } catch (err) {
      alert("AI snippet generation failed: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-black text-slate-900">URL Shortener & Analytics</h3>
        <p className="text-sm text-slate-500 mt-1">Shorten links into client memory and track analytics simulated click counts.</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input 
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Paste your long URL here (https://...)"
            className="flex-1 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold outline-none focus:bg-white focus:border-orange-500"
          />
          <button 
            onClick={handleShorten}
            className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-md"
          >
            Shorten
          </button>
        </div>

        {shortUrl && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center gap-3 animate-fade-in">
            <span className="text-xs font-bold text-orange-600 font-mono">{shortUrl}</span>
            <button 
              onClick={handleCopy}
              className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-slate-50 flex items-center gap-1 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        )}
      </div>

      {/* Gemma AI Promotion Snippet Generator */}
      <div className="p-5 bg-gradient-to-br from-orange-50/60 to-transparent border border-orange-100 rounded-3xl space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
            <h5 className="font-black text-xs text-orange-700 uppercase tracking-widest">Gemma AI Social Promo Writer</h5>
          </div>
          <button 
            onClick={handleGenerateAISnippet}
            disabled={isGenerating || !longUrl.trim()}
            className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-wider rounded-lg transition-all shadow-sm"
          >
            {isGenerating ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'Write Post'}
          </button>
        </div>

        {aiSnippet ? (
          <div className="p-4 bg-white border border-slate-200 rounded-2xl flex justify-between items-start gap-3">
            <p className="text-xs font-medium text-slate-650 leading-relaxed italic">"{aiSnippet}"</p>
            <button 
              onClick={() => { navigator.clipboard.writeText(aiSnippet); alert('Post copied!'); }}
              className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-800"
            >
              <CopyCheck className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
            Trigger Gemma copywriter helper to automatically construct a professional promotional post targeting social platforms like Twitter/LinkedIn.
          </p>
        )}
      </div>

      {/* Click Analytics table */}
      <div className="space-y-4">
        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-orange-500" /> Link Clicks Analytics Logs
        </span>

        <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
          <div className="grid grid-cols-12 bg-slate-50 p-3 text-[10px] font-black uppercase text-slate-400">
            <div className="col-span-5">Short Link</div>
            <div className="col-span-5">Destination</div>
            <div className="col-span-2 text-right">Clicks</div>
          </div>

          {analytics.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 p-3 text-xs font-semibold text-slate-700 items-center">
              <div className="col-span-5 font-mono text-orange-600 truncate">{`https://tooltrove.sh${item.path}`}</div>
              <div className="col-span-5 font-medium truncate">{item.url}</div>
              <div className="col-span-2 text-right font-black text-slate-900">{item.clicks}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. DOCUMENT SCANNER (OCR)
// ==========================================
function OCRModule() {
  const [ocrText, setOcrText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleSimulateOCR = (name) => {
    setFileName(name);
    setIsScanning(true);
    setOcrText('');
    setTimeout(() => {
      setIsScanning(false);
      setOcrText(`INVOICE #INV-2026-98
DATE: May 21, 2026
CLIENT: Salman Ahmad
DESCRIPTION: Web Restructuring & AI Features Overhaul
TOTAL: $4,500.00
STATUS: Pending Sandbox Release`);
    }, 2500);
  };

  const handleAIEnhance = async () => {
    if (!ocrText.trim()) return;
    setIsEnhancing(true);
    try {
      const sys = "You are an advanced OCR AI formatter helper inside ToolTrove. Re-structure the provided raw extracted text into an exceptionally clean, well-formatted, and beautiful Markdown document. Group parameters intelligently and render summary tables if prices or items are found. Return ONLY the Markdown formatted string. No quotes, brackets, or code wrapper tags.";
      const res = await callGemmaAI(sys, ocrText);
      setOcrText(res.trim());
    } catch (err) {
      alert("AI conversion failed: " + err.message);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-black text-slate-900">Document Scanner (OCR)</h3>
        <p className="text-sm text-slate-500 mt-1">Extract selectable structured text from photos and format markdown tags via AI.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Upload Block */}
        <div className="space-y-4">
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Image File Upload</span>
          
          <div 
            onClick={() => handleSimulateOCR('invoice_spec.png')}
            className="h-48 bg-slate-50 border-2 border-dashed border-slate-200 hover:border-orange-500 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-colors p-4"
          >
            <Upload className="w-8 h-8 text-slate-400 mb-3" />
            <span className="text-xs font-bold text-slate-700">Click to Upload Document Photo</span>
            <span className="text-[10px] text-slate-400 mt-1 font-semibold">PNG, JPG, WebP up to 10MB</span>
          </div>

          {fileName && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5"><ImageIcon className="w-4 h-4 text-orange-500" /> {fileName}</span>
              <span className="text-[10px] text-emerald-500 uppercase">Loaded</span>
            </div>
          )}
        </div>

        {/* Outcome Block */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-650">Extracted Markdown / Text</label>
            <div className="flex gap-2">
              <button 
                onClick={handleAIEnhance}
                disabled={isEnhancing || !ocrText.trim()}
                className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 disabled:opacity-50 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
              >
                {isEnhancing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                AI Format
              </button>
            </div>
          </div>

          <div className="relative">
            {isScanning && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-2xl flex flex-col justify-center items-center z-10 text-white">
                <RefreshCw className="w-6 h-6 animate-spin text-orange-500 mb-2" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Scanning document matrix...</span>
              </div>
            )}

            <textarea 
              rows="8"
              value={ocrText}
              onChange={(e) => setOcrText(e.target.value)}
              placeholder="Selectable outcome content will display here..."
              className="w-full p-4 bg-slate-950 text-slate-200 border border-slate-800 rounded-2xl font-mono text-xs outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. SMART LINK PREVIEW CARD
// ==========================================
function LinkPreviewModule() {
  const [previewUrl, setPreviewUrl] = useState('https://antigravity-sandbox.com');
  const [meta, setMeta] = useState({
    title: 'Antigravity Execution sandbox',
    desc: 'Secure client-side virtual playground executing Javascript compiles instantly in sandboxed frames.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
    siteName: 'Antigravity Labs'
  });

  const handlePreviewFetch = () => {
    if (!previewUrl.trim()) return;
    setMeta({
      title: `${previewUrl.replace(/^https?:\/\//, '')} Platform`,
      desc: `High-fidelity online preview generated inside ToolTrove sandbox. Optimize your headers and SEO index patterns instantly.`,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600',
      siteName: previewUrl.replace(/^https?:\/\/(www\.)?/, '').split('.')[0].toUpperCase()
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-black text-slate-900">Smart Link Preview</h3>
        <p className="text-sm text-slate-500 mt-1">Simulate beautiful social-media card previews for any destination website.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Configurations input */}
        <div className="space-y-4">
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Metadata Config</span>
          
          <div className="flex gap-2">
            <input 
              type="text"
              value={previewUrl}
              onChange={(e) => setPreviewUrl(e.target.value)}
              className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:bg-white focus:border-orange-500"
            />
            <button 
              onClick={handlePreviewFetch}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              Fetch
            </button>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">Og:Title</label>
              <input 
                type="text"
                value={meta.title}
                onChange={(e) => setMeta({...meta, title: e.target.value})}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:bg-white"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">Og:Description</label>
              <textarea 
                rows="2"
                value={meta.desc}
                onChange={(e) => setMeta({...meta, desc: e.target.value})}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:bg-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Visual Social Card Preview */}
        <div className="space-y-4">
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Social Media Card Output</span>
          
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-lg bg-white select-none">
            <img src={meta.image} alt="Preview" className="w-full aspect-[1.91/1] object-cover border-b border-slate-100" />
            <div className="p-4 space-y-1 bg-[#F2F4F7]/40">
              <span className="text-[9px] text-slate-450 uppercase font-black tracking-widest block">{meta.siteName}</span>
              <h5 className="text-xs font-black text-slate-850 truncate">{meta.title}</h5>
              <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{meta.desc}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => { alert('Meta Tag generated: <meta property="og:title" content="' + meta.title + '" />'); }}
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1"
            >
              Export Tag Codes
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
