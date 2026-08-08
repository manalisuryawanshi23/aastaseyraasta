import React, { useState } from 'react';
import { StoreService } from '../services/store';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { Lock, Save, Trash2, Plus, CheckCircle2, Phone, Mail, Users, Flame, Settings } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'Leads' | 'Settings' | 'Poojas'>('Leads');

  const [settings, setSettings] = useState(StoreService.getSettings());
  const [leads, setLeads] = useState(StoreService.getLeads());
  const poojas = StoreService.getPoojas();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'mahakal') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid password. Try "admin123"');
    }
  };

  const handleSaveSettings = () => {
    StoreService.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <SEOHead title="Admin CMS Portal | Aastha Sey Raasta Seva" />
        <div className="bg-white dark:bg-[#1C1917] p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#121212] dark:bg-amber-900/60 text-amber-300 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif italic font-bold text-stone-900 dark:text-amber-100">Admin Control Portal</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">Sign in to manage leads, poojas, and site settings.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Passcode</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin passcode (admin123)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-800"
              />
              {loginError && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{loginError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#121212] dark:bg-amber-700 text-white font-medium text-sm hover:bg-stone-800 dark:hover:bg-amber-800 transition-colors"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <SEOHead title="Admin CMS Dashboard" />
      <Breadcrumbs items={[{ label: 'Admin CMS' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#121212]/10 dark:border-stone-800 pb-4">
        <div>
          <h1 className="text-3xl font-serif italic font-bold text-stone-900 dark:text-amber-100">CMS Control Panel</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">Manage Devotee Enquiries & Website Configuration</p>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors self-start sm:self-auto"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#121212]/10 dark:border-stone-800 pb-2">
        <button
          onClick={() => setActiveTab('Leads')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Leads' ? 'bg-[#121212] dark:bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          Devotee Enquiries ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('Settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Settings' ? 'bg-[#121212] dark:bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          Business Settings
        </button>
        <button
          onClick={() => setActiveTab('Poojas')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Poojas' ? 'bg-[#121212] dark:bg-amber-700 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          Pooja Services ({poojas.length})
        </button>
      </div>

      {/* Leads Tab */}
      {activeTab === 'Leads' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">Recent Customer Leads</h3>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-sm">
              No enquiries submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto bg-white dark:bg-[#1C1917] rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F3F1ED] dark:bg-stone-800 border-b border-[#121212]/10 dark:border-stone-700 text-stone-700 dark:text-stone-200 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Devotee Name</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Service Requested</th>
                    <th className="p-3.5">Notes / Gotra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-medium text-stone-800 dark:text-stone-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-amber-50/50 dark:hover:bg-stone-800/50 transition-colors">
                      <td className="p-3.5 text-stone-500 dark:text-stone-400 font-mono whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3.5 font-bold text-stone-900 dark:text-stone-100">{lead.name}</td>
                      <td className="p-3.5 font-mono">{lead.phone}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-semibold border border-amber-200 dark:border-amber-800">
                          {lead.serviceName || lead.serviceType}
                        </span>
                      </td>
                      <td className="p-3.5 text-stone-600 dark:text-stone-400 max-w-xs truncate">{lead.message || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'Settings' && (
        <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-6 max-w-3xl">
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100 border-b border-[#121212]/10 dark:border-stone-800 pb-2">
            Website Business Settings
          </h3>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Settings updated successfully!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Business Name (English)</label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Hindi Name</label>
              <input
                type="text"
                value={settings.hindiBusinessName}
                onChange={(e) => setSettings({ ...settings, hindiBusinessName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Primary Phone 1</label>
              <input
                type="text"
                value={settings.phone1}
                onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Secondary Phone 2</label>
              <input
                type="text"
                value={settings.phone2}
                onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium"
              />
            </div>
          </div>

          <button
            onClick={handleSaveSettings}
            className="py-3 px-6 rounded-xl bg-[#121212] dark:bg-amber-700 text-white font-medium text-xs hover:bg-stone-800 dark:hover:bg-amber-800 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      )}

      {/* Poojas Tab */}
      {activeTab === 'Poojas' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-amber-100">Configured Pooja Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {poojas.map((p) => (
              <div key={p.id} className="bg-white dark:bg-[#1C1917] p-4 rounded-xl border border-[#121212]/10 dark:border-stone-800 space-y-2">
                <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">{p.name}</div>
                <div className="text-xs text-stone-500 dark:text-stone-400">{p.city} • {p.templeName}</div>
                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">{p.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
