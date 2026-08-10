import React, { useState, useMemo } from 'react';
import { StoreService } from '../services/store';
import { SEOHead } from '../components/SEOHead';
import { AdminBlogManager } from '../components/admin/AdminBlogManager';
import { AdminServicesManager } from '../components/admin/AdminServicesManager';
import { AdminInformativeDetails } from '../components/admin/AdminInformativeDetails';
import { AdminSocialHandles } from '../components/admin/AdminSocialHandles';
import { AdminDashboardOverview } from '../components/admin/AdminDashboardOverview';
import { AdminStaffManager } from '../components/admin/AdminStaffManager';
import { Lead, StaffUser, AdminRole } from '../types';
import {
  Lock,
  Users,
  FileText,
  Flame,
  Info,
  Share2,
  LogOut,
  Sparkles,
  LayoutDashboard,
  Search,
  Download,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  BarChart3,
  MessageCircle,
  Trash2,
  Filter,
  Globe,
  Sparkle,
  ArrowUpRight,
  UserCheck,
  ShieldAlert,
  UserPlus,
} from 'lucide-react';

const initialSampleLeads: Lead[] = [
  {
    id: 'lead-sample-1',
    name: 'Rajesh Sharma',
    phone: '+91 98260 12345',
    email: 'rajesh.sharma@gmail.com',
    whatsapp: '919826012345',
    serviceType: 'Pooja',
    serviceName: 'Kalsarp Dosh Shanti Pooja',
    preferredDate: '2026-08-15',
    numberOfPeople: 4,
    message: 'Gotra: Kashyap. Need morning slot at Ram Ghat, Ujjain.',
    source: 'Website Booking Form',
    landingPage: '/pooja/kalsarp-dosh-shanti',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'lead-sample-2',
    name: 'Sunita & Amit Patel',
    phone: '+91 94250 88765',
    email: 'amit.patel@yahoo.com',
    whatsapp: '919425088765',
    serviceType: 'Tour',
    serviceName: 'Ujjain Omkareshwar 2 Day Yatra Package',
    preferredDate: '2026-08-20',
    numberOfPeople: 2,
    message: 'Require VIP Bhasma Aarti booking assistance and AC taxi.',
    source: 'WhatsApp Quick Inquiry',
    landingPage: '/tours/ujjain-omkareshwar-2-days',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'lead-sample-3',
    name: 'Vikramaditya Verma',
    phone: '+91 98930 44321',
    email: 'v.verma@outlook.com',
    whatsapp: '919893044321',
    serviceType: 'Pooja',
    serviceName: 'Mahamrityunjay Jaap & Havan',
    preferredDate: '2026-08-22',
    numberOfPeople: 1,
    message: 'Sankalp for health and longevity of parents.',
    source: 'Services Page',
    landingPage: '/pooja/mahamrityunjay-jaap',
    status: 'Booked',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
];

type AdminTab = 'Overview' | 'Leads' | 'Blog' | 'Services' | 'Informative' | 'Socials' | 'Staff';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentStaffUser, setCurrentStaffUser] = useState<StaffUser | null>(null);

  const [activeTab, setActiveTab] = useState<AdminTab>('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data state
  const [leads, setLeads] = useState<Lead[]>(() => {
    const existing = StoreService.getLeads();
    if (existing.length === 0) {
      return initialSampleLeads;
    }
    return existing;
  });

  const blogs = useMemo(() => StoreService.getBlogPosts(false), [activeTab]);
  const poojas = useMemo(() => StoreService.getPoojas(false), [activeTab]);
  const settings = useMemo(() => StoreService.getSettings(), [activeTab]);

  // Lead filtering
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('ALL');

  const handleLogin = (e?: React.FormEvent, customPass?: string) => {
    if (e) e.preventDefault();
    const passToTry = customPass || password;

    const staffUser = StoreService.authenticateStaffPasscode(passToTry);

    if (staffUser) {
      setCurrentStaffUser(staffUser);
      setIsAuthenticated(true);
      setLoginError('');
      const currentLeads = StoreService.getLeads();
      setLeads(currentLeads.length > 0 ? currentLeads : initialSampleLeads);

      // Select default permitted tab
      const p = staffUser.permissions;
      if (p.canViewOverview) setActiveTab('Overview');
      else if (p.canManageLeads) setActiveTab('Leads');
      else if (p.canManageBlogs) setActiveTab('Blog');
      else if (p.canManageServices) setActiveTab('Services');
      else if (p.canManageSettings) setActiveTab('Informative');
      else if (p.canManageSocials) setActiveTab('Socials');
      else if (p.canManageStaff) setActiveTab('Staff');
    } else {
      setLoginError('Invalid passcode. Use "admin123" (Admin), "manager123" (Manager), or "editor123" (Editor)');
    }
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    StoreService.updateLeadStatus(leadId, newStatus);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const handleDeleteLead = (leadId: string, devoteeName: string) => {
    if (window.confirm(`Delete enquiry from devotee "${devoteeName}"?`)) {
      StoreService.deleteLead(leadId);
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
    }
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Date', 'Name', 'Phone', 'Email', 'Service', 'Preferred Date', 'People', 'Status', 'Message'];
    const rows = leads.map((l) => [
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${(l.serviceName || l.serviceType).replace(/"/g, '""')}"`,
      `"${l.preferredDate || ''}"`,
      l.numberOfPeople || 1,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Aastha_Devotee_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.phone.includes(leadSearch) ||
        (l.serviceName || l.serviceType).toLowerCase().includes(leadSearch.toLowerCase());
      const matchesStatus = leadStatusFilter === 'ALL' || l.status === leadStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, leadSearch, leadStatusFilter]);

  // LOGIN SCREEN WITH QUICK ROLE BUTTONS
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-stone-100 dark:bg-stone-950">
        <SEOHead title="Admin CMS Portal Login | Aastha Sey Raasta Seva" />
        <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-red-950 via-amber-950 to-stone-900 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-serif italic font-bold text-amber-100">Admin Control Portal</h1>
            <p className="text-xs text-amber-200/80 mt-1 font-medium">Role-Based Access Control (RBAC) Enabled</p>
          </div>

          <div className="p-8 space-y-6">
            <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                  Staff Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter staff passcode..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-600 transition-all font-mono"
                  />
                </div>
                {loginError && <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-2">{loginError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white font-bold text-sm hover:from-amber-800 hover:to-amber-900 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In to Admin Panel</span>
              </button>
            </form>

            {/* Quick Demo Role Sign-in Selectors */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Quick Role Demo Sign-in Passcodes:</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPassword('admin123');
                    handleLogin(undefined, 'admin123');
                  }}
                  className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-stone-200 dark:border-stone-700 text-left transition-all group"
                >
                  <div className="text-[10px] font-bold font-mono text-red-600 dark:text-red-400">ADMIN</div>
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Pt. Sharma</div>
                  <div className="text-[10px] text-stone-500 font-mono">admin123</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPassword('manager123');
                    handleLogin(undefined, 'manager123');
                  }}
                  className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-stone-200 dark:border-stone-700 text-left transition-all group"
                >
                  <div className="text-[10px] font-bold font-mono text-amber-600 dark:text-amber-400">MANAGER</div>
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Ramesh S.</div>
                  <div className="text-[10px] text-stone-500 font-mono">manager123</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPassword('editor123');
                    handleLogin(undefined, 'editor123');
                  }}
                  className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-stone-200 dark:border-stone-700 text-left transition-all group"
                >
                  <div className="text-[10px] font-bold font-mono text-blue-600 dark:text-blue-400">EDITOR</div>
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Ananya V.</div>
                  <div className="text-[10px] text-stone-500 font-mono">editor123</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userPerms = currentStaffUser?.permissions;

  // AUTHENTICATED ADMIN PANEL LAYOUT
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col md:flex-row font-sans">
      <SEOHead title="Admin Control Dashboard | Aastha Sey Raasta Seva" />

      {/* MOBILE HEADER BAR */}
      <div className="md:hidden bg-stone-900 text-amber-100 p-4 border-b border-stone-800 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-serif font-bold text-sm">
            ॐ
          </div>
          <div>
            <div className="font-serif font-bold text-sm text-white leading-none">Aastha Admin</div>
            <div className="text-[10px] text-amber-400/80 font-mono">Role: {currentStaffUser?.role}</div>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-stone-800 text-stone-200 hover:bg-stone-700"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* BACKDROP FOR MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-950/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-40 w-64 bg-stone-900 text-stone-300 border-r border-stone-800 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } h-screen`}
      >
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Brand Header */}
          <div className="pb-5 border-b border-stone-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-700 text-white font-serif font-bold text-lg flex items-center justify-center shadow-md border border-amber-400/30">
              ॐ
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm text-white leading-tight">Aastha Sey Raasta</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">CMS RBAC Portal</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-6">
            {/* GROUP 1: OVERVIEW */}
            {userPerms?.canViewOverview && (
              <div>
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2">Main Dashboard</div>
                <button
                  onClick={() => {
                    setActiveTab('Overview');
                    setSidebarOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeTab === 'Overview'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Overview & KPIs</span>
                  </div>
                  {activeTab === 'Overview' && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}

            {/* GROUP 2: INQUIRIES */}
            {userPerms?.canManageLeads && (
              <div>
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2">Devotee CRM</div>
                <button
                  onClick={() => {
                    setActiveTab('Leads');
                    setSidebarOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeTab === 'Leads'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>Devotee Enquiries</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      activeTab === 'Leads'
                        ? 'bg-amber-800 text-amber-100'
                        : 'bg-stone-800 text-amber-400 border border-stone-700'
                    }`}
                  >
                    {leads.length}
                  </span>
                </button>
              </div>
            )}

            {/* GROUP 3: CONTENT ENGINE */}
            {(userPerms?.canManageBlogs || userPerms?.canManageServices) && (
              <div>
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2">Content Engine</div>
                <div className="space-y-1">
                  {userPerms?.canManageBlogs && (
                    <button
                      onClick={() => {
                        setActiveTab('Blog');
                        setSidebarOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        activeTab === 'Blog'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4" />
                        <span>WordPress Blog CMS</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400">{blogs.length}</span>
                    </button>
                  )}

                  {userPerms?.canManageServices && (
                    <button
                      onClick={() => {
                        setActiveTab('Services');
                        setSidebarOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        activeTab === 'Services'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Flame className="w-4 h-4" />
                        <span>Pooja & Yatra Services</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400">{poojas.length}</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* GROUP 4: SITE CONTROL */}
            {(userPerms?.canManageSettings || userPerms?.canManageSocials) && (
              <div>
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2">Site Management</div>
                <div className="space-y-1">
                  {userPerms?.canManageSettings && (
                    <button
                      onClick={() => {
                        setActiveTab('Informative');
                        setSidebarOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        activeTab === 'Informative'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Info className="w-4 h-4" />
                        <span>Banner & Details</span>
                      </div>
                    </button>
                  )}

                  {userPerms?.canManageSocials && (
                    <button
                      onClick={() => {
                        setActiveTab('Socials');
                        setSidebarOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        activeTab === 'Socials'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Share2 className="w-4 h-4" />
                        <span>Social Media Channels</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* GROUP 5: STAFF & PERMISSIONS */}
            {userPerms?.canManageStaff && (
              <div>
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2">Access Control</div>
                <button
                  onClick={() => {
                    setActiveTab('Staff');
                    setSidebarOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeTab === 'Staff'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Staff Roles & RBAC</span>
                  </div>
                  {activeTab === 'Staff' && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Sidebar Footer with Logged In Staff Profile */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/50 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>View Live Website</span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
          </a>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 font-bold text-xs flex items-center justify-center border border-amber-400/40">
                {currentStaffUser?.name.charAt(0) || 'A'}
              </div>
              <div className="truncate max-w-[110px]">
                <div className="text-xs font-bold text-stone-200 truncate">{currentStaffUser?.name}</div>
                <div className="text-[10px] font-mono text-amber-400 font-semibold">{currentStaffUser?.role}</div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsAuthenticated(false);
                setCurrentStaffUser(null);
              }}
              title="Sign Out"
              className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-stone-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* TOP ADMIN NAVBAR */}
        <header className="sticky top-0 z-30 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <span>CMS Workspace</span>
                <span>/</span>
                <span className="text-stone-500 dark:text-stone-400">{activeTab}</span>
              </div>
              <h1 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                {activeTab === 'Overview' && 'Dashboard Overview & Analytics'}
                {activeTab === 'Leads' && 'Devotee Booking Enquiries'}
                {activeTab === 'Blog' && 'WordPress CMS Blog Engine'}
                {activeTab === 'Services' && 'Pooja & Yatra Services Manager'}
                {activeTab === 'Informative' && 'Site Banners & Informative Details'}
                {activeTab === 'Socials' && 'Social Media Handles Control'}
                {activeTab === 'Staff' && 'Staff Access & Roles (RBAC)'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Role Indicator Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Logged in as {currentStaffUser?.role}</span>
            </div>

            <button
              onClick={() => {
                setIsAuthenticated(false);
                setCurrentStaffUser(null);
              }}
              className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 hover:bg-red-100 text-xs font-semibold border border-red-200 dark:border-red-900 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE VIEW AREA */}
        <main className="p-4 md:p-8 space-y-8 flex-1">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'Overview' && userPerms?.canViewOverview && (
            <AdminDashboardOverview
              leads={leads}
              blogCount={blogs.length}
              poojaCount={poojas.length}
              bannerActive={!!settings.announcementBanner?.isActive}
              bannerText={settings.announcementBanner?.text}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* TAB 2: DEVOTEE LEADS CRM */}
          {activeTab === 'Leads' && userPerms?.canManageLeads && (
            <div className="space-y-6">
              {/* Header & Export Toolbar */}
              <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      Devotee Booking & Inquiry CRM
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Manage requests, gotra details, preferred dates, and direct WhatsApp contact.
                    </p>
                  </div>

                  <button
                    onClick={exportLeadsToCSV}
                    className="px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-amber-700 text-white hover:bg-stone-800 dark:hover:bg-amber-800 text-xs font-bold transition-colors flex items-center gap-2 self-start sm:self-auto shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV Report</span>
                  </button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row items-center gap-3 pt-2">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      placeholder="Search by devotee name, phone, or service..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-medium outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>

                  {/* Status Pills Filter */}
                  <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                    {['ALL', 'New', 'Contacted', 'Booked', 'Completed'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setLeadStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                          leadStatusFilter === st
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                        }`}
                      >
                        {st === 'ALL' ? `All (${leads.length})` : st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table List */}
              {filteredLeads.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-500 text-xs">
                  No devotee inquiries match your filter.
                </div>
              ) : (
                <div className="overflow-x-auto bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 uppercase font-bold tracking-wider border-b border-stone-200 dark:border-stone-700">
                      <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Devotee Name & Phone</th>
                        <th className="p-4">Service Requested</th>
                        <th className="p-4">Pref. Date & Gotra Details</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-medium">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-amber-50/50 dark:hover:bg-stone-800/40 transition-colors">
                          <td className="p-4 text-stone-500 dark:text-stone-400 font-mono whitespace-nowrap">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">{lead.name}</div>
                            <div className="font-mono text-stone-600 dark:text-stone-400">{lead.phone}</div>
                            {lead.email && <div className="text-[11px] text-stone-500">{lead.email}</div>}
                          </td>

                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-bold border border-amber-200 dark:border-amber-800">
                              {lead.serviceName || lead.serviceType}
                            </span>
                          </td>

                          <td className="p-4 max-w-xs">
                            {lead.preferredDate && (
                              <div className="text-xs font-bold text-stone-800 dark:text-stone-200 mb-0.5">
                                Date: {lead.preferredDate} ({lead.numberOfPeople || 1} People)
                              </div>
                            )}
                            <p className="text-stone-600 dark:text-stone-400 text-[11px] line-clamp-2">
                              {lead.message || 'No additional gotra notes.'}
                            </p>
                          </td>

                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                              className="px-2.5 py-1 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold outline-none focus:ring-1 focus:ring-amber-600"
                            >
                              <option value="New">🔴 New</option>
                              <option value="Contacted">🟡 Contacted</option>
                              <option value="Booked">🔵 Booked</option>
                              <option value="Completed">🟢 Completed</option>
                              <option value="Archived">⚪ Archived</option>
                            </select>
                          </td>

                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                            <a
                              href={`https://wa.me/${lead.whatsapp || lead.phone.replace(/[^0-9]/g, '')}?text=Jai%20Shree%20Mahakal%20${encodeURIComponent(
                                lead.name
                              )},%20greeting%20from%20Aastha%20Sey%20Raasta%20Seva%20Ujjain.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>

                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.name)}
                              className="p-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-stone-200 transition-colors"
                              title="Delete enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WORDPRESS BLOG MANAGER */}
          {activeTab === 'Blog' && userPerms?.canManageBlogs && <AdminBlogManager />}

          {/* TAB 4: SERVICE PAGES MANAGER */}
          {activeTab === 'Services' && userPerms?.canManageServices && <AdminServicesManager />}

          {/* TAB 5: INFORMATIVE DETAILS */}
          {activeTab === 'Informative' && userPerms?.canManageSettings && <AdminInformativeDetails />}

          {/* TAB 6: SOCIAL MEDIA HANDLES */}
          {activeTab === 'Socials' && userPerms?.canManageSocials && <AdminSocialHandles />}

          {/* TAB 7: STAFF ROLES & RBAC */}
          {activeTab === 'Staff' && userPerms?.canManageStaff && (
            <AdminStaffManager
              currentStaffUser={currentStaffUser}
              onRefreshStaff={() => {
                // refresh staff context
                if (currentStaffUser) {
                  const updatedList = StoreService.getStaffUsers();
                  const match = updatedList.find((u) => u.id === currentStaffUser.id);
                  if (match) setCurrentStaffUser(match);
                }
              }}
            />
          )}

          {/* PERMISSION DENIED FALLBACK */}
          {((activeTab === 'Leads' && !userPerms?.canManageLeads) ||
            (activeTab === 'Blog' && !userPerms?.canManageBlogs) ||
            (activeTab === 'Services' && !userPerms?.canManageServices) ||
            (activeTab === 'Informative' && !userPerms?.canManageSettings) ||
            (activeTab === 'Socials' && !userPerms?.canManageSocials) ||
            (activeTab === 'Staff' && !userPerms?.canManageStaff)) && (
            <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-4 max-w-lg mx-auto my-12">
              <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Access Restricted for {currentStaffUser?.role} Role
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Your account (<strong className="text-stone-900 dark:text-stone-200">{currentStaffUser?.email}</strong>) does not have permission to access the <strong className="text-amber-700 dark:text-amber-400">{activeTab}</strong> module. Please contact the Super Admin (Pt. Sharma) to upgrade your staff permissions.
              </p>
              <button
                onClick={() => setActiveTab('Overview')}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Return to Overview Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};


