import React from 'react';
import { motion } from 'framer-motion';
import carRental from "../assets/bannercar.jpg";
import { TbArrowUpRight } from "react-icons/tb";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { VerifiedShieldSVG, InstantBookingSVG, BestPriceSVG } from './Common/SVG/FeatureBadges';

const CarRental: React.FC = () => {
  const { t } = useTranslation();
  const features = [
    { title: t("feature1"), desc: "Fully inspected and cleaned before every single trip" },
    { title: t("feature2"), desc: "Flexible daily, weekly and monthly rental packages" }
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl glass-card p-6 sm:p-10 lg:p-12 border border-white/60 relative overflow-hidden">
        {/* Glow Orb */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column: Story & Features */}
          <motion.div
            className="space-y-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50/70 border border-teal-200/50">
              <VerifiedShieldSVG className="w-4 h-4 text-teal-600" />
              <span>Premium Car Sharing Experience</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t("rentalheading")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-sky-600">
                {t("rentalheading2")}
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t("renatalsubheading")}
            </p>

            {/* Feature Cards with Glass Styling */}
            <div className="space-y-3 pt-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl glass-pill hover:bg-white/80 transition-all border border-slate-200/60"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-sky-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    {index === 0 ? <InstantBookingSVG className="w-5 h-5 text-white" /> : <BestPriceSVG className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{feature.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link to="/about">
                <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                  <span>{t("readMore")}</span>
                  <TbArrowUpRight className="text-lg" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase with Glass Badges */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/60 group">
              <img
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                src={carRental}
                alt="A luxurious car available for rental"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Floating Glass Pill Highlights */}
              <div className="absolute top-4 left-4 glass-dock bg-white/85 px-3 py-1.5 rounded-xl shadow-glass flex items-center gap-2 border border-white/60">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-800">Available Near You</span>
              </div>

              <div className="absolute bottom-4 inset-x-4 glass-dock bg-white/90 p-4 rounded-2xl shadow-glass-lg border border-white/60 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Top Rated Experience</div>
                  <div className="text-sm font-extrabold text-slate-900">4.9 / 5.0 (2,400+ Trips)</div>
                </div>
                <Link to="/services">
                  <span className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
                    Explore Fleet →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CarRental;
