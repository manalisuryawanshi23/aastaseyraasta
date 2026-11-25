import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://aasthasaysrasta.com';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/`;

  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/`,
      },
      ...items.map((item, idx) => {
        const itemUrl = item.href
          ? (item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`)
          : currentUrl;
        return {
          '@type': 'ListItem',
          position: idx + 2,
          name: item.label,
          item: itemUrl,
        };
      }),
    ],
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-2 px-3.5 rounded-xl bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 backdrop-blur-sm text-xs sm:text-sm text-stone-600 dark:text-stone-300 shadow-2xs ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />
      <ol className="flex items-center flex-wrap gap-1.5">
        <li className="inline-flex items-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Home</span>
          </a>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 flex-shrink-0" />
              {isLast || !item.href ? (
                <span
                  className="font-semibold text-amber-900 dark:text-amber-200 truncate max-w-[200px] sm:max-w-md"
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-stone-600 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors truncate max-w-[150px] sm:max-w-xs font-medium"
                  title={item.label}
                >
                  <span>{item.label}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

