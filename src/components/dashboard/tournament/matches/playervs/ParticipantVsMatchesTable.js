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
import { UserCircle as UserCircleIcon } from "../../../../../icons/user-circle";
import { getInitials } from "../../../../../utils/get-initials";

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
                  <TableCell>Start date</TableCell>
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
        <TableCell>{match.ldt}</TableCell>
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
            <li>{commentator.user.username}</li>
          ))}
        </TableCell>
        <TableCell>
          {match.streamers.map((streamer) => (
            <>
              <Avatar
                src={streamer.user.avatarUrl}
                sx={{
                  height: 40,
                  width: 40,
                }}
              >
                <UserCircleIcon fontSize="small" />
              </Avatar>
              {streamer.user.username}
            </>
          ))}
        </TableCell>
        <TableCell>{match.isLive && <SeverityPill color="error">LIVE</SeverityPill>}</TableCell>
        <TableCell align="right">
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button variant="outlined">Edit</Button>
            <Button variant="outlined" color="error">
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>
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
