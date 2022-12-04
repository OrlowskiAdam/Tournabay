import NextLink from "next/link";
import Router, { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Cog as CogIcon } from "../icons/cog";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import useOsuAuth from "../hooks/useOsuAuth";
import { useDispatch } from "../store";
import { logout } from "../slices/user";
import { DiscordIcon } from "../icons/discord-icon";
import { OSU_AUTH_URL } from "../constants/constants";
import { discordApi } from "../api/discordApi";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const { user } = useOsuAuth();
  const dispatch = useDispatch();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={200}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          p: 2,
          display: "flex",
        }}
      >
        <Avatar
          src={user.avatarUrl}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography variant="body1">{user.username}</Typography>
          <Typography color="textSecondary" variant="body2">
            #placeholder
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <NextLink href="#" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <UserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Account</Typography>} />
          </MenuItem>
        </NextLink>
        <NextLink href="" passHref>
          <MenuItem
            component="button"
            onClick={() => {
              discordApi.discordVerification().then((response) => {
                Router.push(response.data);
              });
            }}
          >
            <ListItemIcon>
              <DiscordIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Link Discord</Typography>} />
          </MenuItem>
        </NextLink>
        <NextLink href="#" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Settings</Typography>} />
          </MenuItem>
        </NextLink>
        <Divider />
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" onClick={() => dispatch(logout())}>
                Logout
              </Typography>
            }
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default AccountPopover;
