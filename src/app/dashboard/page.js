"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import orgicon from "../../../public/DashboardImg/orgicon.svg";
import usericon from "../../../public/DashboardImg/usermngicon.svg";
import ALL_USER_CONSTANTS from "../../constant/userconstant";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, Link, Tooltip } from "@mui/material";
import styles from "./dashboard.module.scss";
import Image from "next/image";
import Auth from "../../config/auth";
import OrgList from "@/src/component/orgList";
import Userlist from "@/src/component/userList";
import ProList from "@/src/component/productList";
import { loginClear } from "@/src/redux/actionCreator/loginMethod";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const {
    DASHBOARD_PAGE: { ORGANIZATION, USER_MANAGEMENT },
  } = ALL_USER_CONSTANTS;

  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [product, setProduct] = useState(null);
  const [orgTable, setOrgTable] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Box className={styles.super_class}>
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
      height: "85px",
      color: "#2D2A30",
      background: "#fff",
      flex: "1 0 50%",

      "&.Mui-selected": {
        color: "#2D2A30",
        backgroundColor: "#EBF1FF",
        width: "100%",
        height: "85px",
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

  const onGetTableData = (data) => {
    setOrgTable(data);
  };
  return (
    <>
      <Box className={styles.super_container}>
        <Box className={styles.tabs_container}>
          <StyledTabs
            variant="fullWidth"
            className={styles.tab_box}
            value={value}
            onChange={handleChange}
            aria-label="Dashboard tabs"
          >
            <StyledTab
              className={styles.tab_box_child}
              icon={<Image alt="orgicon" {...orgicon} />}
              label={
                Auth.getRole() === "OrgAdmin" ? "Product List" : ORGANIZATION
              }
              {...a11yProps(0)}
            />

            <StyledTab
              className={styles.tab_box_child}
              icon={<Image alt="usericon" {...usericon} />}
              label={USER_MANAGEMENT}
              {...a11yProps(1)}
              disabled={!orgTable}
            />
          </StyledTabs>
        </Box>
        <TabPanel value={value} index={0}>
          <OrgList tabvalue={value} getTableData={onGetTableData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Userlist />
        </TabPanel>
      </Box>
    </>
  );
};

export default React.memo(Dashboard);
