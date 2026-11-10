import React from "react";

interface CarSilhouetteProps {
  type: "sedan" | "suv" | "luxury" | "electric" | "convertible" | string;
  className?: string;
  size?: number;
}

export const CarSilhouette: React.FC<CarSilhouetteProps> = ({ type, className = "w-12 h-8", size = 48 }) => {
  const normalized = type.toLowerCase();

  if (normalized.includes("suv")) {
    return (
      <svg width={size} height={size * 0.55} viewBox="0 0 64 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 24H4L6 14C7 11 10 9 14 9H42C46 9 52 11 56 16L60 21V26H56M16 26C16 28.2 14.2 30 12 30C9.8 30 8 28.2 8 26C8 23.8 9.8 22 12 22C14.2 22 16 23.8 16 26ZM52 26C52 28.2 50.2 30 48 30C45.8 30 44 28.2 44 26C44 23.8 45.8 22 48 22C50.2 22 52 23.8 52 26ZM16 24H44"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M22 10L20 18H34V10H22ZM38 10V18H48L44 10H38Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("electric")) {
    return (
      <svg width={size} height={size * 0.55} viewBox="0 0 64 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 25H4L6 16C7 12 11 11 16 11H38C44 11 50 13 54 18L58 22V26H54M16 26C16 28.2 14.2 30 12 30C9.8 30 8 28.2 8 26C8 23.8 9.8 22 12 22C14.2 22 16 23.8 16 26ZM52 26C52 28.2 50.2 30 48 30C45.8 30 44 28.2 44 26C44 23.8 45.8 22 48 22C50.2 22 52 23.8 52 26ZM16 25H44"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M30 4L24 13H32L26 21" stroke="#14B8A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalized.includes("luxury")) {
    return (
      <svg width={size} height={size * 0.55} viewBox="0 0 64 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 25H2L4 18C5 13 12 11 18 11H36C45 11 52 14 57 19L61 23V26H56M16 26C16 28.2 14.2 30 12 30C9.8 30 8 28.2 8 26C8 23.8 9.8 22 12 22C14.2 22 16 23.8 16 26ZM52 26C52 28.2 50.2 30 48 30C45.8 30 44 28.2 44 26C44 23.8 45.8 22 48 22C50.2 22 52 23.8 52 26ZM16 25H44"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="7" r="3" fill="#F59E0B" />
      </svg>
    );
  }

  // Default: Sedan
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 64 36" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 25H3L5 17C6 13 11 12 16 12H38C44 12 50 14 55 19L59 23V26H54M16 26C16 28.2 14.2 30 12 30C9.8 30 8 28.2 8 26C8 23.8 9.8 22 12 22C14.2 22 16 23.8 16 26ZM52 26C52 28.2 50.2 30 48 30C45.8 30 44 28.2 44 26C44 23.8 45.8 22 48 22C50.2 22 52 23.8 52 26ZM16 25H44"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 13L18 19H34V13H20ZM38 13V19H48L44 13H38Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
};

export default CarSilhouette;

