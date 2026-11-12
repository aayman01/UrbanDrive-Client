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

type Role = "Admin" | "Host" | "";

const Dashboard: React.FC = () => {
  const [role, isPending]: [Role, boolean, boolean] = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

const handleLinkClick = () => {
  if(window.innerWidth < 768){
    setIsSidebarOpen(false);
  }
}

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background relative">
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-primary p-2 rounded-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
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

      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`fixed md:static w-64 bg-primary shadow-lg z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out `}
      >
        <div className="px-6 py-8">
          <Link to="/">
            <h2 className="text-2xl font-bold text-white text-center">
              <span className="text-accent">U</span>rban
              <span className="text-accent">Drive</span>
            </h2>
          </Link>
        </div>

        <nav className="px-4 py-4 sticky top-0">
          {role === "Admin" && (
            <div className="space-y-2">
              <NavLink
                to="/dashboard/adminHome"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <TfiLayoutGrid2 className="w-4 h-4" />
                Overview
              </NavLink>

              <NavLink
                to="/dashboard/manageUser"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <FaUserAlt className="w-4 h-4" />
                Manage Users
              </NavLink>

              <NavLink
                to="/dashboard/cars"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <FaCarRear className="w-4 h-4" />
                Manage Cars
              </NavLink>

              <NavLink
                to="/dashboard/paymentHistory"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <FaCoins className="w-4 h-4" />
                Payment History
              </NavLink>

              <NavLink
                to="/dashboard/bookings"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <TbBrandBooking className="w-4 h-4" />
                Bookings
              </NavLink>

              <NavLink
                to="/dashboard/manageMemberShip"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <MdCardMembership className="w-4 h-4" />
                Manage Membership
              </NavLink>
              <NavLink
                to="/dashboard/support"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Support Chat
              </NavLink>
              <NavLink
                to="/dashboard/pendingCars"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <MdOutlinePendingActions className="w-4 h-4" />
                Pending Cars
              </NavLink>
            </div>
          )}

          {role === "Host" && (
            <div className="space-y-2">
              <NavLink
                to="/dashboard/hostOverview"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <TfiLayoutGrid2 className="w-4 h-4" />
                Overview
              </NavLink>

              <NavLink
                to="/dashboard/myCars"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <FaCarRear className="w-4 h-4" />
                Manage Cars
              </NavLink>

              <NavLink
                to="/dashboard/hostManageBookings"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <AiFillMedicineBox className="w-4 h-4" />
                Manage Bookings
              </NavLink>

              <NavLink
                to="/dashboard/hostPayments"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <MdPayment className="w-4 h-4" />
                Payment History
              </NavLink>

              <NavLink
                to="/dashboard/requestAdvertise"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <RiAdvertisementLine className="w-4 h-4" />
                Manage Advertisements
              </NavLink>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-white/10">
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <FaHome className="w-4 h-4" />
              Home
            </NavLink>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto md:ml-0">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
