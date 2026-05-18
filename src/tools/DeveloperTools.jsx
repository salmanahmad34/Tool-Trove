import React, { useState, useEffect } from 'react';
import { Braces, Binary, Search, Code, Key, ArrowLeft, Copy, CheckCircle, AlertCircle, RefreshCw, Trash2, ArrowUpDown } from 'lucide-react';

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
