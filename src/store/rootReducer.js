import { combineReducers } from "@reduxjs/toolkit";
import { reducer as userReducer } from "../slices/user";
import { reducer as tournamentReducer } from "../slices/tournament";
import { reducer as tournamentWizardReducer } from "../slices/tournamentWizard";
import { reducer as tournamentMappoolsReducer } from "../slices/tournamentMappools";

const rootReducer = combineReducers({
  user: userReducer,
  tournament: tournamentReducer,
  tournamentWizard: tournamentWizardReducer,
  tournamentMappools: tournamentMappoolsReducer,
});

export default rootReducer;
