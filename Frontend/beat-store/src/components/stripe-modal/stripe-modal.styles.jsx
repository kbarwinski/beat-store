import styled from "styled-components";
import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  width: auto;
  height: auto;
  padding:50px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  background-color: rgb(10, 10, 10);
  font-size:2vmax;
  border: 1px solid #111111;
  font-family:'Rubik';
`;

export const TitleSpan = styled.span`
  width: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  padding-bottom: 1.5rem;

  color: white;
`;
