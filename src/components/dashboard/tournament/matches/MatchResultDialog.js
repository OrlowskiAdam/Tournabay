import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import useTournament from "../../../../hooks/useTournament";
import { matchApi } from "../../../../api/matchApi";
import { updateMatch } from "../../../../slices/tournament";
import { notifyOnError } from "../../../../utils/error-response";

const MatchResultDialog = (props) => {
  const { tournament } = useTournament();
  const { closeModal, match } = props;
  const [requestLoading, setRequestLoading] = useState(false);
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [lobbyUrl, setLobbyUrl] = useState("");
  const dispatch = useDispatch();

  const getBlueName = () => {
    if (tournament.teamFormat === "TEAM_VS") {
      return match.blueTeam.name;
    } else {
      return match.blueParticipant.user.username;
    }
  };

  const getRedName = () => {
    if (tournament.teamFormat === "TEAM_VS") {
      return match.redTeam.name;
    } else {
      return match.redParticipant.user.username;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestLoading(true);
    const data = {
      redScore,
      blueScore,
      lobbyUrl,
    };
    matchApi
      .submitResult(match.id, tournament.id, data)
      .then((response) => {
        dispatch(updateMatch(response.data));
        closeModal();
      })
      .catch((error) => {
        notifyOnError(error);
      })
      .finally(() => {
        setRequestLoading(false);
      });
  };

  return (
    <form>
      <Box sx={{ p: 3, display: "flex", alignItems: "center" }}>
        <h4>{getRedName()} score</h4>
        <Slider
          defaultValue={0}
          max={20}
          aria-label="Default"
          valueLabelDisplay="auto"
          value={redScore}
          onChange={(e, value) => setRedScore(value)}
        />
      </Box>
      <Box sx={{ p: 3, display: "flex", alignItems: "center" }}>
        <h4>{getBlueName()} score</h4>
        <Slider
          max={20}
          defaultValue={0}
          aria-label="Default"
          valueLabelDisplay="auto"
          value={blueScore}
          onChange={(e, value) => setBlueScore(value)}
        />
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Enter lobby URL here"
          name="lobby-url"
          onChange={(e) => setLobbyUrl(e.target.value)}
          value={lobbyUrl}
          variant="outlined"
        />
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
          Submit result
        </Button>
      </Box>
    </form>
  );
};

MatchResultDialog.propTypes = {
  closeModal: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default MatchResultDialog;
