import TournamentData from "../../../../guards/TournamentData";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import useTournament from "../../../../hooks/useTournament";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RolesTable from "../../../../components/dashboard/tournament/roles/RolesTable";
import TournamentGuard from "../../../../guards/TournamentGuard";

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
          <RolesTable roles={tournament.roles} tournament={tournament} />
        </Container>
      </Box>
    </>
  );
};

TournamentRoles.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default TournamentRoles;
