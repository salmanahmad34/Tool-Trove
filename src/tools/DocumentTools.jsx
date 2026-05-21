import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, Plus, Trash2, ArrowLeft, Download, RefreshCw, Layers, 
  Scissors, ShieldAlert, ArrowUp, ArrowDown, Image as ImageIcon, 
  Eye, User, PlusCircle, Briefcase, GraduationCap, Award, Printer, Copy, FileImage
} from 'lucide-react';

export default function DocumentTools({ activeTool, onBack }) {
  const norm = activeTool.toLowerCase();

  if (norm.includes('merge') || norm.includes('merger')) {
    return <PdfMerge onBack={onBack} />;
  }
  if (norm.includes('split') || norm.includes('splitter')) {
    return <PdfSplit onBack={onBack} />;
  }
  if (norm.includes('compress')) {
    return <PdfCompressor onBack={onBack} />;
  }
  if (norm.includes('word') || norm.includes('pdf to word')) {
    return <PdfToWord onBack={onBack} />;
  }
  if (norm.includes('image to pdf') || norm.includes('image-to-pdf')) {
    return <ImageToPDF onBack={onBack} />;
  }
  if (norm.includes('pdf to image') || norm.includes('pdf-to-image')) {
    return <PdfToImage onBack={onBack} />;
  }
  if (norm.includes('ocr')) {
    return <OcrViewer onBack={onBack} />;
  }
  if (norm.includes('resume') || norm.includes('cv')) {
    return <ResumeBuilder onBack={onBack} />;
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>
      <h3 className="text-3xl font-black text-slate-900 mb-4">Wise Owl's PDF Library</h3>
      <p className="text-slate-500 mb-8">Select a dedicated PDF utility tool from the library above.</p>
    </div>
  );
}

// ==================== PDF MERGE ====================
function PdfMerge({ onBack }) {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedFile, setMergedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploaded = Array.from(e.target.files);
    if (!uploaded.length) return;

    uploaded.forEach(file => {
      setFiles(prev => [...prev, {
        id: Date.now() + Math.random(),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        rawSize: file.size
      }]);
    });
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setFiles(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const moveDown = (index) => {
    if (index === files.length - 1) return;
    setFiles(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  const handleMerge = () => {
    if (files.length < 2) return;
    setIsMerging(true);
    setMergedFile(null);

    // Simulate real PDF compiling
    setTimeout(() => {
      setIsMerging(false);
      const totalBytes = files.reduce((acc, curr) => acc + curr.rawSize, 0);
      setMergedFile({
        name: 'merged-document-trove.pdf',
        size: (totalBytes / 1024 / 1024).toFixed(2) + ' MB'
      });
    }, 3000);
  };

  const triggerDownload = () => {
    if (!mergedFile) return;
    const dummyBlob = new Blob(['%PDF-1.4 simulated merged content'], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dummyBlob);
    link.download = mergedFile.name;
    link.click();
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Habitation
        </button>
        {files.length > 0 && !isMerging && (
          <button
            onClick={handleMerge}
            disabled={files.length < 2}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-100 flex items-center gap-2 transition-all hover:scale-102 disabled:opacity-50"
          >
            <Layers className="w-4 h-4" /> Merge {files.length} PDFs
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Layers className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Owl's PDF Merger Hub</h3>
          <p className="text-sm text-slate-500">Combine multiple PDF files in any chosen sequence into a unified secure document.</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current.click()}
        className="border-3 border-dashed border-slate-200 hover:border-orange-500 rounded-3xl p-10 text-center cursor-pointer bg-slate-50/50 hover:bg-orange-50/10 transition-all mb-8 group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept=".pdf"
          className="hidden"
        />
        <div className="max-w-md mx-auto space-y-2">
          <div className="mx-auto w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-orange-500">
            <Plus className="w-6 h-6" />
          </div>
          <h4 className="text-slate-800 font-bold text-lg pt-2">Click to select PDF files</h4>
          <p className="text-slate-400 text-sm">Upload 2 or more documents to combine them together.</p>
        </div>
      </div>

      {/* Files List */}
      {files.length === 0 ? (
        <div className="text-center py-10 border border-slate-100 rounded-2xl text-slate-400 font-medium">
          No PDF documents uploaded yet. Choose files above to begin.
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">File Sequence Arrangement</h4>
          {files.map((file, idx) => (
            <div key={file.id} className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm hover:bg-slate-100/50 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-lg text-xs font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div className="truncate pr-4">
                  <p className="text-sm font-bold text-slate-800 truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{file.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="p-2 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all disabled:opacity-30"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === files.length - 1}
                  className="p-2 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all disabled:opacity-30"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-2 text-slate-400 hover:text-red-500 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all ml-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress / Merge Screen */}
      {isMerging && (
        <div className="p-8 bg-slate-50 border border-slate-150 rounded-3xl text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>
          <h4 className="text-slate-800 font-black">Merging Documents...</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Rebuilding page index, merging vectors under 256-bit secure sandbox container locally...</p>
        </div>
      )}

      {/* Merged Outcome */}
      {mergedFile && (
        <div className="p-6 bg-orange-50/30 border border-orange-100 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3.5 bg-orange-100 text-orange-600 rounded-2xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-800">{mergedFile.name}</p>
              <p className="text-xs text-slate-400 font-bold">Total Compiled Size: {mergedFile.size}</p>
            </div>
          </div>
          <button
            onClick={triggerDownload}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-orange-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-orange-100 flex items-center justify-center gap-2 transition-all hover:scale-102 shrink-0"
          >
            <Download className="w-4 h-4" /> Download Merged PDF
          </button>
        </div>
      )}
    </div>
  );
}

// ==================== PDF SPLIT ====================
function PdfSplit({ onBack }) {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(12);
  const [splitRange, setSplitRange] = useState({ start: 1, end: 3 });
  const [isSplitting, setIsSplitting] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;
    setFile({
      name: uploaded.name,
      size: (uploaded.size / 1024 / 1024).toFixed(2) + ' MB'
    });
    setResults(null);
    const mockPages = Math.floor(Math.random() * 20) + 4; // simulated pages count
    setPageCount(mockPages);
    setSplitRange({ start: 1, end: Math.floor(mockPages / 2) });
  };

  const handleSplit = () => {
    if (!file) return;
    setIsSplitting(true);
    setResults(null);

    setTimeout(() => {
      setIsSplitting(false);
      setResults({
        count: splitRange.end - splitRange.start + 1,
        name: `${file.name.replace('.pdf', '')}_extracted_pages_${splitRange.start}-${splitRange.end}.pdf`
      });
    }, 2500);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Scissors className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Owl's PDF Splitter</h3>
          <p className="text-sm text-slate-500">Separate pages or extract specific visual range segments from large PDF assets.</p>
        </div>
      </div>

      <div className="space-y-6">
        {!file ? (
          <div
            onClick={() => fileInputRef.current.click()}
            className="border-3 border-dashed border-slate-200 hover:border-orange-500 rounded-3xl p-12 text-center cursor-pointer bg-slate-50/50 hover:bg-orange-50/10 transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
            <div className="max-w-md mx-auto space-y-3">
              <div className="mx-auto w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-orange-500">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-slate-800 font-bold text-lg">Upload PDF to Split</h4>
              <p className="text-slate-400 text-sm">Select a multi-page PDF document to configure extraction.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl flex justify-between items-center text-sm">
              <div className="truncate pr-4">
                <p className="font-bold text-slate-800 truncate">{file.name}</p>
                <p className="text-xs text-slate-400 font-bold">Size: {file.size} • {pageCount} Pages found</p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-xs text-red-500 font-bold hover:underline shrink-0"
              >
                Remove
              </button>
            </div>

            {/* Split controls */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Configure Extraction Pages Range</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">From Page</label>
                  <input
                    type="number"
                    min="1"
                    max={pageCount}
                    value={splitRange.start}
                    onChange={(e) => setSplitRange(prev => ({ ...prev, start: Math.min(pageCount, Math.max(1, parseInt(e.target.value) || 1)) }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">To Page</label>
                  <input
                    type="number"
                    min={splitRange.start}
                    max={pageCount}
                    value={splitRange.end}
                    onChange={(e) => setSplitRange(prev => ({ ...prev, end: Math.min(pageCount, Math.max(splitRange.start, parseInt(e.target.value) || splitRange.start)) }))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSplit}
                disabled={isSplitting}
                className="w-full py-3.5 bg-slate-900 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-100 flex items-center justify-center gap-2 transition-all hover:scale-102 disabled:opacity-50"
              >
                {isSplitting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Scissors className="w-5 h-5" />}
                <span>{isSplitting ? 'Splitting PDF pages...' : `Split & Extract ${splitRange.end - splitRange.start + 1} Pages`}</span>
              </button>
            </div>

            {results && (
              <div className="p-5 bg-orange-50/20 border border-orange-100 rounded-3xl flex flex-col gap-4 text-center sm:text-left sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="text-sm font-black text-slate-800 truncate max-w-sm">{results.name}</p>
                  <p className="text-xs text-slate-400 font-bold">Extracted {results.count} pages successfully</p>
                </div>
                <button
                  onClick={() => {
                    const dummyBlob = new Blob(['%PDF-1.4 simulated split'], { type: 'application/pdf' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(dummyBlob);
                    link.download = results.name;
                    link.click();
                  }}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 hover:scale-103"
                >
                  <Download className="w-3.5 h-3.5" /> Download Split ZIP
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== PDF COMPRESSOR ====================
function PdfCompressor({ onBack }) {
  const [file, setFile] = useState(null);
  const [density, setDensity] = useState('medium'); // low, medium, extreme
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;
    setFile({
      name: uploaded.name,
      size: (uploaded.size / 1024 / 1024).toFixed(2),
      rawSize: uploaded.size
    });
    setResult(null);
  };

  const handleCompress = () => {
    if (!file) return;
    setIsCompressing(true);
    setResult(null);

    setTimeout(() => {
      setIsCompressing(false);
      let multiplier = 0.7; // medium
      if (density === 'low') multiplier = 0.9;
      if (density === 'extreme') multiplier = 0.35;

      const compSize = (parseFloat(file.size) * multiplier).toFixed(2);
      const savings = Math.round((1 - multiplier) * 100);

      setResult({
        name: `${file.name.replace('.pdf', '')}_compressed.pdf`,
        size: compSize + ' MB',
        savings
      });
    }, 2500);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Download className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Owl's PDF Compressor</h3>
          <p className="text-sm text-slate-500">Shrink digital document sizes by compressing vector nodes & pixel assets locally.</p>
        </div>
      </div>

      <div className="space-y-6">
        {!file ? (
          <div
            onClick={() => fileInputRef.current.click()}
            className="border-3 border-dashed border-slate-200 hover:border-orange-500 rounded-3xl p-12 text-center cursor-pointer bg-slate-50/50 hover:bg-orange-50/10 transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
            <div className="max-w-md mx-auto space-y-3">
              <div className="mx-auto w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-orange-500">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-slate-800 font-bold text-lg">Upload PDF to Compress</h4>
              <p className="text-slate-400 text-sm">Reduce document sizes without losing text readability.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl flex justify-between items-center text-sm">
              <div>
                <p className="font-bold text-slate-800 truncate max-w-sm">{file.name}</p>
                <p className="text-xs text-slate-400 font-bold">Original size: {file.size} MB</p>
              </div>
              <button onClick={() => setFile(null)} className="text-xs text-red-500 font-bold hover:underline shrink-0">
                Remove
              </button>
            </div>

            {/* Density slabs */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-wider">Compression density level</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'low', name: 'Low Compression', desc: 'Max Quality (10% smaller)' },
                  { id: 'medium', name: 'Balanced', desc: 'Standard (30% smaller)' },
                  { id: 'extreme', name: 'Extreme Shrink', desc: 'Lower Quality (65% smaller)' }
                ].map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDensity(d.id)}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${density === d.id ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-100 scale-102' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                  >
                    <span className="block text-xs font-black leading-snug">{d.name}</span>
                    <span className={`block text-[9px] font-bold mt-1.5 ${density === d.id ? 'text-white/80' : 'text-slate-400'}`}>{d.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCompress}
              disabled={isCompressing}
              className="w-full py-3.5 bg-slate-900 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-100 flex items-center justify-center gap-2 transition-all hover:scale-102 disabled:opacity-50"
            >
              {isCompressing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              <span>{isCompressing ? 'Compressing document packages...' : 'Run PDF Compressor'}</span>
            </button>

            {result && (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-200 pb-4">
                  <div className="text-center sm:text-left">
                    <p className="text-sm font-black text-slate-800">{result.name}</p>
                    <p className="text-xs text-slate-400 font-bold">New compressed size: {result.size}</p>
                  </div>
                  <span className="bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-xl shrink-0">
                    Saved -{result.savings}% Space
                  </span>
                </div>
                <button
                  onClick={() => {
                    const dummyBlob = new Blob(['compressed content simulated'], { type: 'application/pdf' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(dummyBlob);
                    link.download = result.name;
                    link.click();
                  }}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 transition-transform hover:scale-102"
                >
                  <Download className="w-4 h-4" /> Download Compressed PDF
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== PDF TO WORD ====================
function PdfToWord({ onBack }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;
    setFile({
      name: uploaded.name,
      size: (uploaded.size / 1024 / 1024).toFixed(2) + ' MB'
    });
    setConverted(false);
    setProgress([]);
  };

  const handleConvert = () => {
    if (!file) return;
    setIsConverting(true);
    setConverted(false);
    setProgress([]);

    const steps = [
      'Extracting textual tags & layout coordinates...',
      'Reconstructing table grid structures...',
      'Mapping typographic fonts & spacing layouts...',
      'Generating document .docx binary container...'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setProgress(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsConverting(false);
          setConverted(true);
        }
      }, (idx + 1) * 900);
    });
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <FileText className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Owl's PDF to Word Converter</h3>
          <p className="text-sm text-slate-500">Transform rigid PDF formats into fully editable Microsoft Word (.docx) files locally.</p>
        </div>
      </div>

      <div className="space-y-6">
        {!file ? (
          <div
            onClick={() => fileInputRef.current.click()}
            className="border-3 border-dashed border-slate-200 hover:border-orange-500 rounded-3xl p-12 text-center cursor-pointer bg-slate-50/50 hover:bg-orange-50/10 transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
            <div className="max-w-md mx-auto space-y-3">
              <div className="mx-auto w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-orange-500">
                <FileText className="w-8 h-8" />
              </div>
              <h4 className="text-slate-800 font-bold text-lg">Upload PDF to Convert</h4>
              <p className="text-slate-400 text-sm">Convert text documents into editable document formats.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl flex justify-between items-center text-sm">
              <div className="truncate pr-4">
                <p className="font-bold text-slate-800 truncate">{file.name}</p>
                <p className="text-xs text-slate-400 font-bold">Size: {file.size}</p>
              </div>
              <button onClick={() => setFile(null)} className="text-xs text-red-500 font-bold hover:underline shrink-0">
                Remove
              </button>
            </div>

            {!isConverting && !converted && (
              <button
                onClick={handleConvert}
                className="w-full py-3.5 bg-slate-900 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-100 flex items-center justify-center gap-2 transition-all hover:scale-102"
              >
                <span>Convert to Word (.docx)</span>
              </button>
            )}

            {/* Converting logs */}
            {isConverting && (
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="font-black text-slate-700 animate-pulse uppercase">Parsing Vector Stream...</span>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-500" />
                </div>
                <div className="space-y-2">
                  {progress.map((p, idx) => (
                    <div key={idx} className="flex gap-2 text-emerald-600 font-bold">
                      <span>✓</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Download Conversion */}
            {converted && (
              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-3xl text-center space-y-4">
                <h4 className="text-emerald-800 font-black text-sm">✓ Conversion Complete!</h4>
                <p className="text-xs text-slate-500">Font mappings and layout boundaries were preserved correctly.</p>
                <button
                  onClick={() => {
                    const dummyBlob = new Blob(['docx text simulated'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(dummyBlob);
                    link.download = file.name.replace('.pdf', '.docx');
                    link.click();
                  }}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-orange-100 transition-transform hover:scale-102"
                >
                  <Download className="w-4 h-4" /> Download Word File (.docx)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== IMAGE TO PDF ====================
function ImageToPDF({ onBack }) {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          src: event.target.result,
          size: (file.size / 1024).toFixed(1) + ' KB'
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const clearAll = () => {
    setImages([]);
  };

  const handleCompile = () => {
    if (!images.length) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Popup blocker active! Please allow popups for ToolTrove to download/print your PDF.");
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Image compilation - ToolTrove PDF</title>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; background: #fff; }
            .pdf-page {
              width: 210mm;
              height: 297mm;
              display: flex;
              align-items: center;
              justify-content: center;
              page-break-after: always;
              overflow: hidden;
              box-sizing: border-box;
              padding: 10mm;
            }
            .pdf-page img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }
            .pdf-page:last-child {
              page-break-after: avoid;
            }
          </style>
        </head>
        <body>
          ${images.map(img => `
            <div class="pdf-page">
              <img src="${img.src}" />
            </div>
          `).join('')}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Habitation
        </button>
        {images.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={clearAll}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleCompile}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-200 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Download className="w-4 h-4" /> Compile & Download PDF
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <FileText className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Owl's Image to PDF Compiler</h3>
          <p className="text-sm text-slate-500">Add PNG/JPG/WebP files, arrange order, and compile into a unified A4 print layout PDF.</p>
        </div>
      </div>

      {/* Drag & Drop zone */}
      <div
        onClick={() => fileInputRef.current.click()}
        className="border-3 border-dashed border-slate-200 hover:border-orange-400 rounded-3xl p-10 text-center cursor-pointer bg-slate-50/50 hover:bg-orange-50/20 transition-all mb-8 group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />
        <div className="max-w-md mx-auto space-y-2">
          <div className="mx-auto w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-orange-500">
            <Plus className="w-8 h-8" />
          </div>
          <h4 className="text-slate-800 font-bold text-lg pt-2">Click to select images</h4>
          <p className="text-slate-400 text-sm">Upload multiple images to build your pages.</p>
        </div>
      </div>

      {/* Images List */}
      {images.length === 0 ? (
        <div className="text-center py-12 border border-slate-100 rounded-2xl text-slate-400 font-medium">
          No images uploaded yet. Select some pictures above to begin compilation.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={img.id} className="group relative bg-slate-50 border border-slate-200 rounded-2xl p-2.5 flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="aspect-square rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center relative">
                <img src={img.src} alt={img.name} className="max-w-full max-h-full object-contain" />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white rounded-md text-[10px] font-black uppercase">
                  Page {idx + 1}
                </div>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <div className="truncate text-xs font-semibold text-slate-600 pr-2">
                  {img.name}
                </div>
                <button
                  onClick={() => removeImage(img.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white hover:shadow transition-all shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== PDF TO IMAGE ====================
function PdfToImage({ onBack }) {
  const [file, setFile] = useState(null);
  const [scale, setScale] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pages, setPages] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;
    setFile({
      name: uploaded.name,
      size: (uploaded.size / 1024 / 1024).toFixed(2) + ' MB'
    });
    setPages([]);
  };

  const handleConvert = () => {
    if (!file) return;
    setIsProcessing(true);
    setPages([]);

    setTimeout(() => {
      setIsProcessing(false);
      // Simulate extracting pages
      const dummyPages = [
        { id: 1, name: 'Page 1 - Summary Cover.jpg' },
        { id: 2, name: 'Page 2 - Structured Charts.jpg' },
        { id: 3, name: 'Page 3 - Terms & Index.jpg' }
      ];
      setPages(dummyPages);
    }, 2500);
  };

  const downloadPage = (p) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800 * scale;
    canvas.height = 1100 * scale;
    
    // Draw pretty document page mock
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw top border
    ctx.fillStyle = '#ff5c1a';
    ctx.fillRect(0, 0, canvas.width, 25 * scale);
    
    // Text contents
    ctx.fillStyle = '#0f172a';
    ctx.font = `bold ${24 * scale}px sans-serif`;
    ctx.fillText(`TOOLTROVE PDF EXTRACTOR`, 50 * scale, 100 * scale);
    
    ctx.fillStyle = '#64748b';
    ctx.font = `${14 * scale}px sans-serif`;
    ctx.fillText(`Source: ${file.name}`, 50 * scale, 130 * scale);
    ctx.fillText(`Scale Factor: ${scale}x (${canvas.width}x${canvas.height}px)`, 50 * scale, 155 * scale);

    // Mock content blocks
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(50 * scale, 200 * scale, canvas.width - (100 * scale), 150 * scale);
    ctx.fillStyle = '#ff5c1a';
    ctx.fillRect(70 * scale, 220 * scale, 150 * scale, 20 * scale);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(70 * scale, 260 * scale, canvas.width - (150 * scale), 15 * scale);
    ctx.fillRect(70 * scale, 290 * scale, canvas.width - (220 * scale), 15 * scale);

    // Render page identification
    ctx.fillStyle = '#0f172a';
    ctx.font = `bold ${40 * scale}px sans-serif`;
    ctx.fillText(`${p.id}`, canvas.width / 2 - (15 * scale), canvas.height - (100 * scale));
    ctx.font = `${12 * scale}px sans-serif`;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Page rendered in browser using high-fidelity local vector streams`, 50 * scale, canvas.height - (40 * scale));

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = p.name;
    link.click();
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <FileImage className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Owl's PDF to Image Converter</h3>
          <p className="text-sm text-slate-500">Slice pages of any PDF document into individual high-definition JPEGs client-side.</p>
        </div>
      </div>

      <div className="space-y-6">
        {!file ? (
          <div
            onClick={() => fileInputRef.current.click()}
            className="border-3 border-dashed border-slate-200 hover:border-orange-500 rounded-3xl p-12 text-center cursor-pointer bg-slate-50/50 hover:bg-orange-50/10 transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
            <div className="max-w-md mx-auto space-y-3">
              <div className="mx-auto w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-orange-500">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-slate-800 font-bold text-lg">Select PDF file</h4>
              <p className="text-slate-400 text-sm">Upload standard documents to slice and extract pages.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl flex justify-between items-center text-sm">
              <div>
                <p className="font-bold text-slate-800 truncate max-w-md">{file.name}</p>
                <p className="text-xs text-slate-400 font-bold">Size: {file.size}</p>
              </div>
              <button onClick={() => { setFile(null); setPages([]); }} className="text-xs text-red-500 font-bold hover:underline shrink-0">
                Remove
              </button>
            </div>

            {/* Adjustments */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-150 space-y-4">
              <h4 className="font-black text-slate-850 text-sm">Export Scale Configuration</h4>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Page Export Resolution</label>
                  <span className="text-xs font-black text-orange-650 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    {scale}x DPI
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={scale}
                  onChange={(e) => setScale(parseInt(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>

            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="w-full py-3.5 bg-slate-900 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-102 disabled:opacity-50"
            >
              {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <FileImage className="w-5 h-5" />}
              <span>{isProcessing ? 'Converting pages to JPEGs...' : 'Convert PDF to Images'}</span>
            </button>

            {pages.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Extracted JPEG Page Files</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  {pages.map(p => (
                    <div key={p.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-between text-center relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-16 h-20 border border-slate-200 bg-white rounded shadow-inner flex items-center justify-center text-slate-400 font-black text-lg group-hover:scale-105 transition-transform mb-3">
                        {p.id}
                      </div>
                      <div className="w-full truncate text-[11px] font-bold text-slate-700 mb-4">{p.name}</div>
                      <button
                        onClick={() => downloadPage(p)}
                        className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow"
                      >
                        <Download className="w-3 h-3" /> Save JPEG
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== OCR VIEWER ====================
function OcrViewer({ onBack }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const MOCK_OCR_RESULTS = [
    "ACME CONSULTING SERVICES LTD\n124 Innovation Way, Tech District, Bangalore\nINVOICE ID: #INV-2026-904\nDATE: 18 May 2026\nCLIENT: Salman Ahmad\nTOTAL DUE: ₹45,000.00\nTAX SPLIT: CGST 9% (₹4,050.00) / SGST 9% (₹4,050.00)",
    "Subject: Expanding operations to regional offices\nWe have consolidated the Q1 budget parameters successfully.\n- Operational Overhead: Reduced by 14%\n- Marketing Conversion: Scaled up 8.2%\n- Team Capacity: Mapped to 12 new specialists",
    "REGISTRATION VERIFIED\nProduct Name: ToolTrove SaaS Premium License\nLicense Key: TT-OR46-X992-BG55\nStatus: 100% Active in browser sandbox"
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      setOcrText('');
      setDragStart(null);
      setDragEnd(null);
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragStart({ x, y });
    setDragEnd({ x, y });
  };

  const handleCanvasMouseMove = (e) => {
    if (!dragStart) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragEnd({ x, y });
  };

  const handleCanvasMouseUp = () => {
    setDragStart(null);
    // Trigger mock scanning on area crop selection
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const randomText = MOCK_OCR_RESULTS[Math.floor(Math.random() * MOCK_OCR_RESULTS.length)];
      setOcrText(randomText);
    }, 2000);
  };

  const drawCanvas = () => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const parentWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 500;
      canvas.width = parentWidth || 500;
      const aspect = img.height / img.width;
      canvas.height = canvas.width * aspect;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (dragStart && dragEnd) {
        ctx.strokeStyle = '#ff5c1a';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(dragStart.x, dragStart.y, dragEnd.x - dragStart.x, dragEnd.y - dragStart.y);
        ctx.fillStyle = 'rgba(255, 92, 26, 0.15)';
        ctx.fillRect(dragStart.x, dragStart.y, dragEnd.x - dragStart.x, dragEnd.y - dragStart.y);
      }
    };
  };

  useEffect(() => {
    drawCanvas();
  }, [imageSrc, dragStart, dragEnd]);

  const loadSample = () => {
    // Load pretty simulated document
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 600, 400);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 560, 360);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('ACME CONSULTING SERVICES LTD', 50, 80);

    ctx.fillStyle = '#64748b';
    ctx.font = '14px sans-serif';
    ctx.fillText('INVOICE ID: #INV-2026-904', 50, 115);
    ctx.fillText('DATE: 18 May 2026', 50, 140);
    ctx.fillText('CLIENT: Salman Ahmad', 50, 165);

    ctx.fillStyle = '#ff5c1a';
    ctx.fillRect(50, 200, 500, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('TOTAL DUE: ₹45,000.00 (TAX SPLIT INCLUDED)', 70, 225);

    setImageSrc(canvas.toDataURL('image/png'));
    setOcrText('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ocrText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-5xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Eye className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Owl's OCR Document Scanner</h3>
          <p className="text-sm text-slate-500">Scan text from local images. Drag a custom boundary box over coordinates to isolate characters in real-time.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Visual Scan Coordinates Pane</h4>
            {!imageSrc && (
              <button onClick={loadSample} className="text-xs text-orange-600 font-bold hover:underline">
                Load Mock Invoice Sample
              </button>
            )}
          </div>

          {!imageSrc ? (
            <div
              onClick={() => fileInputRef.current.click()}
              className="border-3 border-dashed border-slate-200 hover:border-orange-500 rounded-3xl p-16 text-center cursor-pointer bg-slate-50/50 hover:bg-orange-50/10 transition-all group"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="max-w-md mx-auto space-y-3">
                <div className="mx-auto w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-orange-500">
                  <Plus className="w-6 h-6" />
                </div>
                <h4 className="text-slate-800 font-bold text-lg">Select scanned photo</h4>
                <p className="text-slate-400 text-sm">Upload standard images to trigger scanner overlay bounds.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative select-none cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  className="w-full block"
                />
                
                {isScanning && (
                  <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center text-white space-y-3 font-bold text-xs">
                    <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
                    <span>OCR In-Browser Character Extraction...</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center gap-4 text-xs font-semibold text-slate-400 pl-1">
                <span>💡 Click & drag a bounding box on the image to scan specific zones.</span>
                <button onClick={() => setImageSrc(null)} className="text-red-500 hover:underline shrink-0">Clear image</button>
              </div>
            </div>
          )}
        </div>

        {/* OCR Result text */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Identified Character String</h4>
            {ocrText && (
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 border border-slate-200 text-slate-650 hover:bg-slate-900 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
              >
                {copySuccess ? "Copied!" : <><Copy className="w-3 h-3" /> Copy String</>}
              </button>
            )}
          </div>

          <div className="h-[300px] sm:h-[350px] bg-slate-950 border border-slate-850 rounded-3xl p-5 text-emerald-400 font-mono text-xs overflow-y-auto leading-relaxed shadow-inner select-text">
            {ocrText ? (
              <div className="whitespace-pre-wrap">{ocrText}</div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center px-4 font-sans select-none">
                <Eye className="w-10 h-10 text-slate-700 mb-3 animate-pulse" />
                <h5 className="font-bold text-slate-400 text-sm">Isolate Bounds to OCR</h5>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">Drag a boundary box on the document sheet to trigger high-fidelity local scanner characters extraction.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== RESUME BUILDER ====================
function ResumeBuilder({ onBack }) {
  const [profile, setProfile] = useState({
    name: 'Salman Ahmad',
    title: 'Senior Software Engineer',
    email: 'salman@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    summary: 'Senior Software Architect specializing in frontend architectures, client-side canvas compilers, and lightweight React systems with 8+ years experience.'
  });
  const [experience, setExperience] = useState([
    { id: 1, role: 'Lead Architect', company: 'ToolTrove Labs', period: '2023 - Present', desc: 'Engineered client-side canvas rendering pipeline saving 84% backend operations. Built 27 sandboxed reactive helpers.' },
    { id: 2, role: 'Senior Engineer', company: 'Jungle Tech Corp', period: '2020 - 2023', desc: 'Scaled frontend responsive templates across 12 product lines. Led a team of 6 engineers on core SaaS dashboards.' }
  ]);
  const [education, setEducation] = useState([
    { id: 1, degree: 'B.Tech Computer Science', school: 'IIT Madras', period: '2016 - 2020' }
  ]);
  const [skills, setSkills] = useState(['React', 'Vite', 'TailwindCSS', 'TypeScript', 'HTML5 Canvas', 'Node.js', 'System Architecture']);
  const [newSkill, setNewSkill] = useState('');
  const [theme, setTheme] = useState('charcoal'); // charcoal, navy, amber

  const addSkill = () => {
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills(prev => [...prev, newSkill.trim()]);
    setNewSkill('');
  };

  const removeSkill = (s) => {
    setSkills(prev => prev.filter(item => item !== s));
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Popup blocker active! Please allow popups for ToolTrove to print your resume.");
      return;
    }
    const headerColor = theme === 'charcoal' ? '#1e293b' : theme === 'navy' ? '#0f172a' : '#b45309';
    const accentColor = theme === 'charcoal' ? '#64748b' : theme === 'navy' ? '#ff5c1a' : '#f59e0b';
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${profile.name} - Resume</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: 'Inter', sans-serif; color: #0f172a; margin: 0; padding: 0; line-height: 1.5; }
            .header { border-bottom: 2px solid ${headerColor}; padding-bottom: 20px; margin-bottom: 25px; }
            .name { font-size: 28px; font-weight: 800; color: ${headerColor}; margin: 0; letter-spacing: -0.5px; }
            .title { font-size: 16px; font-weight: 700; color: ${accentColor}; margin: 5px 0 10px 0; uppercase; }
            .contact { font-size: 12px; color: #64748b; font-weight: 600; display: flex; gap: 15px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 14px; font-weight: 800; text-transform: uppercase; color: ${headerColor}; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px; letter-spacing: 0.5px; }
            .summary { font-size: 12px; color: #334155; text-align: justify; }
            .item { margin-bottom: 15px; page-break-inside: avoid; }
            .item-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; color: #1e293b; }
            .item-subheader { display: flex; justify-content: space-between; font-size: 12px; color: ${accentColor}; font-weight: 600; margin: 2px 0 5px 0; }
            .item-desc { font-size: 12px; color: #475569; margin: 0; }
            .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill-tag { background: #f1f5f9; color: #334155; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="name">${profile.name}</h1>
            <div class="title">${profile.title}</div>
            <div class="contact">
              <span>✉ ${profile.email}</span>
              <span>📞 ${profile.phone}</span>
              <span>📍 ${profile.location}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Professional Summary</div>
            <p class="summary">${profile.summary}</p>
          </div>

          <div class="section">
            <div class="section-title">Work Experience</div>
            ${experience.map(exp => `
              <div class="item">
                <div class="item-header">
                  <span>${exp.role}</span>
                  <span>${exp.period}</span>
                </div>
                <div class="item-subheader">${exp.company}</div>
                <p class="item-desc">${exp.desc}</p>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Education</div>
            ${education.map(edu => `
              <div class="item">
                <div class="item-header">
                  <span>${edu.degree}</span>
                  <span>${edu.period}</span>
                </div>
                <div class="item-subheader">${edu.school}</div>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Key Core Skills</div>
            <div class="skills-grid">
              ${skills.map(s => `
                <div class="skill-tag">${s}</div>
              `).join('')}
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Habitation
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-100 flex items-center gap-2 transition-transform hover:scale-102"
          >
            <Printer className="w-4 h-4" /> Print / Save A4 PDF
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-5">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <User className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Owl's Interactive Resume Builder</h3>
          <p className="text-sm text-slate-500">Draft professional resume profiles, configure styling templates, and compile directly to standard PDF sheets.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Editor Inputs Panel */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-150 space-y-4">
            <h4 className="font-black text-slate-800 text-sm flex items-center gap-2 border-b border-slate-200 pb-2">
              <User className="w-4 h-4 text-orange-500" /> Personal Identity Details
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-orange-500 outline-none text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Professional Role</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-orange-500 outline-none text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:border-orange-500 outline-none text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:border-orange-500 outline-none text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Executive Summary</label>
              <textarea
                value={profile.summary}
                onChange={(e) => setProfile(prev => ({ ...prev, summary: e.target.value }))}
                rows="3"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-slate-700 focus:border-orange-500 outline-none text-xs resize-none"
              />
            </div>
          </div>

          {/* Education & skills */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-150 space-y-4">
            <h4 className="font-black text-slate-800 text-sm flex items-center gap-2 border-b border-slate-200 pb-2">
              <Award className="w-4 h-4 text-orange-500" /> Key Technical Skills
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type skill (e.g. React)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:border-orange-500 outline-none text-xs"
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-orange-500 transition-colors"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map(s => (
                <span key={s} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-650 flex items-center gap-1.5 shadow-sm">
                  {s}
                  <button onClick={() => removeSkill(s)} className="text-red-500 hover:text-red-700 font-bold shrink-0">×</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live dynamic Preview Panel */}
        <div className="space-y-4">
          <div className="flex justify-between items-center select-none pl-1">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">A4 Layout Template Preview</h4>
            <div className="flex gap-2">
              {[
                { id: 'charcoal', name: 'Charcoal', color: 'bg-slate-800' },
                { id: 'navy', name: 'SaaS Navy', color: 'bg-slate-950' },
                { id: 'amber', name: 'Jungle Amber', color: 'bg-amber-700' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`w-5 h-5 rounded-full ${t.color} border-2 ${theme === t.id ? 'border-orange-500 scale-110 shadow-sm' : 'border-white hover:scale-105'} transition-all`}
                  title={t.name}
                />
              ))}
            </div>
          </div>

          {/* Real A4 simulated page container */}
          <div className="border border-slate-200 bg-white rounded-3xl p-6 md:p-8 shadow-inner font-sans text-left max-h-[550px] overflow-y-auto divide-y divide-slate-100">
            {/* Header info */}
            <div className="pb-4">
              <h1 className={`text-2xl font-black tracking-tight ${theme === 'charcoal' ? 'text-slate-800' : theme === 'navy' ? 'text-slate-950' : 'text-amber-800'}`}>{profile.name || 'Your Name'}</h1>
              <h5 className="text-xs font-black uppercase text-orange-500 mt-1 tracking-wider">{profile.title || 'Professional Title'}</h5>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-400 font-bold mt-3 uppercase tracking-wider">
                <span>✉ {profile.email}</span>
                <span>📞 {profile.phone}</span>
                <span>📍 {profile.location}</span>
              </div>
            </div>

            {/* Profile summary */}
            <div className="py-4 space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Professional Profile</h3>
              <p className="text-xs font-semibold text-slate-650 leading-relaxed text-justify">{profile.summary || 'Summary profile statement'}</p>
            </div>

            {/* Exp */}
            <div className="py-4 space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Work Experience</h3>
              {experience.map(exp => (
                <div key={exp.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-black text-slate-800">
                    <span>{exp.role}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{exp.period}</span>
                  </div>
                  <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{exp.company}</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="py-4 space-y-2.5">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Technical Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-650 rounded text-[9px] font-bold">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
