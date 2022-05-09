import PropTypes from "prop-types";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormGroup,
  TextField,
} from "@mui/material";
import { getInitials } from "../utils/get-initials";
import { useState } from "react";

const TournamentParticipantsAutocomplete = (props) => {
  const { tournament, value, handleParticipantChange, multiple } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [participantOsuId, setParticipantOsuId] = useState(0);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = () => {
    handleParticipantChange(participantOsuId);
    setDialogOpen(false);
  };

  const handleDialogClose = () => {
    handleParticipantChange(null);
    setDialogOpen(false);
  };

  return (
    <>
      <Autocomplete
        sx={{ mt: 2 }}
        getOptionLabel={(option) => option.user.username}
        multiple={multiple}
        value={value}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        options={tournament.participants}
        filterOptions={(options, params) => {
          let filtered = options.filter((option) => {
            const { inputValue } = params;
            return (
              option.user.username.toLowerCase().includes(inputValue.toLowerCase()) ||
              option.user.osuId.toString().includes(inputValue.toLowerCase())
            );
          });
          if (params.inputValue !== "") {
            if (filtered.length === 0) {
              filtered.push({
                user: {
                  username: "Add new participant",
                  avatarUrl: "https://a.ppy.sh/-1",
                  osuId: params.inputValue,
                },
              });
            }
          }
          return filtered;
        }}
        onChange={(event, newValue) => {
          if (newValue?.user?.avatarUrl === "https://a.ppy.sh/-1") {
            setDialogOpen(true);
            setParticipantOsuId(newValue.osuId);
          } else {
            handleParticipantChange(newValue);
          }
        }}
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
            label="Participants"
            name="participant"
            variant="outlined"
            {...params}
          />
        )}
      />
      <Dialog fullWidth maxWidth="sm" open={dialogOpen} onClose={handleDialogClose}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ p: 3 }}>
            <TextField
              fullWidth
              type="number"
              label="Enter osu ID"
              name="participantId"
              variant="outlined"
              value={participantOsuId}
              defaultValue={participantOsuId}
              onChange={(e) => setParticipantOsuId(e.target.value)}
            />
          </Box>
          <Divider />
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "flex-end",
                display: "flex",
                p: 2,
              }}
            >
              <Button color="primary" sx={{ ml: 1 }} onClick={handleDialogClose}>
                Never-mind
              </Button>
              <Button color="primary" sx={{ ml: 1 }} type="submit" variant="contained">
                Add participant
              </Button>
            </Box>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

TournamentParticipantsAutocomplete.propTypes = {
  tournament: PropTypes.object.isRequired,
  value: PropTypes.array.isRequired,
  handleParticipantChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default TournamentParticipantsAutocomplete;
