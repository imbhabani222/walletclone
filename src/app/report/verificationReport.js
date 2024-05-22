import React, { useEffect, useState } from "react";
import Tabledata from "@/src/component/tabledata/table";
import Auth from "../../config/auth";
import Axios from "axios";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import {
  Divider,
  Typography,
  Grid,
  InputAdornment,
  TextField,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { DatePicker } from "antd";
import URL from "../../config/envURL";
import Styles from "./report.module.scss";
import SearchAndFilter from "@/src/utils/searchAndFilter";

const { RangePicker } = DatePicker;

const VerificationReports = ({ onSearch, getData, filter }) => {
  const [tableData, setTableData] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [filterObject, setFilterObject] = useState({});
  const [tableResponse, setTableResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [apiInputPageNumber, setApiInputPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(50);
  const [totalCounts, setTotalCount] = useState(0);

  const columns = [
    { key: "date", label: "Date" },
    { key: "name", label: "Verification Providers" },
    { key: "sumtotalcount", label: "No. of Attempts" },
    { key: "totalhitcount", label: "No. of Success" },
    { key: "totalfailurecount", label: "No. of Failures" },
  ];

  useEffect(() => {
    if (filterObject?.date) {
      getReportData();
    } else {
      getReportData("default");
    }
  }, [filterObject, apiInputPageNumber, pageLimit]);

  useEffect(() => {
    if (searchData?.length > 0) {
      const data = tableResponse;
      const searchObject = {
        searchByKeyword: searchData,
      };
      const result = SearchAndFilter(searchObject, data);
      setTableData([...result]);
    } else {
      const data = [...tableResponse];
      setTableData([...data]);
    }
  }, [searchData]);

  useEffect(() => {
    if (tableData) {
      const data = tableData?.map((item) => ({
        Date: item.date,
        "Verification Providers": item.name,
        "No. of Attempts": item.sumtotalcount,
        "No. of Success": item?.totalhitcount,
        "No. of Failures": item.totalfailurecount,
      }));
      getData(data);
    }
  }, [tableData]);

  const getReportData = async (flag) => {
    console.log(flag);
    setLoading(true);
    try {
      const response = await Axios({
        method: "get",
        url: flag
          ? `${URL.API.baseURL1}wallet/api/v1.0/fetchCountsAudit?startDate=null&endDate=null&page=${apiInputPageNumber}&limit=${pageLimit}`
          : `${
              URL.API.baseURL1
            }wallet/api/v1.0/fetchCountsAudit?startDate=${moment(
              filterObject.date?.[0]?.$d
            ).format("YYYY-MM-DD")}&endDate=${moment(
              filterObject.date?.[1]?.$d
            ).format(
              "YYYY-MM-DD"
            )}&page=${apiInputPageNumber}&limit=${pageLimit}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Auth.getAuthToken(),
        },
      });
      setLoading(false);
      setTotalCount(response?.data?.data?.count);
      response?.data?.data?.rows?.forEach((element) => {
        element.date = moment(element?.createdAt).format("DD/MM/YYYY");
      });
      const sortedData = response?.data?.data?.rows?.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTableResponse(sortedData);
      setTableData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };
  const onSearchData = (data) => {
    const {
      target: { value },
    } = data;
    setSearchData(value);
  };
  const onSelectDate = (data) => {
    setFilterObject({ date: data });
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
              borderRadius: "5px",
            },
          }}
        />
      </Grid>
      {/* <Divider sx={{ width: "100%", margin: "1.12rem 0 0.75rem" }} /> */}
      <Tabledata
        tableHeading={columns}
        data={tableData}
        label="payment"
        load={loading}
      />
      {tableData?.length > 0 && (
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
            count={totalCounts}
            page={pageNumber}
            onPageChange={handleChangePage}
            rowsPerPage={pageLimit}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      )}
      {tableData?.length === 0 && !loading && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography className={Styles.No_Record_found}>
            No Records Found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
export default VerificationReports;
