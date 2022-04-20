import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class TournamentApi {
  createTournament(body) {
    return request.post(`${API_URL}/tournament/create`, body);
  }

  getTournamentById(id) {
    console.log(id);
    return request.get(`${API_URL}/tournament/${id}`);
  }
}

export const tournamentApi = new TournamentApi();
