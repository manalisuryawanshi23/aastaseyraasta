import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Phone,
  Calendar,
  ExternalLink,
  Minimize2,
  Trash2,
  Bot,
  User,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { StoreService } from '../services/store';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    type: 'book' | 'whatsapp' | 'link';
    label: string;
    payload?: string;
  };
}

interface SupportChatWidgetProps {
  onOpenBooking: (type?: 'Pooja' | 'Tour' | 'Destination' | 'General', name?: string) => void;
}

export const SupportChatWidget: React.FC<SupportChatWidgetProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const settings = StoreService.getSettings();
  const poojas = StoreService.getPoojas();
  const tours = StoreService.getTours();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: 'm1',
      sender: 'bot',
      text: `Jai Shri Mahakal! 🙏 Welcome to Aastha Sey Raasta Seva support. How can I assist you today with pooja availability, gotra sankalp, or yatra itineraries?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [isOpen, messages, isTyping]);

  const quickQuestions = [
    '🕉️ Is Mangalnath Bhat Pooja available tomorrow?',
    '🚩 How to perform Rudrabhishek at Mahakaleshwar?',
    '🚗 What is included in Ujjain Omkareshwar Tour?',
    '📜 What details are needed for Gotra Sankalp?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(query);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const generateBotResponse = (userQuery: string): Message => {
    const lower = userQuery.toLowerCase();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check Mangalnath / Bhat Pooja
    if (lower.includes('bhat') || lower.includes('mangalnath') || lower.includes('mangal dosha')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `Mangalnath Temple Bhat Pooja is conducted daily between 6:00 AM and 1:00 PM. Slots are allocated based on your requested morning timeframe. Pandit Ji provides complete boiled rice samagri and conducts gotra sankalp.`,
        timestamp: timeStr,
        action: {
          type: 'book',
          label: 'Reserve Bhat Pooja Slot',
          payload: 'Mangalnath Bhat Pooja',
        },
      };
    }

    // Check Rudrabhishek / Mahakal
    if (lower.includes('rudrabhishek') || lower.includes('mahakal') || lower.includes('abhishek') || lower.includes('kaal sarp')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `Rudrabhishek and Kaal Sarp Dosh Nivaran poojas are performed with pure milk, gangajal, belpatra, and Panchamrit. Rituals take approximately 1.5 to 2.5 hours. We assist with priority slotting and venue arrangements.`,
        timestamp: timeStr,
        action: {
          type: 'book',
          label: 'Book Rudrabhishek Pooja',
          payload: 'Mahakaleshwar Rudrabhishek Pooja',
        },
      };
    }

    // Check Yatra / Tour
    if (lower.includes('tour') || lower.includes('yatra') || lower.includes('circuit') || lower.includes('omkareshwar') || lower.includes('car')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `Our spiritual tours include dedicated private AC cabs (Sedan/SUV), experienced local drivers, temple VIP queue guidance, and optional hotel stay. Popular circuit: Ujjain - Omkareshwar (1 Day / 2 Days).`,
        timestamp: timeStr,
        action: {
          type: 'book',
          label: 'Explore Tour Booking',
          payload: 'Ujjain & Omkareshwar 2 Days Sacred Circuit',
        },
      };
    }

    // Check Gotra / Required details
    if (lower.includes('gotra') || lower.includes('details') || lower.includes('sankalp') || lower.includes('require')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `For Gotra Sankalp, Pandit Ji requires: 1) Devotee Full Name(s), 2) Gotra Name (or Kashyap if gotra is unknown), 3) Nakshatra / Birth details (optional), 4) Preferred Date & Time.`,
        timestamp: timeStr,
        action: {
          type: 'book',
          label: 'Submit Booking Details',
          payload: 'General',
        },
      };
    }

    // Check Availability / Booking procedure
    if (lower.includes('avail') || lower.includes('book') || lower.includes('date') || lower.includes('slot') || lower.includes('price')) {
      return {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: `Slots are available for booking throughout the week including upcoming auspicious tithis (Pradosh, Shivratri, Tuesdays for Mangalnath). No advance payment needed online — pay after sankalp directly to Brahmin Ji.`,
        timestamp: timeStr,
        action: {
          type: 'book',
          label: 'Check Available Dates',
          payload: 'General',
        },
      };
    }

    // Fallback response with WhatsApp direct option
    return {
      id: `b-${Date.now()}`,
      sender: 'bot',
      text: `Thank you for your inquiry! Our Seva Coordinator Pandit Ji is available right now on phone (+91 ${settings.phone1}) or WhatsApp for instant assistance on your specific ritual dates.`,
      timestamp: timeStr,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (+91 ' + settings.whatsappNumber + ')',
      },
    };
  };

  const handleActionClick = (action: Message['action']) => {
    if (!action) return;
    if (action.type === 'book') {
      onOpenBooking('Pooja', action.payload || 'General');
      setIsOpen(false);
    } else if (action.type === 'whatsapp') {
      window.open(
        `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
          'Jai Shri Mahakal! I have a question regarding Pooja availability and booking.'
        )}`,
        '_blank'
      );
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
        {!isOpen && (
          <div className="hidden xs:flex mb-2 bg-stone-900 dark:bg-amber-950 text-white dark:text-amber-100 text-xs py-1.5 px-3 rounded-full shadow-lg border border-amber-500/30 items-center gap-2 animate-bounce max-w-[220px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-medium truncate">Ask Pandit Ji</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border ${
            isOpen
              ? 'bg-stone-900 text-amber-300 border-amber-500/40 rotate-90 scale-95'
              : 'bg-gradient-to-r from-amber-800 to-amber-900 text-white border-amber-400/50 hover:scale-105 active:scale-95'
          }`}
          aria-label="Open support chat"
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-900 shadow">
                  {unreadCount}
                </span>
              )}
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-[72px] sm:bottom-24 right-2 left-2 sm:left-auto sm:right-6 z-50 sm:w-96 h-[480px] max-h-[75vh] bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-300 dark:border-stone-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="bg-stone-900 dark:bg-[#121110] text-white p-3.5 px-4 flex items-center justify-between border-b border-amber-800/40">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-amber-200 font-bold text-sm shadow">
                  🙏
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-stone-900" />
              </div>

              <div>
                <h3 className="font-serif font-bold text-sm text-amber-200 leading-tight">
                  Seva Support & Pandit Ji
                </h3>
                <p className="text-[10px] text-stone-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>Online • Immediate Answer</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages(initialMessages);
                }}
                title="Clear Chat"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50 dark:bg-[#181614]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-amber-800 text-white rounded-br-none'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Optional Bot Action Button */}
                  {msg.action && (
                    <button
                      onClick={() => handleActionClick(msg.action)}
                      className="mt-2.5 w-full py-2 px-3 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 font-semibold text-[11px] border border-amber-300 dark:border-amber-800 hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <span className="text-[9px] text-stone-400 dark:text-stone-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 p-2 bg-white dark:bg-stone-800 rounded-xl w-fit border border-stone-200 dark:border-stone-700 shadow-sm">
                <Bot className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 animate-pulse" />
                <span className="font-medium text-[11px]">Pandit Ji is typing response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Preset Buttons */}
          <div className="p-2.5 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-[10px] font-medium rounded-full border border-stone-300 dark:border-stone-700 hover:bg-amber-50 dark:hover:bg-stone-700 whitespace-nowrap transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Direct Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-[#1C1917] border-t border-stone-200 dark:border-stone-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about poojas, dates, or prices..."
              className="flex-1 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-xs px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 outline-none focus:ring-2 focus:ring-amber-800"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-amber-800 text-white disabled:opacity-50 hover:bg-amber-900 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
