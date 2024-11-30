import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { SyncLoader } from "react-spinners";

interface PaymentData {
  _id: string;
  name: string;
  planName: string;
  date: string;
  purchaseDate: string;
  expiryDate: string;
  amount: number;
  cus_name: string,
  status: string
}

const ManageMemberShip = () => {
  const axiosPublic = useAxiosPublic();
  const { data: memberShip = [], isLoading } = useQuery({
    queryKey: ["all-membership"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/memberships-data`);
      return res.data;
    },
  });
  // console.log(memberShip);
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
  return (
    <div className="bg-background text-text font-poppins">
      <div className="mt-4">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Manage Membership
        </h2>
      </div>
      {memberShip.length === 0 ? (
        <div className="h-screen-minus-20px flex items-center justify-center">
          <h2 className="text-3xl font-bold">
            Any Membership purchased yet...
          </h2>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-3 text-[#003366]">#</th>
                  <th className="pb-3 text-[#003366]">Name</th>
                  <th className="pb-3 text-[#003366]">Membership plan</th>
                  <th className="pb-3 text-[#003366]">Purchased Date</th>
                  <th className="pb-3 text-[#003366]">Expiry Date</th>
                  <th className="pb-3 text-[#003366]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberShip.map(
                  (item: PaymentData, idx: number) =>
                    item.status === "Success" && (
                      <tr
                        key={item._id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4">{idx + 1}</td>
                        <td className="py-4">{item?.cus_name || "Roksana"}</td>
                        <td className="py-4">{item?.planName}</td>
                        <td className="py-4">
                          {formatDate(item?.purchaseDate)}
                        </td>
                        <td className="py-4">{formatDate(item?.expiryDate)}</td>
                        <td className="py-4 font-bold">{item?.amount} ৳</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMemberShip;
