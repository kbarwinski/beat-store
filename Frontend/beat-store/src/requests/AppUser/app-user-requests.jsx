import axiosBase from "../axios-base";

const AppUserRequest = {
  GetAppUsers: async function GetAllAppUsers() {
    try {
      const response = await axiosBase.get("/appusers");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  GetInvitationCode: async function GetInvitationCode() {
    try {
      console.log(axiosBase.defaults.headers);
      const response = await axiosBase.get("/appusers/invite");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  Login: async function LoginAppUser(loginData) {
    try {
      const response = await axiosBase.post("/appusers/login", loginData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  Register: async function RegisterAppUser(registrationData) {
    try {
      const response = await axiosBase.post(
        "/appusers/register",
        registrationData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AppUserRequest;
