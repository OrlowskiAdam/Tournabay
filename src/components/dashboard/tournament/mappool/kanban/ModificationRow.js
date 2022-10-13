import { Box, Button, Divider, IconButton, Paper, TextField, Typography } from "@mui/material";
import { DotsHorizontal } from "../../../../../icons/dots-horizontal";
import { Draggable, Droppable } from "react-beautiful-dnd";
import BeatmapCard from "./BeatmapCard";
import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { mappoolApi } from "../../../../../api/mappoolApi";

const ModificationRow = (props) => {
  const {
    index,
    element,
    mappoolId,
    tournamentId,
    canBeDragged,
    setCanBeDragged,
    setBeatmapModifications,
    showUrlInput,
  } = props;
  const [beatmapUrl, setBeatmapUrl] = useState("");
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const handleAddBeatmapForm = (e) => {
    e.preventDefault();
  };

  const handleDeleteBeatmapButton = (beatmapId) => {
    setIsRequestLoading(true);
    mappoolApi
      .deleteBeatmap(mappoolId, tournamentId, beatmapId)
      .then((response) => {
        setBeatmapModifications(response.data.beatmapModifications);
        toast.success("Beatmap removed!");
      })
      .catch((error) => console.log(error))
      .finally(() => setIsRequestLoading(false));
  };

  /**
   * It takes the beatmap URL from the input field, checks if it's a valid URL, and if it is, it sends
   * a request to the backend to add the beatmap to the mappool
   * @returns the beatmapModifications array.
   */
  const handleAddBeatmapButton = () => {
    const beatmapUrlRegex = /https:\/\/osu.ppy.sh\/beatmapsets\/\d+#osu\/\d+/;
    const testRegex = beatmapUrlRegex.test(beatmapUrl);
    if (!testRegex) {
      toast.error("Beatmap URL does not match!");
      return;
    }
    setIsRequestLoading(true);
    setCanBeDragged(false);
    const toastLoadingId = toast.loading(`Adding beatmap to ${element.modification}`);
    const body = {
      beatmapUrl,
      modification: element.modification,
    };
    mappoolApi
      .createBeatmap(mappoolId, tournamentId, body)
      .then((response) => {
        setBeatmapModifications(response.data.beatmapModifications);
        setBeatmapUrl(String(""));
        toast.success(`Beatmap added to ${element.modification}!`);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsRequestLoading(false);
        setCanBeDragged(true);
        toast.remove(toastLoadingId);
      });
  };

  const beatmapUrlInput = () => (
    <>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          px: 2,
        }}
      >
        <Box
          sx={{
            outline: "none",
            py: 1,
            mx: 1,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              py: 2,
            }}
          >
            <form onSubmit={handleAddBeatmapForm}>
              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <TextField
                  fullWidth
                  type="text"
                  label="Beatmap URL"
                  name="beatmapUrl"
                  variant="outlined"
                  value={beatmapUrl}
                  onChange={(e) => setBeatmapUrl(e.target.value)}
                />
                <Button
                  sx={{ ml: 1 }}
                  type="submit"
                  onClick={handleAddBeatmapButton}
                  disabled={isRequestLoading}
                >
                  Add
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );

  return (
    <Paper
      key={index}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
        mx: 1,
        mb: 2,
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          px: 2,
          py: 1,
        }}
      >
        <Typography color="inherit" onClick={() => {}} variant="h6">
          {element.modification}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" edge="end" onClick={() => {}}>
          <DotsHorizontal fontSize="small" />
        </IconButton>
      </Box>
      <Droppable key={index} droppableId={`${index}`} type="card">
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flexGrow: 1,
              minHeight: 80,
              overflowY: "auto",
              px: 2,
              py: 1,
            }}
          >
            {element.beatmaps.map((beatmap, index) => (
              <Draggable
                key={beatmap.id}
                draggableId={`${beatmap.id}`}
                index={index}
                isDragDisabled={!canBeDragged}
              >
                {(provided, snapshot) => (
                  <BeatmapCard
                    item={beatmap}
                    mod={element.modification}
                    provided={provided}
                    snapshot={snapshot}
                    deleteBeatmap={handleDeleteBeatmapButton}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      {showUrlInput && beatmapUrlInput()}
    </Paper>
  );
};

ModificationRow.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.object.isRequired,
  mappoolId: PropTypes.number.isRequired,
  tournamentId: PropTypes.number.isRequired,
  canBeDragged: PropTypes.bool.isRequired,
  setCanBeDragged: PropTypes.func.isRequired,
  setBeatmapModifications: PropTypes.func.isRequired,
  showUrlInput: PropTypes.bool.isRequired,
};

export default ModificationRow;
