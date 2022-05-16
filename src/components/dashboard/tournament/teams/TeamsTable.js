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
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import Scrollbar from "../../../scrollbar";
import { SeverityPill } from "../../../severity-pill";
import { useState } from "react";
import { getInitials } from "../../../../utils/get-initials";
import toast from "react-hot-toast";
import { useDispatch } from "../../../../store";
import useTournament from "../../../../hooks/useTournament";
import CreateTeamForm from "./CreateTeamForm";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";

const TeamsTable = (props) => {
  const { teams } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddStaffMemberClick = () => {
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
          <CardHeader title="Teams" />
          <Button
            color="primary"
            sx={{ m: 2 }}
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleAddStaffMemberClick}
          >
            Create team
          </Button>
        </Box>
        <Scrollbar>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Players</TableCell>
                  <TableCell>Seed</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team) => (
                  <TeamRow key={team.id} team={team} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={isDialogOpen}>
        {isDialogOpen && <CreateTeamForm closeModal={handleDialogClose} />}
      </Dialog>
    </>
  );
};

const TeamRow = (props) => {
  const { team } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { tournament } = useTournament();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteClick = () => {
    // setIsLoading(true);
    // const toastLoadingId = toast.loading("Removing staff member.");
    // staffMemberApi
    //   .removeStaffMember(member.id, tournament.id)
    //   .then((response) => {
    //     dispatch(removeStaffMember(member.id));
    //     toast.success(`${member.user.username} removed!`);
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.message);
    //   })
    //   .finally(() => {
    //     toast.remove(toastLoadingId);
    //     setIsLoading(false);
    //   });
  };

  return (
    <TableRow hover>
      <TableCell>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box sx={{ ml: 1 }}>{team.name}</Box>
        </Box>
      </TableCell>
      <TableCell>
        {team.captain && (
          <Box key={team.captain.id} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={team.captain.user.avatarUrl}
              sx={{
                height: 18,
                width: 18,
                mr: 1,
              }}
            >
              {getInitials(team.captain.user.username)}
            </Avatar>
            <Link href={`https://osu.ppy.sh/users/${team.captain.user.osuId}`} target="_blank">
              {team.captain.user.username}
            </Link>
            <KeyboardCapslockIcon />
          </Box>
        )}
        {team.participants
          .filter((participant) => participant.id !== team.captain.id)
          .map((participant) => (
            <Box key={participant.id} sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={participant.user.avatarUrl}
                sx={{
                  height: 18,
                  width: 18,
                  mr: 1,
                }}
              >
                {getInitials(participant.user.username)}
              </Avatar>
              <Link href={`https://osu.ppy.sh/users/${participant.user.osuId}`} target="_blank">
                {participant.user.username}
              </Link>
              {team.captain?.id === participant.id && <KeyboardCapslockIcon />}
            </Box>
          ))}
      </TableCell>
      <TableCell>{team.seed}</TableCell>
      <TableCell>
        <SeverityPill>{team.status}</SeverityPill>
      </TableCell>
      <TableCell align="right">
        <Button sx={{ m: 1 }} variant="outlined" disabled={isLoading} onClick={handleDialogOpen}>
          Edit
        </Button>
        <Button
          sx={{ m: 1 }}
          color="error"
          variant="outlined"
          onClick={handleDeleteClick}
          disabled={isLoading}
        >
          Delete
        </Button>
      </TableCell>
      <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={isDialogOpen}>
        {/* Dialog renders its body even if not open */}
        {/*{isDialogOpen && <EditStaffMember staffMember={member} closeModal={handleDialogClose} />}*/}
      </Dialog>
    </TableRow>
  );
};

//TODO: Add TournamentRoleGuard

TeamsTable.propTypes = {
  teams: PropTypes.array.isRequired,
};

TeamRow.propTypes = {
  team: PropTypes.object.isRequired,
};

export default TeamsTable;
