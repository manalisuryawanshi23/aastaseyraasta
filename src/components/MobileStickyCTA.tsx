import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { StoreService } from '../services/store';

interface MobileStickyCTAProps {
  onOpenBooking: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onOpenBooking }) => {
  const settings = StoreService.getSettings();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-stone-900/95 backdrop-blur-md border-t border-amber-900/40 p-2.5 px-3 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call */}
        <a
          href={`tel:${settings.phone1}`}
          className="py-2.5 px-3 rounded-xl bg-stone-800 text-stone-200 hover:bg-stone-700 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-700"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
            'Jai Shree Mahakal 🙏 I would like to enquire about Pooja / Yatra services.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>

        {/* Book */}
        <button
          onClick={onOpenBooking}
          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-800 to-amber-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-900/20"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
};
