import React, { useEffect, useState } from 'react';
import { MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import slide1 from "../../assets/slides/slide1.jpg";
import ChatModal from './ChatModal';


const Contact: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { t } = useTranslation();
  const axiosPublic = useAxiosPublic();

 
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  const contactInfo = [
    { icon: <MdEmail size={32} />, title: t('contact.email'), content: 'info@urbandrive.com' },
    { icon: <MdLocationOn size={32} />, title: t('contact.address'), content: 'Dhaka, Bangladesh' },
    { icon: <MdAccessTime size={32} />, title: 'Opening Hours', content: 'Mon-Sun: 8 AM - 7 PM' },
    { icon: <FaPhone size={32} />, title: t('contact.phone'), content: '+880 1234 567890' },
  ];

  interface IFormInputs {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      
      console.log('Form data:', data);
      
      const response = await axiosPublic.post('/contact', data);
      if (response.status === 200) {
        toast.success('Message sent successfully!');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleChatClick = () => {
    console.log('Chat button clicked'); // Add this debug log
    setIsChatOpen(true);
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${slide1})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="z-10 text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {t('contact.heading')}
            </h1>
            <p className="text-white text-lg sm:text-xl max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="container mx-auto px-4 -mt-16 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-white hover:bg-primary group duration-300 ease-in-out"
              >
                <div className="flex flex-col items-center justify-center text-center group-hover:text-white">
                  <div className="mb-4 text-primary group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h2 className="text-lg font-bold mb-2">{item.title}</h2>
                  {item.title === t('contact.email') ? (
                    <a
                      href={`mailto:${item.content}`}
                      className="text-sm hover:underline"
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
      </section>

      {/* Form Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">
            {t('contact.get_in_touch')}
          </h2>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2">
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-2xl rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder={t('contact.name_placeholder')}
                    className={`w-full p-3 border rounded-lg text-black ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                  <input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    placeholder={t('contact.email_placeholder')}
                    className={`w-full p-3 border rounded-lg text-black ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder={t('contact.number_placeholder')}
                    className="w-full p-3 border rounded-lg text-black"
                  />

                  <input
                    {...register("subject", { required: "Subject is required" })}
                    type="text"
                    placeholder={t('contact.subject_placeholder')}
                    className={`w-full p-3 border rounded-lg text-black ${errors.subject ? 'border-red-500' : ''}`}
                  />
                  {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                </div>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  placeholder={t('contact.message_placeholder')}
                  rows={5}
                  className={`w-full p-3 mt-4 border rounded-lg text-black ${errors.message ? 'border-red-500' : ''}`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

                <button
                  type="submit"
                  className="w-full px-6 py-3 mt-6 bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold rounded-2xl hover:opacity-90 transition-opacity duration-300"
                >
                  {t('contact.submit')}
                </button>
              </form>
            </div>

            {/* Map Section */}
            <div className="w-full lg:w-1/2">
              <div className="h-[410px] rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14599.241897333992!2d90.41001779011839!3d23.82533761273339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1727014318933!5m2!1sen!2sbd"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">{t('contact.dhaka_location')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/path/to/your/cta-background.jpg')`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="bg-white bg-opacity-90 rounded-lg p-12 max-w-4xl mx-auto">
            <p className="text-primary text-lg text-center mb-4 font-semibold tracking-wider">
              {t('rentYourCar')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
              {t('contact.interested_renting')}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {t('contact.dont_hesitate')}
            </p>
            <div className="flex justify-center">
              <button 
                onClick={handleChatClick}
                className="px-10 py-4 bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300"
              >
                {t('Chat with us')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add debug info */}
      <div className="hidden">Chat Modal State: {isChatOpen ? 'Open' : 'Closed'}</div>
      
      <ChatModal 
        isOpen={isChatOpen} 
        setIsOpen={setIsChatOpen} 
      />
    </div>
  );
};

export default Contact;
