import { useEffect, useState } from "react";
import { useDispatch } from "../store";
import SplashScreen from "../components/SplashScreen";
import { useRouter } from "next/router";
import { mappoolApi } from "../api/mappoolApi";
import { setMappools } from "../slices/tournamentMappools";
import { notifyOnError } from "../utils/error-response";

const TournamentMappoolData = ({ children }) => {
  const router = useRouter();
  const { tournamentId, mappoolId } = router.query;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mappoolApi
      .getMappools(tournamentId)
      .then((response) => dispatch(setMappools(response.data)))
      .catch((error) => notifyOnError(error))
      .finally(() => setIsLoading(false));
  }, [tournamentId, mappoolId]);

  if (!tournamentId) return "TournamentData was not used correctly.";
  if (isLoading) return <SplashScreen />;
  return children;
};

export default TournamentMappoolData;
