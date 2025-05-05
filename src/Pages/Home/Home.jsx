import { Link, useNavigate } from "react-router-dom";
import usePublishers from "../../Hooks/usePublishers";
import Trending from "./Trending";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useArticles from "../../Hooks/useArticles";
import "./home.css";
import { gsap } from "gsap";
import t1 from "../../assets/t1.jpg";
import t2 from "../../assets/t2.jpg";
import t3 from "../../assets/t3.jpg";
import t4 from "../../assets/t4.jpg";
import news from "../../assets/newsform.png";

const Home = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const gradientRef = useRef(null);
  const { publishers, refetch, isLoading, isError } = usePublishers();
  const [articles] = useArticles();
  const [showModal, setShowModal] = useState(false);

  const handleSubscription = () => {
    navigate("/subscription");
  };

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users/home");
      return response.data;
    },
  });

  const [normalUserCount, setNormalUserCount] = useState(0);
  const [premiumUserCount, setPremiumUserCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (Array.isArray(users)) {
      const normalUsers = users.filter((user) => !user.premiumTaken);
      const premiumUsers = users.filter((user) => user.premiumTaken);

      setNormalUserCount(normalUsers.length);
      setPremiumUserCount(premiumUsers.length);
      setTotalUserCount(users.length);
    }
  }, [users]);

  useEffect(() => {
    const gradient = gradientRef.current;

    gsap.to(gradient, {
      background: "linear-gradient(90deg, #7e5bef, #ec4899, #6366f1)",
      backgroundSize: "300% 300%",
      backgroundPosition: "0% 0%",
      duration: 8,
      backgroundPositionX: "300%",
      ease: "linear",
      repeat: -1,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!users || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Hero */}
      <div className="my-8">
        <h1 className="font-cinzel font-extrabold text-[7vw] lg:text-[6vw] text-center">
          All Trending News
        </h1>
      </div>

      {/* Trending Articles */}
      <div className="pb-[90px]">
        <Trending />
      </div>

      {/* Publishers */}
      <div className="py-[60px] md:py-[90px]">
        <h2 className="text-xl mb-10 md:text-6xl font-bold text-center font-cinzel">
          All Publishers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[60px] md:mt-[90px]">
          {publishers.map((publisher) => (
            <div key={publisher._id} className="card image-full shadow-xl">
              <figure className="w-full h-[150px] object-cover">
                <img
                  className="w-full h-[150px] object-cover"
                  src={publisher.publisher_logo}
                  alt="Publisher"
                />
              </figure>
              <div className="card-body flex items-center justify-center">
                <h2 className="card-title text-center">
                  {publisher.publisher_name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="py-20">
  <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-center mb-16">
    Choose Your Plan
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
    {/* Free Plan */}
    <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-semibold mb-2">Free Plan</h3>
        <p className="text-3xl font-bold text-black mb-4">$0
          <span className="text-sm font-normal text-gray-500"> / month</span>
        </p>
        <ul className="space-y-3 mb-6 text-gray-700">
          <li>✅ Access to normal Articles</li>
          <li>✅ Limited articles per month</li>
        </ul>
      </div>
      <button
        onClick={handleSubscription}
        className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition mt-4"
      >
        Get Started
      </button>
    </div>

    {/* Premium Plan */}
    <div className="bg-yellow-300 text-black shadow-lg rounded-2xl p-8 border-2 border-yellow-500 transform scale-[1.02] hover:scale-105 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-semibold">Premium Plan</h3>
          <span className="bg-black text-white text-xs px-3 py-1 rounded-full">Popular</span>
        </div>
        <p className="text-3xl font-bold mb-4">$5 - $100
          <span className="text-sm font-normal text-black"> / month</span>
        </p>
        <ul className="space-y-3 mb-6">
          <li>✅ Access to premium Articles</li>
          <li>✅ Unlimited articles per month</li>
          <li>✅ Priority support</li>
        </ul>
      </div>
      <button
        onClick={handleSubscription}
        className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition mt-4"
      >
        Upgrade to Premium
      </button>
    </div>
  </div>
</div>


      {/* Stats */}
      <div className="py-[60px] md:py-[90px]">
        <h2 className="text-xl text-center mb-10 md:text-6xl font-cinzel font-bold">
          Total Users in WorldView
        </h2>
        <div className="bg-black text-white py-12 px-6 rounded-xl flex justify-around items-center mt-[60px] md:mt-[90px]">
          <div className="text-center mx-4">
            <h2 className="text-4xl font-bold">
              <CountUp end={totalUserCount} duration={7.5} />
            </h2>
            <p className="text-lg mt-2">Users worldwide</p>
          </div>
          <div className="text-center mx-4">
            <h2 className="text-4xl font-bold">
              <CountUp end={normalUserCount} duration={7.5} />
            </h2>
            <p className="text-lg mt-2">Normal users</p>
          </div>
          <div className="text-center mx-4">
            <h2 className="text-4xl font-bold">
              <CountUp end={premiumUserCount} duration={7.5} />
            </h2>
            <p className="text-lg mt-2">Premium users</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-[60px] md:py-[90px]">
        <h2 className="text-xl text-center mb-10 md:text-6xl font-cinzel font-bold">
          Community Thoughts
        </h2>
        <div className="mt-[60px] md:mt-[90px] grid grid-cols-1 md:grid-cols-2 gap-6">
          {[t1, t2, t3, t4].map((img, idx) => {
            const names = [
              "Jone Babu",
              "David S",
              "Rahul Ambani",
              "Kuddos Kamal",
            ];
            const reviews = [
              "WORLDVIEW has become my go-to news website! The daily updates keep me informed about important global events in real time...",
              "Finally, a news platform that provides unbiased and well-researched news! WORLDVIEW does an excellent job...",
              "I appreciate the effort WORLDVIEW puts into keeping the world informed. The site's daily updates ensure...",
              "WORLDVIEW is more than just a news website; it’s a platform where information flows freely and efficiently...",
            ];
            return (
              <div key={idx} className="bg-white shadow-md p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <img
                    className="w-[120px] h-[120px] object-cover rounded-full shrink-0"
                    src={img}
                    alt="testimonial"
                  />
                  <div className="flex flex-col gap-4">
                    <h3 className="font-medium text-[26px]">{names[idx]}</h3>
                    <p className="italic">{reviews[idx]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why WorldView */}
      <div className="flex flex-col justify-center items-center gap-4 md:flex-row py-[60px] md:py-[90px]">
        <div className="flex-1 p-10 items-center">
          <h2 className="text-xl md:text-5xl lg:text-8xl font-cinzel font-bold">
            Why Read WorldView Daily?
          </h2>
        </div>
        <div className="flex-1">
          <div className="join join-vertical w-full">
            {[
              {
                title: "World Updated Instantly",
                content:
                  "In WorldView, you will be able to read all the latest news instantly.",
              },
              {
                title: "Add Articles in WorldView",
                content:
                  "If you create an account in WorldView, you can also add articles.",
              },
              {
                title: "Monitor Article Views",
                content:
                  "In WorldView, you can see how many users read an article.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="collapse collapse-arrow join-item border-base-300 border"
              >
                <input
                  type="radio"
                  name="my-accordion-4"
                  defaultChecked={idx === 0}
                />
                <div className="collapse-title text-xl font-medium">
                  {item.title}
                </div>
                <div className="collapse-content">
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestion Form */}
      <div className="py-[60px] md:py-[90px] px-4">
        <h2 className="font-cinzel text-xl font-bold md:text-6xl text-center mb-12">
          Any Suggestions for WorldView?
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <img
              src={news}
              alt="suggestion"
              className="w-full rounded-2xl max-h-[350px] object-cover"
            />
          </div>
          <form className="flex-1 bg-white shadow-md p-8 rounded-lg space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Your Suggestion"
              rows={5}
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              Submit Suggestion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
