import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Lead } from '../../types';
import {
  Users,
  FileText,
  Flame,
  Info,
  TrendingUp,
  ArrowUpRight,
  UserCheck,
  Sparkles,
  BarChart3,
  MessageCircle,
  Clock,
  ChevronRight,
  Eye,
  Filter,
  Sparkle,
  Calendar,
  MousePointer,
  CheckCircle2,
} from 'lucide-react';

interface AdminDashboardOverviewProps {
  leads: Lead[];
  blogCount: number;
  poojaCount: number;
  bannerActive: boolean;
  bannerText?: string;
  onNavigateTab: (tab: 'Leads' | 'Blog' | 'Services' | 'Informative' | 'Socials') => void;
}

// Sample time-series data for Booking Trends (past 10 days)
const bookingTrendsData = [
  { date: 'Aug 01', poojas: 12, tours: 5, whatsapp: 18, visitors: 320 },
  { date: 'Aug 02', poojas: 15, tours: 7, whatsapp: 22, visitors: 390 },
  { date: 'Aug 03', poojas: 18, tours: 9, whatsapp: 28, visitors: 450 },
  { date: 'Aug 04', poojas: 14, tours: 6, whatsapp: 20, visitors: 410 },
  { date: 'Aug 05', poojas: 22, tours: 11, whatsapp: 35, visitors: 560 },
  { date: 'Aug 06', poojas: 26, tours: 14, whatsapp: 42, visitors: 620 },
  { date: 'Aug 07', poojas: 20, tours: 10, whatsapp: 30, visitors: 510 },
  { date: 'Aug 08', poojas: 28, tours: 16, whatsapp: 48, visitors: 690 },
  { date: 'Aug 09', poojas: 32, tours: 18, whatsapp: 55, visitors: 780 },
  { date: 'Aug 10', poojas: 35, tours: 21, whatsapp: 62, visitors: 840 },
];

// Popular Services Breakdown Data
const popularServicesData = [
  { name: 'Kalsarp Dosh Shanti', bookings: 142, revenue: 312000, color: '#D97706' },
  { name: 'Ujjain 2-Day Yatra', bookings: 98, revenue: 441000, color: '#B45309' },
  { name: 'Mahamrityunjay Jaap', bookings: 86, revenue: 430000, color: '#059669' },
  { name: 'Mangaldosh Shanti', bookings: 74, revenue: 185000, color: '#DC2626' },
  { name: 'Bhasma Aarti Assistance', bookings: 65, revenue: 130000, color: '#7C3AED' },
  { name: 'Chintaman Ganesh Pooja', bookings: 42, revenue: 84000, color: '#2563EB' },
];

// Category Distribution Pie Chart Data
const categoryDistributionData = [
  { name: 'Dosh Nivaran Poojas', value: 48, color: '#D97706' },
  { name: 'Ujjain & Omkareshwar Tours', value: 26, color: '#059669' },
  { name: 'Mahakal Bhasma Aarti', value: 16, color: '#7C3AED' },
  { name: 'Special Rituals & Havans', value: 10, color: '#2563EB' },
];

// Traffic Metrics Data (past 7 days traffic sources)
const trafficSourcesData = [
  { source: 'Google Organic / GEO Search', sessions: 2840, conversion: '8.4%' },
  { source: 'WhatsApp Direct Links', sessions: 1920, conversion: '14.2%' },
  { source: 'WordPress Blog Posts', sessions: 1450, conversion: '6.1%' },
  { source: 'Social Media (Instagram/YouTube)', sessions: 980, conversion: '4.8%' },
  { source: 'Direct URL Visits', sessions: 620, conversion: '9.0%' },
];

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  leads,
  blogCount,
  poojaCount,
  bannerActive,
  bannerText,
  onNavigateTab,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Compute lead stats
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const bookedLeads = leads.filter((l) => l.status === 'Booked' || l.status === 'Completed').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner & Time Range Filter */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 shadow-xl border border-amber-900/40 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-time Analytics & CRM Insights</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
            Jai Shree Mahakal! Welcome back to Admin Control
          </h2>
          <p className="text-xs md:text-sm text-amber-200/80 leading-relaxed">
            Monitor devotee booking trends, website traffic performance, top performed poojas, and manage live WordPress content.
          </p>
        </div>

        {/* Time Filter Controls */}
        <div className="relative z-10 flex items-center gap-2 bg-stone-950/60 p-1.5 rounded-2xl border border-stone-800 self-start md:self-auto">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timeRange === '7d'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-400 hover:text-amber-200 hover:bg-stone-800'
            }`}
          >
            Past 7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timeRange === '30d'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-400 hover:text-amber-200 hover:bg-stone-800'
            }`}
          >
            Past 30 Days
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              timeRange === '90d'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-400 hover:text-amber-200 hover:bg-stone-800'
            }`}
          >
            Quarterly (90d)
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">{leads.length}</div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +24%
            </span>
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium flex items-center gap-1.5 pt-1">
            <span className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 font-bold">
              {newLeads} New
            </span>
            <span>• {contactedLeads} Contacted • {bookedLeads} Booked</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Estimated Visitors</span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">7,810</div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +38%
            </span>
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium flex items-center gap-1 pt-1">
            <MousePointer className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>GEO & Google AI Search Indexed</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">CMS Blog Engine</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">{blogCount}</div>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">Posts Live</span>
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium flex items-center gap-1 pt-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Optimized for Ujjain SEO</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Services</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">{poojaCount}</div>
            <span className="text-xs font-bold text-stone-500">Packages</span>
          </div>
          <div className="text-[11px] font-medium flex items-center gap-1 pt-1">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                bannerActive
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
              }`}
            >
              {bannerActive ? 'Banner Active' : 'Banner Hidden'}
            </span>
          </div>
        </div>
      </div>

      {/* CHART SECTION 1: Booking Trends Over Time */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div className="text-[11px] font-bold font-mono text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Growth & Demand Analytics
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-600" />
              <span>Devotee Booking & Inquiry Trends</span>
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Pooja Bookings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>WhatsApp Direct</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Tour Packages</span>
            </div>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <AreaChart data={bookingTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPoojas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D97706" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D97706" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorWhatsapp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorTours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#A8A29E" />
              <YAxis tick={{ fontSize: 11 }} stroke="#A8A29E" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1917',
                  borderColor: '#44403C',
                  borderRadius: '12px',
                  color: '#F5F5F4',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="poojas" name="Pooja Bookings" stroke="#D97706" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPoojas)" />
              <Area type="monotone" dataKey="whatsapp" name="WhatsApp Inquiries" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorWhatsapp)" />
              <Area type="monotone" dataKey="tours" name="Tour Package Enquiries" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorTours)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART SECTION 2: Popular Services & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Services Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div>
            <div className="text-[11px] font-bold font-mono text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Service Popularity
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-600" />
              <span>Most Requested Pooja & Yatra Offerings</span>
            </h3>
          </div>

          <div className="w-full h-72 pt-2">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={popularServicesData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#A8A29E" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="#A8A29E" width={140} />
                <Tooltip
                  formatter={(value: any) => [`${value} Inquiries`, 'Volume']}
                  contentStyle={{
                    backgroundColor: '#1C1917',
                    borderColor: '#44403C',
                    borderRadius: '12px',
                    color: '#F5F5F4',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="bookings" radius={[0, 8, 8, 0]} barSize={22}>
                  {popularServicesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold font-mono text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Category Share
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Sparkle className="w-5 h-5 text-amber-600" />
              <span>Inquiry Category Mix</span>
            </h3>
          </div>

          <div className="w-full h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'Share']}
                  contentStyle={{
                    backgroundColor: '#1C1917',
                    borderColor: '#44403C',
                    borderRadius: '12px',
                    color: '#F5F5F4',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
            {categoryDistributionData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-medium text-stone-700 dark:text-stone-300">{cat.name}</span>
                </div>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: Traffic Metrics & Live Devotee Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources Table */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div>
            <div className="text-[11px] font-bold font-mono text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Acquisition Channels
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>Website Traffic Metrics</span>
            </h3>
          </div>

          <div className="space-y-3">
            {trafficSourcesData.map((channel, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-stone-900 dark:text-stone-100">{channel.source}</div>
                  <div className="text-[10px] text-stone-500 font-mono">{channel.sessions} visitors</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                    {channel.conversion} conv.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Devotee Inquiries Table */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold font-mono text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Live Feed
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>Recent Devotee Booking Leads</span>
              </h3>
            </div>

            <button
              onClick={() => onNavigateTab('Leads')}
              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All ({leads.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold uppercase tracking-wider border-b border-stone-200 dark:border-stone-700">
                <tr>
                  <th className="p-3">Devotee</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Preferred Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-medium">
                {leads.slice(0, 5).map((l) => (
                  <tr key={l.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-stone-900 dark:text-stone-100">{l.name}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{l.phone}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 font-semibold border border-amber-200 dark:border-amber-800">
                        {l.serviceName || l.serviceType}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-stone-600 dark:text-stone-400">
                      {l.preferredDate || 'Flexible'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          l.status === 'New'
                            ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            : l.status === 'Contacted'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : l.status === 'Booked'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={`https://wa.me/${l.whatsapp || l.phone.replace(/[^0-9]/g, '')}?text=Jai%20Shree%20Mahakal%20${encodeURIComponent(
                          l.name
                        )},%20regards%20your%20${encodeURIComponent(l.serviceName || 'Pooja')}%20booking%20enquiry.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 4: Quick Operations Cards */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Quick Admin Management Shortcuts</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigateTab('Leads')}
            className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-800/80 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-amber-200/80 dark:border-stone-700 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>Devotee Enquiries</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600" />
            </div>
            <div className="text-[11px] text-stone-500">Filter, export, and respond to devotee inquiries.</div>
          </button>

          <button
            onClick={() => onNavigateTab('Blog')}
            className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-800/80 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-amber-200/80 dark:border-stone-700 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>WordPress Blog CMS</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600" />
            </div>
            <div className="text-[11px] text-stone-500">Publish articles, SEO tags, and pilgrim guides.</div>
          </button>

          <button
            onClick={() => onNavigateTab('Services')}
            className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-800/80 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-amber-200/80 dark:border-stone-700 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>Pooja & Yatra Packages</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600" />
            </div>
            <div className="text-[11px] text-stone-500">Update dakshina pricing, benefits, and steps.</div>
          </button>

          <button
            onClick={() => onNavigateTab('Informative')}
            className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-800/80 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-amber-200/80 dark:border-stone-700 text-left transition-all group space-y-2"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Info className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>Announcement Banner</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600" />
            </div>
            <div className="text-[11px] text-stone-500">Set top notification banner for special festivals.</div>
          </button>
        </div>
      </div>
    </div>
  );
};
