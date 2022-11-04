import PropTypes from "prop-types";
import { Autocomplete, Avatar, TextField } from "@mui/material";

const GroupAutocomplete = (props) => {
  const { groups, value, handleGroupChange } = props;

  return (
    <Autocomplete
      sx={{ my: 2 }}
      disableClearable
      getOptionLabel={(option) => option.symbol}
      value={value}
      options={groups}
      onChange={handleGroupChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => <li {...props}>{option.symbol}</li>}
      renderInput={(params) => (
        <TextField fullWidth label="Group" name="group" variant="outlined" {...params} />
      )}
    />
  );
};

GroupAutocomplete.propTypes = {
  groups: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  handleGroupChange: PropTypes.func.isRequired,
};

export default GroupAutocomplete;
