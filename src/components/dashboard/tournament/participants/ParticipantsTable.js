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
import { staffMemberApi } from "../../../../api/staffMemberApi";
import toast from "react-hot-toast";
import { useDispatch } from "../../../../store";
import { removeParticipant, removeStaffMember } from "../../../../slices/tournament";
import AddParticipantForm from "./AddParticipantForm";
import { participantApi } from "../../../../api/participantApi";
import EditParticipant from "./EditParticipant";

const ParticipantsTable = (props) => {
  const { tournament } = props;
  const { participants } = tournament;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log(participants);

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
          <CardHeader title="Participants" />
          <Button
            color="primary"
            sx={{ m: 2 }}
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleAddStaffMemberClick}
          >
            Add participant
          </Button>
        </Box>
        <Scrollbar>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  {tournament.teamFormat === "TEAM_VS" && <TableCell>Team name</TableCell>}
                  <TableCell>Discord</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Joined At</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants.map((participant) => (
                  <ParticipantRow
                    key={participant.id}
                    participant={participant}
                    tournament={tournament}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={isDialogOpen}>
        {/* Dialog renders its body even if not open */}
        {isDialogOpen && <AddParticipantForm closeModal={handleDialogClose} />}
      </Dialog>
    </>
  );
};

const ParticipantRow = (props) => {
  const { tournament, participant } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setIsLoading(true);
    const toastLoadingId = toast.loading("Removing participant.");
    participantApi
      .deleteParticipant(tournament.id, participant.id)
      .then(() => {
        dispatch(removeParticipant(participant.id));
        toast.success(`${participant.user.username} removed!`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        toast.remove(toastLoadingId);
        setIsLoading(false);
      });
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
          <Avatar
            src={`https://a.ppy.sh/${participant.user.osuId}`}
            sx={{
              height: 42,
              width: 42,
            }}
          >
            {getInitials(participant.user.username)}
          </Avatar>
          <Box sx={{ ml: 1 }}>
            {participant.user.username}
            <Typography color="textSecondary" variant="body2">
              {participant.user.osuId}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      {tournament.teamFormat === "TEAM_VS" && <TableCell>{participant.teamName}</TableCell>}
      <TableCell>{participant.discordId}</TableCell>
      <TableCell>
        <SeverityPill>{participant.status}</SeverityPill>
      </TableCell>
      <TableCell>{participant.joinedAt}</TableCell>
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
        <EditParticipant participant={participant} closeModal={handleDialogClose} />
      </Dialog>
    </TableRow>
  );
};

//TODO: Add TournamentRoleGuard

ParticipantsTable.propTypes = {
  tournament: PropTypes.array.isRequired,
};

ParticipantRow.propTypes = {
  tournament: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
};

export default ParticipantsTable;
