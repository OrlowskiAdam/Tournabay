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
import AddStaffMemberForm from "./AddStaffMemberForm";
import { useState } from "react";
import NextLink from "next/link";
import { getInitials } from "../../../../utils/get-initials";
import { staffMemberApi } from "../../../../api/staffMemberApi";
import toast from "react-hot-toast";
import { useDispatch } from "../../../../store";
import { removeStaffMember } from "../../../../slices/tournament";
import useTournament from "../../../../hooks/useTournament";
import EditStaffMember from "./EditStaffMember";

const StaffTable = (props) => {
  const { members } = props;
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
          <CardHeader title="Staff members" />
          <Button
            color="primary"
            sx={{ m: 2 }}
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleAddStaffMemberClick}
          >
            Add staff member
          </Button>
        </Box>
        <Scrollbar>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Discord</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Joined At</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <StaffRow key={member.id} member={member} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={isDialogOpen}>
        {/* Dialog renders its body even if not open */}
        {isDialogOpen && <AddStaffMemberForm closeModal={handleDialogClose} />}
      </Dialog>
    </>
  );
};

const StaffRow = (props) => {
  const { member } = props;
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
    setIsLoading(true);
    const toastLoadingId = toast.loading("Removing staff member.");
    staffMemberApi
      .removeStaffMember(member.id, tournament.id)
      .then((response) => {
        dispatch(removeStaffMember(member.id));
        toast.success(`${member.user.username} removed!`);
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
            src={`https://a.ppy.sh/${member.user.osuId}`}
            sx={{
              height: 42,
              width: 42,
            }}
          >
            {getInitials(member.user.username)}
          </Avatar>
          <Box sx={{ ml: 1 }}>
            {member.user.username}
            <Typography color="textSecondary" variant="body2">
              <img
                style={{ width: 30, height: "auto", borderRadius: "20px" }}
                src={`https://www.countryflags.io/${member.user.countryCode}/flat/64.png`}
                alt={member.user.countryCode}
              />
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{member.discordId}</TableCell>
      <TableCell>
        {member.tournamentRoles.map((role) => (
          <SeverityPill key={role.id}>{role.name}</SeverityPill>
        ))}
      </TableCell>
      <TableCell>
        <SeverityPill>{member.status}</SeverityPill>
      </TableCell>
      <TableCell>{member.joinedAt}</TableCell>
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
        {isDialogOpen && <EditStaffMember staffMember={member} closeModal={handleDialogClose} />}
      </Dialog>
    </TableRow>
  );
};

//TODO: Add TournamentRoleGuard

StaffTable.propTypes = {
  members: PropTypes.array.isRequired,
};

StaffRow.propTypes = {
  member: PropTypes.object.isRequired,
};

export default StaffTable;
