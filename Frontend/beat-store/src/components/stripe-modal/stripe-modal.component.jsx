import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
} from "@stripe/react-stripe-js";

import { useDispatch, useSelector } from "react-redux";

import {
  StyledModal,
  TitleSpan,
} from "./stripe-modal.styles";

import { toggleStripeClose } from "../../store/modal/cartmodal.slice";
import StripeForm from "../stripe-form/stripe-form.component";

const StripeModal = (props) => {
  const dispatch = useDispatch();
  const { isStripeOpen, modalItem } = useSelector((state) => state.cartModal);
  const totals = useSelector((state) => state.cart.totals);

  const stripePromise = loadStripe(
    "pk_test_51LYCwjHebKHjLO5YJr3xONCuNYK6kFAPNaZpCzsNBNYfO1Ap1SShqtr06f8bBbCOtvJnW7jwjd9F4vHtj6LJsZjx008bXw2Qw9"
  );

  const stripeOptions = {
    clientSecret: modalItem.clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorText: "#fff",
        colorBackground: "#000",
      },
    },
  };

  function closeModalHandler(e) {
    dispatch(toggleStripeClose());
  }

  return (
    <StyledModal
      isOpen={isStripeOpen}
      onBackgroundClick={closeModalHandler}
      onEscapeKeydown={closeModalHandler}
      allowScroll={true}
    >
      <TitleSpan>{"Finalize Payment: " + totals + "$"}</TitleSpan>
      <Elements stripe={stripePromise} options={stripeOptions}>
        <StripeForm />
      </Elements>
    </StyledModal>
  );
};

export default StripeModal;
