import { createSlice } from "@reduxjs/toolkit";
import { apolloClient } from "../apollo/apolloClient";
import { createTournamentMutation } from "../ql/TournamentMutations";

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
  },
});

export const { reducer } = slice;
export const getUser = (state) => state;

// actions

export const setTournament = (tournament) => async (dispatch) => {
  dispatch(slice.actions.setTournament(tournament));
};

export default slice;
