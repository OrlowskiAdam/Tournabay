import TournamentData from "../../../../guards/TournamentData";
import TournamentGuard from "../../../../guards/TournamentGuard";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import QualificationResultsTable from "../../../../components/dashboard/tournament/qualifications/QualificationResultsTable";

const QualificationResultsPage = () => {
  const { tournament } = useTournament();

  return (
    <>
      <Head>
        <title>Qualification rooms | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <QualificationResultsTable tournament={tournament} />
        </Container>
      </Box>
    </>
  );
};

QualificationResultsPage.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default QualificationResultsPage;
