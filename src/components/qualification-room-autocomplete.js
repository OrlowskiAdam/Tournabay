import PropTypes from "prop-types";
import { Autocomplete, Avatar, TextField } from "@mui/material";

const QualificationRoomAutocomplete = (props) => {
  const { rooms, value, handleRoomChange, sx } = props;

  return (
    <Autocomplete
      sx={sx}
      disableClearable
      getOptionLabel={(option) => option.symbol}
      value={value}
      options={rooms}
      onChange={handleRoomChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => <li {...props}>{option.symbol}</li>}
      renderInput={(params) => (
        <TextField fullWidth label="Room" name="room" variant="outlined" {...params} />
      )}
    />
  );
};

QualificationRoomAutocomplete.propTypes = {
  rooms: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  handleRoomChange: PropTypes.func.isRequired,
  sx: PropTypes.object,
};

export default QualificationRoomAutocomplete;
