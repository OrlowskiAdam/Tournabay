import { Box, Button, Dialog, Divider, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "../../../../store";
import QualificationRoomCard from "./QualificationRoomCard";
import CreateQualificationRoomDialog from "./CreateQualificationRoomDialog";

const QualificationRoomsGrid = (props) => {
  const { tournament } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  return (
    <Box>
      <h2>Qualification rooms settings</h2>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <TextField
          sx={{ mr: 2 }}
          type="number"
          label="Room limit"
          name="room-limit"
          variant="outlined"
          onChange={(e) => {}}
        />
        <TextField
          sx={{ mr: 2 }}
          type="number"
          label="Staff members limit"
          name="staff-members-room-limit"
          variant="outlined"
          onChange={(e) => {}}
        />
        <TextField
          sx={{ mr: 2 }}
          type="number"
          label="Sign in hours limit"
          name="room-hours-limit"
          variant="outlined"
          onChange={(e) => {}}
        />
        <Button>Save settings</Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {tournament.qualificationRooms.map((room) => (
          <QualificationRoomCard key={room.id} room={room} tournament={tournament} />
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={handleDialogOpen}
          sx={(theme) => {
            return {
              p: 2,
              pt: 0,
              m: 1,
              minHeight: 200,
              border: "2px dashed " + theme.palette.primary.main,
              width: "calc(100% / 4 - 16px)",
              [theme.breakpoints.down("lg")]: {
                width: "calc(100% / 3 - 16px)",
              },
              [theme.breakpoints.down("md")]: {
                width: "calc(100% / 2 - 16px)",
              },
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
            };
          }}
        >
          Create room
        </Button>
        <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={isDialogOpen}>
          {isDialogOpen && <CreateQualificationRoomDialog closeModal={handleDialogClose} />}
        </Dialog>
      </Box>
    </Box>
  );
};

QualificationRoomsGrid.propTypes = {
  tournament: PropTypes.object.isRequired,
};

export default QualificationRoomsGrid;
