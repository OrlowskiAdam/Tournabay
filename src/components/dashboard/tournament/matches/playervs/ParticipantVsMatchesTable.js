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
import CreateParticipantVsMatchDialog from "./CreateParticipantVsMatchDialog";
import { SeverityPill } from "../../../../severity-pill";
import { getInitials } from "../../../../../utils/get-initials";
import { matchApi } from "../../../../../api/matchApi";
import { notifyOnError } from "../../../../../utils/error-response";
import toast from "react-hot-toast";
import { removeMatch } from "../../../../../slices/tournament";
import { useDispatch } from "react-redux";
import EditParticipantVsMatchDialog from "./EditParticipantVsMatchDialog";

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
        {isDialogOpen && <CreateParticipantVsMatchDialog closeModal={handleDialogClose} />}
      </Dialog>
    </>
  );
};

const MatchRow = (props) => {
  const { match } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Avatar
              src={match.redParticipant.user.avatarUrl}
              sx={{
                height: 20,
                width: 20,
                mr: 1,
              }}
            >
              {getInitials(match.redParticipant.user.username)}
            </Avatar>
            <Link
              href={`https://osu.ppy.sh/users/${match.redParticipant.user.osuId}`}
              target="_blank"
            >
              {match.redParticipant.user.username}
            </Link>
          </Box>
        </TableCell>
        <TableCell>vs.</TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Avatar
              src={match.blueParticipant.user.avatarUrl}
              sx={{
                height: 20,
                width: 20,
                mr: 1,
              }}
            >
              {getInitials(match.blueParticipant.user.username)}
            </Avatar>
            <Link
              href={`https://osu.ppy.sh/users/${match.blueParticipant.user.osuId}`}
              target="_blank"
            >
              {match.blueParticipant.user.username}
            </Link>
          </Box>
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
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="outlined"
              disabled={isRequestLoading}
              onClick={() => setIsDialogOpen(true)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteButton}
              disabled={isRequestLoading}
            >
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <Dialog fullWidth maxWidth="sm" onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
        {isDialogOpen && (
          <EditParticipantVsMatchDialog closeModal={() => setIsDialogOpen(false)} match={match} />
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
