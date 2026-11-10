import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { SyncLoader } from "react-spinners";
import { VerifiedShieldSVG } from "../../../Components/Common/SVG/FeatureBadges";
import { TbBrandBooking } from "react-icons/tb";

interface Booking {
  _id: string;
  cus_email: string;
  cus_phoneNumber: string;
  startDate: string;
  endDate: string;
  location: string;
  amount: number;
  status: string;
}

const AllBookings = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allBookings = [], isLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookings-data`);
      return res.data;
    },
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

  const successBookings = allBookings.filter(
    (b: Booking) => b.status === "Success" || (b as any).hostIsApproved === "success"
  );

  return (
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Transactions & Reservations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          All Bookings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Historical and active reservation logs across all destination hubs
        </p>
      </div>

      {successBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <TbBrandBooking className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No confirmed bookings yet</h3>
          <p className="text-xs text-slate-500 mt-1">Bookings will appear here once guests complete reservation.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Completed Reservations</h2>
              <p className="text-xs text-slate-500 mt-0.5">{successBookings.length} confirmed orders</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              ✓ Verified Payments
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                  <th className="py-3.5 px-6 w-12">#</th>
                  <th className="py-3.5 px-6">Customer Email</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Phone Number</th>
                  <th className="py-3.5 px-6">Start Date</th>
                  <th className="py-3.5 px-6">End Date</th>
                  <th className="py-3.5 px-6 text-right">Total Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {successBookings.map((item: Booking, idx: number) => (
                  <tr key={item._id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      {item.cus_email || "Guest"}
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 font-medium">
                        📍 {item.location || "Dhaka"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs font-medium">
                      {item.cus_phoneNumber || "—"}
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs">
                      {formatDate(item.startDate)}
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs">
                      {formatDate(item.endDate)}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-teal-700">
                      ৳{item.amount?.toLocaleString() || 0}
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

export default AllBookings;
