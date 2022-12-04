import { useRouter } from "next/router";
import { MainLayout } from "../components/main-layout";
import HomePage from "./index";
import { Box, Button, Card, Chip, Container, Typography } from "@mui/material";

const DiscordVerificationPage = () => {
  const router = useRouter();
  const { message, error } = router.query;

  if (error) {
    if (error === "discord-account-already-linked") {
      return (
        <Container maxWidth="lg">
          <AccountAlreadyLinked error="discord-account-already-linked" />
        </Container>
      );
    }
  }

  if (message) {
    if (message === "discord-account-linked") {
      return (
        <Container maxWidth="lg">
          <AccountLinked />
        </Container>
      );
    }
  }

  return (
    <Container maxWidth="lg">
      <UnexpectedError />
    </Container>
  );
};

const AccountLinked = () => {
  return (
    <Card
      sx={{
        my: 4,
        alignItems: "center",
        backgroundColor: "success.light",
        color: "success.contrastText",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        p: 4,
      }}
    >
      <div>
        <div>
          <Chip color="success" label={`Success`} />
        </div>
        <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
          Your Discord account has been successfully linked.
        </Typography>
        <Typography color="inherit" sx={{ mt: 1 }} variant="subtitle2">
          You can now manage your linked Discord accounts in Account Page.
        </Typography>
      </div>
    </Card>
  );
};

const AccountAlreadyLinked = (props) => {
  const { error } = props;
  return (
    <Card
      sx={{
        my: 4,
        alignItems: "center",
        backgroundColor: "error.light",
        color: "error.contrastText",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        p: 4,
      }}
    >
      <div>
        <div>
          <Chip color="error" label={`Error: ${error}`} />
        </div>
        <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
          This Discord account is already linked to another account.
        </Typography>
        <Typography color="inherit" sx={{ mt: 1 }} variant="subtitle2">
          Looks like you are trying to link a Discord account that is already linked to another
          account. Please unlink the Discord account from the other account first.
        </Typography>
      </div>
    </Card>
  );
};

const UnexpectedError = (props) => {
  const { error } = props;
  return (
    <Card
      sx={{
        my: 4,
        alignItems: "center",
        backgroundColor: "error.light",
        color: "error.contrastText",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        p: 4,
      }}
    >
      <div>
        <div>
          <Chip color="error" label={`Error: ${error}`} />
        </div>
        <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
          An unexpected error occurred.
        </Typography>
        <Typography color="inherit" sx={{ mt: 1 }} variant="subtitle2">
          Please contact Tournabay administrators.
        </Typography>
      </div>
    </Card>
  );
};

DiscordVerificationPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default DiscordVerificationPage;
