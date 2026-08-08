import React, { useEffect, useState } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const progress = (currentScroll / scrollHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', updateReadingProgress, { passive: true });
    updateReadingProgress();

    return () => {
      window.removeEventListener('scroll', updateReadingProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-stone-200/40 backdrop-blur-xs pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.8)] transition-all duration-150 ease-out rounded-r-full"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};
