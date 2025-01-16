import useArticles from "../../Hooks/useArticles";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { FaRegEye } from "react-icons/fa";

const Trending = () => {
  const [articles] = useArticles();
  const topViewedArticles = articles
        .sort((a, b) => b.views - a.views)
        .slice(0, 6);                   
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {topViewedArticles.map((article) => (
          <SwiperSlide key={article._id}>
            <div>
              <div className="card rounded-none border-[1px] border-black bg-base-100 w-96 ">
                <figure >
                  <img className="h-[250px] w-full object-cover"
                    src={article.image}
                  />
                </figure>
                <div className="p-4 flex flex-col gap-4">
                  <h2 className="card-title">
                    {article.title}
                    <div className="badge"><FaRegEye />
                    {article.views}</div>
                  </h2>
                  <p>{article.short_description}</p>
                  <div className="card-actions justify-end">
                    {
                        article.tags.map((tag, index) =><div key={index} className="badge badge-outline">#{tag}</div> )
                    }
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Trending;
