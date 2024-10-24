import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useAuth from '../../../../Hooks/useAuth';

interface BookingData {
    startDate: string;
    amount: number;
}

const DynamicLineChartHost: React.FC = () => {
    const [data, setData] = useState<{ date: string; price: number }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth()

    const fetchData = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const response = await axiosPublic.get(`/hostHistory/${user?.email}`);
            const bookings: BookingData[] = response.data;

            // Ensure there are bookings to process
            if (bookings.length === 0) {
                setError("No booking data available.!!!. so line chart is not available...");
                setLoading(false);
                return;
            }

            // Create a map to hold the booking amounts by date
            const bookingMap: { [key: string]: number } = {};

            // Populate the booking map
            bookings.forEach(item => {
                const date = new Date(item.startDate);
                const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // Format to YYYY-MM-DD
                bookingMap[formattedDate] = (bookingMap[formattedDate] || 0) + item.amount; // Accumulate amounts for the same date
            });

            // Generate data array for the chart
            const chartData = Object.entries(bookingMap).map(([date, amount]) => ({
                date,
                price: amount,
            }));

            // Sort data by date
            chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            // Set the chart data
            setData(chartData);
        } catch (error: any) { // Explicitly type error as any
            setError("Error fetching data: " + (error.message || "Unknown error"));
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className='text-red-400'>{error}</div>;
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    isAnimationActive={true}
                    animationDuration={500}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default DynamicLineChartHost;
