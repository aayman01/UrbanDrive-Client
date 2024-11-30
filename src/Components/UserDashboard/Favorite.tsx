/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
// import { IoMdHeart, } from "react-icons/io";
import { FaAward, FaCar, FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineDiscount, MdOutlineStar } from "react-icons/md";
import { SyncLoader } from "react-spinners";
import Navbar from "../Navbar";
// import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
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
  averageRating: number;
  trip_count: number;
  make: string;
  seatCount: number;
  features: string[];
}
const Favorite: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();
  

  const {
    data: favoriteCars = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["favoriteCars"],
    queryFn: async () => {
      const response = await axiosPublic.get(`/favoritesCars/${user?.email}`);
      return response.data;
    },
    staleTime: 10000,
  });
  // console.log('favoritecar:',favoriteCars)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={10} /> {/* লোডিং স্পিনার */}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={10} />
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={10} />
      </div>
    ); // Optionally, handle the updating state separately
  }



  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold font-lato lg:mt-12 lg:mb-10 lg:ml-2">
          Favorites Cars
        </h2>
        {favoriteCars.length > 0 ? (
          <div className="grid mt-5 grid-cols-1 gap-4 lg:gap-6">
            {/* If there's only one favorite car */}
            {favoriteCars.length === 1 ? (
              <div
                key={favoriteCars[0]._id}
                className="card w-[500px] h-[300px] lg:card-side bg-base-100 shadow-xl rounded-2xl group"
              >
                <figure className="w-full lg:w-[50%]">
                  <img
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    src={favoriteCars[0].image}
                    alt={favoriteCars[0].name}
                  />
                </figure>
                <div className="card-body w-full lg:w-2/3 flex-1">
                  <div className="flex justify-between">
                    <h2 className="card-title">{favoriteCars[0].model}</h2>
                  </div>
                  <p className="text-ellipsis">
                    {favoriteCars[0].description.slice(0, 80)}....
                  </p>
                  {favoriteCars.rating > 0 ? (
                    <p className="flex gap-1">
                      {favoriteCars.rating}
                      <MdOutlineStar className="text-[#f0bb0c] mt-1" /> (
                      {favoriteCars.trip_count} trips){" "}
                      <FaAward className="mt-1 text-primary font-bold" />{" "}
                      <span className="font-bold">All-Star-Host</span>
                    </p>
                  ) : (
                    <p>New listing</p>
                  )}
                  <p className="flex gap-1">
                    <FaMapLocationDot className="mt-1" />
                    {favoriteCars.make}
                  </p>
                  {favoriteCars.discount > 0 ? (
                    <span className="flex gap-1 text-[#0f923b] ">
                      <MdOutlineDiscount className="mt-1" /> Discount:{" "}
                      {favoriteCars.discount}%
                    </span>
                  ) : (
                    <p></p>
                  )}
                  <div className="card-actions gap-2 items-center justify-end mt-2">
                    <span className="text-primary font-bold text-xl">
                      ${favoriteCars[0].rental_price_per_day}/day
                    </span>
                    <Link to={`/cars/${favoriteCars[0]._id}`}>
                      <button className="bg-blue-700 p-2 rounded-lg text-white">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              // If there are multiple favorite cars
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {favoriteCars.map((car: Car) => (
                  <div
                    key={car._id}
                    className="bg-background shadow-md rounded-2xl overflow-hidden group transition-shadow duration-300 hover:shadow-2xl"
                  >
                    <div className="flex flex-col lg:flex-row">
                      <figure className="w-full lg:w-1/3 h-48 lg:h-auto overflow-hidden relative">
                        <img
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          src={car.image}
                          alt={car.name}
                        />
                        {car.discount > 0 && (
                          <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <MdOutlineDiscount className="text-lg" />
                            {car.discount}% OFF
                          </div>
                        )}
                      </figure>
                      <div className="w-full lg:w-2/3 p-4 lg:p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-bold text-primary">
                              {car.model} ({car.category})
                            </h2>
                          </div>

                          <div className="flex items-center justify-between mt-2 text-sm text-text">
                            <p className="flex items-center gap-1">
                              {car.averageRating > 0 ? (
                                <>
                                  {car.averageRating}
                                  <MdOutlineStar className="text-accent" />(
                                  {car.trip_count} trips)
                                </>
                              ) : (
                                "New listing"
                              )}
                            </p>
                            <p className="flex items-center gap-1">
                              <FaCar className="text-secondary" />
                              {car.make}
                            </p>
                          </div>

                          <div className="overflow-hidden transition-all duration-300 ease-in-out  group-hover:opacity-100">
                            <div className="mt-3 space-y-2 text-sm text-text">
                              <div className="flex flex-wrap gap-2">
                                {car.features
                                  .slice(0, 3)
                                  .map((feature: any, index: any) => (
                                    <span
                                      key={index}
                                      className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-xs"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                              </div>
                              {car.availability ? (
                                <p className="text-secondary">Available Now</p>
                              ) : (
                                <p className="text-accent">
                                  Currently Unavailable
                                </p>
                              )}
                              {car.averageRating > 0 && (
                                <p className="flex gap-1 items-center">
                                  <FaAward className="text-secondary" />
                                  <span className="font-bold">
                                    All-Star Host
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-primary font-bold text-lg">
                            <span className="text-[18px] font-bold mr-2">
                              BDT
                            </span>
                            {car.price}/day
                          </span>
                          <Link to={`/cars/${car._id}`}>
                            <button className="bg-secondary text-white text-sm px-4 py-3 font-bold drop-shadow-md rounded-lg transition-transform duration-300 hover:scale-105">
                              Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p>No cars available</p> // If no favorite cars
        )}
      </div>
    </div>
  );
};

export default Favorite;