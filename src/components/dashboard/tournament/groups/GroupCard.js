import { Box, Card, Dialog, Divider, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditTeamDialog from "../teams/EditTeamDialog";
import EditGroupDialog from "./EditGroupDialog";

const GroupCard = (props) => {
  const { group, tournament, deleteGroup } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteGroupButton = () => {
    setIsLoading(true);
    deleteGroup(group.id).finally(() => setIsLoading(false));
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const teams = () => {
    return group.teams.map((team) => (
      <Box
        key={team.id}
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <p>{team?.team?.name}</p>
        <p>
          {team.wins} : {team.losses}
        </p>
      </Box>
    ));
  };

  const participants = () => {
    return group.participants.map((participant) => (
      <p key={participant.id}>{participant?.participant?.user.username}</p>
    ));
  };

  return (
    <>
      <Card
        sx={(theme) => {
          return {
            p: 2,
            pt: 0,
            m: 1,
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
          <h3>GROUP {group.symbol}</h3>
          <Box>
            <IconButton color="primary" disabled={isLoading} onClick={handleDialogOpen}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDeleteGroupButton(group.id)}
              disabled={isLoading}
            >
              <DeleteForeverIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        {tournament.teamFormat === "TEAM_VS" ? teams() : participants()}
      </Card>
      <Dialog fullWidth maxWidth="md" onClose={handleDialogClose} open={isDialogOpen}>
        {isDialogOpen && <EditGroupDialog group={group} closeModal={handleDialogClose} />}
      </Dialog>
    </>
  );
};

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
  deleteGroup: PropTypes.func.isRequired,
};

export default GroupCard;
