import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class MatchApi {
  createPlayerVsMatch(tournamentId, body) {
    return request.post(`${API_URL}/match/create-player-vs/${tournamentId}`, body);
  }

  createTeamVsMatch(tournamentId, body) {
    return request.post(`${API_URL}/match/create-team-vs/${tournamentId}`, body);
  }

  deleteMatch(matchId, tournamentId) {
    return request.delete(`${API_URL}/match/delete/${matchId}/${tournamentId}`);
  }

  updatePlayerVsMatch(matchId, tournamentId, body) {
    return request.post(`${API_URL}/match/update-player-vs/${matchId}/${tournamentId}`, body);
  }

  updateTeamVsMatch(matchId, tournamentId, body) {
    return request.post(`${API_URL}/match/update-team-vs/${matchId}/${tournamentId}`, body);
  }

  submitResult(matchId, tournamentId, body) {
    return request.post(`${API_URL}/match/submit-result/${matchId}/${tournamentId}`, body);
  }
}

export const matchApi = new MatchApi();
