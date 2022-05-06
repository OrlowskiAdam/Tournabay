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

const TeamSettings = () => {
  const [baseTeamSize, setBaseTeamSize] = useState(2);
  const [maxTeamSize, setMaxTeamSize] = useState(4);

  const handleBaseTeamSizeChange = (e) => {
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
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default TeamSettings;
