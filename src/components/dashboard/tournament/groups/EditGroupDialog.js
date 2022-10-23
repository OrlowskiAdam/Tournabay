import PropTypes from "prop-types";
import { Box, Button, Divider, IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useTournament from "../../../../hooks/useTournament";
import TournamentTeamsAutocomplete from "../../../team-autocomplete";
import { groupApi } from "../../../../api/groupApi";
import { updateGroup } from "../../../../slices/tournament";
import toast from "react-hot-toast";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const EditGroupDialog = (props) => {
  const { group, closeModal } = props;
  const { tournament } = useTournament();
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const dispatch = useDispatch();

  const handleTeamChange = (event, value) => {
    groupApi
      .assignTeamToGroup(group.id, tournament.id, value.id)
      .then((response) => {
        dispatch(updateGroup(response.data));
        toast.success("Team added to group successfully");
        setAutocompleteValue(null);
      })
      .catch((error) => console.error(error));
  };

  const handleTeamDelete = (teamId) => {
    groupApi
      .removeTeamFromGroup(group.id, tournament.id, teamId)
      .then((response) => {
        dispatch(updateGroup(response.data));
        toast.success("Team removed from group successfully");
      })
      .catch((error) => console.error(error));
  };

  const teams = () => (
    <Box sx={{ width: "calc(100% / 2)" }}>
      <h5>Teams</h5>
      {group.teams.map((team) => (
        <Box key={team.id} sx={{ display: "flex", justifyContent: "space-between" }}>
          <div key={team.id}>{team.name}</div>
          <IconButton color="error" onClick={() => handleTeamDelete(team.id)}>
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Box>
        <TournamentTeamsAutocomplete
          tournament={tournament}
          value={autocompleteValue}
          handleTeamChange={handleTeamChange}
          multiple={false}
        />
      </Box>
    </Box>
  );

  const participants = () => (
    <Box sx={{ width: "calc(100% / 2)" }}>
      <h5>Players</h5>
      {group.participants.map((participant) => (
        <div key={participant.id}>{participant.user.username}</div>
      ))}
    </Box>
  );

  const matches = () => {
    if (tournament.teamFormat === "TEAM_VS") {
      return (
        <Box sx={{ width: "calc(100% / 2)" }}>
          <h5>Matches</h5>
          {group.matches.map((match) => (
            <div key={match.id}>{match.name}</div>
          ))}
        </Box>
      );
    }
  };

  return (
    <form>
      <Box sx={{ p: 2 }}>
        <h3>Group {group.symbol}</h3>
      </Box>
      <Divider />
      <Box sx={{ p: 2, display: "flex" }}>
        {tournament.teamFormat === "TEAM_VS" ? teams() : participants()}
        <Divider orientation={"vertical"} flexItem sx={{ mx: 2 }} />
        {matches()}
      </Box>
    </form>
  );
};

EditGroupDialog.propTypes = {
  group: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditGroupDialog;
