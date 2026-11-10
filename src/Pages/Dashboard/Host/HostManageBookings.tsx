import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { SyncLoader } from "react-spinners";
import useAuth from "../../../Hooks/useAuth";
import { VerifiedShieldSVG } from "../../../Components/Common/SVG/FeatureBadges";
import { TbBrandBooking } from "react-icons/tb";

interface Booking {
  _id: string;
  cus_name: string;
  cus_phoneNumber: string;
  startDate: string;
  endDate: string;
  location: string;
  amount: number;
  status: string;
}

const HostManageBookings = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: myHistory = [], isLoading } = useQuery({
    queryKey: ["myHistory", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/hostHistory/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

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

  const successBookings = myHistory.filter(
    (b: Booking) => b.status === "Success" || (b as any).hostIsApproved === "success"
  );

  return (
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Host Reservations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Manage Bookings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review trip schedules, customer details, and booking approvals for your fleet
        </p>
      </div>

      {successBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
          <TbBrandBooking className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No active bookings yet</h3>
          <p className="text-xs text-slate-500 mt-1">Incoming bookings for your vehicles will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Vehicle Bookings</h2>
              <p className="text-xs text-slate-500 mt-0.5">{successBookings.length} confirmed trips</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">
              Active Trips
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                  <th className="py-3.5 px-6 w-12">#</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Contact Number</th>
                  <th className="py-3.5 px-6">Start Date</th>
                  <th className="py-3.5 px-6">Total Paid</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {successBookings.map((item: Booking, idx: number) => (
                  <tr key={item._id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {item?.cus_name || "Guest Customer"}
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 font-medium">
                        📍 {item?.location || "Dhaka Hub"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs font-medium">
                      {item?.cus_phoneNumber || "—"}
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs">
                      {formatDate(item?.startDate)}
                    </td>
                    <td className="py-4 px-6 font-black text-teal-700">
                      ৳{item?.amount?.toLocaleString() || 0}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors">
                          Accept
                        </button>
                        <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostManageBookings;
