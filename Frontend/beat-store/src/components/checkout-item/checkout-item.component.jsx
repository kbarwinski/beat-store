import {
  CheckoutItemContainer,
  CheckoutInfoContainer,
  AuthorSpan,
  TitleSpan,
  PricesContainer,
  PriceSpan,
  ButtonInfoContainer,
  StyledButton,
} from "./checkout-item.styles";

import { GrPowerCycle } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

import { useDispatch } from "react-redux";

import { removeFromCart, switchLicense } from "../../store/cart/cart.slice";

const CheckoutItem = (props) => {
  const { id, title, author, leasePrice, exclusivePrice, licenseType } = props;

  const dispatch = useDispatch();
  return (
    <CheckoutItemContainer>
      <CheckoutInfoContainer>
        <TitleSpan>{title}</TitleSpan>
        <AuthorSpan>{author}</AuthorSpan>
      </CheckoutInfoContainer>

      <PricesContainer>
        <PriceSpan>
          {licenseType === "lease"
            ? "Lease: " + leasePrice + "$"
            : "Exclusive: " + exclusivePrice + "$"}
        </PriceSpan>
      </PricesContainer>

      <ButtonInfoContainer>
        <StyledButton onClick={() => dispatch(switchLicense(id))}>
          <GrPowerCycle />
        </StyledButton>
        <StyledButton onClick={() => dispatch(removeFromCart(id))}>
          <AiOutlineDelete />
        </StyledButton>
      </ButtonInfoContainer>
    </CheckoutItemContainer>
  );
};
export default CheckoutItem;
