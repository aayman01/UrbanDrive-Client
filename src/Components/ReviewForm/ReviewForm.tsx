/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Rating, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { Toaster, toast } from 'react-hot-toast';

interface ReviewFormProps {
  carId: string;
  onReviewSubmitted: () => void;
}

interface RatingCategory {
  name: string;
  label: string;
  value: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ carId, onReviewSubmitted }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [hasReviewed, setHasReviewed] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  // Initialize rating categories
  const [ratingCategories, setRatingCategories] = useState<RatingCategory[]>([
    { name: 'Cleanliness', label: 'Cleanliness', value: 0 },
    {name: 'Comfort', label: 'Comfort', value: 0},
    { name: 'Communication', label: 'Communication', value: 0 },
    { name: 'Convenience', label: 'Convenience', value: 0 }
  ]);

  const calculateAverageRating = (): number => {
    const sum = ratingCategories.reduce((acc, category) => acc + category.value, 0);
    return sum / ratingCategories.length;
  };

  const handleRatingChange = (categoryName: string, newValue: number) => {
    setRatingCategories(prevCategories =>
      prevCategories.map(category =>
        category.name === categoryName ? { ...category, value: newValue } : category
      )
    );
  };
// Adnan Note: This is to check if the user has already reviewed the car
  // useEffect(() => {
  //   const checkUserReview = async () => {
  //     try {
  //       const response = await axiosPublic.get(`/reviews/${carId}`);
  //       const userReview = response.data.reviews.find((review: any) => review.userId === user?.uid);
  //       if (userReview) {
  //         setHasReviewed(true); 
  //       }
  //     } catch (error) {
  //       console.error('Error checking user review:', error);
  //     }
  //   };

  //   if (user) {
  //     checkUserReview();
  //   }
  // }, [carId, user, axiosPublic]);

  const onSubmit = async (data: any) => {
    if (ratingCategories.some(category => category.value === 0)) {
      toast.error('Please provide ratings for all categories');
      return;
    }
  
    const averageRating = calculateAverageRating();
    const ratingDetails = ratingCategories.reduce((acc, category) => ({
      ...acc,
      [category.name]: category.value
    }), {});
  
    const reviewData = {
      userEmail: user?.email,
      carId,
      userId: user?.uid,
      userName: user?.displayName,
      rating: averageRating,
      ratingDetails,
      comment: data.comment,
      createdAt: new Date(),
    };
  
    try {
      await axiosPublic.post('/reviews', reviewData);
      reset();
      setRatingCategories(categories => 
        categories.map(category => ({ ...category, value: 0 }))
      );
      onReviewSubmitted();
      toast.success('Review submitted successfully!');
      setHasReviewed(true);
  
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    }
  };
  

  if (hasReviewed) {
    return (
      <div className="mt-8 bg-gray-100 p-8 rounded-lg shadow-md text-center w-full">
        <h3 className="text-3xl font-bold mb-4">Thank you for your review!</h3>
        <p className="text-gray-700 text-lg">You have already reviewed this car.</p>
      </div>
    );
  }

  
  const customStarStyle = {
    itemShapes: Star,
    activeFillColor: '#FF9933', 
    inactiveFillColor: '#CBD5E1' 
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 bg-white p-8 rounded-lg shadow-md w-full">
        <h3 className="text-4xl font-bold mb-6 text-primary">Share Your Detailed Experience</h3>
        
        
        <div className="flex flex-wrap justify-center mb-12">
          {ratingCategories.map((category) => (
            <div key={category.name} className="w-full md:w-1/2 xl:w-1/4 p-6 text-center">
              <h4 className="text-2xl font-bold mb-2 text-text">{category.label}</h4>
              <Rating
                style={{ maxWidth: 200 }}
                value={category.value}
                onChange={(value: number) => handleRatingChange(category.name, value)}
                itemStyles={customStarStyle}
              />
              <p className="text-gray-500 text-sm mt-2">Rate your experience with {category.label}</p>
            </div>
          ))}
        </div>

       
        <div className="mb-12 text-center">
          <h4 className="text-2xl font-bold mb-2 text-text">Your Overall Rating</h4>
          <p className="text-5xl font-bold text-primary">{calculateAverageRating().toFixed(1)} / 5</p>
          <p className="text-gray-500 text-sm mt-2">Based on your ratings above</p>
        </div>

        
        <div className="mb-8">
          <h4 className="text-2xl font-bold mb-2 text-text">Your Detailed Review</h4>
          <textarea
            {...register('comment', { required: 'Review comment is required' })}
            className="w-full p-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Please share your detailed thoughts, likes, dislikes, and suggestions..."
            rows={8}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm italic mt-2">{errors.comment.message as string}</p>
          )}
          <p className="text-gray-500 text-sm mt-2">Your feedback is invaluable to us. Thank you for taking the time!</p>
        </div>

        <button 
          type="submit" 
          className="bg-primary text-white py-3 px-6 rounded hover:bg-primary/90 transition duration-300 w-full text-lg font-bold"
        >
          Submit Your Comprehensive Review
        </button>
      </form>
    </>
  );
};

export default ReviewForm;
