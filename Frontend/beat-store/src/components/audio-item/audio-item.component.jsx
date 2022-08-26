import { FiShoppingCart, FiBookmark } from "react-icons/fi";
import { FaBookmark, FaPlay, FaPause } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  removeBookmark,
} from "../../store/bookmark/bookmark.slice";
import { togglePlaying } from "../../store/audio/audio.slice";
import { toggleCartOpen } from "../../store/modal/cartmodal.slice";

import {
  AudioItemContainer,
  AudioInfoContainer,
  TitleSpan,
  AuthorSpan,
  ImageInfoContainer,
  ImageContainer,
  BPMSpan,
  PlayOverlay,
  PricesContainer,
  PriceSpan,
  ButtonInfoContainer,
  StyledButton,
} from "../audio-item/audio-item.styles";

const AudioItem = (props) => {
  const { audioItem, audioPlaybackHandler } = props;

  const { imageUrl, bpm, title, displayName, id, leasePrice, exclusivePrice } =
    audioItem;

  const dispatch = useDispatch();

  //Selector for displaying if item is bookmarked
  const bookmarkedIds = useSelector((state) => state.bookmark.bookmarked);

  //Selector for locking the item's add to cart button if it's id can be found in cart IDs array
  const cartIds = useSelector((state) =>
    state.cart.cartItems.map((item) => item.id)
  );

  //Selector for displaying if an item is being currently played and for play/pause logic on it's play overlay.

  const playingId = useSelector(
    (state) => state.audio.playlistArray[state.audio.playingIndex]
  );
  const playing = useSelector((state) => state.audio.playing);

  // Conditional rendering of overlay which either starts up a new playlist or pauses/resumes playing.
  const playingLogic = () => {
    if (playingId === id) {
      return (
        <PlayOverlay
          onClick={() => {
            dispatch(togglePlaying());
          }}
        >
          {playing ? <FaPause /> : <FaPlay />}
        </PlayOverlay>
      );
    }
    return (
      <PlayOverlay
        onClick={() => {
          audioPlaybackHandler(audioItem.id);
        }}
      >
        <FaPlay />
      </PlayOverlay>
    );
  };

  return (
    <AudioItemContainer>
      <ImageInfoContainer>
        <ImageContainer src={imageUrl} />
        <BPMSpan>{bpm + " BPM"}</BPMSpan>
        {playingLogic()}
      </ImageInfoContainer>

      <AudioInfoContainer>
        <TitleSpan>{title}</TitleSpan>
        <AuthorSpan>{displayName}</AuthorSpan>

        {/* <TagsContainer>
          {tags.map((tag) => {
            return <TagSpan key={tag.id}>{"#" + tag.content}</TagSpan>;
          })}
        </TagsContainer> */}
      </AudioInfoContainer>

      <PricesContainer>
        <PriceSpan>
          {"Lease " + (leasePrice ? leasePrice + "$" : "FREE!")}
        </PriceSpan>
        <PriceSpan>{"Exclusive " + exclusivePrice + "$"}</PriceSpan>
      </PricesContainer>

      <ButtonInfoContainer>
        <StyledButton
          disabled={cartIds.includes(audioItem.id)}
          onClick={() => {
            dispatch(toggleCartOpen(audioItem));
          }}
        >
          <FiShoppingCart />
        </StyledButton>
        {bookmarkedIds.includes(audioItem.id) ? (
          <StyledButton onClick={() => dispatch(removeBookmark(audioItem.id))}>
            <FaBookmark></FaBookmark>
          </StyledButton>
        ) : (
          <StyledButton onClick={() => dispatch(addBookmark(audioItem.id))}>
            <FiBookmark></FiBookmark>
          </StyledButton>
        )}
      </ButtonInfoContainer>
    </AudioItemContainer>
  );
};

export default AudioItem;
