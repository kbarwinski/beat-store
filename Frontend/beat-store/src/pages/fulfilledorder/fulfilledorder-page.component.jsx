import OrderList from "../../components/order-list/order-list.component";
import { Spacer } from "../../components/spacer/spacer.styles";
import { FulfilledOrderPageContainer } from "./fulfilledorder-page.styles";

const FulfilledOrderPage = (props) => {
  return (
    <FulfilledOrderPageContainer>
      <Spacer height="6vmax" />
      <OrderList/>
      <Spacer height="6vmax" />
    </FulfilledOrderPageContainer>
  );
};

export default FulfilledOrderPage;
