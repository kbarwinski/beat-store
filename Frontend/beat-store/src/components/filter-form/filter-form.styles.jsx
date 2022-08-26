import styled from "styled-components";

import ReactSlider from "react-slider";
import Dropdown from "react-dropdown";

export const FilterFormContainer = styled.div`
  width: 99%;
  height: auto;
  border: 1px solid #363636;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  font-family: "Rubik";
  font-size: 2vmin;
`;

export const ButtonsContainer = styled.div`
  width: 70%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
`;

export const StyledButton = styled.button`
  width: 30%;
  height: 80%;
  border-radius: 10%;
  background-color: #ffffff;
  font-size: 1.5em;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

export const FiltersContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: sp;
  align-items: center;
  border: 1px solid #363636;
`;

export const FilterContainer = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const FilterFormLabel = styled.span`
  width: 5em;
  padding: 12px;
  height: 100%;
  font-size: 1.25em;
  color: #ffffff;
`;

export const FilterFormInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 3px;
  font-size: 1em;
`;

export const FilterDropdown = styled(Dropdown)`
  cursor: pointer;
  width: 100%;
  height: 100%;

  .result {
  }

  .Dropdown-root {
    position: relative;
  }

  .Dropdown-control {
    overflow: hidden;
    font-family: "Rubik";
    background-color: white;
    font-size: 1em;
    border: 2px solid white;
    padding: 3px;
    color: #000000;
    cursor: default;
    outline: none;
    transition: all 200ms ease;
    display: block;
  }

  .Dropdown-control:hover {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  }

  .is-open .Dropdown-arrow {
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  }

  .Dropdown-menu {
    position: absolute;
    background-color: white;
    border: 2px solid #ccc;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    margin-top: -1px;
    max-height: 200px;
    overflow-y: visible;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
  }

  .Dropdown-menu .Dropdown-group > .Dropdown-title {
    padding: 8px 10px;
    color: rgba(51, 51, 51, 1.2);
    font-weight: bold;
    text-transform: capitalize;
  }

  .Dropdown-option {
    box-sizing: border-box;
    color: rgba(51, 51, 51, 0.8);
    cursor: pointer;
    display: block;
    padding: 8px 10px;
  }

  .Dropdown-option:last-child {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .Dropdown-option:hover {
    background-color: #f2f9fc;
    color: #333;
  }

  .Dropdown-option.is-selected {
    background-color: #dedede;
    color: #333;
  }
`;

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 2em;
`;

export const StyledThumb = styled.div`
  height: 2em;
  line-height: 2em;
  width: 2em;
  text-align: center;
  background-color: #fff;
  color: #363636;
  border-radius: 50%;
  cursor: grab;
`;

export const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) => (props.index === 1 ? "#363636" : "#000000")};
  border-radius: 999px;
`;
