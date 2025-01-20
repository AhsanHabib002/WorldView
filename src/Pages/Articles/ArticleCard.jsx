import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArticleCard = ({ article, user }) => {
    if (article.status !== "approved") {
        return null;
      }
  const isPremium = article.subscription === "premium";
  const hasPremiumAccess = user?.isPremium;
  return (
    <div>
      <div
        className={`card ${
          isPremium
            ? "bg-yellow-500 max-w-96 shadow-xl"
            : "bg-base-100 max-w-96 shadow-xl"
        }`}
      >
        <figure>
          <img
            className="w-full h-[200px] object-cover"
            src={article.image}
            alt={article.title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {article.title}
            <div className="badge bg-white">
              <FaRegEye />
              {article.views}
            </div>
          </h2>
          <p>{article.short_description}</p>
          <div className="card-actions justify-end">
            {isPremium ? (
              <div className="badge badge-outline">{article.subscription}</div>
            ) : (
              <></>
            )}
          </div>

          <div className="w-full">
            {isPremium ? (
              hasPremiumAccess ? (
                <Link to={`/articles/${article._id}`}>
                  <button className="btn bg-white text-black w-full">
                    Details
                  </button>
                </Link>
              ) : (
                <Link to={`/articles/${article._id}`}>
                  <button className="btn btn-disabled w-full" disabled>
                    Details
                  </button>
                </Link>
              )
            ) : (
              <Link to={`/articles/${article._id}`}>
                <button className="btn bg-black text-white w-full">
                  Details
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
