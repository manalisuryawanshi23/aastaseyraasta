import React, { useState, useEffect } from 'react';
import { DarshanItem } from '../../types';
import { StoreService } from '../../services/store';
import {
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  X,
  Power,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Upload,
  Clock,
  MapPin,
  Flame,
  Search,
  RefreshCw,
  Eye,
  AlertCircle,
} from 'lucide-react';

export const AdminDarshanManager: React.FC = () => {
  const [darshanList, setDarshanList] = useState<DarshanItem[]>(() => StoreService.getDarshanItems());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DarshanItem | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleSync = () => {
      setDarshanList(StoreService.getDarshanItems());
    };
    window.addEventListener('aastha:darshan-synced', handleSync);
    window.addEventListener('aastha:data-synced', handleSync);
    return () => {
      window.removeEventListener('aastha:darshan-synced', handleSync);
      window.removeEventListener('aastha:data-synced', handleSync);
    };
  }, []);

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
        showToast('Darshan image uploaded and saved successfully.');
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleTogglePublish = (id: string) => {
    const item = darshanList.find((d) => d.id === id);
    if (!item) return;
    const updated = StoreService.saveDarshanItem({ id, isPublished: !item.isPublished });
    setDarshanList((prev) => prev.map((d) => (d.id === id ? updated : d)));
    showToast(`Darshan card ${updated.isPublished ? 'published' : 'hidden'} on live website.`);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to permanently delete the Darshan card "${title}" from the database?`)) {
      StoreService.deleteDarshanItem(id);
      setDarshanList((prev) => prev.filter((d) => d.id !== id));
      showToast('Darshan card deleted permanently from database.');
    }
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= darshanList.length) return;

    const newOrder = [...darshanList];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    StoreService.reorderDarshanItems(newOrder);
    setDarshanList(newOrder);
    showToast('Darshan sequence updated.');
  };

  const handleOpenAddModal = () => {
    setEditingItem({
      id: `darshan-${Date.now()}`,
      title: '',
      hindiTitle: '',
      subtitle: '',
      image: '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg',
      altText: '',
      location: 'Ujjain',
      templeTiming: '5:00 AM – 10:00 PM',
      sortOrder: darshanList.length + 1,
      isPublished: true,
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: DarshanItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    if (!editingItem.title.trim()) {
      alert('Please enter a Darshan temple title.');
      return;
    }
    if (!editingItem.image.trim()) {
      alert('Please provide or upload a Darshan image.');
      return;
    }

    const saved = StoreService.saveDarshanItem(editingItem);
    setDarshanList(StoreService.getDarshanItems());
    setIsModalOpen(false);
    setEditingItem(null);
    showToast(`Darshan "${saved.title}" saved directly to MySQL database!`);
  };

  const locations = ['All', ...Array.from(new Set(darshanList.map((d) => d.location || 'Ujjain')))];

  const filteredItems = darshanList.filter((item) => {
    const matchesLoc = filterLocation === 'All' || item.location === filterLocation;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.hindiTitle && item.hindiTitle.includes(searchQuery)) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLoc && matchesSearch;
  });

  const publishedCount = darshanList.filter((d) => d.isPublished).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-stone-900/95 dark:bg-stone-100 text-amber-300 dark:text-amber-950 font-bold text-xs shadow-2xl flex items-center gap-2.5 border border-amber-500/30 backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-3xl p-6 md:p-8 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Dedicated MySQL Darshan Engine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-100">
              Ujjain & Sacred Darshan Management
            </h1>
            <p className="text-xs md:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Manage the sacred Darshan gallery cards displayed on the homepage. Add new temples, update photos, edit temple timings, reorder sequence, and delete entries. All changes are saved directly to MySQL.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 text-amber-200" />
              <span>Add New Darshan Image</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-6 pt-6 border-t border-amber-500/20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-xs text-stone-400 font-medium">Total Darshan Items</div>
            <div className="text-xl font-bold font-mono text-white mt-1">{darshanList.length}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
            <div className="text-xs text-emerald-300 font-medium">Live on Homepage</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">{publishedCount}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-xs text-stone-400 font-medium">Hidden / Drafts</div>
            <div className="text-xl font-bold font-mono text-stone-300 mt-1">{darshanList.length - publishedCount}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
            <div className="text-xs text-amber-300 font-medium">Locations Covered</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">{locations.length - 1}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search temple name or subtitle..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider whitespace-nowrap">
            Location:
          </span>
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setFilterLocation(loc)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterLocation === loc
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Darshan Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">No Darshan Cards Found</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {searchQuery || filterLocation !== 'All'
              ? 'Try adjusting your search query or location filter.'
              : 'Click "Add New Darshan Image" above to create your first sacred Darshan card.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group bg-white dark:bg-stone-900 rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-amber-500/50 ${
                item.isPublished
                  ? 'border-stone-200 dark:border-stone-800'
                  : 'border-dashed border-stone-300 dark:border-stone-700 opacity-75'
              }`}
            >
              {/* Card Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-950">
                <img
                  src={item.image.replace(/^\/(?:src|public)\/assets\//, '/assets/')}
                  alt={item.altText || item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badge: Order & Published Status */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-amber-300 font-mono text-[10px] font-bold border border-white/10">
                    #{item.sortOrder || index + 1}
                  </span>
                  <button
                    onClick={() => handleTogglePublish(item.id)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                      item.isPublished
                        ? 'bg-emerald-500/80 text-white border-emerald-400/50'
                        : 'bg-stone-800/80 text-stone-300 border-stone-600'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.isPublished ? 'bg-white animate-pulse' : 'bg-stone-400'}`} />
                    <span>{item.isPublished ? 'Live on Site' : 'Draft'}</span>
                  </button>
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-semibold">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location || 'Ujjain'}</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-white line-clamp-1">
                    {item.title}
                  </h3>
                  {item.hindiTitle && (
                    <div className="text-[11px] text-stone-300 font-medium line-clamp-1 font-serif">
                      {item.hindiTitle}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  {item.subtitle && (
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                      {item.subtitle}
                    </p>
                  )}
                  {item.templeTiming && (
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{item.templeTiming}</span>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveOrder(index, 'up')}
                      disabled={index === 0}
                      title="Move Up"
                      className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950 text-stone-600 dark:text-stone-300 disabled:opacity-30 transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(index, 'down')}
                      disabled={index === darshanList.length - 1}
                      title="Move Down"
                      className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950 text-stone-600 dark:text-stone-300 disabled:opacity-30 transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-600 hover:text-white text-stone-700 dark:text-stone-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1.5 rounded-xl bg-red-50 dark:bg-red-950/50 hover:bg-red-600 hover:text-white text-red-600 dark:text-red-400 transition-all cursor-pointer"
                      title="Delete from Database"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add or Edit Darshan Item */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8">
            {/* Modal Header */}
            <div className="p-5 md:p-6 bg-gradient-to-r from-amber-950 to-stone-900 text-white flex items-center justify-between border-b border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-lg">
                  🛕
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-white">
                    {darshanList.some((d) => d.id === editingItem.id) ? 'Edit Sacred Darshan Card' : 'Add New Sacred Darshan Image'}
                  </h2>
                  <p className="text-xs text-stone-300">
                    Saves directly to MySQL database & displays on the homepage carousel.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Image Preview & Upload Row */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Darshan Image & Photo *
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-full sm:w-44 aspect-[4/3] rounded-2xl overflow-hidden bg-stone-950 border border-stone-300 dark:border-stone-700 shrink-0">
                    <img
                      src={editingItem.image.replace(/^\/(?:src|public)\/assets\//, '/assets/')}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg';
                      }}
                    />
                  </div>

                  <div className="w-full space-y-3">
                    <div className="relative">
                      <input
                        type="file"
                        id="darshan-img-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="darshan-img-upload"
                        className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{isUploading ? 'Uploading to Server...' : 'Upload Image from Computer'}</span>
                      </label>
                    </div>

                    <div>
                      <span className="text-[11px] text-stone-400 block mb-1">Or direct image URL / asset path:</span>
                      <input
                        type="text"
                        value={editingItem.image}
                        onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                        placeholder="/assets/images/temple.jpg"
                        className="w-full px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-mono outline-none focus:ring-2 focus:ring-amber-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Hindi Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Temple / Darshan Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. Mahakaleshwar Jyotirlinga Darshan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Hindi Title (हिंदी शीर्षक)
                  </label>
                  <input
                    type="text"
                    value={editingItem.hindiTitle || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, hindiTitle: e.target.value })}
                    placeholder="उदा. श्री महाकालेश्वर ज्योतिर्लिंग दर्शन"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Subtitle / Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  Subtitle / Sanctum Highlights
                </label>
                <input
                  type="text"
                  value={editingItem.subtitle || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })}
                  placeholder="e.g. Bhasma Aarti & Sanctum Sanctorum, 13th Shaktipeeth"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              {/* Location & Temple Timing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Sacred Location
                  </label>
                  <input
                    type="text"
                    value={editingItem.location || 'Ujjain'}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="e.g. Ujjain, Omkareshwar, Nalkheda"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                    Temple Darshan Timings
                  </label>
                  <input
                    type="text"
                    value={editingItem.templeTiming || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, templeTiming: e.target.value })}
                    placeholder="e.g. 4:00 AM – 11:00 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Sort Order & Status Toggle */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Display Sequence Order:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingItem.sortOrder ?? 1}
                    onChange={(e) => setEditingItem({ ...editingItem, sortOrder: parseInt(e.target.value) || 1 })}
                    className="w-20 px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-mono font-bold text-center"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Publish on Homepage:
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, isPublished: !editingItem.isPublished })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      editingItem.isPublished ? 'bg-emerald-600' : 'bg-stone-400 dark:bg-stone-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        editingItem.isPublished ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-200" />
                  <span>Save to Database</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
