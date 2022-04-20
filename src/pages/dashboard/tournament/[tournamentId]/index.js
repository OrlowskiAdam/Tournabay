import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import TournamentGuard from "../../../../guards/TournamentGuard";
import useTournament from "../../../../hooks/useTournament";

const TournamentDashboard = () => {
  const { tournament } = useTournament();
  return (
    <>
      <Head>
        <title>Dashboard | {tournament.name}</title>
      </Head>
      <div>
        <h1>{tournament.name}</h1>
      </div>
    </>
  );
};

TournamentDashboard.getLayout = (page) => (
  <TournamentGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </TournamentGuard>
);

export default TournamentDashboard;
