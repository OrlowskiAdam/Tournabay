import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useTournament from "../../../../hooks/useTournament";
import { teamApi } from "../../../../api/teamApi";
import { updateTeam } from "../../../../slices/tournament";
import TournamentParticipantsAutocomplete from "../../../tournament-participants-autocomplete";
import TournamentParticipantAutocomplete from "../../../tournament-participant-autocomplete";

const seedValues = ["TOP", "HIGH", "MID", "LOW", "OUT", "UNKNOWN", "NONE"];
const teamStatusValues = ["ACTIVE", "PENDING", "REJECTED", "OUT", "UNKNOWN"];

const EditTeamDialog = (props) => {
  const { team, closeModal } = props;
  const { tournament } = useTournament();
  const [teamName, setTeamName] = useState(team.name);
  const [participants, setParticipants] = useState(team.participants);
  const [captain, setCaptain] = useState(team.captain);
  const [seed, setSeed] = useState(team.seed);
  const [teamStatus, setTeamStatus] = useState(team.status);
  const [requestLoading, setRequestLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    const toastLoadingId = toast.loading("Adding team");
    if (!captain) {
      toast.remove(toastLoadingId);
      toast.error("Captain cannot be empty!");
      return;
    }
    let participantIds = participants.map((p) => p.id);
    participantIds = [...participantIds, captain.id];
    const body = {
      name: teamName,
      captainId: captain.id,
      participantIds,
      seed,
      status: teamStatus,
    };
    teamApi
      .updateTeam(tournament.id, team.id, body)
      .then((res) => {
        toast.success("Team created successfully");
        dispatch(updateTeam(res.data));
        closeModal();
      })
      .catch((err) => {
        console.log(err.response);
        const errors = err.response?.data.errors ?? undefined;
        if (errors) {
          toast.error(errors[0].defaultMessage);
        } else {
          toast.error(err.response.data.message);
        }
      })
      .finally(() => {
        toast.remove(toastLoadingId);
      });
  };

  const handleParticipantsChange = (e, v) => {
    setParticipants(v);
  };

  const handleCaptainChange = (e, v) => {
    setCaptain(v);
  };

  const handleSeedChange = (e) => {
    setSeed(e.target.value);
  };

  const handleTeamStatusChange = (e) => {
    setTeamStatus(e.target.value);
  };

  return (
    <form>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          type="text"
          label="Enter team name"
          name="teamName"
          variant="outlined"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Typography color="textPrimary" gutterBottom variant="subtitle2">
          Roster
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="body2">
          Team is required to have at least {tournament.settings.baseTeamSize}{" "}
          {tournament.settings.baseTeamSize === 1 ? "participant" : "participants"} (configurable in
          Settings). The first added participant will be the captain.
        </Typography>
        <FormGroup>
          <TournamentParticipantAutocomplete
            tournament={tournament}
            value={captain}
            handleParticipantChange={handleCaptainChange}
            label="Choose captain"
          />
          <TournamentParticipantsAutocomplete
            tournament={tournament}
            value={participants}
            handleParticipantChange={handleParticipantsChange}
            label="Choose participants"
          />
        </FormGroup>
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="team-seed">Seed</InputLabel>
          <Select
            labelId="team-seed"
            id="team-seed"
            value={seed}
            label="Seed"
            onChange={handleSeedChange}
          >
            {seedValues.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="team-status">Status</InputLabel>
          <Select
            labelId="team-status"
            id="team-status"
            value={teamStatus}
            label="Status"
            onChange={handleTeamStatusChange}
          >
            {teamStatusValues.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          p: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="primary"
          sx={{ ml: 1 }}
          type="submit"
          variant="contained"
          disabled={requestLoading}
          onClick={handleUpdate}
        >
          Update {team.name}
        </Button>
      </Box>
    </form>
  );
};

EditTeamDialog.propTypes = {
  team: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditTeamDialog;
