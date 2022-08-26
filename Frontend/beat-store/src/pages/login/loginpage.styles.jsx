import styled from "styled-components";

export const LoginPageContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: black;
  color: white;
  -webkit-tap-highlight-color: transparent;
  display: flexbox;
  align-items: center;
  justify-content: center;
  font-size: 1vmax;
`;

export const LoginFormContainer = styled.form`
  height: 40%;
  width: 30vmax;
  border: 1px solid #222;
  background-color: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: "Rubik";
`;

export const LoginLabelContainer = styled.label`
  height: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: tight;
`;

export const LoginInputContainer = styled.input`
  height: 2em;
  font-size:1.25em;
  margin-top: 5px;
  width: 100%;
`;

export const LoginLabelText = styled.span`
  font-size: 1.25em;
  font-weight: 600;
`;

export const LoginSubmitContainer = styled.input`
  padding: 10px;
  height: 3em;
  width: 90%;
  font-size: 1.5em;
  font-weight: 700;
`;
