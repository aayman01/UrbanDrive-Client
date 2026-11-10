import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { VerifiedShieldSVG } from "./Common/SVG/FeatureBadges";

const FaqSection: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: `${t("a2")}.` },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
    { q: t("q7"), a: t("a7") },
    { q: t("q8"), a: t("a8") },
    { q: t("q9"), a: t("a9") },
    { q: t("q10"), a: t("a10") },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass-pill px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50/70 border border-teal-200/50 mb-3">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Help & Clarity</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t("faqTitle")}
        </h2>
        <p className="mt-2 text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
          Everything you need to know about reserving, driving, and returning with UrbanDrive
        </p>
      </div>

      {/* Accordion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              onClick={() => toggleFaq(index)}
              className={`rounded-2xl glass-card p-5 cursor-pointer transition-all duration-300 border ${
                isOpen
                  ? "border-teal-400 bg-white/90 shadow-glass-glow"
                  : "border-white/60 hover:border-teal-200 hover:bg-white/75"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-bold text-slate-800">
                  {faq.q}
                </h3>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "bg-teal-500 text-white rotate-180" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed animate-fadeIn">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
