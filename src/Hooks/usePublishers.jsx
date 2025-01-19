import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePublishers = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: publishers = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
    keepPreviousData: true,
  });

  return { publishers, refetch, isLoading, isError };
};

export default usePublishers;
