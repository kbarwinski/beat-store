import { useSelector } from "react-redux";
import CheckoutItem from "../checkout-item/checkout-item.component";
import CheckoutForm from "../checkout-form/checkout-form.component";
import { CheckoutItemsContainer, TotalsSpan } from "./checkout-list.styles";

const CheckoutList = (props) => {
  const { cartItems } = props;
  const totals = useSelector((state) => state.cart.totals);

  return (
    <CheckoutItemsContainer>
      {cartItems.map((m) => {
        return <CheckoutItem key={m.id} {...m}></CheckoutItem>;
      })}
      <TotalsSpan>{"Totals: " + totals + "$"}</TotalsSpan>
      <CheckoutForm cartItems={cartItems} />
    </CheckoutItemsContainer>
  );
};
export default CheckoutList;
