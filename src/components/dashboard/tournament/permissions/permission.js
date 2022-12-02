import TournamentRolesAutocomplete from "../../../roles-autocomplete";
import useTournament from "../../../../hooks/useTournament";
import PropTypes from "prop-types";
import { Card } from "@mui/material";
import TournamentStaffMembersAutocomplete from "../../../staff-autocomplete";

const Permission = (props) => {
  const { tournament } = useTournament();
  const {
    permission,
    permissionValue,
    description,
    onRolePermissionChange,
    onStaffPermissionChange,
  } = props;

  return (
    <Card sx={{ my: 2, p: 2 }}>
      <h4>{description ? "asd" : `Can access and manage ${permissionValue.toLowerCase()}`}</h4>
      <TournamentRolesAutocomplete
        tournament={tournament}
        handleRolesChange={(event, value) => onRolePermissionChange(event, value, permissionValue)}
        value={permission.permittedRoles}
        multiple={true}
      />
      <TournamentStaffMembersAutocomplete
        tournament={tournament}
        value={permission.permittedStaffMembers}
        handleStaffChange={(event, value) => onStaffPermissionChange(event, value, permissionValue)}
        multiple={true}
      />
    </Card>
  );
};

Permission.propTypes = {
  permission: PropTypes.object.isRequired,
  permissionValue: PropTypes.string.isRequired,
  description: PropTypes.string,
  onRolePermissionChange: PropTypes.func.isRequired,
  onStaffPermissionChange: PropTypes.func.isRequired,
};

export default Permission;
