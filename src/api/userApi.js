import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class UserApi {
  me() {
    return request.get(`${API_URL}/user/me`);
  }
}

export const userApi = new UserApi();
