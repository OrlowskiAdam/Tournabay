import TournamentData from "../../../../guards/TournamentData";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import { Box, Button, Card, CardContent, CardHeader, Container } from "@mui/material";
import useTournament from "../../../../hooks/useTournament";
import TournamentGuard from "../../../../guards/TournamentGuard";

const TournamentAccess = () => {
  const { tournament } = useTournament();
  return (
    <>
      <Head>
        <title>Permissions | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 4,
        }}
      >
        <Container maxWidth={false}>
          <h1>Permissions</h1>
          {tournament.teamFormat === "TEAM_VS" && (
            <Card sx={{ my: 2 }}>
              <CardContent>asd</CardContent>
            </Card>
          )}
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
