import { ACCESS_TOKEN } from "../constants/constants";
import * as React from "react";
import { useRouter } from "next/router";
import SplashScreen from "../components/SplashScreen";
import { useDispatch } from "../store";
import { me } from "../slices/user";

// TODO: Fix token storage
const OsuOAuth2RedirectHandler = () => {
  const router = useRouter();
  const { token } = router.query;
  const dispatch = useDispatch();

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    router.push("/").then(() => dispatch(me()));
  } else {
    router.push("/");
  }

  return <SplashScreen />;
};

export default OsuOAuth2RedirectHandler;
