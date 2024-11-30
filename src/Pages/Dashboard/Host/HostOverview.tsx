/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoPersonSharp } from "react-icons/io5";
import { FaCarRear, FaDollarSign } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import DynamicPieChartHost from "./Chart/DynamicPieChartHost";
import DynamicLineChartHost from "./Chart/DynamicLineChartHost";
import useAuth from "../../../Hooks/useAuth";


function StatCard({
  icon: Icon,
  title,
  value,
  bgColor,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  bgColor: string;
}) {
  return (
    <div
      className={`${bgColor} rounded-xl p-6 text-white shadow-lg transform transition-transform hover:scale-105`}
    >
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

const HostOverview: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth()
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
      const res = await axiosPublic.get(`/recent-bookings/${user?.email}`);
      return res.data;
    },
  });
   const { data: bookingData = [] } = useQuery({
     queryKey: ["bookingData"],
     queryFn: async () => {
       const res = await axiosPublic.get(`/hostHistory/${user?.email}`);
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
    amount: number;
    cus_email: string;
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

  //  oi chart title
  const piOptions = {
    title: "Daily Activities",
  };

  // line chart title
  const lineOptions = {
    title: "Price, per days",
    curveType: "function",
    series: [{ color: "#D9544C" }],
    intervals: { style: "bars" },
    legend: "none",
  };
 
  //  Calculating total amount
  const totalPrice = bookingData.reduce((sum : number, item : any) => {
    const cost = item.totalCost || item.amount || 0;
    return sum + cost;
  }, 0);
  return (
    <div className="text-2xl ">
      <div className="mt-3">
        <h2 className="text-3xl font-bold mb-4 text-left mt-2 font-Merri">
          Overview
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={IoPersonSharp}
          title="Total Passengers"
          value={data?.passengerCount}
          bgColor="bg-[#14B8A6]"
        />
        <StatCard
          icon={FaCarRear}
          title="Total Cars"
          value={data?.carCount}
          bgColor="bg-[#003366]"
        />
        <StatCard
          icon={FaDollarSign}
          title="Total Revenue"
          value={`৳${totalPrice || 0}`}
          bgColor="bg-[#14B8A6]"
        />
      </div>
      {/* <>
        <div className="stats mt-3 mb-8">
          <div className="stat space-y-3 bg-green-400 ">
            <div className="stat-figure text-secondary">
              <img className="w-11 h-11" src={person} alt="" />
            </div>
            <div className="stat-title font-bold text-white">Total revenue</div>
            <div className="stat-value">{data?.hostCount}</div>
          </div>

          <div className="stat space-y-3 bg-blue-500">
            <div className="stat-figure text-secondary">
              <IoPersonSharp className="w-11 h-11" />
            </div>
            <div className="stat-title text-white font-bold">
              Total Passenger
            </div>
            <div className="stat-value">{data?.passengerCount}</div>
          </div>
          <div className="stat space-y-3 bg-red-400 w-[275px]">
            <div className="stat-figure text-secondary">
              <FaCarRear className="w-11 h-11" />
            </div>
            <div className="stat-title text-white font-bold">Total Car</div>
            <div className="stat-value">{data?.carCount}</div>
          </div>
        </div>
      </> */}

      {/* chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#1F2937] mb-4">
            {piOptions.title}
          </h2>
          <DynamicPieChartHost />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#1F2937] mb-4">
            {lineOptions.title}
          </h2>
          <DynamicLineChartHost />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4 text-left">
          Recent car bookings
        </h2>
        <div className="overflow-x-auto border rounded mt-5">
          <table className="table font-medium">
            <thead className="bg-primary text-white">
              <tr className="text-base">
                <th>#</th>
                <th>User</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item: bookings, idx: number) => (
                <tr key={item._id}>
                  <th>{idx + 1}</th>
                  <td>{item?.cus_email}</td>
                  <td>{item?.location}</td>
                  <td>{formatDate(item?.startDate)}</td>
                  <td className="font-bold">
                    {item?.amount}
                    <span className="text-xl">৳</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HostOverview;
