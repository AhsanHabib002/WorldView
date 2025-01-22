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
      <div className="text-black my-8">
        <h1 className="font-cinzel font-extrabold text-[7vw] lg:text-[6vw] text-center">
          All Trending News
        </h1>
      </div>
      {/* trending Articles */}
      <div>
        <Trending></Trending>
      </div>
      {/* Publisher */}
      <div className="my-20">
        <h2 className="text-xl mb-10 md:text-6xl font-bold text-center font-cinzel">
          All Publishers
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {publishers.map((publisher) => (
            <div key={publisher._id} className="card image-full shadow-xl">
              <figure className="w-full h-[150px] object-cover">
                <img
                  className="w-full h-[150px] object-cover"
                  src={publisher.publisher_logo}
                  alt="Shoes"
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
      {/* Plan */}
      <div className="my-8  p-6 rounded">
        <h2 className="text-xl font-cinzel mb-10 md:text-6xl font-bold text-center">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-4 mt-4">
          <div className="card-body rounded-md bg-black text-white">
            <h2 className="card-title">Free Plan</h2>
            <p className="font-bold text-[18px]">$0</p>
            <ul className="">
              <li>Access to normal Article</li>
              <li>Limited articles per month</li>
            </ul>
            <div className="card-actions ">
              <button
                onClick={handleSubscription}
                className="btn btn-primary w-full mt-4"
              >
                update subscription
              </button>
            </div>
          </div>

          <div className="card-body bg-yellow-500 text-black">
            <h2 className="card-title">Premium Plan</h2>
            <p className="font-bold text-[18px]">$5-$100</p>
            <ul className="">
              <li>Access to premium Article</li>
              <li>Unlimited articles per month</li>
            </ul>
            <div className="card-actions ">
              <button
                onClick={handleSubscription}
                className="btn btn-primary w-full mt-4"
              >
                update subscription
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="my-10">
        <h2 className="text-xl text-center mb-10 md:text-6xl font-cinzel font-bold">
          Total User In worldView
        </h2>

        {/*  */}
        <div className="bg-black text-white py-12 px-6 rounded-xl flex justify-around items-center">
          <div className="text-center mx-4">
            <h2 className="text-4xl font-bold ">
              <CountUp end={totalUserCount} duration={7.5} />
            </h2>
            <p className="text-lg mt-2">Users worldwide</p>
          </div>
          <div className="text-center mx-4">
            <h2 className="text-4xl font-bold">
              <CountUp end={normalUserCount} duration={7.5} s />
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
      {/* Extra Sections */}
      <div className=" flex flex-col justify-center items-center gap-4 md:flex-row">
        <div className="flex-1 p-10 items-center ">
          <h2 className="text-xl md:text-5xl lg:text-8xl font-cinzel font-bold">
            Why Read WorldView Daily?
          </h2>
        </div>
        <div className="flex-1">
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                World Updated Instantly
              </div>
              <div className="collapse-content">
                <p>
                  In worldView you will be able to read all the latest news
                  instantly
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Add Article in worldView
              </div>
              <div className="collapse-content">
                <p>
                  If you create an account in worldVIew you can also add article
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Monitoring article view
              </div>
              <div className="collapse-content">
                <p>
                  In worldView article you will be able to see the how many user
                  read the article{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={gradientRef}
        className="py-8 px-6 rounded-lg shadow-lg text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Want to be a subscriber?
        </h2>
        <Link to="/subscription">
          <button className="bg-black text-white  font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
            Subscribe Now
          </button>
        </Link>
      </div>

      {/* modal */}
      {showModal && (
        <div className="z-10 fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white relative p-6 rounded-lg shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              aria-label="Close Modal"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Unlock Premium Features!</h2>
            <p className="mb-4">
              Enjoy exclusive premium content by subscribing to our service.
            </p>
            <button
              className="btn bg-black text-white w-full"
              onClick={handleSubscription}
            >
              Subscribe Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
