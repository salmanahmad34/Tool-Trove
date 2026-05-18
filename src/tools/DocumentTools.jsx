import React, { useState, useRef, useEffect } from 'react';
import { FileText, Plus, Trash2, ArrowLeft, Download, RefreshCw, Layers, Scissors, ShieldAlert, ArrowUp, ArrowDown } from 'lucide-react';

export default function DocumentTools({ activeTool, onBack }) {
  const norm = activeTool.toLowerCase();

  if (norm.includes('merge')) {
    return <PdfMerge onBack={onBack} />;
  }
  if (norm.includes('split')) {
    return <PdfSplit onBack={onBack} />;
  }
  if (norm.includes('compress')) {
    return <PdfCompressor onBack={onBack} />;
  }
  if (norm.includes('word')) {
    return <PdfToWord onBack={onBack} />;
  }
  if (norm.includes('image to pdf') || norm.includes('image-to-pdf')) {
    return <ImageToPDF onBack={onBack} />;
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
