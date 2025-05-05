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
    <div className="min-h-screen mt-28 md:mt-36 px-4 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 transition-all">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            Upgrade to Premium
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Enjoy exclusive access to premium content. Choose a plan that fits your needs.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subscription Period
            </label>
            <select
              className="select select-bordered w-full"
              value={subscriptionPeriod}
              onChange={handleSubscriptionChange}
            >
              <option value="" disabled>
                Choose a plan
              </option>
              {subscriptionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} — ${option.price}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg hover:from-purple-700 hover:to-indigo-700"
            onClick={handleSubscribe}
          >
            Proceed to Payment
          </button>
        </div>

        <div className="mt-8 text-sm text-center text-gray-400">
          Cancel anytime. No hidden fees.
        </div>
      </div>
    </div>
  );
};

export default Subscription;
