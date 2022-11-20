import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "../../../../store";
import Scrollbar from "../../../scrollbar";
import EditQualificationResult from "./EditQualificationResult";
import EditIcon from "@mui/icons-material/Edit";
import QualificationRoomAutocomplete from "../../../qualification-room-autocomplete";
import toast from "react-hot-toast";
import { qualificationsApi } from "../../../../api/qualificationsApi";
import { notifyOnError } from "../../../../utils/error-response";
import { mappoolApi } from "../../../../api/mappoolApi";
import { setQualificationResultsDto } from "../../../../slices/tournament";

const QualificationResultsTable = (props) => {
  const { tournament } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [lobbyId, setLobbyId] = useState(null);
  const [room, setRoom] = useState(null);
  const [beatmaps, setBeatmaps] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    mappoolApi.getQualifierBeatmaps(tournament.id).then((response) => {
      setBeatmaps(response.data);
      qualificationsApi.getQualificationResults(tournament.id).then((response) => {
        dispatch(setQualificationResultsDto(response.data));
      });
    });
  }, []);

  const handleRoomChange = (e, v) => {
    setRoom(v);
  };

  const handleSubmitScoresButton = (e) => {
    e.preventDefault();
    if (!lobbyId || lobbyId === "") {
      toast.error("Specify lobby id");
      return;
    }
    if (!room) {
      toast.error("Specify qualification room");
      return;
    }
    const toastLoadingId = toast.loading("Collecting data...");
    qualificationsApi
      .submitScores(lobbyId, room.id, tournament.id)
      .then((response) => {
        toast.success("Scores submitted");
        qualificationsApi.getQualificationResults(tournament.id).then((response) => {
          dispatch(setQualificationResultsDto(response.data));
          toast.dismiss(fetch);
        });
      })
      .catch((error) => {
        notifyOnError(error);
      })
      .finally(() => {
        setIsLoading(false);
        toast.remove(toastLoadingId);
      });
  };

  return (
    <Box>
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <CardHeader title="Qualification results" />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <TextField
              type="text"
              label="Lobby ID"
              name="mp-link"
              variant="outlined"
              value={lobbyId}
              onChange={(e) => setLobbyId(e.target.value)}
            />
            <QualificationRoomAutocomplete
              sx={{ minWidth: 150, m: 2 }}
              rooms={tournament.qualificationRooms}
              value={room}
              handleRoomChange={handleRoomChange}
            />
            <Button
              sx={{ mr: 2 }}
              color="primary"
              startIcon={<AddIcon />}
              variant="contained"
              disabled={isLoading}
              onClick={handleSubmitScoresButton}
            >
              Submit result
            </Button>
          </Box>
        </Box>
        <Scrollbar>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Team</TableCell>
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
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beatmaps.length > 0 &&
                  tournament?.qualificationResultsDto?.map((result) => (
                    <QualificationResultRow
                      key={result.qualificationPoints}
                      result={result}
                      beatmaps={beatmaps}
                      tournament={tournament}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Box>
  );
};

const QualificationResultRow = (props) => {
  const { result, beatmaps, tournament } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <TableRow key={result.id} hover>
        <TableCell>{result.team.name}</TableCell>
        {beatmaps?.map((beatmap) => {
          const s = result.scores.find((s) => beatmap?.id === s.beatmap.id);
          return (
            <>
              <Tooltip
                arrow
                title={
                  <Box>
                    <p>x̄Score: {s?.averageScore}</p>
                    <p>x̄Acc: {s?.averageAccuracy * 100}%</p>
                    <p>Points: {s?.qualificationPoints}</p>
                  </Box>
                }
              >
                <TableCell key={s?.id}>
                  {tournament.scoreType === "ACCURACY"
                    ? (s?.averageAccuracy * 100).toFixed(2) + "%"
                    : s?.averageScore}{" "}
                  <Typography
                    sx={{
                      display: "inline",
                      color: s?.qualificationPoints === 1 ? "red" : "aqua",
                    }}
                    variant="body2"
                  >
                    ({s?.qualificationPoints.toFixed(2)})
                  </Typography>
                </TableCell>
              </Tooltip>
            </>
          );
        })}
        <TableCell sx={{ color: "red", fontWeight: "bold" }}>
          {result.qualificationPoints.toFixed(2)}
        </TableCell>
        <TableCell>
          <IconButton color="inherit" edge="end" onClick={() => handleDialogOpen()}>
            <EditIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog fullWidth maxWidth="xl" onClose={handleDialogClose} open={isDialogOpen}>
        {isDialogOpen && (
          <EditQualificationResult
            openModal={handleDialogOpen}
            closeModal={handleDialogClose}
            results={result.team}
            beatmaps={beatmaps}
            tournament={tournament}
            team={result.team}
          />
        )}
      </Dialog>
    </>
  );
};

QualificationResultsTable.propTypes = {
  tournament: PropTypes.object.isRequired,
};

QualificationResultRow.propTypes = {
  result: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
  beatmaps: PropTypes.array.isRequired,
};

export default QualificationResultsTable;
