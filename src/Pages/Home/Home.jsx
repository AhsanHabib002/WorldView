import { useNavigate } from "react-router-dom";
import usePublishers from "../../Hooks/usePublishers";
import Trending from "./Trending";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Home = () => {
  const navigate = useNavigate();
  const axiosSecure =useAxiosSecure();
  const { publishers, refetch, isLoading, isError } = usePublishers();
  const [showModal, setShowModal] = useState(false);
  const handleSubscription = () => {
    navigate("/subscription");
  };
  const { data: users } = useQuery({
    queryKey: ["users"], // Query key
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      console.log("API Response:", response.data);
      return response.data;
    },
  });
  const [normalUserCount, setNormalUserCount] = useState(0);
  const [premiumUserCount, setPremiumUserCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);
  useEffect(() => {
    if (users) {
        const normalUsers = users.filter(user => !user.premiumTaken);
      const premiumUsers = users.filter((user) => user.premiumTaken !== null);

      setNormalUserCount(normalUsers.length);
      setPremiumUserCount(premiumUsers.length);
      setTotalUserCount(users.length);
    }
  }, [users]);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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
      <div className="my-8">
        <h2 className="text-2xl font-bold text-center font-cinzel">
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
        <h2 className="text-2xl font-bold text-center">Choose Your Plan</h2>
        <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-4 mt-4">
          <div className="card-body bg-black text-white">
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
      <div className="flex felx-col justify-center items-center gap-4 md:flex-row">
        <h2 className="text-xl font-bold">Total User In worldView</h2>
      <div className="stats shadow my-8">
      <div className="stat place-items-center">
        <div className="stat-title">Total Users</div>
        <div className="stat-value">
          <CountUp end={totalUserCount} duration={1.5} />
        </div>
        <div className="stat-desc">All registered users</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Normal Users</div>
        <div className="stat-value text-secondary">
          <CountUp end={normalUserCount} duration={1.5} />
        </div>
        <div className="stat-desc text-secondary">Users without premium</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Premium Users</div>
        <div className="stat-value">
          <CountUp end={premiumUserCount} duration={1.5} />
        </div>
        <div className="stat-desc">Users with premium</div>
      </div>
    </div>
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
