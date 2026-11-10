/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaGasPump, FaChair, FaGear, FaCarRear } from "react-icons/fa6";
import { SyncLoader } from "react-spinners";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AmbientGlow from "../Common/SVG/AmbientGlow";

interface Car {
  _id: string;
  name: string;
  image: string;
  rental_price_per_day?: number;
  price?: number;
  model: string;
  category: string;
  description: string;
  discount?: number;
  averageRating?: number;
  trip_count?: number;
  make?: string;
  seatCount?: number;
  features?: string[];
  availability?: boolean;
  fuelType?: string;
  transmission?: string;
}

const Favorite: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();

  const {
    data: favoriteCars = [],
    isLoading,
  } = useQuery({
    queryKey: ["favoriteCars", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const response = await axiosPublic.get(`/favoritesCars/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
    staleTime: 10000,
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <SyncLoader color="#0D9488" size={14} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden font-poppins">
      <AmbientGlow />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
            <FaHeart className="w-3.5 h-3.5 text-rose-500" />
            <span>Saved Wishlist</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Favorite Vehicles
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Cars you've saved for your upcoming road trips and premium experiences
          </p>
        </div>

        {favoriteCars.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <FaHeart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your Wishlist is Empty</h2>
            <p className="text-sm text-slate-500 mt-1 mb-6">
              Tap the heart icon on any vehicle in our fleet to bookmark it here for fast booking.
            </p>
            <Link
              to="/cars"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
            >
              Explore Vehicles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCars.map((car: Car) => {
              const dailyRate = car.price || car.rental_price_per_day || 0;
              return (
                <div
                  key={car._id}
                  className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={car.image}
                        alt={car.name || car.model}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Category Pill */}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[11px] font-bold text-white border border-white/10 uppercase tracking-wider">
                        {car.category || "Premium"}
                      </span>

                      {/* Saved Pill */}
                      <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-rose-500 shadow-sm">
                        <FaHeart className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1">
                            {car.model || car.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">{car.make || "UrbanDrive Verified"}</p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold flex-shrink-0">
                          <FaStar className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>{car.averageRating ? car.averageRating.toFixed(1) : "5.0"}</span>
                        </div>
                      </div>

                      {/* Quick Specs */}
                      <div className="grid grid-cols-3 gap-2 py-3 mt-4 border-y border-slate-100 text-xs text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5 justify-center">
                          <FaChair className="w-3.5 h-3.5 text-slate-400" />
                          <span>{car.seatCount || 5} Seats</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center border-x border-slate-100">
                          <FaGasPump className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{car.fuelType || "Hybrid"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center">
                          <FaGear className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{car.transmission || "Auto"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar: Price & Action */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-slate-400 block">Daily Rate</span>
                      <div className="text-lg font-black text-slate-900">
                        ৳{dailyRate.toLocaleString()}
                        <span className="text-xs font-normal text-slate-500">/day</span>
                      </div>
                    </div>

                    <Link
                      to={`/cars/${car._id}`}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm inline-flex items-center gap-1.5"
                    >
                      <FaCarRear className="w-3 h-3" />
                      <span>Rent Now</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorite;
