import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2 px-1 text-xs sm:text-sm text-stone-600">
      <ol className="flex items-center flex-wrap gap-1">
        <li className="inline-flex items-center">
          <a
            href="/"
            className="inline-flex items-center gap-1 text-stone-600 hover:text-amber-700 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-amber-600" />
            <span>Home</span>
          </a>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="inline-flex items-center gap-1">
              <ChevronRight className="w-3 h-3 text-stone-400" />
              {isLast || !item.href ? (
                <span className="font-medium text-amber-900 truncate max-w-[200px] sm:max-w-xs">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="text-stone-600 hover:text-amber-700 transition-colors truncate max-w-[150px] sm:max-w-xs"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
