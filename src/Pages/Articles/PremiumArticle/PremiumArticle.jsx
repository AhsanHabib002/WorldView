import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

const PremiumArticle = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: premium = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["premium"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/premium");
      return res.data;
    },
  });
  if (isLoading)
    return <span className="loading loading-spinner loading-lg"></span>;
  return (
    <div>
      <div className="my-10">
        <h2 className="text-3xl font-bold">All Premium Articles: {premium.length}</h2>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premium.map((article) => (
            <div
              key={article._id}
              className="card bg-yellow-500 shadow-xl max-w-sm"
            >
              <figure>
                <img
                  className="w-full h-[200px] object-cover"
                  src={article.image}
                  alt={article.title}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-cinzel">
                  {article.title}{" "}
                  <div className="badge bg-white">
                    <FaRegEye />
                    {article.views}
                  </div>
                </h2>

                <p >{article.short_description}</p>
                <p className=""><span className="font-bold">Publisher: </span>{article.publisher}</p>
                <div>
                    <span className="font-bold">Tags</span>
                  <div className="flex flex-wrap mt-2">
                    {article.tags.map((tag, index) => (
                      <div key={index} className="badge badge-outline mr-2">
                        #{tag}
                      </div>
                    ))}{" "}
                  </div>
                </div>
                <div className="mt-4">
                  <Link to={`/articles/${article._id}`}>
                    <button className="btn bg-white text-black w-full">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumArticle;
