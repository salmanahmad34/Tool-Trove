import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sparkles, X, CheckCircle } from 'lucide-react';
import { OwlMascot } from './Mascots';
import { LogoIcon } from './BrandLogo';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // 1. Check if the user has already dismissed the prompt in this session
    const isDismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (isDismissed) return;

    const handleBeforeInstall = (e) => {
      // Prevent browser standard install banner from firing automatically
      e.preventDefault();
      // Store the event so it can be triggered manually later
      setDeferredPrompt(e);
      // Display the custom glassmorphism installation prompt
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // 2. Listen for successful native app installations
    const handleAppInstalled = () => {
      console.log('[PWA] Installed successfully!');
      setDeferredPrompt(null);
      setShowPrompt(false);
      setInstalledSuccess(true);
      
      // Auto close success mascot alert after 4 seconds
      setTimeout(() => {
        setInstalledSuccess(false);
      }, 4000);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Trigger native browser install prompt window
    deferredPrompt.prompt();

    // Check user decision
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] Install Prompt user choice outcome: ${outcome}`);

    // Clean up variables
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Persist dismiss choice so they aren't repeatedly prompted
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  return (
    <>
      <AnimatePresence>
        {/* PWA Floating Install Drawer Card */}
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 left-6 z-[99999] max-w-sm w-[calc(100vw-3rem)] bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xl p-5 rounded-[2rem] flex flex-col gap-4"
          >
            {/* Header info */}
            <div className="flex justify-between items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-500 text-white rounded-xl shadow-md">
                  <LogoIcon className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div>
                  <h5 className="font-black text-slate-800 text-xs uppercase tracking-wider">Install ToolTrove</h5>
                  <span className="text-[9px] text-[#ff5c1a] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 shrink-0" /> Local Offline App
                  </span>
                </div>
              </div>
              <button 
                onClick={handleDismiss}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mascot description bubble */}
            <div className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-3 rounded-2xl">
              <div className="w-10 h-10 shrink-0 p-1.5 bg-orange-100 text-orange-600 rounded-xl">
                <OwlMascot />
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                Hoot! Install our secure utility app on your desktop or home screen to compile PDF files and calculations completely offline at maximum speed!
              </p>
            </div>

            {/* Action Triggers */}
            <div className="flex gap-2">
              <button
                onClick={handleDismiss}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Maybe Later
              </button>
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-orange-500 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 shadow-lg hover:shadow-orange-100 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install App</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Gorgeous PWA Installation Completed Confirmation Banner */}
        {installedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[99999] bg-emerald-500 text-white shadow-xl px-6 py-3.5 rounded-full flex items-center gap-2 border border-emerald-400"
          >
            <CheckCircle className="w-5 h-5 animate-bounce" />
            <span className="text-xs font-black uppercase tracking-wider">Hoot! ToolTrove Installed Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
