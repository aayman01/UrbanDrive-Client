import React from 'react';
import { motion } from 'framer-motion';
import carRental from "../assets/carRental.jpg.jpg";
import { TbArrowUpRight } from "react-icons/tb";

const CarRental: React.FC = () => {
  return (
    <div className='bg-[#111010]'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 mx-auto mt-6 ml-2 mr-2 lg:gap-20 lg:ml-12 lg:mr-12 lg:p-10 md:ml-10 md:mr-10 md:p-6 md:gap-12'>
        
        {/* First div: Content animates from top */}
        <motion.div 
          className='mx-auto justify-center items-center'
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
        >
          <h3 className='text-amber-600 font-bold tracking-wider ml-2 font-lato'>RENTAX</h3>
          <motion.h1
            className='font-bold text-4xl font-lato mt-6 text-white'
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
          >
            We Are More Than <br />
            <span className='text-amber-600'>A Car Rental Company</span>
          </motion.h1>
          <motion.p
            className='mt-4 font-lato text-[#88837a]'
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
          >
            The UrbanDrive website showcases the core message of the company, highlighting that it offers more than just a standard car rental service. The header introduces UrbanDrive as a unique brand, focusing on the idea of providing a superior experience. 
          </motion.p>

          <motion.div
            className='flex flex-col gap-2 mt-4'
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center bg-[#211f1e] rounded-full">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-[#88837a] font-lato">Sports and Luxury Cars</span>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center bg-[#211f1e] rounded-full">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-[#88837a] font-lato">Economy Cars</span>
            </div>
          </motion.div>
          <motion.button
            className="flex font-lato mt-4 items-center p-4  text-black rounded-3xl  bg-amber-600
             hover:bg-gradient-to-r hover:from-[#bd7811] hover:to-[#bd4d11] hover:text-white transition-colors duration-300"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
          >
            Read More
            <TbArrowUpRight className='text-xl ml-2'/>
          </motion.button>
        </motion.div>
        
        {/* Second div: Image animates from the bottom */}
        <motion.div 
          className=''
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
        >
          <img className='h-[470px] w-[420px] rounded-3xl transition-transform duration-300 group-hover:scale-105' src={carRental} alt="carRental" />
        </motion.div>

      </div>
    </div>
  );
};

export default CarRental;
