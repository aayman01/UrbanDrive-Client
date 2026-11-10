import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { LuCheckCircle } from "react-icons/lu";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AmbientGlow from "../Common/SVG/AmbientGlow";
import { VerifiedShieldSVG } from "../Common/SVG/FeatureBadges";
import { FaUser, FaPhone, FaBriefcase, FaLanguage, FaPen, FaCamera, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

interface User {
  email: string;
  displayName: string;
  photoURL: string;
  language?: string;
  work?: string;
  link?: string;
  phone?: string;
  metadata?: {
    creationTime: string;
  };
  userId: string;
}

interface UserReview {
  _id: string;
  comment: string;
}

const Profile: React.FC = () => {
  const { user, loading } = useAuth() as {
    user: User | null;
    loading: boolean;
  };
  const axiosPublic = useAxiosPublic();
  const [isEditing, setIsEditing] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [work, setWork] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [photoURL, setPhotoURL] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [reviews, setReviews] = useState<UserReview[]>([]);

  const {
    data: userdata,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["userdata", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const response = await axiosPublic.get(`/user/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (userdata) {
      setLanguage(userdata.language || "");
      setWork(userdata.work || "");
      setLink(Array.isArray(userdata.link) ? userdata.link.join(", ") : userdata.link || "");
      setPhone(userdata.phone || "");
    }
  }, [userdata]);

  const formatJoinDate = (dateString?: string) => {
    if (!dateString) return "Recently joined";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const joinDate = user?.metadata?.creationTime
    ? formatJoinDate(user.metadata.creationTime)
    : "";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axiosPublic.post(image_hosting_api, formData);
        const uploadedImageUrl = res.data.data.display_url;
        setPhotoURL(uploadedImageUrl);
        toast.success("Profile photo uploaded!");
      } catch {
        toast.error("Image upload failed");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleSave = async () => {
    const uploadedImageUrl = photoURL || userdata?.photoURL || user?.photoURL;
    const updatedUser = {
      photoURL: uploadedImageUrl,
      phone,
      work,
      language,
      link,
    };

    try {
      await axiosPublic.patch(`/user/${user?.email}`, updatedUser);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetch();
    } catch {
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    const getReviewsByUserId = async () => {
      if (!user?.email) return;
      try {
        const response = await axiosPublic.get(`/review/${user.email}`);
        setReviews(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          // No reviews found
        }
      }
    };
    getReviewsByUserId();
  }, [user]);

  if (loading || isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <SyncLoader color="#0D9488" size={14} />
      </div>
    );
  }

  const currentAvatar = photoURL || userdata?.photoURL || user?.photoURL;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden font-poppins">
      <AmbientGlow />
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
              <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
              <span>Verified Account Credentials</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Member Profile
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your personal information, contact credentials, and verified public status
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
            >
              <FaPen className="w-3 h-3 text-teal-400" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Trust Credentials Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-5 group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-slate-100 flex items-center justify-center">
                {currentAvatar ? (
                  <img
                    src={currentAvatar}
                    alt={user?.displayName || "User avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="w-12 h-12 text-slate-300" />
                )}
              </div>

              {isEditing && (
                <label
                  htmlFor="photoUploadInput"
                  className="absolute bottom-0 right-0 p-2.5 rounded-2xl bg-teal-600 text-white shadow-md hover:bg-teal-700 cursor-pointer transition-colors"
                  title="Upload profile photo"
                >
                  <FaCamera className="w-4 h-4" />
                  <input
                    type="file"
                    id="photoUploadInput"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              )}
            </div>

            {uploadingImage && (
              <span className="text-xs font-bold text-teal-600 mb-3 animate-pulse">
                Uploading photo...
              </span>
            )}

            <h2 className="text-xl font-bold text-slate-900">{user?.displayName || "UrbanDrive Member"}</h2>
            <p className="text-xs text-slate-400 mt-0.5">Joined {joinDate || "Member"}</p>

            {/* Trust Pill */}
            <div className="w-full mt-6 pt-6 border-t border-slate-100 text-left space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Verification Badges
              </span>

              <div className="flex items-center justify-between p-3 rounded-xl bg-teal-50/60 border border-teal-100">
                <div className="flex items-center gap-2">
                  <LuCheckCircle className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-800">Email Verified</span>
                </div>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <VerifiedShieldSVG className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-800">Identity Status</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded-md">
                  Level 1 Renter
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Info & Bio Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-lg font-bold text-slate-900">Personal Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Information displayed to car hosts when confirming reservations
                </p>
              </div>

              {isEditing ? (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 1XXX-XXXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Profession / Work
                      </label>
                      <input
                        type="text"
                        value={work}
                        onChange={(e) => setWork(e.target.value)}
                        placeholder="e.g. Software Engineer, Doctor"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Spoken Languages
                      </label>
                      <input
                        type="text"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        placeholder="English, Bengali"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                        Social Link / Portfolio
                      </label>
                      <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium text-slate-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-500/20 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      <FaPhone className="w-3 h-3 text-teal-600" />
                      <span>Contact Phone</span>
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      {userdata?.phone || "Not provided"}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      <FaBriefcase className="w-3 h-3 text-teal-600" />
                      <span>Work & Profession</span>
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      {userdata?.work || "Not specified"}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      <FaLanguage className="w-3 h-3 text-teal-600" />
                      <span>Languages</span>
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      {userdata?.language || "English"}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      <VerifiedShieldSVG className="w-3 h-3 text-teal-600" />
                      <span>Social Profile</span>
                    </div>
                    <div className="text-sm font-bold text-teal-600 truncate">
                      {userdata?.link ? (
                        <a href={userdata.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {userdata.link}
                        </a>
                      ) : (
                        <span className="text-slate-400 font-normal">None linked</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Host Reviews Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Reviews From Hosts</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Feedback left by vehicle owners after completed trips</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold">
                  <FaStar className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>5.0 Star Renter</span>
                </div>
              </div>

              {reviews && reviews.length > 0 ? (
                <div className="space-y-3">
                  {reviews.map((rev) => (
                    <div key={rev._id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
                      <p className="text-sm text-slate-700 italic">"{rev.comment}"</p>
                      <Link to={`/reviews/${rev._id}`} className="text-xs font-bold text-teal-600 hover:underline flex-shrink-0 ml-4">
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 text-center">
                  <p className="text-xs font-semibold text-slate-500">
                    {user?.displayName || "You"} haven't received host reviews yet. Complete your first trip to build your driving profile!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
