import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { SyncLoader } from "react-spinners";
import { VerifiedShieldSVG } from "../../../Components/Common/SVG/FeatureBadges";
import { MdCardMembership } from "react-icons/md";

interface PaymentData {
  _id: string;
  name: string;
  planName: string;
  date: string;
  purchaseDate: string;
  expiryDate: string;
  amount: number;
  cus_name: string;
  status: string;
}

const ManageMemberShip = () => {
  const axiosPublic = useAxiosPublic();
  const { data: memberShip = [], isLoading } = useQuery({
    queryKey: ["all-membership"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/memberships-data`);
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

  const successMemberships = memberShip.filter(
    (item: PaymentData) => item.status === "Success" || (item as any).status === "success"
  );

  return (
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Membership Subscriptions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Manage Membership
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Active membership tier enrollments, validity periods, and subscription revenue
        </p>
      </div>

      {successMemberships.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
          <MdCardMembership className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No active memberships</h3>
          <p className="text-xs text-slate-500 mt-1">Purchased memberships will appear in this ledger.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Active Subscriptions</h2>
              <p className="text-xs text-slate-500 mt-0.5">{successMemberships.length} verified members</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">
              Club Access
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                  <th className="py-3.5 px-6 w-12">#</th>
                  <th className="py-3.5 px-6">Member Name</th>
                  <th className="py-3.5 px-6">Enrolled Plan</th>
                  <th className="py-3.5 px-6">Purchased Date</th>
                  <th className="py-3.5 px-6">Expiry Date</th>
                  <th className="py-3.5 px-6 text-right">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {successMemberships.map((item: PaymentData, idx: number) => (
                  <tr key={item._id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {item?.cus_name || item?.name || "Member"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        ★ {item?.planName}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600">
                      {formatDate(item?.purchaseDate)}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-600">
                      {formatDate(item?.expiryDate)}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-teal-700">
                      ৳{item?.amount || 0}
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

export default ManageMemberShip;
