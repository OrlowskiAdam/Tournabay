import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

const TournamentRolesAutocomplete = (props) => {
  const { tournament, value, handleRolesChange, multiple } = props;
  return (
    <Autocomplete
      sx={{ my: 2 }}
      getOptionLabel={(option) => option.name}
      multiple={multiple}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={tournament.roles}
      onChange={handleRolesChange}
      renderInput={(params) => (
        <TextField
          fullWidth
          label="Tournament roles"
          name="accessRoles"
          variant="outlined"
          {...params}
        />
      )}
    />
  );
};

TournamentRolesAutocomplete.propTypes = {
  tournament: PropTypes.object.isRequired,
  value: PropTypes.array,
  handleRolesChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default TournamentRolesAutocomplete;
