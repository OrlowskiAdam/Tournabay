import SplashScreen from "./SplashScreen";
import { useDispatch } from "react-redux";
import useOsuAuth from "../hooks/useOsuAuth";
import React, { useEffect, Suspense } from "react";
import { me } from "../slices/user";

const UserAuthentication = (props) => {
  const { Component, pageProps } = props;
  const dispatch = useDispatch();
  const { user } = useOsuAuth();

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <Suspense fallback={"loading"}>
      {user.isInitialized && getLayout(<Component {...pageProps} />)}
    </Suspense>
  );
};

export default UserAuthentication;
