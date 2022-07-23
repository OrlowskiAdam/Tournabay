import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class TeamApi {
  createTeam(tournamentId, body) {
    return request.post(`${API_URL}/teams/create/${tournamentId}`, body);
  }

  deleteTeam(tournamentId, teamId) {
    return request.delete(`${API_URL}/teams/delete/${teamId}/${tournamentId}`);
  }

  updateTeam(tournamentId, teamId, body) {
    return request.put(`${API_URL}/teams/update/${teamId}/${tournamentId}`, body);
  }
}

export const teamApi = new TeamApi();
