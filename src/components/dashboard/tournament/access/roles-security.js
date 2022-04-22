import { Box, Button } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import TournamentRolesAutocomplete from "../../../roles-autocomplete";
import TournamentStaffMembersAutocomplete from "../../../staff-autocomplete";
import { useState } from "react";

const RolesSecurity = () => {
  const { tournament } = useTournament();
  const [rolesValue, setRolesValue] = useState(tournament.permission.canTournamentRoleManageRoles);
  const [staffMembersValue, setStaffMembersValue] = useState(
    tournament.permission.canTournamentRoleManageRoles
  );

  const handleRolesChange = (event, value) => {
    setRolesValue(value);
  };

  const handleStaffMemberChange = (event, value) => {
    setStaffMembersValue(value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h3>Roles</h3>
      <p>Can enter the roles page and manage them:</p>
      <Box>
        <TournamentRolesAutocomplete
          tournament={tournament}
          value={rolesValue}
          handleRolesChange={handleRolesChange}
          multiple={true}
        />
        <TournamentStaffMembersAutocomplete
          tournament={tournament}
          value={staffMembersValue}
          handleStaffChange={handleStaffMemberChange}
          multiple={true}
        />
      </Box>
      <Button
        color="primary"
        sx={{ mt: 1, alignSelf: "flex-end" }}
        type="submit"
        variant="contained"
      >
        Save
      </Button>
    </Box>
  );
};

export default RolesSecurity;
