import axios from 'axios';

// Create an axios instance
const axiosPublic = axios.create({
  // baseURL: "https://urban-driveserver.vercel.app",
  baseURL:"http://localhost:5000"
});

// Custom Hook to return the axios instance
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
