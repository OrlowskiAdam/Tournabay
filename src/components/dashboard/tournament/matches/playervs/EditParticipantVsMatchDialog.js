import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import TournamentParticipantAutocomplete from "../../../../tournament-participant-autocomplete";
import useTournament from "../../../../../hooks/useTournament";
import { DateTimePicker } from "@mui/lab";
import TournamentStaffMembersAutocomplete from "../../../../staff-autocomplete";
import { matchApi } from "../../../../../api/matchApi";
import { updateMatch } from "../../../../../slices/tournament";
import { notifyOnError } from "../../../../../utils/error-response";

const staffLimit = [1, 2, 3, 4, 5, 6];

const EditParticipantVsMatchDialog = (props) => {
  const { tournament } = useTournament();
  const { closeModal, match } = props;
  const [redParticipant, setRedParticipant] = useState(match.redParticipant);
  const [blueParticipant, setBlueParticipant] = useState(match.blueParticipant);
  const [startDate, setStartDate] = useState(match.ldt);
  const [referees, setReferees] = useState(match.referees);
  const [commentators, setCommentators] = useState(match.commentators);
  const [streamers, setStreamers] = useState(match.streamers);
  const [isLive, setIsLive] = useState(match.isLive);
  const [refereesLimit, setRefereesLimit] = useState(match.refereesLimit);
  const [commentatorsLimit, setCommentatorsLimit] = useState(match.commentatorsLimit);
  const [streamersLimit, setStreamersLimit] = useState(match.streamersLimit);
  const [requestLoading, setRequestLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(match);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (refereesLimit <= 0 || commentatorsLimit <= 0 || streamersLimit <= 0) {
      toast.error("Staff limit must be greater than 0!");
      return;
    }
    if (referees.length > refereesLimit) {
      toast.error("Referees limit exceeded!");
      return;
    }
    if (commentators.length > commentatorsLimit) {
      toast.error("Commentators limit exceeded!");
      return;
    }
    if (streamers.length > streamersLimit) {
      toast.error("Streamers limit exceeded!");
      return;
    }
    if (!startDate) {
      toast.error("Start date is required!");
      return;
    }
    const toastLoadingId = toast.loading("Updating match");
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
      refereesLimit,
      commentatorsLimit,
      streamersLimit,
    };
    matchApi
      .updatePlayerVsMatch(match.id, tournament.id, body)
      .then((response) => {
        toast.success("Match updated successfully!");
        dispatch(updateMatch(response.data));
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
          sx={{ minWidth: "100%" }}
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
          label={`Referees (limit: ${match.refereesLimit})`}
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
              label={`Commentators (Limit: ${match.commentatorsLimit})`}
            />
            <TournamentStaffMembersAutocomplete
              tournament={tournament}
              value={streamers}
              handleStaffChange={handleStreamersChange}
              multiple={true}
              label={`Streamers (Limit: ${match.streamersLimit})`}
            />
          </>
        )}
      </Box>
      <Divider />
      <Typography sx={{ p: 3, pb: 2 }}>Change staff limit for this match only</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", p: 3 }}>
        <FormControl>
          <InputLabel id="referees-limit">Referees limit</InputLabel>
          <Select
            sx={{ width: "160px" }}
            labelId="referees-limit"
            id="referees-limit"
            value={refereesLimit}
            label="Referees limit"
            onChange={(e) => setRefereesLimit(e.target.value)}
          >
            {staffLimit.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="commentators-limit">Commentators limit</InputLabel>
          <Select
            sx={{ width: "160px" }}
            labelId="commentators-limit"
            id="commentators-limit"
            value={commentatorsLimit}
            label="Commentators limit"
            onChange={(e) => setCommentatorsLimit(e.target.value)}
          >
            {staffLimit.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="streamers-limit">Streamers limit</InputLabel>
          <Select
            sx={{ width: "160px" }}
            labelId="streamers-limit"
            id="streamers-limit"
            value={streamersLimit}
            label="Streamers limit"
            onChange={(e) => setStreamersLimit(e.target.value)}
          >
            {staffLimit.map((s) => (
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
          onClick={handleSubmit}
        >
          Update match
        </Button>
      </Box>
    </form>
  );
};

EditParticipantVsMatchDialog.propTypes = {
  closeModal: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default EditParticipantVsMatchDialog;
