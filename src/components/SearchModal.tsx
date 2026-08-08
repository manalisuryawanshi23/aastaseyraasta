import React, { useState } from 'react';
import { X, Search, Sparkles, MapPin, Calendar, Compass, BookOpen, ChevronRight } from 'lucide-react';
import { StoreService } from '../services/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-stone-900/70 backdrop-blur-sm p-4 pt-16 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Bar */}
        <div className="relative border-b border-stone-200 p-4 bg-stone-50 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-700 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search poojas (e.g. Rudrabhishek, Bhat Pooja), yatras, destinations..."
            className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-base outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 text-xs font-semibold px-2 py-1 rounded bg-stone-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Container */}
        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center text-stone-500 space-y-3">
              <Sparkles className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
              <p className="text-sm font-serif">Try searching for sacred rituals or pilgrimage circuits:</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto pt-2">
                {['Rudrabhishek', 'Bhat Pooja', 'Mahamrityunjaya', 'Baglamukhi Havan', 'Omkareshwar Yatra', 'Char Dham', 'Ujjain'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-amber-50 text-amber-800 text-xs rounded-full border border-amber-200 hover:bg-amber-100 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="text-base font-serif">No spiritual services found for &quot;{query}&quot;</p>
              <p className="text-xs text-stone-400 mt-1">
                You can submit a custom enquiry or call our Acharya team directly at +91 9111099799.
              </p>
            </div>
          ) : (
            <>
              {/* Poojas */}
              {poojas.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pooja Services ({poojas.length})</span>
                  </h4>
                  <div className="divide-y divide-stone-100">
                    {poojas.map((p) => (
                      <a
                        key={p.id}
                        href={`/pooja/${p.slug}`}
                        onClick={onClose}
                        className="group py-2.5 px-3 rounded-xl hover:bg-amber-50/60 transition-colors flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 group-hover:text-amber-900 text-sm flex items-center gap-2">
                            <span>{p.name}</span>
                            {p.hindiName && (
                              <span className="text-xs font-normal text-stone-500">
                                ({p.hindiName})
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {p.shortDescription}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Tours */}
              {tours.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2.5 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Spiritual Yatras ({tours.length})</span>
                  </h4>
                  <div className="divide-y divide-stone-100">
                    {tours.map((t) => (
                      <a
                        key={t.id}
                        href={`/spiritual-tours/${t.slug}`}
                        onClick={onClose}
                        className="group py-2.5 px-3 rounded-xl hover:bg-emerald-50/60 transition-colors flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 group-hover:text-emerald-900 text-sm">
                            {t.name}
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {t.shortDescription}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Destinations */}
              {destinations.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 mb-2.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Sacred Destinations ({destinations.length})</span>
                  </h4>
                  <div className="divide-y divide-stone-100">
                    {destinations.map((d) => (
                      <a
                        key={d.id}
                        href={`/destinations/${d.slug}`}
                        onClick={onClose}
                        className="group py-2.5 px-3 rounded-xl hover:bg-sky-50/60 transition-colors flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 group-hover:text-sky-900 text-sm">
                            {d.name} {d.hindiName && `(${d.hindiName})`}
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {d.shortDescription}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-sky-700 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs */}
              {blogs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Blog Guides ({blogs.length})</span>
                  </h4>
                  <div className="divide-y divide-stone-100">
                    {blogs.map((b) => (
                      <a
                        key={b.id}
                        href={`/blog/${b.slug}`}
                        onClick={onClose}
                        className="group py-2.5 px-3 rounded-xl hover:bg-purple-50/60 transition-colors flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 group-hover:text-purple-900 text-sm">
                            {b.title}
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {b.excerpt}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-purple-700 shrink-0" />
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
