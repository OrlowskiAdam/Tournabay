import TournamentData from "../../../../guards/TournamentData";
import TournamentGuard from "../../../../guards/TournamentGuard";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import TeamSettings from "../../../../components/dashboard/tournament/settings/team-settings";

const TournamentSettings = () => {
  const { tournament } = useTournament();

  return (
    <>
      <Head>
        <title>Settings | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <TeamSettings />
        </Container>
      </Box>
    </>
  );
};

TournamentSettings.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default TournamentSettings;
