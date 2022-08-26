import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAlert } from "react-alert";
import {
  StripeFormContainer,
  StyledCheckoutButton,
} from "./stripe-form.styles";

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const alert = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/order",
      },
    });

    if ({ error }) {
      alert.show(error.message);
    }
  };

  return (
    <StripeFormContainer onSubmit={handleSubmit}>
      <PaymentElement />
      <StyledCheckoutButton disabled={!stripe}>Submit</StyledCheckoutButton>
    </StripeFormContainer>
  );
};

export default StripeForm;
