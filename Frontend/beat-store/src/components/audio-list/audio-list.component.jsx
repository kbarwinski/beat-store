import { useState, useEffect } from "react";

import { AudioListContainer } from "./audio-list.styles";

import AudioItem from "../audio-item/audio-item.component";

import FilterForm from "../filter-form/filter-form.component";

import { useSearchParams } from "react-router-dom";

import { AudioItemRequest } from "../../requests/AudioItem/audio-item-requests";

import { useSelector, useDispatch } from "react-redux";

import { initPlaylist } from "../../store/audio/audio.slice";

import EmptyNotice from "../empty-notice/empty-notice.component";

const AudioList = (props) => {
  //Prop for discerning list of all items and bookmarked items
  const { onlyBookmarked } = props;

  //Initialization of dropdown options by getting distinct appuser usernames into an array
  const authors = props.authors.map((data) => {
    return data.userName;
  });

  const [title, setTitle] = useState("");

  const [bpmLeft, setBpmLeft] = useState(props.minMaxData.bpm.min);
  const [bpmRight, setBpmRight] = useState(props.minMaxData.bpm.max);

  const [priceLeft, setPriceLeft] = useState(props.minMaxData.price.min);
  const [priceRight, setPriceRight] = useState(props.minMaxData.price.max);

  //Packing of slider state variables into an object for easier passing as a prop to a form component.
  const sliderState = {
    minBpmState: { bpmLeft, setBpmLeft },
    maxBpmState: { bpmRight, setBpmRight },
    minPriceState: { priceLeft, setPriceLeft },
    maxPriceState: { priceRight, setPriceRight },
  };

  const [filteredData, setFilteredData] = useState([]);

  const [apply, setApply] = useState(false);

  //Initialization of variables responsible for linking filters with url search parameters
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchParamsPayload, setSearchParamsPayload] = useState({
    author: searchParams.get("author"),
    sortby: searchParams.get("sortby"),
  });

  //Selecting an array of bookmarked items ID's from the redux state
  const bookmarkedIds = useSelector((state) => state.bookmark.bookmarked);

  useEffect(() => {
    const fetchData = async (queryParams) => {
      let filteredData = await AudioItemRequest.getAll(queryParams);
      if (onlyBookmarked)
        filteredData = filteredData.filter((item) =>
          bookmarkedIds.includes(item.id)
        );
      console.log(filteredData);
      setFilteredData(filteredData);
    };

    var author = searchParamsPayload.author;
    var sortBy = searchParamsPayload.sortby;
    if (!author && !sortBy) {
      setSearchParamsPayload({
        author: "Any",
        sortby: "Price Ascending",
      });
    }

    author = !author ? "Any" : author;
    sortBy = !sortBy ? "Price Ascending" : sortBy;

    switch (sortBy) {
      case "Price Ascending":
        sortBy = "leasePrice asc";
        break;
      case "Price Descending":
        sortBy = "leasePrice desc";
        break;
      case "Oldest":
        sortBy = "createdAt asc";
        break;
      case "Newest":
        sortBy = "createdAt desc";
        break;
      default:
        sortBy = "";
        break;
    }

    var paramsObject = {
      minBpm: bpmLeft,
      maxBpm: bpmRight,
      minPrice: priceLeft,
      maxPrice: priceRight,
      orderBy: sortBy,
    };

    if (author !== "Any") paramsObject = { author: author, ...paramsObject };
    if (title !== "") paramsObject = { title: title, ...paramsObject };

    fetchData(paramsObject);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apply, onlyBookmarked, bookmarkedIds]);

  useEffect(() => {
    setSearchParams({ ...searchParamsPayload });
  }, [searchParamsPayload, setSearchParams]);

  //State variables responsible for handling cart modal

  const dispatch = useDispatch();

  //Function responsible for dispatching playlist made of filtered items audio urls into redux state
  const audioPlaybackHandler = (id) => {
    let playlistArray = filteredData.map((m) => m.id);
    let playingIndex = filteredData.findIndex((m) => m.id === id);
    dispatch(
      initPlaylist({
        playlistArray: playlistArray,
        playingIndex: playingIndex,
      })
    );
  };

  return (
    <AudioListContainer>
      <FilterForm
        bpmMin={props.minMaxData.bpm.min}
        bpmMax={props.minMaxData.bpm.max}
        priceMin={props.minMaxData.price.min}
        priceMax={props.minMaxData.price.max}
        authors={authors}
        titleState={{ title, setTitle }}
        applyState={{ apply, setApply }}
        sliderStates={sliderState}
        searchParamsPayloadState={{
          searchParamsPayload,
          setSearchParamsPayload,
        }}
      />
      {filteredData.length !== 0 ? (
        filteredData.map((item) => {
          return (
            <AudioItem
              key={item.id}
              audioItem={item}
              audioPlaybackHandler={audioPlaybackHandler}
            />
          );
        })
      ) : (
        <EmptyNotice message="No content found 😵" />
      )}
    </AudioListContainer>
  );
};

export default AudioList;
