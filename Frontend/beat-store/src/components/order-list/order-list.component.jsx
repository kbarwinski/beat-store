import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import OrderRequest from "../../requests/Order/order-requests";
import OrderItem from "../order-item/order-item.component";
import { OrderListContainer } from "./order-list.styles";

const OrderList = () => {
  const [orderItems, setOrderItems] = useState([]);
  const orderId = new URLSearchParams(window.location.search).get("orderid");
  const alert = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await OrderRequest.GetOrderAudioItems(orderId);
        console.log(data);
        setOrderItems(data);
      } catch (error) {
        alert.show(error.response.data);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrderListContainer>
      {orderItems.map((orderItem) => {
        return <OrderItem key={orderItem.id} {...orderItem} />;
      })}
    </OrderListContainer>
  );
};

export default OrderList;
