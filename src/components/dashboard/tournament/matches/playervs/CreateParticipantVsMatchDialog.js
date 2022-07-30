import PropTypes from "prop-types";
import { Box, Button, Checkbox, Divider, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import TournamentParticipantAutocomplete from "../../../../tournament-participant-autocomplete";
import useTournament from "../../../../../hooks/useTournament";
import { DateTimePicker } from "@mui/lab";
import TournamentStaffMembersAutocomplete from "../../../../staff-autocomplete";
import { matchApi } from "../../../../../api/matchApi";
import { addMatch } from "../../../../../slices/tournament";
import { notifyOnError } from "../../../../../utils/error-response";

const CreateParticipantVsMatchDialog = (props) => {
  const { tournament } = useTournament();
  const [redParticipant, setRedParticipant] = useState(null);
  const [blueParticipant, setBlueParticipant] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [referees, setReferees] = useState([]);
  const [commentators, setCommentators] = useState([]);
  const [streamers, setStreamers] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const { closeModal } = props;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const toastLoadingId = toast.loading("Creating new match");
    setRequestLoading(true);
    const refereesId = referees.map((p) => p.id);
    const commentatorsId = commentators.map((p) => p.id);
    const streamersId = streamers.map((p) => p.id);
    const redParticipantId = redParticipant ? redParticipant.id : null;
    const blueParticipantId = blueParticipant ? blueParticipant.id : null;
    const body = {
      startDate,
      isLive,
      redParticipantId,
      blueParticipantId,
      refereesId,
      commentatorsId,
      streamersId,
    };
    console.log(body);
    matchApi
      .createMatch(tournament.id, body)
      .then((response) => {
        toast.success("Match created successfully!");
        dispatch(addMatch(response.data));
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

  const handleRedParticipantChange = (e, v) => {
    setRedParticipant(v);
  };

  const handleBlueParticipantChange = (e, v) => {
    setBlueParticipant(v);
  };

  const handleStartDateChange = (v) => {
    setStartDate(v);
  };

  const handleRefereesChange = (e, v) => {
    setReferees(v);
  };

  const handleCommentatorsChange = (e, v) => {
    setCommentators(v);
  };

  const handleStreamersChange = (e, v) => {
    setStreamers(v);
  };

  return (
    <form>
      <Box sx={{ p: 3 }}>
        <TournamentParticipantAutocomplete
          tournament={tournament}
          value={redParticipant}
          handleParticipantChange={handleRedParticipantChange}
          label="Red participant"
        />
        <p style={{ textAlign: "center" }}>VS.</p>
        <TournamentParticipantAutocomplete
          tournament={tournament}
          value={blueParticipant}
          handleParticipantChange={handleBlueParticipantChange}
          label="Blue participant"
        />
        <br />
        <DateTimePicker
          label="Start Date"
          disablePast={true}
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(inputProps) => <TextField {...inputProps} />}
        />
        <br />
        <TournamentStaffMembersAutocomplete
          tournament={tournament}
          value={referees}
          handleStaffChange={handleRefereesChange}
          multiple={true}
          label={`Referees (limit: ${tournament.settings.refereesLimit})`}
        />
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <FormControlLabel
          control={<Checkbox checked={isLive} onChange={() => setIsLive(!isLive)} />}
          label="This match will be streamed"
        />
        {isLive && (
          <>
            <TournamentStaffMembersAutocomplete
              tournament={tournament}
              value={commentators}
              handleStaffChange={handleCommentatorsChange}
              multiple={true}
              label={`Commentators (Limit: ${tournament.settings.commentatorsLimit})`}
            />
            <TournamentStaffMembersAutocomplete
              tournament={tournament}
              value={streamers}
              handleStaffChange={handleStreamersChange}
              multiple={true}
              label={`Streamers (Limit: ${tournament.settings.streamersLimit})`}
            />
          </>
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
          Create new match
        </Button>
      </Box>
    </form>
  );
};

CreateParticipantVsMatchDialog.propTypes = {
  closeModal: PropTypes.func,
};

export default CreateParticipantVsMatchDialog;
