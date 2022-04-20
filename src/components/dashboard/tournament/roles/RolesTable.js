import {
  Box,
  Button,
  Card,
  CardHeader,
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

const RolesTable = (props) => {
  const { roles } = props;
  return (
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
        <Button color="primary" sx={{ m: 2 }} startIcon={<AddIcon />} variant="contained">
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
                <RoleRow key={role.id} role={role} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
};

const RoleRow = (props) => {
  const { role } = props;
  return (
    <TableRow hover>
      <TableCell>{role.name}</TableCell>
      <TableCell>{role.isHidden && <SeverityPill color="primary">Hidden</SeverityPill>}</TableCell>
      <TableCell>
        {role.isProtected && <SeverityPill color="success">Protected</SeverityPill>}
      </TableCell>
      <TableCell align="right">
        <Button sx={{ mx: 1 }} variant="outlined">
          Edit
        </Button>
        <Button sx={{ mx: 1 }} color="error" variant="outlined">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

//TODO: Add TournamentRoleGuard

RolesTable.propTypes = {
  roles: PropTypes.array.isRequired,
};

RoleRow.propTypes = {
  role: PropTypes.object.isRequired,
};

export default RolesTable;
