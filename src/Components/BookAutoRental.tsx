import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { InstantBookingSVG, VerifiedShieldSVG, RoadsideAssistanceSVG } from './Common/SVG/FeatureBadges';
import AmbientGlow from './Common/SVG/AmbientGlow';

const BookAutoRental: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [carType, setCarType] = useState('all');
  const [pickupLocation, setPickupLocation] = useState('uttora');
  const [rentalDate, setRentalDate] = useState(() => new Date().toISOString().split('T')[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/services?category=${carType === 'all' ? '' : carType}&location=${pickupLocation}`);
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-6 sm:-mt-10 z-20">
      <div className="relative rounded-3xl glass-dock bg-white/85 p-6 sm:p-10 shadow-glass-lg border border-white/60">
        <AmbientGlow variant="subtle" />

        {/* Section Header */}
        <div className="relative text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 glass-pill px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50/70 border border-teal-200/50 mb-3">
            <InstantBookingSVG className="w-3.5 h-3.5 text-teal-600" />
            <span>{t("rentNow") || "Instant Drive Reservation"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("bookAutoRental")}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            Choose your preferred vehicle and pick-up hub across Bangladesh
          </p>
        </div>

        {/* Booking Form Grid */}
        <form onSubmit={handleSearch} className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Car Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FaCar className="text-teal-600" />
                <span>{t("chooseCarType")}</span>
              </label>
              <div className="relative">
                <select
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                  className="w-full h-12 glass-input px-3.5 pr-8 rounded-xl text-sm font-semibold text-slate-800 cursor-pointer appearance-none"
                >
                  <option value="all">All Vehicle Types</option>
                  <option value="economy">{t("economyCars")}</option>
                  <option value="luxury">{t("luxuryCars")}</option>
                  <option value="sedan">{t("sedan")}</option>
                  <option value="suv">SUV & 4x4</option>
                  <option value="electric">Electric & Hybrid</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Pick-up Location Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-rose-500" />
                <span>{t("pickupLocation")}</span>
              </label>
              <div className="relative">
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full h-12 glass-input px-3.5 pr-8 rounded-xl text-sm font-semibold text-slate-800 cursor-pointer appearance-none"
                >
                  <option value="uttora">{t("uttora")} (Dhaka North)</option>
                  <option value="mirpur-1">{t("mirpur1")} (Dhaka West)</option>
                  <option value="saver">{t("saver")} Hub</option>
                  <option value="ajimpur">{t("ajimpur")} (Dhaka South)</option>
                  <option value="mirpur-2">{t("mirpur2")}</option>
                  <option value="chittagong">Chittagong Hub</option>
                  <option value="sylhet">Sylhet Hub</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            {/* Date Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FaCalendarAlt className="text-amber-500" />
                <span>Pick-up Date</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={rentalDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setRentalDate(e.target.value)}
                  className="w-full h-12 glass-input px-3.5 rounded-xl text-sm font-semibold text-slate-800 cursor-pointer"
                />
              </div>
            </div>

            {/* Action Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-12 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-teal-500 via-teal-600 to-sky-600 hover:from-teal-600 hover:to-sky-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>{t("rentNowButton") || "Find My Ride"}</span>
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </form>

        {/* Feature Highlights Row */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-3 p-2 rounded-2xl glass-pill">
            <RoadsideAssistanceSVG className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div className="text-left">
              <div className="font-bold text-slate-800 text-xs sm:text-sm">24/7 Road Assistance</div>
              <div className="text-[11px] text-slate-500">{t("customerSupport")}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2 rounded-2xl glass-pill">
            <VerifiedShieldSVG className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <div className="text-left">
              <div className="font-bold text-slate-800 text-xs sm:text-sm">Verified Hosts & Fleet</div>
              <div className="text-[11px] text-slate-500">{t("premiumVehicles")}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2 rounded-2xl glass-pill">
            <InstantBookingSVG className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div className="text-left">
              <div className="font-bold text-slate-800 text-xs sm:text-sm">Instant Free Cancellation</div>
              <div className="text-[11px] text-slate-500">{t("rentalOptions")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAutoRental;
