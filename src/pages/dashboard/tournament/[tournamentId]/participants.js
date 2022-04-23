import TournamentData from "../../../../guards/TournamentData";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import { Box, Container } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import Head from "next/head";
import ParticipantsTable from "../../../../components/dashboard/tournament/staff/ParticipantsTable";
import TournamentGuard from "../../../../guards/TournamentGuard";

const TournamentParticipants = (props) => {
  const { tournament } = useTournament();

  return (
    <>
      <Head>
        <title>Participants | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <ParticipantsTable participants={tournament.participants} />
        </Container>
      </Box>
    </>
  );
};

TournamentParticipants.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default TournamentParticipants;
