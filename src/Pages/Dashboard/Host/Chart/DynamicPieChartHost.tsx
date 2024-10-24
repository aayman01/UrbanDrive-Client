import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { ClipLoader } from "react-spinners"; // Importing a spinner
import useAuth from "../../../../Hooks/useAuth";

interface BookingData {
    _id: string;
    hostIsApproved: string;
}

const DynamicPieChartHost: React.FC = () => {
    const [piChartData, setPiChartData] = useState<(string | number)[][]>([
        ["Status", "Count"],
        ["Success", 0],
        ["Pending", 0],
        ["Cancel", 0],
    ]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth()

    const options = {
        title: "Booking Approval Status",
        colors: ["#4CAF50", "#FFEB3B", "#F44336"],
        pieSliceText: 'label',
        legend: { position: 'top' },
    };

    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axiosPublic.get<BookingData[]>(`/hostHistory/${user?.email}`);
                const bookingData = response.data;
                // Ensure there are bookings to process
            if (bookingData.length === 0) {
                setError("No booking data available.!!!. so pi chart is not available...");
                setLoading(false);
                return;
            }
                const statusCounts = bookingData.reduce(
                    (acc, booking) => {
                        const status = booking.hostIsApproved;
                        if (status === "success") acc.success += 1;
                        else if (status === "pending") acc.pending += 1;
                        else if (status === "cancel") acc.cancel += 1;
                        return acc;
                    },
                    { success: 0, pending: 0, cancel: 0 }
                );

                const updatedData: (string | number)[][] = [
                    ["Status", "Count"],
                    ["Success", statusCounts.success],
                    ["Pending", statusCounts.pending],
                    ["Cancel", statusCounts.cancel],
                ];

                setPiChartData(updatedData);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError("Error fetching booking data: " + error.message);
                } else {
                    setError("An unknown error occurred.");
                }
                console.error("Error fetching booking data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [axiosPublic]);

    if (loading) return <ClipLoader size={50} color="#36D7B7" />; // Use a spinner for loading
    if (error) return <div className="text-red-400">{error}</div>;

    return (
        <div>
            <Chart
                chartType="PieChart"
                data={piChartData}
                width={"100%"}
                height={"400px"}
                options={options}
            />
        </div>
    );
};

export default DynamicPieChartHost;
