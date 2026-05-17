import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Bot, User, Brain } from 'lucide-react';
import axios from 'axios';

const SAMPLES = [
  {
    pillText: "📧 Write a cold email for startup",
    user: "Write a professional cold email for my web dev agency targeting US startups",
  },
  {
    pillText: "🐛 Debug standard JS recursion",
    user: "Debug this JavaScript function: function fib(n) { return fib(n-1) + fib(n-2); }",
  },
  {
    pillText: "📝 Summarize PDF in bullet points",
    user: "Summarize this financial PDF report in 5 bullet points highlighting growth",
  }
];

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      thinking: '',
      content: "Hello! I am ToolTrove AI, powered by Google Gemma 4 (via OpenRouter). Ask me to write emails, debug code, or compile reports instantly. Try clicking one of the quick prompts below!"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingProcess, setThinkingProcess] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, thinkingProcess]);

  const simulateAIResponse = async (userQuery) => {
    setIsTyping(true);
    setThinkingProcess("Google Gemma 4 thinking...");

    // Create the message payload formatted for OpenRouter API
    const apiMessages = [
      {
        role: "system",
        content: "You are ToolTrove AI, a helpful, developer-friendly assistant powered by Google Gemma 4. Provide clear, accurate, and concise answers."
      },
      ...messages.map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.content
      })),
      { role: "user", content: userQuery }
    ];

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'google/gemma-4-26b-a4b-it:free',
          messages: apiMessages,
          reasoning: {
            enabled: true
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`
          }
        }
      );

      const aiContent = response.data.choices[0].message.content;
      
      setThinkingProcess("");
      
      // Simulate typing effect for the returned content
      let responseCharIndex = 0;
      setMessages(prev => [...prev, {
        role: 'ai',
        thinking: "Google Gemma 4 completed reasoning.",
        content: ""
      }]);

      const typingInterval = setInterval(() => {
        if (responseCharIndex < aiContent.length) {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].content = aiContent.slice(0, responseCharIndex + 4);
            return updated;
          });
          responseCharIndex += 4;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 15);

    } catch (error) {
      console.error("Error calling OpenRouter API:", error);
      setThinkingProcess("");
      setMessages(prev => [...prev, {
        role: 'ai',
        thinking: "",
        content: "I'm sorry, I encountered an error connecting to the Google Gemma 4 server. Please check your API key or try again later."
      }]);
      setIsTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userText = inputText;
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInputText("");
    simulateAIResponse(userText);
  };

  const handlePillClick = (sample) => {
    if (isTyping) return;
    setMessages(prev => [...prev, { role: 'user', content: sample.user }]);
    simulateAIResponse(sample.user);
  };

  return (
    <div className="bg-slate-900 rounded-[3rem] p-6 md:p-12 text-white relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-sm font-bold mb-6">
            <Brain className="w-4 h-4 animate-pulse" /> Powered by Google Gemma 4
          </div>
          <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ask. Think. <span className="text-orange-400">Solved.</span>
          </h3>
          <p className="text-slate-300 mb-8 leading-relaxed text-lg">
            Experience our next-generation reasoning AI via OpenRouter. It doesn't just guess outputs—it demonstrates its thought process transparently to deliver flawless utility scripting.
          </p>

          <div className="space-y-3">
            <p className="text-slate-400 font-semibold text-sm uppercase tracking-wider">Quick Habitation Prompts</p>
            <div className="flex flex-col gap-2.5">
              {SAMPLES.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePillClick(sample)}
                  disabled={isTyping}
                  className="px-4 py-3 bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-white/10 rounded-2xl text-left text-sm font-medium transition-all flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="group-hover:text-orange-300 transition-colors">{sample.pillText}</span>
                  <span className="text-xs text-slate-500 group-hover:text-orange-400 font-bold">Try →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Console Panel */}
        <div className="flex flex-col h-[480px] bg-slate-950/80 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <div>
                <h4 className="font-bold text-sm">ToolTrove AI Console</h4>
                <p className="text-[10px] text-slate-400">Google Gemma 4 active</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-xs font-bold uppercase tracking-wider">
              Reasoning Engine
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-2">
                {/* User Message */}
                {msg.role === 'user' && (
                  <div className="flex items-end justify-end gap-2.5">
                    <div className="bg-orange-500 text-white rounded-2xl rounded-tr-none px-4 py-3 text-sm max-w-[85%] shadow-md">
                      {msg.content}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-bold text-xs shadow-inner shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* AI Message */}
                {msg.role === 'ai' && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-orange-400 shrink-0 shadow-md">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="space-y-2 flex-1 max-w-[85%]">
                      {/* Thought process block */}
                      {msg.thinking && (
                        <div className="bg-slate-900/90 border-l-2 border-orange-500/50 rounded-lg p-3 text-xs text-slate-400 font-mono italic leading-relaxed">
                          <div className="flex items-center gap-1.5 text-orange-400/80 mb-1 font-bold">
                            <Brain className="w-3.5 h-3.5 animate-pulse" />
                            <span>Thought Process</span>
                          </div>
                          {msg.thinking}
                        </div>
                      )}
                      
                      {/* Content block */}
                      {msg.content && (
                        <div className="bg-slate-900 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-200 shadow-md leading-relaxed whitespace-pre-wrap font-sans">
                          {msg.content}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Simulated Live Thinking Box */}
            {isTyping && thinkingProcess && (
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-orange-400 shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900/90 border-l-2 border-orange-500/50 rounded-lg p-3 text-xs text-slate-400 font-mono italic leading-relaxed flex-1 max-w-[85%]">
                  <div className="flex items-center gap-1.5 text-orange-400/80 mb-1 font-bold">
                    <Brain className="w-3.5 h-3.5 animate-pulse" />
                    <span>Thinking...</span>
                  </div>
                  {thinkingProcess}
                </div>
              </div>
            )}

            {/* Simple typing bubbles when typing response */}
            {isTyping && !thinkingProcess && (
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-orange-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-md flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form Footer */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-slate-900/50 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isTyping}
              placeholder="Ask anything (e.g. Write a python script for resizing)"
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
