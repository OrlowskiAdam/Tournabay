import PropTypes from "prop-types";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { qualificationsApi } from "../../../../api/qualificationsApi";
import { notifyOnError } from "../../../../utils/error-response";
import Scrollbar from "../../../scrollbar";
import QualificationRoomAutocomplete from "../../../qualification-room-autocomplete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { setQualificationResultsDto } from "../../../../slices/tournament";

const EditQualificationResult = (props) => {
  const { closeModal, openModal, beatmaps, tournament, team } = props;
  const [requestLoading, setRequestLoading] = useState(true);
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    qualificationsApi
      .getQualificationResultsByTeam(tournament.id, team.id)
      .then((response) => {
        console.log(response.data);
        setResults(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setRequestLoading(false));
  }, []);

  if (requestLoading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleScoresUpdate = (e) => {
    setRequestLoading(true);
    let newScores = [];
    results.forEach((result) => {
      const participantScores = result.participantScores;
      const newScore = participantScores.map((score) => {
        return {
          participantScoreId: score.id,
          newScore: score.score,
          newAccuracy: score.accuracy,
        };
      });
      newScores.push(newScore);
    });
    const body = {
      qualificationResults: newScores.flat(),
    };
    qualificationsApi
      .updateQualificationResults(tournament.id, body)
      .then((response) => {
        dispatch(setQualificationResultsDto(response.data));
        closeModal();
      })
      .catch((error) => console.error(error))
      .finally(() => setRequestLoading(false));
  };

  const handleDeleteParticipantScore = (participantId) => {
    setRequestLoading(true);
    qualificationsApi
      .deleteParticipantQualificationResults(tournament.id, participantId)
      .then((response) => {
        dispatch(setQualificationResultsDto(response.data));
      })
      .catch((error) => console.error(error))
      .finally(() => setRequestLoading(false));
  };

  const handleDeleteAllScores = (teamId) => {
    setRequestLoading(true);
    qualificationsApi
      .deleteQualificationResults(tournament.id, teamId)
      .then((response) => {
        dispatch(setQualificationResultsDto(response.data));
        closeModal();
      })
      .catch((error) => console.error(error))
      .finally(() => setRequestLoading(false));
  };

  const handleScoreChange = (e, participantId, beatmapId) => {
    const newResults = [...results];
    const result = newResults.find((r) => r.participant.id === participantId);
    const score = result.participantScores.find((s) => s.beatmap.beatmapId === beatmapId);
    if (tournament.scoreType === "ACCURACY") {
      score.accuracy = e.target.value;
    } else {
      score.score = e.target.value;
    }
    setResults(newResults);
  };

  return (
    <>
      <Scrollbar>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Participant</TableCell>
                {beatmaps?.map((beatmap) => {
                  return (
                    <TableCell
                      key={beatmap.id}
                      sx={{
                        "&:before": {
                          content: "''",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${beatmap.normalCover})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          opacity: 0.4,
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          position: "relative",
                          textShadow: "2px 3px 5px rgba(0,0,0,0.5)",
                          color: "white !important",
                        }}
                      >
                        {beatmap.modification + beatmap.position}
                      </Typography>
                    </TableCell>
                  );
                })}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result) => {
                return (
                  <TableRow key={result.id}>
                    <TableCell>{result.participant.user.username}</TableCell>
                    {beatmaps?.map((beatmap) => {
                      const s = result.participantScores.find((s) => beatmap.id === s.beatmap.id);
                      return (
                        <TableCell key={s?.id}>
                          <ResultInput
                            tournament={tournament}
                            participantScore={s}
                            participant={result.participant}
                            handleScoreChange={handleScoreChange}
                          />
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        color="error"
                        disabled={requestLoading}
                        onClick={() => handleDeleteParticipantScore(result.participant.id)}
                      >
                        <DeleteForeverIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Divider />
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end", alignItems: "right" }}>
        <Button
          color="error"
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => handleDeleteAllScores(team.id)}
          disabled={requestLoading}
        >
          Remove all scores
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{ m: 1 }}
          onClick={handleScoresUpdate}
          disabled={requestLoading}
        >
          Update scores
        </Button>
      </Box>
    </>
  );
};

const ResultInput = (props) => {
  const { tournament, participantScore, participant, handleScoreChange } = props;
  if (!participantScore) return null;
  const { modification, position } = participantScore.beatmap;

  return (
    <TextField
      sx={{
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          display: "none",
        },
        "& input[type=number]": {
          MozAppearance: "textfield",
        },
      }}
      type="number"
      fullWidth
      label={modification + position}
      name={modification + position}
      value={
        tournament.scoreType === "ACCURACY" ? participantScore.accuracy : participantScore.score
      }
      onChange={(e) => handleScoreChange(e, participant.id, participantScore.beatmap.beatmapId)}
      variant="outlined"
    />
  );
};

EditQualificationResult.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  beatmaps: PropTypes.array.isRequired,
  tournament: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

export default EditQualificationResult;
