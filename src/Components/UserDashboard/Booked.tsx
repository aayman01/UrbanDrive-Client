/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { SyncLoader } from 'react-spinners';
import Navbar from '../Navbar';


const Booked: React.FC = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: bookedData, isLoading, isFetching } = useQuery({
    queryKey: ['bookedData'],
    queryFn: async () => {
      if (!user?.email) return []; // Return empty array if no user email
      const response = await axiosPublic.get(`/booking/${user?.email}`);
      return response.data;
    },
  });
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }

  // Fetching state spinner
  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={10} />
      </div>
    );
  }

  // If data is successfully fetched
  const allBookings = Array.isArray(bookedData) ? bookedData : [bookedData];

  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto ">
        <h2 className="text-3xl font-lato font-bold lg:mt-8 lg:ml-2">
          Bookings
        </h2>
        {allBookings.length === 0 ? (
          <div className="h-screen-minus-20px flex items-center justify-center mt-8 lg:mt-8">
            <h2 className="text-3xl font-bold">
              You haven't booked any car....
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded mt-8 lg:mt-16 lg:mb-16">
            <table className="table table-xl font-medium">
              <thead className="bg-primary text-white">
                <tr className="text-base">
                  <th>#</th>
                  <th>Location</th>
                  <th>Phone Number</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Cost</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((item: any, idx: number) => (
                  <tr key={item._id}>
                    <th>{idx + 1}</th>
                    <td>{item?.location}</td>
                    <td>{item?.cus_phoneNumber}</td>
                    <td>{formatDate(item?.startDate)}</td>
                    <td>{formatDate(item?.endDate)}</td>
                    <td className="font-bold"> ৳{item?.amount}</td>
                    <td className="font-bold">{item?.hostIsApproved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Booked;
