import styled from "styled-components";
import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  width: auto;
  height: 80vh;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  background-color: rgb(10, 10, 10);
  font-size:2vmax;
  border: 1px solid #111111;
`;

export const CrudFormContainer = styled.form`
  height: 100%;
  width: 30vw;
  border: 1px solid #222;
  background-color: #111;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: "Rubik";
`;

export const CrudLabelContainer = styled.label`
  height: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: tight;
`;

export const CrudInputContainer = styled.input`
  font-size: 0.75em;
  margin-top: 5px;
  width: 100%;
`;

export const CrudLabelText = styled.span`
  font-size: 0.75em;
  font-weight: 600;
`;

export const CrudSubmitContainer = styled.input`
  padding: 10px;
  width: 90%;
  font-size: 1em;
  font-weight: 700;
`;
