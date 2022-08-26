import styled from "styled-components";
import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  width: 90vw;
  height: auto;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  background-color: rgb(10, 10, 10);
  font-size:2vmax;
  border: 1px solid #111111;
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
  border-bottom: 1px solid #111111;
`;

export const SelectionContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 30%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLabel = styled.span`
  width: auto;
  font-size: 1.5em;
  color: white;
`;

export const StyledRadio = styled.input`
  width: 25px;
  height: 25px;
  padding: 15px;
  &:checked {
    background: #ff00ff;
  }
`;

export const StyledButton = styled.button`
  width: auto;
  padding: 10px;
  height: 100%;
  border-radius: 10%;
  background-color: #ffffff;
  font-size: 0.75em;
  cursor: pointer;
  transition: 300ms ease-out;

  &:hover {
    background-color: lightgray;
  }
`;

export const StyledInfoList = styled.ul`
  width: 100%;
  height: 20vh;
  font-size: 1.75vmax;
  background-color: #111111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid #222222;
  flex-wrap: wrap;
`;

export const StyledInfoItem = styled.li`
  padding: 10px;
  color: white;
`;
