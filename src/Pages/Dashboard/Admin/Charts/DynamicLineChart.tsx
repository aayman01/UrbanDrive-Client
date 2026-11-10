import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { ClipLoader } from 'react-spinners';

interface BookingData {
  startDate: string;
  amount: number;
}

const DynamicLineChart: React.FC = () => {
  const [data, setData] = useState<{ date: string; displayDate: string; price: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosPublic.get('/bookings-data');
        const bookings: BookingData[] = response.data;
        if (!bookings || bookings.length === 0) {
          setError("No booking transaction records available.");
          setLoading(false);
          return;
        }

        const bookingMap: { [key: string]: { timestamp: number; price: number; displayDate: string } } = {};

        bookings.forEach((item) => {
          if (!item.startDate) return;
          const date = new Date(item.startDate);
          const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          const displayDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          const amt = item.amount || 0;

          if (!bookingMap[key]) {
            bookingMap[key] = {
              timestamp: date.getTime(),
              price: amt,
              displayDate,
            };
          } else {
            bookingMap[key].price += amt;
          }
        });

        const chartData = Object.entries(bookingMap).map(([key, val]) => ({
          date: key,
          displayDate: val.displayDate,
          price: val.price,
          timestamp: val.timestamp,
        }));

        chartData.sort((a, b) => a.timestamp - b.timestamp);

        setData(chartData);
      } catch (err: unknown) {
        console.error('Error fetching revenue data:', err);
        setError("Unable to retrieve revenue timeline.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  // Custom modern luxury tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl text-xs shadow-xl border border-slate-800">
          <div className="text-slate-400 text-[11px] font-semibold">{item.payload.displayDate}</div>
          <div className="text-sm font-extrabold text-teal-400 mt-0.5">
            ৳{item.value.toLocaleString()} BDT
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0D9488" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis
            dataKey="displayDate"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
            tickFormatter={(val) => (val >= 1000 ? `৳${(val / 1000).toFixed(0)}k` : `৳${val}`)}
            dx={-4}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#0D9488"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#revenueGrad)"
            activeDot={{ r: 6, fill: "#0D9488", stroke: "#FFFFFF", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicLineChart;
