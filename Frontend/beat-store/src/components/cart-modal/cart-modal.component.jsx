import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Collapsible from "react-collapsible";
import "./modal-collapsible.scss";

import {
  StyledModal,
  TitleContainer,
  SelectionContainer,
  ButtonContainer,
  StyledButton,
  StyledInfoList,
  StyledInfoItem,
} from "./cart-modal.styles";

import { addToCart } from "../../store/cart/cart.slice";
import { toggleCartClose } from "../../store/modal/cartmodal.slice";

import { LicenseInfo } from "../../constants/license-info";

const CartModal = (props) => {
  const dispatch = useDispatch();
  const { isCartOpen, modalItem } = useSelector((state) => state.cartModal);

  function closeModalHandler(e) {
    dispatch(toggleCartClose());
  }

  //State variable to disallow selection of lease and exclusive license at once
  const [isLeaseSelected, setIsLeaseSelected] = useState(null);

  function handleLeaseSelect() {
    setIsLeaseSelected(true);
  }

  function handleExclusiveSelect() {
    setIsLeaseSelected(false);
  }

  //Dispatching cart item to cart state. Adds a new prop to audio item which specifies the client's selected license.
  function addToCartHandler() {
    let licenseType = isLeaseSelected ? "lease" : "exclusive";
    dispatch(
      addToCart({
        ...modalItem,
        licenseType: licenseType,
      })
    );
    dispatch(toggleCartClose());
  }

  return (
    <StyledModal
      isOpen={isCartOpen}
      onBackgroundClick={closeModalHandler}
      onEscapeKeydown={closeModalHandler}
      allowScroll={true}
    >
      <TitleContainer>
        <span>Select License</span>
      </TitleContainer>

      <SelectionContainer>
        <Collapsible
          open={isLeaseSelected === true}
          trigger={"Lease: " + modalItem.leasePrice + "$"}
          classParentString="ModalCollapsible"
          transitionCloseTime={400}
          handleTriggerClick={handleLeaseSelect}
        >
          <StyledInfoList>
            {LicenseInfo.lease.map((info) => {
              return <StyledInfoItem key={info}>{info}</StyledInfoItem>;
            })}
          </StyledInfoList>
        </Collapsible>

        <Collapsible
          open={isLeaseSelected === false}
          trigger={"Exclusive: " + modalItem.exclusivePrice + "$"}
          classParentString="ModalCollapsible"
          transitionCloseTime={400}
          handleTriggerClick={handleExclusiveSelect}
        >
          <StyledInfoList>
            {LicenseInfo.exclusive.map((info) => {
              return <StyledInfoItem key={info}>{info}</StyledInfoItem>;
            })}
          </StyledInfoList>
        </Collapsible>
      </SelectionContainer>

      <ButtonContainer>
        <StyledButton
          onClick={addToCartHandler}
          disabled={isLeaseSelected === null}
        >
          Add to cart
        </StyledButton>
      </ButtonContainer>
    </StyledModal>
  );
};

export default CartModal;
