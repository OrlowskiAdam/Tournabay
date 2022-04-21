import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import Scrollbar from "../../../scrollbar";
import { SeverityPill } from "../../../severity-pill";
import { useState } from "react";
import AddRoleForm from "./AddRoleForm";
import { tournamentApi } from "../../../../api/tournamentApi";
import { tournamentRoleApi } from "../../../../api/tournamentRoleApi";
import useTournament from "../../../../hooks/useTournament";
import toast from "react-hot-toast";
import { useDispatch } from "../../../../store";
import { removeRole } from "../../../../slices/tournament";
import EditRole from "./EditRole";

const RolesTable = (props) => {
  const { roles } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { tournament } = useTournament();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
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
          <CardHeader title="Tournament roles" />
          <Button
            color="primary"
            sx={{ m: 2 }}
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleDialogOpen}
          >
            New Role
          </Button>
        </Box>
        <Scrollbar>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Role name</TableCell>
                  <TableCell>Hidden</TableCell>
                  <TableCell>Protected</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <RoleRow key={role.id} role={role} tournament={tournament} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={isDialogOpen}>
        {/* Dialog renders its body even if not open */}
        {isDialogOpen && <AddRoleForm roles={roles} closeModal={handleDialogClose} />}
      </Dialog>
    </>
  );
};

const RoleRow = (props) => {
  const { role, tournament } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteButton = () => {
    if (role.isProtected) {
      toast.error("Cannot delete a protected role");
      return;
    }
    setIsLoading(true);
    const toastLoadingId = toast.loading("Removing role.");
    tournamentRoleApi
      .removeRole(role.id, tournament.id)
      .then((response) => {
        toast.success(`${role.name} deleted!`);
        dispatch(removeRole(role));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
        toast.remove(toastLoadingId);
      });
  };

  return (
    <TableRow hover>
      <TableCell>{role.name}</TableCell>
      <TableCell>{role.isHidden && <SeverityPill color="primary">Hidden</SeverityPill>}</TableCell>
      <TableCell>
        {role.isProtected && <SeverityPill color="success">Protected</SeverityPill>}
      </TableCell>
      <TableCell align="right">
        <Button sx={{ mx: 1 }} variant="outlined" onClick={handleDialogOpen} disabled={isLoading}>
          Edit
        </Button>
        {!role.isProtected && (
          <Button
            sx={{ mx: 1 }}
            variant="outlined"
            color="error"
            onClick={handleDeleteButton}
            disabled={isLoading}
          >
            Delete
          </Button>
        )}
      </TableCell>
      <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={isDialogOpen}>
        {/* Dialog renders its body even if not open */}
        {isDialogOpen && <EditRole role={role} closeModal={handleDialogClose} />}
      </Dialog>
    </TableRow>
  );
};

//TODO: Add TournamentRoleGuard

RolesTable.propTypes = {
  roles: PropTypes.array.isRequired,
};

RoleRow.propTypes = {
  role: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
};

export default RolesTable;
