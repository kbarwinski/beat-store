import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Spacer } from "../../components/spacer/spacer.styles";
import { OrderPageContainer } from "./orderpage.styles";
import StripeStatus from "../../components/stripe-status/stripe-status.component";
const OrderPage = (props) => {
  const stripePromise = loadStripe(
    "pk_test_51LYCwjHebKHjLO5YJr3xONCuNYK6kFAPNaZpCzsNBNYfO1Ap1SShqtr06f8bBbCOtvJnW7jwjd9F4vHtj6LJsZjx008bXw2Qw9"
  );

  return (
    <OrderPageContainer>
      <Spacer height="6vmax" />
      <Elements stripe={stripePromise}>
        <StripeStatus />
      </Elements>
      <Spacer height="6vmax" />
    </OrderPageContainer>
  );
};

export default OrderPage;
