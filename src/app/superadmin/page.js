"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { loginClear } from "@/src/redux/actionCreator/loginMethod";
import approvalicon from "../../../public/DashboardImg/pendingapprval.svg";
import usericon from "../../../public/DashboardImg/usermngicon.svg";
import Pendingorg from "@/src/component/pendingOrg";
import Tenentlist from "@/src/component/tenentList";
import styles from "./superadmin.module.scss";

const SuperAdmin = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginClear());
  }, []);
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
          <Box sx={{ padding: "0 2.063em 1.813em" }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

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
      backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 40,
      width: "100%",
      background: "transparent",
    },
  });

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      width: "100%",
      height: "100px",
      color: "#2D2A30",
      background: "#fff",
      flex: "1 0 50%",

      "&.Mui-selected": {
        color: "#2D2A30",
        backgroundColor: "#EBF1FF",
        width: "100%",
        height: "100px",
        borderBottom: "2px solid #6D96FB",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#EBF1FF",
      },
    })
  );

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box className={styles.super_container}>
        <Box className={styles.tabs_container}>
          <StyledTabs
            variant="fullWidth"
            className={styles.tab_box}
            value={value}
            onChange={handleChange}
            aria-label="superadmin tabs"
          >
            <StyledTab
              className={styles.tab_box_child}
              icon={<Image alt="approvalicon" {...approvalicon} />}
              label="Organisation Approval(s) "
              {...a11yProps(0)}
            />
            <StyledTab
              className={styles.tab_box_child}
              icon={<Image alt="usericon" {...usericon} />}
              label="Organisation Management"
              {...a11yProps(1)}
            />
          </StyledTabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Pendingorg />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Tenentlist />
        </TabPanel>
      </Box>
    </>
  );
};

export default SuperAdmin;
