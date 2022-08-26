import {
  FilterFormContainer,
  FilterContainer,
  FilterDropdown,
  FilterFormInput,
  FilterFormLabel,
  FiltersContainer,
  ButtonsContainer,
  StyledButton,
  StyledSlider,
  StyledThumb,
  StyledTrack,
} from "./filter-form.styles";

import Collapsible from "react-collapsible";
import "./collapsible.scss";

const FilterForm = (props) => {
  const {
    bpmMin,
    bpmMax,
    priceMin,
    priceMax,
    authors,
    titleState,
    applyState,
    sliderStates,
    searchParamsPayloadState,
  } = props;

  const { title, setTitle } = titleState;

  //Sets payload of url search parameters, which is used in parent as a side effect
  const { searchParamsPayload, setSearchParamsPayload } =
    searchParamsPayloadState;

  const { bpmLeft, setBpmLeft } = sliderStates.minBpmState;
  const { bpmRight, setBpmRight } = sliderStates.maxBpmState;
  const { priceLeft, setPriceLeft } = sliderStates.minPriceState;
  const { priceRight, setPriceRight } = sliderStates.maxPriceState;

  //Bool state variable for indicating when to apply filters
  const { apply, setApply } = applyState;

  //Initialization of sliders thumbs and tracks
  const Thumb = (props, state) => (
    <StyledThumb {...props}>{state.valueNow}</StyledThumb>
  );
  const Track = (props, state) => (
    <StyledTrack {...props} index={state.index} />
  );

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleApply(event) {
    event.preventDefault();
    setApply(!apply);
  }

  function handleClear(event) {
    event.preventDefault();
    setTitle("");
    setPriceLeft(priceMin);
    setPriceRight(priceMax);
    setBpmLeft(bpmMin);
    setBpmRight(bpmMax);
    setSearchParamsPayload({ author: "Any", sortby: "Price Ascending" });
    setApply(!apply);
  }

  function handlePriceChange(value, index) {
    if (!index) setPriceLeft(value[index]);
    else setPriceRight(value[index]);
  }

  function handleBpmChange(value, index) {
    if (!index) setBpmLeft(value[index]);
    else setBpmRight(value[index]);
  }

  function handleAuthorChange(option) {
    setSearchParamsPayload({ ...searchParamsPayload, author: option.label });
  }

  function handleSortingChange(option) {
    setSearchParamsPayload({ ...searchParamsPayload, sortby: option.label });
  }

  return (
    <Collapsible trigger="Filters" overflowWhenOpen="visible">
      <FilterFormContainer>
        <FiltersContainer>
          <FilterContainer>
            <FilterFormLabel>Title:</FilterFormLabel>
            <FilterFormInput onChange={handleTitleChange} value={title} />
          </FilterContainer>

          <FilterContainer>
            <FilterFormLabel>Author:</FilterFormLabel>
            <FilterDropdown
              options={authors}
              onChange={handleAuthorChange}
              value={searchParamsPayload.author}
            />
          </FilterContainer>

          <FilterContainer>
            <FilterFormLabel>BPM:</FilterFormLabel>
            <StyledSlider
              onAfterChange={handleBpmChange}
              value={[bpmLeft, bpmRight]}
              min={bpmMin}
              max={bpmMax}
              renderTrack={Track}
              renderThumb={Thumb}
            />
          </FilterContainer>

          <FilterContainer>
            <FilterFormLabel>Price:</FilterFormLabel>
            <StyledSlider
              onAfterChange={handlePriceChange}
              value={[Math.ceil(priceLeft), Math.floor(priceRight)]}
              min={Math.ceil(priceMin)}
              max={Math.floor(priceMax)}
              renderTrack={Track}
              renderThumb={Thumb}
            />
          </FilterContainer>

          <FilterContainer>
            <FilterFormLabel>Sort by:</FilterFormLabel>
            <FilterDropdown
              options={[
                "Newest",
                "Oldest",
                "Price Ascending",
                "Price Descending",
              ]}
              onChange={handleSortingChange}
              value={searchParamsPayload.sortby}
            />
          </FilterContainer>
        </FiltersContainer>

        <ButtonsContainer>
          <StyledButton onClick={handleApply}>Apply</StyledButton>
          <StyledButton onClick={handleClear}>Clear</StyledButton>
        </ButtonsContainer>
      </FilterFormContainer>
    </Collapsible>
  );
};

export default FilterForm;
