"use client";
import React, { useState } from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import styles from "./thsetting.module.scss";
import WtSettings from "@/src/component/wtSetting/wtSettings";
// import Auth from "../../config/auth";

const ThSetting = () => {
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
          <Box
            className={styles.super_class}
            // sx={{ padding: "0 2.063em 1.813em" }}
          >
            {" "}
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
      borderRadius: "10px",
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
              label="Threshold Limit"
              {...a11yProps(0)}
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
                label="Wallet Threshold"
                {...a11yProps(0)}
              />
            </StyledTabs>
          )} */}
        </Box>
        {/* {Auth.getRole() === "TenantAdmin" || Auth.getRole() === "OrgAdmin" ? ( */}
        <>
          <TabPanel value={value} index={0}>
            <WtSettings />
          </TabPanel>
        </>
        {/* ) : (
          <>
            <TabPanel value={value} index={0}>
              <WtSettings />
            </TabPanel>
          </>
        )} */}
      </Box>
    </>
  );
};

export default ThSetting;
