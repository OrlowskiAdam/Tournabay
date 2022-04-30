import PropTypes from "prop-types";
import { Avatar, Box, Button, Divider, Link, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useTournament from "../../../../hooks/useTournament";
import { updateParticipant } from "../../../../slices/tournament";
import TournamentTeamsAutocomplete from "../../../team-autocomplete";
import { participantApi } from "../../../../api/participantApi";

const EditParticipant = (props) => {
  const { participant, closeModal } = props;
  const [participantsTeam, setParticipantsTeam] = useState(null);
  const [discordId, setDiscordId] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const { tournament } = useTournament();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tournament.teamFormat === "TEAM_VS") {
      tournament.teams.forEach((team) => {
        if (team.id === participant.teamId) {
          setParticipantsTeam(team);
        }
      });
    }
  }, [participant]);

  const handleUpdateParticipant = () => {
    setRequestLoading(true);
    const toastLoadingId = toast.loading("Updating participant");
    const body = {
      discordId,
      teamId: participantsTeam?.id,
    };
    participantApi
      .updateParticipant(participant.id, tournament.id, body)
      .then((response) => {
        dispatch(updateParticipant(response.data));
        toast.success(`${participant.user.username} updated!`);
        closeModal();
      })
      .catch((error) => {
        // err
        console.error(error.response);
      })
      .finally(() => {
        toast.remove(toastLoadingId);
        setRequestLoading(false);
      });
  };

  const handleDiscordIdChange = (e) => {
    setDiscordId(e.target.value);
  };

  const handleTeamChange = (event, value) => {
    setParticipantsTeam(value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          mt: 2,
        }}
      >
        <Avatar
          alt="Applicant"
          src={participant.user.avatarUrl}
          sx={{
            border: "3px solid #FFFFFF",
            height: 100,
            width: 100,
          }}
        />
      </Box>
      <Link align="center" color="textPrimary" display="block" underline="none" variant="h6">
        {participant.user.username}
      </Link>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Discord ID"
          name="discordId"
          variant="outlined"
          value={discordId}
          defaultValue={participant.discordId}
          onChange={handleDiscordIdChange}
        />
        <TournamentTeamsAutocomplete
          tournament={tournament}
          value={participantsTeam}
          handleTeamChange={handleTeamChange}
          multiple={false}
        />
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexWrap: "wrap",
          p: 2,
        }}
      >
        <Box sx={{ m: 1 }}>
          <Tooltip title="Restores discord ID assigned to the user, not staff member.">
            <Button color="secondary" variant="outlined" disabled>
              Restore discord ID
            </Button>
          </Tooltip>
        </Box>
        <Box sx={{ m: 1 }}>
          <Button color="primary" sx={{ mr: 2 }} variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            onClick={handleUpdateParticipant}
            disabled={requestLoading}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

EditParticipant.propTypes = {
  participant: PropTypes.object,
  closeModal: PropTypes.func,
};

export default EditParticipant;
