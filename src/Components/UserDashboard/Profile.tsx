/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { LuCheckCircle } from "react-icons/lu";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";
import Navbar from "../Navbar";
import Footer from "../Footer";
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
type Reviews = {
  id: string; // or number, depending on your data
  user: string;
  rating: number;
  comment: string;
  _id: any;
};

const Profile: React.FC = () => {
  // const { user }: { user: Partial<User> | null } = useAuth();
  const { user, loading } = useAuth() as {
    user: User | null;
    loading: boolean;
  };
  // const { user ,setUser} = useAuth();
  const axiosPublic = useAxiosPublic();
  // console.log('user:', user);
  const [isEditing, setIsEditing] = useState(false);
  // const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [language, setLanguage] = useState<string>(user?.language || "");
  const [work, setWork] = useState<string>(user?.work || "");
  const [link, setLink] = useState<string>(user?.link || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [photoURL, setPhotoURL] = useState("");
  const [reviews, setReviews] = useState<Reviews[]>([]);
  // const [ setError] = useState<string>("");

  const {
    data: userdata, // Corrected line with comma
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["userdata", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const response = await axiosPublic.get(`/user/${user?.email}`);
      return response.data;
    },
  });
  // console.log(userdata)

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    } as const; // short month, numeric day, and numeric year
    return date.toLocaleDateString("en-US", options); // Format the date
  };

  const joinDate = user?.metadata?.creationTime
    ? formatJoinDate(user.metadata.creationTime)
    : "";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axiosPublic.post(image_hosting_api, formData);
        const uploadedImageUrl = res.data.data.display_url;
        setPhotoURL(uploadedImageUrl);
      } catch {
        // console.error("Image upload failed:", error);
        toast.error("Image upload failed");
      }
    }
  };

  const handleSave = async () => {
    const uploadedImageUrl = photoURL || user?.photoURL;
    const updatedUser = {
      photoURL: uploadedImageUrl,
      language,
      work,
      email: user?.email,
      link,
      phone,
    };

    try {
      await axiosPublic.put("/user/profile", { updateData: updatedUser });
      // setUser(response.data);
      toast.success("User profile updated successfully");
      setIsEditing(false);
    } catch {
      // console.error("Error updating user profile:", error);
      toast.error("Failed to update user profile");
    }
  };
  useEffect(() => {
    const getReviewsByUserId = async () => {
      if (!user) return; // Check if user is logged in
      try {
        const response = await axiosPublic.get(`/review/${user.email}`);
        setReviews(response.data); // Set the retrieved reviews to state
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          console.warn("No reviews found for this user");
        // } else {
        //   setError("Failed to load reviews");
        //   console.error("Error fetching reviews:", axiosError);
        }
      }
    };
    getReviewsByUserId();
  }, [user]);

  console.log("review:", reviews);

  const handleCancel = () => {
    setIsEditing(false);
  };
  // if (loading) {
  //     return (
  //         <div className="min-h-screen flex items-center justify-center">
  //             <SyncLoader color="#593cfb" size={10} /> {/* লোডিং স্পিনার */}
  //         </div>
  //     );
  // }

  // if (isLoading) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center">
  //         <SyncLoader color="#593cfb" size={10} />
  //       </div>
  //     );
  //   }

  //   // Fetching state spinner
  //   if (isFetching) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center">
  //         <SyncLoader color="#593cfb" size={10} />
  //       </div>
  //     );
  //   }
  //       console.log('User photoURL:', user?.photoURL);
  // console.log('Userdata photoURL:', userdata?.photoURL);
  if (loading || isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={10} />
      </div>
    );
  }

  if (!userdata) {
    return <div>No user data available.</div>;
  }
  return (
    <div>
      <Navbar></Navbar>

      <div className="container mx-auto p-2 lg:p-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mx-auto">
          <div className="">
            <div className="relative ">
              {userdata?.photoURL ? (
                <img
                  src={userdata?.photoURL}
                  className="rounded-full  w-32 h-32"
                  alt=""
                />
              ) : (
                <img
                  src={user?.photoURL}
                  className="rounded-full  w-32 h-32"
                  alt=""
                />
              )}

              {!isEditing && (
                <button
                  className="bg-primary pt-2 pb-2 pl-3 pr-3 rounded-lg text-white absolute bottom-2 left-12 transform translate-x-1/2 translate-y-1/2"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
            {isEditing ? (
              <div>
                <label htmlFor="photoURL" className="cursor-pointer">
                  <div className="p-2 bg-blue-700  rounded-lg text-center text-white w-[200px] mt-2">
                    Change Profile Picture
                  </div>
                </label>
                <input
                  type="file"
                  id="photoURL"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {photoURL && (
                  <img
                    src={photoURL}
                    alt="Profile Preview"
                    className="mt-4 rounded-full w-32 h-32"
                  />
                )}
              </div>
            ) : (
              <div></div>
            )}

            <h1 className="text-4xl font-lato font-bold lg:mt-7">
              {user?.displayName}
            </h1>

            <h3>Joined {joinDate}</h3>
            <div className="mt-6 space-y-2 w-2/3 ">
              {" "}
              {/* Use space-y-4 for vertical spacing */}
              <h2 className="uppercase font-semibold text-slate-500 text-sm">
                Verified info
              </h2>
              <div className="flex justify-between items-center text-lg">
                <h2>Email address</h2>
                <span className="text-green-600 text-2xl">
                  <LuCheckCircle />
                </span>
              </div>
              {isEditing && (
                <div>
                  <div className="flex flex-col mt-3">
                    <label htmlFor="phone" className="ml-1 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="input input-bordered w-full max-w-xs border-gray-600 text-gray-800 rounded-lg p-3 h-12 focus:outline-none"
                    />
                  </div>
                </div>
              )}
              <h3 className="text-slate-500 font-lato text-xs">
                Build trust with other users on UrbanDrive by verifying your
                contact information.
              </h3>
              {userdata?.phone && (
                <p>
                  Phone:
                  <a
                    href={`tel:${userdata.phone}`}
                    className="text-blue-600 underline ml-2"
                  >
                    {userdata.phone}
                  </a>
                </p>
              )}
              {userdata?.language && <p>Language: {userdata?.language}</p>}
              {userdata?.work && <p>Work: {userdata?.work}</p>}
              {isEditing ? (
                <div>
                  <div className="flex flex-col">
                    <label htmlFor="lives" className="ml-1 mb-2">
                      Work
                    </label>
                    <input
                      type="text"
                      id="lives"
                      value={work}
                      onChange={(e) => setWork(e.target.value)}
                      placeholder="Where do you live?"
                      className="input input-bordered w-full max-w-xs border-gray-600 text-gray-800  rounded-lg p-3 h-12 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col mt-3">
                    <label htmlFor="language" className="ml-1 mb-2">
                      Language
                    </label>
                    <input
                      type="text"
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder="Enter spoken languages"
                      className="input input-bordered w-full max-w-xs border-gray-600 text-gray-800  rounded-lg p-3 h-12 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            {/* Profile details */}
          </div>
          <div className="lg:pt-24">
            {isEditing ? (
              <div>
                <h1 className="uppercase text-slate-500 text-sm font-lato font-semibold tracking-wider">
                  About {user?.displayName},
                </h1>

                <h3 className="mt-3">
                  Tell hosts and guests about yourself and why you’re a
                  responsible, trustworthy person. Share your favorite travel
                  experiences, your hobbies, your dream car, or your driving
                  experience. Feel free to include links to your LinkedIn,
                  Twitter, or Facebook profiles so they get to know you even
                  better.
                </h3>
                <textarea
                  placeholder="Bio"
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="textarea textarea-bordered mt-2 textarea-md w-full max-w-xs"
                ></textarea>
              </div>
            ) : (
              <div></div>
            )}
            <h1 className="uppercase text-slate-500 text-sm font-lato font-semibold tracking-wider">
              About {user?.displayName},
            </h1>

            {userdata?.link &&
              (Array.isArray(userdata.link) ? (
                userdata.link.length > 0 && (
                  <ul>
                    {userdata.link.map((link: string, index: number) => (
                      <li key={index}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <a
                  href={userdata.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {userdata.link}
                </a>
              ))}

            <h2 className="uppercase text-slate-500 text-sm font-lato font-semibold lg:mt-4">
              Reviews from hosts
            </h2>
            <div className="flex gap-5 mt-3">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id}>
                    <h2 className="text-black font-semibold">
                      {review.comment}
                    </h2>
                    <Link
                      to={`/reviews/${review._id}`}
                      className="text-blue-500 underline"
                    >
                      View Review
                    </Link>
                  </div>
                ))
              ) : (
                <>
                  {userdata?.photoURL ? (
                    <img
                      src={userdata.photoURL}
                      className="rounded-full w-32 h-32"
                      alt="User Profile"
                    />
                  ) : (
                    <img
                      src={user?.photoURL}
                      className="rounded-full w-32 h-32"
                      alt="User Profile"
                    />
                  )}
                  <div>
                    <div className="rating rating-sm">
                      <input
                        type="radio"
                        name="rating-9"
                        className="mask mask-star-2"
                      />
                      <input
                        type="radio"
                        name="rating-9"
                        className="mask mask-star-2"
                      />
                      <input
                        type="radio"
                        name="rating-9"
                        className="mask mask-star-2"
                      />
                      <input
                        type="radio"
                        name="rating-9"
                        className="mask mask-star-2"
                      />
                      <input
                        type="radio"
                        name="rating-9"
                        className="mask mask-star-2"
                      />
                      <input
                        type="radio"
                        name="rating-9"
                        className="mask mask-star-2"
                      />
                    </div>
                    <h2 className="text-black font-semibold">No reviews yet</h2>
                    <h2>
                      {user?.displayName} hasn’t received a review on UrbanDrive
                      yet.
                    </h2>
                  </div>
                </>
              )}
            </div>

            {isEditing ? (
              <div className="flex gap-5 justify-end lg:mt-36 ">
                <button
                  onClick={handleSave}
                  className="bg-primary pt-2 pb-2 pl-3 pr-3 rounded-lg text-white"
                >
                  Save change
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-primary pt-2 pb-2 pl-3 pr-3 rounded-lg text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Profile;
