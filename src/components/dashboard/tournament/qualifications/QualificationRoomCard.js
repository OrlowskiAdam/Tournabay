import { Avatar, Box, Card, Dialog, Divider, IconButton, Link, Typography } from "@mui/material";
import PropTypes from "prop-types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { parseDate } from "../../../../utils/date-time-utils";
import { qualificationsApi } from "../../../../api/qualificationsApi";
import toast from "react-hot-toast";
import { notifyOnError } from "../../../../utils/error-response";
import { useDispatch } from "react-redux";
import { removeQualificationRoom, setQualificationRooms } from "../../../../slices/tournament";
import EditQualificationRoomDialog from "./EditQualificationRoomDialog";
import { getInitials } from "../../../../utils/get-initials";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";

const QualificationRoomCard = (props) => {
  const { room, tournament } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteRoomButton = () => {
    const toastLoadingId = toast.loading("Creating qualification room");
    setIsLoading(true);
    qualificationsApi
      .deleteQualificationRoom(room.id, tournament.id)
      .then((response) => {
        dispatch(setQualificationRooms(response.data));
        setIsLoading(false);
        toast.success("Room deleted successfully!");
      })
      .catch((error) => {
        notifyOnError(error);
      })
      .finally(() => {
        setIsLoading(false);
        toast.remove(toastLoadingId);
      });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const teams = () => {
    return (
      <Box sx={{ py: 2 }}>
        {room.teams.map((team) => (
          <Box
            key={team.id}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              {team?.name}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const participants = () => {
    return (
      <Box sx={{ py: 2 }}>
        {room.participants.map((participant) => (
          <Box
            key={participant.id}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              {participant?.user?.username}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Card
        sx={(theme) => {
          return {
            p: 2,
            pt: 0,
            pb: 2,
            m: 1,
            minHeight: 200,
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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>ROOM {room.symbol}</h3>
          <h5>{parseDate(room.startDate)}</h5>
          <Box>
            <IconButton color="primary" disabled={isLoading} onClick={handleDialogOpen}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDeleteRoomButton(room.id)}
              disabled={isLoading}
            >
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        {tournament.teamFormat === "TEAM_VS" ? teams() : participants()}
        {room.staffMembers.length > 0 && (
          <>
            <Divider />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              {room.staffMembers.map((staffMember) => (
                <Box
                  key={staffMember.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <Avatar
                    src={staffMember.user.avatarUrl}
                    sx={{
                      height: 18,
                      width: 18,
                      mr: 1,
                    }}
                  >
                    {getInitials(staffMember.user.username)}
                  </Avatar>
                  <Link href={`https://osu.ppy.sh/users/${staffMember.user.osuId}`} target="_blank">
                    {staffMember.user.username}
                  </Link>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Card>
      <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={isDialogOpen}>
        {isDialogOpen && <EditQualificationRoomDialog room={room} closeModal={handleDialogClose} />}
      </Dialog>
    </>
  );
};

QualificationRoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
};

export default QualificationRoomCard;
