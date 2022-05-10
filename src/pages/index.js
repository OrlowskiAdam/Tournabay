import { MainLayout } from "../components/main-layout";
import { Container } from "@mui/material";
import useOsuAuth from "../hooks/useOsuAuth";
import Head from "next/head";

const HomePage = () => {
  const { user } = useOsuAuth();

  return (
    <>
      <Head>
        <title>Tournabay:index:12 </title>
        <meta name="title" content="Tournabay" />
        <meta
          name="description"
          content="(closed Alpha) Tournabay management system for osu! cummunity tournaments. This project is still in work and will be released in the near future."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tournabay.com/" />
        <meta property="og:title" content="Tournabay (early Alpha):index:21" />
        <meta
          property="og:description"
          content="Tournabay management system for osu! cummunity tournaments.:index:24"
        />
        <meta property="og:image" content="https://i.imgur.com/WL7SlzZ.png" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://tournabay.com/" />
        <meta property="twitter:title" content="Tournabay (early Alpha):index:33" />
        <meta
          property="twitter:description"
          content="Tournabay management system for osu! cummunity tournaments.:index:36"
        />
        <meta property="twitter:image" content="https://i.imgur.com/WL7SlzZ.png" />
      </Head>
      <Container maxWidth="lg">{user.username}</Container>
    </>
  );
};

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default HomePage;
