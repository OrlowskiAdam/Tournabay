import request from "./axiosConfig";
import { API_URL } from "../constants/constants";

class StaffMemberApi {
  addStaffMember(osuId, tournamentId, tournamentRoleIds) {
    return request.post(`${API_URL}/staff/add/${tournamentId}`, { osuId, tournamentRoleIds });
  }

  removeStaffMember(staffMemberId, tournamentId) {
    return request.delete(`${API_URL}/staff/remove/${staffMemberId}/${tournamentId}`);
  }

  removeStaffMembers(staffMemberIds, tournamentId) {
    return request.post(`${API_URL}/staff/remove/${tournamentId}`, { staffMemberIds });
  }

  updateStaffMember(tournamentId, data) {
    return request.patch(`${API_URL}/staff/update/${tournamentId}`, data);
  }
}

export const staffMemberApi = new StaffMemberApi();
