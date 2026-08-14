import React, { useState, useRef, useEffect } from 'react';
import { X, Search, Sparkles, MapPin, Compass, BookOpen, ChevronRight, Mic, MicOff, AlertCircle } from 'lucide-react';
import { StoreService } from '../services/store';

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  if (!isOpen) return null;

  const toggleVoiceSearch = () => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSpeechError('Voice search is not supported in this browser. Try Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    try {
      setSpeechError(null);
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Optimized for Indian English & Hindi terms

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setSpeechError('Microphone permission was denied. Please allow microphone access in browser settings.');
        } else if (event.error === 'no-speech') {
          setSpeechError('No speech detected. Please try speaking again.');
        } else if (event.error !== 'aborted') {
          setSpeechError(`Voice input error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to initialize Speech Recognition:', err);
      setSpeechError('Could not start voice recognition.');
      setIsListening(false);
    }
  };

  const poojas = StoreService.getPoojas().filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.hindiName && p.hindiName.includes(query)) ||
      p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      (p.templeName && p.templeName.toLowerCase().includes(query.toLowerCase()))
  );

  const tours = StoreService.getTours().filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      t.destinations.some((d) => d.toLowerCase().includes(query.toLowerCase()))
  );

  const destinations = StoreService.getDestinations().filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  const blogs = StoreService.getBlogPosts().filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = poojas.length + tours.length + destinations.length + blogs.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-stone-900/70 backdrop-blur-sm p-2 sm:p-4 pt-10 sm:pt-16 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1C1917] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Bar */}
        <div className="relative border-b border-stone-200 dark:border-stone-800 p-3 sm:p-4 bg-stone-50 dark:bg-stone-900 flex items-center gap-2 sm:gap-3">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 dark:text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search poojas, yatras, or topics (e.g. Rudrabhishek)..."
            className="w-full bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm sm:text-base outline-none font-medium min-w-0"
          />

          {/* Voice Search Button */}
          <button
            type="button"
            onClick={toggleVoiceSearch}
            title={isListening ? 'Stop Voice Listening' : 'Search by Voice'}
            className={`relative p-2 rounded-xl transition-all flex items-center justify-center shrink-0 min-w-[36px] min-h-[36px] ${
              isListening
                ? 'bg-red-600 text-white shadow-lg shadow-red-500/40 animate-pulse'
                : 'bg-amber-100 dark:bg-stone-800 text-amber-900 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-stone-700'
            }`}
          >
            {isListening ? (
              <MicOff className="w-4 h-4 text-white" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
            {isListening && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </button>

          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSpeechError(null);
              }}
              className="text-stone-400 dark:text-stone-300 hover:text-stone-600 dark:hover:text-stone-100 text-xs font-semibold px-2 py-1 rounded bg-stone-200 dark:bg-stone-800 shrink-0"
            >
              Clear
            </button>
          )}

          <button
            onClick={() => {
              if (isListening && recognitionRef.current) {
                try {
                  recognitionRef.current.stop();
                } catch {
                  // ignore
                }
              }
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 transition-colors shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Listening Banner */}
        {isListening && (
          <div className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-red-500/10 border-b border-red-200 dark:border-red-900/50 p-3 px-4 flex items-center justify-between text-xs font-medium text-stone-800 dark:text-stone-200">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span className="font-semibold text-red-700 dark:text-red-400">Listening...</span>
              <span className="text-stone-600 dark:text-stone-400 hidden sm:inline">Say a service or topic like &quot;Rudrabhishek&quot; or &quot;Mangalnath&quot;</span>
            </div>
            {/* Audio wave pulse bars */}
            <div className="flex items-center gap-1">
              <div className="w-1 h-3 bg-red-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-4 bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-2 bg-red-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              <div className="w-1 h-5 bg-amber-500 animate-bounce" style={{ animationDelay: '450ms' }} />
            </div>
          </div>
        )}

        {/* Speech Error Banner */}
        {speechError && (
          <div className="bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200 dark:border-amber-900/50 p-3 px-4 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>{speechError}</span>
            </div>
            <button
              onClick={() => setSpeechError(null)}
              className="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-bold ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Search Results Container */}
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center text-stone-500 dark:text-stone-400 space-y-3">
              <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto opacity-70" />
              <p className="text-sm font-serif">Try searching by text or clicking the microphone for voice search:</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto pt-2">
                {['Rudrabhishek', 'Bhat Pooja', 'Mahamrityunjaya', 'Baglamukhi Havan', 'Omkareshwar Yatra', 'Char Dham', 'Ujjain'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      setSpeechError(null);
                    }}
                    className="px-3 py-1 bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-200 text-xs rounded-full border border-amber-200 dark:border-stone-700 hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-stone-500 dark:text-stone-400">
              <p className="text-base font-serif">No spiritual services found for &quot;{query}&quot;</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                You can submit a custom enquiry or call our Acharya team directly at +91 9111099799.
              </p>
            </div>
          ) : (
            <>
              {/* Poojas */}
              {poojas.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pooja Services ({poojas.length})</span>
                  </h4>
                  <div className="divide-y divide-stone-100 dark:divide-stone-800">
                    {poojas.map((p) => (
                      <a
                        key={p.id}
                        href={`/pooja/${p.slug}`}
                        onClick={onClose}
                        className="group py-2.5 px-3 rounded-xl hover:bg-amber-50/60 dark:hover:bg-stone-800/60 transition-colors flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-900 dark:group-hover:text-amber-300 text-sm flex items-center gap-2">
                            <span>{p.name}</span>
                            {p.hindiName && (
                              <span className="text-xs font-normal text-stone-500 dark:text-stone-400">
                                ({p.hindiName})
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                            {p.shortDescription}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 dark:group-hover:text-amber-400 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Tours */}
              {tours.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2.5 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Spiritual Yatras ({tours.length})</span>
                  </h4>
                  <div className="divide-y divide-stone-100 dark:divide-stone-800">
                    {tours.map((t) => (
                      <a
                        key={t.id}
                        href={`/spiritual-tours/${t.slug}`}
                        onClick={onClose}
                        className="group py-2.5 px-3 rounded-xl hover:bg-emerald-50/60 dark:hover:bg-stone-800/60 transition-colors flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 text-sm">
                            {t.name}
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                            {t.shortDescription}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Destinations */}
              {destinations.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-400 mb-2.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Sacred Destinations ({destinations.length})</span>
                  </h4>
                  <div className="divide-y divide-stone-100 dark:divide-stone-800">
                    {destinations.map((d) => (
                      <a
                        key={d.id}
                        href={`/destinations/${d.slug}`}
                        onClick={onClose}
                        className="group py-2.5 px-3 rounded-xl hover:bg-sky-50/60 dark:hover:bg-stone-800/60 transition-colors flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-sky-900 dark:group-hover:text-sky-300 text-sm">
                            {d.name} {d.hindiName && `(${d.hindiName})`}
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                            {d.shortDescription}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-sky-700 dark:group-hover:text-sky-400 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs */}
              {blogs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-400 mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Blog Guides ({blogs.length})</span>
                  </h4>
                  <div className="divide-y divide-stone-100 dark:divide-stone-800">
                    {blogs.map((b) => (
                      <a
                        key={b.id}
                        href={`/blog/${b.slug}`}
                        onClick={onClose}
                        className="group py-2.5 px-3 rounded-xl hover:bg-purple-50/60 dark:hover:bg-stone-800/60 transition-colors flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-purple-900 dark:group-hover:text-purple-300 text-sm">
                            {b.title}
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                            {b.excerpt}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-purple-700 dark:group-hover:text-purple-400 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

