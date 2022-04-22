import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tournament: {
    id: null,
    name: null,
    createdAt: null,
    updatedAt: null,
    startDate: null,
    endDate: null,
    gameMode: null,
    scoreType: null,
    teamFormat: null,
    roles: [],
    staffMembers: [],
    permission: null,
    owner: null,
  },
};

const slice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTournament: (state, action) => {
      state.tournament = action.payload;
    },
    addStaffMember(state, action) {
      state.tournament.staffMembers = [...state.tournament.staffMembers, action.payload];
    },
    removeStaffMember(state, action) {
      state.tournament.staffMembers = state.tournament.staffMembers.filter(
        (member) => member.id !== action.payload
      );
    },
    replaceStaffMember(state, action) {
      state.tournament.staffMembers = state.tournament.staffMembers.filter(
        (member) => member.id !== action.payload.id
      );
      state.tournament.staffMembers = [...state.tournament.staffMembers, action.payload];
    },
    addRole(state, action) {
      state.tournament.roles = [...state.tournament.roles, action.payload];
    },
    removeRole(state, action) {
      state.tournament.roles = state.tournament.roles.filter(
        (role) => role.id !== action.payload.id
      );
    },
    replaceRole(state, action) {
      const roleIndex = state.tournament.roles.findIndex((role) => role.id === action.payload.id);
      state.tournament.roles[roleIndex] = action.payload;
    },
    replaceRolePosition(state, action) {
      let { role1, role2 } = action.payload;
      const role1Index = state.tournament.roles.findIndex(
        (role) => role.id === action.payload.role1.id
      );
      const role2Index = state.tournament.roles.findIndex(
        (role) => role.id === action.payload.role2.id
      );
      state.tournament.roles[role1Index].position = role2.position;
      state.tournament.roles[role2Index].position = role1.position;
    },
  },
});

export const { reducer } = slice;
export const getUser = (state) => state;

// actions

export const setTournament = (tournament) => async (dispatch) => {
  dispatch(slice.actions.setTournament(tournament));
};

export const addStaffMember = (staffMember) => async (dispatch) => {
  dispatch(slice.actions.addStaffMember(staffMember));
};

export const removeStaffMember = (staffMember) => async (dispatch) => {
  dispatch(slice.actions.removeStaffMember(staffMember));
};

export const updateStaffMember = (staffMember) => async (dispatch) => {
  dispatch(slice.actions.replaceStaffMember(staffMember));
};

export const addRole = (role) => async (dispatch) => {
  dispatch(slice.actions.addRole(role));
};

export const removeRole = (role) => async (dispatch) => {
  dispatch(slice.actions.removeRole(role));
};

export const updateRole = (role) => async (dispatch) => {
  dispatch(slice.actions.replaceRole(role));
};

export const replaceRolePosition = (role1, role2) => async (dispatch) => {
  dispatch(slice.actions.replaceRolePosition({ role1, role2 }));
};

export default slice;
