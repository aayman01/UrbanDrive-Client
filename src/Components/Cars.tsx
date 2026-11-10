import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import MapComponent from "./MapComponent";
import { SyncLoader } from "react-spinners";
import CarsData from "./CarsData";
import { useTranslation } from "react-i18next";
import { VerifiedShieldSVG } from "./Common/SVG/FeatureBadges";

const Cars: React.FC = () => {
  const axiosPublic = useAxiosPublic();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sortOption, setSortOption] = useState("");
  const [totalCars, setTotalCars] = useState(0);
  const [seatCount, setSeatCount] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchItem] = useState("");
  const [searchLocation] = useState("");
  const [cars, setCars] = useState([]);
  const [homePickup, setHomePickup] = useState("");
  const { t } = useTranslation();
  const [permissionGranted, setPermissionGranted] = useState(false);

  const {
    data: cardata = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [
      "car",
      currentPage,
      category,
      maxPrice,
      minPrice,
      sortOption,
      searchItem,
      homePickup,
    ],
    queryFn: async () => {
      const response = await axiosPublic.get("/cars", {
        params: {
          page: currentPage,
          limit: 6,
          category,
          minPrice,
          maxPrice,
          sort: sortOption,
          seatCount: seatCount,
          search: searchItem,
          lat: userLocation?.lat,
          lng: userLocation?.lng,
          location: searchLocation,
          maxDistance: 50000,
          homePickup: homePickup,
        },
      });
      setTotalPages(response.data.totalPages);
      setTotalCars(response.data.totalCars);
      return response.data.Cars;
    },
  });

  const askForLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermissionGranted(true);
          localStorage.setItem("locationPermission", "granted");
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.warn("Location permission denied by user");
          }
        }
      );
    }
  };

  const fetchCurrentLocation = () => {
    if (permissionGranted) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation({ lat, lng });
        fetchCars(lat, lng, 5000);
      });
    } else {
      askForLocationPermission();
    }
  };

  const fetchCars = async (lat: number, lng: number, maxDistance: number) => {
    try {
      const response = await axiosPublic.get("/SearchCars", {
        params: {
          lat,
          lng,
          maxDistance,
          location: "current",
        },
      });
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    const savedPermission = localStorage.getItem("locationPermission");
    if (savedPermission === "granted") {
      setPermissionGranted(true);
    } else {
      askForLocationPermission();
    }
  }, []);

  useEffect(() => {
    if (userLocation || searchLocation) {
      refetch();
    }
  }, [userLocation, searchLocation, refetch]);

  const fetchAllCars = async () => {
    try {
      const response = await axiosPublic.get("/SearchCars", {
        params: { location: "anywhere" },
      });
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching all cars:", error);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "current") {
      fetchCurrentLocation();
    } else if (selectedValue === "anywhere") {
      fetchAllCars();
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleHomePickup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHomePickup(e.target.value);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "0-50") {
      setMinPrice(0);
      setMaxPrice(50);
    } else {
      const [min, max] = value.split("-").map(Number);
      setMinPrice(min);
      setMaxPrice(max);
    }
  };

  const handleSeatCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSeatCount(value ? Number(value) : null);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 glass-pill px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50/70 border border-teal-200/50 mb-3">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Verified Fleet Available</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Find Your Perfect Ride
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-500">
          Instant booking, verified hosts, and transparent rates across Bangladesh
        </p>
      </div>

      {/* Floating Glass Filters Dock */}
      <div className="rounded-3xl glass-dock bg-white/85 p-5 shadow-glass border border-white/60 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Location */}
          <select
            className="w-full h-11 glass-input px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer"
            id="locationSelect"
            value={userLocation ? JSON.stringify(userLocation) : ""}
            onChange={handleLocationChange}
          >
            <option disabled value="">{t("locationSelect.selectPlaceholder")}</option>
            <option value="current">📍 {t("locationSelect.currentLocation")}</option>
            <option value="anywhere">🌍 {t("locationSelect.anywhere")}</option>
          </select>

          {/* Category */}
          <select
            className="w-full h-11 glass-input px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="Electric">⚡ {t("categorySelect.electric")}</option>
            <option value="suv">🚙 {t("categorySelect.suv")}</option>
            <option value="Sedan">🚗 {t("categorySelect.sedan")}</option>
            <option value="Luxury">👑 {t("categorySelect.luxury")}</option>
            <option value="Truck">🛻 {t("categorySelect.truck")}</option>
          </select>

          {/* Seats */}
          <select
            className="w-full h-11 glass-input px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer"
            value={seatCount ?? ""}
            onChange={handleSeatCountChange}
          >
            <option value="">Any Capacity</option>
            <option value="4">4+ Seats</option>
            <option value="5">5+ Seats</option>
            <option value="6">6+ Seats</option>
            <option value="7">7+ Seats</option>
            <option value="8">8+ Seats</option>
          </select>

          {/* Price */}
          <select
            className="w-full h-11 glass-input px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer"
            value={minPrice && maxPrice ? `${minPrice}-${maxPrice}` : ""}
            onChange={handlePriceRangeChange}
          >
            <option value="">Any Price</option>
            <option value="0-50">BDT 0 - 50</option>
            <option value="51-100">BDT 51 - 100</option>
            <option value="101-200">BDT 101 - 200</option>
            <option value="201-500">BDT 201 - 500</option>
            <option value="501-1000">BDT 501 - 1,000</option>
            <option value="1001-Infinity">BDT 1,000+</option>
          </select>

          {/* Home Pickup */}
          <select
            className="w-full h-11 glass-input px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer"
            value={homePickup}
            onChange={handleHomePickup}
          >
            <option value="">Home Delivery</option>
            <option value="yes">✓ Home Pickup: Yes</option>
            <option value="no">✕ Hub Pickup Only</option>
          </select>

          {/* Sort */}
          <select
            className="w-full h-11 glass-input px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="date-desc">Newest Fleet</option>
          </select>
        </div>
      </div>

      {/* Main Content: List + Interactive Map */}
      {isLoading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <SyncLoader color="#14B8A6" size={14} />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-slate-600">
              Showing <strong className="text-slate-900">{cardata.length}</strong> of {totalCars} verified vehicles
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Scrollable Cars List */}
            <div className="space-y-4">
              <CarsData cars={cardata} />
            </div>

            {/* Sticky Modern Map Frame */}
            <div className="lg:sticky lg:top-28 h-[550px] rounded-3xl overflow-hidden glass-card border border-white/60 shadow-glass-lg">
              <MapComponent cars={cars} userLocation={userLocation} />
            </div>
          </div>
        </div>
      )}

      {/* Modern Glass Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 my-12">
          <button
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold glass-pill text-slate-700 hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <div className="px-4 py-2 rounded-xl glass-dock text-xs sm:text-sm font-extrabold text-teal-600 border border-teal-200">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold glass-pill text-slate-700 hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Cars;
