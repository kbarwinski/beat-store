import { useDispatch } from "react-redux";
import { toggleCrudOpen } from "../../store/modal/cartmodal.slice";
import { toggleRefresh } from "../../store/refresh/refresh.slice";

import { GrUpdate } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { useAlert } from "react-alert";

import {
  AuthorSpan,
  TitleSpan,
  BPMSpan,
  ButtonInfoContainer,
  CrudInfoContainer,
  CrudItemContainer,
  PriceSpan,
  PricesContainer,
  StyledButton,
} from "./crud-item.styles";
import { AudioItemRequest } from "../../requests/AudioItem/audio-item-requests";

const CrudItem = (props) => {
  const { bpm, title, displayName, id, leasePrice, exclusivePrice } =
    props.crudItem;

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleItemDeletion = async (e) => {
    e.preventDefault();
    try {
      await AudioItemRequest.deleteAudioItem(id);
      dispatch(toggleRefresh());
    } catch (error) {
      alert.show(error.response.data);
    }
  };

  return (
    <CrudItemContainer>
      <CrudInfoContainer>
        <TitleSpan>{title}</TitleSpan>
        <AuthorSpan>{displayName}</AuthorSpan>
        <BPMSpan>{bpm + " BPM"}</BPMSpan>
      </CrudInfoContainer>

      <PricesContainer>
        <PriceSpan>
          {"Lease " + (leasePrice ? leasePrice + "$" : "FREE!")}
        </PriceSpan>
        <PriceSpan>{"Exclusive " + exclusivePrice + "$"}</PriceSpan>
      </PricesContainer>

      <ButtonInfoContainer>
        <StyledButton onClick={() => dispatch(toggleCrudOpen(props.crudItem))}>
          <GrUpdate />
        </StyledButton>
        <StyledButton onClick={handleItemDeletion}>
          <AiOutlineDelete />
        </StyledButton>
      </ButtonInfoContainer>
    </CrudItemContainer>
  );
};

export default CrudItem;
