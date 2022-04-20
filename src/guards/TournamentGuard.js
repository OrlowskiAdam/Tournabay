import { useEffect, useState } from "react";
import { tournamentApi } from "../api/tournamentApi";
import { useDispatch } from "../store";
import { setTournament } from "../slices/tournament";
import SplashScreen from "../components/SplashScreen";
import { useRouter } from "next/router";

const TournamentGuard = ({ children }) => {
  const router = useRouter();
  const { tournamentId } = router.query;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!tournamentId) {
      console.error("TournamentGuard was used, but no tournamentId was provided");
    } else {
      tournamentApi
        .getTournamentById(tournamentId)
        .then((response) => {
          dispatch(setTournament(response.data));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [tournamentId]);

  if (!tournamentId) return "TournamentGuard was not used correctly.";
  if (isLoading) return <SplashScreen />;
  return children;
};

export default TournamentGuard;
