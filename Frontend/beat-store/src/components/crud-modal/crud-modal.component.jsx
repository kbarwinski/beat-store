import { useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";

import {
  StyledModal,
  CrudFormContainer,
  CrudInputContainer,
  CrudLabelContainer,
  CrudLabelText,
  CrudSubmitContainer,
} from "./crud-modal.styles";

import { toggleCrudClose } from "../../store/modal/cartmodal.slice";
import FileUploader from "../file-input/file-uploader.component.jsx";
import { AudioItemRequest } from "../../requests/AudioItem/audio-item-requests";
import { toggleRefresh } from "../../store/refresh/refresh.slice";

const CrudModal = (props) => {
  const dispatch = useDispatch();
  const { isCrudOpen, modalItem } = useSelector((state) => state.cartModal);

  function closeModalHandler(e) {
    dispatch(toggleCrudClose());
  }

  const titleText = useRef("");
  const bpmText = useRef("");
  const leasePriceText = useRef("");
  const exclusivePriceText = useRef("");

  const [selectedAudio, setSelectedAudio] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const audioAccepted = [".mp3", ".wav"];
  const imageAccepted = [".jpg", ".jpeg", ".bmp", ".png"];

  var initValues = {
    title: "",
    bpm: "",
    leasePrice: "",
    exclusivePrice: "",
  };

  const isUpdating = Object.keys(modalItem).length !== 0;
  if (isUpdating) {
    initValues = { ...modalItem };
  }

  function formValidation(dataToSubmit) {
    if (dataToSubmit.title.length < 3) throw Error("Title too short!");
    if (dataToSubmit.bpm <= 0) throw Error("Invalid bpm!");
    if (dataToSubmit.leasePrice < 0) throw Error("Invalid lease price!");
    if (dataToSubmit.exclusivePrice <= 0)
      throw Error("Invalid exclusive price!");

    if (!isUpdating) {
      var audioExt = "." + selectedAudio.name.split(".").pop();
      if (!audioAccepted.includes(audioExt))
        throw Error("Invalid audio format!");
      var imageExt = "." + selectedImage.name.split(".").pop();
      if (!imageAccepted.includes(imageExt))
        throw Error("Invalid image format!");
    }
  }

  const alert = useAlert();
  const handleItemSubmit = async (e) => {
    e.preventDefault();

    var dataToSubmit = {
      title: titleText.current.value,
      bpm: bpmText.current.value,
      leasePrice: leasePriceText.current.value,
      exclusivePrice: exclusivePriceText.current.value,
    };
    if (!isUpdating)
      dataToSubmit = {
        audio: selectedAudio,
        image: selectedImage,
        ...dataToSubmit,
      };
    try {
      formValidation(dataToSubmit);
      isUpdating
        ? await AudioItemRequest.putAudioItem(modalItem.id, dataToSubmit)
        : await AudioItemRequest.addAudioItem(dataToSubmit);
      dispatch(toggleRefresh());
      dispatch(toggleCrudClose());
    } catch (error) {
      console.log(error);
      alert.show(error.message);
    }
  };
  return (
    <StyledModal
      isOpen={isCrudOpen}
      onBackgroundClick={closeModalHandler}
      onEscapeKeydown={closeModalHandler}
      allowScroll={true}
    >
      <CrudFormContainer onSubmit={handleItemSubmit}>
        <CrudLabelContainer>
          <CrudLabelText>Title</CrudLabelText>
          <CrudInputContainer
            type="text"
            ref={titleText}
            defaultValue={initValues.title}
          />
        </CrudLabelContainer>

        <CrudLabelContainer>
          <CrudLabelText>Bpm</CrudLabelText>
          <CrudInputContainer
            type="number"
            ref={bpmText}
            defaultValue={initValues.bpm}
          />
        </CrudLabelContainer>

        <CrudLabelContainer>
          <CrudLabelText>Lease Price</CrudLabelText>
          <CrudInputContainer
            type="number"
            step="0.01"
            ref={leasePriceText}
            defaultValue={initValues.leasePrice}
          />
        </CrudLabelContainer>

        <CrudLabelContainer>
          <CrudLabelText>Exclusive Price</CrudLabelText>
          <CrudInputContainer
            type="number"
            step="0.01"
            ref={exclusivePriceText}
            defaultValue={initValues.exclusivePrice}
          />
        </CrudLabelContainer>
        {!isUpdating && (
          <CrudLabelContainer>
            <CrudLabelText>Audio file</CrudLabelText>
            <FileUploader
              onFileSelect={(file) => setSelectedAudio(file)}
              accepted={audioAccepted.join(", ")}
            />
          </CrudLabelContainer>
        )}

        {!isUpdating && (
          <CrudLabelContainer>
            <CrudLabelText>Image file</CrudLabelText>
            <FileUploader
              onFileSelect={(file) => setSelectedImage(file)}
              accepted={imageAccepted.join(", ")}
            />
          </CrudLabelContainer>
        )}

        <CrudSubmitContainer
          type="submit"
          value={isUpdating ? "Update" : "Add"}
        />
      </CrudFormContainer>
    </StyledModal>
  );
};

export default CrudModal;
