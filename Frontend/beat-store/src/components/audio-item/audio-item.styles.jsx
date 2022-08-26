import styled from "styled-components";

export const AudioItemContainer = styled.div`
  margin-top: 2vh;
  margin-bottom: 2vh;
  width: 80%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  font-size: 1.8vmin;
  font-family: "Rubik";
  user-select: none;
`;

export const ImageInfoContainer = styled.div`
  width: 10vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid white;
`;

export const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
`;

export const PlayOverlay = styled.div`
  width: 100%;
  height: 9vh;
  top: 0;
  position: absolute;
  font-size: 5vh;
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(10, 10, 10, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const BPMSpan = styled.span`
  width: 100%;
  height: 20%;
  top: 80%;
  position: absolute;
  font-size: 1.5vh;
  font-weight: 700;
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AudioInfoContainer = styled.div`
  padding-left: 7px;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const TitleSpan = styled.span`
  padding: 3px;
  font-size: 2em;
  color: white;
`;

export const AuthorSpan = styled.span`
  padding: 3px;
  font-size: 1.5em;
  color: lightgray;
`;

export const TagsContainer = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
`;

export const TagSpan = styled.span`
  font-size: 0.5em;
  font-weight: 600;
  overflow: hidden;
  border-radius: 25%;
  padding: 2px;
  margin: 1px;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  justify-content: center;
`;

export const ButtonInfoContainer = styled.div`
  width: 20%;
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
  font-size: 1.25em;
  font-weight: 500;
  color: white;
`;

export const StyledButton = styled.button`
  width: 80%;
  height: 80%;
  padding: 10px;
  border-radius: 15%;
  background-color: #ffffff;
  font-size: 2em;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: lightgray;
  }
`;
