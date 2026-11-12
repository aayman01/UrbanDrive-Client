/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

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
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [Loading, setLoading] = useState<boolean>(false);

  const { data: TotalCar = [], refetch, isLoading } = useQuery({
    queryKey: ["Car"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/hostHistory/${user?.email}`);
      return res.data;
    },
  });
  // console.log(TotalCar);
  // convert single object
  const singleCarObject: CarData = TotalCar.reduce((acc: any, car: any) => ({ ...acc, ...car }), {} as CarData);

  // Destructure the combined object
  const { make, model, amount, _id } = singleCarObject;





  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/cars/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Successfully deleted",
              icon: "success",
            });
          }
        });
      }
    });
  };

  //  update car value
  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const make = form.make.value;
    const model = form.model.value;
    const amount = form.amount.value;
    // updated data
    try {
      const updatedValue = {
        make: make,
        model: model,
        amount: amount,
      };

      setLoading(true);
      await axiosPublic.patch(`/updateManageCar/${_id}`, updatedValue);
      setIsModalOpen(false);
      refetch();
      Swal.fire("Updated!", "Car details have been updated.", "success");
    } catch {
      Swal.fire("Error!", "Failed to update car details.", "error");
    } finally {
      setLoading(false);
    }
  };



  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }
  return (
    <div>
      <div className="mt-4">
        <h2 className="text-3xl font-bold mb-6 text-center underline">Manage Cars</h2>
      </div>
      {TotalCar.length === 0 ? (
        <div className="h-screen-minus-20px flex items-center justify-center">
          <h2 className="text-3xl font-bold">No car added yet...</h2>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded mt-16">
          <table className="table font-medium">
            <thead className="bg-primary text-white">
              <tr className="text-base">
                <th>#</th>
                <th>Image</th>
                <th>Car Model</th>
                <th>Availability</th>
                <th>Price Per Day</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {TotalCar.map((item: CarData, idx: number) => (
                <tr key={item._id}>
                  <th>{idx + 1}</th>
                  <th>
                    <img src={item.image} className="w-14 h-11 rounded-md" alt="car" />
                  </th>
                  <td>{item.make}</td>
                  <td>{item.availability ? "Available" : "Unavailable"}</td>
                  <td className="font-bold">{item.rental_price_per_day} Taka</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-error text-white mr-6"
                    >
                      Delete
                    </button>
                    <button
                      onClick={openModal}
                      className="btn btn-success text-white"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-400 font-bold text-3xl"
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-4">Updated Cars</h2>
      <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">

        {/* Make Input */}
        <div>
          <label htmlFor="make" className="block text-gray-700 font-medium mb-2">Make:</label>
          <input
            type="text"
            id="make"
            name="make"
            defaultValue={make}
            placeholder="Enter make"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Model Input */}
        <div>
          <label htmlFor="model" className="block text-gray-700 font-medium mb-2">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            defaultValue={model}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            defaultValue={amount}
            placeholder="Enter amount"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* File Upload Input  optional work*/}
        <div>
          <label htmlFor="file" className="block text-gray-700 font-medium mb-2">Upload File:</label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png, .pdf"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          className={`w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-2 px-4 rounded mt-4 ${Loading ? 'cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {Loading ? (
            <ImSpinner9 size={28} className="animate-spin m-auto text-accent" />
          ) : (
            "updated Now"
          )}
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default HostManageCars;
