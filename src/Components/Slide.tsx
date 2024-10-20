import React from "react";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
interface SlideProps {
  image: string;
  title: string;
  model: string;
  price: string;
}

const Slide: React.FC<SlideProps> = ({ image, title, model, price }) => {
  const {t} = useTranslation();
  return (
    <div
      className="relative w-full bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 flex justify-center items-center md:items-start lg:justify-start h-full p-8 md:p-16 lg:p-40">
        <div className="text-left">
          {/* <p className='text-sm font-Open text-teal-400 uppercase mb-2'>* Premium</p> */}

          <h1 className="text-5xl font-bold font-Playfair text-white md:text-7xl">
            {title}
          </h1>

          <Fade direction="down" cascade>
            <p className="mt-4 text-2xl text-white ">
              {model} ৳
              <span className="text font-Open bg-primary rounded-lg px-2">
                {price}
              </span>{" "}
              / {t("day")}
            </p>

            <Link to="/cars">
              <div className="flex mt-8 space-x-4">
                <button className="relative inline-flex items-center justify-center px-4 hover:text-primary hover:bg-white mb-2 overflow-hidden text-base sm:text-lg text-white bg-primary rounded-lg font-bold transition duration-300 ease-in-out transform hover:scale-105">
                  {t("view_details")}
                </button>

                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-base sm:text-lg font-medium text-white rounded-lg group hover:text-white border-2 border-primary focus:ring-yellow-400 dark:focus:ring-yellow-800 transition duration-300 ease-in-out transform hover:scale-105">
                  <span className="relative px-3 sm:px-4 lg:px-4 py-2 sm:py-3 lg:py-[18px] transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-primary font-Open font-bold">
                    {t("browse_cars")}
                  </span>
                </button>
              </div>
            </Link>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Slide;
