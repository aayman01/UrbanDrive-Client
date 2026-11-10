import React, { useState } from "react";
import { VerifiedShieldSVG } from "../../../Components/Common/SVG/FeatureBadges";
import { RiAdvertisementLine } from "react-icons/ri";
import { FaCircleCheck, FaCarRear } from "react-icons/fa6";
import toast from "react-hot-toast";

const RequestAdvertisement: React.FC = () => {
  const [carName, setCarName] = useState("");
  const [duration, setDuration] = useState("7");
  const [placement, setPlacement] = useState("Hero Banner");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carName.trim()) {
      toast.error("Please enter your vehicle model or ID");
      return;
    }
    setSubmitted(true);
    toast.success("Advertisement request submitted for admin review!");
  };

  return (
    <div className="space-y-8 font-poppins max-w-4xl">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Vehicle Promotion Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Request Vehicle Advertisement
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Boost your vehicle visibility to tens of thousands of premium renters on our homepage and search feeds
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
            <RiAdvertisementLine className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">3x More Bookings</h3>
          <p className="text-xs text-slate-500 mt-1">
            Featured vehicles receive priority ranking in search results and category carousels.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
            <FaCarRear className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Prime Homepage Spot</h3>
          <p className="text-xs text-slate-500 mt-1">
            Showcase your luxury or electric ride directly in the hero carousel viewed on every visit.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
            <FaCircleCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Verified Badge Boost</h3>
          <p className="text-xs text-slate-500 mt-1">
            Includes guaranteed VIP verification tag and highlight border for renter trust.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-6 sm:p-8">
        {submitted ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100">
              <FaCircleCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Request Under Review</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Our marketing team is reviewing your vehicle profile for{" "}
              <strong className="text-slate-800">{carName}</strong>. You will receive an approval confirmation within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setCarName("");
                setNotes("");
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Vehicle Model / ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tesla Model 3 Performance"
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Placement Type
                </label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                >
                  <option value="Hero Banner">Homepage Hero Banner (Top Tier)</option>
                  <option value="Featured Fleet">Featured Fleet Top 3 (High Conversion)</option>
                  <option value="Destination Spotlight">Destination Spotlight (City-Specific)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Campaign Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                >
                  <option value="7">7 Days — ৳ 2,500</option>
                  <option value="14">14 Days — ৳ 4,500 (10% discount)</option>
                  <option value="30">30 Days — ৳ 8,000 (20% discount)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Target Destination / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka, Cox's Bazar, Sylhet"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Special Campaign Notes / Instructions
              </label>
              <textarea
                rows={3}
                placeholder="Include any specific promotion tags (e.g. 'Weekend Special 15% Off', 'Chauffeur included')..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Placement is invoiced upon admin review and verification.
              </span>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition-all"
              >
                Submit Campaign Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestAdvertisement;
