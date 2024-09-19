import React from "react";
import { FaPhone } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/logo.png'
const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const nabLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-[#BD6611] font-bold hover:underline" : "font-bold hover:underline"
                    }
                >
                    Home
                </NavLink>

                <p className="pt-4">Welcome to UrbanDrive.</p>
                <h3>Flexible Rental Plans.</h3>
                <h3>Seamless Booking Process.</h3>
                <h2>Ready to Drive in Style?</h2>
            </li>

            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? "text-[#BD6611] font-bold hover:underline" : "font-bold hover:underline"
                    }
                >
                    <h2>About UrbanDrive</h2>
                </NavLink>
                <h3 className="pt-4">Our Mission UrbanDrive.</h3>
                <h3>Discover a new standard in car rentals with UrbanDrive. </h3>
                <Link to='/about' className="hover:text-blue-600 hover:underline">Explore Our Fleet.</Link>
            </li>


            <li>
                <NavLink
                    to="/Services"
                    className={({ isActive }) =>
                        isActive ? "text-[#BD6611] font-bold hover:underline" : "font-bold hover:underline"
                    }
                >
                    Services
                </NavLink>
                <h3 className="pt-4">Premium Car Rentals.</h3>
                <h3>Flexible Rental Options.</h3>
                <h3>24/7 Customer Support.</h3>
            </li>
            <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive ? "text-[#BD6611] font-bold hover:underline" : "font-bold hover:underline"
                    }
                >
                    Contact us
                </NavLink>
                <p className=" pt-4 flex items-center gap-1 hover:underline hover:text-blue-600 "><span><FaPhone /></span> +8801849317388 </p>
                <p className="  flex items-center gap-1 hover:underline hover:text-blue-600 "><span><MdOutlineEmail /></span> ayman.alfi098@gmail.com</p>
                <p className="flex items-center gap-1"><span><IoLocationSharp /></span> Dhaka,Bangladesh.</p>
            </li>
        </>
    )
    return (
        <div>
            <div className="bg-white dark:bg-gray-900 mt-8">
                <div className="container px-6 py-12 mx-auto">
                    <div className="md:flex md:-mx-3 md:items-center md:justify-between">
                        <h1 className="text-xl font-semibold tracking-tight text-gray-800 md:mx-3 xl:text-2xl dark:text-white">
                            Subscribe to our newsletter to get updates.
                        </h1>

                        <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
                            <Link to={'/login'}>
                                <p aria-label="Sign up for newsletter" className="inline-flex items-center justify-center w-full px-4 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg gap-x-3 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                    <span>Sign in Now</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </p></Link>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                     text-white list-none">
                        {nabLinks}

                    </div>


                    <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

                    <div className="flex flex-col items-center justify-between sm:flex-row text-white">
                        <p aria-label="UrbanDrive" className="flex">
                            <img className="w-auto h-14 rounded" loading="lazy" src={logo}
                             alt="UrbanDrive" />
                         
                        </p>

                        <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
                            © UrbanDrive {currentYear}. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
