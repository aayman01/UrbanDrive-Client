import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useParams } from "react-router-dom";

const MembershipDuration: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { planName, price } = useParams<{ planName: string; price: string }>();
  const [duration, setDuration] = useState<number>(1);
  const parsedPrice = price ? parseFloat(price) : NaN;

  const calculatedPrice = parsedPrice * duration;

  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(Number(event.target.value));
  };

  const paymentInfo = {
    price: calculatedPrice,
    currency: "BDT",
    email: user?.email,
    name: user?.displayName,
    planName: planName,
    purchaseDate: new Date(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  };

  const handleSubmitPayment = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosPublic.post("/create-payment", paymentInfo);
      const redirectUrl = data.paymentUrl;
      if (redirectUrl) {
        window.location.replace(redirectUrl);
      }
    } catch (error: any) {
      console.error("Error posting payment info:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" ">
      <div className=" lg:mt-16 lg:p-16 mx-auto  bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        {planName} - Select the Duration for Your Membership
      </h1>
      <p className="text-gray-600 mb-4">
        Choose a duration that best fits your needs and enjoy exclusive benefits!
      </p>

      <label className="block mb-4 text-lg font-bold text-gray-700">
        How many months do you want to buy?
      </label>
      <select
        value={duration}
        onChange={handleDurationChange}
        className="block w-2/3 p-2 border  border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        <option value={1}>1 Month</option>
        <option value={3}>3 Months</option>
        <option value={6}>6 Months</option>
        <option value={12}>1 Year</option>
      </select>

      <p className="text-xl font-bold text-gray-700">
        Total Price: <span className="text-xl mr-2">BDT</span>
        {calculatedPrice.toFixed(2)}
      </p>

      <p className="text-sm text-gray-500 mb-4">
        *Payment will be processed securely. A confirmation email will be sent upon successful payment.
      </p>

      <button
        onClick={handleSubmitPayment}
        className={`w-2/3 bg-secondary hover:bg-[#27998c] text-white font-bold py-2 px-4 rounded mt-4 ${
          isLoading ? " cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <ImSpinner9 size={28} className="animate-spin m-auto text-white" />
        ) : (
          "Proceed to Payment"
        )}
      </button>

    </div>

    </div>
    
  );
};

export default MembershipDuration;
