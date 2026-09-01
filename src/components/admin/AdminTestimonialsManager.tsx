import React, { useState } from 'react';
import { Testimonial } from '../../types';
import { StoreService } from '../../services/store';
import {
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  X,
  Power,
  Star,
  UserCheck,
} from 'lucide-react';

export const AdminTestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
    StoreService.getTestimonials()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  React.useEffect(() => {
    const handleSync = () => setTestimonials(StoreService.getTestimonials());
    window.addEventListener('aastha:data-synced', handleSync);
    return () => window.removeEventListener('aastha:data-synced', handleSync);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleTogglePublish = (id: string) => {
    const item = testimonials.find((t) => t.id === id);
    if (!item) return;
    const updated = StoreService.saveTestimonial({ id, isPublished: !item.isPublished });
    setTestimonials((prev) => prev.map((t) => (t.id === id ? updated : t)));
    showToast(`Testimonial ${updated.isPublished ? 'published' : 'hidden'} successfully.`);
  };

  const handleToggleFeature = (id: string) => {
    const item = testimonials.find((t) => t.id === id);
    if (!item) return;
    const updated = StoreService.saveTestimonial({ id, isFeatured: !item.isFeatured });
    setTestimonials((prev) => prev.map((t) => (t.id === id ? updated : t)));
    showToast(`Testimonial featured status ${updated.isFeatured ? 'enabled' : 'disabled'}.`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the testimonial from "${name}"?`)) {
      StoreService.deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      showToast('Testimonial deleted successfully.');
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem({
      id: `test-${Date.now()}`,
      name: '',
      location: 'Ujjain',
      rating: 5,
      testimonial: '',
      category: 'Pooja',
      isFeatured: true,
      isPublished: true,
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Testimonial) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const saved = StoreService.saveTestimonial(editingItem);
    const exists = testimonials.some((t) => t.id === saved.id);

    if (exists) {
      setTestimonials((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
    } else {
      setTestimonials((prev) => [saved, ...prev]);
    }

    setIsModalOpen(false);
    showToast('Testimonial saved successfully!');
  };

  return (
    <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-700" />
            <span>Testimonials Management</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            View, add, edit, toggle active status, and manage devotee reviews displayed across the website.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              item.isPublished
                ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-850 shadow-sm'
                : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-900 opacity-60'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xs">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100">
                      {item.name}
                      {item.hindiName && (
                        <span className="text-[10px] text-stone-400 ml-1 font-normal font-serif">
                          ({item.hindiName})
                        </span>
                      )}
                    </h3>
                    <p className="text-[10px] text-stone-550 font-medium">📍 {item.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < item.rating
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-stone-250 dark:text-stone-750'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-stone-50 dark:bg-stone-950/40 p-3.5 rounded-xl border border-stone-150/40 dark:border-stone-850/40">
                <p className="text-xs text-stone-750 dark:text-stone-300 italic leading-relaxed">
                  &ldquo;{item.testimonial}&rdquo;
                </p>
                {item.hindiTestimonial && (
                  <p className="text-xs text-stone-600 dark:text-stone-400 italic leading-relaxed mt-2 border-t border-stone-200/50 dark:border-stone-850/50 pt-2 font-serif">
                    &ldquo;{item.hindiTestimonial}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-stone-500">
                {item.category && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 uppercase">
                    Type: {item.category}
                  </span>
                )}
                {item.service && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400">
                    Service: {item.service}
                  </span>
                )}
                {item.tour && (
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-700 dark:text-rose-455">
                    Tour: {item.tour}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  item.isPublished
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-350'
                    : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                }`}
              >
                {item.isPublished ? 'Published & Active' : 'Hidden / Draft'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleFeature(item.id)}
                  title={item.isFeatured ? 'Remove from Featured' : 'Feature on Homepage'}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    item.isFeatured
                      ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-350 dark:border-amber-900'
                      : 'bg-stone-200 text-stone-600 border-stone-300 dark:bg-stone-800 dark:text-stone-400'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                </button>

                <button
                  onClick={() => handleTogglePublish(item.id)}
                  title={item.isPublished ? 'Unpublish' : 'Publish'}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    item.isPublished
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-350 dark:border-emerald-900'
                      : 'bg-stone-200 text-stone-600 border-stone-300 dark:bg-stone-800 dark:text-stone-400'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-850 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200/50 dark:border-stone-800"
                  title="Edit testimonial"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200/40 dark:border-red-900/30"
                  title="Delete testimonial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 bg-stone-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-stone-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="p-6 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white flex items-center justify-between">
              <h3 className="font-serif font-bold text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>{editingItem.id ? 'Edit Testimonial' : 'Add New Testimonial'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Devotee Name (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Devotee Name (Hindi)
                  </label>
                  <input
                    type="text"
                    value={editingItem.hindiName || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, hindiName: e.target.value })}
                    placeholder="जैसे: रमेश पटेल"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Location Label (English)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Location Label (Hindi)
                  </label>
                  <input
                    type="text"
                    value={editingItem.hindiLocation || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, hindiLocation: e.target.value })
                    }
                    placeholder="जैसे: मुंबई, महाराष्ट्र"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-serif"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Rating Star Count
                  </label>
                  <select
                    value={editingItem.rating}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, rating: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-bold"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                    <option value={3}>⭐⭐⭐ 3 Stars</option>
                    <option value={2}>⭐⭐ 2 Stars</option>
                    <option value={1}>⭐ 1 Star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Category Type
                  </label>
                  <select
                    value={editingItem.category || 'Pooja'}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value as Testimonial['category'],
                      })
                    }
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-bold"
                  >
                    <option value="Pooja">Pooja Services</option>
                    <option value="Tour">Yatra & Tours</option>
                    <option value="General">General / Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Associated Pooja/Service Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.service || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, service: e.target.value })}
                    placeholder="e.g. Rudrabhishek Pooja"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Associated Tour / Yatra
                  </label>
                  <input
                    type="text"
                    value={editingItem.tour || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, tour: e.target.value })}
                    placeholder="e.g. Ujjain Omkareshwar Yatra"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Testimonial Review (English)
                </label>
                <textarea
                  required
                  value={editingItem.testimonial}
                  onChange={(e) => setEditingItem({ ...editingItem, testimonial: e.target.value })}
                  placeholder="Review content in English..."
                  rows={3}
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Testimonial Review (Hindi)
                </label>
                <textarea
                  value={editingItem.hindiTestimonial || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, hindiTestimonial: e.target.value })
                  }
                  placeholder="Review content in Hindi..."
                  rows={3}
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-serif"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pub-check"
                    checked={editingItem.isPublished}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, isPublished: e.target.checked })
                    }
                    className="rounded-sm border-stone-300 text-amber-700 focus:ring-amber-600 w-4 h-4"
                  />
                  <label
                    htmlFor="pub-check"
                    className="text-xs font-bold text-stone-700 dark:text-stone-300 select-none cursor-pointer"
                  >
                    Active / Published
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="feat-check"
                    checked={editingItem.isFeatured}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, isFeatured: e.target.checked })
                    }
                    className="rounded-sm border-stone-300 text-amber-700 focus:ring-amber-600 w-4 h-4"
                  />
                  <label
                    htmlFor="feat-check"
                    className="text-xs font-bold text-stone-700 dark:text-stone-300 select-none cursor-pointer"
                  >
                    Feature on Homepage
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold shadow-md transition-all"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
