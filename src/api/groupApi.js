import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class GroupApi {
  getGroupById(groupId, tournamentId) {
    return request.get(`${API_URL}/group/${groupId}/tournament/${tournamentId}`);
  }
  getGroupsByTournamentId(tournamentId) {
    return request.get(`${API_URL}/group/tournament/${tournamentId}`);
  }

  getMatchesInGroup(groupId, tournamentId) {
    return request.get(`${API_URL}/group/${groupId}/tournament/${tournamentId}/matches`);
  }

  createGroup(tournamentId) {
    return request.post(`${API_URL}/group/tournament/${tournamentId}`);
  }

  deleteGroup(groupId, tournamentId) {
    return request.delete(`${API_URL}/group/${groupId}/tournament/${tournamentId}`);
  }

  assignTeamToGroup(groupId, tournamentId, teamId) {
    return request.post(`${API_URL}/group/${groupId}/tournament/${tournamentId}/team/${teamId}`);
  }

  assignParticipantToGroup(groupId, tournamentId, participantId) {
    return request.post(
      `${API_URL}/group/${groupId}/tournament/${tournamentId}/participant/${participantId}`
    );
  }

  assignMatchToGroup(groupId, tournamentId, matchId) {
    return request.post(`${API_URL}/group/${groupId}/tournament/${tournamentId}/match/${matchId}`);
  }

  excludeMatchFromGroup(groupId, tournamentId, matchId) {
    return request.delete(
      `${API_URL}/group/${groupId}/tournament/${tournamentId}/match/${matchId}`
    );
  }

  removeTeamFromGroup(groupId, tournamentId, teamId) {
    return request.delete(`${API_URL}/group/${groupId}/tournament/${tournamentId}/team/${teamId}`);
  }

  removeParticipantFromGroup(groupId, tournamentId, participantId) {
    return request.delete(
      `${API_URL}/group/${groupId}/tournament/${tournamentId}/participant/${participantId}`
    );
  }
}

export const groupApi = new GroupApi();
