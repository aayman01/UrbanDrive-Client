import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

import Hyundai from "../assets/Hyundai.png";
import Nissan from "../assets/nissan.png";
import Suzuki from "../assets/suzuki.jpg";
import Toyota from "../assets/toyota.jpg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MdArrowForward, MdDirectionsCar } from "react-icons/md";
import { InstantBookingSVG } from "./Common/SVG/FeatureBadges";

interface Car {
  name: string;
  image: string;
  category: string;
}

const BrowseByCar: React.FC = () => {
  const { t } = useTranslation();
  const cars: Car[] = [
    { name: t("Toyota"), image: Toyota, category: "Sedans & Hybrids" },
    { name: t("Honda"), image: Hyundai, category: "SUVs & Compacts" },
    { name: t("Nissan"), image: Nissan, category: "Electric & Crossovers" },
    { name: t("BMW"), image: Suzuki, category: "Luxury & Executive" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 glass-pill px-3 py-1 rounded-full text-xs font-bold text-amber-700 bg-amber-50/70 border border-amber-200/50 mb-3">
          <InstantBookingSVG className="w-3.5 h-3.5 text-amber-600" />
          <span>Top Global Manufacturers</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t("browseByCar")}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Choose from world-class automobile brands maintained in immaculate condition
        </p>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        autoplay={{
          delay: 3200,
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
        {cars.map((car, index) => (
          <SwiperSlide key={index}>
            <Link to={`/model/${car?.name}`} className="block group">
              <div className="relative rounded-3xl overflow-hidden glass-card p-2 border border-white/60 shadow-glass transition-all duration-300 group-hover:shadow-glass-lg group-hover:-translate-y-1.5">
                <div
                  className="relative h-72 rounded-2xl overflow-hidden bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${car.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top Category Tag */}
                  <div className="absolute top-3 right-3 glass-dock bg-white/80 px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-sm border border-white/40">
                    {car.category}
                  </div>

                  {/* Bottom Info Glass Dock */}
                  <div className="absolute bottom-3 inset-x-3 glass-dock bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-glass border border-white/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-base">
                          <MdDirectionsCar className="text-amber-500 text-lg flex-shrink-0" />
                          <span>{car.name}</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-500 pl-6 block">
                          {t("Explore cars")}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-sm">
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

export default BrowseByCar;
