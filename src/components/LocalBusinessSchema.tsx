import React, { useEffect } from 'react';
import { StoreService } from '../services/store';
import { buildLocalBusinessSchema } from '../utils/seoSchemas';

export const LocalBusinessSchema: React.FC = () => {
  const settings = StoreService.getSettings();
  const schemaObj = buildLocalBusinessSchema(settings);

  useEffect(() => {
    let scriptEl = document.querySelector('script[type="application/ld+json"]#local-business-schema');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.setAttribute('type', 'application/ld+json');
      scriptEl.setAttribute('id', 'local-business-schema');
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemaObj, null, 2);
  }, [settings]);

  return (
    <script
      type="application/ld+json"
      id="local-business-schema-static"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
    />
  );
};
