import React, { useEffect } from 'react';

/**
 * LocalBusinessSchema: Cleanly cleans up any legacy duplicate schema tags.
 * The primary unified, deduplicated JSON-LD @graph is managed by SEOHead on all pages.
 */
export const LocalBusinessSchema: React.FC = () => {
  useEffect(() => {
    // Clean up any legacy or duplicate script tags from older builds
    const legacyDynamic = document.querySelector('script[type="application/ld+json"]#local-business-schema');
    if (legacyDynamic && legacyDynamic.parentNode) {
      legacyDynamic.parentNode.removeChild(legacyDynamic);
    }
    const legacyStatic = document.querySelector('script[type="application/ld+json"]#local-business-schema-static');
    if (legacyStatic && legacyStatic.parentNode) {
      legacyStatic.parentNode.removeChild(legacyStatic);
    }
  }, []);

  return null;
};
