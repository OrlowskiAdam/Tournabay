import { Box, Button } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import TournamentRolesAutocomplete from "../../../roles-autocomplete";
import TournamentStaffMembersAutocomplete from "../../../staff-autocomplete";
import { useEffect, useState } from "react";
import { tournamentPermissionApi } from "../../../../api/tournamentPermissionApi";
import toast from "react-hot-toast";
import { useDispatch } from "../../../../store";
import { updatePermission } from "../../../../slices/tournament";

const StaffSecurity = () => {
  const { tournament } = useTournament();
  const [rolesValue, setRolesValue] = useState(
    tournament.permission.canTournamentRoleManageStaffMembers
  );
  const [staffMembersValue, setStaffMembersValue] = useState(
    tournament.permission.canStaffMemberManageStaffMembers
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRolesChange = (event, value) => {
    setRolesValue(value);
  };

  const handleStaffMemberChange = (event, value) => {
    setStaffMembersValue(value);
  };

  const handleSaveClick = () => {
    setIsLoading(true);
    const toastLoadingId = toast.loading("Updating staff members permissions.");
    tournamentPermissionApi
      .updateStaffMembersPermission(tournament.id, {
        tournamentRoles: rolesValue,
        staffMembers: staffMembersValue,
      })
      .then((response) => {
        dispatch(updatePermission(response.data));
        toast.success("Staff members permissions updated successfully.");
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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h3>Staff members</h3>
      <p>Can enter the staff members page and manage them:</p>
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
        disabled={isLoading}
        onClick={handleSaveClick}
      >
        Save
      </Button>
    </Box>
  );
};

export default StaffSecurity;
