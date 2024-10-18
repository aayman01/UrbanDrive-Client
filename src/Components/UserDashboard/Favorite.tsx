import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';
// import { IoMdHeart, } from "react-icons/io";
import { FaAward, FaMapLocationDot } from 'react-icons/fa6';
import { MdOutlineDiscount, MdOutlineStar } from 'react-icons/md';
import { SyncLoader } from 'react-spinners';

const Favorite: React.FC = () => {
    const axiosPublic = useAxiosPublic();
    const { user,loading } = useAuth();

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
        return <div ><SyncLoader color="#593cfb" size={10} /></div>; // Optionally, handle the updating state separately
    }

   

    // const removeFromFavoriteCars = async (carId: string) => {
    //     try {
    //         await axiosPublic.delete(`/favoritesCars/${user?.email}/${carId}`);
    //     } catch (error) {
    //         console.error('Error removing favorite car:', error);
    //     }
    // };

    return (
        <div>
            <h2 className='text-3xl font-bold font-lato lg:mt-12 lg:mb-10 lg:ml-2'>Favorites Cars</h2>
        {favoriteCars.length > 0 ? (
            <div className="grid mt-5 grid-cols-1 gap-4 lg:gap-6">
                {/* If there's only one favorite car */}
                {favoriteCars.length === 1 ? (
                    <div key={favoriteCars[0]._id} className="card w-[500px] h-[300px] lg:card-side bg-base-100 shadow-xl rounded-2xl group">
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
                        <MdOutlineStar className="text-[#f0bb0c] mt-1" /> ({favoriteCars.trip_count} trips){" "}
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
                        <MdOutlineDiscount className="mt-1" /> Discount: {favoriteCars.discount}%
                    </span>
                ) : (
                    <p></p>
                )}
                            <div className="card-actions gap-2 items-center justify-end mt-2">
                                <span className="text-primary font-bold text-xl">
                                    ${favoriteCars[0].rental_price_per_day}/day
                                </span>
                                <Link to={`/cars/${favoriteCars[0]._id}`}>
                                    <button className="bg-blue-700 p-2 rounded-lg text-white">Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    // If there are multiple favorite cars
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                       {favoriteCars.map(car => (
    <div key={car._id} >
        <div className="card lg:card-side bg-base-100 shadow-xl rounded-2xl group ">
            <figure className="w-full lg:w-[50%]">
                <img
                    className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                    src={car.image}
                    alt={car.name}
                />
            </figure>
            <div className="card-body w-full lg:w-2/3 flex-1">
                <div className="flex justify-between">
                    <h2 className="card-title">{car.model}</h2>
                </div>
                <p className="text-ellipsis">{car.description.slice(0, 80)}....</p>
                {car.rating > 0 ? (
                    <p className="flex gap-1">
                        {car.rating}
                        <MdOutlineStar className="text-[#f0bb0c] mt-1" /> ({car.trip_count} trips){" "}
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
                        <MdOutlineDiscount className="mt-1" /> Discount: {car.discount}%
                    </span>
                ) : (
                    <p></p>
                )}
                <div className="card-actions gap-2 items-center justify-end mt-2">
                    <span className="text-primary font-bold text-xl">${car.price}/day</span>
                    <Link to={`/cars/${car._id}`}>
                        <button className="bg-blue-700 p-2 rounded-lg text-white">Details</button>
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
        
    );
};

export default Favorite;
