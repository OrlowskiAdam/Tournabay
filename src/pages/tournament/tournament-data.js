import { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  Chip,
  InputAdornment,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { MobileDatePicker } from "@mui/lab";

export const TournamentData = (props) => {
  const { onBack, onNext, ...other } = props;
  const [startDate, setStartDate] = useState(new Date("2021-09-22T11:41:50"));
  const [endDate, setEndDate] = useState(new Date("2022-01-11T12:41:50"));

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
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
            inputFormat="MM/dd/yyyy"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(inputProps) => <TextField {...inputProps} />}
          />
          <Box sx={{ ml: 2 }}>
            <MobileDatePicker
              label="End Date"
              inputFormat="MM/dd/yyyy"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(inputProps) => <TextField {...inputProps} />}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button endIcon={<ArrowRightIcon fontSize="small" />} onClick={onNext} variant="contained">
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
};
