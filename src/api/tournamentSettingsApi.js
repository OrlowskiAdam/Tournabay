import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class TournamentSettingsApi {
  updatePlayerRegistrationSettings(tournamentId, body) {
    return request.post(`${API_URL}/tournament/${tournamentId}/settings/registration`, body);
  }
}

export const tournamentSettingsApi = new TournamentSettingsApi();
