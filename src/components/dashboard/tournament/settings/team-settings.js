import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

const selectValues = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
];

const TeamSettings = (props) => {
  const { tournament } = props;
  const [baseTeamSize, setBaseTeamSize] = useState(tournament.settings.baseTeamSize);
  const [maxTeamSize, setMaxTeamSize] = useState(tournament.settings.maxTeamSize);

  const handleBaseTeamSizeChange = (e) => {
    if (e.target.value > maxTeamSize) {
      setMaxTeamSize(e.target.value);
    }
    setBaseTeamSize(e.target.value);
  };

  const handleMaxTeamSizeChange = (e) => {
    setMaxTeamSize(e.target.value);
  };

  return (
    <Card>
      <CardHeader title="Team Settings" />
      <CardContent>
        <FormControl size="medium" sx={{ minWidth: 150, m: 1 }}>
          <InputLabel id="base-team-size">Base team size</InputLabel>
          <Select
            labelId="base-team-size"
            id="base-team-size"
            value={baseTeamSize}
            label="Base team size"
            onChange={handleBaseTeamSizeChange}
          >
            {selectValues.map((value) => (
              <MenuItem key={value.value} value={value.value}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="medium" sx={{ minWidth: 150, m: 1 }}>
          <InputLabel id="base-team-size">Max team size</InputLabel>
          <Select
            labelId="base-team-size"
            id="base-team-size"
            value={maxTeamSize}
            label="Base team size"
            onChange={handleMaxTeamSizeChange}
          >
            {selectValues.slice(baseTeamSize - 1, selectValues.length).map((value) => (
              <MenuItem key={value.value} value={value.value}>
                {value.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

TeamSettings.propTypes = {
  tournament: PropTypes.object.isRequired,
};

export default TeamSettings;
