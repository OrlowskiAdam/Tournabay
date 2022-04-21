import TournamentGuard from "../../../../guards/TournamentGuard";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import { Box, Container } from "@mui/material";
import RolesTable from "../../../../components/dashboard/tournament/roles/RolesTable";
import useTournament from "../../../../hooks/useTournament";
import Head from "next/head";
import StaffTable from "../../../../components/dashboard/tournament/staff/StaffTable";

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
  <TournamentGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </TournamentGuard>
);

export default TournamentStaff;
