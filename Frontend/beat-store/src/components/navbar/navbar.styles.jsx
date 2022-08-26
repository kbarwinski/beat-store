import styled from "styled-components";

export const NavbarContainer = styled.div`
  height: 5vmax;
  font-family: "Pacifico";
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  z-index: 3;
  pointer-events: none;
  -webkit-tap-highlight-color: transparent;
`;

export const LogoContainer = styled.div`
  height: 100%;
  width: auto;
  padding-left: 30px;
  font-weight: 400;
  font-size: 2vmax;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  animation: flicker 5s infinite;
  pointer-events: all;

  @keyframes flicker {
    0%,
    18%,
    22%,
    25%,
    53%,
    57%,
    100% {
      text-shadow: 0 0 3px #fff, 0 0 5px #fff, 0 0 11px #fff, 0 0 22px #ff00ff,
        0 0 42px #ff00ff, 0 0 47px #ff00ff, 0 0 52px #ff00ff, 0 0 65px #ff00ff;
    }
    20%,
    24%,
    55% {
      text-shadow: none;
    }
  }
`;

export const LinksContainer = styled.div`
  width: 50%;
  padding-right: 30px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const LinkContainer = styled.div`
  cursor: pointer;
  direction: row;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  color: white;
  font-size: 3vmax;
  padding-left: px;
  padding-right: 15px;
  transition: 200ms ease-out;
  &:hover {
    color: darkgray;
  }
`;
