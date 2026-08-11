import React, { useState, useMemo } from 'react';
import { StoreService } from '../../services/store';
import { Lead, StaffUser, PoojaService } from '../../types';
import {
  Download,
  FileSpreadsheet,
  Users,
  Calendar,
  Filter,
  CheckCircle2,
  FileText,
  ShieldCheck,
  HardDriveDownload,
  Eye,
  Database,
  Search,
  Sparkles,
  ArrowRight,
  Layers,
  Clock,
  Flame,
} from 'lucide-react';

export const AdminDataExportManager: React.FC = () => {
  const [exportType, setExportType] = useState<'Bookings' | 'StaffUsers' | 'Services' | 'FullBackup'>('Bookings');

  // Booking filters
  const [bookingDateFilter, setBookingDateFilter] = useState<'ALL' | '7D' | '30D' | 'THIS_MONTH'>('ALL');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('ALL');
  const [bookingSearch, setBookingSearch] = useState('');

  // Staff filters
  const [staffRoleFilter, setStaffRoleFilter] = useState<string>('ALL');

  // Success state indicator
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Fetch live store data
  const leads = useMemo(() => StoreService.getLeads(), []);
  const staffUsers = useMemo(() => StoreService.getStaffUsers(), []);
  const poojas = useMemo(() => StoreService.getPoojas(false), []);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      // Search
      const matchesSearch =
        l.name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        l.phone.includes(bookingSearch) ||
        (l.serviceName || l.serviceType).toLowerCase().includes(bookingSearch.toLowerCase());

      // Status
      const matchesStatus = bookingStatusFilter === 'ALL' || l.status === bookingStatusFilter;

      // Date range filter
      let matchesDate = true;
      if (bookingDateFilter !== 'ALL') {
        const leadDate = new Date(l.createdAt).getTime();
        const now = Date.now();
        if (bookingDateFilter === '7D') {
          matchesDate = leadDate >= now - 7 * 24 * 3600 * 1000;
        } else if (bookingDateFilter === '30D') {
          matchesDate = leadDate >= now - 30 * 24 * 3600 * 1000;
        } else if (bookingDateFilter === 'THIS_MONTH') {
          const d = new Date(l.createdAt);
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          matchesDate = d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [leads, bookingSearch, bookingStatusFilter, bookingDateFilter]);

  // Filtered Staff
  const filteredStaff = useMemo(() => {
    return staffUsers.filter((s) => {
      if (staffRoleFilter === 'ALL') return true;
      return s.role === staffRoleFilter;
    });
  }, [staffUsers, staffRoleFilter]);

  // Helper to trigger browser file download
  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // CSV Export Handlers
  const handleExportBookingsCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = [
      'Booking ID',
      'Created Date',
      'Devotee Name',
      'Phone Number',
      'Email',
      'WhatsApp Number',
      'Service Type',
      'Service Name',
      'Preferred Date',
      'Devotee Count',
      'Status',
      'Source Channel',
      'Landing Page',
      'Gotra & Special Notes',
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.id}"`,
      `"${new Date(l.createdAt).toLocaleString('en-IN')}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.whatsapp || l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.serviceType || '').replace(/"/g, '""')}"`,
      `"${(l.serviceName || l.serviceType || '').replace(/"/g, '""')}"`,
      `"${(l.preferredDate || 'Flexible').replace(/"/g, '""')}"`,
      l.numberOfPeople || 1,
      `"${(l.status || 'New').replace(/"/g, '""')}"`,
      `"${(l.source || 'Website').replace(/"/g, '""')}"`,
      `"${(l.landingPage || '/').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""').replace(/[\r\n]+/g, ' ')}"`,
    ]);

    const csvString = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const filename = `Aastha_Devotee_Bookings_Report_${new Date().toISOString().slice(0, 10)}.csv`;

    downloadFile(filename, '\uFEFF' + csvString, 'text/csv;charset=utf-8;');
    setDownloadSuccessMessage(`Successfully exported ${filteredLeads.length} Devotee Booking Records to CSV.`);
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  const handleExportStaffUsersCSV = () => {
    if (filteredStaff.length === 0) return;

    const headers = [
      'Staff ID',
      'Name',
      'Role',
      'Email',
      'Phone',
      'Status',
      'Last Login',
      'Permissions Overview',
    ];

    const rows = filteredStaff.map((u) => {
      const perms = u.permissions;
      const permSummary = [
        perms.canViewOverview ? 'Overview' : null,
        perms.canManageLeads ? 'Leads' : null,
        perms.canManageBlogs ? 'Blogs' : null,
        perms.canManageServices ? 'Services' : null,
        perms.canManageSettings ? 'Settings' : null,
        perms.canManageStaff ? 'Staff' : null,
      ]
        .filter(Boolean)
        .join('; ');

      return [
        `"${u.id}"`,
        `"${u.name.replace(/"/g, '""')}"`,
        `"${u.role}"`,
        `"${u.email}"`,
        `"${u.phone}"`,
        `"${u.status}"`,
        `"${u.lastLogin || 'Never'}"`,
        `"${permSummary}"`,
      ];
    });

    const csvString = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const filename = `Aastha_Staff_Users_Report_${new Date().toISOString().slice(0, 10)}.csv`;

    downloadFile(filename, '\uFEFF' + csvString, 'text/csv;charset=utf-8;');
    setDownloadSuccessMessage(`Successfully exported ${filteredStaff.length} Staff User Records to CSV.`);
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  const handleExportServicesCSV = () => {
    if (poojas.length === 0) return;

    const headers = [
      'Pooja ID',
      'Pooja Name',
      'City / Location',
      'Category ID',
      'Dakshina Price (INR)',
      'Featured',
      'Published Status',
      'Short Description',
    ];

    const rows = poojas.map((p) => [
      `"${p.id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.city || 'Ujjain'}"`,
      `"${p.categoryId}"`,
      p.price || 0,
      p.isFeatured ? 'Yes' : 'No',
      p.isPublished ? 'Published' : 'Draft',
      `"${(p.shortDescription || '').replace(/"/g, '""')}"`,
    ]);

    const csvString = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const filename = `Aastha_Pooja_Catalog_Export_${new Date().toISOString().slice(0, 10)}.csv`;

    downloadFile(filename, '\uFEFF' + csvString, 'text/csv;charset=utf-8;');
    setDownloadSuccessMessage(`Successfully exported ${poojas.length} Pooja & Yatra Services to CSV.`);
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  const handleExportFullJSONBackup = () => {
    const fullBackupData = {
      exportTimestamp: new Date().toISOString(),
      appName: 'Aastha Sey Raasta Seva Ujjain CMS',
      leads: StoreService.getLeads(),
      staffUsers: StoreService.getStaffUsers(),
      poojas: StoreService.getPoojas(false),
      tours: StoreService.getTours(false),
      blogPosts: StoreService.getBlogPosts(false),
      settings: StoreService.getSettings(),
      galleryItems: StoreService.getGallery(),
    };

    const jsonString = JSON.stringify(fullBackupData, null, 2);
    const filename = `Aastha_Full_System_Backup_${new Date().toISOString().slice(0, 10)}.json`;

    downloadFile(filename, jsonString, 'application/json');
    setDownloadSuccessMessage('Full system database backup exported in JSON format.');
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  return (
    <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-8 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400">
              <HardDriveDownload className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100">
              Admin Data Export & Offline Backups Hub
            </h2>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Generate and download formatted CSV reports for devotee booking enquiries, staff accounts, service packages, and complete database JSON backups.
          </p>
        </div>

        <button
          onClick={handleExportFullJSONBackup}
          className="px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 dark:hover:bg-stone-700 text-stone-100 text-xs font-bold transition-all shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Database className="w-4 h-4 text-amber-400" />
          <span>Full JSON System Backup</span>
        </button>
      </div>

      {downloadSuccessMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-3 border border-emerald-200 dark:border-emerald-800 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold">File Download Initialized!</div>
            <div className="text-[11px] font-normal opacity-90">{downloadSuccessMessage}</div>
          </div>
        </div>
      )}

      {/* EXPORT REPORT CATEGORY TABS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setExportType('Bookings')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
            exportType === 'Bookings'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-100 shadow-md ring-2 ring-amber-500/20'
              : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-300'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0 mt-0.5">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>Devotee Bookings Report</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                {leads.length} Records
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
              Export phone numbers, gotra notes, booking preferred dates, and status.
            </p>
          </div>
        </button>

        <button
          onClick={() => setExportType('StaffUsers')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
            exportType === 'StaffUsers'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-100 shadow-md ring-2 ring-amber-500/20'
              : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-300'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>Staff & User Accounts</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                {staffUsers.length} Users
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
              Export staff user profiles, roles, emails, and active permissions.
            </p>
          </div>
        </button>

        <button
          onClick={() => setExportType('Services')}
          className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
            exportType === 'Services'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-100 shadow-md ring-2 ring-amber-500/20'
              : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-300'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>Services & Pooja Packages</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {poojas.length} Items
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
              Export dakshina pricing, cities, categories, and published status.
            </p>
          </div>
        </button>
      </div>

      {/* VIEW 1: DEVOTEE BOOKINGS CSV EXPORT CONTROLS */}
      {exportType === 'Bookings' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-amber-600" />
                  <span>Filter Devotee Booking Report CSV</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Select date range or search keyword to filter CSV export output.
                </p>
              </div>

              <button
                onClick={handleExportBookingsCSV}
                disabled={filteredLeads.length === 0}
                className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download Bookings CSV ({filteredLeads.length} Rows)</span>
              </button>
            </div>

            {/* Filter Inputs Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Date Range Filter
                </label>
                <select
                  value={bookingDateFilter}
                  onChange={(e) => setBookingDateFilter(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs font-bold outline-none"
                >
                  <option value="ALL">All Time History</option>
                  <option value="7D">Past 7 Days</option>
                  <option value="30D">Past 30 Days</option>
                  <option value="THIS_MONTH">This Month</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Booking Status
                </label>
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs font-bold outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">🔴 New Inquiries</option>
                  <option value="Contacted">🟡 Contacted</option>
                  <option value="Booked">🔵 Booked</option>
                  <option value="Completed">🟢 Completed</option>
                  <option value="Archived">⚪ Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Search Query
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search name, phone, service..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs font-medium outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CSV PREVIEW TABLE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-600" />
                <span>Live CSV Output Data Preview ({filteredLeads.length} rows)</span>
              </h4>
              <span className="text-[10px] font-mono text-stone-500">Includes UTF-8 BOM for Excel Compatibility</span>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-500 text-xs">
                No booking records match the selected filters.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm max-h-80 overflow-y-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold uppercase text-[10px] sticky top-0 border-b border-stone-200 dark:border-stone-700">
                    <tr>
                      <th className="p-3 whitespace-nowrap">Booking Date</th>
                      <th className="p-3 whitespace-nowrap">Devotee Name</th>
                      <th className="p-3 whitespace-nowrap">Phone</th>
                      <th className="p-3 whitespace-nowrap">Requested Service</th>
                      <th className="p-3 whitespace-nowrap">Pref. Date</th>
                      <th className="p-3 whitespace-nowrap">Status</th>
                      <th className="p-3 whitespace-nowrap">Gotra Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800 bg-white dark:bg-stone-950">
                    {filteredLeads.map((l) => (
                      <tr key={l.id} className="hover:bg-amber-50/40 dark:hover:bg-stone-900">
                        <td className="p-3 whitespace-nowrap text-stone-500">{new Date(l.createdAt).toLocaleDateString()}</td>
                        <td className="p-3 font-bold text-stone-900 dark:text-stone-100">{l.name}</td>
                        <td className="p-3 font-semibold text-stone-700 dark:text-stone-300">{l.phone}</td>
                        <td className="p-3">{l.serviceName || l.serviceType}</td>
                        <td className="p-3 whitespace-nowrap">{l.preferredDate || 'Flexible'}</td>
                        <td className="p-3 whitespace-nowrap font-bold text-amber-700 dark:text-amber-400">{l.status}</td>
                        <td className="p-3 max-w-xs truncate text-stone-500">{l.message || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: STAFF USERS CSV EXPORT CONTROLS */}
      {exportType === 'StaffUsers' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Filter Staff Accounts & Access Report</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Export list of all authorized staff users, assigned roles, and permission levels.
                </p>
              </div>

              <button
                onClick={handleExportStaffUsersCSV}
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download Staff Accounts CSV ({filteredStaff.length} Users)</span>
              </button>
            </div>

            <div className="max-w-xs pt-1">
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Filter by Role
              </label>
              <select
                value={staffRoleFilter}
                onChange={(e) => setStaffRoleFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs font-bold outline-none"
              >
                <option value="ALL">All Staff Roles</option>
                <option value="Admin">Admin (Full Access)</option>
                <option value="Manager">Operations Manager</option>
                <option value="Editor">Content Editor</option>
              </select>
            </div>
          </div>

          {/* STAFF PREVIEW TABLE */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Staff Accounts Preview ({filteredStaff.length} users)</span>
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold uppercase text-[10px] border-b border-stone-200 dark:border-stone-700">
                  <tr>
                    <th className="p-3">Staff ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Last Login</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800 bg-white dark:bg-stone-950">
                  {filteredStaff.map((u) => (
                    <tr key={u.id} className="hover:bg-blue-50/40 dark:hover:bg-stone-900">
                      <td className="p-3 text-stone-500">{u.id}</td>
                      <td className="p-3 font-bold text-stone-900 dark:text-stone-100">{u.name}</td>
                      <td className="p-3 font-semibold text-blue-700 dark:text-blue-400">{u.role}</td>
                      <td className="p-3 text-stone-600 dark:text-stone-400">{u.email}</td>
                      <td className="p-3 font-bold text-emerald-600">{u.status}</td>
                      <td className="p-3 text-stone-500">{u.lastLogin || 'Never'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: POOJA & SERVICES CSV EXPORT CONTROLS */}
      {exportType === 'Services' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  <span>Export Pooja & Yatra Services Catalog</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Export complete pricing list, categories, cities, and published status for offline auditing.
                </p>
              </div>

              <button
                onClick={handleExportServicesCSV}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download Services CSV ({poojas.length} Items)</span>
              </button>
            </div>
          </div>

          {/* SERVICES PREVIEW TABLE */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>Pooja Catalog Data Preview ({poojas.length} items)</span>
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm max-h-80 overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold uppercase text-[10px] sticky top-0 border-b border-stone-200 dark:border-stone-700">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Pooja Title</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Dakshina Price</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800 bg-white dark:bg-stone-950">
                  {poojas.map((p) => (
                    <tr key={p.id} className="hover:bg-emerald-50/40 dark:hover:bg-stone-900">
                      <td className="p-3 text-stone-500">{p.id}</td>
                      <td className="p-3 font-bold text-stone-900 dark:text-stone-100">{p.name}</td>
                      <td className="p-3">{p.city || 'Ujjain'}</td>
                      <td className="p-3 font-bold text-emerald-700 dark:text-emerald-400">₹{p.price || 0}</td>
                      <td className="p-3">{p.isPublished ? 'Published' : 'Draft'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
