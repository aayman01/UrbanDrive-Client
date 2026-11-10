import React from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { FaCarRear, FaDollarSign } from "react-icons/fa6";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import DynamicPieChart from "./Charts/DynamicPieChart";
import DynamicLineChart from "./Charts/DynamicLineChart";
import { VerifiedShieldSVG } from '../../../Components/Common/SVG/FeatureBadges';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle?: string;
}

function StatCard({ icon: Icon, title, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
          {title}
        </span>
        <div className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
          {value}
        </div>
        {subtitle && (
          <span className="text-[11px] font-medium text-teal-600 mt-1 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            {subtitle}
          </span>
        )}
      </div>

      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 border border-teal-100/60 shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}

interface Booking {
  _id: string;
  amount: number;
  totalCost: number;
}

interface RecentBooking {
  _id: string;
  userName: string;
  location: string;
  startDate: string;
  totalCost: number;
}

const AdminHome: React.FC = () => {
  const axiosPublic = useAxiosPublic();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["query-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin-stats");
      return res.data;
    },
  });

  const { data: bookings = [] } = useQuery<RecentBooking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosPublic.get("/recent-bookings");
      return res.data;
    },
  });

  const { data: bookingData = [] } = useQuery<Booking[]>({
    queryKey: ["bookingData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bookings-data");
      return res.data;
    },
  });

  const totalPrice = bookingData.reduce((sum, item) => {
    const cost = item.totalCost || item.amount || 0;
    return sum + cost;
  }, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <SyncLoader color="#0D9488" size={14} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Executive Administration Console</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time metrics, fleet performance, and booking activity
        </p>
      </div>

      {/* Modern Unified Metric Cards - No multi-color circus */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={IoPersonSharp}
          title="Verified Car Hosts"
          value={data?.hostCount ?? 0}
          subtitle="Active Host Fleet"
        />
        <StatCard
          icon={IoPersonSharp}
          title="Total Passengers"
          value={data?.passengerCount ?? 0}
          subtitle="Registered Members"
        />
        <StatCard
          icon={FaCarRear}
          title="Available Vehicles"
          value={data?.carCount ?? 0}
          subtitle="Ready for Instant Rental"
        />
        <StatCard
          icon={FaDollarSign}
          title="Gross Revenue"
          value={`৳${totalPrice.toLocaleString()}`}
          subtitle="Total Completed Volume"
        />
      </div>

      {/* Modern Recharts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Booking Status Distribution
              </h2>
              <p className="text-xs text-slate-400">Activity breakdown by verification state</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
              Live
            </span>
          </div>
          <DynamicPieChart />
        </div>

        {/* Line Chart Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Revenue Trajectory
              </h2>
              <p className="text-xs text-slate-400">Daily gross booking value timeline</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-teal-50 text-[11px] font-bold text-teal-700">
              BDT Volume
            </span>
          </div>
          <DynamicLineChart />
        </div>
      </div>

      {/* Modern Executive Table: Recent Bookings */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Customer Bookings</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest trip requests made across hubs</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Showing {bookings.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Hub / Location</th>
                <th className="py-3.5 px-6">Start Date</th>
                <th className="py-3.5 px-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {bookings.length > 0 ? (
                bookings.map((item: RecentBooking) => (
                  <tr key={item._id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-teal-700 font-bold flex items-center justify-center text-xs">
                          {item.userName ? item.userName.charAt(0).toUpperCase() : "U"}
                        </div>
                        <span>{item.userName || "Verified Guest"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-medium text-slate-700">
                        📍 {item.location || "Dhaka Hub"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs font-medium">
                      {formatDate(item.startDate)}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-slate-900">
                      ৳{item.totalCost?.toLocaleString() || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-xs text-slate-400">
                    No recent bookings recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
