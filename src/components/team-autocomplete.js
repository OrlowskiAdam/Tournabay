import PropTypes from "prop-types";
import { Autocomplete, Avatar, TextField } from "@mui/material";

const TournamentTeamsAutocomplete = (props) => {
  const { tournament, value, handleTeamChange, multiple } = props;

  if (tournament.teamFormat === "PLAYER_VS") return null;

  return (
    <Autocomplete
      sx={{ my: 2 }}
      getOptionLabel={(option) => option.name}
      multiple={multiple}
      value={value}
      options={tournament.teams}
      onChange={handleTeamChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => <li {...props}>{option.name}</li>}
      renderInput={(params) => (
        <TextField fullWidth label="Team" name="team" variant="outlined" {...params} />
      )}
    />
  );
};

TournamentTeamsAutocomplete.propTypes = {
  tournament: PropTypes.object.isRequired,
  value: PropTypes.array.isRequired,
  handleTeamChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default TournamentTeamsAutocomplete;
