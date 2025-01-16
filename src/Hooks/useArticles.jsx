import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useArticles = () => {
  const axiosPublic = useAxiosPublic();
  const {refetch, data: articles = [] } = useQuery({
    queryKey: ["article"],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles");
      return res.data;
    },
  });
  return [articles,refetch];
};

export default useArticles;
