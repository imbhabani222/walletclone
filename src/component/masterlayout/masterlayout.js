"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  Menu,
  Stack,
  Avatar,
  Button,
  Link,
  List,
  ListItem,
  ListItemButton,
  Typography,
  MenuItem,
  useMediaQuery,
  IconButton,
  Drawer,
  Grid,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import { KeyboardArrowDown } from "@mui/icons-material";
import notification from "../../../public/notification.svg";
import LogoIcon from "../../../public/MasterLayoutImg/Logo.jpg";
import LogOutIcon from "../../../public/MasterLayoutImg/logout.svg";
import crossIcon from "../../../public/productImg/cross.svg";
import { HomeButtons } from "./drawers/menuButtons";
import ALL_CONSTANT from "../../constant/constant";
import ALL_USER_CONSTANTS from "../../constant/userconstant";
import Auth from "../../config/auth";
import { loginClear } from "@/src/redux/actionCreator/loginMethod";
import { ClearGenerateKey } from "@/src/redux/actionCreator/allOrgMethod";
import styles from "./masterlayout.module.scss";

const {
  PAGE_ROUTES: {
    DASHBOARD,
    APIKEY,
    SETTING,
    REPORT,
    LOGIN,
    SUPER_ADMIN,
    APIKEYSET,
    PROSETTINGS,
    PRODUCT_LISTING,
    SALES_REGISTER,
    PRODUCTS,
  },
} = ALL_CONSTANT;
const {
  MASTER_LAYOUT: { WALLET_DATA, LOGOUT, FOOTER_DATA },
} = ALL_USER_CONSTANTS;

const Masterlayout = ({ children }) => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [disableTrue, setDisableTrue] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [opend, setOpend] = useState(false);
  const open = Boolean(anchorEl);

  const menuOptions = JSON.parse(JSON.stringify(HomeButtons))?.filter((a) => {
    a.roleData = a.roleData?.filter(
      (option) => option.role.indexOf(Auth.getRole()) !== -1
    );
    return a.roleData?.length;
  });
  const handlePageChange = (page, data) => {
    const [{ path }] = data;
    router.push(path);
    setOpend(false);
  };
  useEffect(() => {
    const disableData = [
      DASHBOARD,
      APIKEY,
      SUPER_ADMIN,
      REPORT,
      SETTING,
      APIKEYSET,
      PROSETTINGS,
      "/pgWcSettings",
      "/thSettings",
      "/prefSettings",
      "/listingpage",
      SALES_REGISTER,
      PRODUCTS,
    ];
    const data = disableData.includes(pathname);
    setDisableTrue(data);
  }, [pathname]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const style = {
    position: "static",
  };

  const onHandleClose = () => {
    dispatch(loginClear());
    router.push(LOGIN);
    Auth.removeCandidateDetail();
    setAnchorEl(null);
    dispatch(ClearGenerateKey());
  };

  const handleDrawerOpen = () => {
    setOpend(true);
  };

  const handleDrawerClose = () => {
    setOpend(false);
  };

  return (
    <Stack direction="row" className={styles.container}>
      {disableTrue && (
        <Drawer
          anchor="left"
          variant={isSmallScreen ? "temporary" : "permanent"}
          open={opend}
          sx={{
            "& .MuiPaper-root": {
              position: "static",
              background: "linear-gradient(180deg, #2C29B6 0%, #6E3FF8 100%)",
              width: { xs: "60%", sm: "100%" },
            },
          }}
        >
          <Stack direction="row" className={styles.side_bar}>
            <List className={styles.menu_list}>
              <Grid
                container
                alignItems="center"
                className={styles.menu_list_logo}
                // justifyContent="space-between"
              >
                {" "}
                {isSmallScreen ? (
                  <>
                    <Image
                      onClick={handleDrawerClose}
                      className={styles.logo_icon}
                      {...crossIcon}
                      alt={"cross"}
                    />
                    <Typography className={styles.logo_text}>Wallet</Typography>
                  </>
                ) : (
                  <Image
                    className={styles.logo_icon_large_screen}
                    {...LogoIcon}
                    alt={"Logo"}
                  />
                )}
              </Grid>
              {menuOptions.map(
                ({ id, text, icon, active = false, roleData }) => (
                  <ListItem
                    key={id}
                    disablePadding
                    className={styles.list_item}
                    onClick={() => handlePageChange(text, roleData)}
                  >
                    <ListItemButton
                      className={styles.list_item_btn}
                      disabled={active === false ? true : false}
                    >
                      <Link
                        className={
                          roleData[0]?.path !== "/settings"
                            ? pathname === roleData[0]?.path
                              ? styles.list_link
                              : styles.link_inactive_btn
                            : pathname === roleData[0]?.path ||
                              pathname === "/pgWcSettings" ||
                              pathname === "/thSettings" ||
                              pathname === "/prefSettings"
                            ? styles.list_link
                            : styles.link_inactive_btn
                        }
                      >
                        <Image
                          className={styles.link_icon}
                          {...icon}
                          alt={text}
                        />
                        <Typography
                          variant="body1"
                          className={styles.link_name}
                        >
                          {text}
                        </Typography>
                      </Link>
                    </ListItemButton>
                  </ListItem>
                )
              )}
              {/* <Divider /> */}
              <div className={styles.user_btn}>
                <Avatar className={styles.header_avatar} alt="user" />{" "}
                <span className={styles.user_name}>
                  {Auth.getUserDetails()?.name}
                </span>
              </div>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                // onClick={onHandleClose}
                onClick={onHandleClose}
                className={styles.logout_btn}
              >
                <Image
                  // className={styles.logo_icon_large_screen}
                  {...LogOutIcon}
                  alt={"Logout"}
                />
              </Button>
            </List>
          </Stack>
          <Typography className={styles.appVersion}>Version 1.0.0</Typography>
        </Drawer>
      )}
      <Stack
        direction="column"
        justifyContent={isSmallScreen ? "space-between" : "end"}
        className={styles.header}
      >
        {disableTrue && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={isSmallScreen ? "space-between" : "end"}
            // gap={1.3}
            className={styles.header_bg}
          >
            {isSmallScreen && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ color: "#fff" }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              gap={1.3}
            >
              {/* <Image
                className={styles.link_icon}
                {...notification}
                alt="notification"
              /> */}

              {/* <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<KeyboardArrowDown />}
                className={styles.user_btn}
              >
                <Avatar className={styles.header_avatar} alt="user" />{" "}
                {!isSmallScreen && Auth.getUserDetails()?.name}
              </Button> */}
              {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={onHandleClose}>{LOGOUT}</MenuItem>
              </Menu> */}
            </Stack>
          </Stack>
        )}
        <Box
          className={
            disableTrue ? styles.master_body : styles.master_body_color
          }
        >
          {children}
        </Box>
        {disableTrue && !isSmallScreen && (
          <Box className={styles.footer_container}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1.3}
              className={styles.footer}
            >
              <Box className={styles.footer_text}>
                {FOOTER_DATA}
                {new Date().getFullYear()} {WALLET_DATA}
              </Box>
            </Stack>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default Masterlayout;
