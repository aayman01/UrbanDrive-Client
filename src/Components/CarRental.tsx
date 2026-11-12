import React from 'react';
import { motion } from 'framer-motion';
import carRental from "../assets/bannercar.jpg";
import { TbArrowUpRight } from "react-icons/tb";
import { useTranslation } from 'react-i18next';

const CarRental: React.FC = () => {
  const { t } = useTranslation();
  const features = [t("feature1"), t("feature2")];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
        <motion.div
          className="space-y-6"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-bold text-4xl md:text-5xl font-lato bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            {t("rentalheading")} <br />
            {t("rentalheading2")}
          </h1>
          <p className="text-lg text-gray-600 font-lato">
            {t("renatalsubheading")}
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="h-10 w-10 flex items-center justify-center bg-accent rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-text font-lato">{feature}</span>
              </div>
            ))}
          </div>

          <button className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg font-medium transition-transform hover:scale-105 hover:bg-opacity-90">
            {t("readMore")}
            <TbArrowUpRight className="text-xl ml-2" />
          </button>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-lg group">
            <img
              className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
              src={carRental}
              alt="A luxurious car available for rental"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-40"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarRental;
