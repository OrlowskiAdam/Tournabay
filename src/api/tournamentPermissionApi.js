import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class TournamentPermissionApi {
  updateRolesPermission(tournamentId, body) {
    return request.patch(`${API_URL}/permissions/roles/${tournamentId}`, body);
  }

  updateStaffMembersPermission(tournamentId, body) {
    return request.patch(`${API_URL}/permissions/staff/${tournamentId}`, body);
  }
}

export const tournamentPermissionApi = new TournamentPermissionApi();
