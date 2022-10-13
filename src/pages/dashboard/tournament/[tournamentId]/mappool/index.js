import TournamentData from "../../../../../guards/TournamentData";
import { DashboardLayout } from "../../../../../components/dashboard-layout";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import TournamentGuard from "../../../../../guards/TournamentGuard";
import MappoolsTable from "../../../../../components/dashboard/tournament/mappool/MappoolsTable";
import { useEffect, useState } from "react";
import useTournament from "../../../../../hooks/useTournament";
import { mappoolApi } from "../../../../../api/mappoolApi";
import { notifyOnError } from "../../../../../utils/error-response";

const TournamentMappool = () => {
  const { tournament } = useTournament();
  const [mappools, setMappools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    mappoolApi
      .getMappools(tournament.id)
      .then((response) => setMappools(response.data))
      .catch((error) => notifyOnError(error))
      .finally(() => setIsLoading(false));
  }, [tournament.id]);

  if (isLoading) return <p>Loading</p>;

  return (
    <>
      <Head>
        <title>Mappools | {tournament.name}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <MappoolsTable mappools={mappools} tournament={tournament} setMappools={setMappools} />
        </Container>
      </Box>
    </>
  );
};

TournamentMappool.getLayout = (page) => (
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default TournamentMappool;
