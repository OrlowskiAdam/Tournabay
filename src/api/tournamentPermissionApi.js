import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class TournamentPermissionApi {
  updateRolesPermission(tournamentId, body) {
    return request.patch(`${API_URL}/permissions/roles/${tournamentId}`, body);
  }

  updateStaffMembersPermission(tournamentId, body) {
    return request.patch(`${API_URL}/permissions/staff/${tournamentId}`, body);
  }

  updateAccessPermission(tournamentId, body) {
    return request.patch(`${API_URL}/permissions/access/${tournamentId}`, body);
  }

  updateParticipantsPermission(tournamentId, body) {
    return request.patch(`${API_URL}/permissions/participants/${tournamentId}`, body);
  }
}

export const tournamentPermissionApi = new TournamentPermissionApi();
