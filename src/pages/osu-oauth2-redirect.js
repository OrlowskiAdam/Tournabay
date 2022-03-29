import { ACCESS_TOKEN } from "../constants/constants";
import * as React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SplashScreen from "../components/SplashScreen";

// TODO: Fix token storage
const OsuOAuth2RedirectHandler = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    router.push("/");
  }, []);

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  return <SplashScreen />;
};

export default OsuOAuth2RedirectHandler;
