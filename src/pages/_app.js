import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { createTheme } from '../theme';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { apolloClient } from '../apollo/apolloClient';
import store from '../store';
import UserAuthentication from '../components/userAuthentication';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { emotionCache = clientSideEmotionCache } = props;

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
          <ReduxProvider store={store}>
          <ThemeProvider
            theme={createTheme({
              direction: 'ltr',
              responsiveFontSizes: true,
              mode: 'dark'
            })}
          >
            <CssBaseline/>
            <UserAuthentication {...props} />
          </ThemeProvider>
          </ReduxProvider>
        </ApolloProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
