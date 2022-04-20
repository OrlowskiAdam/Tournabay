import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class TournamentRoleApi {
  addRole(tournamentId, body) {
    return request.post(`${API_URL}/tournament-role/add/${tournamentId}`, body);
  }

  updateRole(tournamentId, body) {
    return request.patch(`${API_URL}/tournament-role/update/${tournamentId}`, body);
  }

  removeRole(roleId, tournamentId) {
    return request.delete(`${API_URL}/tournament-role/remove/${roleId}/${tournamentId}`);
  }
}

export const tournamentRoleApi = new TournamentRoleApi();
