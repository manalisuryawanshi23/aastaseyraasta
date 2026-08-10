import React, { useState } from 'react';
import { BlogPost } from '../../types';
import { StoreService } from '../../services/store';
import { WordPressBlogEditor } from './WordPressBlogEditor';
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Search,
  Globe,
  Sparkles,
  Eye,
  Calendar,
  User,
  Tag,
} from 'lucide-react';

export const AdminBlogManager: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(StoreService.getBlogPosts(false));
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const refreshList = () => {
    setBlogs(StoreService.getBlogPosts(false));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete blog post "${title}"?`)) {
      StoreService.deleteBlogPost(id);
      refreshList();
      showToast('Blog post deleted.');
    }
  };

  const handleOpenNewEditor = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditEditor = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isEditorOpen) {
    return (
      <WordPressBlogEditor
        initialPost={editingPost}
        onClose={() => setIsEditorOpen(false)}
        onSaved={() => {
          refreshList();
          setIsEditorOpen(false);
          showToast('Blog post saved successfully.');
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-700" />
            <span>WordPress Blog Section (SEO/AEO/GEO CMS)</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">Manage blog guides with WordPress feature rich editor, AI voice search Q&A (AEO), and local geo-targeting (GEO).</p>
        </div>

        <button
          onClick={handleOpenNewEditor}
          className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs flex items-center gap-1.5 shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Blog Post</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs by title, category or tag..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs"
          />
        </div>

        <div className="text-xs font-mono text-stone-500">
          Total Posts: <span className="font-bold text-stone-800 dark:text-stone-200">{blogs.length}</span>
        </div>
      </div>

      {/* Grid of Blog Posts */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-2xl text-stone-500 text-xs">
          No blog posts found matching query. Click &quot;Write New Blog Post&quot; to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBlogs.map((b) => (
            <div
              key={b.id}
              className="bg-white dark:bg-[#1C1917] rounded-2xl border border-[#121212]/10 dark:border-stone-800 p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {b.featuredImage && (
                  <div className="h-36 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 relative group">
                    <img src={b.featuredImage} alt={b.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-stone-900/80 text-amber-300 text-[10px] font-mono backdrop-blur-sm">
                      {b.category}
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug">
                    {b.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-amber-600" />
                    <span>{b.author}</span>
                  </span>
                  <span>•</span>
                  <span>{b.readingTime || '5 min'}</span>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {b.excerpt}
                </p>

                {/* SEO & AEO Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {b.focusKeyword && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 font-mono">
                      SEO: {b.focusKeyword}
                    </span>
                  )}
                  {b.aeoQuestions && b.aeoQuestions.length > 0 && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 font-mono">
                      AEO Voice ({b.aeoQuestions.length})
                    </span>
                  )}
                  {b.geoCity && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-200 border border-sky-200 dark:border-sky-800 font-mono">
                      GEO: {b.geoCity}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${b.isPublished ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-stone-200 text-stone-700'}`}>
                  {b.isPublished ? 'Published' : 'Draft'}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200"
                    title="View live post"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleOpenEditEditor(b)}
                    className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200"
                    title="Edit with WordPress Editor"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id, b.title)}
                    className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950 hover:bg-red-100 text-red-600 dark:text-red-400"
                    title="Delete post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
