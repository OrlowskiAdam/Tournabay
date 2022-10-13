import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tournament: {
    name: "",
    scoreType: "SCORE_V2",
    gameMode: "STANDARD",
    teamFormat: "PLAYER_VS",
    maxStage: "RO128",
    startDate: new Date(),
    endDate: new Date(),
  },
};

const slice = createSlice({
  name: "tournamentWizard",
  initialState,
  reducers: {
    reset(state, action) {
      state.tournament = action.payload.tournament;
    },
    setTournamentId(state, action) {
      state.tournament.id = action.payload;
    },
    setScoreType(state, action) {
      state.tournament.scoreType = action.payload;
    },
    setGameMode(state, action) {
      state.tournament.gameMode = action.payload;
    },
    setName(state, action) {
      state.tournament.name = action.payload;
    },
    setTournamentStartDate(state, action) {
      state.tournament.startDate = action.payload;
    },
    setTournamentEndDate(state, action) {
      state.tournament.endDate = action.payload;
    },
    setTournamentTeamFormat(state, action) {
      state.tournament.teamFormat = action.payload;
    },
    setTournamentMaxStage(state, action) {
      state.tournament.maxStage = action.payload;
    },
  },
});

export const { reducer } = slice;

// actions

export const resetWizard = () => async (dispatch) => {
  dispatch(slice.actions.reset(initialState));
};

export const setTournamentId = (id) => async (dispatch) => {
  dispatch(slice.actions.setTournamentId(id));
};

export const setTournamentScoreType = (scoreType) => async (dispatch) => {
  dispatch(slice.actions.setScoreType(scoreType));
};

export const setTournamentName = (name) => async (dispatch) => {
  dispatch(slice.actions.setName(name));
};

export const setTournamentGameMode = (gameMode) => async (dispatch) => {
  dispatch(slice.actions.setGameMode(gameMode));
};

export const setTournamentStartDate = (startDate) => async (dispatch) => {
  dispatch(slice.actions.setTournamentStartDate(startDate));
};

export const setTournamentEndDate = (endDate) => async (dispatch) => {
  dispatch(slice.actions.setTournamentEndDate(endDate));
};

export const setTournamentTeamFormat = (teamFormat) => async (dispatch) => {
  dispatch(slice.actions.setTournamentTeamFormat(teamFormat));
};

export const setTournamentMaxStage = (maxStage) => async (dispatch) => {
  dispatch(slice.actions.setTournamentMaxStage(maxStage));
};

export const createTournament = (tournamentData) => async (dispatch) => {};

export default slice;
