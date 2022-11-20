import PropTypes from "prop-types";
import { Box, Button, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { DateTimePicker } from "@mui/lab";
import useTournament from "../../../../hooks/useTournament";
import { qualificationsApi } from "../../../../api/qualificationsApi";
import { addQualificationRoom, updateQualificationRoom } from "../../../../slices/tournament";
import { notifyOnError } from "../../../../utils/error-response";
import TournamentStaffMembersAutocomplete from "../../../staff-autocomplete";
import TeamAutocomplete from "../../../team-autocomplete";
import { parseDate } from "../../../../utils/date-time-utils";
import TournamentParticipantAutocomplete from "../../../tournament-participant-autocomplete";

const EditQualificationRoomDialog = (props) => {
  const { tournament } = useTournament();
  const { closeModal, room } = props;
  const [startDate, setStartDate] = useState(room.startDate);
  const [teams, setTeams] = useState(room.teams);
  const [participants, setParticipants] = useState(room.participants);
  const [referees, setReferees] = useState(room.staffMembers);
  const [requestLoading, setRequestLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const toastLoadingId = toast.loading("Creating qualification room");
    let body = {
      startDate,
      staffMemberIds: referees.map((referee) => referee.id),
    };
    if (tournament.teamFormat === "TEAM_VS") {
      body = {
        teamIds: teams?.map((team) => team.id),
        type: "team",
        ...body,
      };
    } else if (tournament.teamFormat === "PLAYER_VS") {
      body = {
        participantIds: participants?.map((participant) => participant.id),
        type: "player",
        ...body,
      };
    }
    console.log(body);
    qualificationsApi
      .updateQualificationRoom(room.id, tournament.id, body)
      .then((response) => {
        toast.success("Room updated successfully!");
        dispatch(updateQualificationRoom(response.data));
        closeModal();
      })
      .catch((error) => {
        notifyOnError(error);
      })
      .finally(() => {
        setRequestLoading(false);
        toast.remove(toastLoadingId);
      });
  };

  const handleRefereesChange = (e, v) => {
    setReferees(v);
  };

  const handleTeamsChange = (e, v) => {
    setTeams(v);
  };

  const handleParticipantsChange = (e, v) => {
    setParticipants(v);
  };

  const handleStartDateChange = (v) => {
    setStartDate(v);
  };

  return (
    <form>
      <Box sx={{ px: 3 }}>
        <h3>ROOM {room.symbol}</h3>
        <h5>{parseDate(room.startDate)}</h5>
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <DateTimePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(inputProps) => <TextField {...inputProps} />}
        />
      </Box>
      <Divider />
      <Box sx={{ px: 3 }}>
        <TournamentStaffMembersAutocomplete
          tournament={tournament}
          value={referees}
          handleStaffChange={handleRefereesChange}
          multiple={true}
          label={`Referees`}
        />
      </Box>
      <Divider />
      <Box sx={{ px: 3 }}>
        {tournament.teamFormat === "TEAM_VS" ? (
          <TeamAutocomplete
            tournament={tournament}
            value={teams}
            handleTeamChange={handleTeamsChange}
            multiple={true}
          />
        ) : (
          <TournamentParticipantAutocomplete
            tournament={tournament}
            label={"Choose participants"}
            value={participants}
            handleParticipantChange={handleParticipantsChange}
            multiple={true}
          />
        )}
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
          onClick={handleSubmit}
        >
          Update qualification room
        </Button>
      </Box>
    </form>
  );
};

EditQualificationRoomDialog.propTypes = {
  room: PropTypes.object.isRequired,
  closeModal: PropTypes.func,
};

export default EditQualificationRoomDialog;
