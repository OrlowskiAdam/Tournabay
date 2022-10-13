import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class MappoolApi {
  getMappools(tournamentId) {
    return request.get(`${API_URL}/mappool/${tournamentId}`);
  }

  createMappool(tournamentId, body) {
    return request.post(`${API_URL}/mappool/create/${tournamentId}`, body);
  }

  getMappoolById(tournamentId, mappoolId) {
    return request.get(`${API_URL}/mappool/${mappoolId}/${tournamentId}`);
  }

  publishMappool(tournamentId, mappoolId) {
    return request.put(`${API_URL}/mappool/${mappoolId}/${tournamentId}/publish`);
  }

  deleteMappool(tournamentId, mappoolId) {
    return request.delete(`${API_URL}/mappool/${mappoolId}/${tournamentId}/delete`);
  }

  reorderBeatmap(tournamentId, mappoolId, body) {
    return request.post(`${API_URL}/mappool/${mappoolId}/${tournamentId}/beatmap-reorder`, body);
  }

  createBeatmap(mappoolId, tournamentId, body) {
    return request.post(`${API_URL}/mappool/${mappoolId}/${tournamentId}/beatmap/add`, body);
  }

  deleteBeatmap(mappoolId, tournamentId, beatmapId) {
    return request.delete(
      `${API_URL}/mappool/${mappoolId}/${tournamentId}/beatmap/${beatmapId}/delete`
    );
  }

  concealMappool(tournamentId, mappoolId) {
    return request.put(`${API_URL}/mappool/${mappoolId}/${tournamentId}/conceal`);
  }
}

export const mappoolApi = new MappoolApi();
