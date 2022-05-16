import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class TeamApi {
  createTeam(tournamentId, body) {
    return request.post(`${API_URL}/teams/create/${tournamentId}`, body);
  }
}

export const teamApi = new TeamApi();
