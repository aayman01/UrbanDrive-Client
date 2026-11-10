import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { FaCheckCircle } from 'react-icons/fa';
import { FiMail, FiUser, FiXCircle } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa6';
import { SyncLoader } from 'react-spinners';
import { VerifiedShieldSVG } from '../../../Components/Common/SVG/FeatureBadges';

interface PendingCar {
  _id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  price_per_day: number;
  price: number;
  name: string;
  email: string;
  features: string[];
  seatCount: number;
  description: string;
  discount: number;
  image: string;
  status?: string;
}

const PendingCars: React.FC = () => {
  const [pendingCars, setPendingCars] = useState<PendingCar[]>([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetchPendingCars();
  }, []);

  const fetchPendingCars = async () => {
    try {
      const response = await axiosPublic.get('/hostCar');
      setPendingCars(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pending cars:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (carId: string) => {
    try {
      const carToApprove = pendingCars.find(car => car._id === carId);
      if (!carToApprove) {
        throw new Error('Car not found in pending list');
      }

      const carData = {
        make: carToApprove.make,
        model: carToApprove.model,
        year: carToApprove.year,
        category: carToApprove.category,
        rental_price_per_day: carToApprove.price_per_day || carToApprove.price,
        name: carToApprove.name,
        email: carToApprove.email,
        features: carToApprove.features || [],
        seatCount: carToApprove.seatCount || 4,
        description: carToApprove.description || '',
        discount: carToApprove.discount || 0,
        image: carToApprove.image,
        availability: true,
        averageRating: 5.0,
        trip_count: 0,
        date: new Date().getFullYear().toString(),
      };

      const response = await axiosPublic.post('/cars', carData);

      if (response.data.insertedId) {
        await axiosPublic.delete(`/hostCar/${carId}`);
        setPendingCars(prev => prev.filter(car => car._id !== carId));
        Swal.fire({
          title: 'Approved!',
          text: 'Car has been added to public inventory',
          icon: 'success',
          confirmButtonColor: '#0D9488',
        });
      }
    } catch (error) {
      console.error('Error approving car:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to approve car',
        icon: 'error',
      });
    }
  };

  const handleReject = async (carId: string) => {
    try {
      await axiosPublic.delete(`/hostCar/${carId}`);
      setPendingCars(prev => prev.filter(car => car._id !== carId));
      Swal.fire({
        title: 'Rejected',
        text: 'Listing application has been dismissed',
        icon: 'info',
        confirmButtonColor: '#64748B',
      });
    } catch (error) {
      console.error('Error rejecting car:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to reject vehicle',
        icon: 'error',
      });
    }
  };

  if (loading) {
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
          <span>Vehicle Verification Queue</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Pending Vehicle Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review host applications, verify documentation, and approve listings
        </p>
      </div>

      {pendingCars.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
          <FaCar className="w-12 h-12 text-teal-600/40 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 mb-1">Queue is Clear</h2>
          <p className="text-xs text-slate-500">All submitted vehicle applications have been processed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingCars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                    ৳{car.price_per_day || car.price} / day
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                      {car.category}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{car.year}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-4">
                    {car.make} {car.model}
                  </h3>

                  <div className="space-y-2.5 text-xs text-slate-600 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <FiUser className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="font-semibold text-slate-800">{car.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{car.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleApprove(car._id)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors"
                >
                  <FaCheckCircle className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(car._id)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                >
                  <FiXCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingCars;
