import PropTypes from "prop-types";
import {
  Autocomplete,
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
import { tournamentRoleApi } from "../../../../api/tournamentRoleApi";
import { addRole } from "../../../../slices/tournament";
import useTournament from "../../../../hooks/useTournament";

const AddRoleForm = (props) => {
  const [roleName, setRoleName] = useState(null);
  const [inherit, setInherit] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const { roles, closeModal } = props;
  const { tournament } = useTournament();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestLoading(true);
    const toastLoadingId = toast.loading("Adding role");
    tournamentRoleApi
      .addRole(tournament.id, { roleName, inherit, isHidden })
      .then((response) => {
        closeModal();
        toast.success(`${response.data.name} added!`);
        dispatch(addRole(response.data));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        toast.remove(toastLoadingId);
        setRequestLoading(false);
      });
  };

  const handleIsHiddenChange = () => {
    setIsHidden((prevState) => !prevState);
  };

  const handleInheritChange = (e, v) => {
    if (v != null) {
      setInherit(v.id);
    } else {
      setInherit(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          type="text"
          label="Enter role name"
          name="roleName"
          variant="outlined"
          onChange={(e) => setRoleName(e.target.value)}
        />
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Autocomplete
          getOptionLabel={(option) => option.name}
          options={roles}
          onChange={handleInheritChange}
          renderInput={(params) => (
            <TextField
              fullWidth
              label="Inherit permissions from"
              name="inherit"
              variant="outlined"
              {...params}
            />
          )}
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
          Add role
        </Button>
      </Box>
    </form>
  );
};

AddRoleForm.propTypes = {
  tournamentId: PropTypes.number,
  roles: PropTypes.array,
  closeModal: PropTypes.func,
};

export default AddRoleForm;
