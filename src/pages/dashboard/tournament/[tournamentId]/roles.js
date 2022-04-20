import TournamentGuard from "../../../../guards/TournamentGuard";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import useTournament from "../../../../hooks/useTournament";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RolesTable from "../../../../components/dashboard/tournament/roles/RolesTable";

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
          <RolesTable roles={tournament.roles} />
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
