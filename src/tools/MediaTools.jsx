import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon, Download, ArrowLeft, RefreshCw, Sliders, ShieldCheck } from 'lucide-react';

export default function MediaTools({ activeTool, onBack }) {
  if (activeTool === 'Format Converter' || activeTool === 'Compressor' || activeTool === 'Crop & Resize' || activeTool === 'AI Enhancer') {
    return <ImageConverterAndCompressor onBack={onBack} />;
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitat
      </button>
      <h3 className="text-3xl font-black text-slate-900 mb-4">Chameleon's Media Habitation</h3>
      <p className="text-slate-500 mb-8">Please choose a tool from the categories above or select one directly.</p>
    </div>
  );
}

// ==================== IMAGE CONVERTER & COMPRESSOR ====================
function ImageConverterAndCompressor({ onBack }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [originalSize, setOriginalSize] = useState(0); // in KB
  const [compressedSrc, setCompressedSrc] = useState(null);
  const [compressedSize, setCompressedSize] = useState(0); // in KB
  
  // Settings
  const [format, setFormat] = useState('image/jpeg'); // target format
  const [quality, setQuality] = useState(0.8); // compression quality (0.1 to 1.0)
  const [widthScale, setWidthScale] = useState(100); // % scale
  
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
    setFileType(file.type);
    setOriginalSize((file.size / 1024).toFixed(1));

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!imageSrc) return;
    processImage();
  }, [imageSrc, format, quality, widthScale]);

  const processImage = () => {
    setIsProcessing(true);
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Scale calculations
      const scaleFactor = widthScale / 100;
      const targetWidth = img.width * scaleFactor;
      const targetHeight = img.height * scaleFactor;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw image onto canvas
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Compress and convert
      const mimeType = format;
      const compressedData = canvas.toDataURL(mimeType, parseFloat(quality));
      
      setCompressedSrc(compressedData);

      // Estimate compressed size from base64 string length
      const head = `data:${mimeType};base64,`;
      const sizeInBytes = Math.round((compressedData.length - head.length) * 3 / 4);
      setCompressedSize((sizeInBytes / 1024).toFixed(1));
      
      setIsProcessing(false);
    };
  };

  const getExtension = (mime) => {
    if (mime === 'image/jpeg') return 'jpg';
    if (mime === 'image/webp') return 'webp';
    return 'png';
  };

  const triggerDownload = () => {
    if (!compressedSrc) return;
    const link = document.createElement('a');
    link.href = compressedSrc;
    link.download = `${fileName}-compressed.${getExtension(format)}`;
    link.click();
  };

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
          <h3 className="text-2xl font-black text-slate-900">Chameleon's Format Converter & Compressor</h3>
          <p className="text-sm text-slate-500">Transform image extensions, scale size, and compress quality inside your browser.</p>
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
            <h4 className="text-slate-800 font-bold text-lg">Upload an image file to convert</h4>
            <p className="text-slate-400 text-sm">Drop a PNG, JPG, WebP, SVG, or AVIF image to instantly compress.</p>
            <div className="pt-2 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 bg-white border border-slate-150 rounded-xl px-4 py-2 w-max mx-auto shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% secure client-side canvas compression
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left panel: Image Previews */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Original Size</span>
                <div className="aspect-square w-full rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden mb-2">
                  <img src={imageSrc} alt="Original" className="max-w-full max-h-full object-contain" />
                </div>
                <span className="font-black text-slate-700 text-sm">{originalSize} KB</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col items-center relative">
                <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Target Compression</span>
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

            {/* Savings stats card */}
            {compressedSize > 0 && parseFloat(compressedSize) < parseFloat(originalSize) && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between text-xs text-emerald-800 font-bold">
                <span>Total space saved:</span>
                <span className="bg-emerald-500 text-white rounded-lg px-2.5 py-1">
                  -{Math.round((1 - compressedSize / originalSize) * 100)}% Small
                </span>
              </div>
            )}
            
            <button
              onClick={triggerDownload}
              disabled={isProcessing}
              className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-100 transition-all hover:scale-102"
            >
              <Download className="w-5 h-5" /> Download Converted File
            </button>

            <button
              onClick={() => { setImageSrc(null); setCompressedSrc(null); }}
              className="w-full py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-2xl hover:bg-slate-50 transition-colors text-sm"
            >
              Upload Different Image
            </button>
          </div>

          {/* Right panel: Custom Settings controls */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
            <h4 className="font-black text-slate-800 text-lg flex items-center gap-2 border-b border-slate-200 pb-3">
              <Sliders className="w-5 h-5 text-emerald-600" /> Transformation Controls
            </h4>

            {/* Format selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Target Format extension</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-emerald-500"
              >
                <option value="image/jpeg">JPEG (.jpg)</option>
                <option value="image/png">PNG (.png)</option>
                <option value="image/webp">WebP (.webp)</option>
              </select>
            </div>

            {/* Quality slider */}
            {format !== 'image/png' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Quality (Compression Ratio)</label>
                  <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded px-2 py-0.5">
                    {Math.round(quality * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-bold pt-1">
                  <span>Small / Compressed</span>
                  <span>Perfect / Lossless</span>
                </div>
              </div>
            )}

            {/* Width/Scale slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Scale Dimensions</label>
                <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded px-2 py-0.5">
                  {widthScale}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={widthScale}
                onChange={(e) => setWidthScale(e.target.value)}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-bold pt-1">
                <span>10% Tiny Size</span>
                <span>Original Scale</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 flex gap-2.5 items-start text-slate-500 text-xs leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>
                <strong>Privacy Policy:</strong> As a wildlife Chameleon, we never upload files to any server. Canvas conversion operates 100% locally on your computer inside sandboxed JS context.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
