import TournamentData from "../../../../guards/TournamentData";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import { Box, Container } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import Head from "next/head";
import StaffTable from "../../../../components/dashboard/tournament/staff/StaffTable";
import TournamentGuard from "../../../../guards/TournamentGuard";

const TournamentStaff = (props) => {
  const { tournament } = useTournament();

  return (
    <>
      <Head>
        <title>Staff Members | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <StaffTable members={tournament.staffMembers} />
        </Container>
      </Box>
    </>
  );
};

TournamentStaff.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default TournamentStaff;
