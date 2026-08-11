import React, { useState } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  Users,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  Plus,
  X,
  MessageSquare,
  Sparkles,
  Flame,
  Compass,
  MapPin,
  Calendar,
  Grid,
  SlidersHorizontal,
  Image as ImageIcon,
  ShieldCheck,
} from 'lucide-react';
import { Testimonial } from '../types';
import { StoreService } from '../services/store';
import { FadeIn } from './FadeIn';

interface TestimonialsProps {
  testimonials?: Testimonial[];
  onOpenBooking?: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials: propTestimonials,
  onOpenBooking,
}) => {
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(() => {
    return propTestimonials || StoreService.getTestimonials();
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('carousel');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Review Submission Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [testimonialText, setTestimonialText] = useState('');
  const [serviceType, setServiceType] = useState<'Pooja' | 'Tour' | 'Bhat Pooja' | 'General'>('Pooja');
  const [serviceName, setServiceName] = useState('');
  const [reviewPhotoUrl, setReviewPhotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Lightbox modal for review photo view
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  // Filtered list based on selected category
  const filteredTestimonials = allTestimonials.filter((t) => {
    if (!t.isPublished) return false;
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Pooja') return t.category === 'Pooja' || Boolean(t.service);
    if (activeCategory === 'Tour') return t.category === 'Tour' || Boolean(t.tour);
    if (activeCategory === 'Bhat Pooja') return t.category === 'Bhat Pooja' || (t.service && t.service.toLowerCase().includes('bhat'));
    return true;
  });

  const categories = [
    { id: 'All', label: 'All Reviews', icon: Users },
    { id: 'Pooja', label: 'Pooja Rituals', icon: Flame },
    { id: 'Bhat Pooja', label: 'Bhat & Mangal Pooja', icon: Sparkles },
    { id: 'Tour', label: 'Yatra & Tours', icon: Compass },
  ];

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % Math.max(1, filteredTestimonials.length));
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + filteredTestimonials.length) % Math.max(1, filteredTestimonials.length));
  };

  const handleHelpful = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = StoreService.incrementHelpfulCount(id);
    setAllTestimonials((prev) =>
      prev.map((item) => (item.id === id ? { ...item, helpfulCount: newCount } : item))
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !testimonialText.trim()) return;

    setIsSubmitting(true);

    const newTestimonial = StoreService.saveTestimonial({
      name: name.trim(),
      location: location.trim() || 'Ujjain Devotee',
      rating,
      testimonial: testimonialText.trim(),
      category: serviceType,
      service: serviceType === 'Pooja' || serviceType === 'Bhat Pooja' ? serviceName : undefined,
      tour: serviceType === 'Tour' ? serviceName : undefined,
      date: 'Recent Visit',
      verified: true,
      helpfulCount: 1,
      reviewImage: reviewPhotoUrl.trim() || undefined,
      isFeatured: true,
      isPublished: true,
    });

    setTimeout(() => {
      setAllTestimonials((prev) => [newTestimonial, ...prev]);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
        // Reset form
        setName('');
        setLocation('');
        setRating(5);
        setTestimonialText('');
        setServiceName('');
        setReviewPhotoUrl('');
      }, 1500);
    }, 600);
  };

  return (
    <section className="space-y-8 py-4">
      
      {/* Header & Overall Rating Card */}
      <FadeIn direction="up">
        <div className="bg-gradient-to-r from-red-950 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-amber-900/40 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Genuine Devotee Experiences</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 leading-tight">
              Words of Devotion & Trust
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Read real feedback from pilgrims and families across India who performed Rudrabhishek, Bhat Pooja, and Spiritual Yatras with Aastha Sey Raasta Seva.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <div className="flex items-center gap-2 bg-stone-900/80 px-3.5 py-1.5 rounded-xl border border-stone-800 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Vedic Priests</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-900/80 px-3.5 py-1.5 rounded-xl border border-stone-800 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Transparent Samagri & Dakshina</span>
              </div>
            </div>
          </div>

          {/* Aggregate Rating Score Card */}
          <div className="bg-stone-900/90 backdrop-blur-md p-6 rounded-2xl border border-amber-500/30 shadow-2xl text-center space-y-3 shrink-0 max-w-xs w-full relative z-10">
            <div className="text-amber-400 font-serif font-bold text-4xl sm:text-5xl flex items-center justify-center gap-2">
              <span>4.9</span>
              <span className="text-lg text-amber-200 font-sans font-normal">/ 5.0</span>
            </div>

            <div className="flex justify-center items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-stone-300 text-xs font-medium">
              Based on 500+ Devotee Reviews
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Share Your Experience</span>
            </button>
          </div>

        </div>
      </FadeIn>

      {/* Filter Tabs & View Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCarouselIndex(0);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-amber-600 dark:text-amber-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Display Mode Switches */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-stone-400 text-xs font-medium hidden md:inline">View Mode:</span>
          <div className="bg-stone-100 dark:bg-stone-800 p-1 rounded-xl flex items-center gap-1 border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => setViewMode('carousel')}
              className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                viewMode === 'carousel'
                  ? 'bg-white dark:bg-stone-900 text-amber-800 dark:text-amber-300 shadow-sm font-semibold'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
              title="Carousel Mode"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-[11px] hidden sm:inline">Carousel</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-stone-900 text-amber-800 dark:text-amber-300 shadow-sm font-semibold'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
              title="Grid Mode"
            >
              <Grid className="w-4 h-4" />
              <span className="text-[11px] hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 ? (
        <div className="py-12 px-4 text-center bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
          <MessageSquare className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto opacity-50" />
          <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm">
            No testimonials found in this category. Be the first to share your experience!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-medium hover:bg-amber-900 transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Display Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((test, index) => (
            <FadeIn key={test.id} delay={index * 100} direction="up">
              <TestimonialCard
                item={test}
                onHelpful={(e) => handleHelpful(test.id, e)}
                onImageClick={(url, title) => setSelectedImage({ url, title })}
                onBookService={onOpenBooking}
              />
            </FadeIn>
          ))}
        </div>
      ) : (
        /* Carousel Display Mode */
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Display up to 3 cards sliding */}
            {filteredTestimonials
              .slice(carouselIndex, carouselIndex + 3)
              .concat(
                filteredTestimonials.slice(
                  0,
                  Math.max(0, 3 - (filteredTestimonials.length - carouselIndex))
                )
              )
              .slice(0, Math.min(3, filteredTestimonials.length))
              .map((test) => (
                <TestimonialCard
                  key={test.id}
                  item={test}
                  onHelpful={(e) => handleHelpful(test.id, e)}
                  onImageClick={(url, title) => setSelectedImage({ url, title })}
                  onBookService={onOpenBooking}
                />
              ))}
          </div>

          {/* Carousel Controls */}
          {filteredTestimonials.length > 1 && (
            <div className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-1.5">
                {filteredTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      carouselIndex === idx
                        ? 'w-6 bg-amber-800 dark:bg-amber-400'
                        : 'w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-stone-800 transition-colors shadow-sm"
                  aria-label="Previous reviews"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-stone-800 transition-colors shadow-sm"
                  aria-label="Next reviews"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1C1917] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-amber-300/60 dark:border-stone-800 shadow-2xl relative space-y-6 my-8 animate-in fade-in zoom-in-95">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-[11px] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Devotee Feedback</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100">
                Share Your Sacred Experience
              </h3>
              <p className="text-stone-500 dark:text-stone-400 text-xs">
                Your authentic feedback helps other pilgrims plan their spiritual journey with confidence.
              </p>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-emerald-900 dark:text-emerald-200">
                  Dhanyawad & Jai Shree Mahakal!
                </h4>
                <p className="text-emerald-700 dark:text-emerald-300 text-xs">
                  Your review has been successfully submitted and added to our devotee wall.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                
                {/* Rating Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Overall Experience Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300 dark:text-stone-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 ml-2">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Devotee Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  {/* Devotee Location */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      City / State
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Mumbai, MH"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Service Category
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                      <option value="Pooja">Rudrabhishek / Pooja</option>
                      <option value="Bhat Pooja">Bhat Pooja (Angareshwar)</option>
                      <option value="Tour">Spiritual Yatra / Tour</option>
                      <option value="General">General Experience</option>
                    </select>
                  </div>

                  {/* Specific Service Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Specific Service or Tour
                    </label>
                    <input
                      type="text"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="e.g. Rudrabhishek or 3 Days Yatra"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Feedback / Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={testimonialText}
                    onChange={(e) => setTestimonialText(e.target.value)}
                    placeholder="Describe how your pooja ritual or pilgrimage journey was organized, pandit ji's coordination, samagri quality, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                  />
                </div>

                {/* Optional Review Image URL */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Photo URL (Optional Temple or Prasad Photo)
                  </label>
                  <input
                    type="url"
                    value={reviewPhotoUrl}
                    onChange={(e) => setReviewPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    {isSubmitting ? 'Publishing...' : 'Submit Review'}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* Lightbox Modal for Review Photo */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-3xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl p-2 space-y-2">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[75vh] object-contain rounded-xl mx-auto"
            />
            <p className="text-center text-stone-300 text-xs py-2 font-serif font-medium">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}

    </section>
  );
};

// Individual Testimonial Card Component
interface TestimonialCardProps {
  item: Testimonial;
  onHelpful: (e: React.MouseEvent) => void;
  onImageClick: (url: string, title: string) => void;
  onBookService?: (type?: 'Pooja' | 'Tour', name?: string) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  item,
  onHelpful,
  onImageClick,
  onBookService,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isLong = item.testimonial.length > 180;
  const displayText =
    isLong && !isExpanded ? `${item.testimonial.slice(0, 180)}...` : item.testimonial;

  // Fallback avatar generator
  const initials = item.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const serviceTag = item.service || item.tour || 'Vedic Service';

  return (
    <div className="bg-white dark:bg-[#1C1917] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 flex flex-col justify-between h-full hover:border-amber-400/60 dark:hover:border-amber-700 transition-all duration-300 group">
      
      <div className="space-y-3">
        
        {/* Card Header: Avatar, Name, Location, Verified Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {item.photo && !imgError ? (
              <img
                src={item.photo}
                alt={item.name}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/30 shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                {initials}
              </div>
            )}

            <div>
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-1.5 flex-wrap">
                <span>{item.name}</span>
                {item.verified !== false && (
                  <span
                    className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-900"
                    title="Verified Booking Devotee"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              
              <div className="text-stone-500 dark:text-stone-400 text-xs flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                <span>{item.location}</span>
              </div>
            </div>
          </div>

          {/* Service Badge */}
          <div className="shrink-0">
            <button
              onClick={() => {
                if (onBookService) {
                  const type = item.tour ? 'Tour' : 'Pooja';
                  onBookService(type, serviceTag);
                }
              }}
              className="text-[10px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-stone-800 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-stone-700 hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors"
            >
              {serviceTag}
            </button>
          </div>
        </div>

        {/* Rating Stars & Tithi/Date */}
        <div className="flex items-center justify-between gap-2 border-t border-stone-100 dark:border-stone-800/80 pt-2 text-xs">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(item.rating || 5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {item.date && (
            <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 font-medium">
              <Calendar className="w-3 h-3 text-amber-600" />
              <span>{item.date}</span>
            </div>
          )}
        </div>

        {/* Review Quote Text */}
        <div className="relative pt-1">
          <Quote className="w-5 h-5 text-amber-500/20 dark:text-amber-400/20 absolute -top-1 -left-1 pointer-events-none" />
          <p className="text-stone-700 dark:text-stone-300 text-xs leading-relaxed italic pl-3">
            &quot;{displayText}&quot;
          </p>

          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[11px] font-bold text-amber-800 dark:text-amber-400 hover:underline mt-1 block pl-3"
            >
              {isExpanded ? 'Show Less' : 'Read Full Review'}
            </button>
          )}
        </div>

        {/* Attached Photo (if any) */}
        {item.reviewImage && (
          <div
            onClick={() => onImageClick(item.reviewImage!, `${item.name}'s ${serviceTag}`)}
            className="relative rounded-xl overflow-hidden group/img cursor-pointer border border-stone-200 dark:border-stone-800 max-h-36"
          >
            <img
              src={item.reviewImage}
              alt="Devotee Temple Visit"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-32 object-cover group-hover/img:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-[2px]">
              <ImageIcon className="w-4 h-4" />
              <span>Click to view photo</span>
            </div>
          </div>
        )}

      </div>

      {/* Helpful Action Footer */}
      <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <button
          onClick={onHelpful}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800/80 hover:bg-amber-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors text-[11px] font-medium"
        >
          <ThumbsUp className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          <span>Helpful ({item.helpfulCount || 12})</span>
        </button>

        <span className="text-[10px] text-stone-400">Ujjain Verified</span>
      </div>

    </div>
  );
};
