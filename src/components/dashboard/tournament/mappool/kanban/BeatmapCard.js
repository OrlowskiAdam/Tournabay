import { Badge, Box, Button, Card, CardMedia, IconButton, Link } from "@mui/material";
import { Bell as BellIcon } from "../../../../../icons/bell";
import { SeverityPill } from "../../../../severity-pill";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CircleIcon from "@mui/icons-material/Circle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { Star as StarIcon } from "../../../../../icons/star";
import { Clock as ClockIcon } from "../../../../../icons/clock";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const BeatmapCard = (props) => {
  const { item, mod, provided, snapshot, deleteBeatmap, ...other } = props;
  const [modAttributes, setModAttributes] = useState();

  useEffect(() => {
    let attributes = item.stats.find((stat) => stat.modification === mod);
    if (attributes === undefined) {
      attributes = item.stats.find((stat) => stat.modification === "NM");
    }
    setModAttributes(attributes);
  }, [mod]);

  const minutes = Math.floor(modAttributes?.length / 60);
  const seconds = modAttributes?.length - minutes * 60;

  return (
    <Box
      ref={provided.innerRef}
      sx={{
        outline: "none",
        py: 1,
        mx: 1,
      }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Card
        raised={snapshot.dragging}
        sx={{
          ...(snapshot.dragging && {
            backgroundColor: "background.paper",
          }),
          "&:hover": {
            backgroundColor: "background.default",
          },
          display: "flex",
        }}
        variant={snapshot.dragging ? "elevation" : "outlined"}
      >
        <CardMedia
          image={item.normalCover}
          sx={{ height: "auto", width: "30%" }}
          component="a"
          href={`https://osu.ppy.sh/beatmapsets/${item.beatmapsetId}#osu/${item.beatmapId}`}
          target="_blank"
        />
        <Box
          sx={{
            width: "100%",
            p: 2,
            "& > div > div > p": {
              m: 0,
              fontSize: 10,
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box>
              <span>{item.title}</span>
              <p>[{item.version}]</p>
              <p>mapped by {item.creator}</p>
            </Box>
            <IconButton
              aria-label="delete"
              size="small"
              color="error"
              onClick={() => deleteBeatmap(item.id)}
            >
              <DeleteForeverIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexWrap: "wrap",
              "& *": {
                mr: 0.2,
                mb: 0.2,
              },
            }}
          >
            <SeverityPill color="primary">
              <PanoramaFishEyeIcon fontSize="small" /> AR: {modAttributes?.ar}
            </SeverityPill>
            <SeverityPill color="primary">
              <CircleIcon fontSize="small" /> CS: {modAttributes?.cs}
            </SeverityPill>
            <SeverityPill color="primary">
              <FavoriteBorderIcon fontSize="small" /> HP: {modAttributes?.hp}
            </SeverityPill>
            <SeverityPill color="primary">
              <BubbleChartIcon fontSize="small" /> AC: {modAttributes?.accuracy}
            </SeverityPill>
            <SeverityPill color="warning">
              <StarIcon fontSize="small" /> {modAttributes?.stars}
            </SeverityPill>
            <SeverityPill color="warning">
              <ClockIcon fontSize="small" /> {minutes}:{seconds}
            </SeverityPill>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default BeatmapCard;
