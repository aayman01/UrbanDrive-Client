import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Fail: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-red-100"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold text-red-600 mb-4"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Payment Failed
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Oops! Something went wrong. Your payment could not be processed.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link
          to="/"
          className="bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold py-2 px-4 rounded mt-4"
        >
          Try Again
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Fail;
