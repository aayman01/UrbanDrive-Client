import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

import dhaka from "../assets/dhaka.jpg";
import chittagong from "../assets/chittagong.png";
import sylhet from "../assets/sylet.jpg";
import mymenshing from "../assets/mymensingh.png";
import rongpur from "../assets/rongpur.png";
import rajshahi from "../assets/rajshahi.jpg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MdArrowForward, MdLocationOn } from "react-icons/md";
import { VerifiedShieldSVG } from "./Common/SVG/FeatureBadges";

interface Destination {
  name: string;
  image: string;
  carsCount: string;
}

const BrowseByDestination: React.FC = () => {
  const { t } = useTranslation();
  const destinations: Destination[] = [
    { name: t("Dhaka"), image: dhaka, carsCount: "450+ Cars" },
    { name: t("Chittagong"), image: chittagong, carsCount: "180+ Cars" },
    { name: t("Rajshahi"), image: rajshahi, carsCount: "90+ Cars" },
    { name: t("Rongpur"), image: rongpur, carsCount: "60+ Cars" },
    { name: t("Sylhet"), image: sylhet, carsCount: "120+ Cars" },
    { name: t("Mymensingh"), image: mymenshing, carsCount: "75+ Cars" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header with Glass Accents */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 glass-pill px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50/70 border border-teal-200/50 mb-3">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Major Mobility Hubs</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t("browseByDestination")}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Rent on-demand across premier metropolises and vacation escapes in Bangladesh
        </p>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        modules={[Autoplay]}
        className="pb-8"
      >
        {destinations.map((destination, index) => (
          <SwiperSlide key={index}>
            <Link to={`/city/${destination?.name}`} className="block group">
              <div className="relative rounded-3xl overflow-hidden glass-card p-2 border border-white/60 shadow-glass transition-all duration-300 group-hover:shadow-glass-lg group-hover:-translate-y-1.5">
                <div
                  className="relative h-72 rounded-2xl overflow-hidden bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${destination.image})` }}
                >
                  {/* Subtle Gradient Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top Glass Badge */}
                  <div className="absolute top-3 right-3 glass-dock bg-white/80 px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm border border-white/40">
                    {destination.carsCount}
                  </div>

                  {/* Bottom Info Glass Dock */}
                  <div className="absolute bottom-3 inset-x-3 glass-dock bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-glass border border-white/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-base">
                          <MdLocationOn className="text-teal-600 text-lg flex-shrink-0" />
                          <span>{destination.name}</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 pl-6 block">
                          {t("Explore destination")}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-sm">
                        <MdArrowForward className="text-base" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BrowseByDestination;
