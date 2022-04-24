import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class ParticipantApi {
  addParticipant(osuId, tournamentId) {
    return request.post(`${API_URL}/participant/add/${osuId}/${tournamentId}`);
  }

  deleteParticipant(tournamentId, participantId) {
    return request.post(`${API_URL}/participant/delete/${participantId}/${tournamentId}`);
  }

  setParticipantsStatus(tournamentId, body) {
    return request.put(`${API_URL}/participant/status/${tournamentId}`, body);
  }
}

export const participantApi = new ParticipantApi();
