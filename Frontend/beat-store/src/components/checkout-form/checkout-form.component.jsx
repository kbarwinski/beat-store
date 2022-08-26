import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import {
  StyledCheckoutButton,
  StyledCheckoutForm,
  StyledCheckoutContainer,
  StyledInputContainer,
} from "./checkout-form.styles";
import OrderRequest from "../../requests/Order/order-requests";
import { toggleStripeOpen } from "../../store/modal/cartmodal.slice";

const CheckoutForm = (props) => {
  const name = useRef("");
  const mail = useRef("");
  const confirmMail = useRef("");
  const { cartItems } = props;

  const dispatch = useDispatch();

  const alert = useAlert();

  function validateInput(formData) {
    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }

    if (formData.name.length <= 2) throw Error("Name too short!");

    if (!isValidEmail(formData.mail)) throw Error("E-mail not valid!");

    if (formData.mail !== formData.confirmMail)
      throw Error("E-mails do not match!");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: name.current.value,
      mail: mail.current.value,
      confirmMail: confirmMail.current.value,
    };

    try {
      validateInput(formData);
      const response = await OrderRequest.GetClientSecret({
        name: formData.name,
        email: formData.mail,
        orderItems: cartItems.map((item) => {
          return { audioItemId: item.id, licenseType: item.licenseType };
        }),
      });
      console.log(response);
      dispatch(toggleStripeOpen(response));
    } catch (error) {
      alert.show(error.message);
    }
  };
  return (
    <StyledCheckoutContainer>
      <StyledCheckoutForm onSubmit={handleSubmit}>
        <StyledInputContainer placeholder="Name" type="text" ref={name} />

        <StyledInputContainer
          placeholder="E-mail address"
          type="email"
          ref={mail}
        />

        <StyledInputContainer
          placeholder="Confirm e-mail address"
          type="email"
          ref={confirmMail}
        />

        <StyledCheckoutButton>Checkout with Stripe</StyledCheckoutButton>
      </StyledCheckoutForm>
    </StyledCheckoutContainer>
  );
};
export default CheckoutForm;
