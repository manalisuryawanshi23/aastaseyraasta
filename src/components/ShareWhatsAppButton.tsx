import React, { useState } from 'react';
import { Share2, Check, MessageCircle } from 'lucide-react';

interface ShareWhatsAppButtonProps {
  title: string;
  description?: string;
  url?: string;
  variant?: 'button' | 'icon' | 'badge' | 'full';
  className?: string;
}

export const ShareWhatsAppButton: React.FC<ShareWhatsAppButtonProps> = ({
  title,
  description,
  url,
  variant = 'button',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    return url || (typeof window !== 'undefined' ? window.location.href : '');
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = getShareUrl();
    const message = `*${title}* - Aastha Sey Raasta Seva\n${
      description ? description + '\n' : ''
    }\nCheck details here: ${shareUrl}`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = getShareUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleWhatsAppShare}
        type="button"
        title="Share on WhatsApp with family & friends"
        className={`p-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white transition-all shadow-sm flex items-center justify-center ${className}`}
      >
        <MessageCircle className="w-4 h-4 fill-current" />
      </button>
    );
  }

  if (variant === 'badge') {
    return (
      <button
        onClick={handleWhatsAppShare}
        type="button"
        title="Share on WhatsApp"
        className={`px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all text-xs font-medium flex items-center gap-1.5 shadow-sm ${className}`}
      >
        <MessageCircle className="w-3.5 h-3.5 fill-current" />
        <span>Share</span>
      </button>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={handleWhatsAppShare}
          type="button"
          className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current shrink-0" />
          <span>Share on WhatsApp</span>
        </button>

        <button
          onClick={handleCopyLink}
          type="button"
          title="Copy direct link"
          className="p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors shrink-0"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
        </button>
      </div>
    );
  }

  // Default 'button' variant
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        onClick={handleWhatsAppShare}
        type="button"
        title="Share on WhatsApp with family & friends"
        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
      >
        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
        <span>Share on WhatsApp</span>
      </button>

      <button
        onClick={handleCopyLink}
        type="button"
        title="Copy service link"
        className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Share2 className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
};
