import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaChevronDown,
  FaEnvelope,
  FaShieldAlt,
  FaHeart,
  FaBullseye,
  FaBook,
} from "react-icons/fa";

const AboutUs = () => {
  const { t } = useTranslation();
  const teamMembers = [
    { name: t("Adnan"), role: t("Member") },
    { name: t("Aayman"), role: t("Member") },
    { name: t("Roksana"), role: t("Member") },
    { name: t("Nayeem"), role: t("Member") },
    { name: t("Ansari"), role: t("Member") },
  ];
  const coreValues = [
    {
      title: t("core_values.values.integrity"),
      icon: FaShieldAlt,
      description: t("core_values.description", { value: t("core_values.values.integrity") }),
    },
    {
      title: t("core_values.values.trust"),
      icon: FaHeart,
      description: t("core_values.description", { value: t("core_values.values.trust") }),
    },
    {
      title: t("core_values.values.honesty"),
      icon: FaBullseye,
      description: t("core_values.description", { value: t("core_values.values.honesty") }),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-700">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-semibold text-white mb-6 font-Playfair tracking-wider">
            {t("about_us.title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-Merri">
            {t("about_us.description")}
          </p>
          <FaChevronDown className="w-10 h-10 text-white animate-bounce mx-auto mt-12" />
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 border-b-2 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-semibold text-gray-900 mb-6 font-Playfair tracking-wide">
              {t("vision.title")}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-Merri">
              {t("vision.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 border-b-2">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 font-Playfair">
            {t("team.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-48 h-48 mx-auto mb-6 relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 transform group-hover:scale-105 group-hover:opacity-90 transition-all duration-500" />
                  <img
                    src={`/api/placeholder/192/192`}
                    alt={member.name}
                    className="absolute inset-2 rounded-full object-cover border-4 border-white"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 border-b-2 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-16 font-Playfair">
      {t("core_values.title")}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {coreValues.map((value, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-md p-8 text-center group hover:shadow-2xl hover:scale-105 transition-all duration-500"
        >
          <value.icon className="w-12 h-12 mx-auto mb-6 text-blue-600 group-hover:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
          <p className="text-gray-600 leading-relaxed">{value.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Story Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FaBook className="w-16 h-16 mx-auto mb-8 opacity-80" />
            <h2 className="text-4xl font-bold mb-8 font-Playfair">{t("story.title")}</h2>
            <p className="text-xl leading-relaxed opacity-90 font-Merri">
              {t("story.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 font-Playfair">{t("get_in_touch.title")}</h2>
            <p className="text-xl text-gray-600 mb-8">{t("get_in_touch.description")}</p>
            <a
  href={`mailto:${t("get_in_touch.email")}`}
  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
>
  <FaEnvelope className="w-5 h-5" />
  <span>{t("get_in_touch.contact_button")}</span>
</a>


          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
