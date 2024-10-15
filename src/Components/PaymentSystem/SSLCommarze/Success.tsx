import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Success: React.FC = () => {
    return (
        <motion.div
            className="min-h-screen flex flex-col justify-center items-center bg-green-100"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                className="text-4xl font-bold text-green-600 mb-4"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Payment Successful!
            </motion.h1>
            <motion.p
                className="text-lg text-gray-700 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                Thank you for your payment. Your transaction was completed successfully.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className='space-x-3'>
                    <Link
                        to="/"
                        className="bg-green-500 text-white px-6 py-2 rounded transition-transform transform hover:scale-105 hover:bg-green-600"
                    >
                        Go to Home
                    </Link>
                    <Link
                        to={`/dashboard/paymentHistory`}
                        className="bg-green-500 text-white px-6 py-2 rounded transition-transform transform hover:scale-105 hover:bg-green-600"
                    >
                        Go to payment history
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Success;
