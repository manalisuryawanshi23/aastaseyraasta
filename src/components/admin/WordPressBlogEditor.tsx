import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import { StoreService } from '../../services/store';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Trash2,
  Plus,
  Save,
  Eye,
  Edit3,
  Globe,
  HelpCircle,
  MapPin,
  Tag,
  X,
  ArrowLeft,
  FileText,
  Search,
} from 'lucide-react';

interface WordPressBlogEditorProps {
  initialPost?: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
}

export const WordPressBlogEditor: React.FC<WordPressBlogEditorProps> = ({
  initialPost,
  onClose,
  onSaved,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'editor' | 'preview' | 'seo_aeo_geo'>('editor');

  // Form State
  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [featuredImage, setFeaturedImage] = useState(initialPost?.featuredImage || '');
  const [author, setAuthor] = useState(initialPost?.author || 'Vaidik Acharya');
  const [category, setCategory] = useState(initialPost?.category || 'Pooja Guides');
  const [tagsInput, setTagsInput] = useState(initialPost?.tags ? initialPost.tags.join(', ') : 'Ujjain, Mahakal, Pooja');
  const [readingTime, setReadingTime] = useState(initialPost?.readingTime || '5 min read');
  const [isFeatured, setIsFeatured] = useState(initialPost?.isFeatured || false);
  const [isPublished, setIsPublished] = useState(initialPost?.isPublished ?? true);

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState(initialPost?.seoTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialPost?.metaDescription || '');
  const [focusKeyword, setFocusKeyword] = useState(initialPost?.focusKeyword || '');
  const [secondaryKeywordsInput, setSecondaryKeywordsInput] = useState(
    initialPost?.secondaryKeywords ? initialPost.secondaryKeywords.join(', ') : ''
  );
  const [canonicalUrl, setCanonicalUrl] = useState(initialPost?.canonicalUrl || '');

  // AEO Fields (Voice Search & Answer Engine Optimization)
  const [aeoQuestions, setAeoQuestions] = useState<{ question: string; answer: string }[]>(
    initialPost?.aeoQuestions && initialPost.aeoQuestions.length > 0
      ? initialPost.aeoQuestions
      : [
          {
            question: 'What is the significance of this ritual in Ujjain?',
            answer: 'Performing this ritual in Ujjain Mahakal sanctum is traditionally believed to grant immense spiritual peace and planetary remedies.',
          },
        ]
  );
  const [keyTakeawaysInput, setKeyTakeawaysInput] = useState(
    initialPost?.keyTakeaways ? initialPost.keyTakeaways.join('\n') : '1. Authentic Vedic Brahmins\n2. Complete Samagri Included\n3. Gotra Sankalp'
  );

  // GEO Fields (Generative Engine Optimization & Local Location)
  const [geoCity, setGeoCity] = useState(initialPost?.geoCity || 'Ujjain');
  const [geoRegion, setGeoRegion] = useState(initialPost?.geoRegion || 'Madhya Pradesh');
  const [geoEntitiesInput, setGeoEntitiesInput] = useState(
    initialPost?.geoEntities ? initialPost.geoEntities.join(', ') : 'Mahakaleshwar Temple, Kshipra River, Ramghat'
  );

  const [savedMessage, setSavedMessage] = useState('');

  // Auto-generate slug from title if empty
  useEffect(() => {
    if (!initialPost && title && !slug) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  }, [title, slug, initialPost]);

  // Stock images for quick selection
  const stockImages = [
    { label: 'Mahakal Temple', url: '/assets/images/header_bg_spiritual_1786196057015.jpg' },
    { label: 'Rudrabhishek', url: '/assets/images/pooja_rudrabhishek_1786196070818.jpg' },
    { label: 'Bhat Pooja', url: '/assets/images/pooja_bhat_mangalnath_1786196085583.jpg' },
    { label: 'Baglamukhi', url: '/assets/images/pooja_baglamukhi_havan_1786196097113.jpg' },
    { label: 'Pitru Ramghat', url: '/assets/images/pooja_pitru_ramghat_1786196153062.jpg' },
    { label: 'Mahamrityunjaya', url: '/assets/images/pooja_mahamrityunjaya_1786196166868.jpg' },
  ];

  // Rich text formatting helpers
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('wp-post-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || 'text';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 50);
  };

  // SEO / AEO / GEO Score Calculation
  const calculateScores = () => {
    let score = 0;
    const checks: { label: string; passed: boolean; tip: string }[] = [];

    // Title length
    const titleOk = title.length >= 20 && title.length <= 70;
    if (titleOk) score += 15;
    checks.push({
      label: 'Title Length (20-70 chars)',
      passed: titleOk,
      tip: title.length === 0 ? 'Enter a post title' : `Current: ${title.length} chars`,
    });

    // Content length
    const contentOk = content.length >= 300;
    if (contentOk) score += 20;
    checks.push({
      label: 'Comprehensive Content (300+ chars)',
      passed: contentOk,
      tip: `Current length: ${content.length} chars`,
    });

    // Featured Image
    const imgOk = !!featuredImage;
    if (imgOk) score += 15;
    checks.push({
      label: 'Featured Image Set',
      passed: imgOk,
      tip: imgOk ? 'Featured image configured' : 'Select or enter an image URL',
    });

    // Focus Keyword
    const kwOk = !!focusKeyword && (title.toLowerCase().includes(focusKeyword.toLowerCase()) || content.toLowerCase().includes(focusKeyword.toLowerCase()));
    if (kwOk) score += 15;
    checks.push({
      label: 'Focus Keyword in Title or Content',
      passed: kwOk,
      tip: focusKeyword ? `Focus keyword: "${focusKeyword}"` : 'Enter a focus keyword',
    });

    // AEO Voice Search Questions
    const aeoOk = aeoQuestions.length > 0 && aeoQuestions.some((q) => q.question && q.answer);
    if (aeoOk) score += 15;
    checks.push({
      label: 'AEO Voice Search Q&A Configured',
      passed: aeoOk,
      tip: 'Helps Siri, Alexa & Gemini answer user queries',
    });

    // GEO Location context
    const geoOk = !!geoCity && !!geoEntitiesInput;
    if (geoOk) score += 20;
    checks.push({
      label: 'GEO Local Target & Entities Set',
      passed: geoOk,
      tip: `City: ${geoCity || 'Not set'}`,
    });

    return { score, checks };
  };

  const { score, checks } = calculateScores();

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a blog post title.');
      return;
    }

    const tagsArr = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const secondaryKwArr = secondaryKeywordsInput
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    const takeawaysArr = keyTakeawaysInput
      .split('\n')
      .map((k) => k.trim())
      .filter(Boolean);

    const geoEntitiesArr = geoEntitiesInput
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);

    const saved = StoreService.saveBlogPost({
      id: initialPost?.id,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt,
      content,
      featuredImage,
      author,
      category,
      tags: tagsArr,
      readingTime,
      isFeatured,
      isPublished,
      seoTitle: seoTitle || title,
      metaDescription: metaDescription || excerpt,
      focusKeyword,
      secondaryKeywords: secondaryKwArr,
      canonicalUrl,
      aeoQuestions,
      keyTakeaways: takeawaysArr,
      geoCity,
      geoRegion,
      geoEntities: geoEntitiesArr,
    });

    setSavedMessage('Blog post saved successfully!');
    setTimeout(() => {
      setSavedMessage('');
      onSaved();
    }, 1200);
  };

  const addAeoQuestion = () => {
    setAeoQuestions([...aeoQuestions, { question: '', answer: '' }]);
  };

  const removeAeoQuestion = (index: number) => {
    setAeoQuestions(aeoQuestions.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-[#1C1917] rounded-2xl border border-[#121212]/10 dark:border-stone-800 shadow-xl overflow-hidden space-y-6 p-6">
      
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100 flex items-center gap-2">
              <span>{initialPost ? 'WordPress Feature Editor — Edit Post' : 'WordPress Feature Editor — Create Post'}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                SEO/AEO/GEO Ready
              </span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">Craft rich blog articles with AI voice & local generative engine optimization.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs shadow-md transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {savedMessage && (
        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Editor Sub Tabs */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('editor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'editor'
                ? 'bg-[#121212] dark:bg-amber-700 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Feature Editor</span>
          </button>

          <button
            onClick={() => setActiveSubTab('preview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'preview'
                ? 'bg-[#121212] dark:bg-amber-700 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Article Preview</span>
          </button>

          <button
            onClick={() => setActiveSubTab('seo_aeo_geo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'seo_aeo_geo'
                ? 'bg-[#121212] dark:bg-amber-700 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>SEO / AEO / GEO Engine</span>
            <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${score >= 70 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
              {score}%
            </span>
          </button>
        </div>

        {/* Quick SEO Score Badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
          <span className="text-stone-500 dark:text-stone-400">Optimization Score:</span>
          <span className={`px-2 py-0.5 rounded-lg font-bold ${score >= 80 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}`}>
            {score} / 100
          </span>
        </div>
      </div>

      {/* SUB-TAB 1: Feature Editor */}
      {activeSubTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column: Content & Formatting */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Post Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Complete Guide to Rudrabhishek Pooja in Ujjain Mahakal Sanctum"
                className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-base font-serif font-bold outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="rudrabhishek-pooja-guide-ujjain"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-medium"
                >
                  <option value="Pooja Guides">Pooja Guides</option>
                  <option value="Temple Heritage">Temple Heritage</option>
                  <option value="Dosh Remedies">Dosh Remedies</option>
                  <option value="Spiritual Yatras">Spiritual Yatras</option>
                  <option value="Ujjain Traditions">Ujjain Traditions</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Short Excerpt / Summary</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="A brief summary describing what the devotee will learn in this post..."
                className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs"
              />
            </div>

            {/* WordPress Style Toolbar */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Article Body (WordPress Style Rich Formatting)
              </label>

              <div className="flex flex-wrap items-center gap-1 p-2 rounded-t-xl bg-[#F3F1ED] dark:bg-stone-800 border border-stone-300 dark:border-stone-700 border-b-0 text-stone-700 dark:text-stone-200">
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  title="Bold"
                  className="p-1.5 rounded hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  title="Italic"
                  className="p-1.5 rounded hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-stone-300 dark:bg-stone-600 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting('## ')}
                  title="Heading 2"
                  className="p-1.5 rounded hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors font-bold text-xs"
                >
                  <Heading2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ')}
                  title="Heading 3"
                  className="p-1.5 rounded hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors font-bold text-xs"
                >
                  <Heading3 className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-stone-300 dark:bg-stone-600 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting('- ')}
                  title="Bullet List"
                  className="p-1.5 rounded hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('1. ')}
                  title="Numbered List"
                  className="p-1.5 rounded hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> ')}
                  title="Blockquote"
                  className="p-1.5 rounded hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-stone-300 dark:bg-stone-600 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting('![Image Alt](', ')')}
                  title="Insert Image"
                  className="p-1.5 rounded hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('[Link Text](', ')')}
                  title="Insert Link"
                  className="p-1.5 rounded hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>

              <textarea
                id="wp-post-editor"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={14}
                placeholder="Write article content using Markdown or standard text. Supports ## Headings, - Bullet lists, > Quotes, and images..."
                className="w-full p-4 rounded-b-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-mono leading-relaxed"
              />
            </div>
          </div>

          {/* Sidebar Column: Featured Image & Attributes */}
          <div className="space-y-6">
            
            {/* Featured Image */}
            <div className="bg-[#F8F6F0] dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-700" />
                <span>Featured Image</span>
              </h3>

              {featuredImage ? (
                <div className="relative rounded-xl overflow-hidden border border-stone-300 dark:border-stone-700 aspect-video group">
                  <img src={featuredImage} alt="Featured preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white text-xs opacity-90 hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 text-center text-xs text-stone-500">
                  No image selected yet.
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs"
                />
              </div>

              {/* Quick Stock Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1.5">Pick Sacred Preset Image</label>
                <div className="grid grid-cols-3 gap-2">
                  {stockImages.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setFeaturedImage(img.url)}
                      className="p-1 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-amber-600 text-[10px] text-stone-700 dark:text-stone-300 truncate text-center bg-white dark:bg-stone-950"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Post Attributes */}
            <div className="bg-[#F8F6F0] dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4 text-xs">
              <h3 className="font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider text-[11px]">Post Attributes</h3>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Author Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Ujjain, Mahakal, Rudrabhishek"
                  className="w-full p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-800">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Featured Post</span>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 accent-amber-700 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Publish Immediately</span>
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 accent-amber-700 rounded"
                />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB-TAB 2: Live Article Preview */}
      {activeSubTab === 'preview' && (
        <div className="max-w-3xl mx-auto p-6 bg-[#FAFAF8] dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-6">
          <div className="text-xs text-amber-800 dark:text-amber-400 font-mono font-semibold uppercase tracking-wider">
            Category: {category} • By {author}
          </div>

          <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-amber-100 leading-tight">
            {title || 'Untitled Blog Article'}
          </h1>

          {excerpt && (
            <p className="text-sm italic text-stone-600 dark:text-stone-300 border-l-2 border-amber-700 pl-4 py-1">
              {excerpt}
            </p>
          )}

          {featuredImage && (
            <div className="rounded-2xl overflow-hidden aspect-video shadow-md">
              <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none text-xs text-stone-800 dark:text-stone-200 whitespace-pre-wrap leading-relaxed">
            {content || 'Article content preview will render here...'}
          </div>

          {/* Key Takeaways Box */}
          {keyTakeawaysInput && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-2">
              <div className="font-serif font-bold text-xs text-amber-900 dark:text-amber-200">Key Takeaways (AEO Summary):</div>
              <ul className="text-xs text-stone-700 dark:text-stone-300 list-disc list-inside space-y-1">
                {keyTakeawaysInput.split('\n').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: SEO / AEO / GEO Engine */}
      {activeSubTab === 'seo_aeo_geo' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Standard SEO Settings */}
            <div className="bg-[#F8F6F0] dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
              <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-700" />
                <span>1. Standard Search Engine Optimization (SEO)</span>
              </h3>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">SEO Meta Title</label>
                  <span className="font-mono text-[11px] text-stone-500">{seoTitle.length} / 60 chars</span>
                </div>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={title || 'Meta Title for Search Engines'}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label className="font-semibold text-stone-700 dark:text-stone-300">Meta Description</label>
                  <span className="font-mono text-[11px] text-stone-500">{metaDescription.length} / 160 chars</span>
                </div>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={2}
                  placeholder={excerpt || 'Meta Description shown in Google Search snippets...'}
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Focus Target Keyword</label>
                  <input
                    type="text"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    placeholder="e.g. Rudrabhishek Pooja Ujjain"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Secondary Keywords (Comma separated)</label>
                  <input
                    type="text"
                    value={secondaryKeywordsInput}
                    onChange={(e) => setSecondaryKeywordsInput(e.target.value)}
                    placeholder="Mahakal Abhishek, Ujjain Pandit, Pooja cost"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>
            </div>

            {/* 2. AEO (Answer Engine Optimization - Voice & AI Search) */}
            <div className="bg-[#F8F6F0] dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    <span>2. AEO — Voice Search & Answer Engine Optimization</span>
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Add crisp Q&A pairs for Siri, Alexa, Gemini & ChatGPT voice queries.</p>
                </div>
                <button
                  type="button"
                  onClick={addAeoQuestion}
                  className="px-3 py-1.5 rounded-xl bg-amber-700 text-white text-xs font-medium flex items-center gap-1 hover:bg-amber-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Q&A</span>
                </button>
              </div>

              <div className="space-y-3">
                {aeoQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-700">Voice Query #{idx + 1}</span>
                      {aeoQuestions.length > 1 && (
                        <button onClick={() => removeAeoQuestion(idx)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => {
                        const updated = [...aeoQuestions];
                        updated[idx].question = e.target.value;
                        setAeoQuestions(updated);
                      }}
                      placeholder="e.g. What is the best time for Rudrabhishek Pooja in Ujjain?"
                      className="w-full p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-medium"
                    />
                    <textarea
                      value={q.answer}
                      onChange={(e) => {
                        const updated = [...aeoQuestions];
                        updated[idx].answer = e.target.value;
                        setAeoQuestions(updated);
                      }}
                      rows={2}
                      placeholder="Concise, direct answer for voice assistant output..."
                      className="w-full p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Key Takeaways (One per line)</label>
                <textarea
                  value={keyTakeawaysInput}
                  onChange={(e) => setKeyTakeawaysInput(e.target.value)}
                  rows={3}
                  placeholder="Key takeaway 1&#10;Key takeaway 2"
                  className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs"
                />
              </div>
            </div>

            {/* 3. GEO (Generative Engine Optimization & Local Location Context) */}
            <div className="bg-[#F8F6F0] dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
              <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>3. GEO — Local Geo-Targeting & Generative Engine Anchor</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Target City</label>
                  <input
                    type="text"
                    value={geoCity}
                    onChange={(e) => setGeoCity(e.target.value)}
                    placeholder="e.g. Ujjain"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Target Region / State</label>
                  <input
                    type="text"
                    value={geoRegion}
                    onChange={(e) => setGeoRegion(e.target.value)}
                    placeholder="e.g. Madhya Pradesh"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Local Sacred Entities & Landmarks (Comma separated)</label>
                  <input
                    type="text"
                    value={geoEntitiesInput}
                    onChange={(e) => setGeoEntitiesInput(e.target.value)}
                    placeholder="Mahakaleshwar Jyotirlinga, Kshipra Ramghat, Harsiddhi Temple"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* SEO/AEO/GEO Live Audit Report Sidebar */}
          <div className="bg-[#F8F6F0] dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4 self-start">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100 border-b border-stone-200 dark:border-stone-800 pb-2">
              Optimization Checklist & Score
            </h3>

            <div className="text-center py-3 bg-white dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800">
              <div className="text-3xl font-serif font-bold text-amber-700">{score} / 100</div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                {score >= 80 ? '🌟 Excellent Optimization' : score >= 60 ? '👍 Good Progress' : '⚠️ Needs Optimization'}
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {checks.map((chk, i) => (
                <div key={i} className="flex items-start gap-2">
                  {chk.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className={`font-semibold ${chk.passed ? 'text-stone-800 dark:text-stone-200' : 'text-stone-600 dark:text-stone-400'}`}>
                      {chk.label}
                    </div>
                    <div className="text-[10px] text-stone-500">{chk.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
