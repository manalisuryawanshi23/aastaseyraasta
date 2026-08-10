import React, { useState } from 'react';
import { SocialHandle, SiteSettings } from '../../types';
import { StoreService } from '../../services/store';
import {
  Share2,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Save,
  Globe,
  ExternalLink,
  X,
  Power,
  MessageSquare,
  Video,
  Send,
} from 'lucide-react';

export const AdminSocialHandles: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(StoreService.getSettings());
  const [handles, setHandles] = useState<SocialHandle[]>(settings.socialHandles || []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHandle, setEditingHandle] = useState<SocialHandle | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const saveHandlesToSettings = (newHandles: SocialHandle[]) => {
    const updatedSettings = {
      ...settings,
      socialHandles: newHandles,
    };
    StoreService.updateSettings(updatedSettings);
    setSettings(updatedSettings);
    setHandles(newHandles);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleActive = (id: string) => {
    const updated = handles.map((h) => (h.id === id ? { ...h, isActive: !h.isActive } : h));
    saveHandlesToSettings(updated);
    showToast('Social handle status updated.');
  };

  const handleDelete = (id: string, platform: string) => {
    if (window.confirm(`Are you sure you want to remove ${platform}?`)) {
      const updated = handles.filter((h) => h.id !== id);
      saveHandlesToSettings(updated);
      showToast(`${platform} handle removed.`);
    }
  };

  const handleOpenAddModal = () => {
    setEditingHandle({
      id: `soc-${Date.now()}`,
      platform: 'Instagram',
      handle: '@aasthaserasta',
      url: 'https://instagram.com/aasthaserasta',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (h: SocialHandle) => {
    setEditingHandle({ ...h });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHandle) return;

    const existingIdx = handles.findIndex((h) => h.id === editingHandle.id);
    let updated: SocialHandle[];

    if (existingIdx !== -1) {
      updated = [...handles];
      updated[existingIdx] = editingHandle;
    } else {
      updated = [editingHandle, ...handles];
    }

    saveHandlesToSettings(updated);
    setIsModalOpen(false);
    showToast('Social handle saved successfully!');
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return 'bg-blue-600 text-white';
      case 'instagram':
        return 'bg-gradient-to-r from-purple-600 to-pink-500 text-white';
      case 'youtube':
        return 'bg-red-600 text-white';
      case 'whatsapp channel':
      case 'whatsapp':
        return 'bg-emerald-600 text-white';
      case 'telegram':
        return 'bg-sky-500 text-white';
      case 'x (twitter)':
      case 'twitter':
        return 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900';
      default:
        return 'bg-amber-700 text-white';
    }
  };

  return (
    <div className="bg-white dark:bg-[#1C1917] p-6 sm:p-8 rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-sm space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-700" />
            <span>Social Media Handles Management</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">Add, edit, or toggle active status of social media profiles rendered across website footer, contact & share buttons.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Handle</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Handles List */}
      {handles.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-2xl text-stone-500 text-xs">
          No social handles configured. Click &quot;Add Social Handle&quot; to add one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {handles.map((h) => (
            <div
              key={h.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                h.isActive
                  ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-sm'
                  : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-900 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${getPlatformColor(h.platform)}`}>
                    {h.platform}
                  </span>
                  <div>
                    <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100">{h.handle}</h3>
                    <a
                      href={h.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 font-mono truncate max-w-[180px]"
                    >
                      <span>{h.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleActive(h.id)}
                  title={h.isActive ? 'Deactivate' : 'Activate'}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    h.isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-stone-200 text-stone-600 border-stone-300 dark:bg-stone-800 dark:text-stone-400'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${h.isActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-stone-200 text-stone-600'}`}>
                  {h.isActive ? 'Active on Site' : 'Inactive / Hidden'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(h)}
                    className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(h.id, h.platform)}
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

      {/* Add / Edit Modal */}
      {isModalOpen && editingHandle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                {handles.some((h) => h.id === editingHandle.id) ? 'Edit Social Handle' : 'Add New Social Handle'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Social Platform *</label>
                <select
                  value={editingHandle.platform}
                  onChange={(e) => setEditingHandle({ ...editingHandle, platform: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium"
                >
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="WhatsApp Channel">WhatsApp Channel</option>
                  <option value="Telegram">Telegram</option>
                  <option value="X (Twitter)">X (Twitter)</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Pinterest">Pinterest</option>
                  <option value="Google Business">Google Business Profile</option>
                  <option value="Other">Other Custom</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Handle Name / Profile Display *</label>
                <input
                  type="text"
                  required
                  value={editingHandle.handle}
                  onChange={(e) => setEditingHandle({ ...editingHandle, handle: e.target.value })}
                  placeholder="e.g. @aasthaserasta or Aastha Seva Channel"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Direct Profile URL *</label>
                <input
                  type="url"
                  required
                  value={editingHandle.url}
                  onChange={(e) => setEditingHandle({ ...editingHandle, url: e.target.value })}
                  placeholder="https://instagram.com/aasthaserasta"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingHandle.isActive}
                    onChange={(e) => setEditingHandle({ ...editingHandle, isActive: e.target.checked })}
                    className="w-4 h-4 accent-amber-700 rounded"
                  />
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Active on Website</span>
                </label>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Handle</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
