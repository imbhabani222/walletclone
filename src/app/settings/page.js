"use client";
import React from "react";
import { Box, Divider, Button, Stack } from "@mui/material";
import styles from "./settings.module.scss";
import { useRouter } from "next/navigation";
// import Auth from "../../config/auth";

const Settings = () => {
  const router = useRouter();
  return (
    <>
      <Box className={styles.setting_super_container}>
        <Box className={styles.setting_tabs_container}>
          <Box className={styles.setting_header}></Box>
          {/* <Divider /> */}
          {/* {Auth.getRole() === "TenantAdmin" || Auth.getRole() === "OrgAdmin" ? ( */}
          <Stack className={styles.setting_btns_container}>
            <Button
              className={styles.setting_buttons}
              onClick={() => router.push("/pgWcSettings")}
            >
              <Box className={styles.setting_btns_box1}></Box> Payment Gateway &
              Wallet Charges
            </Button>
            <Button
              className={styles.setting_buttons}
              onClick={() => router.push("/thSettings")}
            >
              <Box className={styles.setting_btns_box2}></Box> Threshold Limit
            </Button>
            <Button
              className={styles.setting_buttons}
              onClick={() => router.push("/prefSettings")}
            >
              {" "}
              <Box className={styles.setting_btns_box3}></Box>Preferences
            </Button>
          </Stack>
          {/* ) : Auth.getRole() === "ProductOwner" ? (
            <Stack className={styles.setting_btns_container}>
              <Button
                className={styles.setting_buttons}
                onClick={() => router.push("/pgWcSettings")}
              >
                <Box className={styles.setting_btns_box1}></Box> Api key
                generation
              </Button>
              <Button
                className={styles.setting_buttons}
                onClick={() => router.push("/thSettings")}
              >
                <Box className={styles.setting_btns_box2}></Box> Wallet
                Threshold
              </Button>
              <Button
                className={styles.setting_buttons}
                onClick={() => router.push("/thSettings")}
              >
                <Box className={styles.setting_btns_box2}></Box>Wallet Charges
                Visibility
              </Button>
              <Button
                className={styles.setting_buttons}
                onClick={() => router.push("/prefSettings")}
              >
                {" "}
                <Box className={styles.setting_btns_box3}></Box>Wallet Charges
                Visibility
              </Button>
            </Stack>
          ) : (
            ""
          )} */}
        </Box>
      </Box>
    </>
  );
};

export default Settings;
