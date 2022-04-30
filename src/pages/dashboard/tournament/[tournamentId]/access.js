import TournamentData from "../../../../guards/TournamentData";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import { Box, Button, Card, CardContent, CardHeader, Container } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import RolesSecurity from "../../../../components/dashboard/tournament/access/roles-security";
import TournamentGuard from "../../../../guards/TournamentGuard";
import StaffSecurity from "../../../../components/dashboard/tournament/access/staff-security";

const TournamentAccess = () => {
  const { tournament } = useTournament();
  return (
    <>
      <Head>
        <title>Access | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 4,
        }}
      >
        <Container maxWidth={false}>
          <h1>Page access & Security</h1>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <RolesSecurity />
            </CardContent>
          </Card>
          <Card sx={{ my: 2 }}>
            <CardContent>
              <StaffSecurity />
            </CardContent>
          </Card>
          <Card sx={{ my: 2 }}>
            <CardContent>
              <RolesSecurity />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

TournamentAccess.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default TournamentAccess;
