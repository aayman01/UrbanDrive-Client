import React, { useEffect, useState } from 'react';
import { MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import slide1 from "../../assets/slides/slide1.jpg";
import ChatModal from './ChatModal';
import { VerifiedShieldSVG, InstantBookingSVG } from '../../Components/Common/SVG/FeatureBadges';
import AmbientGlow from '../../Components/Common/SVG/AmbientGlow';

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
    { icon: <MdEmail className="w-6 h-6 text-teal-600" />, title: t('contact.email'), content: 'info@urbandrive.com' },
    { icon: <MdLocationOn className="w-6 h-6 text-rose-500" />, title: t('contact.address'), content: 'Dhaka, Bangladesh' },
    { icon: <MdAccessTime className="w-6 h-6 text-amber-500" />, title: 'Opening Hours', content: 'Mon-Sun: 8 AM - 7 PM' },
    { icon: <FaPhone className="w-5 h-5 text-sky-500" />, title: t('contact.phone'), content: '+880 1234 567890' },
  ];

  interface IFormInputs {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const response = await axiosPublic.post('/contact', data);
      if (response.status === 200) {
        toast.success('Message sent successfully!');
        reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleChatClick = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="relative overflow-hidden">
      <AmbientGlow variant="subtle" />

      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6 pb-12">
        <div
          className="relative rounded-3xl overflow-hidden h-[42vh] flex items-center justify-center bg-cover bg-center border border-white/40 shadow-glass-lg"
          style={{ backgroundImage: `url(${slide1})` }}
        >
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="relative z-10 text-center px-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 glass-pill px-3 py-1 rounded-full text-xs font-bold text-teal-300 bg-teal-950/60 border border-teal-500/30 mb-3">
              <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-400" />
              <span>We're Here For You 24/7</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {t('contact.heading')}
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base">
              {t('contact.description')}
            </p>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-10 relative z-20">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl p-5 glass-dock bg-white/90 shadow-glass border border-white/60 hover:-translate-y-1 transition-transform duration-300 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mx-auto mb-3 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                {item.title}
              </h3>
              {item.title === t('contact.email') ? (
                <a href={`mailto:${item.content}`} className="text-sm font-extrabold text-slate-800 hover:text-teal-600 transition-colors">
                  {item.content}
                </a>
              ) : (
                <p className="text-sm font-extrabold text-slate-800">{item.content}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl glass-card p-6 sm:p-10 border border-white/60 shadow-glass-lg">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t('contact.get_in_touch')}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Send us a message or inquiry and our team will get back to you within 2 business hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Your Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder={t('contact.name_placeholder')}
                    className="w-full h-11 px-3.5 glass-input rounded-xl text-sm text-slate-800"
                  />
                  {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder={t('contact.email_placeholder')}
                    className="w-full h-11 px-3.5 glass-input rounded-xl text-sm text-slate-800"
                  />
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder={t('contact.number_placeholder')}
                    className="w-full h-11 px-3.5 glass-input rounded-xl text-sm text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Subject
                  </label>
                  <input
                    {...register("subject", { required: "Subject is required" })}
                    type="text"
                    placeholder={t('contact.subject_placeholder')}
                    className="w-full h-11 px-3.5 glass-input rounded-xl text-sm text-slate-800"
                  />
                  {errors.subject && <p className="text-xs text-rose-500 mt-1">{errors.subject.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Message Details
                </label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  placeholder={t('contact.message_placeholder')}
                  rows={4}
                  className="w-full p-3.5 glass-input rounded-xl text-sm text-slate-800 resize-none"
                />
                {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {t('contact.submit')}
              </button>
            </form>

            {/* Map Frame */}
            <div className="space-y-3">
              <div className="h-[360px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <iframe
                  title="UrbanDrive Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14599.241897333992!2d90.41001779011839!3d23.82533761273339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1727014318933!5m2!1sen!2sbd"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-slate-500 text-center font-medium">
                {t('contact.dhaka_location')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Trigger CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="rounded-3xl glass-dock bg-white/90 p-8 sm:p-12 shadow-glass-lg border border-white/60">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
            <InstantBookingSVG className="w-4 h-4 text-teal-600" />
            <span>Instant Host & Support Assist</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {t('contact.interested_renting')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-lg mx-auto">
            {t('contact.dont_hesitate')}
          </p>
          <button
            onClick={handleChatClick}
            className="px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all transform hover:-translate-y-0.5"
          >
            {t('Chat with us')}
          </button>
        </div>
      </section>

      <ChatModal isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default Contact;
