"use client";
import React, { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import PgSettings from "@/src/component/pgSetting/pgSettings";
import styles from "./pgwcsetting.module.scss";
// import WtSettings from "@/src/component/wtSetting/wtSettings";
// import Auth from "../../config/auth";
// import ApiKeyList from "@/src/component/apikey/apikey";

const PgWcSetting = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box className={styles.super_class} sx={{ padding: "0 1em 0" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      background:
        "linear-gradient(313deg, rgba(45, 201, 229, 0.90) 0%, rgba(55, 85, 229, 0.90) 53.94%, rgba(110, 63, 248, 0.90) 93.54%)",
      height: "4px",
      borderRadius: "3px",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 10,
      width: "100%",
      background: "transparent",
    },
  });

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "capitalize",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      // color: "#7f7e81",

      "&.Mui-selected": {
        color: "#2D2A30",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#EBF1FF",
      },
    })
  );

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box className={styles.super_container}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className={styles.tabs_container}
        >
          {/* {Auth.getRole() === "TenantAdmin" || Auth.getRole() === "OrgAdmin" ? ( */}
          <StyledTabs
            className={styles.tab_box}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab
              className={styles.tab_box_child}
              label="Payment Gateway"
              {...a11yProps(0)}
            />
            <StyledTab
              className={styles.tab_box_child}
              label="Wallet Charge"
              {...a11yProps(1)}
            />
          </StyledTabs>
          {/* ) : (
            <StyledTabs
              className={styles.tab_box}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <StyledTab
                className={styles.tab_box_child}
                label="API Key Generation"
                {...a11yProps(0)}
              />
              <StyledTab
                className={styles.tab_box_child}
                label="Wallet Threshold"
                {...a11yProps(1)}
              />
            </StyledTabs>
          )} */}
        </Box>
        {/* {Auth.getRole() === "TenantAdmin" || Auth.getRole() === "OrgAdmin" ? ( */}
        <>
          <TabPanel value={value} index={0}>
            <PgSettings isWallet={false} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PgSettings isWallet={true} />
          </TabPanel>
        </>
        {/* ) : (
          <>
            <TabPanel value={value} index={0}>
              <ApiKeyList />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <WtSettings />
            </TabPanel>
          </>
        )} */}
      </Box>
    </>
  );
};

export default PgWcSetting;
