import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";
import { FaCarRear, FaTrash } from "react-icons/fa6";
import { VerifiedShieldSVG } from "../../../Components/Common/SVG/FeatureBadges";

interface CarData {
  _id: string;
  make: string;
  name: string;
  date: string;
  image: string;
  category?: string;
  rental_price_per_day?: number;
}

const TotalCarList = () => {
  const axiosPublic = useAxiosPublic();
  const { data: TotalCar = [], refetch, isLoading } = useQuery({
    queryKey: ["Car"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/totalCars`);
      return res.data;
    },
  });

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Remove this vehicle?",
      text: "This vehicle listing will be deleted from the active fleet.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/cars/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: "Vehicle has been removed successfully.",
              icon: "success",
            });
          }
        });
      }
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
          <span>Active Fleet Inventory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Manage Cars
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review live vehicle inventory, host ownership, and fleet removals
        </p>
      </div>

      {TotalCar.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <FaCarRear className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No vehicles in inventory</h3>
          <p className="text-xs text-slate-500 mt-1">No cars have been added to the public fleet yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Live Inventory</h2>
              <p className="text-xs text-slate-500 mt-0.5">{TotalCar.length} active vehicles registered</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                  <th className="py-3.5 px-6 w-12">#</th>
                  <th className="py-3.5 px-6">Preview</th>
                  <th className="py-3.5 px-6">Vehicle Model</th>
                  <th className="py-3.5 px-6">Host / Owner</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {TotalCar.map((item: CarData, idx: number) => (
                  <tr key={item._id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="py-4 px-6">
                      <div className="w-16 h-11 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                        <img src={item?.image} className="w-full h-full object-cover" alt="car" />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div>
                        <span>{item?.make}</span>
                        {item?.category && (
                          <span className="block text-[11px] font-semibold text-teal-600 mt-0.5">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-xs font-semibold">
                      {item?.name || "Host Partner"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                      >
                        <FaTrash className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
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

export default TotalCarList;
