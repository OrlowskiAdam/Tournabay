import { useSelector } from "../store";

const useTournamentMappools = () => useSelector((state) => state.tournamentMappools);

export default useTournamentMappools;
