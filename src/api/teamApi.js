import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class TeamApi {
  createTeam(tournamentId) {
    return request.post(`${API_URL}/teams/create/${tournamentId}`);
  }
}

export const teamApi = new TeamApi();
