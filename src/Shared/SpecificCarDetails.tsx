import { FaAward, FaCar } from "react-icons/fa6";
import { MdOutlineDiscount, MdOutlineStar } from "react-icons/md";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { ICar } from "../Types/car";

const SpecificCarDetails = () => {
  const details = useLoaderData() as ICar[];
  const { car } = useParams();
  // console.log("data in specific",details)
  return (
    <div className="bg-white">
      <div className="max-w-6xl my-28 mx-auto px-4">
        <h2 className="text-2xl font-bold font-Merri">{car}</h2>
        <div>
          <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10">
            {details.map((car) => (
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

                        {/* {favoriteCars.includes(car._id) ? (
                                <IoMdHeart
                                  onClick={() =>
                                    removeFromFavoriteCars(car._id)
                                  }
                                  className="text-2xl cursor-pointer text-accent transition-transform duration-200 hover:scale-125"
                                />
                              ) : (
                                <IoMdHeartEmpty
                                  onClick={() => addToFavoriteCars(car)}
                                  className="text-2xl cursor-pointer text-primary transition-transform duration-200 hover:scale-125"
                                />
                              )} */}
                      </div>

                      <div className="flex items-center justify-between mt-2 text-sm text-text">
                        <p className="flex items-center gap-1">
                          {car.averageRating > 0 ? (
                            <>
                              {car.averageRating.toFixed(1)}
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

                      <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 group-hover:max-h-64 opacity-0 group-hover:opacity-100">
                        <div className="mt-3 space-y-2 text-sm text-text">
                          <div className="flex flex-wrap gap-2">
                            {car.features.slice(0, 3).map((feature, index) => (
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
                            <p className="text-accent">Currently Unavailable</p>
                          )}
                          {car.averageRating > 0 && (
                            <p className="flex gap-1 items-center">
                              <FaAward className="text-secondary" />
                              <span className="font-bold">All-Star Host</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-primary font-bold text-lg">
                        BDT{car?.rental_price_per_day}/day
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
        </div>
      </div>
    </div>
  );
};

export default SpecificCarDetails;
