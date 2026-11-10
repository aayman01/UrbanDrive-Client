import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useTranslation } from "react-i18next";
import useRole from "../Hooks/useRole";
import UrbanDriveLogo from "./Common/SVG/UrbanDriveLogo";
import {
  FaBookmark,
  FaUser,
  FaBuilding,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaCircleUser, FaHeart } from "react-icons/fa6";

type Role = "Admin" | "Host" | "User" | "";

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logOut } = useAuth();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>("");
  const [role]: [Role, boolean, boolean] = useRole();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    } else {
      setCurrentLanguage(i18n.language);
    }
  }, [i18n, currentLanguage]);

  const changeLanguage = (lng: string) => {
    setCurrentLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  const navLinks = [
    { id: "", title: t("Home"), path: "/" },
    { id: "Services", title: t("Services"), path: "/services" },
    { id: "About", title: t("About"), path: "/about" },
    { id: "Membership", title: t("Memberships"), path: "/membership" },
    { id: "Contact", title: t("Contact"), path: "/contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 px-3 sm:px-6 pt-3 sm:pt-4">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
          scrolled
            ? "glass-dock bg-white/90 shadow-glass-lg border-white/60"
            : "glass-dock bg-white/75 shadow-glass border-white/40"
        }`}
      >
        {/* Brand Vector Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <UrbanDriveLogo size={34} textColor="text-slate-900" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.id}
                to={link.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-teal-700 bg-teal-50/80 shadow-sm"
                    : "text-slate-600 hover:text-teal-600 hover:bg-slate-100/60"
                }`}
              >
                {link.title}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-teal-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center space-x-3">
          {/* Glass Language Pill */}
          <div className="hidden sm:flex items-center glass-pill rounded-full p-1 border border-slate-200/60">
            <button
              className={`px-2.5 py-0.5 text-xs font-bold rounded-full transition-all ${
                currentLanguage === "en"
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <button
              className={`px-2.5 py-0.5 text-xs font-bold rounded-full transition-all ${
                currentLanguage === "bn"
                  ? "bg-teal-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => changeLanguage("bn")}
            >
              বাং
            </button>
          </div>

          {/* User Profile / Auth Button */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border border-teal-200/80 p-0.5 shadow-sm hover:border-teal-400"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100">
                  {user?.photoURL ? (
                    <img
                      src={user?.photoURL}
                      className="w-full h-full object-cover"
                      alt="User avatar"
                    />
                  ) : (
                    <FaCircleUser className="w-full h-full text-slate-400" />
                  )}
                </div>
              </label>

              <ul className="mt-3 z-[1] p-2 shadow-glass-lg menu menu-sm dropdown-content glass-dock bg-white/95 rounded-2xl w-60 border border-slate-100">
                <li className="px-3 py-2 border-b border-slate-100 mb-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Signed in as</span>
                  <span className="text-sm font-bold text-slate-800 truncate block">{user?.displayName || user?.email}</span>
                </li>
                <li>
                  <Link to="/favorite" className="flex items-center py-2 px-3 text-slate-700 hover:text-teal-600 rounded-xl hover:bg-teal-50">
                    <FaHeart className="mr-2 text-rose-500" /> {t("Favorite")}
                  </Link>
                </li>
                <li>
                  <Link to="/booked" className="flex items-center py-2 px-3 text-slate-700 hover:text-teal-600 rounded-xl hover:bg-teal-50">
                    <FaBookmark className="mr-2 text-amber-500" /> {t("Bookings")}
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="flex items-center py-2 px-3 text-slate-700 hover:text-teal-600 rounded-xl hover:bg-teal-50">
                    <FaUser className="mr-2 text-blue-500" /> {t("Profile")}
                  </Link>
                </li>
                <li>
                  <Link to="/hostingForm" className="flex items-center py-2 px-3 text-slate-700 hover:text-teal-600 rounded-xl hover:bg-teal-50">
                    <FaBuilding className="mr-2 text-purple-500" /> {t("becomeHost")}
                  </Link>
                </li>
                <li>
                  <Link to="/payment-history" className="flex items-center py-2 px-3 text-slate-700 hover:text-teal-600 rounded-xl hover:bg-teal-50">
                    <FaCreditCard className="mr-2 text-emerald-500" /> {t("Payment")}
                  </Link>
                </li>
                {role === "Admin" && (
                  <li>
                    <Link to="/dashboard/adminhome" className="flex items-center py-2 px-3 text-slate-700 hover:text-teal-600 rounded-xl hover:bg-teal-50">
                      <MdDashboard className="mr-2 text-teal-600" /> {t("Dashboard")}
                    </Link>
                  </li>
                )}
                {role === "Host" && (
                  <li>
                    <Link to="/dashboard/hostOverview" className="flex items-center py-2 px-3 text-slate-700 hover:text-teal-600 rounded-xl hover:bg-teal-50">
                      <MdDashboard className="mr-2 text-teal-600" /> {t("Dashboard")}
                    </Link>
                  </li>
                )}
                <li className="mt-1 border-t border-slate-100 pt-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      logOut();
                    }}
                    className="flex items-center w-full py-2 px-3 text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <FaSignOutAlt className="mr-2" /> {t("logout")}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden text-sm font-bold text-white rounded-xl group bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span className="relative">{t("SignUp")}</span>
            </Link>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {toggle ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Frosted Glass Drawer Overlay */}
      {toggle && (
        <div className="fixed inset-0 top-[72px] z-40 bg-slate-900/40 backdrop-blur-md lg:hidden p-4">
          <div className="glass-dock bg-white/95 rounded-3xl p-6 shadow-2xl max-w-sm mx-auto space-y-4">
            {/* Language Switcher - Mobile */}
            <div className="flex justify-center items-center pb-3 border-b border-slate-100">
              <div className="flex items-center glass-pill rounded-full p-1 border border-slate-200">
                <button
                  className={`px-4 py-1 text-sm font-bold rounded-full ${
                    currentLanguage === "en" ? "bg-teal-500 text-white" : "text-slate-600"
                  }`}
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
                <button
                  className={`px-4 py-1 text-sm font-bold rounded-full ${
                    currentLanguage === "bn" ? "bg-teal-500 text-white" : "text-slate-600"
                  }`}
                  onClick={() => changeLanguage("bn")}
                >
                  বাংলা
                </button>
              </div>
            </div>

            {/* Mobile Nav Links */}
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className="block px-4 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => setToggle(false)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile User Profile Section */}
            {user ? (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
                  onClick={() => setToggle(false)}
                >
                  {t("Profile")}
                </Link>
                <Link
                  to="/booked"
                  className="block px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
                  onClick={() => setToggle(false)}
                >
                  {t("Bookings")}
                </Link>
                <button
                  onClick={() => {
                    logOut();
                    setToggle(false);
                  }}
                  className="w-full text-left px-4 py-2 font-semibold text-red-600 hover:bg-red-50 rounded-xl"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-100">
                <Link
                  to="/login"
                  onClick={() => setToggle(false)}
                  className="block w-full py-3 text-center rounded-xl font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 shadow-md"
                >
                  {t("SignUp")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
