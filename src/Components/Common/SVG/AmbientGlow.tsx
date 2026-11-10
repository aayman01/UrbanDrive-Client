import React from "react";

interface AmbientGlowProps {
  className?: string;
  variant?: "hero" | "subtle" | "dark";
}

export const AmbientGlow: React.FC<AmbientGlowProps> = ({ className = "", variant = "subtle" }) => {
  if (variant === "dark") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] bg-indigo-600/25 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px]" />
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <div className="absolute top-10 left-1/4 w-[36rem] h-[36rem] bg-teal-400/20 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute -top-20 right-10 w-[30rem] h-[30rem] bg-amber-400/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[28rem] h-[28rem] bg-blue-500/15 rounded-full blur-[110px]" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div className="absolute -top-24 left-1/3 w-80 h-80 bg-teal-300/20 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-sky-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-200/25 rounded-full blur-[100px]" />
    </div>
  );
};

export default AmbientGlow;

