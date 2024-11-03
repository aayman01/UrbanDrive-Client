/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {  useLoaderData, useNavigate } from 'react-router-dom';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import slide1 from '../../assets/slides/slide1.jpg';
import { FaGasPump, FaStar } from 'react-icons/fa6';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { addDays, differenceInDays, format } from 'date-fns';
import { DateRange, RangeKeyDict } from 'react-date-range';
import { MdElectricCar } from 'react-icons/md';
import { GiCarDoor, GiCarSeat } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import { ICar } from '../../Types/car';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { SyncLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { Rating, Star } from '@smastrom/react-rating';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';
import { debounce } from 'lodash';

// Framer Motion
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
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

  // const hostEmail = car.email
  const {user} = useAuth();

  // ];



  const [scrollY, setScrollY] = useState(0);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: 'selection'
    }
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
  // const [totalPages, setTotalPages] = useState(1);


  const { data: reviewsData = { reviews: [], currentPage: 1, totalPages: 1, totalReviews: 0 },
        refetch: refetchReviews,
        isLoading } = useQuery({
  queryKey: ['reviews', car._id, page],
  queryFn: async () => {
    const response = await axiosPublic.get(`/reviews/${car._id}?page=${page}&limit=5`);
    return response.data;
  }
});

  const handleNextPage = () => {
    if (page < reviewsData.totalPages) {
      setPage(prev => prev + 1);
    }
  };
  // const handleNextPage =()=>{
  //   if(page < totalPages){
  //     setPage(page + 1);
  //   }
  // }

  const handlePrevPage =()=>{
    if(page > 1){
      setPage(prev => prev -1);
    }
  }


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
      setDateRange([{
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: 'selection'
      }]);
      const newTotalCost = calculateTotalCost(selection.startDate, selection.endDate);
      setTotalCost(newTotalCost);
    }
  };

console.log(car.email);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Search Location
  const searchLocations = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=bd&limit=5`,
        {
          headers: {
            'Accept-Language': 'en-US'
          }
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

  // Add debounced search function
  const debouncedSearch = debounce(searchLocations, 300);


  const handleLocationSelect = (displayName: string) => {
    setLocation(displayName);
    setSearchQuery(displayName);
    setSearchResults([]);
  };

  if (!car) return (
    <div className="min-h-screen flex items-center justify-center">
      <SyncLoader color="#593cfb" size={18} />
    </div>
  );
  // const handlePrice = () => {
  //   const price = totalCost;
  //   navigate(`/payment/${price}`);
  // };

  const handleReviewSubmitted = () => {
    refetchReviews();
  };

  return (
    <div className="bg-background text-text">
      <section>
        <div
          className="bg-cover bg-center h-[60vh] flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${car.image || slide1})`,
            backgroundPositionY: `${scrollY * 0.5}px`,
            willChange: "transform"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-transparent to-gray-900 opacity-80"></div>
          <div className="text-center z-10 flex flex-col px-4">
            <p className="text-background text-sm sm:text-lg font-bold">
              Discover the perfect car for you
            </p>
            <h1 className="text-3xl mt-2 sm:mt-4 sm:text-4xl md:text-6xl font-bold text-white">
              Rent a <span className="text-accent">{car.make}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Car Details */}
      <section className="bg-background text-text">
        <div className="max-w-7xl mx-auto p-2 sm:p-8">
          <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-6 sm:py-12">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-12">
              {/* Left Section */}
              <div className="flex-1 w-full lg:w-2/3">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8">
                  <h1 className="text-4xl font-extrabold mb-2 text-primary">
                    {car.make} {car.model}
                  </h1>
                  <p className="text-lg text-text mb-4">{car.category}</p>

                  <div className="flex items-center mb-6">
                    <span className="text-2xl font-bold text-primary mr-2">{car.averageRating.toFixed(1)}</span>
                    <FaStar className="w-6 h-6 fill-accent" />
                    <span className="text-text ml-1">({car.reviewCount} reviews)</span>
                  </div>

                  {/* Features Grid */}
                  <motion.div 
                    variants={staggerChildren}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 text-text"
                  >
                    <motion.div 
                      variants={fadeIn}
                      className="flex flex-col items-center p-4 bg-background rounded-lg"
                    >
                      <FaGasPump className="w-8 h-8 text-secondary mb-2" />
                      <span className="text-sm font-medium">22 MPG</span>
                    </motion.div>
                    <motion.div 
                      variants={fadeIn}
                      className="flex flex-col items-center p-4 bg-background rounded-lg"
                    >
                      <MdElectricCar className="w-8 h-8 text-secondary mb-2" />
                      <span className="text-sm font-medium">Gas (Premium)</span>
                    </motion.div>
                    <motion.div 
                      variants={fadeIn}
                      className="flex flex-col items-center p-4 bg-background rounded-lg"
                    >
                      <GiCarDoor className="w-8 h-8 text-secondary mb-2" />
                      <span className="text-sm font-medium">4 Doors</span>
                    </motion.div>
                    <motion.div 
                      variants={fadeIn}
                      className="flex flex-col items-center p-4 bg-background rounded-lg"
                    >
                      <GiCarSeat className="w-8 h-8 text-secondary mb-2" />
                      <span className="text-sm font-medium">{car.seatCount} Seats</span>
                    </motion.div>
                  </motion.div>

                  {/* Description */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-3 text-primary">Description</h2>
                    <p className="text-text leading-relaxed">{car.description}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h2 className="text-2xl font-bold mb-3 text-primary">Features</h2>
                    <ul className="grid grid-cols-2 gap-2">
                      {car.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-text">
                          <svg className="w-4 h-4 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hosted By Section */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
                  <h2 className="text-2xl font-bold mb-6 text-primary">Hosted By</h2>
                  <div className="flex items-center mb-6">
                    <img src="https://via.placeholder.com/80" alt="Host" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold text-text text-lg">{car.name}</h3>
                      <p className="text-sm text-secondary">All-Star Host</p>
                    </div>
                  </div>
                  <p className="text-sm text-text mb-4">131 trips • Joined {car.date}</p>
                  <div className="flex items-center text-accent mb-4">
                    <FaStar className="w-5 h-5 fill-accent mr-1" />
                    <span className="font-bold mr-1">5.0</span>
                  </div>
                  <p className="text-sm text-text mb-4">
                    <IoIosInformationCircleOutline className="w-4 h-4 inline mr-1 text-secondary" />
                    All-Star Hosts like {car.name} are the top-rated and most experienced hosts on UrbanDrive.
                  </p>
                  <a href="#" className="text-primary text-sm font-medium hover:underline">Learn more</a>
                </div>
              </div>

              {/* Right Section (Pricing and Booking) */}
              <div className="flex-1 w-full lg:w-1/3 sticky top-10">
                <div className="bg-white rounded-xl shadow-lg p-2 sm:p-6">
                  <span className="text-4xl font-bold text-primary mb-2 block">{perDayCost.toFixed(2)} BDT/day</span>
                  <p className="text-sm text-text mb-6">Price before taxes</p>

                  <div className="mb-6">
                    <span className="text-2xl font-bold text-accent">{totalCost} BDT</span>
                    <p className="text-sm text-text">Total for {differenceInDays(dateRange[0].endDate, dateRange[0].startDate) + 1} days</p>
                  </div>

                  {/* Trip Dates */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold mb-2 text-primary">Trip dates</p>
                    <div
                      className="flex justify-between items-center border border-primary/20 p-3 rounded-lg cursor-pointer bg-background hover:bg-primary/10 transition-colors"
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      <span>{format(dateRange[0].startDate, 'MMM dd, yyyy')} - {format(dateRange[0].endDate, 'MMM dd, yyyy')}</span>
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Include Driver */}
                  <div className='mb-6 flex items-center'>
                    <input
                      type="checkbox"
                      id="includeDriver"
                      checked={includedDriver}
                      onChange={(e) => setIncludedDriver(e.target.checked)}
                      className='w-5 h-5 text-secondary border-gray-300 rounded focus:ring-secondary'
                    />
                    <label htmlFor="includeDriver" className='text-text text-sm ml-2 cursor-pointer'>Include driver (+20% total cost)</label>
                  </div>

                  {includedDriver && (
                    <div className="mb-6 p-4 bg-background rounded-lg">
                      <p className="text-sm text-text">Driver fee (20% of base cost)</p>
                      <span className="font-bold text-accent">${(totalCost - totalCost / 1.2).toFixed(2)}</span>
                    </div>
                  )}

                  {/* Calendar */}
                  {showCalendar && (
                    <AnimatePresence>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-full overflow-x-auto -mx-2 px-2"
                      >
                        <DateRange
                          editableDateInputs={true}
                          onChange={handleSelect}
                          moveRangeOnFirstSelection={false}
                          ranges={dateRange}
                          className="mb-6 w-full"
                          rangeColors={['#4F46E5']}
                          color="#4F46E5"
                          months={window.innerWidth < 768 ? 1 : 2}
                          direction={window.innerWidth < 768 ? "vertical" : "horizontal"}
                        />
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* Location */}
                  <div className="mb-6 relative">
                    <p className="text-sm font-semibold mb-2 text-primary">Pickup & return location</p>

                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          debouncedSearch(e.target.value);
                        }}
                        placeholder="Search for a location..."
                        className="w-full border border-primary/20 p-3 rounded-lg bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {isSearching && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                        </div>
                      )}
                    </div>

                    {/* Search Results Dropdown */}
                    {searchResults.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {searchResults.map((result) => (
                          <button
                            key={result.place_id}
                            onClick={() => handleLocationSelect(result.display_name)}
                            className="w-full text-left px-4 py-2 hover:bg-background/50 focus:bg-background/50 transition-colors text-sm"
                          >
                            {result.display_name}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Quick Select Buttons */}
                    <div className="mt-2">
                      <p className="text-sm text-text mb-2">Or select a popular location:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Uttara", "Mohammadpur", "Gulshan", "Badda", "Khilkhet", "Airport"].map((place) => (
                          <button
                            key={place}
                            onClick={() => handleLocationSelect(place)}
                            className="px-3 py-1.5 text-sm bg-background rounded-lg hover:bg-primary/10 transition-colors"
                          >
                            {place}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button 
                    onClick={handleContinue} 
                    className="w-full bg-accent font-bold text-xl drop-shadow-md text-white py-3 rounded-lg hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  >
                    Continue
                  </button>

                  {/* Cancellation Policy */}
                  <div className="flex items-center mt-6">
                    <svg className="w-5 h-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-text">Free cancellation before Sep 28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="p-2 sm:p-6 bg-white rounded-lg shadow-lg mt-8">
            <h2 className="text-3xl font-bold mb-4 text-primary text-center">Overall Ratings</h2>
            
            {/* Average Rating */}
            <div className="flex justify-center items-center mb-6">
              <p className="text-6xl font-extrabold text-accent">
                {car.averageRating.toFixed(1)}
              </p>
              <div className="ml-4">
                <p className="text-lg text-text">({car.reviewCount} reviews)</p>
              </div>
            </div>
            
            {/* Category Ratings */}
            <div className="space-y-4">
              {Object.entries(car.categoryRatings || {}).map(([label, value], index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-center text-text font-medium mb-1">
                    <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
                    <span>{Number(value).toFixed(1)} / 5</span>
                  </div>
                  <motion.div
                    className="h-2 bg-background rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${(Number(value) / 5) * 100}%` }}
                    transition={{ duration: 1.5 }}
                  >
                    <div className="h-full bg-secondary rounded-full"></div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-white p-2 sm:p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 text-primary text-center">Customer Reviews</h2>

            {isLoading ? (
              <div className="min-h-screen flex items-center justify-center">
                <SyncLoader color="#4F46E5" size={18} />
              </div>
            ) : reviewsData.reviews.length > 0 ? (
              <div className="space-y-4">
                {reviewsData.reviews.map((review: any) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-background p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <Rating style={{ maxWidth: 100 }} value={review.rating} readOnly itemStyles={{ 
                          itemShapes: Star, 
                          activeFillColor: '#F59E0B', 
                          inactiveFillColor: '#CBD5E1' 
                        }} />
                        <span className="ml-3 font-semibold text-lg text-primary">{review.userName}</span>
                      </div>
                      <p className="text-sm text-text">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3 ">
                      {Object.entries(review.ratingDetails).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-sm text-text font-semibold">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </p>
                          <p className="text-accent text-xl font-bold">{value as number}/5</p>
                        </div>
                      ))}
                    </div>

                    {/* Review Comment */}
                    <p className="text-text text-sm leading-relaxed">{review.comment}</p>
                  </motion.div>
                ))}

                {/* Pagination Controls */}
                <div className="mt-6 flex justify-between items-center">
                  <button 
                    onClick={handlePrevPage} 
                    disabled={page === 1}
                    className="px-4 py-2 bg-primary text-white rounded-lg shadow-md disabled:bg-gray-400 hover:bg-primary/90 transition duration-200"
                  >
                    Previous
                  </button>
                  <span className="text-text font-medium text-base">Page {page} of {reviewsData.totalPages}</span>
                  <button 
                    onClick={handleNextPage} 
                    disabled={page === reviewsData.totalPages}
                    className="px-4 py-2 bg-primary text-white rounded-lg shadow-md disabled:bg-gray-400 hover:bg-primary/90 transition duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-lg text-text text-center">No reviews yet. Be the first to review this car!</p>
            )}

            {/* Review Form or Login Prompt */}
            {user ? (
              <div className="mt-10">
                <ReviewForm carId={car._id.toString()} onReviewSubmitted={handleReviewSubmitted} />
              </div>
            ) : (
              <p className="mt-6 text-lg text-text text-center">Please log in to leave a review.</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CarDetails;