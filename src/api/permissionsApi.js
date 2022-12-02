import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class PermissionsApi {
  updatePermissions(tournamentId, body) {
    return request.patch(`${API_URL}/permissions/update/tournament/${tournamentId}`, body);
  }
}

export const permissionsApi = new PermissionsApi();
