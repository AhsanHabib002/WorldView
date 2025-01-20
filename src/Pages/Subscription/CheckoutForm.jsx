import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const CheckoutForm = () => {
    const {user}=useAuth();
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { state } = useLocation();
  const { subscriptionPeriod, price } = state;
  const [clientSecret, setClientSecret] = useState(null);
  useEffect(() => {
    if (price) {
      const initializePayment = async () => {
        try {
          const response = await axiosSecure.post("/create-payment-intent", {
            price,
          });
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          console.error("Error initializing payment:", error);
          alert("Failed to initialize payment. Please try again.");
        }
      };

      initializePayment();
    }
  }, [price, axiosSecure]);

  const handleSubscriptionUpdate = async () => {
    try {
      const response = await axiosSecure.put("/users/subscribe", {
        email: user.email,
        subscriptionPeriod,
      });

      if (response.data.message) {
        alert("Subscription activated!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      alert("Failed to update subscription.");
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }
  
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
  
    // Confirm the payment using the clientSecret
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });
  
    if (error) {
      console.error("Payment failed:", error.message);
      alert("Payment failed: " + error.message);
      return;
    }
  
    if (paymentIntent.status === "succeeded") {
      alert("Payment successful!");
      await handleSubscriptionUpdate();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn bg-black text-white my-4"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
