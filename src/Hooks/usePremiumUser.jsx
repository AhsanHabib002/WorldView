import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const usePremiumUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userPremium, isLoading } = useQuery({
    queryKey: ["userPremium", user?.email],
    queryFn: async () => {
      if (!user?.email) return { isPremium: false };
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  return { userPremium, isLoading  };
};

export default usePremiumUser;
