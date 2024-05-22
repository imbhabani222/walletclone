import React, { useEffect, useState } from "react";
import Tabledata from "@/src/component/tabledata/table";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { auditReport } from "@/src/redux/actionCreator/reportMethod";
import Auth from "../../config/auth";
import SearchAndFilter from "@/src/utils/searchAndFilter";
import moment from "moment";
import {
  Divider,
  Typography,
  Grid,
  InputAdornment,
  TextField,
  TablePagination,
} from "@mui/material";
import { DatePicker } from "antd";
import Styles from "./report.module.scss";
import SearchIcon from "@mui/icons-material/Search";

const { RangePicker } = DatePicker;

const AuditReports = ({ onSearch, getData, getFilteredData }) => {
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [filterObject, setFilterObject] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [apiInputPageNumber, setApiInputPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(50);

  const reducerData = useSelector(
    (state) => state.reportReducer || null,
    shallowEqual
  );
  useEffect(() => {
    getFilteredData(filterObject);
  }, [filterObject]);

  const {
    auditReport: { resultData, isLoading },
  } = reducerData;

  useEffect(() => {
    const payload = {
      params: `${
        Auth.getUserDetails().tenantId
      }/events?startdate=null&enddate=null&page=${apiInputPageNumber}&limit=${pageLimit}`,
    };
    dispatch(auditReport(payload));
  }, [apiInputPageNumber, pageLimit]);
  useEffect(() => {
    if (resultData) {
      const data = [...resultData?.logs];
      data?.forEach((element) => {
        (element.date = moment(element?.createdAt).format("DD/MM/YYYY")),
          (element.productName = element?.body?.productName),
          (element.user =
            typeof element.user === "string"
              ? element.user
              : JSON.stringify(element.user));
      });
      const sortedData = data.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTableData(sortedData);
    }
  }, [resultData]);

  useEffect(() => {
    if (tableData) {
      if (Auth.getRole() === "TenantAdmin") {
        const data = tableData?.map((item) => ({
          Date: item.date,
          "Org Id": item.OrgId,
          "Ip Address": item.IPAddress,
          User:
            typeof item.user === "string"
              ? item.user
              : JSON.stringify(item.user),
          Role: item.role,
          "Context Id": item.Contextid,
          Event: item.event,
          Type: item.type,
          URL: item.url,
        }));
        getData(data);
      } else {
        const data = tableData?.map((item) => ({
          Date: item.date,
          "Ip Address": item.IPAddress,
          User:
            typeof item.user === "string"
              ? item.user
              : JSON.stringify(item.user),
          Role: item.role,
          "Context Id": item.Contextid,
          Event: item.event,
          Type: item.type,
          URL: item.url,
        }));
        getData(data);
      }
      // const data= tableData?.map(item => {
      //     return {

      //     item.Org_Id = item.OrgId
      //     item.Ip_Address = item.IPAddress,
      //     item.User = item.user,
      //     item.Role = item.role,
      //     item.Context_Id = item.Contextid,
      //     item.Event = item.event,
      //     item.Type = item.type,
      //     item.URL = item.url,
      //     item.Details = item.details
      //     }
      // })
    }
  }, [tableData]);

  useEffect(() => {
    if (searchData?.length > 0) {
      const data = resultData?.logs?.map((item) => item);
      const searchObject = {
        searchByKeyword: searchData,
      };

      const result = SearchAndFilter(searchObject, data);
      setTableData([...result]);
    } else {
      if (resultData) {
        const data = [...resultData?.logs];
        setTableData([...data]);
      }
    }
  }, [searchData]);

  useEffect(() => {
    if (filterObject && Object.values(filterObject)?.length > 0) {
      const startDate = moment(filterObject.date?.[0]?.$d).format("YYYY-MM-DD");
      const endDate = moment(filterObject.date?.[1]?.$d).format("YYYY-MM-DD");
      const payload = {
        params: `${
          Auth.getUserDetails().tenantId
        }/events?startdate=${startDate}&enddate=${endDate}&page=${apiInputPageNumber}&limit=${pageLimit}`,
      };
      dispatch(auditReport(payload));
    }
  }, [filterObject]);
  const columns = [
    { key: "date", label: "Date" },
    { key: "OrgId", label: "Org Id" },
    { key: "IPAddress", label: "IP Address" },
    { key: "user", label: "User" },
    { key: "role", label: "Role" },
    { key: "Contextid", label: "Context Id" },
    { key: "event", label: "Event" },
    { key: "type", label: "Type" },
    { key: "url", label: "URL" },
    // { key: 'category', label: 'Request body' },
    // { key: 'details', label: 'Details' },
  ];
  const columnsOrg = [
    { key: "date", label: "Date" },
    { key: "IPAddress", label: "IP Address" },
    { key: "user", label: "User" },
    { key: "role", label: "Role" },
    { key: "Contextid", label: "Context Id" },
    { key: "event", label: "Event" },
    { key: "type", label: "Type" },
    { key: "url", label: "URL" },
    // { key: 'category', label: 'Request body' },
    // { key: 'details', label: 'Details' },
  ];
  const onSearchData = (data) => {
    const {
      target: { value },
    } = data;
    setSearchData(value);
    // onSearchDatas(value)
  };
  const onSelectDate = (data) => {
    setFilterObject({ ...filterObject, date: data });
  };
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
  };

  const handleChangePage = (pageCount, pageNum) => {
    const setPageNumberCondition =
      apiInputPageNumber <= pageNum
        ? setApiInputPageNumber(apiInputPageNumber + 1)
        : setApiInputPageNumber(apiInputPageNumber - 1);
    setPageNumber(pageNum);
  };

  const handleChangeRowsPerPage = (pageCount) => {
    const {
      target: { value },
    } = pageCount;
    setPageLimit(value);
    setApiInputPageNumber(1);
    setPageNumber(0);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
          <RangePicker
            size="small"
            format={"YYYY/MM/DD"}
            className={Styles.grid_column_item_date_picker_three}
            suffixIcon={null}
            onChange={onSelectDate}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <TextField
            size="small"
            hiddenLabel
            onChange={(event) => onSearchData(event)}
            placeholder="Search"
            className={Styles.search_options}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{
              style: {
                height: "1rem",
                backgroundColor: "#fcfcfc",
                // border: "1px solid #DDDDDD",
                borderRadius: "5px",
              },
            }}
          />
        </Grid>
        {/* <Divider sx={{ width: "100%", margin: "1.12rem 0 0.75rem" }} /> */}
        <Tabledata
          tableHeading={
            Auth?.getRole() === "TenantAdmin" ? columns : columnsOrg
          }
          load={isLoading}
          data={tableData}
          label="payment"
        />
        {resultData?.logs?.length > 0 && (
          <Grid item xs={12} sm={13} md={12} lg={12} xl={12}>
            <TablePagination
              sx={{
                ".MuiTablePagination-toolbar": {
                  minHeight: "20px",
                },
                ".MuiTablePagination-displayedRows": {
                  fontSize: "10px",
                },
                ".MuiTablePagination-select": {
                  fontSize: "10px",
                },
                ".MuiTablePagination-selectIcon": {
                  fontSize: "10px",
                },
                ".MuiTablePagination-selectLabel": {
                  fontSize: "10px",
                },
                ".MuiSvgIcon-root": {
                  fontSize: "10px",
                },
              }}
              rowsPerPageOptions={[50, 100, 200]}
              component="div"
              count={resultData?.totalCount}
              page={pageNumber}
              onPageChange={handleChangePage}
              rowsPerPage={pageLimit}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        )}
        {tableData?.length === 0 && !isLoading && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography className={Styles.No_Record_found}>
              No Records Found
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default AuditReports;
