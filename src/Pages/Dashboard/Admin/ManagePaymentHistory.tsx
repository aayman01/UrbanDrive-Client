import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { SyncLoader } from "react-spinners";
import { VerifiedShieldSVG } from "../../../Components/Common/SVG/FeatureBadges";
import { FaCoins } from "react-icons/fa6";

interface PaymentData {
  _id: string;
  name: string;
  paymentId: string;
  tran_date: string;
  card_type: string;
}

const ManagePaymentHistory = () => {
  const axiosPublic = useAxiosPublic();
  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/paymentHistory`);
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

  return (
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Financial Audit Trail</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Payment History
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete ledger of gateway transactions, card settlements, and timestamps
        </p>
      </div>

      {paymentHistory.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <FaCoins className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No payment records found</h3>
          <p className="text-xs text-slate-500 mt-1">Processed transactions will appear in this ledger.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Gateway Transactions</h2>
              <p className="text-xs text-slate-500 mt-0.5">{paymentHistory.length} successful settlements</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">
              SSLCommerz / Stripe
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                  <th className="py-3.5 px-6 w-12">#</th>
                  <th className="py-3.5 px-6">Customer Name</th>
                  <th className="py-3.5 px-6">Transaction ID</th>
                  <th className="py-3.5 px-6">Card / Payment Method</th>
                  <th className="py-3.5 px-6 text-right">Settled Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {paymentHistory.map((item: PaymentData, idx: number) => (
                  <tr key={item._id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {item.name || "Customer"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                        {item.paymentId}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        💳 {item.card_type || "Visa / Master"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-xs text-slate-500 font-medium">
                      {formatDate(item.tran_date)}
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

export default ManagePaymentHistory;
