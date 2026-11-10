import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Aayman from '../assets/revi/aayman.jpg';
import Ruksana from '../assets/revi/juksana.jpg';
import Najmul from '../assets/revi/nasmul.jpg';
import Nayem from '../assets/revi/nayem.jpg';
import Zihad from '../assets/revi/zahid.jpg';
import { useTranslation } from 'react-i18next';
import { VerifiedShieldSVG } from './Common/SVG/FeatureBadges';

const Reviews: React.FC = () => {
  const { t } = useTranslation();

  const reviewsList = [
    { img: Aayman, name: "Aayman Alfee Rahman", rating: 5, role: "Verified Renter", location: "Dhaka" },
    { img: Ruksana, name: "Roksana Sikder", rating: 4, role: "Frequent Traveler", location: "Chittagong" },
    { img: Najmul, name: "Nazmul Hosan", rating: 5, role: "Business Fleet User", location: "Sylhet" },
    { img: Nayem, name: "NA YE EM", rating: 5, role: "Weekend Explorer", location: "Rajshahi" },
    { img: Zihad, name: "Zihad Hasan", rating: 4, role: "Verified Renter", location: "Dhaka" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass-pill px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50/70 border border-teal-200/50 mb-3">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Real Experiences</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t("reviewTitle")}
        </h2>
        <p className="mt-2 text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
          {t("reviewDescription")}
        </p>
      </div>

      <Swiper
        navigation={true}
        loop={true}
        modules={[Navigation]}
        className="mySwiper !pb-6"
      >
        {reviewsList.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-white/60 shadow-glass-lg relative overflow-hidden">
              {/* Decorative SVG Quote Marks */}
              <svg
                className="absolute top-6 right-8 w-20 h-20 text-teal-500/10 pointer-events-none"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M10 8v8H6c0 4.418 3.582 8 8 8v4c-6.627 0-12-5.373-12-12V8h8zm18 0v8h-4c0 4.418 3.582 8 8 8v4c-6.627 0-12-5.373-12-12V8h8z" />
              </svg>

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* User Avatar with Frosted Glass Frame */}
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg border-2 border-white/80">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 glass-dock p-1.5 rounded-full shadow-sm">
                    <VerifiedShieldSVG className="w-5 h-5 text-teal-500" />
                  </div>
                </div>

                {/* Review Text & Star Rating */}
                <div className="flex-grow text-center md:text-left space-y-3">
                  <div className="flex items-center justify-center md:justify-start">
                    <Rating style={{ maxWidth: 110 }} value={review.rating} readOnly />
                  </div>

                  <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed font-light">
                    "UrbanDrive delivered an impeccable vehicle right on schedule. The digital check-in was seamless, the car was pristine, and support was responsive within minutes."
                  </p>

                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-slate-900">{review.name}</h3>
                    <p className="text-xs font-semibold text-teal-600">
                      {review.role} • {review.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
