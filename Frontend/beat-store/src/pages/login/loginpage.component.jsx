import { Spacer } from "../../components/spacer/spacer.styles";
import {
  LoginFormContainer,
  LoginInputContainer,
  LoginLabelContainer,
  LoginPageContainer,
  LoginSubmitContainer,
  LoginLabelText,
} from "./loginpage.styles";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthInfo } from "../../store/auth/auth.slice";

import AppUserRequest from "../../requests/AppUser/app-user-requests";
import { Navigate } from "react-router-dom";
import { useAlert } from "react-alert";

const LoginPage = () => {
  const loginText = useRef("");
  const passwordText = useRef("");

  const dispatch = useDispatch();

  const alert = useAlert();

  const handleLogin = async (e) => {
    e.preventDefault();

    const dataToSend = {
      userName: loginText.current.value,
      password: passwordText.current.value,
    };
    try {
      const responseData = await AppUserRequest.Login(dataToSend);
      dispatch(setAuthInfo({ userName: dataToSend.userName, ...responseData }));
    } catch (error) {
      alert.show(error.response.data);
    }
  };

  const loginToken = useSelector((state) => state.auth.jwtToken);

  return (
    <LoginPageContainer>
      {loginToken && <Navigate to={"/audiocrud"} replace={true} />}
      <Spacer height="6vmax" />
      <LoginFormContainer onSubmit={handleLogin}>
        <LoginLabelContainer>
          <LoginLabelText>Login</LoginLabelText>
          <LoginInputContainer type="text" ref={loginText} />
        </LoginLabelContainer>

        <LoginLabelContainer>
          <LoginLabelText>Password</LoginLabelText>
          <LoginInputContainer type="password" ref={passwordText} />
        </LoginLabelContainer>

        <LoginSubmitContainer type="submit" value="Log in" />
      </LoginFormContainer>
      <Spacer height="6vmax" />
    </LoginPageContainer>
  );
};

export default LoginPage;
