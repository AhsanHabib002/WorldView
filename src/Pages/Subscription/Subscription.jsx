import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Subscription = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [subscriptionPeriod, setSubscription] = useState("");
  const [price, setPrice] = useState(0);
  const subscriptionOptions = [
    { label: "1 Minute", value: 1, price: 5 },
    { label: "5 Days", value: 5 * 24 * 60, price: 50 },
    { label: "10 Days", value: 10 * 24 * 60, price: 150 },
  ];
  const handleSubscriptionChange = (e) => {
    const selectedOption = subscriptionOptions.find(
      (option) => option.value === parseInt(e.target.value)
    );
    setSubscription(selectedOption.value);
    setPrice(selectedOption.price);
  };
  const handleSubscribe = async () => {
    if (!subscriptionPeriod) {
      alert("Please select a subscription period.");
      return;
    }
    navigate("/payment", {
      state: { subscriptionPeriod, price },
    });
  };
  return (
    <div className="mt-[120px] md:mt-[160px]">
      <div className="my-10 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl text-center font-bold mb-4">
          Upgrade to Premium
        </h2>
        <p className="text-lg text-center">
          Enjoy exclusive features with our premium subscription. Choose a plan
          that suits your needs.
        </p>
      </div>
      <div>
        <div className="space-y-4">
          <label className="block text-lg font-medium">
            Select Subscription Period
          </label>
          <select
            className="input input-bordered w-full"
            value={subscriptionPeriod}
            onChange={handleSubscriptionChange}
          >
            <option value="" disabled>
              Select a subscription period
            </option>
            {subscriptionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} - ${option.price}
              </option>
            ))}
          </select>

          <button
            className="btn bg-purple-500 text-white w-full mt-6"
            onClick={handleSubscribe}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
