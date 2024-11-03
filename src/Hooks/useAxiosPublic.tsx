import axios from 'axios';

// Create an axios instance
const axiosPublic = axios.create({
  baseURL: "http://localhost:8000",
});

// Custom Hook to return the axios instance
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
