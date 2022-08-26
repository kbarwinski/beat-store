import { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";

import EmptyNotice from "../empty-notice/empty-notice.component";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../store/cart/cart.slice";
const StripeStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emptyCart());
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(
            "Payment received! Please check your inbox for the download link."
          );
          break;

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [dispatch, stripe]);

  return <EmptyNotice message={message} />;
};

export default StripeStatus;
