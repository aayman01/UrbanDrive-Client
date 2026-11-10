/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import slide1 from '../../assets/slides/slide1.jpg';
import { FaStar } from 'react-icons/fa6';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { addDays, differenceInDays, format } from 'date-fns';
import { DateRange, RangeKeyDict } from 'react-date-range';
import { motion, AnimatePresence } from 'framer-motion';
import { ICar } from '../../Types/car';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { SyncLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';
import { debounce } from 'lodash';
import {
  FuelPumpSVG,
  SeatSVG,
  ElectricBoltSVG,
  TransmissionSVG,
  VerifiedShieldSVG,
  InstantBookingSVG,
} from '../../Components/Common/SVG/FeatureBadges';
import AmbientGlow from '../../Components/Common/SVG/AmbientGlow';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

const CarDetails: React.FC = () => {
  const navigate = useNavigate();
  const car = useLoaderData() as ICar;
  const { user } = useAuth();

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection',
    },
  ]);
  const axiosPublic = useAxiosPublic();
  const [location, setLocation] = useState('Current Location');
  const [showCalendar, setShowCalendar] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [perDayCost, setPerDayCost] = useState(0);
  const [includedDriver, setIncludedDriver] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: reviewsData = { reviews: [], currentPage: 1, totalPages: 1, totalReviews: 0 },
    refetch: refetchReviews,
    isLoading,
  } = useQuery({
    queryKey: ['reviews', car._id, page],
    queryFn: async () => {
      const response = await axiosPublic.get(`/reviews/${car._id}?page=${page}&limit=5`);
      return response.data;
    },
  });

  const handleNextPage = () => {
    if (page < reviewsData.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const calculateTotalCost = (start: Date, end: Date) => {
    const days = differenceInDays(end, start) + 1;
    let cost = days * car.rental_price_per_day;

    if (includedDriver) {
      cost += cost * 0.2;
    }

    return cost;
  };

  useEffect(() => {
    const newTotalCost = calculateTotalCost(dateRange[0].startDate, dateRange[0].endDate);
    setTotalCost(newTotalCost);
    setPerDayCost(includedDriver ? car.rental_price_per_day * 1.2 : car.rental_price_per_day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, includedDriver]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection.startDate && selection.endDate) {
      setDateRange([
        {
          startDate: selection.startDate,
          endDate: selection.endDate,
          key: 'selection',
        },
      ]);
      const newTotalCost = calculateTotalCost(selection.startDate, selection.endDate);
      setTotalCost(newTotalCost);
    }
  };

  const handleContinue = async () => {
    try {
      const bookingData = {
        user_email: user?.email,
        userName: user?.displayName,
        carId: car._id.toString(),
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate,
        location: location,
        totalCost: totalCost,
        includedDriver: includedDriver,
        hostEmail: car?.email,
        hostName: car?.name,
        model: car?.model,
        make: car?.make,
      };

      const response = await axiosPublic.post('http://localhost:8000/bookings', bookingData);

      if (response.data.success && response.data.bookingId) {
        navigate(`/checkout/${response.data.bookingId}`);
      } else {
        console.error('Failed to create booking:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const searchLocations = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&countrycodes=bd&limit=5`,
        {
          headers: {
            'Accept-Language': 'en-US',
          },
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = debounce(searchLocations, 300);

  const handleLocationSelect = (displayName: string) => {
    setLocation(displayName);
    setSearchQuery(displayName);
    setSearchResults([]);
  };

  const handleReviewSubmitted = () => {
    refetchReviews();
  };

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#14B8A6" size={16} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-16 overflow-hidden">
      <AmbientGlow variant="subtle" />

      {/* Hero Vehicle Showcase Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-4 pb-8">
        <div
          className="relative rounded-3xl overflow-hidden h-[45vh] sm:h-[55vh] flex items-end p-6 sm:p-12 bg-cover bg-center shadow-glass-lg border border-white/60"
          style={{
            backgroundImage: `url(${car.image || slide1})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Floating Hero Info */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 glass-pill px-3 py-1 rounded-full text-xs font-bold text-teal-300 bg-teal-950/60 border border-teal-500/30 mb-3">
              <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-400" />
              <span>{car.make} Verified Fleet</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {car.make} {car.model}
            </h1>
            <p className="mt-1 text-slate-300 text-sm sm:text-base font-medium">
              Category: <span className="text-teal-400 font-semibold">{car.category}</span> • Located in Bangladesh Hub
            </p>
          </div>

          {/* Quick Price Badge */}
          <div className="absolute top-6 right-6 glass-dock bg-white/85 px-4 py-2 rounded-2xl shadow-glass border border-white/60 text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting From</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900">BDT {car.rental_price_per_day}</span>
            <span className="text-xs text-slate-500"> / day</span>
          </div>
        </div>
      </section>

      {/* Details Grid & Sticky Booking Dock */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (2 Cols): Specs, Features, Host, Ratings, Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specs Grid with Vector SVGs */}
            <div className="rounded-3xl glass-card p-6 sm:p-8 border border-white/60 shadow-glass">
              <h2 className="text-xl font-black text-slate-900 mb-6">
                Vehicle Performance & Specs
              </h2>

              <motion.div
                variants={staggerChildren}
                initial="initial"
                animate="animate"
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                <motion.div variants={fadeIn} className="p-4 rounded-2xl glass-pill flex flex-col items-center text-center">
                  <FuelPumpSVG className="w-7 h-7 text-teal-600 mb-2" />
                  <span className="text-xs font-bold text-slate-400 uppercase">Efficiency</span>
                  <span className="text-sm font-extrabold text-slate-800">22+ MPG</span>
                </motion.div>

                <motion.div variants={fadeIn} className="p-4 rounded-2xl glass-pill flex flex-col items-center text-center">
                  <ElectricBoltSVG className="w-7 h-7 text-amber-500 mb-2" />
                  <span className="text-xs font-bold text-slate-400 uppercase">Engine Type</span>
                  <span className="text-sm font-extrabold text-slate-800">Gas / Hybrid</span>
                </motion.div>

                <motion.div variants={fadeIn} className="p-4 rounded-2xl glass-pill flex flex-col items-center text-center">
                  <TransmissionSVG className="w-7 h-7 text-sky-500 mb-2" />
                  <span className="text-xs font-bold text-slate-400 uppercase">Transmission</span>
                  <span className="text-sm font-extrabold text-slate-800">Auto (CVT)</span>
                </motion.div>

                <motion.div variants={fadeIn} className="p-4 rounded-2xl glass-pill flex flex-col items-center text-center">
                  <SeatSVG className="w-7 h-7 text-purple-500 mb-2" />
                  <span className="text-xs font-bold text-slate-400 uppercase">Capacity</span>
                  <span className="text-sm font-extrabold text-slate-800">{car.seatCount || 5} Seats</span>
                </motion.div>
              </motion.div>

              {/* Description */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Description</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {car.description}
                </p>
              </div>

              {/* Features List */}
              {car.features && car.features.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Features & Inclusions</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hosted By Card */}
            <div className="rounded-3xl glass-card p-6 sm:p-8 border border-white/60 shadow-glass">
              <h2 className="text-xl font-black text-slate-900 mb-6">Hosted by Professional</h2>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-teal-200">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                      alt="Host"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 glass-dock p-1 rounded-full shadow-sm">
                    <VerifiedShieldSVG className="w-4 h-4 text-teal-600" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{car.name}</h3>
                  <p className="text-xs font-bold text-teal-600">All-Star Verified Host • Joined {car.date}</p>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                    <FaStar className="w-3.5 h-3.5" />
                    <span>5.0 (130+ verified trips)</span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500 leading-relaxed flex items-center gap-1.5">
                <IoIosInformationCircleOutline className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>All-Star Hosts like {car.name} are top-rated for vehicle cleanliness, punctual handover, and 24/7 responsiveness.</span>
              </p>
            </div>

            {/* Overall Ratings Card */}
            <div className="rounded-3xl glass-card p-6 sm:p-8 border border-white/60 shadow-glass">
              <h2 className="text-xl font-black text-slate-900 mb-6 text-center">
                Overall Guest Ratings
              </h2>

              <div className="flex justify-center items-center gap-4 mb-8">
                <span className="text-5xl font-black text-slate-900">
                  {car.averageRating.toFixed(1)}
                </span>
                <div>
                  <div className="flex items-center text-amber-500">
                    <Rating style={{ maxWidth: 100 }} value={car.averageRating} readOnly />
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Based on {car.reviewCount} verified guest reviews
                  </p>
                </div>
              </div>

              {/* Category Breakdown Progress */}
              <div className="space-y-4 max-w-lg mx-auto">
                {Object.entries(car.categoryRatings || {}).map(([label, value], index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
                      <span>{Number(value).toFixed(1)} / 5</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-sky-600 rounded-full transition-all duration-1000"
                        style={{ width: `${(Number(value) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="rounded-3xl glass-card p-6 sm:p-8 border border-white/60 shadow-glass">
              <h2 className="text-xl font-black text-slate-900 mb-6 text-center">
                Guest Reviews
              </h2>

              {isLoading ? (
                <div className="py-12 flex justify-center">
                  <SyncLoader color="#14B8A6" size={14} />
                </div>
              ) : reviewsData.reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviewsData.reviews.map((review: any) => (
                    <div key={review._id} className="p-4 rounded-2xl glass-pill border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{review.userName}</span>
                          <Rating style={{ maxWidth: 85 }} value={review.rating} readOnly />
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 italic">"{review.comment}"</p>
                    </div>
                  ))}

                  {/* Pagination */}
                  <div className="flex justify-between items-center pt-4">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold glass-pill text-slate-700 disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <span className="text-xs font-bold text-slate-500">
                      Page {page} of {reviewsData.totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={page === reviewsData.totalPages}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold glass-pill text-slate-700 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-center text-xs text-slate-500 py-6">
                  No reviews yet for this vehicle. Be the first to book!
                </p>
              )}

              {/* Review Form */}
              {user ? (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <ReviewForm carId={car._id.toString()} onReviewSubmitted={handleReviewSubmitted} />
                </div>
              ) : (
                <p className="mt-6 text-center text-xs text-slate-500">
                  Please sign in to leave a review after your completed trip.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Frosted Glass Booking Card */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-3xl glass-dock bg-white/95 p-6 sm:p-8 shadow-glass-lg border border-white/60 space-y-6">
              {/* Price Banner */}
              <div className="pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Daily Price</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xs font-bold text-slate-500">BDT</span>
                  <span className="text-3xl font-black text-slate-900">{perDayCost.toFixed(0)}</span>
                  <span className="text-xs text-slate-500">/ day</span>
                </div>
              </div>

              {/* Trip Total */}
              <div className="p-3.5 rounded-2xl glass-pill flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Total Rental Fee</span>
                  <span className="text-lg font-black text-teal-700">BDT {totalCost}</span>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-xl">
                  {differenceInDays(dateRange[0].endDate, dateRange[0].startDate) + 1} Days
                </span>
              </div>

              {/* Trip Dates Trigger */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Trip Dates
                </label>
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full h-11 px-3.5 rounded-xl glass-input text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between cursor-pointer"
                >
                  <span>
                    {format(dateRange[0].startDate, 'MMM dd, yyyy')} - {format(dateRange[0].endDate, 'MMM dd, yyyy')}
                  </span>
                  <span className="text-teal-600 font-bold">📅</span>
                </button>
              </div>

              {/* Calendar Drawer */}
              {showCalendar && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="overflow-hidden rounded-2xl border border-slate-200"
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={handleSelect}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      rangeColors={['#14B8A6']}
                      className="w-full"
                    />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Include Chauffeur/Driver Option */}
              <div className="flex items-center gap-3 p-3 rounded-2xl glass-pill">
                <input
                  type="checkbox"
                  id="includeDriver"
                  checked={includedDriver}
                  onChange={(e) => setIncludedDriver(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                />
                <label htmlFor="includeDriver" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Include Chauffeur (+20% fee)
                </label>
              </div>

              {/* Pickup & Return Location */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Pickup & Return Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      debouncedSearch(e.target.value);
                    }}
                    placeholder="Search hub or address..."
                    className="w-full h-11 px-3.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-teal-500 border-t-transparent" />
                    </div>
                  )}
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-1 rounded-xl glass-dock bg-white shadow-lg border border-slate-200 max-h-48 overflow-y-auto">
                    {searchResults.map((result) => (
                      <button
                        key={result.place_id}
                        onClick={() => handleLocationSelect(result.display_name)}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors border-b border-slate-100 last:border-none"
                      >
                        {result.display_name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Popular Location Pills */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["Uttara", "Gulshan", "Mohammadpur", "Airport"].map((place) => (
                    <button
                      key={place}
                      type="button"
                      onClick={() => handleLocationSelect(place)}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg glass-pill text-slate-600 hover:text-teal-600 hover:bg-teal-50"
                    >
                      {place}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleContinue}
                className="w-full h-12 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Proceed to Checkout →
              </button>

              {/* Cancellation Guarantee */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium justify-center">
                <InstantBookingSVG className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Instant Confirmation • Free Cancellation</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarDetails;
