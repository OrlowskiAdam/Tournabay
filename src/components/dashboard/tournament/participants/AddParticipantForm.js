import PropTypes from "prop-types";
import { Box, Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useTournament from "../../../../hooks/useTournament";
import { addParticipant } from "../../../../slices/tournament";
import { participantApi } from "../../../../api/participantApi";

const AddParticipantForm = (props) => {
  const [osuId, setOsuId] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const { tournament } = useTournament();
  const { closeModal } = props;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestLoading(true);
    const toastLoadingId = toast.loading("Adding participant.");
    participantApi
      .addParticipant(osuId, tournament.id)
      .then((response) => {
        closeModal();
        toast.success(`${response.data.user.username} added!`);
        dispatch(addParticipant(response.data));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        toast.remove(toastLoadingId);
        setRequestLoading(false);
      });
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
          Add participant
        </Button>
      </Box>
    </form>
  );
};

AddParticipantForm.propTypes = {
  closeModal: PropTypes.func,
};

export default AddParticipantForm;
