'use client';

import React from 'react';

type AdPlacement = 'header-banner' | 'in-content' | 'sidebar' | 'footer-banner';

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

export function AdSlot({ placement, className = '' }: AdSlotProps) {
  // Reserved advertisement slot layout for post-launch monetization
  // Ensures policy compliance, correct spacing, and zero layout shift.

  const getPlacementStyles = () => {
    switch (placement) {
      case 'header-banner':
        return 'w-full max-w-5xl h-16 sm:h-20 my-4';
      case 'in-content':
        return 'w-full max-w-3xl h-24 sm:h-32 my-6';
      case 'sidebar':
        return 'w-full min-h-[250px] max-w-[300px] my-4';
      case 'footer-banner':
        return 'w-full max-w-4xl h-20 sm:h-24 my-6';
      default:
        return 'w-full h-20 my-4';
    }
  };

  return (
    <div
      className={`mx-auto flex flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 p-2 transition-opacity ${getPlacementStyles()} ${className}`}
      aria-label="Advertisement container"
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
        Sponsored / Ad Space
      </span>
      <div className="text-xs text-slate-400 italic text-center px-4">
        Reserved advertisement slot (Monetization Ready)
      </div>
    </div>
  );
}
