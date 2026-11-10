import { Link, NavLink, Outlet } from "react-router-dom";
import { FaCoins, FaHome, FaUserAlt } from "react-icons/fa";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdCardMembership, MdOutlinePendingActions, MdPayment } from "react-icons/md";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaCarRear } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { SyncLoader } from "react-spinners";
import useRole from "../Hooks/useRole";
import React from "react";
import UrbanDriveLogo from "../Components/Common/SVG/UrbanDriveLogo";

type Role = "Admin" | "Host" | "";

const Dashboard: React.FC = () => {
  const [role, isPending]: [Role, boolean, boolean] = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <SyncLoader color="#14B8A6" size={16} />
      </div>
    );
  }

  // Consistent, elegant monochrome/teal styling for all navigation items
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-teal-500/15 text-teal-400 border border-teal-500/30 shadow-sm"
        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
    }`;

  const iconClass = "w-4 h-4 text-current transition-colors";

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800 font-poppins relative">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white text-slate-800 shadow-md border border-slate-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle navigation menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-teal-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Modern Luxury Dark Sidebar with Unified Premium Color Palette */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-72 bg-[#0F172A] z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out border-r border-slate-800/80 flex flex-col justify-between flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Logo Header */}
          <div className="px-6 py-7 border-b border-slate-800/80">
            <Link to="/" onClick={handleLinkClick}>
              <UrbanDriveLogo size={32} textColor="text-white" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {role} Workspace
            </div>

            {role === "Admin" && (
              <div className="space-y-1">
                <NavLink to="/dashboard/adminHome" onClick={handleLinkClick} className={navItemClass}>
                  <TfiLayoutGrid2 className={iconClass} />
                  Overview
                </NavLink>

                <NavLink to="/dashboard/manageUser" onClick={handleLinkClick} className={navItemClass}>
                  <FaUserAlt className={iconClass} />
                  Manage Users
                </NavLink>

                <NavLink to="/dashboard/cars" onClick={handleLinkClick} className={navItemClass}>
                  <FaCarRear className={iconClass} />
                  Manage Cars
                </NavLink>

                <NavLink to="/dashboard/paymentHistory" onClick={handleLinkClick} className={navItemClass}>
                  <FaCoins className={iconClass} />
                  Payment History
                </NavLink>

                <NavLink to="/dashboard/bookings" onClick={handleLinkClick} className={navItemClass}>
                  <TbBrandBooking className={iconClass} />
                  Bookings
                </NavLink>

                <NavLink to="/dashboard/manageMemberShip" onClick={handleLinkClick} className={navItemClass}>
                  <MdCardMembership className={iconClass} />
                  Manage Membership
                </NavLink>

                <NavLink to="/dashboard/support" onClick={handleLinkClick} className={navItemClass}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Support Chat
                </NavLink>

                <NavLink to="/dashboard/pendingCars" onClick={handleLinkClick} className={navItemClass}>
                  <MdOutlinePendingActions className={iconClass} />
                  Pending Cars
                </NavLink>
              </div>
            )}

            {role === "Host" && (
              <div className="space-y-1">
                <NavLink to="/dashboard/hostOverview" onClick={handleLinkClick} className={navItemClass}>
                  <TfiLayoutGrid2 className={iconClass} />
                  Overview
                </NavLink>

                <NavLink to="/dashboard/myCars" onClick={handleLinkClick} className={navItemClass}>
                  <FaCarRear className={iconClass} />
                  Manage Cars
                </NavLink>

                <NavLink to="/dashboard/hostManageBookings" onClick={handleLinkClick} className={navItemClass}>
                  <AiFillMedicineBox className={iconClass} />
                  Manage Bookings
                </NavLink>

                <NavLink to="/dashboard/hostPayments" onClick={handleLinkClick} className={navItemClass}>
                  <MdPayment className={iconClass} />
                  Payment History
                </NavLink>

                <NavLink to="/dashboard/requestAdvertise" onClick={handleLinkClick} className={navItemClass}>
                  <RiAdvertisementLine className={iconClass} />
                  Manage Advertisements
                </NavLink>
              </div>
            )}
          </nav>

          {/* Footer of Sidebar */}
          <div className="p-4 border-t border-slate-800/80">
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <FaHome className={iconClass} />
              Return to Website
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content Area: Seamless luxury background without awkward nesting */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
