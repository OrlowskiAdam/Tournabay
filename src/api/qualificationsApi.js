import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class QualificationsApi {
  createQualificationRoom(tournamentId, body) {
    return request.post(`${API_URL}/qualification-room/create/${tournamentId}`, body);
  }
}

export const qualificationsApi = new QualificationsApi();
