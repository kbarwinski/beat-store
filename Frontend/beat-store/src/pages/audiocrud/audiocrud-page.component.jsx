import {
  CrudPageContainer,
  ButtonsContainer,
  StyledButton,
} from "./audiocrud-page.styles";

import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleCrudOpen } from "../../store/modal/cartmodal.slice";

import { MdAddCircle } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";

import { Spacer } from "../../components/spacer/spacer.styles";
import CrudList from "../../components/crud-list/crud-list.component";
import AppUserRequest from "../../requests/AppUser/app-user-requests";
import { useAlert } from "react-alert";

const AudioCrudPage = () => {
  const { jwtToken, roles, userName } = useSelector((state) => state.auth);

  const alert = useAlert();

  const dispatch = useDispatch();

  const handleInvitation = async (e) => {
    e.preventDefault();
    try {
      const invitationCode = await AppUserRequest.GetInvitationCode();
      navigator.clipboard.writeText(invitationCode);
      alert.show("Invitation code copied to clipboard");
    } catch (error) {
      alert.show("Something went wrong");
    }
  };

  return (
    <CrudPageContainer>
      {!jwtToken && <Navigate to={"/store"} replace={true} />}

      <Spacer height="6vmax" />
      <ButtonsContainer>
        <StyledButton onClick={() => dispatch(toggleCrudOpen())}>
          <MdAddCircle />
        </StyledButton>
        {roles.includes("Owner") && (
          <StyledButton onClick={handleInvitation}>
            <AiOutlineUserAdd />
          </StyledButton>
        )}
      </ButtonsContainer>
      <CrudList author={userName} />

      <Spacer height="6vmax" />
    </CrudPageContainer>
  );
};

export default AudioCrudPage;
