import { Box } from "@mui/material";
import Head from "next/head";

const SlashScreen = () => (
  <>
    <Head>
      <title>Tournabay</title>
      <meta name="title" content="Tournabay" />
      <meta
        name="description"
        content="(closed Alpha) Tournabay management system for osu! cummunity tournaments. This project is still in work and will be released in the near future."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tournabay.com/" />
      <meta property="og:title" content="Tournabay" />
      <meta
        property="og:description"
        content="[Alpha] Tournabay management system for osu! cummunity tournaments. This project is still in work and will be released in the near future."
      />
      <meta property="og:image" content="https://i.imgur.com/0uLspAH.png" />
      <meta property="og:image:type" content="image/png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://tournabay.com/" />
      <meta property="twitter:title" content="Tournabay (early Alpha):splash:28" />
      <meta
        property="twitter:description"
        content="Tournabay management system for osu! cummunity tournaments.:splash:31"
      />
      <meta property="twitter:image" content="https://i.imgur.com/0uLspAH.png" />
      <meta name="theme-color" content="#7582eb" />
    </Head>
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        left: 0,
        p: 3,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 2000,
      }}
    >
      {/*<Logo />*/}
      Loading...
    </Box>
  </>
);

export default SlashScreen;
