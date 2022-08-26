import { Spacer } from "../../components/spacer/spacer.styles";
import {
  RegistrationFormContainer,
  RegistrationInputContainer,
  RegistrationLabelContainer,
  RegistrationPageContainer,
  RegistrationSubmitContainer,
  RegistrationLabelText,
} from "./registrationpage.styles";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AppUserRequest from "../../requests/AppUser/app-user-requests";
import { setAuthInfo } from "../../store/auth/auth.slice";
import { useAlert } from "react-alert";

const RegistrationPage = () => {
  const loginText = useRef("");
  const passwordText = useRef("");
  const emailText = useRef("");
  const referrerText = useRef("");
  const invitationCodeText = useRef("");

  const dispatch = useDispatch();

  const loginToken = useSelector((state) => state.auth.jwtToken);

  const alert = useAlert();

  const handleRegistration = async (e) => {
    e.preventDefault();

    const dataToSend = {
      userName: loginText.current.value,
      password: passwordText.current.value,
      email: emailText.current.value,
      referrer: referrerText.current.value,
      invitationCode: invitationCodeText.current.value,
    };
    try {
      await AppUserRequest.Register(dataToSend);
      const responseData = await AppUserRequest.Login({
        userName: dataToSend.userName,
        password: dataToSend.password,
      });
      dispatch(setAuthInfo({ userName: dataToSend.userName, ...responseData }));
    } catch (error) {
      alert.show(error.response.message);
    }
  };

  return (
    <RegistrationPageContainer>
      {loginToken && <Navigate to={"/store"} replace={true} />}
      <Spacer height="6vmax" />
      <RegistrationFormContainer onSubmit={handleRegistration}>
        <RegistrationLabelContainer>
          <RegistrationLabelText>Login</RegistrationLabelText>
          <RegistrationInputContainer type="text" ref={loginText} />
        </RegistrationLabelContainer>

        <RegistrationLabelContainer>
          <RegistrationLabelText>Email</RegistrationLabelText>
          <RegistrationInputContainer type="email" ref={emailText} />
        </RegistrationLabelContainer>

        <RegistrationLabelContainer>
          <RegistrationLabelText>Password</RegistrationLabelText>
          <RegistrationInputContainer type="password" ref={passwordText} />
        </RegistrationLabelContainer>

        <RegistrationLabelContainer>
          <RegistrationLabelText>Referrer name</RegistrationLabelText>
          <RegistrationInputContainer type="text" ref={referrerText} />
        </RegistrationLabelContainer>

        <RegistrationLabelContainer>
          <RegistrationLabelText>Invitation code</RegistrationLabelText>
          <RegistrationInputContainer type="text" ref={invitationCodeText} />
        </RegistrationLabelContainer>

        <RegistrationSubmitContainer type="submit" value="Register" />
      </RegistrationFormContainer>
      <Spacer height="6vmax" />
    </RegistrationPageContainer>
  );
};

export default RegistrationPage;
