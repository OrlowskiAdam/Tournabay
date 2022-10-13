import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Typography,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { useDispatch, useSelector } from "../../../store";
import { setTournamentMaxStage, setTournamentTeamFormat } from "../../../slices/tournamentWizard";

const typeOptions = [
  {
    description: "Player vs. Player",
    title: "Player Vs.",
    value: "PLAYER_VS",
  },
  {
    description: "Team vs. Team",
    title: "Team Vs.",
    value: "TEAM_VS",
  },
];

const stages = ["RO128", "RO64", "RO32", "RO16"];

export const TournamentFormatType = (props) => {
  const { onBack, onNext, ...other } = props;
  const { tournament } = useSelector((state) => state.tournamentWizard);
  const dispatch = useDispatch();

  const handleTeamFormatChange = (newType) => {
    dispatch(setTournamentTeamFormat(newType));
  };

  const handleMaxStageChange = (stageValue) => {
    dispatch(setTournamentMaxStage(stageValue));
  };

  return (
    <div {...other}>
      <Typography variant="h6">Choose team format</Typography>
      <Box sx={{ mt: 3 }}>
        {typeOptions.map((typeOption) => (
          <Box key={typeOption.value} sx={{ mb: 2 }}>
            <Card
              key={typeOption.value}
              sx={{
                alignItems: "center",
                cursor: "pointer",
                display: "flex",
                p: 2,
                ...(tournament.teamFormat === typeOption.value && {
                  borderColor: "primary.main",
                  borderWidth: 2,
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  m: "-1px",
                }),
              }}
              onClick={() => handleTeamFormatChange(typeOption.value)}
              variant="outlined"
            >
              <Radio checked={tournament.teamFormat === typeOption.value} color="primary" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle1">{typeOption.title}</Typography>
                <Typography color="textSecondary" variant="body2">
                  {typeOption.description}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Max stage</Typography>
        <FormControl size="medium" sx={{ minWidth: 150, m: 1 }}>
          <InputLabel id="base-team-size">Max stage</InputLabel>
          <Select
            labelId="base-team-size"
            id="base-team-size"
            value={tournament.maxStage}
            label="Base team size"
            onChange={handleMaxStageChange}
          >
            {stages.map((stage) => (
              <MenuItem key={stage} value={stage}>
                {stage}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button endIcon={<ArrowRightIcon fontSize="small" />} onClick={onNext} variant="contained">
        Continue
      </Button>
      <Button sx={{ ml: 2 }} onClick={onBack}>
        Back
      </Button>
    </div>
  );
};

TournamentFormatType.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
