import React from "react";

interface SVGIconProps {
  className?: string;
  size?: number;
}

export const VerifiedShieldSVG: React.FC<SVGIconProps> = ({ className = "w-6 h-6 text-teal-500", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.15" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" />
  </svg>
);

export const InstantBookingSVG: React.FC<SVGIconProps> = ({ className = "w-6 h-6 text-amber-500", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const RoadsideAssistanceSVG: React.FC<SVGIconProps> = ({ className = "w-6 h-6 text-blue-500", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

export const BestPriceSVG: React.FC<SVGIconProps> = ({ className = "w-6 h-6 text-emerald-500", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.12" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 18V6" />
  </svg>
);

export const FuelPumpSVG: React.FC<SVGIconProps> = ({ className = "w-5 h-5 text-slate-500", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 22h12V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v18z" fill="currentColor" fillOpacity="0.1" />
    <path d="M7 6h4" />
    <path d="M15 11l3-3a1.5 1.5 0 0 1 2.12 0l.88.88A1.5 1.5 0 0 1 21 10v9a2 2 0 0 1-2 2h-1" />
  </svg>
);

export const SeatSVG: React.FC<SVGIconProps> = ({ className = "w-5 h-5 text-slate-500", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
    <path d="M3 11v5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" fill="currentColor" fillOpacity="0.1" />
    <path d="M6 19v2" />
    <path d="M18 19v2" />
  </svg>
);

export const TransmissionSVG: React.FC<SVGIconProps> = ({ className = "w-5 h-5 text-slate-500", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="6" r="2" />
    <circle cx="12" cy="6" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="12" cy="18" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M5 8v8M12 8v8M19 8v8M5 12h14" />
  </svg>
);

export const ElectricBoltSVG: React.FC<SVGIconProps> = ({ className = "w-5 h-5 text-teal-500", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" />
  </svg>
);

