import React, { useState } from 'react';
import { MdOutlineDiscount, MdOutlineStar } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FaAward, FaMapLocationDot } from 'react-icons/fa6';
interface CarsDataProps {
    cars:Car[]; 
  }
const CarsData: React.FC<CarsDataProps> = ({cars}) => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();
    const [favoriteCars, setFavoriteCars] = useState<string[]>([]);
    // console.log('carsdata:',cars)
    
    interface Car {
        _id: string;
        name: string;
        image: string;
        review: string;
        availability: boolean;
        model: string;
        category: string;
        price: number;
        date: number;
        description: string;
        discount: number;
        rating: number;
        trip_count: number;
        make: string;
        seatCount: number;
      }
    const removeFromFavoriteCars = async (carId: string) => {
        try {
          // console.log('গাড়ির ID মুছতে:', carId);
          await axiosPublic.delete(`/favoritesCars/${carId}`);
          setFavoriteCars(favoriteCars.filter(id => id !== carId)); 
          toast.success('Removed from favorites!');
          // console.log('Removed from favorites:', carId);
        } catch (error) {
            console.error('Error removing from favorites:', error);
            toast.error('Failed to remove from favorites.');
          }
      };
      const addToFavoriteCars = async (car: Car) => {
        try {
          const response = await axiosPublic.post('/favoritesCars', {
            ...car,
            email: user?.email
          });
          setFavoriteCars([...favoriteCars, car._id]); 
          toast.success('Added to favorites!');
          console.log('Added to favorites:', response.data);
        } catch (error) {
          console.error('Error adding to favorites:', error);
        }
      };
  return (
    <div>
      {Array.isArray(cars) && cars.length > 0 ? (
                <div className="grid mt-5 grid-cols-1  gap-4 lg:gap-6 ">
                  {cars.map((car: Car) => (
                   
                      <div
                        key={car._id}
                        className="card lg:card-side bg-base-100 shadow-xl rounded-2xl group"
                      >
                        <figure className="w-full lg:w-[50%]">
                          <img
                            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                            src={car.image}
                            alt={car.name}
                          />
                        </figure>
                        <div className="card-body w-full lg:w-2/3 flex-1">
                        <div className="flex justify-between">
                        <h2 className="card-title">{car.model}</h2>
                        {favoriteCars.includes(car._id) ? (
  <IoMdHeart 
    onClick={() => removeFromFavoriteCars(car._id)} 
    className="text-xl" 
    style={{ cursor: 'pointer', color: 'black' }} 
  />
) : (
  <IoMdHeartEmpty 
    onClick={() => addToFavoriteCars(car)} 
    className="text-xl" 
    style={{ cursor: 'pointer' }} 
  />
)}

                        </div>
                          
                          <p className="text-ellipsis">
                            {car.description.slice(0, 80)}....
                          </p>
                          {car.rating > 0 ? (
                            <p className="flex gap-1">
                              {car.rating}
                              <MdOutlineStar className="text-[#f0bb0c] mt-1" />{" "}
                              ({car.trip_count} trips){" "}
                              <FaAward className="mt-1 text-primary font-bold" />{" "}
                              <span className="font-bold">All-Star-Host</span>
                            </p>
                          ) : (
                            <p>New listing</p>
                          )}
                          <p className="flex gap-1">
                            <FaMapLocationDot className="mt-1" />
                            {car.make}
                          </p>
                          {car.discount > 0 ? (
                            <span className="flex gap-1 text-[#0f923b] ">
                              <MdOutlineDiscount className="mt-1" /> Discount:{" "}
                              {car.discount}%
                            </span>
                          ) : (
                            <p></p>
                          )}

                          <div className="card-actions gap-2 items-center justify-end mt-2">
                            <span className="text-primary font-bold text-xl">
                              ${car.price}/day
                            </span>
                            <Link to={`/cars/${car._id}`}>
              <button className="bg-blue-700 p-2 rounded-lg text-white ">Details</button>
            </Link>
                          </div>
                        </div>
                      </div>
                    
                  ))}
                </div>
              ) : (
                <p>No cars available</p>
              )}
    </div>
  );
};

export default CarsData;