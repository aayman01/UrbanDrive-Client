import React from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { FaCarRear, FaDollarSign } from "react-icons/fa6";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import DynamicPieChart from "./Charts/DynamicPieChart";
import DynamicLineChart from "./Charts/DynamicLineChart";

function StatCard({ icon: Icon, title, value, bgColor }: { 
  icon: React.ElementType, 
  title: string, 
  value: string | number,
  bgColor: string 
}) {
  return (
    <div className={`${bgColor} rounded-xl p-6 text-white shadow-lg transform transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-md font-bold drop-shadow-md ">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="w-10 h-10 opacity-80" />
      </div>
    </div>
  );
}

const AdminHome: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const { data = [], isLoading } = useQuery({
    queryKey: ["query-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin-stats");
      // console.log(res.data);
      return res.data;
    },
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosPublic.get("/recent-bookings");
      return res.data;
    },
  });

  interface bookings {
    _id: string;
    userName: string;
    phoneNumber: string;
    startDate: string;
    endDate: string;
    location: string;
    totalCost: number;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }


  const piOptions = {
    title: "Daily Activities",
  };


  const lineOptions = {
    title: "Price, per days",
    curveType: "function",
    series: [{ color: "#D9544C" }],
    intervals: { style: "bars" },
    legend: "none",
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-[#1F2937] text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={IoPersonSharp}
            title="Car Owners"
            value={data?.hostCount}
            bgColor="bg-[#003366]"
          />
          <StatCard 
            icon={IoPersonSharp}
            title="Total Passengers"
            value={data?.passengerCount}
            bgColor="bg-[#14B8A6]"
          />
          <StatCard 
            icon={FaCarRear}
            title="Available Cars"
            value={data?.carCount}
            bgColor="bg-[#003366]"
          />
          <StatCard 
            icon={FaDollarSign}
            title="Total Revenue"
            value={`৳${data?.revenue || 0}`}
            bgColor="bg-[#14B8A6]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">{piOptions.title}</h2>
            <DynamicPieChart />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">{lineOptions.title}</h2>
            <DynamicLineChart />
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#1F2937] mb-6">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 text-[#003366]">User</th>
                  <th className="pb-3 text-[#003366]">Location</th>
                  <th className="pb-3 text-[#003366]">Start Date</th>
                  <th className="pb-3 text-[#003366]">Amount</th>

      
     
              </tr>
            </thead>
       
             
              <tbody>
                {bookings.map((item: bookings) => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center">
                        
                        <span className="ml-3">{item.userName}</span>
                      </div>
                    </td>
                    <td className="py-4">{item.location}</td>
                    <td className="py-4">{formatDate(item.startDate)}</td>
                    <td className="py-4 font-medium">
                      {item.totalCost}
                      <span className="text-xl">৳</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
