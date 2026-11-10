import React from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { FaCarRear, FaDollarSign } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import DynamicPieChartHost from "./Chart/DynamicPieChartHost";
import DynamicLineChartHost from "./Chart/DynamicLineChartHost";
import useAuth from "../../../Hooks/useAuth";
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

interface HostBooking {
  _id: string;
  userName?: string;
  cus_email?: string;
  location?: string;
  startDate: string;
  amount?: number;
  totalCost?: number;
}

const HostOverview: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["query-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin-stats");
      return res.data;
    },
  });

  const { data: bookings = [] } = useQuery<HostBooking[]>({
    queryKey: ["host-recent-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/recent-bookings/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: bookingData = [] } = useQuery<Booking[]>({
    queryKey: ["host-booking-data", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/hostHistory/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalPrice = bookingData.reduce((sum, item) => {
    const cost = item.totalCost || item.amount || 0;
    return sum + cost;
  }, 0);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
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
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Host Operations Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Host Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor your vehicle performance, booking payouts, and guest trip history
        </p>
      </div>

      {/* Unified Executive Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={IoPersonSharp}
          title="Trip Passengers"
          value={data?.passengerCount ?? 0}
          subtitle="Served to Date"
        />
        <StatCard
          icon={FaCarRear}
          title="Total Cars Listed"
          value={data?.hostCount ?? 0}
          subtitle="Registered Fleet"
        />
        <StatCard
          icon={FaCarRear}
          title="Ready for Drive"
          value={data?.carCount ?? 0}
          subtitle="Instant Booking Ready"
        />
        <StatCard
          icon={FaDollarSign}
          title="Host Earnings"
          value={`৳${totalPrice.toLocaleString()}`}
          subtitle="Gross Revenue Volume"
        />
      </div>

      {/* Modern Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Host Activity Breakdown
              </h2>
              <p className="text-xs text-slate-400">Trips by approval status</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
              Live
            </span>
          </div>
          <DynamicPieChartHost />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Revenue Growth Timeline
              </h2>
              <p className="text-xs text-slate-400">Earnings generated across calendar days</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-teal-50 text-[11px] font-bold text-teal-700">
              BDT Volume
            </span>
          </div>
          <DynamicLineChartHost />
        </div>
      </div>

      {/* Modern Executive Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Vehicle Bookings</h2>
            <p className="text-xs text-slate-500 mt-0.5">Trips booked on your listed vehicles</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {bookings.length} reservations
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                <th className="py-3.5 px-6 w-12">#</th>
                <th className="py-3.5 px-6">Guest Account</th>
                <th className="py-3.5 px-6">Pickup Hub</th>
                <th className="py-3.5 px-6">Start Date</th>
                <th className="py-3.5 px-6 text-right">Earning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {bookings.length > 0 ? (
                bookings.map((item: HostBooking, idx: number) => (
                  <tr key={item._id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {item?.cus_email || item?.userName || "Verified Guest"}
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 font-medium">
                        📍 {item?.location || "Dhaka"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs font-medium">
                      {formatDate(item?.startDate)}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-teal-700">
                      ৳{(item?.amount || item?.totalCost || 0).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-slate-400">
                    No recent vehicle reservations recorded yet.
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

export default HostOverview;
