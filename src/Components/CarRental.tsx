import React from 'react';
import { motion } from 'framer-motion';
import carRental from "../assets/bannercar.jpg";
import { TbArrowUpRight } from "react-icons/tb";
import { useTranslation } from 'react-i18next';

const CarRental: React.FC = () => {
  const { t } = useTranslation();
  const features = [t("feature1"), t("feature2")];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <motion.div
            className="space-y-4"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-20 h-2 bg-accent rounded-full mb-2"></div>
            <h1 className="font-bold text-3xl md:text-5xl font-lato bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              {t("rentalheading")} <br />
              {t("rentalheading2")}
            </h1>
            <p className="text-base text-gray-600 font-lato tracking-wide max-w-xl">
              {t("renatalsubheading")}
            </p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="h-10 w-10 flex items-center justify-center bg-accent rounded-full">
                    <svg className="w-5 h-5 text-white transition-transform duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-base text-text font-bold font-lato">{feature}</span>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center px-6 py-3 bg-accent text-white font-bold rounded-lg transition-all hover:scale-105 hover:bg-opacity-90 hover:shadow-lg">
              {t("readMore")}
              <TbArrowUpRight className="text-xl ml-2" />
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
              <img
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                src={carRental}
                alt="A luxurious car available for rental"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-50"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarRental;
