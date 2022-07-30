import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class MatchApi {
  createMatch(tournamentId, body) {
    return request.post(`${API_URL}/match/create/${tournamentId}`, body);
  }

  deleteMatch(matchId, tournamentId) {
    return request.delete(`${API_URL}/match/delete/${matchId}/${tournamentId}`);
  }

  updateMatch(matchId, tournamentId, body) {
    return request.put(`${API_URL}/match/update/${matchId}/${tournamentId}`, body);
  }
}

export const matchApi = new MatchApi();
