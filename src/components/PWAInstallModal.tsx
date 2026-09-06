import React from 'react';
import {
  X,
  Smartphone,
  Share,
  PlusSquare,
  Sparkles,
  Flame,
  CheckCircle2,
  Download,
  ShieldCheck,
  Zap,
  Bell,
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS: boolean;
  canPromptDirectly: boolean;
  onDirectInstall: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isIOS,
  canPromptDirectly,
  onDirectInstall,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-red-950 via-amber-900 to-red-950 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-serif font-bold text-2xl shadow-inner">
              ॐ
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Official Web App</span>
              </div>
              <h2 id="pwa-modal-title" className="text-lg font-serif font-bold leading-tight text-white">
                Install Aastha Sey Raasta
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Install our high-speed mobile app directly on your home screen without going through an app store. Enjoy instant darshan timings, fast puja booking, and offline guides.
          </p>

          {/* Key Advantages */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-stone-800/80 border border-amber-200/50 dark:border-stone-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-medium text-stone-800 dark:text-stone-200">Instant 1-Tap Access</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-stone-800/80 border border-amber-200/50 dark:border-stone-700 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-medium text-stone-800 dark:text-stone-200">Daily Live Darshan</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-stone-800/80 border border-amber-200/50 dark:border-stone-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-medium text-stone-800 dark:text-stone-200">Verified Pandits</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-stone-800/80 border border-amber-200/50 dark:border-stone-700 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-medium text-stone-800 dark:text-stone-200">Pooja Reminders</span>
            </div>
          </div>

          {/* Installation Instructions */}
          {canPromptDirectly ? (
            <div className="space-y-3 pt-1">
              <button
                onClick={() => {
                  onDirectInstall();
                  onClose();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Install App on Device</span>
              </button>
            </div>
          ) : isIOS ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
              <div className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                <span>How to Install on iPhone & iPad (Safari)</span>
              </div>
              <ol className="text-xs text-stone-700 dark:text-stone-300 space-y-2.5 pl-1">
                <li className="flex items-start gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[11px] shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Tap the <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline mx-1 text-blue-600 dark:text-blue-400" /> at the bottom of Safari.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[11px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-amber-600 dark:text-amber-400" />.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[11px] shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Tap <strong>&quot;Add&quot;</strong> in top right corner. Done!
                  </span>
                </li>
              </ol>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700 space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
              <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-amber-600" />
                <span>Browser Installation</span>
              </div>
              <p>
                In your browser menu (three dots <strong>⋮</strong> in Chrome or Edge address bar), tap <strong>&quot;Install App&quot;</strong> or <strong>&quot;Add to Home Screen&quot;</strong>.
              </p>
            </div>
          )}

          <div className="text-center pt-1">
            <button
              onClick={onClose}
              className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
