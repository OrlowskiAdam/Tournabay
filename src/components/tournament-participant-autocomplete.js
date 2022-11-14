import { useState } from "react";
import { Autocomplete, Avatar, TextField } from "@mui/material";
import { getInitials } from "../utils/get-initials";
import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import AddParticipantForm from "./dashboard/tournament/participants/AddParticipantForm";

const TournamentParticipantAutocomplete = (props) => {
  const { tournament, label, value, handleParticipantChange, multiple = false } = props;
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };

  return (
    <>
      <Autocomplete
        id="participant-autocomplete"
        freeSolo
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        multiple={multiple}
        value={value}
        isOptionEqualToValue={(option, value) => {
          console.log({ option }, { value });
          return option.id === value.id;
        }}
        onChange={(event, newValue) => {
          if (newValue?.user?.username === "Add new participant") {
            setTimeout(() => {
              toggleOpen(true);
            });
          } else {
            handleParticipantChange(event, newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = options.filter((option) => {
            return (
              option.user.username.toLowerCase().includes(params.inputValue.toLowerCase()) ||
              option.user.osuId.toString().includes(params.inputValue)
            );
          });

          if (filtered.length === 0 && params.inputValue !== "") {
            filtered.push({
              user: {
                username: "Add new participant",
                avatarUrl: "https://a.ppy.sh/-1",
                osuId: 0,
              },
            });
          }

          return filtered;
        }}
        getOptionLabel={(option) => {
          return option?.user?.username;
        }}
        renderOption={(props, option) => (
          <li {...props}>
            <Avatar
              sx={{ mr: 1 }}
              alt={getInitials(option.user.avatarUrl)}
              src={option.user.avatarUrl}
            />
            {option.user.username}
          </li>
        )}
        sx={{ my: 2 }}
        renderInput={(params) => <TextField {...params} label={label} />}
        options={tournament.participants}
      />
      <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
        {open && (
          <AddParticipantForm closeModal={handleClose} toastLabelLoading="Adding participant" />
        )}
      </Dialog>
    </>
  );
};

TournamentParticipantAutocomplete.propTypes = {
  tournament: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  handleParticipantChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default TournamentParticipantAutocomplete;
