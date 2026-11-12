/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FiCheck, FiLoader } from "react-icons/fi";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useTranslation } from "react-i18next";

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
    <div className="min-h-screen bg-gradient-to-b from-white to-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4 font-Playfair">
            {t("choose_membership_plan")}
          </h1>
          <p className="text-text max-w-2xl mx-auto">
            {t("Select the perfect membership plan that suits your needs and enjoy exclusive benefits")}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <FiLoader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membershipdata.map((membership: any) => {
              const isPopular = membership.price === 700
              
              return (
                <div 
                  key={membership._id} 
                  className={`relative overflow-hidden rounded-2xl bg-white border transition-all duration-300
                    ${isPopular 
                      ? 'border-secondary shadow-lg scale-105 hover:shadow-xl' 
                      : 'border-gray-200 hover:shadow-lg hover:border-secondary'
                    }`}
                >
                  {isPopular && (
                    <div className="absolute top-4 right-4 bg-secondary text-white text-sm px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold text-primary">
                        {t(`${membership.planName}`)}
                      </h2>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold text-secondary">
                        <span className="text-3xl text-slate-700 font-semibold mr-2">BDT</span>
                          {membership.price}
                        </span>
                        
                        <span className="text-text">/{t("month")}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text text-center border-b pb-6">
                      {t(`membership.${membership.description}`)}
                    </p>

                    {/* Features */}
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <FiCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-text">
                          {membership.discount} {t("discount")}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <FiCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-text">{t("tissueFree")}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <FiCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-text">
                          {t("cardamage_responsibility")}: {membership.carDamageResponsibility}
                        </span>
                      </li>
                    </ul>

                    {/* Special Offer */}
                    {membership.specialOffer && (
                      <div className="bg-background p-4 rounded-lg">
                        <p className="text-sm font-bold text-primary">
                          {t("special_offer")}: {membership.specialOffer}
                        </p>
                      </div>
                    )}

                    {/* Additional Services */}
                    {membership.additionalServices && (
                      <div className="space-y-3">
                        <h3 className="font-bold text-primary">
                          {t("additional_services")}:
                        </h3>
                        <ul className="space-y-3">
                          {Object.entries(membership.additionalServices).map(([key, value]) => (
                            <li key={key} className="flex items-start gap-3">
                              <FiCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                              <span className="text-text">{String(value)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0">
                    <Link
                      to={`/membership-duration/${membership.planName}/${membership.price}`}
                      className="block w-full"
                    >
                      <button 
                        className={`w-full py-3 px-4 rounded-lg font-bold transition-colors duration-300 
                          ${isPopular 
                            ? 'bg-secondary text-white hover:bg-accent' 
                            : 'bg-background text-primary hover:bg-accent hover:text-white'
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
      </div>
    </div>
  );
};

export default Membership;
