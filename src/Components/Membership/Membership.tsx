/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FiCheck, FiLoader } from "react-icons/fi";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useTranslation } from "react-i18next";
import { VerifiedShieldSVG, InstantBookingSVG } from "../Common/SVG/FeatureBadges";

const Membership = () => {
  const axiosPublic = useAxiosPublic();
  const { t } = useTranslation();

  const { data: membershipdata = [], isLoading } = useQuery({
    queryKey: ["memberships"],
    queryFn: async () => {
      const response = await axiosPublic.get("/memberships");
      return response.data;
    },
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 glass-pill px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50/70 border border-teal-200/50 mb-3">
          <InstantBookingSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Exclusive UrbanDrive Club</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t("choose_membership_plan")}
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
          {t("Select the perfect membership plan that suits your needs and enjoy exclusive benefits")}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[360px]">
          <FiLoader className="h-8 w-8 animate-spin text-teal-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {membershipdata.map((membership: any) => {
            const isPopular = membership.price === 700 || membership.planName?.toLowerCase().includes("gold") || membership.planName?.toLowerCase().includes("pro");

            return (
              <div
                key={membership._id}
                className={`relative rounded-3xl glass-card flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "border-2 border-teal-400 shadow-glass-glow lg:-translate-y-2 bg-white/85"
                    : "border border-white/60 shadow-glass hover:shadow-glass-lg"
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-sky-600 text-white text-xs font-black tracking-wide uppercase px-4 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Plan Header */}
                  <div className="text-center pb-6 border-b border-slate-200/60">
                    <h3 className="text-2xl font-black text-slate-900">
                      {t(`${membership.planName}`)}
                    </h3>
                    <div className="mt-4 flex items-baseline justify-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400 uppercase">BDT</span>
                      <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {membership.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/{t("month")}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 text-center">
                    {t(`membership.${membership.description}`) || "Enjoy premium priority fleet access, damage protection, and exclusive fuel credits."}
                  </p>

                  {/* Key Benefits */}
                  <ul className="space-y-3 pt-2">
                    <li className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                        <FiCheck className="w-3.5 h-3.5" />
                      </div>
                      <span>{membership.discount} {t("discount")}</span>
                    </li>
                    <li className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                        <FiCheck className="w-3.5 h-3.5" />
                      </div>
                      <span>{t("tissueFree")} & Refreshment Kit</span>
                    </li>
                    <li className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                        <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
                      </div>
                      <span>{t("cardamage_responsibility")}: {membership.carDamageResponsibility}</span>
                    </li>
                  </ul>

                  {/* Special Offer Box */}
                  {membership.specialOffer && (
                    <div className="p-3 rounded-2xl glass-pill bg-amber-50/70 border border-amber-200/60">
                      <p className="text-xs font-bold text-amber-800">
                        ★ {t("special_offer")}: {membership.specialOffer}
                      </p>
                    </div>
                  )}

                  {/* Additional Services */}
                  {membership.additionalServices && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("additional_services")}:
                      </h4>
                      <ul className="space-y-2">
                        {Object.entries(membership.additionalServices).map(([key, value]) => (
                          <li key={key} className="flex items-center gap-2 text-xs text-slate-600">
                            <span className="text-teal-500">✓</span>
                            <span>{String(value)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card CTA */}
                <div className="p-6 sm:p-8 pt-0">
                  <Link
                    to={`/membership-duration/${membership.planName}/${membership.price}`}
                    className="block w-full"
                  >
                    <button
                      className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md ${
                        isPopular
                          ? "bg-gradient-to-r from-teal-500 to-sky-600 text-white hover:from-teal-600 hover:to-sky-700 shadow-teal-500/25"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {t("buy_now")}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Membership;
