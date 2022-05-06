import TournamentData from "../../../../guards/TournamentData";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import { Box, Container } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import Head from "next/head";
import TournamentGuard from "../../../../guards/TournamentGuard";
import NotFound from "../../../404";
import TeamsTable from "../../../../components/dashboard/tournament/teams/TeamsTable";

const TournamentTeams = () => {
  const { tournament } = useTournament();

  if (tournament.teamFormat === "PLAYER_VS") return <NotFound />;

  return (
    <>
      <Head>
        <title>Teams | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <TeamsTable teams={tournament.teams} />
        </Container>
      </Box>
    </>
  );
};

TournamentTeams.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default TournamentTeams;
