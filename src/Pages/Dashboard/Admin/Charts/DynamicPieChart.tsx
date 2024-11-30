import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { ClipLoader } from "react-spinners"; // Importing a spinner

interface BookingData {
    _id: string;
    hostIsApproved: string;
}

const DynamicPieChart: React.FC = () => {
    const [piChartData, setPiChartData] = useState<(string | number)[][]>([
      ["Status", "Count"],
      ["Accepted", 0],
      ["pending", 0],
      ["Canceled", 0],
    ]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const axiosPublic = useAxiosPublic();

    const options = {
        title: "Booking Approval Status",
        colors: ["#4CAF50", "#36D7B7", "#F44336"],
        pieSliceText: 'label',
        legend: { position: 'top' },
    };

    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axiosPublic.get<BookingData[]>("/bookings-data");
                const bookingData = response.data;
                if (bookingData.length === 0) {
                    setError("No booking data available.!!!. so pi chart is not available...");
                    setLoading(false);
                    return;
                }
                const statusCounts = bookingData.reduce(
                    (acc, booking) => {
                        const status = booking.hostIsApproved;
                        if (status === "Accepted") acc.success += 1;
                        else if (status === "pending") acc.pending += 1;
                        else if (status === "canceled") acc.cancel += 1;
                        return acc;
                    },
                    { success: 0, pending: 0, cancel: 0 }
                );

                const updatedData: (string | number)[][] = [
                  ["Status", "Count"],
                  ["Accepted", statusCounts.success],
                  ["Pending", statusCounts.pending],
                  ["Canceled", statusCounts.cancel],
                ];

                setPiChartData(updatedData);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError("Error fetching booking data: " + error.message);
                } else {
                    setError("An unknown error occurred.");
                }
                // console.error("Error fetching booking data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [axiosPublic]);

    if (loading) return <ClipLoader size={50} color="#36D7B7" />; // Use a spinner for loading
    if (error) return <div>{error}</div>;

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

export default DynamicPieChart;
