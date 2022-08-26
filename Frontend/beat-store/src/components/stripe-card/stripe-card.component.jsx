import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(255, 255, 255)",
      color: "rgb(255, 255, 255)",
      fontSize: "3.5vmax",
      fontFamily: '"Rubik", sans-serif',
      fontSmoothing: "antialiased",
      backgroundColor: "#090909",
      "::placeholder": {
        color: "#ffffff",
      },
    },
    invalid: {
      color: "#fe2331",
      ":focus": {
        color: "#878787",
      },
    },
  },
};

const StripeCard = () => {
  return <CardElement options={CARD_ELEMENT_OPTIONS} />;
};

export default StripeCard;
