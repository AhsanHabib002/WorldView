import { useParams } from "react-router-dom";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ArticleDetail = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const { data, isLoading, error } = useQuery({
    queryKey: ["articleDetail", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    const ViewCount = async () => {
      await axiosSecure.patch(`/articles/${id}/updateviews`);
    };

    if (id) {
      ViewCount();
    }
  }, [id, axiosSecure]);

  if (isLoading)
    return <span className="loading loading-spinner loading-lg"></span>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="max-w-[850px] mx-auto">
      <div className="my-10">
        <h2 className="text-4xl font-bold font-cinzel">{data.title}</h2>
      </div>
      <div>
        <img
          className="w-full max-h-[300px] object-cover"
          src={data.image}
          alt=""
        />
        <div className="my-4">
          <p className="text-[18px] font-medium">
            Tags:{" "}
            {data.tags.map((tag, index) => (
              <div key={index} className="badge badge-outline mx-2">
                #{tag}
              </div>
            ))}
          </p>
        </div>
        <div className="my-4">
          <p className="font-bold">
            Publsiher:{" "}
            <span className="font-normal ml-2">{data.publisher}</span>
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold text-[20px]">Description:</span>{" "}
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
