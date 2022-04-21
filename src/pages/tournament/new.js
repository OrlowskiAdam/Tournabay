import AuthGuard from "../../guards/AuthGuard";
import { MainLayout } from "../../components/main-layout";
import {
  Container,
  Grid,
  StepContent,
  Step,
  StepIcon,
  StepLabel,
  Stepper,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import Head from "next/head";
import { Box } from "@mui/system";
import { TournamentScoreType } from "../../components/tournament/new/tournament-score-type";
import { Check as CheckIcon } from "../../icons/check";
import { useState } from "react";
import { ArrowRight as ArrowRightIcon } from "../../icons/arrow-right";
import AddIcon from "@mui/icons-material/Add";
import { TournamentFormatType } from "../../components/tournament/new/tournament-format-type";
import { TournamentData } from "../../components/tournament/new/tournament-data";
import NextLink from "next/link";
import useTournament from "../../hooks/useTournament";

const CreateTournament = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const { tournament } = useTournament();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    setComplete(true);
  };

  const steps = [
    {
      label: "Scoring system",
      content: <TournamentScoreType onBack={handleBack} onNext={handleNext} />,
    },
    {
      label: "Team format",
      content: <TournamentFormatType onBack={handleBack} onNext={handleNext} />,
    },
    {
      label: "Tournament data",
      content: (
        <TournamentData onBack={handleBack} onNext={handleNext} handleComplete={handleComplete} />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>New Tournament | Tournabay</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              pt: {
                xs: 4,
                sm: 4,
                md: 4,
              },
              pb: 4,
            }}
          >
            <Box maxWidth="lg">
              <Typography sx={{ mb: 3 }} variant="h4">
                Create tournament
              </Typography>
              {!complete ? (
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  sx={{
                    "& .MuiStepConnector-line": {
                      borderLeftColor: "divider",
                      borderLeftWidth: 2,
                    },
                  }}
                >
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel StepIconComponent={StepIcon}>
                        <Typography sx={{ ml: 2 }} variant="overline">
                          {step.label}
                        </Typography>
                      </StepLabel>
                      <StepContent
                        sx={{
                          borderLeftColor: "divider",
                          borderLeftWidth: 2,
                          ...(activeStep === index && {
                            py: 4,
                          }),
                        }}
                      >
                        {step.content}
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              ) : (
                <Box
                  maxWidth="md"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "success.main",
                      color: "success.contrastText",
                      height: 40,
                      width: 40,
                    }}
                  >
                    <CheckIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    All done!
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    You can now manage your newly created tournament
                  </Typography>
                  <NextLink href={`/dashboard/tournament/${tournament.id}`} passHref>
                    <Button
                      component="a"
                      endIcon={<ArrowRightIcon fontSize="small" />}
                      sx={{ mt: 4, mb: 4 }}
                      variant="contained"
                    >
                      Go back to dashboard
                    </Button>
                  </NextLink>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

CreateTournament.getLayout = (page) => (
  <AuthGuard>
    <MainLayout>
      <Container maxWidth="lg">{page}</Container>
    </MainLayout>
  </AuthGuard>
);

export default CreateTournament;
