import TournamentData from "../../../../guards/TournamentData";
import TournamentGuard from "../../../../guards/TournamentGuard";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import GroupsGrid from "../../../../components/dashboard/tournament/groups/GroupsGrid";

const GroupsPage = () => {
  const { tournament } = useTournament();

  return (
    <>
      <Head>
        <title>Groups | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <GroupsGrid tournament={tournament} />
        </Container>
      </Box>
    </>
  );
};

GroupsPage.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default GroupsPage;
