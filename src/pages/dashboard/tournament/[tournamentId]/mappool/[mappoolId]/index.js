import TournamentData from "../../../../../../guards/TournamentData";
import TournamentGuard from "../../../../../../guards/TournamentGuard";
import { DashboardLayout } from "../../../../../../components/dashboard-layout";
import { useRouter } from "next/router";
import useTournament from "../../../../../../hooks/useTournament";
import { useEffect, useState } from "react";
import { mappoolApi } from "../../../../../../api/mappoolApi";
import { notifyOnError } from "../../../../../../utils/error-response";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper } from "@mui/material";
import { ArrowLeft as ArrowLeftIcon } from "../../../../../../icons/arrow-left";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "../../../../../../store";
import ModificationRow from "../../../../../../components/dashboard/tournament/mappool/kanban/ModificationRow";
import toast from "react-hot-toast";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source.beatmaps);
  const destClone = Array.from(destination.beatmaps);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const EditMappoolPage = () => {
  const { tournament } = useTournament();
  const router = useRouter();
  const { mappoolId } = router.query;
  const dispatch = useDispatch();
  const [beatmapModifications, setBeatmapModifications] = useState([]);
  const [canBeDragged, setCanBeDragged] = useState(true);
  const [showUrlInput, setShowUrlInput] = useState(true);

  const handleDragEnd = async ({ source, destination, draggableId }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sourceId = +source.droppableId;
    const destinationId = +destination.droppableId;

    let newState;

    // dropped to the same list
    if (sourceId === destinationId) {
      if (source.index === destination.index) return;
      const reorderedItems = reorder(
        beatmapModifications[sourceId].beatmaps,
        source.index,
        destination.index
      );
      newState = [...beatmapModifications];
      newState[sourceId].beatmaps = reorderedItems;
    } else {
      const result = move(
        beatmapModifications[sourceId],
        beatmapModifications[destinationId],
        source,
        destination
      );
      newState = [...beatmapModifications];
      newState[sourceId].beatmaps = result[sourceId];
      newState[destinationId].beatmaps = result[destinationId];
    }
    const requestBody = {
      sourceId: beatmapModifications[sourceId].id,
      destinationId: beatmapModifications[destinationId].id,
      beatmapId: draggableId,
      fromIndex: source.index,
      toIndex: destination.index,
    };

    setCanBeDragged(false);
    await mappoolApi
      .reorderBeatmap(tournament.id, mappoolId, requestBody)
      .then((response) => {
        setBeatmapModifications(response.data.beatmapModifications);
        toast.success("Beatmap moved!");
      })
      .catch((error) => console.log(error))
      .finally(() => setCanBeDragged(true));
  };

  useEffect(() => {
    mappoolApi
      .getMappoolById(tournament.id, mappoolId)
      .then((response) => setBeatmapModifications(response.data.beatmapModifications))
      .catch((error) => notifyOnError(error));
  }, [tournament, mappoolId]);

  return (
    <>
      <Head>
        <title>Mappool editor | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          p: 4,
          py: 0,
        }}
      >
        <NextLink href={`/dashboard/tournament/${tournament.id}/mappool`} passHref>
          <Button
            component="a"
            startIcon={<ArrowLeftIcon fontSize="small" />}
            sx={{ mt: 4, mb: 4 }}
            variant="contained"
          >
            Go back to mappools
          </Button>
        </NextLink>
        <Grid container spacing={4}>
          <Grid item lg={8} md={12} sm={12} xs={12} order={{ lg: 1, md: 2, sm: 2, xs: 2 }}>
            <DragDropContext onDragEnd={handleDragEnd}>
              {beatmapModifications.map(
                (element, index) =>
                  !element.hidden && (
                    <ModificationRow
                      key={index}
                      index={index}
                      element={element}
                      mappoolId={mappoolId}
                      tournamentId={tournament.id}
                      setBeatmapModifications={setBeatmapModifications}
                      canBeDragged={canBeDragged}
                      setCanBeDragged={setCanBeDragged}
                      showUrlInput={showUrlInput}
                    />
                  )
              )}
            </DragDropContext>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12} order={{ lg: 2, md: 1, sm: 1, xs: 1 }}>
            <Paper sx={{ p: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showUrlInput}
                    onChange={() => setShowUrlInput(!showUrlInput)}
                  />
                }
                label="Show beatmap URL inputs"
              />
              <p>TODO: Modifications reorder</p>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

EditMappoolPage.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default EditMappoolPage;
