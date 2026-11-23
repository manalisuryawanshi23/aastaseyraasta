import React from 'react';

/**
 * Safely parses markdown links [text](url) into styled, clickable React <a> elements.
 * Renders WhatsApp links with emerald styling and external links with rel="noopener noreferrer".
 */
export const renderFormattedText = (text: string): React.ReactNode => {
  if (!text) return null;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    const isWhatsApp = linkUrl.includes('wa.me') || linkUrl.includes('whatsapp');
    const isExternal = linkUrl.startsWith('http');

    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        target={isWhatsApp || isExternal ? '_blank' : undefined}
        rel={isWhatsApp || isExternal ? 'noopener noreferrer' : undefined}
        className={
          isWhatsApp
            ? 'font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2 transition-colors'
            : 'font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 underline underline-offset-2 transition-colors'
        }
      >
        {linkText}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};
