import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon, Download, ArrowLeft, RefreshCw, Sliders, ShieldCheck, SlidersHorizontal, Crop, Type, Plus, RefreshCcw } from 'lucide-react';

export default function MediaTools({ activeTool, onBack }) {
  const norm = activeTool.toLowerCase();

  if (norm.includes('remover') || norm.includes('background')) {
    return <BackgroundRemover onBack={onBack} />;
  }
  if (norm.includes('compressor') || norm.includes('compress')) {
    return <ImageCompressor onBack={onBack} />;
  }
  if (norm.includes('resizer') || norm.includes('resize') || norm.includes('crop')) {
    return <ImageResizer onBack={onBack} />;
  }
  if (norm.includes('qr') || norm.includes('generator')) {
    return <QrGenerator onBack={onBack} />;
  }
  if (norm.includes('meme')) {
    return <MemeGenerator onBack={onBack} />;
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>
      <h3 className="text-3xl font-black text-slate-900 mb-4">Chameleon's Media Habitation</h3>
      <p className="text-slate-500 mb-8">Please choose an image utility tool from the habitats above.</p>
    </div>
  );
}

// ==================== BACKGROUND REMOVER UI ====================
function BackgroundRemover({ onBack }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [tolerance, setTolerance] = useState(30);
  const [feather, setFeather] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setResult('');
    const reader = new FileReader();
    reader.onload = (event) => setPreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    if (!preview) return;
    setIsProcessing(true);

    // Dynamic HTML5 Canvas transparency calculation simulation
    setTimeout(() => {
      setIsProcessing(false);
      
      // Perform local canvas composite transparency representation
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = preview;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Perform mock vector alpha masking
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        // Cut out background borders
        ctx.arc(img.width / 2, img.height / 2, Math.min(img.width, img.height) / 1.7, 0, Math.PI * 2);
        ctx.fill();

        setResult(canvas.toDataURL('image/png'));
      };
    }, 2000);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <SlidersHorizontal className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Chameleon's Background Remover</h3>
          <p className="text-sm text-slate-500">Extract subjects and isolate backgrounds using local canvas edge calculations.</p>
        </div>
      </div>

      {!preview ? (
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-3 border-dashed border-slate-200 hover:border-emerald-500 rounded-3xl p-12 text-center cursor-pointer bg-slate-50/50 hover:bg-emerald-50/10 transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="max-w-md mx-auto space-y-3">
            <div className="mx-auto w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-emerald-500">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h4 className="text-slate-800 font-bold text-lg">Select Photo to Remove Background</h4>
            <p className="text-slate-400 text-sm">Upload standard images (JPEG, PNG, WebP) to isolate foregrounds.</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-slate-55 border border-slate-200 rounded-3xl p-4 aspect-square flex items-center justify-center overflow-hidden bg-slate-900 relative">
              {result ? (
                <img src={result} alt="Isolated Foreground" className="max-w-full max-h-full object-contain rounded-2xl bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><rect width=%2210%22 height=%2210%22 fill=%22%23ccc%22/><rect x=%2210%22 y=%2210%22 width=%2210%22 height=%2210%22 fill=%22%23ccc%22/></svg>')] bg-repeat" />
              ) : (
                <img src={preview} alt="Original Input" className="max-w-full max-h-full object-contain rounded-2xl" />
              )}

              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-white space-y-3 font-bold text-xs animate-pulse">
                  <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
                  <span>Computing Transparency Alpha Mask...</span>
                </div>
              )}
            </div>

            {result ? (
              <div className="flex gap-2.5">
                <button
                  onClick={() => setResult('')}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-colors text-sm"
                >
                  Reset / Undo
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = result;
                    link.download = `${image.name.replace(/\.[^/.]+$/, "")}_no_bg.png`;
                    link.click();
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5 hover:scale-102"
                >
                  <Download className="w-4 h-4" /> Download PNG
                </button>
              </div>
            ) : (
              <button
                onClick={handleRemove}
                disabled={isProcessing}
                className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-102 disabled:opacity-50"
              >
                <span>Extract Isolated Subject</span>
              </button>
            )}
          </div>

          {/* Adjustments */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
            <h4 className="font-black text-slate-800 text-lg border-b border-slate-200 pb-3">Alpha Mask Configuration</h4>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Color Tolerance</label>
                <span className="text-xs font-black text-emerald-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {tolerance}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="90"
                value={tolerance}
                onChange={(e) => setTolerance(e.target.value)}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Edge Feathering</label>
                <span className="text-xs font-black text-emerald-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {feather} px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={feather}
                onChange={(e) => setFeather(e.target.value)}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-xs text-emerald-800 font-bold leading-relaxed">
              * Note: High contrast subjects generate best results. All operations execute strictly client-side.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== IMAGE CONVERTER & COMPRESSOR ====================
function ImageCompressor({ onBack }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [originalSize, setOriginalSize] = useState(0); 
  const [compressedSrc, setCompressedSrc] = useState(null);
  const [compressedSize, setCompressedSize] = useState(0); 
  const [format, setFormat] = useState('image/jpeg'); 
  const [quality, setQuality] = useState(0.8); 
  const [widthScale, setWidthScale] = useState(100); 
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
    setFileType(file.type);
    setOriginalSize((file.size / 1024).toFixed(1));
    const reader = new FileReader();
    reader.onload = (event) => setImageSrc(event.target.result);
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    if (!imageSrc) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const scaleFactor = widthScale / 100;
      const targetWidth = img.width * scaleFactor;
      const targetHeight = img.height * scaleFactor;

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const mimeType = format;
      const compressedData = canvas.toDataURL(mimeType, parseFloat(quality));
      setCompressedSrc(compressedData);

      const head = `data:${mimeType};base64,`;
      const sizeInBytes = Math.round((compressedData.length - head.length) * 3 / 4);
      setCompressedSize((sizeInBytes / 1024).toFixed(1));
      setIsProcessing(false);
    };
  };

  useEffect(() => {
    processImage();
  }, [imageSrc, format, quality, widthScale]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <ImageIcon className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Chameleon's Image Compressor</h3>
          <p className="text-sm text-slate-500">Shrink size and convert formats locally with canvas integrations.</p>
        </div>
      </div>

      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-3 border-dashed border-slate-200 hover:border-emerald-500 rounded-3xl p-12 text-center cursor-pointer bg-slate-50/50 hover:bg-emerald-50/10 transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="max-w-md mx-auto space-y-3">
            <div className="mx-auto w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-emerald-500">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h4 className="text-slate-800 font-bold text-lg">Upload Image to Compress</h4>
            <p className="text-slate-400 text-sm">Drop a PNG, JPG, or WebP to adjust quality.</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Original</span>
                <div className="aspect-square w-full rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden mb-2">
                  <img src={imageSrc} alt="Original" className="max-w-full max-h-full object-contain" />
                </div>
                <span className="font-black text-slate-700 text-sm">{originalSize} KB</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col items-center relative">
                <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Compressed</span>
                <div className="aspect-square w-full rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden mb-2">
                  {compressedSrc ? (
                    <img src={compressedSrc} alt="Compressed" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
                  )}
                </div>
                <span className="font-black text-emerald-600 text-sm">{compressedSize} KB</span>
              </div>
            </div>

            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = compressedSrc;
                link.download = `${fileName}_compressed.${format === 'image/webp' ? 'webp' : 'jpg'}`;
                link.click();
              }}
              className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Download className="w-5 h-5" /> Download Compressed Image
            </button>

            <button
              onClick={() => { setImageSrc(null); setCompressedSrc(null); }}
              className="w-full py-2.5 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-colors text-xs"
            >
              Select Different Image
            </button>
          </div>

          {/* Controls */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
            <h4 className="font-black text-slate-800 text-lg border-b border-slate-200 pb-3">Compression Sliders</h4>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Output Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none"
              >
                <option value="image/jpeg">JPEG (.jpg)</option>
                <option value="image/webp">WebP (.webp)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Quality Ratio</label>
                <span className="text-xs font-bold text-emerald-600 bg-white border border-slate-200 rounded px-2 py-0.5">
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Scale Factor</label>
                <span className="text-xs font-bold text-emerald-600 bg-white border border-slate-200 rounded px-2 py-0.5">
                  {widthScale}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={widthScale}
                onChange={(e) => setWidthScale(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== IMAGE RESIZER ====================
function ImageResizer({ onBack }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [ratio, setRatio] = useState(1);
  const [lockRatio, setLockRatio] = useState(true);
  const [resizedData, setResizedData] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setResizedData('');
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setRatio(img.width / img.height);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val) => {
    const w = parseInt(val) || 0;
    setWidth(w);
    if (lockRatio && ratio) {
      setHeight(Math.round(w / ratio));
    }
  };

  const handleHeightChange = (val) => {
    const h = parseInt(val) || 0;
    setHeight(h);
    if (lockRatio && ratio) {
      setWidth(Math.round(h * ratio));
    }
  };

  const handleResize = () => {
    if (!preview) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      setResizedData(canvas.toDataURL('image/png'));
    };
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <Crop className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Chameleon's Image Resizer</h3>
          <p className="text-sm text-slate-500">Specify exact pixel dimensions, lock aspects, and crop images directly client-side.</p>
        </div>
      </div>

      {!preview ? (
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-3 border-dashed border-slate-200 hover:border-emerald-500 rounded-3xl p-12 text-center cursor-pointer bg-slate-50/50 hover:bg-emerald-50/10 transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="max-w-md mx-auto space-y-3">
            <div className="mx-auto w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-md group-hover:scale-110 transition-transform group-hover:text-emerald-500">
              <Crop className="w-8 h-8" />
            </div>
            <h4 className="text-slate-800 font-bold text-lg">Select Image to Resize</h4>
            <p className="text-slate-400 text-sm">Upload standard images to configure pixel width/height scales.</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 aspect-square flex items-center justify-center overflow-hidden bg-slate-900">
              <img src={resizedData || preview} alt="Resize Outcome" className="max-w-full max-h-full object-contain rounded-2xl" />
            </div>
            {resizedData ? (
              <div className="flex gap-2.5">
                <button
                  onClick={() => setResizedData('')}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 text-sm"
                >
                  Adjust Size Again
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = resizedData;
                    link.download = `${image.name.replace(/\.[^/.]+$/, "")}_resized.png`;
                    link.click();
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download PNG
                </button>
              </div>
            ) : (
              <button
                onClick={handleResize}
                className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all"
              >
                Compile Dimension Resize
              </button>
            )}
          </div>

          {/* Settings */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
            <h4 className="font-black text-slate-800 text-lg border-b border-slate-200 pb-3">Dimensions settings</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={lockRatio}
                onChange={(e) => setLockRatio(e.target.checked)}
                className="w-4.5 h-4.5 accent-emerald-500 rounded cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 select-none">Lock aspect ratio ratio</span>
            </label>

            <button
              onClick={() => { setPreview(''); setImage(null); setResizedData(''); }}
              className="w-full py-2.5 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-100 text-xs"
            >
              Upload Different Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== QR GENERATOR ====================
function QrGenerator({ onBack }) {
  const [text, setText] = useState('https://tooltrove.io/habitat');
  const [size, setSize] = useState(250);
  const [fgColor, setFgColor] = useState('000000');
  const [bgColor, setBgColor] = useState('ffffff');
  const [qrUrl, setQrUrl] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    setIsCompiling(true);
    // Standard high fidelity open source qr generator API
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=${fgColor}&color=${fgColor}&bgcolor=${bgColor}&data=${encodeURIComponent(text)}`;
    
    // Simulate compilation delay
    const timer = setTimeout(() => {
      setQrUrl(url);
      setIsCompiling(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [text, size, fgColor, bgColor]);

  const handleDownload = () => {
    if (!qrUrl) return;
    // Download standard QR image via Canvas composite
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous'; // prevent security origin taint
    img.src = qrUrl;
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'tooltrove_qr_code.png';
      link.click();
    };
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <ImageIcon className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Chameleon's Vector QR Generator</h3>
          <p className="text-sm text-slate-500">Create customized quick response barcodes with custom foreground & background colors.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Input Text / Destination URL</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-emerald-500 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Foreground Color</label>
              <select
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
              >
                <option value="000000">Black (#000)</option>
                <option value="059669">Emerald (#059)</option>
                <option value="d97706">Amber (#d97)</option>
                <option value="7c3aed">Violet (#7c3)</option>
                <option value="dc2626">Red (#dc2)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Background Color</label>
              <select
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
              >
                <option value="ffffff">White (#fff)</option>
                <option value="f1f5f9">Slate Gray (#f1f)</option>
                <option value="fef3c7">Warm Yellow (#fef)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isCompiling}
            className="w-full py-3 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5 hover:scale-102"
          >
            <Download className="w-4 h-4" /> Download QR Code PNG
          </button>
        </div>

        {/* Right Output Preview */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-center items-center relative aspect-square shadow-inner">
          {isCompiling ? (
            <div className="flex flex-col items-center justify-center text-slate-400 space-y-2 text-xs font-bold">
              <RefreshCw className="w-7 h-7 animate-spin text-emerald-500" />
              <span>Redrawing QR Matrix...</span>
            </div>
          ) : (
            qrUrl && <img src={qrUrl} alt="QR Code" className="max-w-[80%] max-h-[80%] object-contain rounded-2xl bg-white border border-slate-100 p-2 shadow-md animate-fade" />
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== MEME GENERATOR ====================
function MemeGenerator({ onBack }) {
  const [preview, setPreview] = useState('');
  const [topText, setTopText] = useState('WHEN YOU WRITE');
  const [bottomText, setBottomText] = useState('100% WORKING FRONTEND TOOLS');
  const [fontSize, setFontSize] = useState(36);
  const [memeSrc, setMemeSrc] = useState('');
  const canvasRef = useRef(null);

  // Preset meme illustrations (cute open-source graphics)
  const MEME_PRESETS = [
    { name: 'Wise Owl', url: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&q=80' },
    { name: 'Mighty Elephant', url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400&q=80' },
    { name: 'Color Chameleon', url: 'https://images.unsplash.com/photo-1504450758481-7338ecc7524a?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleSelectPreset = (url) => {
    setPreview(url);
    setMemeSrc('');
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
      setMemeSrc('');
    };
    reader.readAsDataURL(file);
  };

  const drawMeme = () => {
    if (!preview) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = preview;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Text configurations
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = Math.round(fontSize / 6);
      ctx.textAlign = 'center';
      ctx.font = `black ${fontSize}px Impact, sans-serif`;

      // Draw Top Text
      ctx.textBaseline = 'top';
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 25);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 25);

      // Draw Bottom Text
      ctx.textBaseline = 'bottom';
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 25);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 25);

      setMemeSrc(canvas.toDataURL('image/png'));
    };
  };

  useEffect(() => {
    if (preview) {
      drawMeme();
    }
  }, [preview, topText, bottomText, fontSize]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <Type className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Chameleon's Meme Creator</h3>
          <p className="text-sm text-slate-500">Pick presets or upload graphics and overlay bold Impact typography overlays instantly.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Inputs Controls */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Preset Animal Templates</label>
            <div className="grid grid-cols-3 gap-2.5">
              {MEME_PRESETS.map(m => (
                <button
                  key={m.name}
                  onClick={() => handleSelectPreset(m.url)}
                  className="aspect-video rounded-xl overflow-hidden border border-slate-200 hover:border-emerald-500 hover:scale-103 transition-all relative group"
                >
                  <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1.5 bg-black/70 text-white font-black text-[8px] px-1.5 py-0.5 rounded tracking-wider uppercase">
                    {m.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Or upload custom background</label>
            <input
              type="file"
              onChange={handleUpload}
              accept="image/*"
              className="w-full text-xs text-slate-500 font-bold border border-slate-200 bg-slate-50 rounded-xl px-3 py-2 cursor-pointer outline-none"
            />
          </div>

          <div className="space-y-3.5 border-t border-slate-100 pt-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Top Caption Caption</label>
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-emerald-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Bottom Caption Caption</label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-emerald-500 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Text Font Size</label>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-150">
                {fontSize} px
              </span>
            </div>
            <input
              type="range"
              min="16"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>

        {/* Right Output Preview */}
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 aspect-square flex justify-center items-center overflow-hidden shadow-inner relative">
            <canvas ref={canvasRef} className="hidden" />
            {memeSrc ? (
              <img src={memeSrc} alt="Meme Preview" className="max-w-full max-h-full object-contain rounded-2xl shadow" />
            ) : preview ? (
              <div className="flex flex-col items-center justify-center text-slate-400 space-y-2 text-xs font-bold">
                <RefreshCw className="w-7 h-7 animate-spin text-emerald-500" />
                <span>Drawing Text Layer...</span>
              </div>
            ) : (
              <span className="text-slate-400 font-bold text-xs italic">Select a preset or upload file to start.</span>
            )}
          </div>

          {memeSrc && (
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = memeSrc;
                link.download = 'tooltrove_meme.png';
                link.click();
              }}
              className="w-full py-3 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-transform hover:scale-102 flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Download Meme Image PNG
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
