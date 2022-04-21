import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { staffMemberApi } from "../../../../api/staffMemberApi";
import useTournament from "../../../../hooks/useTournament";
import { addStaffMember } from "../../../../slices/tournament";

const AddStaffMemberForm = (props) => {
  const [osuId, setOsuId] = useState(null);
  const [roles, setRoles] = useState([]);
  const [requestLoading, setRequestLoading] = useState(false);
  const { tournament } = useTournament();
  const { closeModal } = props;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestLoading(true);
    const toastLoadingId = toast.loading("Adding staff member");
    staffMemberApi
      .addStaffMember(osuId, tournament.id, roles)
      .then((response) => {
        closeModal();
        toast.success(`${response.data.user.username} added!`);
        dispatch(addStaffMember(response.data));
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error("This user is already a staff member in this tournament!");
        } else if (error.response.status === 404) {
          toast.error("User with provided ID does not exists!");
        } else {
          toast.error("Something unexpected happened!");
        }
      })
      .finally(() => {
        toast.remove(toastLoadingId);
        setRequestLoading(false);
      });
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRoles([...roles, value]);
    } else {
      const filteredRoles = roles.filter((role) => role !== value);
      setRoles(filteredRoles);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Enter osu ID"
          name="osuId"
          variant="outlined"
          onChange={(e) => setOsuId(e.target.value)}
        />
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Typography color="textPrimary" gutterBottom variant="subtitle2">
          Roles
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="body2">
          Select roles for the new staff member. Not selecting any role assigns it to an
          uncategorized role.
        </Typography>
        {tournament.roles.map((role) => (
          <div key={role.id}>
            <FormControlLabel
              control={<Checkbox onChange={handleRoleChange} value={role.id} color="primary" />}
              label={role.name}
            />
          </div>
        ))}
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          p: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="primary"
          sx={{ ml: 1 }}
          type="submit"
          variant="contained"
          disabled={requestLoading}
        >
          Add staff member
        </Button>
      </Box>
    </form>
  );
};

AddStaffMemberForm.propTypes = {
  closeModal: PropTypes.func,
};

export default AddStaffMemberForm;
