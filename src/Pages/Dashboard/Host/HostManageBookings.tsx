import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { SyncLoader } from "react-spinners";
import useAuth from "../../../Hooks/useAuth";

interface bookings {
  _id: string;
  cus_name: string;
  cus_phoneNumber: string;
  startDate: string;
  endDate: string;
  location: string;
  amount: number;
  status: string;
  hostIsApproved : string;
}

const HostManageBookings = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const { data: myHistory = [],isLoading,refetch } = useQuery({
    queryKey: ["myHistory"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/hostHistory/${user?.email}`);
      return res.data;
    },
  });
//   console.log(allBookings);
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

  const handleAccept = (id : string) => {
    axiosPublic.patch(`/updateApStatus/${id}`, { hostIsApproved : "Accepted"})
    .then(res => {
      if(res.data.modifiedCount > 0){
        refetch();
      }
    })
  }
  const handleCancel = (id : string) => {
    axiosPublic
      .patch(`/updateApStatus/${id}`, { hostIsApproved: "canceled" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
        }
      });
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }
  return (
    <div>
      <div>
        <div className="mt-4">
          <h2 className="text-3xl font-bold mb-6 text-center underline">
            All Bookings
          </h2>
        </div>
        {myHistory.length === 0 ? (
          <div className="h-screen-minus-20px flex items-center justify-center">
            <h2 className="text-3xl font-bold">
              Any Bookings haven't done yet...
            </h2>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded mt-16">
            <table className="table font-medium">
              <thead className="bg-primary text-white">
                <tr className="text-base">
                  <th>#</th>
                  <th>User</th>
                  <th>Location</th>
                  <th>Phone Number</th>
                  {/* <th>Start Date</th>
                  <th>End Date</th> */}
                  <th>Cost</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {myHistory.map(
                  (item: bookings, idx: number) =>
                    item.status === "Success" && (
                      <tr key={item._id}>
                        <th>{idx + 1}</th>
                        <td>{item?.cus_name}</td>
                        {/* <td>{item?.location}</td> */}
                        <td>{item?.location}</td>
                        <td>{item?.cus_phoneNumber}</td>
                        {/* <td>{formatDate(item?.startDate)}</td>
                        <td>{formatDate(item?.endDate)}</td> */}
                        <td className="font-bold">{item?.amount}৳</td>
                        <td className="text-center">
                          {item?.hostIsApproved === "Accepted" ? (
                            <span className="text-green-600 font-semibold">
                              Accepted
                            </span>
                          ) : item?.hostIsApproved === "canceled" ? (
                            <span className="text-red-600 font-semibold">
                              Canceled
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() => handleAccept(item._id)}
                                className="btn btn-success mr-6 text-white"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleCancel(item._id)}
                                className="btn btn-error text-white"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostManageBookings;
