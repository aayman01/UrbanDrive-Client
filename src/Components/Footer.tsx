import React, { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UrbanDriveLogo from "./Common/SVG/UrbanDriveLogo";
import toast from "react-hot-toast";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    toast.success("Thank you for subscribing to UrbanDrive updates!");
    setEmailInput("");
  };

  return (
    <footer className="relative mt-20 border-t border-slate-200/60 bg-slate-900 text-slate-300 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Newsletter Section */}
        <div className="rounded-3xl glass-dark-card p-6 sm:p-10 border border-slate-800 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t("newsletter") || "Stay Ahead with UrbanDrive VIP Insights"}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Get exclusive member discounts, new model releases, and weekend travel inspiration directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto items-center gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email address"
              required
              className="h-12 px-4 rounded-xl glass-input bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:border-teal-400 w-full sm:w-72"
            />
            <button
              type="submit"
              className="h-12 px-5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 shadow-md flex-shrink-0 transition-all duration-300"
            >
              {t("sign_in") || "Subscribe"}
            </button>
          </form>
        </div>

        {/* Multi-column Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <UrbanDriveLogo size={36} textColor="text-white" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t("welcome") || "Bangladesh's premier on-demand vehicle rental and car-sharing platform. Empowering seamless travel everywhere."}
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-teal-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Fleet active 24/7 across 6 divisions</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("home")} & Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <NavLink to="/" className="hover:text-teal-400 transition-colors">
                  {t("home")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-teal-400 transition-colors">
                  {t("services")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/membership" className="hover:text-teal-400 transition-colors">
                  {t("Memberships") || "Membership Plans"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/hostingForm" className="hover:text-teal-400 transition-colors">
                  {t("becomeHost")}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* About & Standards */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("about_urban_drive")}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  {t("our_mission")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  {t("discover_standard")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-400 transition-colors">
                  {t("explore_fleet")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Hub */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("contact_us")}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <FaPhone className="text-teal-400 flex-shrink-0" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineEmail className="text-teal-400 flex-shrink-0 text-base" />
                <span>support@urbandrive.com</span>
              </li>
              <li className="flex items-center gap-2">
                <IoLocationSharp className="text-teal-400 flex-shrink-0 text-base" />
                <span>{t("location") || "Dhaka, Bangladesh"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© UrbanDrive {currentYear}. {t("copyright") || "All rights reserved."}</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-teal-400 transition-colors">Support Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
