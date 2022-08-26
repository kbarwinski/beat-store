import styled from "styled-components";

export const CheckoutListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  font-family: "Rubik";
`;

export const CheckoutItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: center;
  width: 80%;
`;

export const CheckoutContainer = styled.div`
  width: 60%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TotalsSpan = styled.span`
  width: 40%;
  color: white;
  border: 1px solid #111;
  font-size: 1.5vmax;
  display: flex;
  justify-content: center;
`;

export const CheckoutButton = styled.button`
  width: 40%;
  height: 100%;
  padding: 10px;
  border-radius: 8%;
  background-color: #ffffff;
  font-size: 1.5vmax;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: lightgray;
  }
`;
