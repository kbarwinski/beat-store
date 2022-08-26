import styled from "styled-components";

export const StyledCheckoutContainer = styled.div`
  width: 60%;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #040404;
  border: 1px solid #111;
  padding: 15px;
`;

export const StyledCheckoutForm = styled.form`
  width: 90%;
  height: 50vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const StyledInputContainer = styled.input`
  font-size: 1.5vmax;
  background-color: #111;
  color: white;
  width: 90%;
  height: 2vmax;
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
