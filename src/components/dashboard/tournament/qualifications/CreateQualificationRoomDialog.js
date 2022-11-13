import PropTypes from "prop-types";
import { Box, Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { DateTimePicker } from "@mui/lab";
import useTournament from "../../../../hooks/useTournament";
import { qualificationsApi } from "../../../../api/qualificationsApi";
import { addQualificationRoom } from "../../../../slices/tournament";
import { notifyOnError } from "../../../../utils/error-response";

const CreateQualificationRoomDialog = (props) => {
  const { tournament } = useTournament();
  const [startDate, setStartDate] = useState(new Date());
  const [requestLoading, setRequestLoading] = useState(false);
  const { closeModal } = props;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const toastLoadingId = toast.loading("Creating qualification room");
    const body = {
      startDate,
    };
    qualificationsApi
      .createQualificationRoom(tournament.id, body)
      .then((response) => {
        toast.success("Room created successfully!");
        dispatch(addQualificationRoom(response.data));
        closeModal();
      })
      .catch((error) => {
        notifyOnError(error);
      })
      .finally(() => {
        setRequestLoading(false);
        toast.remove(toastLoadingId);
      });
  };

  const handleStartDateChange = (e, v) => {
    setStartDate(v);
  };

  return (
    <form>
      <Box sx={{ p: 3 }}>
        <DateTimePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(inputProps) => <TextField {...inputProps} />}
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
          onClick={handleSubmit}
        >
          Create qualification room
        </Button>
      </Box>
    </form>
  );
};

CreateQualificationRoomDialog.propTypes = {
  closeModal: PropTypes.func,
};

export default CreateQualificationRoomDialog;
