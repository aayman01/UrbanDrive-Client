// import React from 'react';

// const BookAutoRental: React.FC = () => {
//   return (
//     <div className="relative min-h-screen bg-fixed bg-cover bg-center"  style={{ backgroundImage: `url(${car1})` }}> {/* Add your image URL */}
//       <div className="bg-black bg-opacity-50 min-h-screen flex flex-col justify-center items-center">
//         <div className='text-center'>
//           <h3 className=' lg:mt-24  tracking-wider font-lato text-amber-600'>RENT NOW</h3>
//           <h2 className='mt-4 lg:mb-8 text-3xl font-extrabold font-lato text-white'>Book Auto Rental</h2>
//         </div>

//         <div className='grid grid-cols-2 md:grid-cols-6 ml-2 mr-2 md:bg-gray-900 md:bg-opacity-75 md:p-4 lg:grid-cols-6 gap-3 lg:gap-6 mt-6 mb-6 lg:bg-gray-900 lg:bg-opacity-75 p-8 rounded-full'>
//           <select className="select w-full max-w-xs bg-[#111010] text-white border rounded-full p-3">
//             <option disabled value="">Choose Car Types</option>
//             <option value="economy">Economy Cars</option>
//             <option value="luxury">Luxury Cars</option>
//             <option value="sport">Sport Cars</option>
//             <option value="sedan">Sedan</option>
//           </select>

//           <select className="select w-full max-w-xs bg-[#111010] text-white border rounded-full p-3">
//             <option disabled value="">Pick Up Locations</option>
//             <option value="uttora">Uttora</option>
//             <option value="mirpur-1">Mirpur-1</option>
//             <option value="saver">Saver</option>
//             <option value="ajimpur">Ajimpur</option>
//             <option value="mirpur-2">Mirpur-2</option>
//           </select>

//                 <input
//             id="pickup-date"
//             type="date"
//             className="block w-full max-w-xs border border-gray-300 shadow-sm sm:text-sm bg-[#111010] text-white rounded-full p-4"
//             min={todayDate}
//           />

//           <select className="select w-full max-w-xs bg-[#111010] text-white border rounded-full p-3">
//             <option disabled value="">Drop Off Locations</option>
//             <option value="uttora">Uttora</option>
//             <option value="mirpur-1">Mirpur-1</option>
//             <option value="saver">Saver</option>
//             <option value="ajimpur">Ajimpur</option>
//             <option value="mirpur-2">Mirpur-2</option>
//           </select>

//           <input
//             id="return-date"
//             type="date"
//             className="block w-full max-w-xs border border-gray-300 shadow-sm sm:text-sm bg-[#111010] text-white rounded-full p-3"
//             min={todayDate}
//           />
//           <input
//             id="return-date"
//             type="button"
//             className="block w-full max-w-xs   shadow-sm sm:text-sm bg-amber-600 text-white border-none rounded-full p-3"
//            value="Rent Now"
//           />

//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookAutoRental;