import { IoPersonSharp } from "react-icons/io5";
import person from "../../../assets/person.png";
import { FaCarRear } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import DynamicPieChartHost from "./Chart/DynamicPieChartHost";
import DynamicLineChartHost from "./Chart/DynamicLineChartHost";

const HostOverview: React.FC = () => {
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
    <div className="text-2xl ">
      <div className="mt-3">
        <h2 className="text-3xl font-bold mb-4 text-left mt-2 font-Merri">
          Overview
        </h2>
      </div>
      <>
        <div className="stats mt-3">
          <div className="stat space-y-3 bg-green-400">
            <div className="stat-figure text-secondary">
              <img className="w-11 h-11" src={person} alt="" />
            </div>
            <div className="stat-title font-bold text-white">
              Total revenue
            </div>
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
      </>

      {/* chart */}
      <div className="py-9 lg:py-11">
        <h3>{piOptions.title} </h3>
        {/* pi charts */}
       <DynamicPieChartHost/>
        {/* line chart */}
        <h3>{lineOptions.title} </h3>
        <DynamicLineChartHost/>
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
                  <td>{item?.userName}</td>
                  <td>{item?.location}</td>
                  <td>{formatDate(item?.startDate)}</td>
                  <td className="font-bold">
                    {item?.totalCost}
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
