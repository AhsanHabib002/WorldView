import useArticles from "../../Hooks/useArticles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaRegEye } from "react-icons/fa";

const Trending = () => {
  const [articles] = useArticles();

  const topViewedArticles = articles
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  return (
    <div className="py-10 px-4 md:px-10 ">
      
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {topViewedArticles.map((article) => (
          <SwiperSlide key={article._id}>
            <div className="rounded-xl backdrop-blur shadow-lg border border-gray-200 transition-transform transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden max-w-sm mx-auto">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex flex-col justify-between h-[280px]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                      {article.title}
                    </h3>
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                      <FaRegEye /> {article.views}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">{article.short_description}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
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
