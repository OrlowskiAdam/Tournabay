import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class SecurityApi {
  updateRolesPermission(tournamentId, body) {
    return request.patch(`${API_URL}/permission/update/${tournamentId}`, body);
  }
}

export const securityApi = new SecurityApi();
