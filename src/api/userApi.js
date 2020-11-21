import axiosClient from "./axiosClient";

const userApi = {
  login: (username, password) => {
    const url = "/login";
    const body = {
      username,
      password,
    };

    return axiosClient.post(url, body);
  },
  register: (username, password, email, first_name, last_name) => {
    const url = "/register";
    const body = {
      username,
      password,
      email,
      first_name,
      last_name,
    };
    return axiosClient.post(url, body);
  },
  getProfile: () => {
    const url = "/profile";
    return axiosClient.get(url);
  },
  updateProfile: (first_name, last_name) => {
    const url = "/profile";
    const params = {
      first_name,
      last_name,
    };
    return axiosClient.put(url, params);
  },
  loginWithGoogle: (tokenID, email, first_name, last_name) => {
    const url = "/loginWithGoogle";
    const params = {
      tokenID,
      email,
      first_name,
      last_name,
    };
    return axiosClient.post(url, params);
  },
};

export default userApi;
