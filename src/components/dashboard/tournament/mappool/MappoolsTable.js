import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import Scrollbar from "../../../scrollbar";
import { SeverityPill } from "../../../severity-pill";
import { useState } from "react";
import { useDispatch } from "../../../../store";
import CreateMappoolDialog from "./CreateMappoolDialog";
import { useRouter } from "next/router";
import { mappoolApi } from "../../../../api/mappoolApi";
import toast from "react-hot-toast";

const MappoolsTable = (props) => {
  const { mappools, tournament, setMappools } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handlePublishButtonButton = (mappoolId) => {
    const toastLoadingId = toast.loading("Publishing mappool");
    return mappoolApi
      .publishMappool(tournament.id, mappoolId)
      .then((response) => {
        setMappools((prevState) => {
          const legacyMappoolIndex = prevState.findIndex(
            (mappool) => mappool.id === response.data.id
          );
          prevState[legacyMappoolIndex] = response.data;
          return [...prevState];
        });
        toast.success("Mappool published!");
      })
      .catch((e) => console.error(e))
      .finally(() => toast.dismiss(toastLoadingId));
  };

  const handleDeleteMappoolButton = (mappoolId) => {
    const toastLoadingId = toast.loading("Deleting mappool");
    return mappoolApi
      .deleteMappool(tournament.id, mappoolId)
      .then((response) => {
        setMappools((prevState) => {
          const filteredMappool = prevState.filter((mappool) => mappool.id !== response.data.id);
          return [...filteredMappool];
        });
        toast.success("Mappool deleted!");
      })
      .catch((e) => console.error(e))
      .finally(() => toast.remove(toastLoadingId));
  };

  const handleConcealMappoolButton = (mappoolId) => {
    const toastLoadingId = toast.loading("Concealing mappool");
    return mappoolApi
      .concealMappool(tournament.id, mappoolId)
      .then((response) => {
        setMappools((prevState) => {
          const legacyMappoolIndex = prevState.findIndex(
            (mappool) => mappool.id === response.data.id
          );
          prevState[legacyMappoolIndex] = response.data;
          return [...prevState];
        });
        toast.success("Mappool concealed!");
      })
      .catch((e) => console.error(e))
      .finally(() => toast.remove(toastLoadingId));
  };

  return (
    <>
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <CardHeader title="Mappools" />
          <Box>
            <Button
              color="primary"
              sx={{ m: 2 }}
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleDialogOpen}
            >
              New Mappool
            </Button>
          </Box>
        </Box>
        <Scrollbar>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Beatmaps</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mappools.map((mappool) => (
                  <MappoolRow
                    key={mappool.id}
                    mappool={mappool}
                    tournament={tournament}
                    router={router}
                    deleteMappool={handleDeleteMappoolButton}
                    publishMappool={handlePublishButtonButton}
                    concealMappool={handleConcealMappoolButton}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={isDialogOpen}>
        {/* Dialog renders its body even if not open */}
        {isDialogOpen && (
          <CreateMappoolDialog closeModal={handleDialogClose} setMappools={setMappools} />
        )}
      </Dialog>
    </>
  );
};

const MappoolRow = (props) => {
  const { mappool, tournament, deleteMappool, publishMappool, concealMappool, router } = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleMappoolRedirect = () => {
    router.push(`/dashboard/tournament/${tournament.id}/mappool/${mappool.id}`).then((r) => r);
  };

  const handlePublishButton = () => {
    setIsLoading(true);
    publishMappool(mappool.id).finally(() => setIsLoading(false));
  };

  const handleDeleteMappoolButton = () => {
    if (mappool.isReleased) return;
    setIsLoading(true);
    deleteMappool(mappool.id).finally(() => setIsLoading(false));
  };

  const handleConcealMappoolButton = () => {
    setIsLoading(true);
    concealMappool(mappool.id).finally(() => setIsLoading(false));
  };

  return (
    <TableRow hover>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>{mappool.name}</Box>
      </TableCell>
      <TableCell>
        <SeverityPill color="primary">{mappool.stage}</SeverityPill>
      </TableCell>
      <TableCell>
        {mappool.beatmapModifications
          .filter((bm) => !bm.hidden)
          .map((bm) => (
            <Box key={bm.id} sx={{ m: 1, mb: 0, fontSize: 11 }}>
              <Box>{bm.modification}</Box>
              {bm.beatmaps.map((beatmap) => (
                <Link
                  key={beatmap.id}
                  sx={{ m: 0, ml: 1, display: "block", minWidth: 800 }}
                  target="_blank"
                  href={`https://osu.ppy.sh/beatmapsets/${beatmap.beatmapsetId}#osu/${beatmap.beatmapId}`}
                >
                  {beatmap.artist} - {beatmap.title} [{beatmap.version}]
                </Link>
              ))}
            </Box>
          ))}
      </TableCell>
      <TableCell align="right">
        {/*{mappool.isReleased ? (*/}
        {/*  <Button*/}
        {/*    sx={{ mx: 1 }}*/}
        {/*    variant="outlined"*/}
        {/*    color="warning"*/}
        {/*    onClick={handleConcealMappoolButton}*/}
        {/*    disabled={isLoading}*/}
        {/*  >*/}
        {/*    Conceal*/}
        {/*  </Button>*/}
        {/*) : (*/}
        {/*  <Button*/}
        {/*    sx={{ mx: 1 }}*/}
        {/*    variant="outlined"*/}
        {/*    color="success"*/}
        {/*    onClick={handlePublishButton}*/}
        {/*    disabled={isLoading}*/}
        {/*  >*/}
        {/*    Publish*/}
        {/*  </Button>*/}
        {/*)}*/}
        {!mappool.isReleased && (
          <Button
            sx={{ mx: 1 }}
            variant="outlined"
            color="success"
            onClick={handlePublishButton}
            disabled={isLoading}
          >
            Publish
          </Button>
        )}
        <Button
          sx={{ mx: 1 }}
          variant="outlined"
          onClick={handleMappoolRedirect}
          disabled={isLoading}
        >
          Edit
        </Button>
        <Button
          sx={{ mx: 1 }}
          variant="outlined"
          color="error"
          onClick={handleDeleteMappoolButton}
          disabled={isLoading || mappool.isReleased}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

//TODO: Add TournamentRoleGuard

MappoolsTable.propTypes = {
  tournament: PropTypes.object.isRequired,
  mappools: PropTypes.array.isRequired,
  setMappools: PropTypes.func.isRequired,
};

MappoolRow.propTypes = {
  mappool: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  publishMappool: PropTypes.func.isRequired,
  deleteMappool: PropTypes.func.isRequired,
  concealMappool: PropTypes.func.isRequired,
};

export default MappoolsTable;
