import React from "react";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { InstantBookingSVG, VerifiedShieldSVG } from "./Common/SVG/FeatureBadges";

interface SlideProps {
  image: string;
  title: string;
  model: string;
  price: string;
}

const Slide: React.FC<SlideProps> = ({ image, title, model, price }) => {
  const { t } = useTranslation();

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div
        className="relative w-full rounded-3xl overflow-hidden bg-center bg-cover h-[32rem] sm:h-[36rem] lg:h-[40rem] shadow-glass-lg border border-white/40"
        style={{
          backgroundImage: `url(${image})`,
        }}
        aria-label={title}
      >
        {/* Modern Dark Gradient Overlay for Glass Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-center h-full p-6 sm:p-12 lg:p-16 max-w-2xl">
          <Fade direction="up" cascade triggerOnce>
            {/* Glass Trust Pill */}
            <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white/95 mb-4 border border-white/20 w-fit">
              <VerifiedShieldSVG className="w-4 h-4 text-teal-400" />
              <span>{t("flexible_rental") || "Instant Smart Car Rentals"}</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
              {title}
            </h1>

            {/* Model & Frosted Price Tag */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xl sm:text-2xl font-bold text-slate-100">
                {model}
              </span>
              <div className="glass-pill px-3.5 py-1 rounded-xl border border-teal-400/40 text-teal-300 font-extrabold text-lg flex items-center gap-1">
                <span>৳{price}</span>
                <span className="text-xs text-slate-300 font-normal">/ {t("day")}</span>
              </div>
            </div>

            {/* Quick Benefits */}
            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 mb-8">
              <div className="flex items-center gap-1.5">
                <InstantBookingSVG className="w-4 h-4 text-amber-400" />
                <span>Instant Confirmation</span>
              </div>
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
              <div className="flex items-center gap-1.5">
                <span className="text-teal-400 font-bold">✓</span>
                <span>Zero Hidden Fees</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/services">
                <button className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 shadow-glass-glow transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
                  {t("browse_cars")}
                </button>
              </Link>

              <Link to="/about">
                <button className="px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white glass-pill hover:bg-white/25 border border-white/30 transition-all duration-300">
                  {t("view_details")}
                </button>
              </Link>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Slide;
