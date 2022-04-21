import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useTournament from "../../../../hooks/useTournament";
import { tournamentRoleApi } from "../../../../api/tournamentRoleApi";
import { updateRole } from "../../../../slices/tournament";

const EditRole = (props) => {
  const { role, closeModal } = props;
  const [roleName, setRoleName] = useState(role.name);
  const [isHidden, setIsHidden] = useState(role.isHidden);
  const [requestLoading, setRequestLoading] = useState(false);
  const { tournament } = useTournament();
  const dispatch = useDispatch();

  const handleIsHiddenChange = () => {
    setIsHidden((prevState) => !prevState);
  };

  const handleRoleUpdate = () => {
    setRequestLoading(true);
    const toastLoadingId = toast.loading("Updating role");
    const body = {
      roleId: role.id,
      roleName,
      isHidden,
    };
    tournamentRoleApi
      .updateRole(tournament.id, body)
      .then((response) => {
        dispatch(updateRole(response.data));
        closeModal();
        toast.success(`${response.data.name} updated!`);
      })
      .catch((error) => {
        if (error.response.data.status === 400) {
          console.log(error.response);
          toast.error("Please specify role name!");
        } else {
          toast.error("Something unexpected happened!");
        }
      })
      .finally(() => {
        toast.remove(toastLoadingId);
        setRequestLoading(false);
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        p: 1,
      }}
    >
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          type="text"
          label="Role name"
          name="roleName"
          variant="outlined"
          value={roleName}
          defaultValue={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Typography color="textPrimary" gutterBottom variant="subtitle2">
          If you hide this role, it will not be displayed on the staff page.
        </Typography>
        <FormControlLabel
          control={<Checkbox color="primary" checked={isHidden} onChange={handleIsHiddenChange} />}
          label="Hide this role"
        />
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "flex-end",
          display: "flex",
          p: 2,
        }}
      >
        <Box>
          <Button color="primary" sx={{ mr: 2 }} variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            disabled={requestLoading}
            onClick={handleRoleUpdate}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

EditRole.propTypes = {
  role: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditRole;
