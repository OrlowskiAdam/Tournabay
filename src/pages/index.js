import { MainLayout } from "../components/main-layout";
import { Container } from "@mui/material";
import useOsuAuth from "../hooks/useOsuAuth";
import Head from "next/head";

const HomePage = () => {
  const { user } = useOsuAuth();

  return (
    <>
      <Head>
        <title>Tournabay (early Alpha)</title>
        <meta name="title" content="Tournabay" />
        <meta
          name="description"
          content="(closed Alpha) Tournabay management system for osu! cummunity tournaments. This project is still in work and will be released in the near future."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tournabay.com/" />
        <meta property="og:title" content="Tournabay (early Alpha)" />
        <meta
          property="og:description"
          content="Tournabay management system for osu! cummunity tournaments."
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tournabay.com/" />
        <meta property="twitter:title" content="Tournabay (early Alpha)" />
        <meta
          property="twitter:description"
          content="Tournabay management system for osu! cummunity tournaments."
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />
      </Head>
      <Container maxWidth="lg">{user.username}</Container>
    </>
  );
};

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default HomePage;
