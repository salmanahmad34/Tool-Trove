import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  ImageIcon, Download, ArrowLeft, RefreshCw, Sliders, ShieldCheck, 
  SlidersHorizontal, Crop, Type, Plus, RefreshCcw, Share2, Copy, 
  Expand, FileImage, Sparkles, Wand2
} from 'lucide-react';

export default function MediaTools({ activeTool, onBack }) {
  const norm = activeTool.toLowerCase();

  if (norm.includes('remover') || norm.includes('background')) {
    return <BackgroundRemover onBack={onBack} />;
  }
  if (norm.includes('compressor') || norm.includes('compress')) {
    return <ImageCompressor onBack={onBack} />;
  }
  if (norm.includes('resizer') || norm.includes('resize')) {
    return <ImageResizer onBack={onBack} />;
  }
  if (norm.includes('qr') || norm.includes('generator')) {
    return <QrGenerator onBack={onBack} />;
  }
  if (norm.includes('meme')) {
    return <MemeGenerator onBack={onBack} />;
  }
  if (norm.includes('converter') || norm.includes('format')) {
    return <FormatConverter onBack={onBack} />;
  }
  if (norm.includes('cropper')) {
    return <ImageCropper onBack={onBack} />;
  }
  if (norm.includes('upscaler') || norm.includes('upscale')) {
    return <AiUpscaler onBack={onBack} />;
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

// ==================== BEFORE / AFTER INTERACTIVE SLIDER ====================
// ==================== DYNAMIC MEDIA PIPE LOADING SINGLETON ====================
let selfieSegmentationInstance = null;
const loadMediaPipe = () => {
  return new Promise((resolve, reject) => {
    if (window.SelfieSegmentation) {
      resolve(window.SelfieSegmentation);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/selfie_segmentation.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (window.SelfieSegmentation) {
        resolve(window.SelfieSegmentation);
      } else {
        reject(new Error('SelfieSegmentation not found on window'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load MediaPipe Selfie Segmentation library.'));
    document.head.appendChild(script);
  });
};

const getSelfieSegmentation = async () => {
  if (selfieSegmentationInstance) return selfieSegmentationInstance;
  const SelfieSegmentationClass = await loadMediaPipe();
  const instance = new SelfieSegmentationClass({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
  });
  selfieSegmentationInstance = instance;
  return instance;
};

const segmentImage = (imgElement, modelSelection = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      const model = await getSelfieSegmentation();
      model.setOptions({ modelSelection });
      model.onResults((results) => {
        resolve(results);
      });
      await model.send({ image: imgElement });
    } catch (err) {
      reject(err);
    }
  });
};

// ==================== BEFORE / AFTER INTERACTIVE SLIDER ====================
function BeforeAfterSlider({ original, processed }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseDown={(e) => { e.preventDefault(); isDragging.current = true; handleMove(e.clientX); }}
      onTouchStart={(e) => { isDragging.current = true; if (e.touches[0]) handleMove(e.touches[0].clientX); }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full aspect-square border border-slate-200 rounded-3xl overflow-hidden cursor-ew-resize bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><rect width=%2210%22 height=%2210%22 fill=%22%23f8fafc%22/><rect x=%2210%22 y=%2210%22 width=%2210%22 height=%2210%22 fill=%22%23f8fafc%22/><rect x=%2210%22 width=%2210%22 height=%2210%22 fill=%22%23ffffff%22/><rect y=%2210%22 width=%2210%22 height=%2210%22 fill=%22%23ffffff%22/></svg>')] bg-repeat select-none shadow-inner flex items-center justify-center"
    >
      {/* Processed (Background) */}
      <img src={processed} alt="Processed" className="absolute inset-0 w-full h-full object-contain pointer-events-none p-1 z-10" />

      {/* Original (Clipped Foreground) */}
      <img 
        src={original} 
        alt="Original" 
        className="absolute inset-0 w-full h-full object-contain pointer-events-none p-1 z-20"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      />

      {/* Handle Divider Line */}
      <div 
        className="absolute inset-y-0 w-0.5 bg-emerald-550 pointer-events-none z-30"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border border-emerald-500 shadow-xl flex items-center justify-center font-black text-white text-[10px] scale-110">
          ↔
        </div>
      </div>
    </div>
  );
}

// ==================== BACKGROUND REMOVER UI ====================
function BackgroundRemover({ onBack }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [feather, setFeather] = useState(4);
  const [bgMode, setBgMode] = useState('transparent');
  const [customBgColor, setCustomBgColor] = useState('#3b82f6');
  const [blurStrength, setBlurStrength] = useState(15);
  const [modelSelection, setModelSelection] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');
  const [result, setResult] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);
  const cachedMaskCanvasRef = useRef(null);
  const originalImgRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
    if (!file) return;
    setImage(file);
    setResult('');
    cachedMaskCanvasRef.current = null;
    originalImgRef.current = null;
    const reader = new FileReader();
    reader.onload = (event) => setPreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e);
  };

  const applyMaskAndBg = () => {
    const originalImg = originalImgRef.current;
    const cachedMask = cachedMaskCanvasRef.current;
    if (!originalImg || !cachedMask) return;

    const w = originalImg.naturalWidth || originalImg.width;
    const h = originalImg.naturalHeight || originalImg.height;

    // 1. Create a canvas for isolated subject
    const subjectCanvas = document.createElement('canvas');
    subjectCanvas.width = w;
    subjectCanvas.height = h;
    const subjectCtx = subjectCanvas.getContext('2d');

    // 2. Draw feathered mask onto temporary mask canvas
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = w;
    maskCanvas.height = h;
    const maskCtx = maskCanvas.getContext('2d');
    
    if (feather > 0) {
      maskCtx.filter = `blur(${feather}px)`;
    }
    maskCtx.drawImage(cachedMask, 0, 0, w, h);
    maskCtx.filter = 'none';

    // 3. Draw subject using source-in globalCompositeOperation
    subjectCtx.drawImage(maskCanvas, 0, 0);
    subjectCtx.globalCompositeOperation = 'source-in';
    subjectCtx.drawImage(originalImg, 0, 0);
    subjectCtx.globalCompositeOperation = 'source-over';

    // 4. Create final canvas applying the selected background mode
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = w;
    finalCanvas.height = h;
    const finalCtx = finalCanvas.getContext('2d');

    if (bgMode === 'transparent') {
      finalCtx.drawImage(subjectCanvas, 0, 0);
    } else if (bgMode === 'white') {
      finalCtx.fillStyle = '#ffffff';
      finalCtx.fillRect(0, 0, w, h);
      finalCtx.drawImage(subjectCanvas, 0, 0);
    } else if (bgMode === 'color') {
      finalCtx.fillStyle = customBgColor;
      finalCtx.fillRect(0, 0, w, h);
      finalCtx.drawImage(subjectCanvas, 0, 0);
    } else if (bgMode === 'blur') {
      finalCtx.save();
      if (blurStrength > 0) {
        finalCtx.filter = `blur(${blurStrength}px)`;
      }
      finalCtx.drawImage(originalImg, -10, -10, w + 20, h + 20);
      finalCtx.restore();
      finalCtx.drawImage(subjectCanvas, 0, 0);
    }

    setResult(finalCanvas.toDataURL('image/png'));
  };

  const handleRemove = async () => {
    if (!preview) return;
    setIsProcessing(true);
    setProcessStep('1. Loading AI segmentation library...');

    try {
      setProcessStep('2. Downloading WebAssembly engines...');
      await loadMediaPipe();

      setProcessStep('3. Scanning original features...');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = preview;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      originalImgRef.current = img;

      // Downscale input image for AI segmentation model only (keeps low-end mobile running smoothly)
      const maxDimension = 720;
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      
      let processWidth = w;
      let processHeight = h;
      
      if (w > maxDimension || h > maxDimension) {
        if (w > h) {
          processWidth = maxDimension;
          processHeight = Math.round((h / w) * maxDimension);
        } else {
          processHeight = maxDimension;
          processWidth = Math.round((w / h) * maxDimension);
        }
      }

      const processCanvas = document.createElement('canvas');
      processCanvas.width = processWidth;
      processCanvas.height = processHeight;
      const processCtx = processCanvas.getContext('2d');
      processCtx.drawImage(img, 0, 0, processWidth, processHeight);

      setProcessStep('4. Executing client-side AI pass...');
      const results = await segmentImage(processCanvas, modelSelection);

      setProcessStep('5. Merging high-resolution layers...');
      const cachedMaskCanvas = document.createElement('canvas');
      cachedMaskCanvas.width = processWidth;
      cachedMaskCanvas.height = processHeight;
      const cachedMaskCtx = cachedMaskCanvas.getContext('2d');
      
      cachedMaskCtx.drawImage(results.segmentationMask, 0, 0, processWidth, processHeight);
      cachedMaskCanvasRef.current = cachedMaskCanvas;

      applyMaskAndBg();
      setIsProcessing(false);
    } catch (err) {
      console.error(err);
      alert(`Client-side AI Failed to load or execute: ${err.message}. Ensure internet connection is active to fetch public model weights.`);
      setIsProcessing(false);
    }
  };

  // Re-run composition dynamically without repeating AI segmentations
  useEffect(() => {
    if (cachedMaskCanvasRef.current && originalImgRef.current) {
      applyMaskAndBg();
    }
  }, [feather, bgMode, customBgColor, blurStrength]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <Wand2 className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Chameleon's Professional AI Background Remover</h3>
          <p className="text-sm text-slate-500">Isolate human subjects, clear backdrops, and replace environments 100% locally with client-side MediaPipe Selfie Segmentation.</p>
        </div>
      </div>

      {!preview ? (
        <div
          onClick={() => fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-3 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all group ${
            isDragOver 
              ? 'border-emerald-500 bg-emerald-50/20 scale-102' 
              : 'border-slate-200 bg-slate-50/50 hover:border-emerald-500 hover:bg-emerald-50/10'
          }`}
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
            <h4 className="text-slate-800 font-bold text-lg">Drag & Drop or click to upload photo</h4>
            <p className="text-slate-400 text-sm">Supports PNG, JPEG, WebP. Processes entirely on your machine for 100% privacy.</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-3xl overflow-hidden relative shadow-inner">
              {result ? (
                <BeforeAfterSlider original={preview} processed={result} />
              ) : (
                <div className="aspect-square flex items-center justify-center p-4">
                  <img src={preview} alt="Original Input" className="max-w-full max-h-full object-contain rounded-2xl" />
                </div>
              )}

              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center space-y-4 z-40">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="font-black text-sm text-emerald-400 uppercase tracking-widest">AI Segmenter Engine Active</h5>
                    <p className="text-xs text-slate-400 font-semibold">{processStep}</p>
                  </div>
                </div>
              )}
            </div>

            {result ? (
              <div className="flex gap-2.5">
                <button
                  onClick={() => { setResult(''); cachedMaskCanvasRef.current = null; }}
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
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-emerald-100 transition-all flex items-center justify-center gap-1.5 hover:scale-102"
                >
                  <Download className="w-4 h-4" /> Save PNG
                </button>
              </div>
            ) : (
              <button
                onClick={handleRemove}
                disabled={isProcessing}
                className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-102 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Remove Background</span>
              </button>
            )}
          </div>

          {/* Adjustments */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
            <h4 className="font-black text-slate-800 text-lg border-b border-slate-200 pb-3">AI Layer Tuning Config</h4>

            {/* Model Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">AI Segmenter Sensitivity</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setModelSelection(1)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    modelSelection === 1 
                      ? 'bg-emerald-550 text-white border-emerald-550 shadow-md shadow-emerald-100' 
                      : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Ultra Fast (Mobile)
                </button>
                <button
                  onClick={() => setModelSelection(0)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    modelSelection === 0 
                      ? 'bg-emerald-550 text-white border-emerald-550 shadow-md shadow-emerald-100' 
                      : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Full Detail (HD)
                </button>
              </div>
            </div>

            {/* Background Mode Options */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Background Fill Style</label>
              <div className="grid grid-cols-2 gap-2">
                {['transparent', 'white', 'color', 'blur'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setBgMode(mode)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border capitalize transition-all ${
                      bgMode === mode 
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Adjustments */}
            {bgMode === 'color' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Custom Backdrop Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customBgColor}
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="w-10 h-10 p-1 bg-white border border-slate-250 rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customBgColor}
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-250 rounded-xl text-xs font-mono font-bold uppercase outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {bgMode === 'blur' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Backdrop Blur Strength</label>
                  <span className="text-xs font-black text-emerald-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                    {blurStrength} px
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={blurStrength}
                  onChange={(e) => setBlurStrength(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            )}

            {/* Edge Feathering */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Border Edge Feathering</label>
                <span className="text-xs font-black text-emerald-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {feather} px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={feather}
                onChange={(e) => setFeather(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {result && (
              <div className="text-[10px] text-slate-400 pl-1 font-bold leading-relaxed border-t border-slate-100 pt-3">
                💡 TIP: Slider handles are fully touch and drag supported. Adjust parameters dynamically in real-time.
              </div>
            )}
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
const loadQrCodeLib = () => Promise.resolve(QRCode);

function QrGenerator({ onBack }) {
  const [text, setText] = useState('https://salmanahmad34.github.io/Tool-Trove');
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [dotStyle, setDotStyle] = useState('square'); // 'square' | 'round'
  const [logoSrc, setLogoSrc] = useState('');
  const [logoSizePercent, setLogoSizePercent] = useState(18);
  const [logoBorderRadius, setLogoBorderRadius] = useState(8);
  const [margin, setMargin] = useState(4);
  const [scannerOverlay, setScannerOverlay] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const logoImageRef = useRef(null);

  // Dynamic Contrast calculation
  const getContrastRatio = (hex1, hex2) => {
    const getLuminance = (hex) => {
      const clean = hex.replace('#', '');
      let r = parseInt(clean.substring(0, 2), 16) || 0;
      let g = parseInt(clean.substring(2, 4), 16) || 0;
      let b = parseInt(clean.substring(4, 6), 16) || 0;
      
      const linearize = (val) => {
        let v = val / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      };
      
      return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
    };

    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  const contrastRatio = getContrastRatio(fgColor, bgColor);

  // AI URL Analyzer
  const getURLAnalysis = (val) => {
    if (!val || val.trim() === '') return { type: 'empty', name: 'Raw QR String', info: 'Waiting for text/link...' };
    if (!val.startsWith('http')) return { type: 'text', name: 'Plain Text QR', info: '💡 Input is treated as static text.' };
    try {
      const parsed = new URL(val);
      let domain = parsed.hostname.replace('www.', '');
      let path = parsed.pathname;
      let domainName = domain.split('.')[0];
      let capitalized = domainName.charAt(0).toUpperCase() + domainName.slice(1);
      
      let subName = '';
      if (path && path !== '/') {
        let parts = path.split('/').filter(Boolean);
        if (parts.length > 0) {
          subName = ' - ' + parts[parts.length - 1].split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      }
      
      return {
        type: 'url',
        secure: val.startsWith('https://'),
        name: `${capitalized}${subName}`,
        info: val.startsWith('https://') 
          ? '✨ Secure HTTPS URL detected. Search ranking friendly!' 
          : '⚠️ Non-secure HTTP URL detected. Browsers may warn users.'
      };
    } catch (e) {
      return { type: 'invalid', name: 'Raw String QR', info: '💡 Unrecognized URL layout.' };
    }
  };

  const urlAnalysis = getURLAnalysis(text);

  // Redraw QR canvas
  const compileQR = async (renderSize = 500) => {
    if (!canvasRef.current) return;
    setIsCompiling(true);
    try {
      const qrcode = await loadQrCodeLib();
      const qrInstance = qrcode.create(text, { errorCorrectionLevel: 'H' });
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = renderSize;
      canvas.height = renderSize;

      // Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, renderSize, renderSize);

      const modules = qrInstance.modules;
      const moduleCount = modules.size;
      const rawGridSize = moduleCount + margin * 2;
      const cellSize = renderSize / rawGridSize;
      const offset = margin * cellSize;

      // Logo cell radius calculations
      const hasLogo = !!logoSrc;
      const logoCellRadius = Math.ceil((moduleCount * (logoSizePercent / 100)) / 2);
      const centerCell = Math.floor(moduleCount / 2);

      const isInsideLogoArea = (row, col) => {
        if (!hasLogo) return false;
        return (
          row >= centerCell - logoCellRadius &&
          row <= centerCell + logoCellRadius &&
          col >= centerCell - logoCellRadius &&
          col <= centerCell + logoCellRadius
        );
      };

      ctx.fillStyle = fgColor;

      for (let r = 0; r < moduleCount; r++) {
        for (let c = 0; c < moduleCount; c++) {
          if (modules.get(r, c)) {
            if (isInsideLogoArea(r, c)) continue;

            const x = offset + c * cellSize;
            const y = offset + r * cellSize;

            // Keep the three corner finders square for maximum scan reliability
            const isFinder = 
              (r < 7 && c < 7) || 
              (r < 7 && c >= moduleCount - 7) || 
              (r >= moduleCount - 7 && c < 7);

            if (isFinder || dotStyle === 'square') {
              ctx.fillRect(x, y, cellSize + 0.4, cellSize + 0.4);
            } else {
              ctx.beginPath();
              ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2 * 0.9, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw Center Logo
      if (hasLogo && logoImageRef.current) {
        const logoSize = renderSize * (logoSizePercent / 100);
        const lx = (renderSize - logoSize) / 2;
        const ly = (renderSize - logoSize) / 2;

        // Draw protective background pad under logo
        ctx.fillStyle = bgColor;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(lx - 4, ly - 4, logoSize + 8, logoSize + 8, logoBorderRadius + 2);
        } else {
          ctx.rect(lx - 4, ly - 4, logoSize + 8, logoSize + 8);
        }
        ctx.fill();

        // Draw logo image
        ctx.save();
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(lx, ly, logoSize, logoSize, logoBorderRadius);
        } else {
          ctx.rect(lx, ly, logoSize, logoSize);
        }
        ctx.clip();
        ctx.drawImage(logoImageRef.current, lx, ly, logoSize, logoSize);
        ctx.restore();
      }

    } catch (err) {
      console.error(err);
    } finally {
      setIsCompiling(false);
    }
  };

  useEffect(() => {
    compileQR();
  }, [text, fgColor, bgColor, dotStyle, logoSrc, logoSizePercent, logoBorderRadius, margin]);

  // AI color safety suggestions
  const getAISmartSuggestions = () => {
    if (contrastRatio < 3.0) {
      return {
        style: "bg-rose-50 border-rose-200 text-rose-800",
        message: `🚨 DANGEROUSLY LOW CONTRAST (${contrastRatio.toFixed(1)}:1)! Foreground and background are too similar. Scanners will fail completely. Suggestion: Instantly click our 'Minimalist' preset below to ensure 100% scannability.`
      };
    }
    if (contrastRatio < 5.0) {
      return {
        style: "bg-amber-50 border-amber-200 text-amber-800",
        message: `⚠️ LOW CONTRAST WARNING (${contrastRatio.toFixed(1)}:1)! Scanning may lag or fail entirely on older Android cameras. We highly recommend using a darker foreground color.`
      };
    }
    return {
      style: "bg-emerald-50 border-emerald-200 text-emerald-800",
      message: `✨ AI CONTRAST PASSED (${contrastRatio.toFixed(1)}:1)! Superb readability detected. Enforced quiet zones are active. Scans instantly on WhatsApp, Google Lens, iOS, and Android.`
    };
  };

  const aiFeedback = getAISmartSuggestions();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset themes
  const applyPresetTheme = (theme) => {
    switch (theme) {
      case 'minimal':
        setFgColor('#09090b');
        setBgColor('#ffffff');
        break;
      case 'cyberpunk':
        setFgColor('#00f2fe');
        setBgColor('#0f172a');
        break;
      case 'neon-pulse':
        setFgColor('#ff007f');
        setBgColor('#020617');
        break;
      case 'navy-gold':
        setFgColor('#1e3a8a');
        setBgColor('#f8fafc');
        break;
      case 'forest':
        setFgColor('#047857');
        setBgColor('#ecfdf5');
        break;
      default:
        break;
    }
  };

  // Downloads
  const triggerDownload = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
  };

  const handleDownloadPNG = async () => {
    const prevCanvas = canvasRef.current;
    if (!prevCanvas) return;
    const dataUrl = prevCanvas.toDataURL('image/png');
    triggerDownload(dataUrl, `tooltrove_qr_${urlAnalysis.name.toLowerCase().replace(/\s+/g, '_')}.png`);
  };

  const handleDownloadSVG = async () => {
    try {
      const qrcode = await loadQrCodeLib();
      const qrInstance = qrcode.create(text, { errorCorrectionLevel: 'H' });
      const modules = qrInstance.modules;
      const moduleCount = modules.size;
      const rawGridSize = moduleCount + margin * 2;
      const size = 500;
      const cellSize = size / rawGridSize;
      const offset = margin * cellSize;

      const hasLogo = !!logoSrc;
      const logoCellRadius = Math.ceil((moduleCount * (logoSizePercent / 100)) / 2);
      const centerCell = Math.floor(moduleCount / 2);

      const isInsideLogoArea = (row, col) => {
        if (!hasLogo) return false;
        return (
          row >= centerCell - logoCellRadius &&
          row <= centerCell + logoCellRadius &&
          col >= centerCell - logoCellRadius &&
          col <= centerCell + logoCellRadius
        );
      };

      let paths = [];
      for (let r = 0; r < moduleCount; r++) {
        for (let c = 0; c < moduleCount; c++) {
          if (modules.get(r, c)) {
            if (isInsideLogoArea(r, c)) continue;
            const x = offset + c * cellSize;
            const y = offset + r * cellSize;

            const isFinder = 
              (r < 7 && c < 7) || 
              (r < 7 && c >= moduleCount - 7) || 
              (r >= moduleCount - 7 && c < 7);

            if (isFinder || dotStyle === 'square') {
              paths.push(`<rect x="${x}" y="${y}" width="${cellSize + 0.1}" height="${cellSize + 0.1}" fill="${fgColor}"/>`);
            } else {
              paths.push(`<circle cx="${x + cellSize / 2}" cy="${y + cellSize / 2}" r="${cellSize / 2 * 0.9}" fill="${fgColor}"/>`);
            }
          }
        }
      }

      let logoElement = '';
      if (hasLogo && logoSrc) {
        const logoSize = size * (logoSizePercent / 100);
        const lx = (size - logoSize) / 2;
        const ly = (size - logoSize) / 2;
        logoElement = `
          <rect x="${lx - 4}" y="${ly - 4}" width="${logoSize + 8}" height="${logoSize + 8}" fill="${bgColor}" rx="6"/>
          <image href="${logoSrc}" x="${lx}" y="${ly}" width="${logoSize}" height="${logoSize}" />
        `;
      }

      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        ${paths.join('\n')}
        ${logoElement}
      </svg>`;

      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      triggerDownload(URL.createObjectURL(blob), `tooltrove_qr_${urlAnalysis.name.toLowerCase().replace(/\s+/g, '_')}.svg`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadPDF = () => {
    if (!canvasRef.current) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code - ToolTrove</title>
          <style>
            body {
              margin: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
              background: #f8fafc;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 24px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.05);
              text-align: center;
              border: 1px solid #e2e8f0;
              max-width: 450px;
            }
            img {
              max-width: 320px;
              border: 1px solid #f1f5f9;
              padding: 16px;
              border-radius: 16px;
              background: white;
            }
            h1 {
              font-size: 24px;
              margin: 20px 0 8px 0;
              color: #0f172a;
              font-weight: 800;
            }
            p {
              color: #64748b;
              font-size: 14px;
              margin: 0;
              word-break: break-all;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${canvasRef.current.toDataURL('image/png')}" />
            <h1>${urlAnalysis.name}</h1>
            <p>Scan target: ${text}</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QR Target: ${urlAnalysis.name}`,
          text: 'Scan this Dynamic QR Code constructed via ToolTrove:',
          url: text
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) {
        console.log(err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-5xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      {/* Hidden image element to pre-render uploaded logo safely */}
      {logoSrc && (
        <img
          src={logoSrc}
          alt="Hidden Logo"
          ref={logoImageRef}
          onLoad={() => compileQR()}
          className="hidden"
        />
      )}

      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <Sparkles className="w-7 h-7 animate-pulse" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Chameleon's AI-Enhanced Vector QR Stylist</h3>
          <p className="text-sm text-slate-500">Auto-contrast checkers, design helpers, customizable quiet zones, and vector-svg logo overlays completely in-browser.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Parameters (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* AI Safety Checker Status Banner */}
          <div className={`p-4 rounded-2xl border text-xs font-bold leading-relaxed shadow-sm transition-colors ${aiFeedback.style}`}>
            {aiFeedback.message}
          </div>

          {/* Core Settings */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase">Input Text / Destination URL</label>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-black uppercase">
                  {urlAnalysis.name}
                </span>
              </div>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-emerald-500 outline-none text-sm shadow-inner"
              />
              <p className="text-[10px] text-slate-400 font-bold mt-1.5 pl-1">
                {urlAnalysis.info}
              </p>
            </div>

            {/* Custom Presets Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">AI Design Assistant Preset Themes</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'minimal', label: 'Minimalist' },
                  { id: 'cyberpunk', label: 'Cyberpunk' },
                  { id: 'neon-pulse', label: 'Neon' },
                  { id: 'navy-gold', label: 'Business' },
                  { id: 'forest', label: 'Forest' }
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPresetTheme(preset.id)}
                    className="px-2 py-1.5 border border-slate-200 bg-white rounded-xl text-[10px] font-black text-slate-700 hover:border-emerald-500 transition-all hover:bg-slate-50 hover:scale-102"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dot Customizer & Colors */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Dot Drawing Shape</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDotStyle('square')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      dotStyle === 'square' 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                        : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Standard Square
                  </button>
                  <button
                    onClick={() => setDotStyle('round')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      dotStyle === 'round' 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                        : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Smooth Round
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Foreground</label>
                  <div className="flex items-center gap-1.5 border border-slate-200 bg-white px-2 py-1 rounded-xl">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-none p-0"
                    />
                    <span className="text-[10px] font-mono font-bold uppercase">{fgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Background</label>
                  <div className="flex items-center gap-1.5 border border-slate-200 bg-white px-2 py-1 rounded-xl">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-none p-0"
                    />
                    <span className="text-[10px] font-mono font-bold uppercase">{bgColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Margins */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Quiet Zone Margins (Enforced Padding)</label>
                <span className="text-xs font-black text-emerald-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  {margin} cells
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>

          {/* Logo Overlays Embedder */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
            <h4 className="font-black text-slate-800 text-sm border-b border-slate-200 pb-2 flex items-center gap-1.5">
              <span>🛡️ Center Logo Overlays (High Scan Safety)</span>
            </h4>
            
            <div className="grid sm:grid-cols-2 gap-4 items-center">
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="w-full py-2.5 bg-white border border-slate-250 hover:border-emerald-500 rounded-xl text-xs font-bold text-slate-650 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {logoSrc ? 'Replace Brand Logo' : 'Upload Center Logo'}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {logoSrc && (
                <button
                  onClick={() => { setLogoSrc(''); compileQR(); }}
                  className="w-full py-2.5 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-bold transition-colors"
                >
                  Clear Brand Logo
                </button>
              )}
            </div>

            {logoSrc && (
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200/50">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Logo Size</label>
                    <span className="text-[10px] font-black text-slate-700">{logoSizePercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="22"
                    value={logoSizePercent}
                    onChange={(e) => setLogoSizePercent(parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Logo Border Radius</label>
                    <span className="text-[10px] font-black text-slate-700">{logoBorderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="16"
                    value={logoBorderRadius}
                    onChange={(e) => setLogoBorderRadius(parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Preview & Download (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Visual Arena */}
          <div className="bg-slate-900 border border-slate-950 rounded-3xl p-8 flex flex-col justify-center items-center relative aspect-square shadow-2xl overflow-hidden group">
            
            {/* Live Canvas */}
            <canvas 
              ref={canvasRef} 
              className="max-w-[85%] max-h-[85%] object-contain rounded-2xl bg-white border-4 border-slate-800 p-2 shadow-2xl transition-transform animate-fade-in group-hover:scale-102"
            />

            {/* Pulsing Scan view overlay */}
            {scannerOverlay && (
              <div className="absolute inset-0 bg-slate-950/20 pointer-events-none flex items-center justify-center animate-fade-in">
                {/* Viewfinder borders */}
                <div className="w-[80%] h-[80%] border-2 border-emerald-500/60 rounded-3xl relative">
                  {/* Flashing scan beam */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent top-0 animate-scan-bounce"></div>
                  
                  {/* Neon dots in corners */}
                  <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-4 border-l-4 border-emerald-400"></div>
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-4 border-r-4 border-emerald-400"></div>
                  <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-4 border-l-4 border-emerald-400"></div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-4 border-r-4 border-emerald-400"></div>

                  {/* Camera REC indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-slate-950/80 px-2 py-0.5 rounded-full text-[8px] font-black text-white tracking-wider">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
                    <span>REC VIEW</span>
                  </div>
                </div>
              </div>
            )}

            {/* Test Scan Toggle */}
            <button
              onClick={() => setScannerOverlay(!scannerOverlay)}
              className={`absolute bottom-3 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all shadow-md ${
                scannerOverlay 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-white text-slate-850 hover:bg-slate-100'
              }`}
            >
              {scannerOverlay ? 'Disable Scan View' : '🔬 Overlay Scanner Test'}
            </button>

            {isCompiling && (
              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center text-emerald-400 space-y-2 text-xs font-bold">
                <RefreshCw className="w-8 h-8 animate-spin" />
                <span>AI Rendering Matrix...</span>
              </div>
            )}
          </div>

          {/* Quick Actions Swapping */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyLink}
              className="py-2.5 border border-slate-200 text-slate-650 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copySuccess ? 'Copied URL!' : 'Copy Link'}</span>
            </button>
            <button
              onClick={handleShare}
              className="py-2.5 border border-slate-200 text-slate-650 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareSuccess ? 'Shared!' : 'Share QR Target'}</span>
            </button>
          </div>

          {/* Multi-Format Exports */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Retina High-Res Exports</label>
            <button
              onClick={handleDownloadPNG}
              className="w-full py-3 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-1.5 hover:scale-102"
            >
              <Download className="w-4 h-4" /> Download Crisp PNG
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadSVG}
                className="py-2.5 border border-slate-250 text-slate-700 bg-white hover:bg-slate-50 font-bold rounded-2xl transition-all flex items-center justify-center gap-1 text-xs"
              >
                <FileImage className="w-3.5 h-3.5 text-emerald-500" /> Export Scalable SVG
              </button>
              <button
                onClick={handleDownloadPDF}
                className="py-2.5 border border-slate-250 text-slate-700 bg-white hover:bg-slate-50 font-bold rounded-2xl transition-all flex items-center justify-center gap-1 text-xs"
              >
                <Download className="w-3.5 h-3.5 text-orange-500" /> Print A4 PDF Template
              </button>
            </div>
          </div>
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

// ==================== FORMAT CONVERTER ====================
function FormatConverter({ onBack }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [targetFormat, setTargetFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.85);
  const [convertedData, setConvertedData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setConvertedData('');
    const reader = new FileReader();
    reader.onload = (event) => setPreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    if (!preview) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = preview;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        setConvertedData(canvas.toDataURL(targetFormat, quality));
      };
    }, 1200);
  };

  const getFormatLabel = (mime) => {
    if (mime === 'image/jpeg') return 'JPEG';
    if (mime === 'image/png') return 'PNG';
    if (mime === 'image/webp') return 'WebP';
    return 'BMP';
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <RefreshCcw className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Chameleon's Format Converter</h3>
          <p className="text-sm text-slate-500">Transform image files between PNG, JPEG, WebP, and BMP instantly on the frontend.</p>
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
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="text-slate-800 font-bold text-lg">Select Image to Transpile</h4>
            <p className="text-slate-400 text-sm">Upload standard image graphic layers to translate encoders.</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-4 relative shadow-inner">
              <img src={convertedData || preview} alt="Transpiled Output" className="max-w-full max-h-full object-contain rounded-2xl" />
              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-white space-y-3 font-bold text-xs">
                  <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
                  <span>Converting Image Encoders...</span>
                </div>
              )}
            </div>

            {convertedData ? (
              <div className="flex gap-2.5">
                <button
                  onClick={() => setConvertedData('')}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 text-sm"
                >
                  Adjust Format
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = convertedData;
                    const ext = targetFormat.split('/')[1];
                    link.download = `${image.name.replace(/\.[^/.]+$/, "")}.${ext}`;
                    link.click();
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download {getFormatLabel(targetFormat)}
                </button>
              </div>
            ) : (
              <button
                onClick={handleConvert}
                className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all"
              >
                Execute Format Transpilation
              </button>
            )}
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
            <h4 className="font-black text-slate-800 text-lg border-b border-slate-200 pb-3">Encoder Settings</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Target Mime Type</label>
                <select
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-emerald-500 outline-none"
                >
                  <option value="image/jpeg">JPEG (.jpg)</option>
                  <option value="image/png">PNG (.png)</option>
                  <option value="image/webp">WebP (.webp)</option>
                  <option value="image/bmp">Windows BMP (.bmp)</option>
                </select>
              </div>

              {targetFormat !== 'image/png' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Export Encoder Quality</label>
                    <span className="text-xs font-black text-emerald-600 bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {Math.round(quality * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => { setPreview(''); setImage(null); setConvertedData(''); }}
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

// ==================== IMAGE CROPPER ====================
function ImageCropper({ onBack }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [cropRect, setCropRect] = useState({ x: 50, y: 50, w: 180, h: 180 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [croppedData, setCroppedData] = useState('');
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setCroppedData('');
    setCropRect({ x: 50, y: 50, w: 180, h: 180 });
    const reader = new FileReader();
    reader.onload = (event) => setPreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= cropRect.x && x <= cropRect.x + cropRect.w && y >= cropRect.y && y <= cropRect.y + cropRect.h) {
      setIsDragging(true);
      setDragOffset({ x: x - cropRect.x, y: y - cropRect.y });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let nx = x - dragOffset.x;
    let ny = y - dragOffset.y;

    nx = Math.max(0, Math.min(rect.width - cropRect.w, nx));
    ny = Math.max(0, Math.min(rect.height - cropRect.h, ny));

    setCropRect(prev => ({ ...prev, x: nx, y: ny }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const executeCrop = () => {
    if (!preview || !containerRef.current) return;
    const img = new Image();
    img.src = preview;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const containerRect = containerRef.current.getBoundingClientRect();
      const scaleX = img.width / containerRect.width;
      const scaleY = img.height / containerRect.height;

      const rx = cropRect.x * scaleX;
      const ry = cropRect.y * scaleY;
      const rw = cropRect.w * scaleX;
      const rh = cropRect.h * scaleY;

      canvas.width = rw;
      canvas.height = rh;
      ctx.drawImage(img, rx, ry, rw, rh, 0, 0, rw, rh);
      setCroppedData(canvas.toDataURL('image/png'));
    };
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <Crop className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Chameleon's Image Cropper</h3>
          <p className="text-sm text-slate-500">Drag high-precision crop bounding rectangles and trim graphic elements locally.</p>
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
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="text-slate-800 font-bold text-lg">Select Image to Crop</h4>
            <p className="text-slate-400 text-sm">Upload standard images to trigger local cropper masks.</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            {croppedData ? (
              <div className="bg-slate-900 rounded-3xl aspect-square flex items-center justify-center p-4 shadow-inner">
                <img src={croppedData} alt="Cropped Output" className="max-w-full max-h-full object-contain rounded-2xl" />
              </div>
            ) : (
              <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseDown={handleMouseDown}
                className="bg-slate-900 rounded-3xl aspect-square flex items-center justify-center p-4 relative overflow-hidden shadow-inner select-none cursor-move"
              >
                <img src={preview} alt="Crop Input" className="max-w-full max-h-full object-contain rounded-2xl pointer-events-none" />
                
                {/* Crop boundary overlay */}
                <div 
                  className="absolute border border-emerald-500 bg-emerald-500/10 shadow-lg pointer-events-none"
                  style={{
                    left: `${cropRect.x}px`,
                    top: `${cropRect.y}px`,
                    width: `${cropRect.w}px`,
                    height: `${cropRect.h}px`
                  }}
                >
                  <div className="absolute top-1 left-2 bg-slate-950/80 text-white rounded px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider">
                    Crop Area
                  </div>
                  {/* Corner marks */}
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-600" />
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-600" />
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-600" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-600" />
                </div>
              </div>
            )}

            {croppedData ? (
              <div className="flex gap-2.5">
                <button
                  onClick={() => setCroppedData('')}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 text-sm"
                >
                  Recrop Image
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = croppedData;
                    link.download = `${image.name.replace(/\.[^/.]+$/, "")}_crop.png`;
                    link.click();
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download Crop
                </button>
              </div>
            ) : (
              <button
                onClick={executeCrop}
                className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all"
              >
                Execute Local Crop
              </button>
            )}
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
            <h4 className="font-black text-slate-800 text-lg border-b border-slate-200 pb-3">Dimensions settings</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Crop Width (px)</label>
                <input
                  type="number"
                  value={cropRect.w}
                  onChange={(e) => setCropRect(prev => ({ ...prev, w: Math.max(50, parseInt(e.target.value) || 50) }))}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Crop Height (px)</label>
                <input
                  type="number"
                  value={cropRect.h}
                  onChange={(e) => setCropRect(prev => ({ ...prev, h: Math.max(50, parseInt(e.target.value) || 50) }))}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="text-xs text-slate-400 pl-1 font-semibold leading-relaxed">
              💡 Click and drag the highlighted box overlay to isolate custom regions in real-time.
            </div>

            <button
              onClick={() => { setPreview(''); setImage(null); setCroppedData(''); }}
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

// ==================== AI UPSCALER ====================
function AiUpscaler({ onBack }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [upscaledData, setUpscaledData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setUpscaledData('');
    const reader = new FileReader();
    reader.onload = (event) => setPreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleUpscale = () => {
    if (!preview) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = preview;
      img.onload = () => {
        canvas.width = img.width * 2;
        canvas.height = img.height * 2;
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Apply a real 3x3 sharpening convolution matrix filter for HD detailing
        const w = canvas.width;
        const h = canvas.height;
        const temp = new Uint8ClampedArray(data);

        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            for (let c = 0; c < 3; c++) {
              const idx = (y * w + x) * 4 + c;
              
              const val = 5 * temp[idx]
                - temp[((y - 1) * w + x) * 4 + c]
                - temp[((y + 1) * w + x) * 4 + c]
                - temp[(y * w + (x - 1)) * 4 + c]
                - temp[(y * w + (x + 1)) * 4 + c];

              data[idx] = Math.max(0, Math.min(255, val));
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setUpscaledData(canvas.toDataURL('image/jpeg', 0.95));
      };
    }, 2200);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
          <Sparkles className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Chameleon's AI HD Upscaler</h3>
          <p className="text-sm text-slate-500">Double pixel dimensions and isolate details using browser-based convolution matrix interpolation filters.</p>
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
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-slate-800 font-bold text-lg">Select Low-Res Photo</h4>
            <p className="text-slate-400 text-sm">Upload standard images to enhance resolution details.</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-4 relative shadow-inner">
              <img src={upscaledData || preview} alt="Enhanced Output" className="max-w-full max-h-full object-contain rounded-2xl" />
              
              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-white space-y-3 font-bold text-xs animate-pulse">
                  <RefreshCw className="w-8 h-8 animate-spin text-emerald-450" />
                  <span>Computing High-Definition Interpolations...</span>
                </div>
              )}
            </div>

            {upscaledData ? (
              <div className="flex gap-2.5">
                <button
                  onClick={() => setUpscaledData('')}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 text-sm"
                >
                  Upscale Another
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = upscaledData;
                    link.download = `${image.name.replace(/\.[^/.]+$/, "")}_2x_hd.jpg`;
                    link.click();
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Save HD 2x JPEG
                </button>
              </div>
            ) : (
              <button
                onClick={handleUpscale}
                className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-all"
              >
                Enhance Resolution 2x
              </button>
            )}
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
            <h4 className="font-black text-slate-800 text-lg border-b border-slate-200 pb-3">Detailing stats</h4>
            
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-150 p-4 rounded-2xl text-emerald-800 text-xs font-semibold leading-relaxed space-y-2">
                <div className="font-black flex items-center gap-1.5 text-emerald-900">
                  <Wand2 className="w-4 h-4 shrink-0" /> Local 3x3 Convolution Engaged
                </div>
                <p>This upscaler maps raw pixel coordinates to double size grids while applying a matrix high-pass convolution kernel to prevent interpolation blurs.</p>
              </div>

              {image && (
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-slate-500">
                    <span>Original Resolution</span>
                    <span className="text-slate-800">Reading Image metadata...</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-500">
                    <span>Upscaled Target</span>
                    <span className="text-emerald-600">200% HD Matrix</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => { setPreview(''); setImage(null); setUpscaledData(''); }}
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

