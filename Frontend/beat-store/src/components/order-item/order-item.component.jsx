import {
  OrderItemContainer,
  OrderInfoContainer,
  AuthorSpan,
  TitleSpan,
  ButtonInfoContainer,
  StyledButton,
  StyledAnchor,
} from "./order-item.styles";

import { AiOutlineDownload } from "react-icons/ai";

const OrderItem = (props) => {
  const { title, author, audioUrl } = props;

  return (
    <OrderItemContainer>
      <OrderInfoContainer>
        <TitleSpan>{title}</TitleSpan>
        <AuthorSpan>{author}</AuthorSpan>
      </OrderInfoContainer>

      <ButtonInfoContainer>
        <StyledAnchor href={audioUrl} download>
          <StyledButton>
            <AiOutlineDownload />
          </StyledButton>
        </StyledAnchor>
      </ButtonInfoContainer>
    </OrderItemContainer>
  );
};
export default OrderItem;
