import TournamentGuard from "../../../../../guards/TournamentGuard";
import { DashboardLayout } from "../../../../dashboard-layout";
import TournamentData from "../../../../../guards/TournamentData";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Scrollbar from "../../../../scrollbar";
import { useState } from "react";
import PropTypes from "prop-types";
import { SeverityPill } from "../../../../severity-pill";
import { getInitials } from "../../../../../utils/get-initials";
import { matchApi } from "../../../../../api/matchApi";
import { notifyOnError } from "../../../../../utils/error-response";
import toast from "react-hot-toast";
import { removeMatch } from "../../../../../slices/tournament";
import { useDispatch } from "react-redux";
import CreateTeamVsMatchDialog from "./CreateTeamVsMatchDialog";
import EditTeamVsMatchDialog from "./EditTeamVsMatchDialog";
import MatchResultDialog from "../MatchResultDialog";

const ParticipantVsMatchesTable = (props) => {
  const { matches } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCreateMatchButton = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <CardHeader title="Matches" />
          <Button
            color="primary"
            sx={{ m: 2 }}
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleCreateMatchButton}
          >
            Create match
          </Button>
        </Box>
        <Scrollbar>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Red</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Blue</TableCell>
                  <TableCell>Starts at</TableCell>
                  <TableCell>Referees</TableCell>
                  <TableCell>Commentators</TableCell>
                  <TableCell>Streamers</TableCell>
                  <TableCell>Live?</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matches.map((match) => (
                  <MatchRow key={match.id} match={match} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={isDialogOpen}>
        {isDialogOpen && <CreateTeamVsMatchDialog closeModal={handleDialogClose} />}
      </Dialog>
    </>
  );
};

const MatchRow = (props) => {
  const { match } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [isRequestLoading, setRequestLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteButton = () => {
    setRequestLoading(true);
    const toastLoadingId = toast.loading("Deleting match");
    setRequestLoading(true);
    matchApi
      .deleteMatch(match.id, match.tournament)
      .then((response) => {
        dispatch(removeMatch(response.data.id));
        toast.success("Match deleted successfully!");
      })
      .catch((error) => {
        notifyOnError(error);
      })
      .finally(() => {
        setRequestLoading(false);
        toast.remove(toastLoadingId);
      });
  };

  return (
    <>
      <TableRow>
        <TableCell
          sx={{ fontWeight: match.winner?.name === match.redTeam.name ? "bold" : "initial" }}
        >
          {match.redTeam.name}
        </TableCell>
        <TableCell>
          {match.matchResult
            ? `${match.matchResult.redScore} : ${match.matchResult.blueScore}`
            : "vs."}
        </TableCell>
        <TableCell
          sx={{ fontWeight: match.winner?.name === match.blueTeam.name ? "bold" : "initial" }}
        >
          {match.blueTeam.name}
        </TableCell>
        <TableCell>
          {match.startDate} {match.startTime.substring(0, 5)}
        </TableCell>
        <TableCell>
          {match.referees.map((referee) => (
            <Box key={referee.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={referee.user.avatarUrl}
                sx={{
                  height: 20,
                  width: 20,
                  mr: 1,
                }}
              >
                {getInitials(referee.user.username)}
              </Avatar>
              <Link href={`https://osu.ppy.sh/users/${referee.user.osuId}`} target="_blank">
                {referee.user.username}
              </Link>
            </Box>
          ))}
        </TableCell>
        <TableCell>
          {match.commentators.map((commentator) => (
            <Box key={commentator.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={commentator.user.avatarUrl}
                sx={{
                  height: 20,
                  width: 20,
                  mr: 1,
                }}
              >
                {getInitials(commentator.user.username)}
              </Avatar>
              <Link href={`https://osu.ppy.sh/users/${commentator.user.osuId}`} target="_blank">
                {commentator.user.username}
              </Link>
            </Box>
          ))}
        </TableCell>
        <TableCell>
          {match.streamers.map((streamer) => (
            <Box key={streamer.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                src={streamer.user.avatarUrl}
                sx={{
                  height: 20,
                  width: 20,
                  mr: 1,
                }}
              >
                {getInitials(streamer.user.username)}
              </Avatar>
              <Link href={`https://osu.ppy.sh/users/${streamer.user.osuId}`} target="_blank">
                {streamer.user.username}
              </Link>
            </Box>
          ))}
        </TableCell>
        <TableCell>{match.isLive && <SeverityPill color="error">LIVE</SeverityPill>}</TableCell>
        <TableCell align="right">
          {!match.isCompleted && (
            <Box>
              <Button
                sx={{ m: 1 }}
                color="success"
                variant="outlined"
                disabled={isRequestLoading}
                onClick={() => setIsResultDialogOpen(true)}
              >
                Result
              </Button>
              <Button
                sx={{ m: 1 }}
                variant="outlined"
                disabled={isRequestLoading}
                onClick={() => setIsDialogOpen(true)}
              >
                Edit
              </Button>
              <Button
                sx={{ m: 1 }}
                variant="outlined"
                color="error"
                onClick={handleDeleteButton}
                disabled={isRequestLoading}
              >
                Delete
              </Button>
            </Box>
          )}
        </TableCell>
      </TableRow>
      <Dialog fullWidth maxWidth="sm" onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        {isDialogOpen && (
          <EditTeamVsMatchDialog closeModal={() => setIsDialogOpen(false)} match={match} />
        )}
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={() => setIsResultDialogOpen(false)}
        open={isResultDialogOpen}
      >
        {isResultDialogOpen && (
          <MatchResultDialog closeModal={() => setIsResultDialogOpen(false)} match={match} />
        )}
      </Dialog>
    </>
  );
};

ParticipantVsMatchesTable.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

ParticipantVsMatchesTable.propTypes = {
  matches: PropTypes.array.isRequired,
};

MatchRow.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ParticipantVsMatchesTable;
