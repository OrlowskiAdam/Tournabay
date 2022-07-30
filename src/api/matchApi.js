import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class MatchApi {
  createMatch(tournamentId, body) {
    return request.post(`${API_URL}/match/create/${tournamentId}`, body);
  }
}

export const matchApi = new MatchApi();
