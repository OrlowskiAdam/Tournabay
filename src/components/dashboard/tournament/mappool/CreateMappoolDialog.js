import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import useTournament from "../../../../hooks/useTournament";
import { mappoolApi } from "../../../../api/mappoolApi";

// TODO: Change to K-V
const stages = [
  "QUALIFIER",
  "GROUP_STAGE",
  "RO128",
  "RO64",
  "RO32",
  "RO16",
  "QUARTERFINAL",
  "SEMIFINAL",
  "FINAL",
  "GRANDFINAL",
];

const CreateMappoolDialog = (props) => {
  const { closeModal, setMappools } = props;
  const [name, setName] = useState(null);
  const [stage, setStage] = useState();
  const [requestLoading, setRequestLoading] = useState(false);
  const { tournament } = useTournament();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestLoading(true);
    const toastLoadingId = toast.loading("Creating new mappool");
    mappoolApi
      .createMappool(tournament.id, { name, stage })
      .then((response) => {
        setMappools((prev) => [...prev, response.data]);
        closeModal();
        toast.success(`Mappool created!`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        toast.remove(toastLoadingId);
        setRequestLoading(false);
      });
  };

  const handleStageChange = (e) => {
    setStage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          type="text"
          label="Friendly name (private only, can be empty)"
          name="mappoolName"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Typography sx={{ mb: 3 }} variant="h6">
          Mappool stage
        </Typography>
        <FormControl size="medium" sx={{ minWidth: "100%" }}>
          <InputLabel id="mappool-stage">Mappool stage</InputLabel>
          <Select
            labelId="mappool-stage"
            id="mappool-stage"
            value={stage}
            label="Mappool stage"
            onChange={handleStageChange}
          >
            {stages.map((stage) => (
              <MenuItem key={stage} value={stage}>
                {stage}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          Create mappool
        </Button>
      </Box>
    </form>
  );
};

CreateMappoolDialog.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setMappools: PropTypes.func.isRequired,
};

export default CreateMappoolDialog;
