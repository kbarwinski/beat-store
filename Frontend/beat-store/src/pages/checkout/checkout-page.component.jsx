import { useSelector } from "react-redux";
import { CheckoutPageContainer } from "./checkout-page.styles";
import { Spacer } from "../../components/spacer/spacer.styles";
import CheckoutList from "../../components/checkout-list/checkout-list.component";
import EmptyNotice from "../../components/empty-notice/empty-notice.component";

const CheckoutPage = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isCartEmpty = useSelector((state) => state.cart.cartItems.length === 0);

  return (
    <CheckoutPageContainer>
      <Spacer height="6vmax" />

      {!isCartEmpty ? (
        <CheckoutList cartItems={cartItems} />
      ) : (
        <EmptyNotice message="Cart is empty 😵" />
      )}

      <Spacer height="6vmax" />
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;
