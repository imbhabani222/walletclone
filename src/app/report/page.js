"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Tabs,
  TextField,
  Tab,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Button,
  TabContext,
  useMediaQuery,
} from "@mui/material";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Styles from "./report.module.scss";
import { styled } from "@mui/material/styles";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { byRole } from "@/src/redux/actionCreator/allOrgMethod";
import Auth from "../../config/auth";
import DownloadIcon from "../../../public/report/download_icon.svg";
import ProductIcon from "../../../public/report/product_icon.svg";
import CustomerIcon from "../../../public/report/customer_icon.svg";
import CalendarIcon from "../../../public/report/calendar_icon.svg";
import Image from "next/image";
import PaymentReports from "./paymentReport";
import AuditReports from "./auditReport";
import SettlementReports from "./settlementReport";
import moment from "moment";
import {
  getCustomerList,
  settlementReport,
} from "@/src/redux/actionCreator/reportMethod";
import { DatePicker } from "antd";
import PgStatusReports from "./pgStatusReport";
import VerificationReports from "./verificationReport";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";
const { RangePicker } = DatePicker;

const Reports = () => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
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
    settlementReport: { resultData: settlementData },
    customerList: { resultData },
  } = reducerData1;
  const {
    byRole: { resultData: byRoleData },
  } = reducerData;

  const getFilteredData = (e) => {
    setFilterObject(e);
  };
  useEffect(() => {
    const payloadUser = {
      headers: {
        tenantid: Auth.getUserDetails().tenantId,
        orgid: Auth.getUserDetails().orgId,
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
  useEffect(() => {
    if (filterObject?.customerName && tabValue === "one") {
      const payload = {
        params: `role=${Auth.getRole()}&startdate=${moment(
          filterObject.date?.[0]?.$d
        ).format("YYYY-MM-DD")}&enddate=${moment(
          filterObject.date?.[1]?.$d
        ).format("YYYY-MM-DD")}`,
        headers: {
          orgid: Auth.getUserDetails().orgId,
          tenantid: Auth.getUserDetails().tenantId,
        },
        body: {
          payload: {
            customerId: filterObject.customerName,
            productId: filterObject.productName,
          },
        },
      };
      dispatch(settlementReport(payload));
    }
  }, [
    filterObject?.customerName,
    filterObject?.date,
    filterObject?.productName,
  ]);

  const downloadXL = () => {
    if (settlementData?.orders?.rows?.length > 0) {
      const ws = XLSX.utils.json_to_sheet(
        tabValue === "one" ? settlementData?.orders?.rows : tableData
      );
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "Report" + fileExtension);
    }
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
    <Grid container className={Styles.report_layout}>
      <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          {Auth.getRole() !== "SuperAdmin" ? (
            <StyledTabs onChange={tabChange} value={tabValue}>
              <StyledTab
                value="one"
                className={Styles.tab_title}
                label="Transactions"
              />

              <StyledTab
                value="two"
                className={Styles.tab_title}
                label="Audits"
              />
              <StyledTab
                value="three"
                className={Styles.tab_title}
                label="PG Status"
              />
              <StyledTab
                value="four"
                className={Styles.tab_title}
                label="KYC Providers status"
              />
            </StyledTabs>
          ) : (
            <StyledTabs onChange={tabChange} value={tabValue}>
              <StyledTab
                value="one"
                className={Styles.tab_title}
                label="Payment Gateway Reports"
              />
            </StyledTabs>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
        {tabValue === "one" || tabValue === "two" ? (
          <Button
            className={
              !filterObject?.date
                ? Styles.download_btn_dis
                : Styles.download_btn
            }
            disabled={
              tabValue === "one"
                ? !filterObject?.customerName ||
                  !filterObject?.date ||
                  !filterObject?.productName
                : !filterObject?.date
            }
            onClick={() => downloadXL()}
          >
            {" "}
            <Image src={DownloadIcon} className={Styles.downloadIcon} />{" "}
            Download{" "}
          </Button>
        ) : null}

        {!isSmallScreen && (
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            style={{ marginTop: "48px" }}
          />
        )}
      </Grid>

      {tabValue === "three" && <></>}
      {Auth.getRole() !== "SuperAdmin" ? (
        <>
          {tabValue === "one" ? (
            <SettlementReports
              onSearch={searchData}
              getData={onGetData}
              filter={filterObject}
              getFilteredData={getFilteredData}
            />
          ) : tabValue === "two" ? (
            <AuditReports
              onSearch={searchData}
              getData={onGetData}
              filter={filterObject}
              getFilteredData={getFilteredData}
            />
          ) : tabValue === "three" ? (
            <PgStatusReports
              onSearch={searchData}
              getData={onGetData}
              filter={filterObject}
            />
          ) : (
            <VerificationReports
              onSearch={searchData}
              getData={onGetData}
              filter={filterObject}
            />
          )}
        </>
      ) : (
        <PaymentReports
          onSearch={searchData}
          getData={onGetData}
          filter={filterObject}
        />
      )}
    </Grid>
  );
};
export default Reports;
