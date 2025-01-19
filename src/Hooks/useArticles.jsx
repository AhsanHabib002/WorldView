import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useArticles = (filters = {}) => {
  const axiosPublic = useAxiosPublic();
  const {refetch, data: articles = [], isLoading, isError } = useQuery({
    queryKey: ["article",filters],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles",{ params: filters });
      return res.data;
    },
    keepPreviousData: true,
  });
  return [articles,refetch, isLoading, isError];
};

export default useArticles;
