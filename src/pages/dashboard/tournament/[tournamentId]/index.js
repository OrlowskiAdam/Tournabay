import { DashboardLayout } from "../../../../components/dashboard-layout";
import Head from "next/head";
import TournamentData from "../../../../guards/TournamentData";
import useTournament from "../../../../hooks/useTournament";
import TournamentGuard from "../../../../guards/TournamentGuard";

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
  <TournamentData>
    <TournamentGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </TournamentGuard>
  </TournamentData>
);

export default TournamentDashboard;
