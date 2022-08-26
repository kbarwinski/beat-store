import styled from "styled-components";

export const CrudPageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
`;

export const ButtonsContainer = styled.div`
  width: 80%;
  height: 6vmax;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 15px;
`;

export const StyledButton = styled.button`
  width: 10%;
  height: 80%;
  padding: 10px;
  border-radius: 15%;
  background-color: #ffffff;
  font-size: 3em;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: lightgray;
  }
`;
