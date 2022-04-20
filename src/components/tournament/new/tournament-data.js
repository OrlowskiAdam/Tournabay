import PropTypes from "prop-types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { MobileDatePicker } from "@mui/lab";
import { useDispatch, useSelector } from "../../../store";
import {
  setTournamentEndDate,
  setTournamentName,
  setTournamentStartDate,
} from "../../../slices/tournamentWizard";
import { tournamentApi } from "../../../api/tournamentApi";
import { setTournament } from "../../../slices/tournament";

export const TournamentData = (props) => {
  const { onBack, onNext, handleComplete, ...other } = props;
  const { tournament } = useSelector((state) => state.tournamentWizard);
  const dispatch = useDispatch();

  const handleStartDateChange = (newValue) => {
    dispatch(setTournamentStartDate(newValue));
  };

  const handleEndDateChange = (newValue) => {
    dispatch(setTournamentEndDate(newValue));
  };

  const handleNameChange = (name) => {
    dispatch(setTournamentName(name));
  };

  const handleTournamentCreation = () => {
    tournamentApi
      .createTournament(tournament)
      .then((response) => {
        dispatch(setTournament(response.data));
        handleComplete();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div {...other}>
      <Typography variant="h6">Tournament details</Typography>
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Tournament name"
          name="tournamentName"
          placeholder="e.g Gotta Aim Fast"
          onChange={(e) => handleNameChange(e.target.value)}
          value={tournament.name}
        />
        <Typography sx={{ mt: 3 }} variant="subtitle1">
          When is the tournament starting?
        </Typography>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            mt: 3,
          }}
        >
          <MobileDatePicker
            label="Start Date"
            inputFormat="dd/MM/yyyy"
            value={tournament.startDate}
            onChange={handleStartDateChange}
            renderInput={(inputProps) => <TextField {...inputProps} />}
          />
          <Box sx={{ ml: 2 }}>
            <MobileDatePicker
              label="End Date"
              inputFormat="dd/MM/yyyy"
              value={tournament.endDate}
              onChange={handleEndDateChange}
              renderInput={(inputProps) => <TextField {...inputProps} />}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button
          endIcon={<ArrowRightIcon fontSize="small" />}
          onClick={handleTournamentCreation}
          variant="contained"
        >
          Continue
        </Button>
        <Button onClick={onBack} sx={{ ml: 2 }}>
          Back
        </Button>
      </Box>
    </div>
  );
};

TournamentData.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  handleComplete: PropTypes.func,
};
