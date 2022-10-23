import { Box, Button } from "@mui/material";
import GroupCard from "./GroupCard";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { useState } from "react";
import { groupApi } from "../../../../api/groupApi";
import { useDispatch } from "../../../../store";
import { createGroup, setGroups } from "../../../../slices/tournament";
import toast from "react-hot-toast";

const GroupsGrid = (props) => {
  const { tournament } = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCreateGroupButton = () => {
    setIsLoading(true);
    groupApi
      .createGroup(tournament.id)
      .then((response) => {
        dispatch(createGroup(response.data));
        toast.success(`Group ${response.data.symbol} created`);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteGroupButton = (groupId) => {
    setIsLoading(true);
    return groupApi
      .deleteGroup(groupId, tournament.id)
      .then((response) => {
        dispatch(setGroups(response.data));
        toast.success("Group deleted successfully");
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {tournament.groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          tournament={tournament}
          deleteGroup={handleDeleteGroupButton}
        />
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={handleCreateGroupButton}
        disabled={isLoading}
        sx={(theme) => {
          return {
            p: 2,
            pt: 0,
            m: 1,
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
        Create group
      </Button>
    </Box>
  );
};

GroupsGrid.propTypes = {
  tournament: PropTypes.object.isRequired,
};

export default GroupsGrid;
