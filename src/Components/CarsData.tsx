/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { MdOutlineDiscount, MdOutlineStar } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaCar } from "react-icons/fa6";
import { SeatSVG, FuelPumpSVG, VerifiedShieldSVG } from "./Common/SVG/FeatureBadges";

interface CarsDataProps {
  cars: any;
}

const CarsData: React.FC<CarsDataProps> = ({ cars }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [favoriteCars, setFavoriteCars] = useState<string[]>([]);

  interface Car {
    _id: string;
    name: string;
    image: string;
    review: string;
    availability: boolean;
    model: string;
    category: string;
    rental_price_per_day: number;
    date: number;
    description: string;
    discount: number;
    averageRating: number;
    trip_count: number;
    make: string;
    seatCount: number;
    features: string[];
  }

  useEffect(() => {
    const fetchFavoriteCars = async () => {
      if (user?.email) {
        try {
          const response = await axiosPublic.get(`/favoritesCars/${user.email}`);
          const favoriteCarIds = response.data.map((car: Car) => car._id);
          setFavoriteCars(favoriteCarIds);
        } catch (error) {
          console.error("Error fetching favorite cars:", error);
        }
      }
    };

    fetchFavoriteCars();
  }, [user, axiosPublic]);

  const removeFromFavoriteCars = async (carId: string) => {
    try {
      await axiosPublic.delete(`/favoritesCars/${carId}`);
      setFavoriteCars(favoriteCars.filter((id) => id !== carId));
      toast.success("Removed from favorites!");
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast.error("Failed to remove from favorites.");
    }
  };

  const addToFavoriteCars = async (car: Car) => {
    try {
      await axiosPublic.post("/favoritesCars", {
        ...car,
        email: user?.email,
      });
      setFavoriteCars([...favoriteCars, car._id]);
      toast.success("Added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div>
      {Array.isArray(cars) && cars.length > 0 ? (
        <div className="grid mt-6 grid-cols-1 gap-6">
          {cars.map((car: Car) => {
            const isFav = favoriteCars.includes(car._id);
            return (
              <div
                key={car._id}
                className="group rounded-3xl glass-card overflow-hidden border border-white/60 shadow-glass hover:shadow-glass-lg transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image showcase */}
                  <figure className="w-full lg:w-2/5 h-56 lg:h-auto overflow-hidden relative flex-shrink-0">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={car.image}
                      alt={car.name || car.model}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />

                    {/* Discount badge in SVG glass */}
                    {car.discount > 0 && (
                      <div className="absolute top-3 left-3 glass-dock bg-amber-500/90 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm border border-amber-300">
                        <MdOutlineDiscount className="text-base" />
                        <span>{car.discount}% OFF</span>
                      </div>
                    )}

                    {/* Category pill */}
                    <div className="absolute bottom-3 left-3 glass-dock bg-slate-900/80 text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-white/20">
                      {car.category}
                    </div>
                  </figure>

                  {/* Car Details */}
                  <div className="w-full lg:w-3/5 p-5 sm:p-7 flex flex-col justify-between">
                    <div>
                      {/* Title & Favorite */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                            <span>{car.make}</span>
                            <span>•</span>
                            <span>{car.category}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                            {car.model}
                          </h3>
                        </div>

                        <button
                          onClick={() => (isFav ? removeFromFavoriteCars(car._id) : addToFavoriteCars(car))}
                          className="p-2 rounded-full glass-pill hover:bg-rose-50 transition-colors"
                          aria-label={isFav ? "Remove favorite" : "Add to favorites"}
                        >
                          {isFav ? (
                            <IoMdHeart className="text-2xl text-rose-500 transition-transform duration-200 scale-110" />
                          ) : (
                            <IoMdHeartEmpty className="text-2xl text-slate-400 hover:text-rose-500 transition-colors" />
                          )}
                        </button>
                      </div>

                      {/* Rating & Fast Stats */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 mt-2">
                        <div className="flex items-center gap-1 glass-pill px-2.5 py-1 rounded-lg">
                          <MdOutlineStar className="text-amber-500 text-sm" />
                          <span>{car.averageRating > 0 ? car.averageRating.toFixed(1) : "5.0"}</span>
                          <span className="text-slate-400">({car.trip_count || 12} trips)</span>
                        </div>

                        <div className="flex items-center gap-1 text-slate-500">
                          <SeatSVG className="w-4 h-4 text-slate-400" />
                          <span>{car.seatCount || 5} Seats</span>
                        </div>

                        <div className="flex items-center gap-1 text-slate-500">
                          <FuelPumpSVG className="w-4 h-4 text-slate-400" />
                          <span>Petrol / Hybrid</span>
                        </div>

                        {car.averageRating > 0 && (
                          <div className="flex items-center gap-1 text-teal-600">
                            <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
                            <span>Verified Host</span>
                          </div>
                        )}
                      </div>

                      {/* Feature pills */}
                      {car.features && car.features.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {car.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">Rental Rate</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-bold text-slate-500">BDT</span>
                          <span className="text-2xl font-black text-slate-900">
                            {car?.rental_price_per_day}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">/ day</span>
                        </div>
                      </div>

                      <Link to={`/cars/${car._id}`}>
                        <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                          View Details →
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl glass-card border border-white/60 mt-6">
          <FaCar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-800">No matching vehicles found</h4>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
};

export default CarsData;
