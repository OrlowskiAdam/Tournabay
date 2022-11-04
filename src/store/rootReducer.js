import { combineReducers } from "@reduxjs/toolkit";
import { reducer as userReducer } from "../slices/user";
import { reducer as tournamentReducer } from "../slices/tournament";
import { reducer as tournamentWizardReducer } from "../slices/tournamentWizard";

const rootReducer = combineReducers({
  user: userReducer,
  tournament: tournamentReducer,
  tournamentWizard: tournamentWizardReducer,
});

export default rootReducer;
