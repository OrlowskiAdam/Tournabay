import { useSelector } from "../store";

const useTournament = () => useSelector((state) => state.tournament);

export default useTournament;
