import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { ClipLoader } from "react-spinners";

interface BookingData {
  _id: string;
  hostIsApproved: string;
}

interface StatusItem {
  name: string;
  value: number;
  color: string;
}

const DynamicPieChart: React.FC = () => {
  const [data, setData] = useState<StatusItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const axiosPublic = useAxiosPublic();

  // Modern refined palette (Teal for Approved, Amber for Pending, Rose for Cancelled)
  const STATUS_COLORS: Record<string, string> = {
    Success: "#0D9488",
    Pending: "#F59E0B",
    Cancel: "#EF4444",
  };

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosPublic.get<BookingData[]>("/bookings-data");
        const bookingData = response.data;
        if (!bookingData || bookingData.length === 0) {
          setError("No booking records found.");
          setLoading(false);
          return;
        }

        const counts = bookingData.reduce(
          (acc, booking) => {
            const status = (booking.hostIsApproved || "pending").toLowerCase();
            if (status === "success" || status === "approved") acc.Success += 1;
            else if (status === "cancel" || status === "rejected") acc.Cancel += 1;
            else acc.Pending += 1;
            return acc;
          },
          { Success: 0, Pending: 0, Cancel: 0 }
        );

        const chartItems: StatusItem[] = [
          { name: "Approved", value: counts.Success, color: STATUS_COLORS.Success },
          { name: "Pending", value: counts.Pending, color: STATUS_COLORS.Pending },
          { name: "Cancelled", value: counts.Cancel, color: STATUS_COLORS.Cancel },
        ].filter((item) => item.value > 0);

        // Fallback if all 0
        if (chartItems.length === 0) {
          chartItems.push({ name: "Pending", value: 1, color: STATUS_COLORS.Pending });
        }

        setData(chartItems);
        setTotalCount(bookingData.length || 1);
      } catch (err: unknown) {
        console.error("Error fetching booking data:", err);
        setError("Unable to load activity distribution.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <ClipLoader size={36} color="#0D9488" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center text-xs font-semibold text-slate-400">
        {error}
      </div>
    );
  }

  // Custom modern tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percent = ((item.value / totalCount) * 100).toFixed(1);
      return (
        <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-lg border border-slate-800">
          <div className="font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.payload.color }} />
            <span>{item.name}: {item.value} trips</span>
          </div>
          <span className="text-slate-400 text-[11px] block mt-0.5">{percent}% of total activity</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              innerRadius={68}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              stroke="transparent"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-slate-900">{totalCount}</span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Trips
          </span>
        </div>
      </div>

      {/* Modern Status Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}</span>
            <span className="text-slate-400 font-bold">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicPieChart;
