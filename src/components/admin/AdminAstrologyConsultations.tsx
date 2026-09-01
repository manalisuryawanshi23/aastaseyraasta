import React, { useState, useMemo, useEffect } from 'react';
import { StoreService } from '../../services/store';
import {
  AstrologyConsultation,
  AstrologyConsultationStatus,
  PreferredCallbackTime,
  StaffUser,
} from '../../types';
import {
  Sparkles,
  Search,
  Filter,
  Download,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Trash2,
  Eye,
  X,
  Save,
  User,
  ShieldCheck,
  HelpCircle,
  Sun,
  Sunset,
  PhoneCall,
  RefreshCw,
  FileText,
} from 'lucide-react';

interface AdminAstrologyConsultationsProps {
  currentStaffUser: StaffUser | null;
}

export const AdminAstrologyConsultations: React.FC<AdminAstrologyConsultationsProps> = ({
  currentStaffUser,
}) => {
  const [consultations, setConsultations] = useState<AstrologyConsultation[]>(() =>
    StoreService.getAstrologyConsultations()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<AstrologyConsultation | null>(null);

  // Detail Modal Editable State
  const [editStatus, setEditStatus] = useState<AstrologyConsultationStatus>('New');
  const [editNotes, setEditNotes] = useState('');
  const [newFollowUpNote, setNewFollowUpNote] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const refreshData = () => {
    setConsultations(StoreService.getAstrologyConsultations());
  };

  useEffect(() => {
    const handleSync = () => refreshData();
    window.addEventListener('aastha:data-synced', handleSync);
    window.addEventListener('aastha:astrology-updated', handleSync);
    return () => {
      window.removeEventListener('aastha:data-synced', handleSync);
      window.removeEventListener('aastha:astrology-updated', handleSync);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Metrics Count
  const metrics = useMemo(() => {
    const total = consultations.length;
    const isNew = consultations.filter((c) => c.status === 'New').length;
    const contacted = consultations.filter((c) => c.status === 'Contacted').length;
    const scheduled = consultations.filter((c) => c.status === 'Consultation Scheduled').length;
    const completed = consultations.filter((c) => c.status === 'Completed').length;
    return { total, isNew, contacted, scheduled, completed };
  }, [consultations]);

  // Filtered List
  const filteredList = useMemo(() => {
    return consultations.filter((item) => {
      const matchesSearch =
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.includes(searchQuery) ||
        item.birthPlace.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.concern.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesTime = timeFilter === 'All' || item.preferredCallbackTime === timeFilter;

      return matchesSearch && matchesStatus && matchesTime;
    });
  }, [consultations, searchQuery, statusFilter, timeFilter]);

  const handleOpenDetail = (item: AstrologyConsultation) => {
    setSelectedItem(item);
    setEditStatus(item.status);
    setEditNotes(item.notes || '');
    setNewFollowUpNote('');
  };

  const handleSaveDetails = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedItem) return;

    let updatedFollowUp = selectedItem.followUpHistory || [];
    if (newFollowUpNote.trim()) {
      updatedFollowUp = [
        ...updatedFollowUp,
        {
          date: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
          note: newFollowUpNote.trim(),
          updatedBy: currentStaffUser?.name || 'Staff',
        },
      ];
    }

    const updated = StoreService.updateAstrologyConsultation(selectedItem.id, {
      status: editStatus,
      notes: editNotes,
      followUpHistory: updatedFollowUp,
    });

    if (updated) {
      setSelectedItem(updated);
      setNewFollowUpNote('');
      refreshData();
      showToast(`Consultation record for ${updated.fullName} updated successfully!`);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete the consultation request for ${name}?`)) {
      StoreService.deleteAstrologyConsultation(id);
      if (selectedItem?.id === id) setSelectedItem(null);
      refreshData();
      showToast(`Consultation request for ${name} deleted.`);
    }
  };

  const handleExportCSV = () => {
    if (consultations.length === 0) {
      alert('No consultation records available to export.');
      return;
    }

    const headers = [
      'ID',
      'Full Name',
      'Age',
      'Mobile Number',
      'Date of Birth',
      'Birth Time',
      'Birth Place',
      'Concern / Problem',
      'Preferred Callback Time',
      'Status',
      'Internal Notes',
      'Submitted At',
    ];

    const rows = filteredList.map((c) => [
      `"${c.id}"`,
      `"${c.fullName.replace(/"/g, '""')}"`,
      `"${c.age}"`,
      `"${c.mobile}"`,
      `"${c.dob}"`,
      `"${c.birthTime}"`,
      `"${c.birthPlace.replace(/"/g, '""')}"`,
      `"${c.concern.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${c.preferredCallbackTime}"`,
      `"${c.status}"`,
      `"${(c.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${c.createdAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `astrology_consultations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: AstrologyConsultationStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Contacted':
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'Consultation Scheduled':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      case 'Completed':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'Closed':
        return 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-400 border-stone-300 dark:border-stone-700';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const getTimeIcon = (time: PreferredCallbackTime) => {
    switch (time) {
      case 'Morning':
        return <Sun className="w-3 h-3 text-amber-600" />;
      case 'Afternoon':
        return <Sun className="w-3 h-3 text-amber-500" />;
      case 'Evening':
        return <Sunset className="w-3 h-3 text-amber-700" />;
      case 'Anytime':
      default:
        return <PhoneCall className="w-3 h-3 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Metrics Bar */}
      <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-amber-600" />
              <span>Astrology Consultations (Devotee CRM)</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Manage free astrology consultation requests, review birth chart details, update follow-up statuses, and connect directly with devotees.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={refreshData}
              className="p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Refresh Records"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium block">Total Consultations</span>
            <span className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-1 block">
              {metrics.total}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-bold block">New / Pending</span>
            <span className="text-xl font-bold font-mono text-amber-800 dark:text-amber-200 mt-1 block">
              {metrics.isNew}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
            <span className="text-[11px] text-blue-700 dark:text-blue-400 font-bold block">Contacted</span>
            <span className="text-xl font-bold font-mono text-blue-800 dark:text-blue-200 mt-1 block">
              {metrics.contacted}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40">
            <span className="text-[11px] text-purple-700 dark:text-purple-400 font-bold block">Scheduled</span>
            <span className="text-xl font-bold font-mono text-purple-800 dark:text-purple-200 mt-1 block">
              {metrics.scheduled}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold block">Completed</span>
            <span className="text-xl font-bold font-mono text-emerald-800 dark:text-emerald-200 mt-1 block">
              {metrics.completed}
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white dark:bg-[#1C1917] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, phone, place, concern..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-500">Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-semibold focus:ring-2 focus:ring-amber-500 outline-none text-xs"
          >
            <option value="All">All Statuses ({consultations.length})</option>
            <option value="New">New ({metrics.isNew})</option>
            <option value="Contacted">Contacted ({metrics.contacted})</option>
            <option value="Consultation Scheduled">Consultation Scheduled ({metrics.scheduled})</option>
            <option value="Completed">Completed ({metrics.completed})</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-semibold focus:ring-2 focus:ring-amber-500 outline-none text-xs"
          >
            <option value="All">All Callback Times</option>
            <option value="Morning">Morning (9 AM – 12 PM)</option>
            <option value="Afternoon">Afternoon (12 PM – 4 PM)</option>
            <option value="Evening">Evening (4 PM – 8 PM)</option>
            <option value="Anytime">Anytime</option>
          </select>
        </div>
      </div>

      {/* Consultations Table */}
      <div className="bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
              No Astrology Consultations Found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'All' || timeFilter !== 'All'
                ? 'Try adjusting your search criteria or active status filter.'
                : 'Free astrology consultation requests submitted by devotees will appear here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-900/80 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Devotee</th>
                  <th className="p-4">Birth Details</th>
                  <th className="p-4">Concern / Query</th>
                  <th className="p-4">Callback Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {filteredList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-amber-50/40 dark:hover:bg-stone-900/40 transition-colors group cursor-pointer"
                    onClick={() => handleOpenDetail(item)}
                  >
                    {/* Devotee Info */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-bold text-stone-900 dark:text-stone-100 text-xs flex items-center gap-1.5">
                          <span>{item.fullName}</span>
                          <span className="text-[10px] font-normal text-stone-400">({item.age} yrs)</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                          <span className="font-mono">{item.mobile}</span>
                        </div>
                      </div>
                    </td>

                    {/* Birth Details */}
                    <td className="p-4">
                      <div className="space-y-0.5 text-[11px]">
                        <div className="font-medium text-stone-800 dark:text-stone-200 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{item.dob}</span>
                          <span className="text-stone-400">•</span>
                          <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{item.birthTime}</span>
                        </div>
                        <div className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                          <span className="truncate max-w-[140px]">{item.birthPlace}</span>
                        </div>
                      </div>
                    </td>

                    {/* Concern */}
                    <td className="p-4">
                      <p className="line-clamp-2 text-stone-700 dark:text-stone-300 max-w-xs text-[11px] leading-relaxed">
                        {item.concern}
                      </p>
                    </td>

                    {/* Preferred Callback Time */}
                    <td className="p-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-bold">
                        {getTimeIcon(item.preferredCallbackTime)}
                        <span>{item.preferredCallbackTime}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(item.status)}`}>
                        {item.status === 'New' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                        <span>{item.status}</span>
                      </span>
                    </td>

                    {/* Date Submitted */}
                    <td className="p-4 text-[11px] text-stone-500 dark:text-stone-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Action Buttons */}
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {/* WhatsApp Button */}
                        <a
                          href={`https://wa.me/${item.mobile.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Jai Shree Mahakal ${item.fullName} ji 🙏\n\nRegarding your Free Astrology Consultation request with Aastha Sey Raasta Seva...`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        {/* Call Button */}
                        <a
                          href={`tel:${item.mobile.replace(/[^0-9]/g, '')}`}
                          className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 hover:bg-amber-100 transition-colors"
                          title="Call Devotee"
                        >
                          <Phone className="w-4 h-4" />
                        </a>

                        {/* View Detail */}
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Delete (Admin Only) */}
                        {currentStaffUser?.role === 'Admin' && (
                          <button
                            onClick={() => handleDelete(item.id, item.fullName)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title="Delete Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── DETAIL & FOLLOW-UP SLIDE-OVER MODAL ── */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto space-y-6 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 flex items-center justify-center font-bold font-serif text-lg">
                  {selectedItem.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <span>{selectedItem.fullName}</span>
                    <span className="text-xs text-stone-400 font-normal">({selectedItem.age} Years)</span>
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    ID: {selectedItem.id} • Submitted: {new Date(selectedItem.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs">
              <div className="flex items-center gap-2 font-mono font-bold text-amber-950 dark:text-amber-200">
                <Phone className="w-4 h-4 text-amber-600" />
                <span>+91 {selectedItem.mobile}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedItem.mobile.replace(/[^0-9]/g, '')}`}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${selectedItem.mobile.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Jai Shree Mahakal ${selectedItem.fullName} ji 🙏\n\nRegarding your Free Astrology Consultation request with Aastha Sey Raasta Seva...`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Birth Details Card */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-2">
                <span className="font-bold text-stone-800 dark:text-stone-200 block text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Birth Chart Details
                </span>
                <div className="space-y-1.5 text-stone-600 dark:text-stone-350">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Date of Birth:</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200">{selectedItem.dob}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Birth Time:</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200">{selectedItem.birthTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Birth Place:</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200">{selectedItem.birthPlace}</span>
                  </div>
                </div>
              </div>

              {/* Callback Preference Card */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-2">
                <span className="font-bold text-stone-800 dark:text-stone-200 block text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Callback Preference
                </span>
                <div className="space-y-1.5 text-stone-600 dark:text-stone-350">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Time Slot:</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1">
                      {getTimeIcon(selectedItem.preferredCallbackTime)}
                      <span>{selectedItem.preferredCallbackTime}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Approx Timing:</span>
                    <span className="font-bold text-stone-800 dark:text-stone-200">
                      {selectedItem.preferredCallbackTime === 'Morning'
                        ? '9 AM – 12 PM'
                        : selectedItem.preferredCallbackTime === 'Afternoon'
                        ? '12 PM – 4 PM'
                        : selectedItem.preferredCallbackTime === 'Evening'
                        ? '4 PM – 8 PM'
                        : 'Available Anytime'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Devotee's Concern Description */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-1.5 text-xs">
              <span className="font-bold text-stone-800 dark:text-stone-200 block text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Devotee's Astrological Query / Concern
              </span>
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-normal bg-white dark:bg-stone-950 p-3 rounded-xl border border-stone-200/60 dark:border-stone-800/80 whitespace-pre-wrap">
                {selectedItem.concern}
              </p>
            </div>

            {/* Status & Notes Management Form */}
            <form onSubmit={handleSaveDetails} className="space-y-4 text-xs pt-2 border-t border-stone-200 dark:border-stone-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status Dropdown */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-stone-800 dark:text-stone-200">
                    Update Consultation Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as AstrologyConsultationStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold focus:ring-2 focus:ring-amber-500 outline-none text-xs"
                  >
                    <option value="New">New (Pending Review)</option>
                    <option value="Contacted">Contacted (Spoke with Devotee)</option>
                    <option value="Consultation Scheduled">Consultation Scheduled</option>
                    <option value="Completed">Completed (Guidance Provided)</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Add Follow-Up Note */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-stone-800 dark:text-stone-200">
                    Add New Follow-Up Note
                  </label>
                  <input
                    type="text"
                    value={newFollowUpNote}
                    onChange={(e) => setNewFollowUpNote(e.target.value)}
                    placeholder="e.g. Called devotee; birth chart analyzed..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              {/* Internal Notes Textarea */}
              <div className="space-y-1.5">
                <label className="block font-bold text-stone-800 dark:text-stone-200">
                  Comprehensive Internal Notes / Astrological Findings
                </label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record pandit's recommendations, dosh remedies suggested (e.g. Mahamrityunjaya, Kalsarp, Bhat Pooja)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              {/* Follow-Up History Timeline */}
              {selectedItem.followUpHistory && selectedItem.followUpHistory.length > 0 && (
                <div className="space-y-2 p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                  <span className="font-bold text-stone-700 dark:text-stone-300 block text-[10px] uppercase">
                    Follow-Up History Trail
                  </span>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {selectedItem.followUpHistory.map((entry, idx) => (
                      <div key={idx} className="text-[11px] p-2 rounded-lg bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-800/80 flex items-start justify-between gap-2">
                        <span className="text-stone-800 dark:text-stone-200">{entry.note}</span>
                        <span className="text-[10px] text-stone-400 shrink-0 font-mono">
                          {entry.date} {entry.updatedBy && `(${entry.updatedBy})`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit & Close Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Updates</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
