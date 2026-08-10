import React, { useState } from 'react';
import { StaffUser, AdminRole, AdminPermission } from '../../types';
import { StoreService } from '../../services/store';
import {
  ShieldCheck,
  UserPlus,
  User,
  Mail,
  Key,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Sliders,
  Sparkles,
  Search,
  Check,
  AlertCircle,
  Phone,
  Clock,
  ShieldAlert,
} from 'lucide-react';

interface AdminStaffManagerProps {
  currentStaffUser: StaffUser | null;
  onRefreshStaff?: () => void;
}

export const AdminStaffManager: React.FC<AdminStaffManagerProps> = ({
  currentStaffUser,
  onRefreshStaff,
}) => {
  const [staffList, setStaffList] = useState<StaffUser[]>(() => StoreService.getStaffUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | AdminRole>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffUser | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AdminRole>('Editor');
  const [passcode, setPasscode] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [showPasscodes, setShowPasscodes] = useState<Record<string, boolean>>({});

  // Granular Permissions State
  const [permissions, setPermissions] = useState<AdminPermission>({
    canViewOverview: true,
    canManageLeads: false,
    canManageBlogs: true,
    canManageServices: true,
    canManageSettings: false,
    canManageSocials: false,
    canManageStaff: false,
  });

  const refreshList = () => {
    const updated = StoreService.getStaffUsers();
    setStaffList(updated);
    if (onRefreshStaff) onRefreshStaff();
  };

  const handleOpenAddModal = () => {
    setEditingStaff(null);
    setName('');
    setEmail('');
    setPhone('');
    setRole('Editor');
    setPasscode(`pass${Math.floor(1000 + Math.random() * 9000)}`);
    setStatus('Active');
    setPermissions({
      canViewOverview: true,
      canManageLeads: false,
      canManageBlogs: true,
      canManageServices: true,
      canManageSettings: false,
      canManageSocials: false,
      canManageStaff: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (staff: StaffUser) => {
    setEditingStaff(staff);
    setName(staff.name);
    setEmail(staff.email);
    setPhone(staff.phone || '');
    setRole(staff.role);
    setPasscode(staff.passcode);
    setStatus(staff.status);
    setPermissions(staff.permissions);
    setIsModalOpen(true);
  };

  // Auto-update permissions when selecting a preset role template
  const handleRoleChange = (newRole: AdminRole) => {
    setRole(newRole);
    if (newRole === 'Admin') {
      setPermissions({
        canViewOverview: true,
        canManageLeads: true,
        canManageBlogs: true,
        canManageServices: true,
        canManageSettings: true,
        canManageSocials: true,
        canManageStaff: true,
      });
    } else if (newRole === 'Manager') {
      setPermissions({
        canViewOverview: true,
        canManageLeads: true,
        canManageBlogs: true,
        canManageServices: true,
        canManageSettings: false,
        canManageSocials: false,
        canManageStaff: false,
      });
    } else {
      setPermissions({
        canViewOverview: true,
        canManageLeads: false,
        canManageBlogs: true,
        canManageServices: true,
        canManageSettings: false,
        canManageSocials: false,
        canManageStaff: false,
      });
    }
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !passcode.trim()) {
      alert('Please fill in all required fields (Name, Email, Passcode).');
      return;
    }

    StoreService.saveStaffUser({
      id: editingStaff?.id,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      passcode: passcode.trim(),
      status,
      permissions,
    });

    setIsModalOpen(false);
    refreshList();
  };

  const handleDeleteStaff = (id: string, staffName: string) => {
    if (staffList.length <= 1) {
      alert('Cannot delete the last remaining staff member.');
      return;
    }
    if (window.confirm(`Are you sure you want to revoke access and delete "${staffName}"?`)) {
      StoreService.deleteStaffUser(id);
      refreshList();
    }
  };

  const toggleStatus = (staff: StaffUser) => {
    const newStatus = staff.status === 'Active' ? 'Inactive' : 'Active';
    StoreService.saveStaffUser({ id: staff.id, status: newStatus });
    refreshList();
  };

  const togglePasscodeVisibility = (id: string) => {
    setShowPasscodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8">
      {/* Header Info Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 shadow-xl border border-amber-900/40 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
            Staff Access & Permissions Management
          </h2>
          <p className="text-xs md:text-sm text-amber-200/80 leading-relaxed">
            Assign custom roles (Admin, Manager, Editor) to temple staff & digital managers. Control access to devotee CRM leads, blog engine, and pricing.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="relative z-10 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs shadow-lg transition-all transform hover:-translate-y-0.5 self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Staff Account</span>
        </button>
      </div>

      {/* Role Preset Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Role 1: Admin */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/40 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600" />
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100">Admin (Super User)</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-[10px] font-mono font-bold">
              Full Access
            </span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Has unrestricted access to all tabs including CRM, Blog publishing, Service prices, Site banners, and Staff permissions.
          </p>
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-500">
            Demo Passcode: <span className="font-bold text-stone-900 dark:text-stone-200">admin123</span> or <span className="font-bold text-amber-600">mahakal</span>
          </div>
        </div>

        {/* Role 2: Manager */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/40 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100">Manager (Operations)</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-mono font-bold">
              CRM & Content
            </span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Can view devotee inquiries, update lead status, post blog articles, and edit pooja offering details. No access to staff settings.
          </p>
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-500">
            Demo Passcode: <span className="font-bold text-stone-900 dark:text-stone-200">manager123</span>
          </div>
        </div>

        {/* Role 3: Editor */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/40 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100">Editor (Content Specialist)</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-mono font-bold">
              Blog & Services
            </span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Restricted content editor. Can write/edit WordPress articles and service details. Protected from seeing sensitive devotee CRM phone numbers.
          </p>
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-500">
            Demo Passcode: <span className="font-bold text-stone-900 dark:text-stone-200">editor123</span>
          </div>
        </div>
      </div>

      {/* Search & Role Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-amber-500 outline-none text-stone-900 dark:text-stone-100"
          />
        </div>

        {/* Role Pills */}
        <div className="flex items-center gap-2 self-start md:self-auto overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {(['All', 'Admin', 'Manager', 'Editor'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === r
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-amber-700'
              }`}
            >
              {r} ({r === 'All' ? staffList.length : staffList.filter((s) => s.role === r).length})
            </button>
          ))}
        </div>
      </div>

      {/* Staff Accounts Table / List */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-600" />
            <span>Active Temple & CMS Staff Members ({filteredStaff.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold uppercase tracking-wider border-b border-stone-200 dark:border-stone-700">
              <tr>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Passcode</th>
                <th className="p-3">Permissions Breakdown</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Active</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-medium">
              {filteredStaff.map((staff) => {
                const isCurrent = currentStaffUser?.id === staff.id;
                const isPassVisible = !!showPasscodes[staff.id];

                return (
                  <tr
                    key={staff.id}
                    className={`hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors ${
                      isCurrent ? 'bg-amber-50/60 dark:bg-amber-950/20' : ''
                    }`}
                  >
                    {/* Name & Contact */}
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 font-bold flex items-center justify-center text-xs shadow-sm">
                          {staff.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                            <span>{staff.name}</span>
                            {isCurrent && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 text-[9px] font-mono font-bold">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-2">
                            <span>{staff.email}</span>
                            {staff.phone && <span className="font-mono text-stone-400">• {staff.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono border ${
                          staff.role === 'Admin'
                            ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900'
                            : staff.role === 'Manager'
                            ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900'
                            : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900'
                        }`}
                      >
                        {staff.role}
                      </span>
                    </td>

                    {/* Passcode Toggle */}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-800 dark:text-stone-200">
                          {isPassVisible ? staff.passcode : '••••••••'}
                        </span>
                        <button
                          type="button"
                          onClick={() => togglePasscodeVisibility(staff.id)}
                          className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                        >
                          {isPassVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                    {/* Permissions Badges */}
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {staff.permissions.canManageLeads && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[9px] font-medium">
                            CRM Leads
                          </span>
                        )}
                        {staff.permissions.canManageBlogs && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[9px] font-medium">
                            Blog CMS
                          </span>
                        )}
                        {staff.permissions.canManageServices && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[9px] font-medium">
                            Services
                          </span>
                        )}
                        {staff.permissions.canManageSettings && (
                          <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-[9px] font-medium">
                            Settings
                          </span>
                        )}
                        {staff.permissions.canManageStaff && (
                          <span className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-[9px] font-medium">
                            Staff RBAC
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Toggle */}
                    <td className="p-3">
                      <button
                        onClick={() => toggleStatus(staff)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          staff.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200'
                            : 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-400 hover:bg-stone-300'
                        }`}
                      >
                        {staff.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{staff.status}</span>
                      </button>
                    </td>

                    {/* Last Login */}
                    <td className="p-3 font-mono text-stone-500 text-[11px]">
                      {staff.lastLogin || 'Never'}
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(staff)}
                          className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950 text-stone-700 dark:text-stone-300 transition-colors"
                          title="Edit Permissions"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(staff.id, staff.name)}
                          className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-red-100 dark:hover:bg-red-950 text-stone-700 dark:text-stone-300 hover:text-red-600 transition-colors"
                          title="Revoke Access"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add or Edit Staff Member */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-6 relative my-8">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  {editingStaff ? 'Edit Staff Permissions' : 'Create Staff Member Account'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="space-y-4 text-xs">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Staff Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pt. Rajeshwar Sharma"
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 outline-none text-stone-900 dark:text-stone-100"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sharma@aasthaseva.com"
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 outline-none text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98260 12345"
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 outline-none text-stone-900 dark:text-stone-100 font-mono"
                  />
                </div>
              </div>

              {/* Role Preset Selector */}
              <div className="space-y-1">
                <label className="font-bold text-stone-700 dark:text-stone-300">Assigned Role Preset</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Admin', 'Manager', 'Editor'] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => handleRoleChange(r)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        role === r
                          ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/60 font-bold text-amber-900 dark:text-amber-200 shadow-sm'
                          : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Passcode & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Login Passcode *</label>
                  <input
                    type="text"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="e.g. sharma99"
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 outline-none font-mono text-stone-900 dark:text-stone-100 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300">Account Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-amber-500 outline-none text-stone-900 dark:text-stone-100 font-bold"
                  >
                    <option value="Active">Active (Can Login)</option>
                    <option value="Inactive">Inactive (Access Suspended)</option>
                  </select>
                </div>
              </div>

              {/* Granular Checkboxes Permission Matrix */}
              <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center justify-between">
                  <span>Granular Admin Module Permissions</span>
                  <span className="text-[10px] text-amber-600 font-mono">Custom overrides enabled</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-stone-50 dark:bg-stone-800/60 p-3 rounded-2xl border border-stone-200/80 dark:border-stone-700/80">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={permissions.canViewOverview}
                      onChange={(e) => setPermissions({ ...permissions, canViewOverview: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-medium">Overview & Stats</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={permissions.canManageLeads}
                      onChange={(e) => setPermissions({ ...permissions, canManageLeads: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-medium">Devotee CRM Leads</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={permissions.canManageBlogs}
                      onChange={(e) => setPermissions({ ...permissions, canManageBlogs: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-medium">WordPress Blog CMS</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={permissions.canManageServices}
                      onChange={(e) => setPermissions({ ...permissions, canManageServices: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-medium">Pooja & Yatra Offerings</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={permissions.canManageSettings}
                      onChange={(e) => setPermissions({ ...permissions, canManageSettings: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-medium">Site Banner & Settings</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={permissions.canManageSocials}
                      onChange={(e) => setPermissions({ ...permissions, canManageSocials: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="font-medium">Social Media Handles</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none sm:col-span-2 text-red-700 dark:text-red-400 font-bold">
                    <input
                      type="checkbox"
                      checked={permissions.canManageStaff}
                      onChange={(e) => setPermissions({ ...permissions, canManageStaff: e.target.checked })}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                    />
                    <span>Staff Roles & Account Permissions</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md transition-all"
                >
                  {editingStaff ? 'Update Permissions' : 'Save Staff Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
