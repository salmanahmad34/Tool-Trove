import React, { useState, useEffect, useRef } from 'react';
import { Braces, Binary, Search, Code, Key, ArrowLeft, Copy, CheckCircle, AlertCircle, RefreshCw, Trash2, ArrowUpDown, Palette, Eye, FileCode } from 'lucide-react';

export default function DeveloperTools({ activeTool, onBack }) {
  const norm = activeTool.toLowerCase();
  
  if (norm.includes('json')) {
    return <JsonFormatter onBack={onBack} />;
  }
  if (norm.includes('base64')) {
    return <Base64Tool onBack={onBack} />;
  }
  if (norm.includes('regex')) {
    return <RegexTester onBack={onBack} />;
  }
  if (norm.includes('minifier') || norm.includes('minify')) {
    return <CodeMinifier onBack={onBack} />;
  }
  if (norm.includes('uuid')) {
    return <UuidGenerator onBack={onBack} />;
  }
  if (norm.includes('color') || norm.includes('picker')) {
    return <ColorPicker onBack={onBack} />;
  }
  if (norm.includes('beautify') || norm.includes('beautifier')) {
    return <CodeBeautifier onBack={onBack} />;
  }
  if (norm.includes('markdown') || norm.includes('previewer')) {
    return <MarkdownPreviewer onBack={onBack} />;
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>
      <h3 className="text-3xl font-black text-slate-900 mb-4">Clever Fox's Developer Tools</h3>
      <p className="text-slate-500 mb-8">Select a dedicated developer tool from the habitats above.</p>
    </div>
  );
}

// ==================== JSON FORMATTER ====================
function JsonFormatter({ onBack }) {
  const [input, setInput] = useState('{"name":"ToolTrove","version":"2026.05","status":"active","features":["Fast","Secure","Client-Side"],"mascots":{"owl":"Wise","elephant":"Mighty","chameleon":"Adaptable","lion":"Secure","fox":"Clever"}}');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    setError('');
    try {
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, parseInt(indent)));
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const handleMinify = () => {
    setError('');
    try {
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (input.trim()) {
      handleFormat();
    }
  }, [indent]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-5xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Braces className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Clever Fox JSON Formatter</h3>
          <p className="text-sm text-slate-500">Format, validate, beautify, and compress JSON payloads instantly client-side.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Raw JSON Input</span>
            <button onClick={handleClear} className="text-xs text-slate-400 hover:text-red-500 font-bold flex items-center gap-1">
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste raw JSON here (e.g. {"a":1,"b":2} )'
            className="w-full h-96 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs focus:border-orange-500 focus:bg-white outline-none resize-none shadow-inner"
          />
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Indentation:</span>
              <select
                value={indent}
                onChange={(e) => setIndent(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
              >
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
                <option value="8">8 Spaces</option>
              </select>
            </div>
            <button
              onClick={handleFormat}
              className="px-5 py-2.5 bg-orange-500 text-white text-xs font-black rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all hover:scale-102 flex-1"
            >
              Beautify / Format
            </button>
            <button
              onClick={handleMinify}
              className="px-5 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 transition-colors flex-1"
            >
              Minify / Compact
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-2.5 text-xs text-red-700 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Formatted Output</span>
            {output && (
              <button
                onClick={handleCopy}
                className="px-3 py-1 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-900 hover:text-white text-xs font-bold transition-all flex items-center gap-1"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Formatted output will appear here..."
            className="w-full h-96 p-4 bg-slate-950 text-slate-200 border border-slate-800 rounded-2xl font-mono text-xs outline-none resize-none shadow-inner"
          />
          {output && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl text-[11px] text-emerald-800 font-bold flex items-center justify-between">
              <span>Valid JSON Syntax</span>
              <span className="bg-emerald-500 text-white rounded-md px-2 py-0.5 text-[9px] uppercase tracking-wider">Pass</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== BASE64 ENCODER/DECODER ====================
function Base64Tool({ onBack }) {
  const [input, setInput] = useState('ToolTrove Clever Fox Sandbox 2026!');
  const [output, setOutput] = useState('');
  const [isEncode, setIsEncode] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const processText = () => {
    setError('');
    try {
      if (!input) {
        setOutput('');
        return;
      }
      if (isEncode) {
        // Safe UTF-8 Base64 Encoding
        const utf8Bytes = new TextEncoder().encode(input);
        const binString = Array.from(utf8Bytes, (byte) => String.fromCharCode(byte)).join('');
        setOutput(btoa(binString));
      } else {
        // Safe UTF-8 Base64 Decoding
        const binString = atob(input.trim());
        const utf8Bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
        setOutput(new TextDecoder().decode(utf8Bytes));
      }
    } catch (err) {
      setError(`Failed to perform Base64 conversion: ${err.message}. Make sure your decode string is formatted properly.`);
      setOutput('');
    }
  };

  useEffect(() => {
    processText();
  }, [input, isEncode]);

  const handleSwap = () => {
    if (output) {
      setInput(output);
      setIsEncode(!isEncode);
    } else {
      setIsEncode(!isEncode);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Binary className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Clever Fox Base64 Encoder / Decoder</h3>
          <p className="text-sm text-slate-500">Securely convert standard text string into Base64 binaries and vice versa natively.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Toggle controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex gap-2">
            <button
              onClick={() => setIsEncode(true)}
              className={`px-6 py-2 rounded-xl font-bold text-xs transition-all ${isEncode ? 'bg-orange-500 text-white shadow-md shadow-orange-100' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Encode Text
            </button>
            <button
              onClick={() => setIsEncode(false)}
              className={`px-6 py-2 rounded-xl font-bold text-xs transition-all ${!isEncode ? 'bg-orange-500 text-white shadow-md shadow-orange-100' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Decode Base64
            </button>
          </div>

          <button
            onClick={handleSwap}
            className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" /> Swap IO
          </button>
        </div>

        {/* Inputs Arena */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isEncode ? 'Plain text source string' : 'Base64 string target'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEncode ? "Type plain text here..." : "Paste Base64 code here..."}
              className="w-full h-56 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm focus:border-orange-500 focus:bg-white outline-none resize-none shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Outcome Result</label>
              {output && (
                <button
                  onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="px-2.5 py-0.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-900 hover:text-white text-[10px] font-bold transition-all flex items-center gap-1"
                >
                  {copied ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Conversion results appear here..."
              className="w-full h-56 p-4 bg-slate-950 text-slate-200 border border-slate-800 rounded-2xl font-mono text-sm outline-none resize-none shadow-inner"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-2.5 text-xs text-red-700 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== REGEX TESTER ====================
function RegexTester({ onBack }) {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Hello! Contact developer@tooltrove.io or sales-desk@trove-corp.co.in to test our regex engine. Also support query@jungle.com!');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const performMatch = () => {
    setError('');
    setMatches([]);
    if (!pattern) return;

    try {
      const regex = new RegExp(pattern, flags);
      const matched = [];
      let match;
      
      if (flags.includes('g')) {
        // Reset last index
        regex.lastIndex = 0;
        while ((match = regex.exec(text)) !== null) {
          matched.push({
            text: match[0],
            index: match.index,
            length: match[0].length
          });
          // Prevent infinite loop on empty matches
          if (match[0].length === 0) regex.lastIndex++;
        }
      } else {
        match = regex.exec(text);
        if (match) {
          matched.push({
            text: match[0],
            index: match.index,
            length: match[0].length
          });
        }
      }
      setMatches(matched);
    } catch (err) {
      setError(`Invalid Regular Expression: ${err.message}`);
    }
  };

  useEffect(() => {
    performMatch();
  }, [pattern, flags, text]);

  // Generate visual highlighted preview using JSX markers safely
  const renderHighlightedText = () => {
    if (matches.length === 0 || error) {
      return text;
    }

    let elements = [];
    let lastIndex = 0;

    matches.forEach((m, idx) => {
      // Add text before match
      if (m.index > lastIndex) {
        elements.push(text.substring(lastIndex, m.index));
      }
      // Add highlighted match
      elements.push(
        <mark key={idx} className="bg-yellow-300 text-slate-900 rounded px-0.5 font-bold border border-yellow-400/40">
          {m.text}
        </mark>
      );
      lastIndex = m.index + m.length;
    });

    // Add trailing text
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements;
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Search className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Clever Fox Regex Regular Expression Tester</h3>
          <p className="text-sm text-slate-500">Test regular expressions patterns, flags, and examine matching groups in real-time.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Regex Settings Inputs */}
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">RegExp Pattern</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-orange-500 focus-within:bg-white shadow-inner font-mono text-sm">
              <span className="text-slate-400 pr-1.5 font-bold">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="[a-z]+"
                className="w-full bg-transparent border-none outline-none font-bold text-slate-800"
              />
              <span className="text-slate-400 pl-1.5 font-bold">/</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Flags</label>
            <select
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:border-orange-500"
            >
              <option value="g">Global (g)</option>
              <option value="gi">Global, Case-Insensitive (gi)</option>
              <option value="i">Case-Insensitive (i)</option>
              <option value="m">Multi-Line (m)</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-2.5 text-xs text-red-700 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Test Text Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Test Text Content</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs focus:border-orange-500 focus:bg-white outline-none resize-none shadow-inner"
            />
          </div>

          {/* Matches Highlight Arena */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visual Highlights</label>
              <span className="px-2.5 py-0.5 bg-orange-100 text-orange-700 rounded-lg text-[10px] font-black uppercase tracking-wider">
                {matches.length} Match{matches.length !== 1 ? 'es' : ''}
              </span>
            </div>
            <div className="w-full h-64 p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-xs text-slate-200 overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner border-box">
              {renderHighlightedText()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== CODE MINIFIER ====================
function CodeMinifier({ onBack }) {
  const [input, setInput] = useState(`/* Cool JavaScript function comment */\nfunction calculateJungleDensity(speciesCount, areaSquareKm) {\n  const multiplier = 42;\n  console.log("Starting analysis...");\n  let density = (speciesCount * multiplier) / areaSquareKm;\n  return density;\n}`);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    // High fidelity minifier using custom regex
    let minified = input;

    // 1. Remove comments
    minified = minified.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');

    // 2. Remove extra spaces & linebreaks
    minified = minified.replace(/\s+/g, ' ');
    minified = minified.replace(/\s*([\{\}\(\)\=\+\-\*\/;\,])\s*/g, '$1');

    setOutput(minified.trim());
  };

  useEffect(() => {
    handleMinify();
  }, [input]);

  const originalCharCount = input.length;
  const minifiedCharCount = output.length;
  const reduction = originalCharCount > 0 
    ? Math.max(0, Math.round((1 - minifiedCharCount / originalCharCount) * 100)) 
    : 0;

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Code className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Clever Fox Code Minifier</h3>
          <p className="text-sm text-slate-500">Compress JavaScript, CSS, or HTML structures instantly. Saves bandwidth by dropping redundant bytes.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Source Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Raw source code</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste JavaScript / CSS / HTML code here..."
              className="w-full h-72 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs focus:border-orange-500 focus:bg-white outline-none resize-none shadow-inner"
            />
          </div>

          {/* Compressed Output */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Minified Result</label>
              {output && (
                <button
                  onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="px-2.5 py-0.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-900 hover:text-white text-[10px] font-bold transition-all flex items-center gap-1"
                >
                  {copied ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Minified outcome results appear here..."
              className="w-full h-72 p-4 bg-slate-950 text-slate-200 border border-slate-800 rounded-2xl font-mono text-xs outline-none resize-none shadow-inner"
            />
          </div>
        </div>

        {/* Compression Statistics Card */}
        {output && originalCharCount > 0 && (
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Original Size</span>
              <span className="text-lg font-black text-slate-800">{originalCharCount} Bytes</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Compressed Size</span>
              <span className="text-lg font-black text-slate-800">{minifiedCharCount} Bytes</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase text-emerald-600">Savings</span>
              <span className="bg-emerald-500 text-white font-black rounded-lg px-2.5 py-0.5 text-xs inline-block mt-1">
                -{reduction}% Small
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== UUID GENERATOR ====================
function UuidGenerator({ onBack }) {
  const [quantity, setQuantity] = useState(10);
  const [uuids, setUuids] = useState([]);
  const [copied, setCopied] = useState(false);

  const generateUuids = () => {
    const list = [];
    const count = parseInt(quantity) || 10;
    
    for (let i = 0; i < count; i++) {
      // RFC4122 v4 generator
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      list.push(uuid);
    }
    setUuids(list);
  };

  useEffect(() => {
    generateUuids();
  }, [quantity]);

  const handleCopyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Key className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Clever Fox UUID Generator</h3>
          <p className="text-sm text-slate-500">Bulk generate secure RFC4122 Version-4 UUIDs instantly in your local browser sandbox.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Sliders Quantity Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-slate-700 uppercase">Quantity to Generate</label>
            <span className="px-3 py-1 bg-orange-50 border border-orange-200 text-orange-600 font-black rounded-xl text-xs">
              {quantity} UUIDs
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
            <span>1 UUID</span>
            <span>25 UUIDs</span>
            <span>50 UUIDs</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={generateUuids}
            className="px-5 py-3 border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Regenerate
          </button>
          <button
            onClick={handleCopyAll}
            className="flex-1 py-3 bg-slate-900 hover:bg-orange-500 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-orange-100 flex items-center justify-center gap-2 hover:scale-102"
          >
            {copied ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? 'All Copied!' : 'Copy All UUIDs'}</span>
          </button>
        </div>

        {/* UUID List Screen */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-3xl h-64 overflow-y-auto shadow-inner text-slate-300 font-mono text-sm leading-relaxed">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex justify-between items-center py-1 border-b border-slate-900 last:border-0 hover:text-white">
              <span>{uuid}</span>
              <span className="text-[10px] font-black text-slate-500">#{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== COLOR PICKER ====================
function ColorPicker({ onBack }) {
  const [color, setColor] = useState('#ff6b00');
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(135);
  const [colorStop2, setColorStop2] = useState('#0f172a');
  const [history, setHistory] = useState(['#ff6b00', '#0f172a', '#10b981', '#3b82f6']);
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex) => {
    let r = (parseInt(hex.slice(1, 3), 16) || 0) / 255;
    let g = (parseInt(hex.slice(3, 5), 16) || 0) / 255;
    let b = (parseInt(hex.slice(5, 7), 16) || 0) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleSaveToHistory = () => {
    if (!history.includes(color)) {
      setHistory(prev => [color, ...prev.slice(0, 11)]);
    }
  };

  const copyString = (str) => {
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const gradientCode = `${gradientType}-gradient(${angle}deg, ${color}, ${colorStop2})`;

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Palette className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Clever Fox Custom Color Picker & Gradient Creator</h3>
          <p className="text-sm text-slate-500">Pick color parameters, read hex-rgb-hsl values, and compile custom gradients client-side.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Inputs Controls */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
            <h4 className="font-black text-slate-800 text-base">Select Color Tone</h4>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-16 p-1 bg-white border border-slate-200 rounded-2xl cursor-pointer"
              />
              <div className="space-y-1.5 flex-1">
                <label className="block text-xs font-bold text-slate-550 uppercase">Hex Value</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-mono text-sm font-bold uppercase text-slate-800 outline-none focus:border-orange-550"
                />
              </div>
            </div>
            <button
              onClick={handleSaveToHistory}
              className="w-full py-2 bg-slate-900 hover:bg-orange-550 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Log Color Swatch
            </button>
          </div>

          {/* Color Values Output Cards */}
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-slate-50 border border-slate-150 p-3 rounded-2xl">
              <span className="text-xs font-black text-slate-500 uppercase">RGB Format</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-800 font-bold">{hexToRgb(color)}</span>
                <button onClick={() => copyString(hexToRgb(color))} className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-500">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center bg-slate-50 border border-slate-150 p-3 rounded-2xl">
              <span className="text-xs font-black text-slate-500 uppercase">HSL Format</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-800 font-bold">{hexToHsl(color)}</span>
                <button onClick={() => copyString(hexToHsl(color))} className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-500">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Color swatches history */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Color History Logs</span>
            <div className="flex flex-wrap gap-2">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => setColor(h)}
                  className="w-8 h-8 rounded-lg border border-slate-200 shadow-sm transition-transform hover:scale-110"
                  style={{ backgroundColor: h }}
                  title={h}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Preview / Gradient Builder */}
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4">
            <h4 className="font-black text-slate-800 text-base">Linear Gradient Generator</h4>
            <div
              className="w-full h-44 rounded-2xl shadow-inner border border-slate-200/60"
              style={{ background: gradientCode }}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Color Stop 2</label>
                <input
                  type="color"
                  value={colorStop2}
                  onChange={(e) => setColorStop2(e.target.value)}
                  className="w-full h-10 p-1 bg-white border border-slate-200 rounded-xl cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Angle ({angle}°)</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full h-10 accent-orange-500"
                />
              </div>
            </div>
            <div className="bg-slate-900 text-slate-200 p-3 rounded-2xl font-mono text-[10px] flex justify-between items-center leading-relaxed">
              <span className="truncate pr-4">{`background: ${gradientCode};`}</span>
              <button
                onClick={() => copyString(`background: ${gradientCode};`)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-orange-550 text-white rounded-lg transition-colors font-bold text-[9px] shrink-0"
              >
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== CODE BEAUTIFIER ====================
function CodeBeautifier({ onBack }) {
  const [input, setInput] = useState(`function helloWorld() {\nconst list = [1,2,3];\nlist.forEach(item => {\nconsole.log(item);\n});\n}`);
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const beautifyCode = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    const lines = input.split('\n');
    let currentIndent = 0;
    const spacer = ' '.repeat(indent);
    const result = [];

    lines.forEach(line => {
      let trimmed = line.trim();
      if (!trimmed) {
        result.push('');
        return;
      }

      if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
        currentIndent = Math.max(0, currentIndent - 1);
      }

      result.push(spacer.repeat(currentIndent) + trimmed);

      const openBraces = (trimmed.match(/[\{\[\(]/g) || []).length;
      const closeBraces = (trimmed.match(/[\}\]\)]/g) || []).length;
      currentIndent += (openBraces - closeBraces);
      currentIndent = Math.max(0, currentIndent);
    });

    setOutput(result.join('\n'));
  };

  useEffect(() => {
    beautifyCode();
  }, [input, indent]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-5xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <FileCode className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Clever Fox Code Beautifier</h3>
          <p className="text-sm text-slate-500">Auto-align JavaScript curly braces, HTML structures, and CSS templates instantly.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Raw Input Code</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-bold">Spaces:</span>
              <select
                value={indent}
                onChange={(e) => setIndent(parseInt(e.target.value))}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
              >
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
                <option value="8">8 Spaces</option>
              </select>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste code blocks here..."
            className="w-full h-96 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs focus:border-orange-550 focus:bg-white outline-none resize-none shadow-inner"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Beautified Result</span>
            {output && (
              <button
                onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="px-3 py-1 border border-slate-200 text-slate-650 rounded-lg hover:bg-slate-950 hover:text-white text-xs font-bold transition-all flex items-center gap-1"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Aligned source output will load here..."
            className="w-full h-96 p-4 bg-slate-950 text-slate-200 border border-slate-850 rounded-2xl font-mono text-xs outline-none resize-none shadow-inner"
          />
        </div>
      </div>
    </div>
  );
}

// ==================== MARKDOWN PREVIEWER ====================
function MarkdownPreviewer({ onBack }) {
  const [markdown, setMarkdown] = useState(`# 🦊 Welcome to Clever Fox's Markdown Sandbox!

This is a side-by-side **premium rendering engine** featuring glassmorphism elements.

## Features:
- Real-time client-side compiling.
- Safe structured rendering.
- Code syntax isolation.

### Sample Code Block:
\`\`\`javascript
const test = "ToolTrove Rules!";
console.log(test);
\`\`\`

Feel free to write and build documents locally!`);
  const [previewHtml, setPreviewHtml] = useState('');

  const parseMarkdown = (md) => {
    let html = md;
    
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/\`\`\`([\s\S]*?)\`\`\`/g, '<pre class="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs my-3 overflow-x-auto">$1</pre>');
    html = html.replace(/\`([^\`]+)\`/g, '<code class="bg-slate-100 text-orange-650 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>');

    html = html.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-black text-slate-950 mt-4 mb-2 border-b pb-1">$1</h1>');
    html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold text-slate-900 mt-3 mb-1.5">$1</h2>');
    html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold text-slate-800 mt-2 mb-1">$1</h3>');

    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    html = html.replace(/^- (.*?)$/gm, '<li class="ml-4 list-disc text-slate-700 py-0.5">$1</li>');

    html = html.split('\n').map(line => {
      if (line.trim().startsWith('<h') || line.trim().startsWith('<li') || line.trim().startsWith('<pre') || line.trim().startsWith('</pre>') || !line.trim()) {
        return line;
      }
      return `<p class="text-slate-650 my-1.5 text-sm leading-relaxed">${line}</p>`;
    }).join('\n');

    setPreviewHtml(html);
  };

  useEffect(() => {
    parseMarkdown(markdown);
  }, [markdown]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl max-w-6xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Habitation
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Eye className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900">Clever Fox Markdown Previewer</h3>
          <p className="text-sm text-slate-500">Edit raw markdown syntax side-by-side with instantaneous HTML compiled visual renders.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Left editor */}
        <div className="flex flex-col space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Markdown Editor</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type raw markdown text here..."
            className="w-full flex-1 min-h-[350px] p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs focus:border-orange-550 focus:bg-white outline-none resize-none shadow-inner"
          />
        </div>

        {/* Right Output HTML previewer */}
        <div className="flex flex-col space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">HTML Canvas Preview</label>
          <div
            className="w-full flex-1 min-h-[350px] p-6 bg-slate-50/50 border border-slate-200 rounded-2xl overflow-y-auto shadow-inner"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </div>
    </div>
  );
}

