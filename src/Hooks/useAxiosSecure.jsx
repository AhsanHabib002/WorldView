import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://worldview-daily-server.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");

      config.headers.authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    // async (error) => {
    //   const status = error.response.status;
    //   if (error.response && (status === 401 || status === 403)) {
    //     await logout();
    //     navigate("/login");
    //   }
    //   return Promise.reject(error);
    // }
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        
        const token = localStorage.getItem("access-token");
        if (!token) {
          await logout();
          navigate("/login");
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
