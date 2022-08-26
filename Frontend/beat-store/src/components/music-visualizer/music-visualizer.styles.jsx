import styled from "styled-components";

export const BarContainer = styled.div`
  height: 3vmax;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  background: linear-gradient(to top, rgba(50, 15, 50, 1), rgba(0, 0, 0, 0));

  z-index: 2;
`;

export const Bar = styled.div.attrs((props) => ({
  style: {
    height: props.height / 1.5 + "%",
    width: (1 / props.numOfBars) * 97 + "%",
    background: props.bg,
  },
}))`
  max-height: 150%;
`;
