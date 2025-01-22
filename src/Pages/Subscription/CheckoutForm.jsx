import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const { user } = useAuth();
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
        Swal.fire({
          icon: "success",
          title: "Subscription Activated!",
          text: "You now have access to premium features.",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      
      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text: "There was an issue updating your subscription. Please try again.",
        confirmButtonText: "OK",
      });
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

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
        },
      }
    );

    if (error) {
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
