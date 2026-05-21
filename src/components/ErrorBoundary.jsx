import React from 'react';
import { ShieldAlert, RefreshCw, Home, Copy, ArrowLeft } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.hash = '#/';
    window.location.reload();
  };

  handleCopyError = () => {
    const errorText = `${this.state.error?.toString()}\n\n${this.state.errorInfo?.componentStack}`;
    navigator.clipboard.writeText(errorText);
    alert("Error details copied to clipboard!");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
          {/* Glowing background mesh */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-xl w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10 space-y-8 animate-fade-in text-center">
            
            {/* Warning Icon Badge */}
            <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg animate-pulse">
              <ShieldAlert className="w-10 h-10" />
            </div>

            {/* Error Message */}
            <div className="space-y-3">
              <span className="text-red-400 text-xs font-black uppercase tracking-widest block">Runtime Sandbox Exception</span>
              <h1 className="text-3xl font-black tracking-tight text-white leading-tight">
                Oops, Something Broke in the Trove!
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto font-medium">
                Our AI companions encountered a sudden calculation glitch. Your private files and assets remain safe in your local browser sandbox.
              </p>
            </div>

            {/* Error Log Console */}
            {this.state.error && (
              <div className="text-left bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-red-400 max-h-36 overflow-y-auto scrollbar-none shadow-inner leading-relaxed">
                <p className="font-bold border-b border-white/5 pb-1 mb-1.5 text-white">ERROR LOG:</p>
                <p className="font-semibold">{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <pre className="mt-1 text-slate-500 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 px-5 py-3 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-2 text-sm shadow-md active:scale-95"
              >
                <RefreshCw className="w-4 h-4" /> Reload Workspace
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-orange-500/20 active:scale-95"
              >
                <Home className="w-4 h-4" /> Go to Safe Home
              </button>
            </div>

            {/* Copy Details Shortcut */}
            {this.state.error && (
              <button
                onClick={this.handleCopyError}
                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors bg-white/0 hover:bg-white/5 px-3 py-1.5 rounded-lg border border-transparent hover:border-white/5"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Error Details
              </button>
            )}

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
