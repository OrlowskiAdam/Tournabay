import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { createTheme } from '../theme';
import { ApolloProvider, gql, useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient, getApolloClient } from '../apollo/apolloClient';
import { useEffect } from 'react';
import { me } from '../slices/user';
import SplashScreen from '../components/SplashScreen';
import useOsuAuth from '../hooks/useOsuAuth';
import { reduxWrapper } from '../store/reduxWrapper';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const dispatch = useDispatch();
  const { user } = useOsuAuth();

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    dispatch(me());
    console.log(user);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          AimCup
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider
            theme={createTheme({
              direction: 'ltr',
              responsiveFontSizes: true,
              mode: 'dark'
            })}
          >
            <CssBaseline/>
            {user.isInitialized ? getLayout(<Component {...pageProps} />) : <SplashScreen/>}
          </ThemeProvider>
        </ApolloProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default reduxWrapper.withRedux(App);
