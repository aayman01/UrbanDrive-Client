/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StepIndicator from './steps';
import useAuth from '../../Hooks/useAuth';
import EmailVerification from './EmailVerification';
import { steps } from '../../Components/steps/UserSteps';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';
import { imageUpload } from '../../utils/ImageUpload';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { ImSpinner9 } from 'react-icons/im';



type UserInfo = {
  email: string;
  phoneNumber: string;
  driversLicense: File | null;
};

const OnboardCheckout: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: user?.email || '',
    phoneNumber: '',
    driversLicense: null,
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [skipEmailVerification, setSkipEmailVerification] = useState(false);
  const [skipDriversLicense, setSkipDriversLicense] = useState(false);
  const price = 560;
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (user?.email) {
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        email: user.email || '',
      }));
    }

    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/bookings/${bookingId}`);
        setBookingDetails(response.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [user, bookingId]);

  useEffect(() => {
    if (isEmailVerified || skipEmailVerification) {
      setCurrentStep(1);
    }
  }, [isEmailVerified, skipEmailVerification]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: files ? files[0] : (value || ''),
    }));
  };

  const handleNextStep = () => {
    switch (currentStep) {
      case 0:
        if (!isEmailVerified && !skipEmailVerification) {
          toast.error('Please verify your email before proceeding.');
          return;
        }
        break;
      case 1:
        if (!userInfo.phoneNumber) {
          toast.error('Please enter your phone number.');
          return;
        }
        break;
      case 2:
        if (!skipDriversLicense && !userInfo.driversLicense) {
          toast.error('Please upload your driver\'s license or choose to skip.');
          return;
        }
        break;
      default:
        break;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSkipEmailVerification = () => {
    setSkipEmailVerification(true);
    handleNextStep();
  };

  const handleSkipDriversLicense = () => {
    setSkipDriversLicense(true);
    handleNextStep();
  };

  const handleSubmit = async () => {
    try {

      if (!skipDriversLicense && userInfo.driversLicense) {

        const driversLicenseUrl = await imageUpload(userInfo.driversLicense);

        userInfo.driversLicense = driversLicenseUrl;
      }



      const response = await axios.put(`http://localhost:8000/bookings/${bookingId}`, {
        ...userInfo,
        driversLicense: skipDriversLicense ? undefined : userInfo.driversLicense,
      });

      if (response.data.success) {
        Swal.fire({
          title: 'Booking Confirmed!',
          text: 'Your booking has been successfully confirmed.',
          icon: 'success',
          confirmButtonText: 'Go to Payment',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/payment/${price}`);
          }
        });
      } else {
        console.error('Failed to update booking:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

// console.log(bookingDetails);

  const paymentInfo = {
    price: bookingDetails?.totalCost,
    currency: 'BDT',
    email: user?.email || userInfo.email,
    phoneNumber: userInfo?.phoneNumber,
    driversLicense: userInfo?.driversLicense,
    name: user?.displayName,
    bookingDetails: bookingDetails,
    hostEmail : bookingDetails?.hostEmail,
    hostName : bookingDetails?.hostName,
    model : bookingDetails?.model,
    make : bookingDetails?.make,

  }

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      // post request
      const { data } = await axiosPublic.post("/booking-create-payment", paymentInfo);
      const redirectUrl = data.paymentUrl;
      // console.log(redirectUrl);
      if (redirectUrl) {
        window.location.replace(redirectUrl)
      }
    } catch (error: any) {
      console.error("Error posting payment info:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div>
            <EmailVerification email={userInfo.email} onVerified={() => setIsEmailVerified(true)} />
            <button onClick={handleSkipEmailVerification} className="mt-4 text-secondary">Skip Email Verification</button>
          </div>
        );
      case 1:
        return (
          <div>
            <label htmlFor="phoneNumber" className="block font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="text-sm custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-secondary hover:shadow-lg hover:border-secondary bg-background"
              required
            />
          </div>
        );
      case 2:
        return (
          <div>
            <label htmlFor="driversLicense" className="block font-semibold mb-2">Driver's License</label>
            <input
              type="file"
              name="driversLicense"
              onChange={handleChange}
              className="text-sm custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-secondary hover:shadow-lg hover:border-secondary bg-background"
            />
            <button onClick={handleSkipDriversLicense} className="mt-4 text-secondary">Skip Driver's License</button>
          </div>
        );

      case 3:
        return bookingDetails ? (
          <div className="p-6 bg-background rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Review Your Information</h2>
            <div className="space-y-2">
              <p className="text-lg"><span className="font-bold">Start Date:</span> {new Date(bookingDetails.startDate).toLocaleDateString()}</p>
              <p className="text-lg"><span className="font-bold">End Date:</span> {new Date(bookingDetails.endDate).toLocaleDateString()}</p>
              <p className="text-lg"><span className="font-bold">Location:</span> {bookingDetails.location}</p>
              <p className="text-lg"><span className="font-bold">Total Cost:</span> ${bookingDetails.totalCost}</p>
              <p className="text-lg"><span className="font-bold">Phone Number:</span> {userInfo.phoneNumber}</p>
              <p className="text-lg"><span className="font-bold">Driver's License:</span> {skipDriversLicense ? 'Skipped' : userInfo.driversLicense ? 'Uploaded' : 'Not uploaded'}</p>
            </div>
            <div>
              <button onClick={handlePayment} className={`w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-2 px-4 rounded mt-4 ${isLoading ? ' cursor-not-allowed' : ''}`} disabled={isLoading} >
                {
                  isLoading ? <ImSpinner9 size={28} className="animate-spin m-auto text-accent" /> : "Payment Now"
                }
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-text">Loading booking details...</p>
        );
      default:
        return null;
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className='bg-white'>
      <div className="max-w-6xl my-28 mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-5xl font-bold mb-6 font-Playfair text-center underline decoration-primary decoration-2 text-primary">Complete Your Booking</h1>

      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-1/3 lg:pr-6 lg:border-r">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>
          <div className="w-full lg:w-2/3 lg:pl-6 mt-8 lg:mt-0">
            {loading ? (
              <p>Loading booking details...</p>
            ) : (
              <div>{renderStepContent(currentStep)}</div>
            )}
            <div className="mt-8 flex justify-between">
              {currentStep > 0 && (
                <button
                  onClick={handlePreviousStep}
                  className="bg-text text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <span className="mr-2">←</span> Previous
                </button>
              )}
              <button
                onClick={currentStep === steps.length - 1 ? handleSubmit : handleNextStep}
                className='px-6 py-2 rounded-md transition-colors text-white bg-primary hover:bg-secondary cursor-pointer'
              >
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                <span className="ml-2">{currentStep === steps.length - 1 ? '' : '→'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
    </div>
  );
};

export default OnboardCheckout;