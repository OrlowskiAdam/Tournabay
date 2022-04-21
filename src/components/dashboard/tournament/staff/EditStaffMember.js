import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useTournament from "../../../../hooks/useTournament";
import { staffMemberApi } from "../../../../api/staffMemberApi";
import { updateStaffMember } from "../../../../slices/tournament";

const EditStaffMember = (props) => {
  const { staffMember, closeModal } = props;
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [discordId, setDiscordId] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const { tournament } = useTournament();
  const dispatch = useDispatch();

  useEffect(() => {
    const currentRoles = staffMember.tournamentRoles.map((role) => role.id.toString());
    setSelectedRoles(currentRoles);
    setDiscordId(staffMember.discordId);
  }, [tournament]);

  const handleUpdateStaffMember = () => {
    setRequestLoading(true);
    const toastLoadingId = toast.loading("Updating staff member");
    const data = {
      staffMemberId: staffMember.id,
      discordId,
      tournamentRoleIds: selectedRoles,
    };
    staffMemberApi
      .updateStaffMember(tournament.id, data)
      .then((response) => {
        dispatch(updateStaffMember(response.data));
        toast.success(`${staffMember.user.username} updated!`);
        closeModal();
      })
      .catch((error) => {
        // err
        console.log(error.response);
      })
      .finally(() => {
        toast.remove(toastLoadingId);
        setRequestLoading(false);
      });
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedRoles([...selectedRoles, value]);
    } else {
      const roles = selectedRoles.filter((role) => role !== value);
      setSelectedRoles(roles);
    }
  };

  const handleDiscordIdChange = (e) => {
    setDiscordId(e.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          mt: 2,
        }}
      >
        <Avatar
          alt="Applicant"
          src={staffMember.user.avatarUrl}
          sx={{
            border: "3px solid #FFFFFF",
            height: 100,
            width: 100,
          }}
        />
      </Box>
      <Link align="center" color="textPrimary" display="block" underline="none" variant="h6">
        {staffMember.user.username}
      </Link>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Discord ID"
          name="discordId"
          variant="outlined"
          value={discordId}
          defaultValue={staffMember.discordId}
          onChange={handleDiscordIdChange}
        />
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Typography color="textPrimary" gutterBottom variant="subtitle2">
          Roles
        </Typography>
        {tournament.roles.map((role) => (
          <div key={role.id}>
            <FormControlLabel
              control={
                <Checkbox
                  value={role.id}
                  color="primary"
                  checked={selectedRoles.some(
                    (selectedRole) => selectedRole.toString() === role.id.toString()
                  )}
                  onChange={handleRoleChange}
                />
              }
              label={role.name}
            />
          </div>
        ))}
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexWrap: "wrap",
          p: 2,
        }}
      >
        <Box sx={{ m: 1 }}>
          <Tooltip title="Restores discord ID assigned to the user, not staff member.">
            <Button color="secondary" variant="outlined" disabled>
              Restore discord ID
            </Button>
          </Tooltip>
        </Box>
        <Box sx={{ m: 1 }}>
          <Button color="primary" sx={{ mr: 2 }} variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            onClick={handleUpdateStaffMember}
            disabled={requestLoading}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

EditStaffMember.propTypes = {
  staffMember: PropTypes.object,
  closeModal: PropTypes.func,
};

export default EditStaffMember;
