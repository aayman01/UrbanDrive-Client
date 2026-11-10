import React, { useState } from "react";
import bgimg from "../../../assets/ladingpage.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import UrbanDriveLogo from "../../../Components/Common/SVG/UrbanDriveLogo";
import AmbientGlow from "../../../Components/Common/SVG/AmbientGlow";

type Inputs = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: string;
};

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { createUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
          role: "User",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully signed up",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location.state ? location.state : "/");
          }
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Registration failed",
          text: "Email may already be in use.",
        });
      });
  };

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then(async (result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "User",
        };
        await axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully signed up with Google",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location.state ? location.state : "/");
          }
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 py-16">
      <AmbientGlow variant="hero" />

      <div className="relative z-10 w-full max-w-4xl rounded-3xl glass-dock bg-white/85 shadow-glass-lg border border-white/60 overflow-hidden flex flex-col md:flex-row">
        {/* Form Container */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <UrbanDriveLogo size={34} textColor="text-slate-900" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-4">
              Create an account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Join UrbanDrive for instant rentals and car sharing
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full h-10 px-3.5 rounded-xl glass-input text-sm text-slate-800"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-xs text-rose-500 mt-0.5 block">Full name is required</span>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full h-10 px-3.5 rounded-xl glass-input text-sm text-slate-800"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-xs text-rose-500 mt-0.5 block">Email is required</span>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
                  className="w-full h-10 px-3.5 pr-10 rounded-xl glass-input text-sm text-slate-800"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-rose-500 mt-0.5 block">
                  Password must be between 6 and 20 characters
                </span>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  className="w-full h-10 px-3.5 pr-10 rounded-xl glass-input text-sm text-slate-800"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-xs text-rose-500 mt-0.5 block">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                required
                id="terms"
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 cursor-pointer">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 mt-2"
            >
              Sign Up
            </button>
          </form>

          {/* Social login divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative px-3 text-xs font-semibold text-slate-400 bg-white/70 backdrop-blur-md rounded-full">
              or continue with
            </span>
          </div>

          <button
            onClick={handleGoogleLogIn}
            type="button"
            className="w-full h-10 rounded-xl glass-pill hover:bg-white text-xs font-bold text-slate-700 border border-slate-200 flex items-center justify-center gap-2.5 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <p className="mt-4 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-teal-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        {/* Right side showcase */}
        <div className="relative hidden md:block md:w-1/2 overflow-hidden bg-slate-900">
          <img
            src={bgimg}
            alt="UrbanDrive preview"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-8 inset-x-8 glass-dock bg-white/80 p-5 rounded-2xl shadow-glass border border-white/40">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
              Join 50,000+ Drivers
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              Your next adventure begins with one tap.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
