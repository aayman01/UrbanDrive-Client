import React, { useEffect, useState } from 'react';
import slide1 from '../../assets/slides/slide1.jpg';
import { MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';
import slide2 from '../../assets/slides/slide2.jpg';

const Contact: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const contactInfo = [
    { icon: <MdEmail size={32} />, title: 'Email us', content: 'info@urbandrive.com' },
    { icon: <MdLocationOn size={32} />, title: 'Our address', content: 'Dhaka, Bangladesh' },
    { icon: <MdAccessTime size={32} />, title: 'Opening Hours', content: 'Mon-Sun: 8 AM - 7 PM' },
  ];

  return (
    <div className='contact bg-[#18181B]'>
      <section className='relative'>
        <div
          className="bg-cover bg-center h-[60vh] flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${slide1})`,
            backgroundPositionY: `${scrollY * 0.5}px`
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="text-center z-10 flex flex-col px-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-Playfair">
              Contact <span className='text-teal-400'>Us</span>
            </h1>
            <p className="text-white mt-4 sm:mt-8 text-sm sm:text-lg font-Merri font-bold">
              Get in touch with us for any inquiries
            </p>
          </div>
        </div>
        
        <div className='lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:transform lg:translate-y-1/2'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6'>
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className={`rounded-lg p-6 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl bg-[#18181B] hover:bg-teal-400 group`}
                >
                  <div className="flex flex-col items-center justify-center text-center group-hover:text-[#18181B]">
                    <div className="mb-4 transition-colors duration-300 text-teal-400 group-hover:text-[#18181B]">
                      {item.icon}
                    </div>
                    <h2 className="text-lg font-bold mt-2">{item.title}</h2>
                    {item.title === 'Email us' ? (
                      <a 
                        href={`mailto:${item.content}`} 
                        className="text-sm  hover:text-[#18181B]"
                      >
                        {item.content}
                      </a>
                    ) : item.title === 'Our address' ? (
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${(item.content)}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm  hover:text-[#18181B]"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-sm">{item.content}</p>
                    )}
                      
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <hr className='border-teal-400 border-2 mt-32' />
      <section className="mt-24 bg-[#18181B]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-Playfair text-white mb-8 text-center">Get In <span className='text-teal-400'>Touch</span></h2>
          <div className="flex flex-col md:flex-row gap-8">

            {/* Contact Form */}
            <div className="w-full md:w-1/2">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name*"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email*"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="tel"
                    placeholder="Your Number*"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    placeholder="Subject*"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full p-3 mt-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-2 mt-4 text-gray-900 rounded-lg group bg-gradient-to-br from-teal-500
       to-navy-700 group-hover:from-teal-500 group-hover:to-navy-700 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-white
       dark:focus:ring-white hover:bg-[#12625D] font-Merri font-bold"
                >
                  Submit
                </button>
              </form>
            </div>
            
            {/* Map */}
            <div className="w-full md:w-1/2">
  <div className="h-[400px] rounded-2xl overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14599.241897333992!2d90.41001779011839!3d23.82533761273339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1727014318933!5m2!1sen!2sbd"
      className="w-full h-full border-0"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
  <div className="mt-2 text-white flex justify-center">
    <p>Dhaka, Bangladesh</p>
  </div>
</div>

          </div>
        </div>
      </section>
      {/* <hr className='border-teal-400 border-2 mt-16' /> */}
      <section 
        className="pt-24 mt-10 sm:py-36 px-4 md:px-16 relative bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${slide2})`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto relative z-10">
          <p className='text-teal-400 font-Playfair text-sm  text-center mb-2 tracking-wider'>'Rent Your Car</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white font-Playfair tracking-wider">Interested In Renting A Car?</h2>
          <p className="mt-4 sm:mt-6 text-center max-w-3xl mx-auto text-base sm:text-sm text-white font-Merri">
          Don't hesitate and send us a message.
          </p>

          <div className="flex justify-center mt-8 pb-8 space-x-4">
  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-500 to-navy-700 group-hover:from-teal-500 group-hover:to-navy-700 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-white dark:focus:ring-white">
    <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-Open">
      Live Chat    
    </span>
  </button>

  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-teal-500 rounded-lg group hover:text-white border border-teal-500 focus:ring-2 focus:outline-none focus:ring-white dark:focus:ring-white">
    <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-teal-500 font-Open">
      Rent Now
    </span>
  </button>
</div>

        </div>
      </section>
      <hr className='border-teal-400 border-2 ' />
    </div>
  );
};

export default Contact;
