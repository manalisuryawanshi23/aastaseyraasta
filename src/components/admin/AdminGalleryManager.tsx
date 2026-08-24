import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { StoreService } from '../../services/store';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  X,
  Power,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

export const AdminGalleryManager: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>(() => StoreService.getGallery());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setEditingItem({ ...editingItem, image: data.url });
        showToast('Image uploaded successfully.');
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleTogglePublish = (id: string) => {
    const item = gallery.find((g) => g.id === id);
    if (!item) return;
    const updated = StoreService.saveGalleryItem({ id, isPublished: !item.isPublished });
    setGallery((prev) => prev.map((g) => (g.id === id ? updated : g)));
    showToast(`Gallery item ${updated.isPublished ? 'published' : 'unpublished'} successfully.`);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the gallery photo "${title}"?`)) {
      StoreService.deleteGalleryItem(id);
      setGallery((prev) => prev.filter((g) => g.id !== id));
      showToast('Gallery photo deleted successfully.');
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem({
      id: `gal-${Date.now()}`,
      title: 'A Journey in Moments',
      description: '',
      image: '/src/assets/images/pooja_rudrabhishek_1786196070818.jpg',
      altText: 'Spiritual pilgrims in Ujjain temple',
      category: 'Pooja',
      location: 'Ujjain',
      sortOrder: gallery.length + 1,
      isPublished: true,
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const saved = StoreService.saveGalleryItem(editingItem);
    const exists = gallery.some((g) => g.id === saved.id);

    if (exists) {
      setGallery((prev) => prev.map((g) => (g.id === saved.id ? saved : g)));
    } else {
      setGallery((prev) => [saved, ...prev]);
    }

    setIsModalOpen(false);
    showToast('Gallery item saved successfully!');
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const newList = [...gallery];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newList.length) return;

    // Swap items
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;

    // Reassign sort orders
    newList.forEach((item, idx) => {
      item.sortOrder = idx + 1;
      StoreService.saveGalleryItem({ id: item.id, sortOrder: item.sortOrder });
    });

    setGallery(newList);
    showToast('Display order rearranged.');
  };

  return (
    <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-700" />
            <span>Gallery Management</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            View, upload, categorize, rearrange, and manage photos displayed in the homepage &quot;A Journey in Moments&quot; horizontal gallery.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Photo</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item, idx) => (
          <div
            key={item.id}
            className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
              item.isPublished
                ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-850 shadow-sm'
                : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-900 opacity-60'
            }`}
          >
            <div className="relative aspect-video w-full bg-stone-100 dark:bg-stone-800">
              <img
                src={item.image}
                alt={item.altText}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-[10px] text-amber-200 font-bold uppercase border border-white/10">
                {item.category}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100">{item.title}</h3>
                {item.location && (
                  <p className="text-[10px] text-stone-500 font-medium">📍 {item.location}</p>
                )}
                {item.description && (
                  <p className="text-[10px] text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
                <div className="text-[10px] text-stone-400 font-mono mt-2">
                  Alt text: &quot;{item.altText}&quot;
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => moveOrder(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 disabled:opacity-30 text-stone-700 dark:text-stone-300"
                    title="Move up / left"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveOrder(idx, 'down')}
                    disabled={idx === gallery.length - 1}
                    className="p-1 rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 disabled:opacity-30 text-stone-700 dark:text-stone-300"
                    title="Move down / right"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleTogglePublish(item.id)}
                    title={item.isPublished ? 'Deactivate / Hide' : 'Activate / Publish'}
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
                    title="Edit Information"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200/40 dark:border-red-900/30"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
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
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>{editingItem.id ? 'Edit Photo details' : 'Add New Photo'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Photo Title / Headline
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Pt. Sharma performing Aarti"
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value as GalleryItem['category'],
                      })
                    }
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-bold"
                  >
                    <option value="Pooja">POOJA</option>
                    <option value="Darshan">DARSHAN</option>
                    <option value="Ujjain Yatra">UJJAIN YATRA</option>
                    <option value="Omkareshwar">OMKARESHWAR</option>
                    <option value="Himalayan Yatra">HIMALAYAN YATRA</option>
                    <option value="Trekking">TREKKING</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                    Location Label
                  </label>
                  <input
                    type="text"
                    value={editingItem.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="e.g. Mahakaleshwar Temple, Ujjain"
                    className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Upload Image File
                </label>
                {editingItem.image && (
                  <div className="mb-2">
                    <img src={editingItem.image} alt="Preview" className="h-16 rounded shadow object-cover aspect-video" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="w-full p-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
                  />
                  {isUploading && <span className="text-[10px] text-stone-500">Uploading...</span>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Or Image URL / Asset Path
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  placeholder="/assets/images/filename.webp"
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-medium font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  ALT Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.altText}
                  onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                  placeholder="Describe what is in the photo for Google Search Alt Indexing"
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Short Description
                </label>
                <textarea
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Optional brief description of this moment..."
                  rows={2}
                  className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-hidden focus:ring-2 focus:ring-amber-600 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub-checkbox"
                  checked={editingItem.isPublished}
                  onChange={(e) => setEditingItem({ ...editingItem, isPublished: e.target.checked })}
                  className="rounded-sm border-stone-300 text-amber-700 focus:ring-amber-600 w-4 h-4"
                />
                <label
                  htmlFor="pub-checkbox"
                  className="text-xs font-bold text-stone-700 dark:text-stone-300 select-none cursor-pointer"
                >
                  Publish and show this photo in active gallery immediately
                </label>
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
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
