import useTournament from "./useTournament";
import useOsuAuth from "./useOsuAuth";

const useStaffMember = () => {
  const { tournament } = useTournament();
  const { user } = useOsuAuth();

  if (!tournament || !user) return null;

  return tournament.staffMembers.find((staffMember) => staffMember.user.id === user.id);
};

export default useStaffMember;
