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
  AlertCircle,
  AlertTriangle,
  ShieldCheck,
  X,
  Search,
  Image as ImageIcon,
  Globe,
  MapPin,
  Clock,
  IndianRupee,
  HelpCircle,
  Sparkles,
  Filter,
  ChevronUp,
  ChevronDown,
  Power,
} from 'lucide-react';

export interface ServiceAudit {
  status: 'Verified' | 'Incomplete' | 'Missing';
  score: number;
  issues: string[];
}

export function auditPoojaService(p: PoojaService): ServiceAudit {
  const issues: string[] = [];
  let score = 100;

  if (!p.name || p.name.trim().length === 0) {
    issues.push('Missing service name');
    score -= 35;
  }
  if (!p.shortDescription || p.shortDescription.trim().length < 15) {
    issues.push('Missing or too brief short description');
    score -= 20;
  }
  if (!p.description || p.description.trim().length < 40) {
    issues.push('Missing or incomplete detailed description');
    score -= 15;
  }
  if (!p.featuredImage || p.featuredImage.trim().length === 0) {
    issues.push('Missing featured image');
    score -= 15;
  }
  if (!p.templeName || p.templeName.trim().length === 0) {
    issues.push('Missing temple or sanctum name');
    score -= 10;
  }
  if (!p.duration) {
    issues.push('Missing duration info');
    score -= 5;
  }
  if (!p.seoTitle && !p.metaDescription) {
    issues.push('Missing SEO title / meta tags');
    score -= 5;
  }

  score = Math.max(0, score);
  let status: 'Verified' | 'Incomplete' | 'Missing';
  if (score >= 85 && issues.length === 0) {
    status = 'Verified';
  } else if (score < 50 || !p.name || (!p.shortDescription && !p.description)) {
    status = 'Missing';
  } else {
    status = 'Incomplete';
  }

  return { status, score, issues };
}

export function auditTourService(t: Tour): ServiceAudit {
  const issues: string[] = [];
  let score = 100;

  if (!t.name || t.name.trim().length === 0) {
    issues.push('Missing tour name');
    score -= 35;
  }
  if (!t.shortDescription || t.shortDescription.trim().length < 15) {
    issues.push('Missing or too brief summary');
    score -= 20;
  }
  if (!t.featuredImage || t.featuredImage.trim().length === 0) {
    issues.push('Missing featured image');
    score -= 15;
  }
  if (!t.destinations || t.destinations.length === 0) {
    issues.push('Missing destinations tags');
    score -= 10;
  }
  if (!t.placesCovered || t.placesCovered.length === 0) {
    issues.push('Missing places covered list');
    score -= 10;
  }
  if (!t.itinerary || t.itinerary.length === 0) {
    issues.push('Missing itinerary breakdown');
    score -= 10;
  }
  if (!t.seoTitle && !t.metaDescription) {
    issues.push('Missing SEO title / meta tags');
    score -= 5;
  }

  score = Math.max(0, score);
  let status: 'Verified' | 'Incomplete' | 'Missing';
  if (score >= 85 && issues.length === 0) {
    status = 'Verified';
  } else if (score < 50 || !t.name || (!t.shortDescription && !t.description)) {
    status = 'Missing';
  } else {
    status = 'Incomplete';
  }

  return { status, score, issues };
}

const AuditBadge: React.FC<{ audit: ServiceAudit; onClick: () => void }> = ({ audit, onClick }) => {
  let badgeStyle = '';
  let IconComponent = CheckCircle2;

  if (audit.status === 'Verified') {
    badgeStyle = 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200 dark:hover:bg-emerald-900';
    IconComponent = CheckCircle2;
  } else if (audit.status === 'Incomplete') {
    badgeStyle = 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-200 dark:hover:bg-amber-900';
    IconComponent = AlertCircle;
  } else {
    badgeStyle = 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800 hover:bg-red-200 dark:hover:bg-red-900';
    IconComponent = AlertTriangle;
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title="Click to audit & edit this service immediately"
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${badgeStyle}`}
    >
      <IconComponent className="w-3.5 h-3.5" />
      <span>{audit.status}</span>
      {audit.issues.length > 0 && (
        <span className="text-[10px] opacity-85 bg-black/10 dark:bg-white/10 px-1.5 py-0.2 rounded-full font-mono">
          {audit.issues.length} {audit.issues.length === 1 ? 'issue' : 'issues'}
        </span>
      )}
    </button>
  );
};

export const AdminServicesManager: React.FC = () => {
  const [serviceType, setServiceType] = useState<'pooja' | 'tour'>('pooja');
  const [searchQuery, setSearchQuery] = useState('');
  const [auditFilter, setAuditFilter] = useState<'ALL' | 'Verified' | 'Incomplete' | 'Missing'>('ALL');
  const [poojas, setPoojas] = useState<PoojaService[]>(StoreService.getPoojas(false));
  const [tours, setTours] = useState<Tour[]>(StoreService.getTours(false));

  const [editingPooja, setEditingPooja] = useState<PoojaService | null>(null);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isPooja: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    
    // Append the existing URL FIRST so multer can access it before processing the file
    const existingUrl = isPooja ? editingPooja?.featuredImage : editingTour?.featuredImage;
    if (existingUrl) {
      formData.append('existingImageUrl', existingUrl);
    }
    
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        if (isPooja && editingPooja) {
          setEditingPooja({ ...editingPooja, featuredImage: data.url });
        } else if (!isPooja && editingTour) {
          setEditingTour({ ...editingTour, featuredImage: data.url });
        }
        showToast('Image uploaded successfully');
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

  const togglePoojaPublish = (id: string) => {
    const item = poojas.find((p) => p.id === id);
    if (!item) return;
    const updated = StoreService.savePooja({ id, isPublished: !item.isPublished });
    setPoojas((prev) => prev.map((p) => (p.id === id ? updated : p)));
    showToast(`Pooja "${item.name}" is now ${updated.isPublished ? 'published' : 'hidden/draft'}.`);
  };

  const movePoojaOrder = (id: string, direction: 'up' | 'down') => {
    const newList = [...poojas];
    const index = newList.findIndex((p) => p.id === id);
    if (index === -1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newList.length) return;

    // Swap items
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;

    // Reassign sort orders
    newList.forEach((item, idx) => {
      item.sortOrder = idx + 1;
      StoreService.savePooja({ id: item.id, sortOrder: item.sortOrder });
    });

    setPoojas(newList);
    showToast('Pooja sequence rearranged.');
  };

  const toggleTourPublish = (id: string) => {
    const item = tours.find((t) => t.id === id);
    if (!item) return;
    const updated = StoreService.saveTour({ id, isPublished: !item.isPublished });
    setTours((prev) => prev.map((t) => (t.id === id ? updated : t)));
    showToast(`Tour "${item.name}" is now ${updated.isPublished ? 'published' : 'hidden/draft'}.`);
  };

  const moveTourOrder = (id: string, direction: 'up' | 'down') => {
    const newList = [...tours];
    const index = newList.findIndex((t) => t.id === id);
    if (index === -1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newList.length) return;

    // Swap items
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;

    // Reassign sort orders
    newList.forEach((item, idx) => {
      item.sortOrder = idx + 1;
      StoreService.saveTour({ id: item.id, sortOrder: item.sortOrder });
    });

    setTours(newList);
    showToast('Tour sequence rearranged.');
  };

  const openNewPoojaModal = () => {
    const newId = `pooja-${Date.now()}`;
    setEditingPooja({
      id: newId,
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
    const newId = `tour-${Date.now()}`;
    setEditingTour({
      id: newId,
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
    const cleanId = p.id && p.id.trim() ? p.id.trim() : `pooja-${Date.now()}`;
    const cleanName = p.name && p.name.trim() ? p.name.trim() : 'New Pooja Ritual';
    const fallbackSlug = cleanName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-|-$/g, '') || `pooja-${Date.now()}`;
    const cleanSlug = p.slug && p.slug.trim()
      ? p.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
      : fallbackSlug;

    const payload = {
      ...p,
      id: cleanId,
      name: cleanName,
      slug: cleanSlug,
      urlSlug: p.urlSlug || `/pooja/${cleanSlug}`,
      h1: p.h1 || cleanName,
    };

    StoreService.savePooja(payload);
    refreshLists();
    setIsModalOpen(false);
    showToast('Pooja service saved and synced to database successfully!');
  };

  const saveTourService = (t: Tour) => {
    const cleanId = t.id && t.id.trim() ? t.id.trim() : `tour-${Date.now()}`;
    const cleanName = (t.name || (t as any).title || '').trim() || 'New Spiritual Tour';
    const fallbackSlug = cleanName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-|-$/g, '') || `tour-${Date.now()}`;
    const cleanSlug = t.slug && t.slug.trim()
      ? t.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '')
      : fallbackSlug;

    const payload = {
      ...t,
      id: cleanId,
      name: cleanName,
      slug: cleanSlug,
    };

    StoreService.saveTour(payload);
    refreshLists();
    setIsModalOpen(false);
    showToast('Spiritual tour saved and synced to database successfully!');
  };

  // Audited Poojas & Tours
  const poojasWithAudit = poojas.map((p) => ({
    item: p,
    audit: auditPoojaService(p),
  }));

  const toursWithAudit = tours.map((t) => ({
    item: t,
    audit: auditTourService(t),
  }));

  const currentAuditedItems = serviceType === 'pooja' ? poojasWithAudit : toursWithAudit;

  // Counts for audit filters
  const verifiedCount = currentAuditedItems.filter((i) => i.audit.status === 'Verified').length;
  const incompleteCount = currentAuditedItems.filter((i) => i.audit.status === 'Incomplete').length;
  const missingCount = currentAuditedItems.filter((i) => i.audit.status === 'Missing').length;

  const filteredPoojasWithAudit = poojasWithAudit.filter(({ item: p, audit }) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudit = auditFilter === 'ALL' || audit.status === auditFilter;
    return matchesSearch && matchesAudit;
  });

  const filteredToursWithAudit = toursWithAudit.filter(({ item: t, audit }) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.startingPoint.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudit = auditFilter === 'ALL' || audit.status === auditFilter;
    return matchesSearch && matchesAudit;
  });

  const activeAudit = editingPooja
    ? auditPoojaService(editingPooja)
    : editingTour
    ? auditTourService(editingTour)
    : null;

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <span>Service Pages Management (Pooja & Tours)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
              Audit & SEO Enabled
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Monitor catalog completeness with audit status badges. Click any badge to immediately edit & fix missing details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {serviceType === 'pooja' ? (
            <button
              onClick={openNewPoojaModal}
              className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Pooja</span>
            </button>
          ) : (
            <button
              onClick={openNewTourModal}
              className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
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

      {/* Audit Summary & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800/60 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setServiceType('pooja');
                setAuditFilter('ALL');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                serviceType === 'pooja'
                  ? 'bg-[#121212] dark:bg-amber-700 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Pooja Services ({poojas.length})</span>
            </button>

            <button
              onClick={() => {
                setServiceType('tour');
                setAuditFilter('ALL');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                serviceType === 'tour'
                  ? 'bg-[#121212] dark:bg-amber-700 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Spiritual Tours & Yatras ({tours.length})</span>
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${serviceType === 'pooja' ? 'Poojas' : 'Tours'}...`}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Audit Status:
            </span>

            <button
              onClick={() => setAuditFilter('ALL')}
              className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
                auditFilter === 'ALL'
                  ? 'bg-stone-900 text-white dark:bg-amber-600'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              All ({currentAuditedItems.length})
            </button>

            <button
              onClick={() => setAuditFilter('Verified')}
              className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer ${
                auditFilter === 'Verified'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              Verified ({verifiedCount})
            </button>

            <button
              onClick={() => setAuditFilter('Incomplete')}
              className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer ${
                auditFilter === 'Incomplete'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 hover:bg-amber-100'
              }`}
            >
              <AlertCircle className="w-3 h-3 text-amber-500" />
              Incomplete ({incompleteCount})
            </button>

            <button
              onClick={() => setAuditFilter('Missing')}
              className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer ${
                auditFilter === 'Missing'
                  ? 'bg-red-700 text-white'
                  : 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/50 hover:bg-red-100'
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-red-500" />
              Missing Data ({missingCount})
            </button>
          </div>

          <div className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
            Showing {serviceType === 'pooja' ? filteredPoojasWithAudit.length : filteredToursWithAudit.length} of {currentAuditedItems.length}
          </div>
        </div>
      </div>

      {/* Grid: Pooja Services */}
      {serviceType === 'pooja' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPoojasWithAudit.map(({ item: p, audit }) => (
            <div
              key={p.id}
              className="bg-white dark:bg-[#1C1917] rounded-2xl border border-[#121212]/10 dark:border-stone-800 p-4 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                {p.featuredImage && (
                  <div className="h-32 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
                    <img src={p.featuredImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 right-2">
                      <AuditBadge
                        audit={audit}
                        onClick={() => {
                          setEditingPooja(p);
                          setEditingTour(null);
                          setIsModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">{p.name}</h3>
                    {p.hindiName && <div className="text-xs text-amber-700 dark:text-amber-400 font-serif">{p.hindiName}</div>}
                  </div>
                  {!p.featuredImage && (
                    <AuditBadge
                      audit={audit}
                      onClick={() => {
                        setEditingPooja(p);
                        setEditingTour(null);
                        setIsModalOpen(true);
                      }}
                    />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${p.isPublished ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-stone-200 text-stone-700'}`}>
                    {p.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">ID: {p.id}</span>
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  <span>{p.city} • {p.templeName || 'Sacred Sanctum'}</span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {p.shortDescription || <span className="italic text-red-500">Short description missing</span>}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-1 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => movePoojaOrder(p.id, 'up')}
                    disabled={poojas.findIndex(item => item.id === p.id) === 0}
                    className="p-1 rounded-md bg-stone-100 dark:bg-stone-850 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-stone-700 dark:text-stone-300 cursor-pointer border border-transparent hover:border-stone-300"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    value={p.sortOrder || 0}
                    onChange={(e) => {
                      const newOrder = Number(e.target.value);
                      StoreService.savePooja({ id: p.id, sortOrder: newOrder });
                      refreshLists();
                    }}
                    className="w-10 py-0.5 text-center font-bold text-[11px] border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 text-stone-900 dark:text-stone-100 rounded-md outline-none"
                    title="Sequence Number"
                  />
                  <button
                    onClick={() => movePoojaOrder(p.id, 'down')}
                    disabled={poojas.findIndex(item => item.id === p.id) === poojas.length - 1}
                    className="p-1 rounded-md bg-stone-100 dark:bg-stone-850 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-stone-700 dark:text-stone-300 cursor-pointer border border-transparent hover:border-stone-300"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => togglePoojaPublish(p.id)}
                    title={p.isPublished ? 'Draft / Hide from site' : 'Publish / Show on site'}
                    className={`p-1 rounded-md border text-xs transition-colors cursor-pointer ${
                      p.isPublished
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-350 dark:border-emerald-900'
                        : 'bg-stone-100 text-stone-500 border-stone-300 dark:bg-stone-800 dark:text-stone-400'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingPooja(p);
                      setEditingTour(null);
                      setIsModalOpen(true);
                    }}
                    className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 hover:bg-amber-100 font-semibold text-[10px] flex items-center gap-0.5 border border-amber-200 dark:border-amber-800 cursor-pointer"
                  >
                    <Edit3 className="w-2.5 h-2.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeletePooja(p.id, p.name)}
                    className="p-1 rounded bg-red-50 dark:bg-red-950 hover:bg-red-100 text-red-600 dark:text-red-400 cursor-pointer border border-red-200/20 dark:border-red-900/30"
                    title="Delete Pooja Service"
                  >
                    <Trash2 className="w-3 h-3" />
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
          {filteredToursWithAudit.map(({ item: t, audit }) => (
            <div
              key={t.id}
              className="bg-white dark:bg-[#1C1917] rounded-2xl border border-[#121212]/10 dark:border-stone-800 p-4 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                {t.featuredImage && (
                  <div className="h-32 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
                    <img src={t.featuredImage} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 right-2">
                      <AuditBadge
                        audit={audit}
                        onClick={() => {
                          setEditingTour(t);
                          setEditingPooja(null);
                          setIsModalOpen(true);
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">{t.name}</h3>
                  {!t.featuredImage && (
                    <AuditBadge
                      audit={audit}
                      onClick={() => {
                        setEditingTour(t);
                        setEditingPooja(null);
                        setIsModalOpen(true);
                      }}
                    />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${t.isPublished ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-stone-200 text-stone-700'}`}>
                    {t.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">{t.category || 'Tour'}</span>
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>{t.duration} • Starts: {t.startingPoint}</span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {t.shortDescription || <span className="italic text-red-500">Summary description missing</span>}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-1 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveTourOrder(t.id, 'up')}
                    disabled={tours.findIndex(item => item.id === t.id) === 0}
                    className="p-1 rounded-md bg-stone-100 dark:bg-stone-855 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-stone-700 dark:text-stone-300 cursor-pointer border border-transparent hover:border-stone-300"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    value={t.sortOrder || 0}
                    onChange={(e) => {
                      const newOrder = Number(e.target.value);
                      StoreService.saveTour({ id: t.id, sortOrder: newOrder });
                      refreshLists();
                    }}
                    className="w-10 py-0.5 text-center font-bold text-[11px] border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-850 text-stone-900 dark:text-stone-100 rounded-md outline-none"
                    title="Sequence Number"
                  />
                  <button
                    onClick={() => moveTourOrder(t.id, 'down')}
                    disabled={tours.findIndex(item => item.id === t.id) === tours.length - 1}
                    className="p-1 rounded-md bg-stone-100 dark:bg-stone-855 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none text-stone-700 dark:text-stone-300 cursor-pointer border border-transparent hover:border-stone-300"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleTourPublish(t.id)}
                    title={t.isPublished ? 'Draft / Hide from site' : 'Publish / Show on site'}
                    className={`p-1 rounded-md border text-xs transition-colors cursor-pointer ${
                      t.isPublished
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-350 dark:border-emerald-900'
                        : 'bg-stone-100 text-stone-500 border-stone-300 dark:bg-stone-800 dark:text-stone-400'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingTour(t);
                      setEditingPooja(null);
                      setIsModalOpen(true);
                    }}
                    className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 hover:bg-amber-100 font-semibold text-[10px] flex items-center gap-0.5 border border-amber-200 dark:border-amber-800 cursor-pointer"
                  >
                    <Edit3 className="w-2.5 h-2.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteTour(t.id, t.name)}
                    className="p-1 rounded bg-red-50 dark:bg-red-950 hover:bg-red-100 text-red-600 dark:text-red-400 cursor-pointer border border-red-200/20 dark:border-red-900/30"
                    title="Delete Tour Service"
                  >
                    <Trash2 className="w-3 h-3" />
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
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">
                  {editingPooja
                    ? editingPooja.id ? 'Edit Pooja Service' : 'Add New Pooja Service'
                    : editingTour?.id ? 'Edit Spiritual Tour' : 'Add New Spiritual Tour'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Audit Findings Panel inside Modal */}
            {activeAudit && (
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  activeAudit.status === 'Verified'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                    : activeAudit.status === 'Incomplete'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100'
                    : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
                    {activeAudit.status === 'Verified' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : activeAudit.status === 'Incomplete' ? (
                      <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    <span>Audit Status: {activeAudit.status} ({activeAudit.score}% completeness)</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 font-bold">
                    {activeAudit.issues.length} {activeAudit.issues.length === 1 ? 'Finding' : 'Findings'}
                  </span>
                </div>

                {activeAudit.issues.length > 0 ? (
                  <div className="space-y-1 pt-1">
                    <p className="text-xs font-semibold">The following items require attention to reach Verified status:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs opacity-90 pl-2">
                      {activeAudit.issues.map((issue, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                    ✨ Perfect! All essential details, images, and SEO configuration passed audit.
                  </p>
                )}
              </div>
            )}

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
                      onChange={(e) => {
                        const newName = e.target.value;
                        const autoSlug = newName
                          .toLowerCase()
                          .trim()
                          .replace(/[^a-z0-9-]+/g, '-')
                          .replace(/^-|-$/g, '');
                        setEditingPooja({
                          ...editingPooja,
                          name: newName,
                          ...(!editingPooja.slug || editingPooja.slug.startsWith('pooja-')
                            ? { slug: autoSlug ? `${autoSlug}-ujjain` : '' }
                            : {}),
                        });
                      }}
                      placeholder="e.g. Rudrabhishek Pooja"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Pooja Category *</label>
                    <select
                      value={editingPooja.categoryId || 'cat-temple'}
                      onChange={(e) => {
                        const catId = e.target.value;
                        let catName = 'Temple Pooja Services';
                        if (catId === 'cat-dosh') catName = 'Dosh Shanti & Special Poojas';
                        else if (catId === 'cat-jaap-havan') catName = 'Jaap & Havan Services';
                        else if (catId === 'cat-special-jaap') catName = 'Special Jaap & Path';
                        else if (catId === 'cat-pitru') catName = 'Pitru Rituals';
                        else if (catId === 'cat-special-vedic') catName = 'Special Vedic Rituals';
                        
                        setEditingPooja({
                          ...editingPooja,
                          categoryId: catId,
                          categoryName: catName
                        });
                      }}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-semibold"
                    >
                      <option value="cat-temple">Temple Pooja Services</option>
                      <option value="cat-dosh">Dosh Shanti & Special Poojas</option>
                      <option value="cat-jaap-havan">Jaap & Havan Services</option>
                      <option value="cat-special-jaap">Special Jaap & Path</option>
                      <option value="cat-pitru">Pitru Rituals</option>
                      <option value="cat-special-vedic">Special Vedic Rituals</option>
                    </select>
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

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Sort Order / Sequence Number</label>
                    <input
                      type="number"
                      value={editingPooja.sortOrder || 0}
                      onChange={(e) => setEditingPooja({ ...editingPooja, sortOrder: Number(e.target.value) })}
                      placeholder="e.g. 1"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold"
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
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Upload Featured Image</label>
                  {editingPooja.featuredImage && (
                    <div className="mb-2">
                      <img src={editingPooja.featuredImage} alt="Preview" className="h-20 rounded shadow" />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      disabled={isUploading}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                    />
                    {isUploading && <span className="text-sm text-stone-500">Uploading...</span>}
                  </div>
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
                    className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs flex items-center gap-2 cursor-pointer"
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
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Ending Point</label>
                    <input
                      type="text"
                      value={editingTour.endingPoint || ''}
                      onChange={(e) => setEditingTour({ ...editingTour, endingPoint: e.target.value })}
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

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Price (Optional)</label>
                    <input
                      type="number"
                      value={editingTour.price || ''}
                      onChange={(e) => setEditingTour({ ...editingTour, price: e.target.value ? Number(e.target.value) : null })}
                      placeholder="e.g. 4500"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Price Type</label>
                    <select
                      value={editingTour.priceType || 'On Request'}
                      onChange={(e) => setEditingTour({ ...editingTour, priceType: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    >
                      <option value="Fixed">Fixed Price</option>
                      <option value="Starting From">Starting From</option>
                      <option value="On Request">On Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Destinations (comma separated)</label>
                    <input
                      type="text"
                      value={editingTour.destinations ? editingTour.destinations.join(', ') : ''}
                      onChange={(e) => setEditingTour({ ...editingTour, destinations: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      placeholder="e.g. Ujjain, Omkareshwar"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Places Covered (comma separated)</label>
                    <input
                      type="text"
                      value={editingTour.placesCovered ? editingTour.placesCovered.join(', ') : ''}
                      onChange={(e) => setEditingTour({ ...editingTour, placesCovered: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      placeholder="e.g. Mahakaleshwar Darshan, Ramghat"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Temples Covered (comma separated)</label>
                    <input
                      type="text"
                      value={editingTour.templesCovered ? editingTour.templesCovered.join(', ') : ''}
                      onChange={(e) => setEditingTour({ ...editingTour, templesCovered: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      placeholder="e.g. Mahakaleshwar, Harsiddhi"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Sort Order / Sequence Number</label>
                    <input
                      type="number"
                      value={editingTour.sortOrder || 0}
                      onChange={(e) => setEditingTour({ ...editingTour, sortOrder: Number(e.target.value) })}
                      placeholder="e.g. 1"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold"
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
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Full Detailed Description</label>
                  <textarea
                    value={editingTour.description || ''}
                    onChange={(e) => setEditingTour({ ...editingTour, description: e.target.value })}
                    rows={4}
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Upload Featured Image</label>
                  {editingTour.featuredImage && (
                    <div className="mb-2">
                      <img src={editingTour.featuredImage} alt="Preview" className="h-20 rounded shadow" />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      disabled={isUploading}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                    />
                    {isUploading && <span className="text-sm text-stone-500">Uploading...</span>}
                  </div>
                </div>

                {/* SEO/AEO/GEO Fields for Tour */}
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-3">
                  <h4 className="font-serif font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-amber-700" />
                    <span>SEO / AEO / GEO Tour Enablement</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">SEO Title</label>
                      <input
                        type="text"
                        value={editingTour.seoTitle || ''}
                        onChange={(e) => setEditingTour({ ...editingTour, seoTitle: e.target.value })}
                        placeholder="Ujjain Spiritual Tour | Devotional Itinerary"
                        className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Focus Keyword</label>
                      <input
                        type="text"
                        value={editingTour.focusKeyword || ''}
                        onChange={(e) => setEditingTour({ ...editingTour, focusKeyword: e.target.value })}
                        placeholder="ujjain spiritual tour"
                        className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Meta Description</label>
                    <textarea
                      value={editingTour.metaDescription || ''}
                      onChange={(e) => setEditingTour({ ...editingTour, metaDescription: e.target.value })}
                      rows={2}
                      placeholder="Enter optimized meta description..."
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                    />
                  </div>
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
                    className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs flex items-center gap-2 cursor-pointer"
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
