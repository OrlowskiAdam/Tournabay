import PropTypes from "prop-types";
import NextLink from "next/link";
import { AppBar, Avatar, Box, Button, Container, IconButton, Link, Toolbar } from "@mui/material";
import { Menu as MenuIcon } from "../icons/menu";
import { Logo } from "./logo";
import { OSU_AUTH_URL } from "../constants/constants";
import useOsuAuth from "../hooks/useOsuAuth";
import UserAvatar from "./user-avatar";

export const MainNavbar = (props) => {
  const { onOpenSidebar } = props;
  const { user } = useOsuAuth();

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottomColor: "divider",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        color: "text.secondary",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <NextLink href="/" passHref>
            <a>
              <Logo
                sx={{
                  display: {
                    md: "inline",
                    xs: "inline",
                  },
                  height: 40,
                  width: 40,
                }}
              />
            </a>
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            onClick={onOpenSidebar}
            sx={{
              display: {
                md: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              alignItems: "center",
              display: {
                md: "flex",
                xs: "none",
              },
            }}
          >
            <NextLink href="/tournament/new" passHref>
              <Link color="textSecondary" underline="none" variant="subtitle2">
                Create tournament
              </Link>
            </NextLink>
            <NextLink href="#" passHref>
              <Link color="textSecondary" sx={{ ml: 2 }} underline="none" variant="subtitle2">
                Rules
              </Link>
            </NextLink>
            <NextLink href="#" passHref>
              <Link color="textSecondary" sx={{ ml: 2 }} underline="none" variant="subtitle2">
                Links
              </Link>
            </NextLink>
            <NextLink href="#" passHref>
              <Link
                color="textSecondary"
                component="a"
                sx={{ ml: 2 }}
                underline="none"
                variant="subtitle2"
              >
                Staff
              </Link>
            </NextLink>
            {user.isAuthenticated ? (
              <UserAvatar />
            ) : (
              <Button
                component="a"
                href={OSU_AUTH_URL}
                size="medium"
                sx={{ ml: 2 }}
                // target="_blank"
                variant="contained"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
