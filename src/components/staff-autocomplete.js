import PropTypes from "prop-types";
import { Autocomplete, Avatar, TextField } from "@mui/material";
import { getInitials } from "../utils/get-initials";

const TournamentStaffMembersAutocomplete = (props) => {
  const { tournament, value, handleStaffChange, multiple } = props;
  return (
    <Autocomplete
      sx={{ my: 2 }}
      getOptionLabel={(option) => option.user.username}
      multiple={multiple}
      value={value}
      options={tournament.staffMembers}
      onChange={handleStaffChange}
      isOptionEqualToValue={(option, value) => option.user.id === value.user.id}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Avatar
            sx={{ mr: 1 }}
            alt={getInitials(option.user.avatarUrl)}
            src={option.user.avatarUrl}
          />
          {option.user.username}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          fullWidth
          label="Staff Members"
          name="accessStaffMember"
          variant="outlined"
          {...params}
        />
      )}
    />
  );
};

TournamentStaffMembersAutocomplete.propTypes = {
  tournament: PropTypes.object.isRequired,
  value: PropTypes.array.isRequired,
  handleStaffChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default TournamentStaffMembersAutocomplete;
