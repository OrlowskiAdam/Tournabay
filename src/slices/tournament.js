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

export default slice;
