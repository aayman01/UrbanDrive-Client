import React from "react";

interface UrbanDriveLogoProps {
  className?: string;
  size?: number;
  textColor?: string;
}

export const UrbanDriveLogo: React.FC<UrbanDriveLogoProps> = ({
  className = "",
  size = 36,
  textColor = "text-white",
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Dynamic Aerodynamic SVG Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 hover:rotate-6"
      >
        <defs>
          <linearGradient id="logoGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hex-Shield */}
        <path
          d="M24 4L42 12V24C42 34 34.5 42.5 24 45C13.5 42.5 6 34 6 24V12L24 4Z"
          fill="url(#logoGrad)"
          fillOpacity="0.2"
          stroke="url(#logoGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Speed Wings / Stylized Car Silhouette */}
        <path
          d="M12 28C14 24 18 20 24 20C30 20 34 24 36 28M15 28L18 33H30L33 28"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18.5" cy="32.5" r="2.5" fill="url(#accentGrad)" />
        <circle cx="29.5" cy="32.5" r="2.5" fill="url(#accentGrad)" />

        {/* Lightning Speed Dash */}
        <path
          d="M26 10L20 18H28L22 26"
          stroke="#F59E0B"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none select-none">
        <span className={`text-xl font-extrabold tracking-tight font-poppins ${textColor}`}>
          Urban<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-400">Drive</span>
        </span>
        <span className="text-[10px] tracking-widest uppercase font-medium text-slate-400">
          Premium Mobility
        </span>
      </div>
    </div>
  );
};

export default UrbanDriveLogo;

