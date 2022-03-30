import { useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { Box, Button, Card, Radio, Typography } from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import { Link } from "react-router-dom";

const typeOptions = [
  {
    description: "Future scoring system. Mainstream in tournament usage.",
    title: "Score v2",
    value: "SCORE_V2",
  },
  {
    description: "Current scoring system on Stable. Obsolete for tournament usage.",
    title: "Score v1",
    value: "SCORE_V1",
  },
  {
    description: "Rarely used. Based on players' accuracy.",
    title: "Accuracy",
    value: "ACCURACY",
  },
];

export const TournamentScoreType = (props) => {
  const { onBack, onNext, ...other } = props;
  const [type, setType] = useState(typeOptions[0].value);

  const handleChange = (newType) => {
    setType(newType);
  };

  return (
    <div {...other}>
      <Typography variant="h6">
        Learn more about scoring system{" "}
        <Typography
          variant="h6"
          component="a"
          href="https://osu.ppy.sh/wiki/en/Gameplay/Score"
          target="_blank"
        >
          here
        </Typography>
      </Typography>
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
                ...(type === typeOption.value && {
                  borderColor: "primary.main",
                  borderWidth: 2,
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  m: "-1px",
                }),
              }}
              onClick={() => handleChange(typeOption.value)}
              variant="outlined"
            >
              <Radio checked={type === typeOption.value} color="primary" />
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
      <Button endIcon={<ArrowRightIcon fontSize="small" />} onClick={onNext} variant="contained">
        Continue
      </Button>
    </div>
  );
};

TournamentScoreType.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
