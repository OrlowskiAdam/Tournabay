import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import SettingsIcon from "@mui/icons-material/Settings";
import { Users as UsersIcon } from "../icons/users";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GppGoodIcon from "@mui/icons-material/GppGood";
import PersonIcon from "@mui/icons-material/Person";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CasinoIcon from "@mui/icons-material/Casino";
import MapIcon from "@mui/icons-material/Map";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import useTournament from "../hooks/useTournament";
import useStaffMember from "../hooks/useStaffMember";

const items = (tournament) => {
  let navItems = [
    {
      href: `/dashboard/tournament/${tournament.id}/roles`,
      icon: <AdminPanelSettingsIcon fontSize="small" />,
      title: "Roles",
    },
    {
      href: `/dashboard/tournament/${tournament.id}/staff`,
      icon: <UsersIcon fontSize="small" />,
      title: "Staff",
    },
    {
      href: `/dashboard/tournament/${tournament.id}/permissions`,
      icon: <GppGoodIcon fontSize="small" />,
      title: "Permissions",
    },
    {
      href: `/dashboard/tournament/${tournament.id}/participants`,
      icon: <PersonIcon fontSize="small" />,
      title: "Participants",
    },
    {
      href: `/dashboard/tournament/${tournament.id}/groups`,
      icon: <ViewModuleIcon fontSize="small" />,
      title: "Groups",
    },
    {
      href: `/dashboard/tournament/${tournament.id}/qualification-rooms`,
      icon: <EqualizerIcon fontSize="small" />,
      title: "Qualification Rooms",
    },
    {
      href: `/dashboard/tournament/${tournament.id}/qualification-results`,
      icon: <AddTaskIcon fontSize="small" />,
      title: "Qualification Results",
    },
    {
      href: `/dashboard/tournament/${tournament.id}/matches`,
      icon: <CasinoIcon fontSize="small" />,
      title: "Matches",
    },
    {
      href: `/dashboard/tournament/${tournament.id}/mappool`,
      icon: <MapIcon fontSize="small" />,
      title: "Mappool",
    },
    {
      href: `/dashboard/tournament/${tournament.id}/settings`,
      icon: <SettingsIcon fontSize="small" />,
      title: "Settings",
    },
  ];
  if (tournament.teamFormat === "TEAM_VS") {
    const teamItem = {
      href: `/dashboard/tournament/${tournament.id}/teams`,
      icon: <GroupWorkIcon fontSize="small" />,
      title: "Teams",
    };
    navItems.splice(4, 0, teamItem);
  }
  return navItems;
};

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const { tournament } = useTournament();
  const staffMember = useStaffMember();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  {tournament.name}
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items(tournament).map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
