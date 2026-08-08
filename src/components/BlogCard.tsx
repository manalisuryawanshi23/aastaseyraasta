import React from 'react';
import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-44 w-full overflow-hidden bg-stone-100">
        <img
          src={post.featuredImage || '/assets/images/hero_mahakaleshwar_ujjain_1786193880733.jpg'}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-amber-950/80 backdrop-blur-md text-amber-200 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-amber-500/30">
          {post.category}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-2">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 text-amber-700" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{post.readingTime || '5 min read'}</span>
            </span>
          </div>

          <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-2 mb-2">
            {post.title}
          </h3>

          <p className="text-stone-600 text-xs leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-medium text-amber-800 group-hover:text-amber-900">
          <span>Read Spiritual Guide</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
};
