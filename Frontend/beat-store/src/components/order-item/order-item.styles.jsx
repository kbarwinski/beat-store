import styled from "styled-components";

export const OrderItemContainer = styled.div`
  margin-top: 2vh;
  margin-bottom: 2vh;
  width: 70%;
  height: 5vmax;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
  border: 2px solid #1b1b1b;
  font-size: 0.7vmax;
  font-family: "Rubik";
`;

export const OrderInfoContainer = styled.div`
  padding-left: 7px;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TitleSpan = styled.span`
  padding: 3px;
  font-size: 2.2em;
  color: white;
`;

export const AuthorSpan = styled.span`
  padding: 3px;
  font-size: 1.8em;
  color: lightgray;
`;

export const ButtonInfoContainer = styled.div`
  width: 30%;
  height: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const PricesContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

export const PriceSpan = styled.span`
  font-size: 1.6em;
  font-weight: 500;
  color: white;
`;

export const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 15%;
  background-color: #ffffff;
  font-size: 3rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: lightgray;
  }
`;

export const StyledAnchor = styled.a`
  width:80%;
  height:80%;
  padding:10px;
`;
