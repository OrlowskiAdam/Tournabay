import TournamentGuard from "../../../../guards/TournamentGuard";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import useTournament from "../../../../hooks/useTournament";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const TournamentRoles = () => {
  const { tournament } = useTournament();
  return (
    <>
      <Head>
        <title>Roles | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Order List
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button color="primary" sx={{ m: 1 }} variant="contained">
                  New Role
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

TournamentRoles.getLayout = (page) => (
  <TournamentGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </TournamentGuard>
);

export default TournamentRoles;
