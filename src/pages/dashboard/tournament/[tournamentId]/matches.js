import TournamentData from "../../../../guards/TournamentData";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import { Box, Container } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import Head from "next/head";
import TournamentGuard from "../../../../guards/TournamentGuard";
import ParticipantVsMatchesTable from "../../../../components/dashboard/tournament/matches/playervs/ParticipantVsMatchesTable";

const TournamentMatches = () => {
  const { tournament } = useTournament();

  return (
    <>
      <Head>
        <title>Matches | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          {tournament.teamFormat === "PLAYER_VS" ? (
            <ParticipantVsMatchesTable matches={tournament.matches} />
          ) : (
            <></>
          )}
        </Container>
      </Box>
    </>
  );
};

TournamentMatches.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default TournamentMatches;
