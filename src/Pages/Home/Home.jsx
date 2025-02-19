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
      <div className=" my-8">
        <h1 className="font-cinzel font-extrabold text-[7vw] lg:text-[6vw] text-center">
          All Trending News
        </h1>
      </div>
      {/* trending Articles */}
      <div className="pb-[90px]">
        <Trending></Trending>
      </div>
      {/* Publisher */}
      <div className="py-[60px] md:py-[90px]">
        <h2 className="text-xl mb-10 md:text-6xl font-bold text-center font-cinzel">
          All Publishers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  mt-[60px] md:mt-[90px]">
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
      <div className="py-[60px] md:py-[90px]">
        <h2 className="text-xl font-cinzel mb-10 md:text-6xl font-bold text-center">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 gap-4 mt-[60px] md:mt-[90px]">
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

          <div className="card-body rounded-md bg-yellow-500 text-black">
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
      <div className="py-[60px] md:py-[90px]">
        <h2 className="text-xl text-center mb-10 md:text-6xl font-cinzel font-bold">
          Total User In worldView
        </h2>

        {/*  */}
        <div className="bg-black text-white py-12 px-6 rounded-xl flex justify-around items-center mt-[60px] md:mt-[90px]">
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
      {/* Testimonial */}
      <div className="py-[60px] md:py-[90px]">
        <div>
          <h2 className="text-xl text-center mb-10 md:text-6xl font-cinzel font-bold">
            Community Thoughts
          </h2>
          <div className="mt-[60px] md:mt-[90px] grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* testi-1 */}
            <div className="bg-white shadow-md p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <img
                  className="w-[120px] h-[120px] object-cover rounded-full shrink-0"
                  src={t1}
                  alt=""
                />

                <div className="flex flex-col gap-4">
                  <h3
                    className="font-medium
                     text-[26px]"
                  >
                    Jone Babu
                  </h3>

                  <p className="italic">
                    "WORLDVIEW has become my go-to news website! The daily
                    updates keep me informed about important global events in
                    real time. I love the clean interface, and the ability to
                    add publishers and articles makes it even more engaging.
                    Highly recommended for anyone who values accurate and
                    up-to-date news!"
                  </p>
                </div>
              </div>
            </div>
            {/* testi-2 */}
            <div className="bg-white shadow-md p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <img
                  className="w-[120px] h-[120px] object-cover rounded-full shrink-0"
                  src={t2}
                  alt=""
                />

                <div className="flex flex-col gap-4">
                  <h3
                    className="font-medium
                     text-[26px]"
                  >
                    David S
                  </h3>

                  <p className="italic">
                    "Finally, a news platform that provides unbiased and
                    well-researched news! WORLDVIEW does an excellent job of
                    covering a wide range of topics, from politics to
                    technology. The ability to add publishers and contribute
                    articles makes it a truly interactive space for news lovers
                    like me!"
                  </p>
                </div>
              </div>
            </div>
            {/* testi-3 */}
            <div className="bg-white shadow-md p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <img
                  className="w-[120px] h-[120px] object-cover rounded-full shrink-0"
                  src={t3}
                  alt=""
                />

                <div className="flex flex-col gap-4">
                  <h3
                    className="font-medium
                     text-[26px]"
                  >
                    Rahul Ambani
                  </h3>

                  <p className="italic">
                    "I appreciate the effort WORLDVIEW puts into keeping the
                    world informed. The site's daily updates ensure that I never
                    miss out on important news. The feature that allows users to
                    add their own publishers and articles makes it a dynamic and
                    community-driven platform!"
                  </p>
                </div>
              </div>
            </div>
            {/* testi-4*/}
            <div className="bg-white shadow-md p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <img
                  className="w-[120px] h-[120px] object-cover rounded-full shrink-0"
                  src={t4}
                  alt=""
                />

                <div className="flex flex-col gap-4">
                  <h3
                    className="font-medium
                     text-[26px]"
                  >
                    Kuddos Kamal
                  </h3>

                  <p className="italic">
                    "WORLDVIEW is more than just a news website; it’s a platform
                    where information flows freely and efficiently. The
                    user-friendly interface, well-structured articles, and the
                    ability to engage with different publishers make it stand
                    out. It’s refreshing to see a news website that values both
                    accuracy and accessibility!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Extra Sections */}
      <div className=" flex flex-col justify-center items-center gap-4 md:flex-row py-[60px] md:py-[90px]">
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

      {/* Suggestion form */}
      <div className="py-[60px] md:py-[90px]">
        <div>
          <h2 className="font-cinzel text-xl font-bold md:text-6xl">
            Any Suggestion for World View?
          </h2>
        </div>
        <div className="rounded-t-[45px] bg-[#F3F3F3] mt-[30px] md:mt-[90px] py-[30px] md:py-[60px] md:pl-[60px]">
          <div className="flex flex-col md:flex-row justify-end">
            {/* form Content */}
            <div className="flex-1">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    placeholder="Write your questions.."
                    className="textarea textarea-bordered textarea-lg w-full"
                  ></textarea>
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-black text-white">Submit</button>
                </div>
              </form>
            </div>
            {/* form image */}
            <div className="flex-1 flex justify-end">
              <img className="max-h-[450px]" src={news} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={gradientRef}
        className=" px-6 rounded-lg shadow-lg text-center py-[60px] md:py-[90px] my-[60px] md:my-[90px]"
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
      {/* {showModal && (
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
      )} */}
    </div>
  );
};

export default Home;
