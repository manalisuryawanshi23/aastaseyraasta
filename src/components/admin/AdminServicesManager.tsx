import React, { useState } from 'react';
import { PoojaService, Tour } from '../../types';
import { StoreService } from '../../services/store';
import {
  Flame,
  Compass,
  Plus,
  Edit3,
  Trash2,
  Save,
  CheckCircle2,
  X,
  Search,
  Image as ImageIcon,
  Globe,
  MapPin,
  Clock,
  IndianRupee,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const AdminServicesManager: React.FC = () => {
  const [serviceType, setServiceType] = useState<'pooja' | 'tour'>('pooja');
  const [searchQuery, setSearchQuery] = useState('');
  const [poojas, setPoojas] = useState<PoojaService[]>(StoreService.getPoojas(false));
  const [tours, setTours] = useState<Tour[]>(StoreService.getTours(false));

  const [editingPooja, setEditingPooja] = useState<PoojaService | null>(null);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const refreshLists = () => {
    setPoojas(StoreService.getPoojas(false));
    setTours(StoreService.getTours(false));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDeletePooja = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      StoreService.deletePooja(id);
      refreshLists();
      showToast(`Pooja service deleted.`);
    }
  };

  const handleDeleteTour = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete tour "${name}"?`)) {
      StoreService.deleteTour(id);
      refreshLists();
      showToast(`Tour service deleted.`);
    }
  };

  const openNewPoojaModal = () => {
    setEditingPooja({
      id: '',
      name: '',
      hindiName: '',
      slug: '',
      categoryId: 'cat-temple',
      categoryName: 'Temple Pooja Services',
      shortDescription: '',
      description: '',
      templeName: 'Mahakaleshwar Temple',
      location: 'Mahakal Marg, Ujjain',
      city: 'Ujjain',
      state: 'Madhya Pradesh',
      country: 'India',
      duration: '2 Hours',
      price: null,
      priceType: 'Custom / On Request',
      featuredImage: '/assets/images/pooja_rudrabhishek_1786196070818.jpg',
      isFeatured: false,
      isPublished: true,
      seoTitle: '',
      metaDescription: '',
      focusKeyword: '',
      secondaryKeywords: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setEditingTour(null);
    setIsModalOpen(true);
  };

  const openNewTourModal = () => {
    setEditingTour({
      id: '',
      name: '',
      slug: '',
      category: 'Circuit Pilgrimage',
      shortDescription: '',
      description: '',
      startingPoint: 'Ujjain',
      endingPoint: 'Ujjain',
      duration: '2 Days / 1 Night',
      destinations: ['Ujjain'],
      placesCovered: ['Mahakaleshwar', 'Harsiddhi', 'Kalbhairav'],
      templesCovered: ['Mahakaleshwar', 'Harsiddhi'],
      itinerary: [
        {
          dayNumber: 1,
          title: 'Day 1: Arrival & Holy Darshan',
          description: 'Darshan at Mahakaleshwar, Harsiddhi Shaktipeeth, and Ramghat Aarti.',
        },
      ],
      price: null,
      priceType: 'On Request',
      featuredImage: '/assets/images/header_bg_spiritual_1786196057015.jpg',
      isFeatured: false,
      isPublished: true,
      seoTitle: '',
      metaDescription: '',
      focusKeyword: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setEditingPooja(null);
    setIsModalOpen(true);
  };

  const savePoojaService = (p: PoojaService) => {
    StoreService.savePooja(p);
    refreshLists();
    setIsModalOpen(false);
    showToast('Pooja service saved successfully!');
  };

  const saveTourService = (t: Tour) => {
    StoreService.saveTour(t);
    refreshLists();
    setIsModalOpen(false);
    showToast('Spiritual tour saved successfully!');
  };

  const filteredPoojas = poojas.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTours = tours.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.startingPoint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <span>Service Pages Management (Pooja & Tours)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
              SEO/AEO/GEO Enabled
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">Add, edit, or remove Pooja rituals and Tour circuits with image and SEO controls.</p>
        </div>

        <div className="flex items-center gap-2">
          {serviceType === 'pooja' ? (
            <button
              onClick={openNewPoojaModal}
              className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Pooja</span>
            </button>
          ) : (
            <button
              onClick={openNewTourModal}
              className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Spiritual Tour</span>
            </button>
          )}
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setServiceType('pooja')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              serviceType === 'pooja'
                ? 'bg-[#121212] dark:bg-amber-700 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Pooja Services ({poojas.length})</span>
          </button>

          <button
            onClick={() => setServiceType('tour')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              serviceType === 'tour'
                ? 'bg-[#121212] dark:bg-amber-700 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Spiritual Tours & Yatras ({tours.length})</span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${serviceType === 'pooja' ? 'Poojas' : 'Tours'}...`}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs"
          />
        </div>
      </div>

      {/* Grid: Pooja Services */}
      {serviceType === 'pooja' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPoojas.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-[#1C1917] rounded-2xl border border-[#121212]/10 dark:border-stone-800 p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-2">
                {p.featuredImage && (
                  <div className="h-32 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img src={p.featuredImage} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">{p.name}</h3>
                    {p.hindiName && <div className="text-xs text-amber-700 dark:text-amber-400 font-serif">{p.hindiName}</div>}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${p.isPublished ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-stone-200 text-stone-700'}`}>
                    {p.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  <span>{p.city} • {p.templeName || 'Sacred Sanctum'}</span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {p.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-800 dark:text-amber-300 font-mono">
                  {p.price ? `₹${p.price}` : p.priceType || 'On Request'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingPooja(p);
                      setEditingTour(null);
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeletePooja(p.id, p.name)}
                    className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950 hover:bg-red-100 text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid: Tour Services */}
      {serviceType === 'tour' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTours.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-[#1C1917] rounded-2xl border border-[#121212]/10 dark:border-stone-800 p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-2">
                {t.featuredImage && (
                  <div className="h-32 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img src={t.featuredImage} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">{t.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${t.isPublished ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-stone-200 text-stone-700'}`}>
                    {t.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>{t.duration} • Starts: {t.startingPoint}</span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {t.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-800 dark:text-amber-300 font-mono">
                  {t.price ? `₹${t.price}` : t.priceType || 'On Request'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingTour(t);
                      setEditingPooja(null);
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTour(t.id, t.name)}
                    className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950 hover:bg-red-100 text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 my-8">
            
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
                {editingPooja
                  ? editingPooja.id ? 'Edit Pooja Service' : 'Add New Pooja Service'
                  : editingTour?.id ? 'Edit Spiritual Tour' : 'Add New Spiritual Tour'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form for Pooja */}
            {editingPooja && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  savePoojaService(editingPooja);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Pooja Name *</label>
                    <input
                      type="text"
                      required
                      value={editingPooja.name}
                      onChange={(e) => setEditingPooja({ ...editingPooja, name: e.target.value })}
                      placeholder="e.g. Rudrabhishek Pooja"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Hindi Name</label>
                    <input
                      type="text"
                      value={editingPooja.hindiName || ''}
                      onChange={(e) => setEditingPooja({ ...editingPooja, hindiName: e.target.value })}
                      placeholder="रुद्राभिषेक पूजा"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-serif"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Slug</label>
                    <input
                      type="text"
                      value={editingPooja.slug}
                      onChange={(e) => setEditingPooja({ ...editingPooja, slug: e.target.value })}
                      placeholder="rudrabhishek-pooja-ujjain"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Temple / Shrine Name</label>
                    <input
                      type="text"
                      value={editingPooja.templeName || ''}
                      onChange={(e) => setEditingPooja({ ...editingPooja, templeName: e.target.value })}
                      placeholder="Mahakaleshwar Temple"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">City</label>
                    <input
                      type="text"
                      value={editingPooja.city}
                      onChange={(e) => setEditingPooja({ ...editingPooja, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Duration</label>
                    <input
                      type="text"
                      value={editingPooja.duration || ''}
                      onChange={(e) => setEditingPooja({ ...editingPooja, duration: e.target.value })}
                      placeholder="e.g. 2 Hours"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Short Description</label>
                  <textarea
                    value={editingPooja.shortDescription}
                    onChange={(e) => setEditingPooja({ ...editingPooja, shortDescription: e.target.value })}
                    rows={2}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Full Detailed Description</label>
                  <textarea
                    value={editingPooja.description || ''}
                    onChange={(e) => setEditingPooja({ ...editingPooja, description: e.target.value })}
                    rows={4}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={editingPooja.featuredImage || ''}
                    onChange={(e) => setEditingPooja({ ...editingPooja, featuredImage: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                  />
                </div>

                {/* SEO/AEO/GEO Fields */}
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-3">
                  <h4 className="font-serif font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-amber-700" />
                    <span>SEO / AEO / GEO Service Enablement</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">SEO Title</label>
                      <input
                        type="text"
                        value={editingPooja.seoTitle || ''}
                        onChange={(e) => setEditingPooja({ ...editingPooja, seoTitle: e.target.value })}
                        placeholder="Rudrabhishek Pooja in Ujjain | Book Online"
                        className="w-full p-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Focus Keyword</label>
                      <input
                        type="text"
                        value={editingPooja.focusKeyword || ''}
                        onChange={(e) => setEditingPooja({ ...editingPooja, focusKeyword: e.target.value })}
                        placeholder="Rudrabhishek Pooja Ujjain"
                        className="w-full p-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPooja.isPublished}
                      onChange={(e) => setEditingPooja({ ...editingPooja, isPublished: e.target.checked })}
                      className="w-4 h-4 accent-amber-700 rounded"
                    />
                    <span className="font-semibold text-stone-800 dark:text-stone-200">Publish Immediately</span>
                  </label>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Service</span>
                  </button>
                </div>
              </form>
            )}

            {/* Modal Form for Tour */}
            {editingTour && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveTourService(editingTour);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Tour Title *</label>
                    <input
                      type="text"
                      required
                      value={editingTour.name}
                      onChange={(e) => setEditingTour({ ...editingTour, name: e.target.value })}
                      placeholder="e.g. Ujjain Spiritual Tour"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingTour.category || ''}
                      onChange={(e) => setEditingTour({ ...editingTour, category: e.target.value })}
                      placeholder="Circuit Pilgrimage"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Starting Point</label>
                    <input
                      type="text"
                      value={editingTour.startingPoint}
                      onChange={(e) => setEditingTour({ ...editingTour, startingPoint: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Duration</label>
                    <input
                      type="text"
                      value={editingTour.duration || ''}
                      onChange={(e) => setEditingTour({ ...editingTour, duration: e.target.value })}
                      placeholder="2 Days / 1 Night"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Short Description</label>
                  <textarea
                    value={editingTour.shortDescription}
                    onChange={(e) => setEditingTour({ ...editingTour, shortDescription: e.target.value })}
                    rows={2}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={editingTour.featuredImage || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, featuredImage: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingTour.isPublished}
                      onChange={(e) => setEditingTour({ ...editingTour, isPublished: e.target.checked })}
                      className="w-4 h-4 accent-amber-700 rounded"
                    />
                    <span className="font-semibold text-stone-800 dark:text-stone-200">Publish Immediately</span>
                  </label>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Tour</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
