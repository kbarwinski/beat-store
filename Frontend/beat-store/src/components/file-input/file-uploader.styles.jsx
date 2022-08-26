import styled from "styled-components";

export const FileUploaderContainer = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const FileInputContainer = styled.input`
  width: 50%;
  height: 100%;
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
