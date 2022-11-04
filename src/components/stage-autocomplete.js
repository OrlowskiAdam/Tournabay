import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

const StageAutocomplete = (props) => {
  const { stages, value, handleStageChange, label = "Stage" } = props;
  return (
    <Autocomplete
      sx={{ my: 2 }}
      value={value}
      disableClearable
      options={stages}
      onChange={handleStageChange}
      isOptionEqualToValue={(option, value) => option === value}
      renderOption={(props, option, { selected }) => <li {...props}>{option}</li>}
      renderInput={(params) => (
        <TextField fullWidth label={label} name="stage" variant="outlined" {...params} />
      )}
    />
  );
};

StageAutocomplete.propTypes = {
  stages: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  handleStageChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default StageAutocomplete;
