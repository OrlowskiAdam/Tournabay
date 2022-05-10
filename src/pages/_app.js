import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { createTheme } from "../theme";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";
import UserAuthentication from "../components/userAuthentication";
import { Toaster } from "react-hot-toast";
import { Router } from "next/router";
import nProgress from "nprogress";
import React from "react";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { emotionCache = clientSideEmotionCache } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Home | Tournabay</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ReduxProvider store={store}>
          <ThemeProvider
            theme={createTheme({
              direction: "ltr",
              responsiveFontSizes: true,
              mode: "dark",
            })}
          >
            <Toaster position="top-center" reverseOrder={false} />
            <CssBaseline />
            <UserAuthentication {...props} />
          </ThemeProvider>
        </ReduxProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
