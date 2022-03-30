import useOsuAuth from "../hooks/useOsuAuth";
import { Avatar, Box, ButtonBase } from "@mui/material";
import { useRef, useState } from "react";
import AccountPopover from "./account-popover";

const UserAvatar = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const { user } = useOsuAuth();

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          src={user.avatarUrl}
        />
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

export default UserAvatar;
