"use client";
import React, { useState, useEffect } from "react";
import { Grid, Box, Tabs, Tab } from "@mui/material";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Styles from "../report/report.module.scss";
import { styled } from "@mui/material/styles";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { byRole } from "@/src/redux/actionCreator/allOrgMethod";
import Auth from "../../config/auth";
import Sales from "./sales";
import Finance from "./finance";
import FinanceSettlement from "./financeSettlement";
import FinanceReport from "./financeReport";
import PanVerification from "./panVerification";

const Salesregister = () => {
  const [tabValue, setTabValue] = useState("one");
  const [searchData, setSearchData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const dispatch = useDispatch();
  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  const reducerData1 = useSelector(
    (state) => state.reportReducer || null,
    shallowEqual
  );
  const {
    customerList: { resultData },
  } = reducerData1;
  const {
    byRole: { resultData: byRoleData },
  } = reducerData;

  useEffect(() => {
    const payloadUser = {
      headers: {
        tenantid: Auth.getUserDetails().tenantId,
        orgid: Auth.getUserDetails().orgId,
        resourceid: Auth.getUserDetails()?.resourceId,
      },
    };
    dispatch(byRole(payloadUser));
  }, []);

  const tabChange = (value, data) => {
    setTabValue(data);
    setSearchData(null);
    setFilterObject(null);
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
      borderRadius: "3px",
      background:
        "linear-gradient(313deg, rgba(45, 201, 229, 0.90) 0%, rgba(55, 85, 229, 0.90) 53.94%, rgba(110, 63, 248, 0.90) 93.54%)",
      height: "4px",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 10,
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

      "&.Mui-selected": {
        color: "#2D2A30",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#EBF1FF",
      },
    })
  );
  const onSearchData = (data) => {
    const {
      target: { value },
    } = data;
    setSearchData(value);
    // onSearchDatas(value)
  };
  const downloadXL = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "Report" + fileExtension);
  };
  const onGetData = (data) => {
    setTableData(data);
  };
  const onSelectProductName = (data) => {
    setFilterObject({ ...filterObject, productName: data.target.value });
  };
  const onSelectCustomerName = (data) => {
    setFilterObject({ ...filterObject, customerName: data.target.value });
  };
  const onSelectDate = (data) => {
    setFilterObject({ ...filterObject, date: data });
  };
  return (
    <Grid
      className={Styles.report_layout}
      style={{ height: "calc(100vh-200px)", overflow: "auto" }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <StyledTabs onChange={tabChange} value={tabValue}>
          <StyledTab value="one" className={Styles.tab_title} label="Sales" />
          <StyledTab value="two" className={Styles.tab_title} label="Invoice" />
          {/* <StyledTab
            value="three"
            className={Styles.tab_title}
            label="Finance Settlement"
          /> */}
          <StyledTab
            value="three"
            className={Styles.tab_title}
            label="Transaction Report"
          />
          <StyledTab
            value="four"
            className={Styles.tab_title}
            label="Pan-Aadhar Link"
          />
        </StyledTabs>
      </Box>
      {tabValue === "one" ? (
        <Sales
          onSearch={searchData}
          getData={onGetData}
          filter={filterObject}
        />
      ) : tabValue === "two" ? (
        <Finance
          onSearch={searchData}
          getData={onGetData}
          filter={filterObject}
        />
      ) : tabValue === "three" ? (
        <FinanceReport
          onSearch={searchData}
          getData={onGetData}
          filter={filterObject}
        />
      ) : (
        <PanVerification
          onSearch={searchData}
          getData={onGetData}
          filter={filterObject}
        />
      )}
    </Grid>
  );
};
export default Salesregister;

{
  /* <FinanceSettlement
          onSearch={searchData}
          getData={onGetData}
          filter={filterObject}
        /> */
}
