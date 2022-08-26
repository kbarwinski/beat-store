import styled from "styled-components";
import ReactSlider from "react-slider";

export const PlayerBarContainer = styled.div`
  height: 5vmax;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  z-index: 3;
`;

export const PlayerContainer = styled.div`
  width: 0%;
  height: 100%;
  position: absolute;
`;

export const PlayerButtonsContainer = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const SliderContainer = styled.div`
  height: 100%;
  width: 35%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: 0px;
  color: white;
  font-size: 2.5vmax;
  cursor: pointer;
  transition: 200ms ease-out;
  &:hover {
    color: darkgray;
  }
`;

export const StyledToggleButton = styled(StyledButton)`
  color: ${(props) => (props.toggleColor ? "darkgray" : "white")};
  &:hover {
    color: ${(props) => (props.toggleColor ? "darkgray" : "white")};
  }
`;

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 2.5vmax;
`;

export const StyledThumb = styled.div`
  height: 2.5vmax;
  line-height: 2.5vmax;
  width: 2.5vmax;
  text-align: center;
  background-color: #aaa;
  color: #363636;
  border-radius: 50%;
  cursor: grab;
  content-visibility: hidden;
`;

export const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) => (props.index === 1 ? "#222222" : "#CCC")};
  border-radius: 999px;
`;
