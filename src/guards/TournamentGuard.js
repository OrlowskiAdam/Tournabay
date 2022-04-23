import useTournament from "../hooks/useTournament";
import useOsuAuth from "../hooks/useOsuAuth";
import NotFound from "../pages/404";

const TournamentGuard = ({ children }) => {
  const { tournament } = useTournament();
  const { user } = useOsuAuth();

  const staffMember =
    user && tournament.staffMembers.find((staffMember) => staffMember.user.id === user.id);

  if (!staffMember) return <NotFound />;
  if (tournament.owner.id === user.id) return children;

  if (
    tournament.staffMembers.some(
      (tournamentStaffMember) => tournamentStaffMember.id === staffMember.id
    )
  )
    return children;
  return <NotFound />;
};

export default TournamentGuard;
