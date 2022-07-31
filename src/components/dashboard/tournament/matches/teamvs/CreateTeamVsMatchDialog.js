import PropTypes from "prop-types";
import { Box, Button, Checkbox, Divider, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useTournament from "../../../../../hooks/useTournament";
import { DateTimePicker } from "@mui/lab";
import TournamentStaffMembersAutocomplete from "../../../../staff-autocomplete";
import { matchApi } from "../../../../../api/matchApi";
import { addMatch } from "../../../../../slices/tournament";
import { notifyOnError } from "../../../../../utils/error-response";
import TeamAutocomplete from "../../../../team-autocomplete";

const CreateTeamVsMatchDialog = (props) => {
  const { tournament } = useTournament();
  const [redTeam, setRedTeam] = useState(null);
  const [blueTeam, setBlueTeam] = useState(null);
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
    const redTeamId = redTeam ? redTeam.id : null;
    const blueTeamId = blueTeam ? blueTeam.id : null;
    const body = {
      startDate,
      isLive,
      redTeamId,
      blueTeamId,
      refereesId,
      commentatorsId,
      streamersId,
    };
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

  const handleRedTeamChange = (e, v) => {
    setRedTeam(v);
  };

  const handleBlueTeamChange = (e, v) => {
    setBlueTeam(v);
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
        <TeamAutocomplete
          tournament={tournament}
          value={redTeam}
          handleTeamChange={handleRedTeamChange}
        />
        <p style={{ textAlign: "center" }}>VS.</p>
        <TeamAutocomplete
          tournament={tournament}
          value={blueTeam}
          handleTeamChange={handleBlueTeamChange}
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

CreateTeamVsMatchDialog.propTypes = {
  closeModal: PropTypes.func,
};

export default CreateTeamVsMatchDialog;
