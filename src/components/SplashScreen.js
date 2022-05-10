import { Box } from "@mui/material";
import Head from "next/head";

const SlashScreen = () => (
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
      <meta property="og:title" content="Tournabay" />
      <meta
        property="og:description"
        content="[Alpha] Tournabay management system for osu! cummunity tournaments."
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
