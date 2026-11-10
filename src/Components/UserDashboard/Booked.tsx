import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { SyncLoader } from 'react-spinners';
import Navbar from '../Navbar';
import Footer from '../Footer';
import AmbientGlow from '../Common/SVG/AmbientGlow';
import { FaCalendarDays, FaLocationDot, FaPhone, FaCarRear } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface BookingRecord {
  _id: string;
  location?: string;
  phoneNumber?: string;
  startDate?: string;
  endDate?: string;
  totalCost?: number;
  amount?: number;
  carName?: string;
  hostIsApproved?: string;
}

const Booked: React.FC = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: bookedData, isLoading } = useQuery({
    queryKey: ['bookedData', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const response = await axiosPublic.get(`/booking/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <SyncLoader color="#0D9488" size={14} />
      </div>
    );
  }

  const allBookings: BookingRecord[] = Array.isArray(bookedData)
    ? bookedData
    : bookedData
    ? [bookedData]
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden font-poppins">
      <AmbientGlow />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
            <FaCalendarDays className="w-3.5 h-3.5 text-teal-600" />
            <span>Renter Trip History</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Booked Trips
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View all your past, present, and scheduled vehicle reservations
          </p>
        </div>

        {allBookings.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 border border-teal-100">
              <FaCarRear className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">No Reservations Yet</h2>
            <p className="text-sm text-slate-500 mt-1 mb-6">
              You haven't reserved any luxury or everyday vehicles with UrbanDrive yet.
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
            >
              Browse Fleet
            </Link>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">All Reservations</h2>
                <p className="text-xs text-slate-500 mt-0.5">{allBookings.length} total bookings</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">
                Active & Completed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                    <th className="py-3.5 px-6 w-12">#</th>
                    <th className="py-3.5 px-6">Destination Location</th>
                    <th className="py-3.5 px-6">Contact Number</th>
                    <th className="py-3.5 px-6">Rental Start</th>
                    <th className="py-3.5 px-6">Rental Return</th>
                    <th className="py-3.5 px-6 text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {allBookings.map((item: BookingRecord, idx: number) => {
                    const cost = item?.totalCost || item?.amount || 0;
                    return (
                      <tr key={item._id || idx} className="hover:bg-teal-50/30 transition-colors">
                        <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{idx + 1}</td>
                        <td className="py-4 px-6 font-bold text-slate-900">
                          <span className="inline-flex items-center gap-1.5">
                            <FaLocationDot className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                            <span>{item?.location || "Designated Station"}</span>
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-600 font-medium">
                          <span className="inline-flex items-center gap-1.5 text-xs">
                            <FaPhone className="w-3 h-3 text-slate-400" />
                            {item?.phoneNumber || "N/A"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-600 font-medium">
                          {formatDate(item?.startDate)}
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-600 font-medium">
                          {formatDate(item?.endDate)}
                        </td>
                        <td className="py-4 px-6 text-right font-black text-slate-900">
                          ৳{cost.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Booked;
