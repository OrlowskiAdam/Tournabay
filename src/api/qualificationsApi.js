import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class QualificationsApi {
  createQualificationRoom(tournamentId, body) {
    return request.post(`${API_URL}/qualification-room/create/${tournamentId}`, body);
  }

  deleteQualificationRoom(roomId, tournamentId) {
    return request.delete(
      `${API_URL}/qualification-room/remove/${roomId}/tournament/${tournamentId}`
    );
  }

  getQualificationRooms(tournamentId) {
    return request.get(`${API_URL}/qualification-room/tournament/${tournamentId}`);
  }

  updateQualificationRoom(roomId, tournamentId, body) {
    return request.put(
      `${API_URL}/qualification-room/update/${roomId}/tournament/${tournamentId}`,
      body
    );
  }

  submitScores(lobbyId, roomId, tournamentId) {
    return request.post(
      `${API_URL}/qualification-results/submit/lobby/${lobbyId}/room/${roomId}/tournament/${tournamentId}`
    );
  }

  getQualificationResults(tournamentId) {
    return request.get(`${API_URL}/qualification-results/tournament/${tournamentId}`);
  }

  getQualificationResultsByTeam(tournamentId, teamId) {
    return request.get(
      `${API_URL}/qualification-results/tournament/${tournamentId}/team/${teamId}`
    );
  }

  updateQualificationResults(tournamentId, body) {
    return request.put(`${API_URL}/qualification-results/update/tournament/${tournamentId}`, body);
  }

  deleteQualificationResults(tournamentId, teamId) {
    return request.delete(
      `${API_URL}/qualification-results/delete/tournament/${tournamentId}/team/${teamId}`
    );
  }

  deleteParticipantQualificationResults(tournamentId, participantId) {
    return request.delete(
      `${API_URL}/qualification-results/delete/tournament/${tournamentId}/participant/${participantId}`
    );
  }
}

export const qualificationsApi = new QualificationsApi();
