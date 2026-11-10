/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { FaCarRear, FaTrash, FaPenToSquare } from "react-icons/fa6";
import { VerifiedShieldSVG } from "../../../Components/Common/SVG/FeatureBadges";

interface CarData {
  _id: string;
  make: string;
  rental_price_per_day: number;
  availability: boolean;
  image: string;
  model: string;
  amount: number;
}

const HostManageCars = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: TotalCar = [], refetch, isLoading } = useQuery({
    queryKey: ["host-cars", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/hostHistory/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const openModal = (car: CarData) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Delete this vehicle?",
      text: "You won't be able to revert this listing!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/cars/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Vehicle has been removed from your fleet.",
              icon: "success",
              confirmButtonColor: "#0D9488",
            });
          }
        });
      }
    });
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedCar) return;
    const form = event.currentTarget;
    const make = form.make.value;
    const model = form.model.value;
    const amount = form.amount.value;

    try {
      setLoading(true);
      await axiosPublic.patch(`/updateManageCar/${selectedCar._id}`, {
        make,
        model,
        amount,
      });
      setIsModalOpen(false);
      refetch();
      Swal.fire({
        title: "Updated!",
        text: "Car details have been updated successfully.",
        icon: "success",
        confirmButtonColor: "#0D9488",
      });
    } catch {
      Swal.fire("Error!", "Failed to update car details.", "error");
    } finally {
      setLoading(false);
    }
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
          <span>Vehicle Fleet Inventory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Manage Cars
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Update rental rates, edit vehicle specifications, and monitor availability
        </p>
      </div>

      {TotalCar.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
          <FaCarRear className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No vehicles listed yet</h3>
          <p className="text-xs text-slate-500 mt-1">Add a vehicle through the host onboarding form.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Your Fleet</h2>
              <p className="text-xs text-slate-500 mt-0.5">{TotalCar.length} active vehicle listings</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                  <th className="py-3.5 px-6 w-12">#</th>
                  <th className="py-3.5 px-6">Image</th>
                  <th className="py-3.5 px-6">Model</th>
                  <th className="py-3.5 px-6">Availability</th>
                  <th className="py-3.5 px-6">Price / Day</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {TotalCar.map((item: CarData, idx: number) => (
                  <tr key={item._id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="py-4 px-6">
                      <div className="w-16 h-11 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                        <img src={item.image} className="w-full h-full object-cover" alt="car" />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {item.make} {item.model}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          item.availability !== false
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {item.availability !== false ? "✓ Available" : "Paused"}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-black text-teal-700">
                      ৳{item.rental_price_per_day || item.amount || 0}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openModal(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors"
                        >
                          <FaPenToSquare className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                        >
                          <FaTrash className="w-3 h-3" />
                          <span>Delete</span>
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

      {/* Edit Vehicle Modal */}
      {isModalOpen && selectedCar && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-1">Update Vehicle Listing</h3>
            <p className="text-xs text-slate-500 mb-6">Modify details for {selectedCar.make}</p>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Make / Manufacturer
                </label>
                <input
                  type="text"
                  name="make"
                  defaultValue={selectedCar.make}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  defaultValue={selectedCar.model}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Daily Rental Rate (BDT)
                </label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={selectedCar.rental_price_per_day || selectedCar.amount}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center gap-2 shadow-sm"
                >
                  {loading && <ImSpinner9 className="animate-spin" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostManageCars;
