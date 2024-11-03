/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import StepIndicator from '../../Components/steps/stepIndicator';
import { steps } from '../../Components/steps/HostSteps';
import { useForm, FormProvider } from 'react-hook-form';
import BasicCarInfo from './steps/BasicCarInfo';
import RentalDetails from './steps/RentalDetails';
import AdditionalInfo from './steps/AdditionalInfo';
import LocationAndPickupInfo from './steps/LocationAndPickupInfo';
import HostInformation from './steps/HostInformation';
import Membership from './steps/Membership';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { imageUpload } from '../../utils/ImageUpload';


interface FormData {
  _id?: string;
  category: string;
  make: string;
  model: string;
  year: number;
  
  availability: boolean;
  features: string[];
  rental_duration: string;
  price: number;
  discount: number;
  city: string;
  pickup_point: string;
  opening_hours: string;
  membership: string;
  name: string;
  email: string;
  date?: string;
  rating?: number;
  review?: string;
  rental_price_per_day?: number;
  total_price?: number;
  plan_type: string;
  description: string;
  booking_id?: string;
  customer_id?: string;
  image: string;
  seatCount: number;
  trip_count?: number;
  location?: {
    type: string;
    coordinates: number[];
  };
  driver: string;
  home_pickup: string;
  
  averageRating?: number;
  categoryRatings?: {
    Cleanliness: number;
    Communication: number;
    Comfort: number;
    Convenience: number;
  };
  reviewCount?: number;
  carImage?: FileList; // For file upload handling
}

const HostingCarForm: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<FormData>();
  const { trigger, handleSubmit } = methods;

  const onSubmit = async (formData: any) => {
    try {
      const transformedData: FormData = {
        category: formData.basicCarInfo.category,
        make: formData.basicCarInfo.make,
        model: formData.basicCarInfo.model,
        year: Number(formData.basicCarInfo.year),
        rental_price_per_day: Number(formData.rentalDetails.price_per_day),
        availability: true,
        features: formData.basicCarInfo.features || [],
        rental_duration: formData.rentalDetails.duration,
        price: Number(formData.rentalDetails.price_per_day || 0),
        discount: Number(formData.rentalDetails.discount) || 0,
        city: formData.locationAndPickupInfo.city,
        pickup_point: formData.locationAndPickupInfo.pickupPoint,
        opening_hours: `${formData.locationAndPickupInfo.openingHours.start} - ${formData.locationAndPickupInfo.openingHours.end}`,
        membership: formData.membership || 'Standard',
        name: formData.host.name,
        email: formData.host.email,
        plan_type: formData.plan_type || 'Basic_Coverage',
        description: formData.additionalInfo.description || '',
        image: '', // Will be updated after image upload
        seatCount: Number(formData.basicCarInfo.seatCount),
        driver: formData.basicCarInfo.driver || 'No',
        home_pickup: formData.basicCarInfo.homePickup || 'No',
        
        // Default values for optional fields
        rating: 0,
        averageRating: 0,
        reviewCount: 0,
        trip_count: 0,
        location: {
          type: "Point",
          coordinates: [
            formData.locationAndPickupInfo.coordinates?.lng ,
            formData.locationAndPickupInfo.coordinates?.lat
          ]
        },
        categoryRatings: {
          Cleanliness: 0,
          Communication: 0,
          Comfort: 0,
          Convenience: 0
        }
      };

      console.log('Form data before transform:', formData); // Debug log
      console.log('Transformed data:', transformedData); // Debug log

      // Handle image upload
      if (formData.carImage?.[0]) {
        const imageUrl = await imageUpload(formData.carImage[0]);
        transformedData.image = imageUrl;
      }

      const response = await axiosPublic.post('/hostCar', transformedData);
      console.log('Car hosted successfully:', response.data);
      Swal.fire({
        title: 'Car Hosted Successfully',
        text: 'Your car has been successfully hosted.',
        icon: 'success',
        confirmButtonText: 'Home'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/';
        }
      });
    } catch (error) {
      console.error('Error hosting car:', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an error hosting your car. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleNext = async () => {
    let isValid = true;

    switch (currentStep) {
      case 0:
        isValid = await trigger(['make', 'model', 'year']);
        break;
      case 1:
        isValid = await trigger(['price', 'availability']);
        break;
      case 2:
        isValid = await trigger(['city', 'pickup_point', 'opening_hours']);
        break;
      case 5:
        isValid = await trigger(['description']);
        break;
      default:
        break;
    }

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicCarInfo />;
      case 1:
        return <RentalDetails />;
      case 2:
        return <LocationAndPickupInfo />;
      case 3:
        return <HostInformation />;
      case 4:
        return <Membership/>;
      case 5:
        return <AdditionalInfo />;
      default:
        return <p className="text-gray-500">Step not implemented yet</p>;
    }
  };

  return (
    <div className="max-w-6xl my-28 mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-5xl font-bold mb-6 font-Playfair text-center underline decoration-primary decoration-2 text-primary">Host Your Car</h1>
      
      <div className="flex flex-col lg:flex-row justify-between ">
        <div className="w-full lg:w-1/3 lg:pr-6 lg:border-r">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
        <div className="w-full lg:w-2/3 lg:pl-6 mt-8 lg:mt-0 ">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              {renderStepContent()}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 transition-all duration-300 ease-in-out"
                >
                  <span className="mr-2">←</span> Previous
                </button>
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out"
                  >
                    Next <span className="ml-2">→</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
    
  );
};

export default HostingCarForm;



