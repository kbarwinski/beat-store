import styled from "styled-components";

export const StripeFormContainer = styled.form`
  height: 100%;
  width: auto;
  padding: 10px;
  border: 1px solid #222;
  background-color: #111;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: "Rubik";
`;

export const StyledCheckoutButton = styled.button`
  width: 40%;
  height: 25%;
  border-radius: 8%;
  margin-top: 3%;
  background-color: #ffffff;
  font-size: 2.5vmin;
  font-family: "Rubik";
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;
