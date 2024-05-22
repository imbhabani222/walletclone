import React, { useEffect, useState } from "react";
import Tabledata from "@/src/component/tabledata/table";
import SearchIcon from "@mui/icons-material/Search";
import {
  Divider,
  Grid,
  Typography,
  InputAdornment,
  TextField,
  TablePagination,
} from "@mui/material";
import { DatePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Auth from "../../config/auth";
import { getPaymentProviderReport } from "@/src/redux/actionCreator/allOrgMethod";
import SearchAndFilter from "@/src/utils/searchAndFilter";
import Styles from "./report.module.scss";

const { RangePicker } = DatePicker;

const PgStatusReports = ({ onSearch, getData, filter }) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [filterObject, setFilterObject] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [apiInputPageNumber, setApiInputPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(50);

  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  const {
    getPaymentProviderReport: { resultData, isLoading },
  } = reducerData;

  useEffect(() => {
    const payload = {
      params: `?startdate=null&enddate=null&page=${apiInputPageNumber}&limit=${pageLimit}`,
    };

    dispatch(getPaymentProviderReport(payload));
  }, [apiInputPageNumber, pageLimit]);
  useEffect(() => {
    if (resultData) {
      const data = resultData?.data?.rows;
      console.log(data);
      data?.forEach((element) => {
        element.date = moment(element?.createddate).format("DD/MM/YYYY");
      });
      const sortedData = data?.sort(function (a, b) {
        return new Date(b.createddate) - new Date(a.createddate);
      });
      setTableData(sortedData);
    }
  }, [resultData]);

  useEffect(() => {
    if (filterObject && Object.values(filterObject)?.length > 0) {
      const startDate = moment(filterObject.date?.[0]?.$d).format("YYYY-MM-DD");
      const endDate = moment(filterObject.date?.[1]?.$d).format("YYYY-MM-DD");
      const payload = {
        params: `?startdate=${startDate}&enddate=${endDate}&page=${apiInputPageNumber}&limit=${pageLimit}`,
      };
      dispatch(getPaymentProviderReport(payload));
    }
  }, [filterObject]);

  useEffect(() => {
    if (tableData) {
      const data = tableData?.map((item) => ({
        Date: item.date,
        "Payment Provider": item.providername,
        "No. of Attempts": item.sumtotalcount,
        "No. of Successes": item?.totalhitcount,
        "No. of Failures": item.totalfailurecount,
      }));
      getData(data);
    }
  }, [tableData]);

  const columns = [
    { key: "date", label: "Date" },
    { key: "providername", label: "Payment Provider" },
    { key: "sumtotalcount", label: "No. of Attempts" },
    { key: "totalhitcount", label: "No. of Successes" },
    { key: "totalfailurecount", label: "No. of Failures" },
  ];
  const onSearchData = (data) => {
    const {
      target: { value },
    } = data;
    setSearchData(value);
  };
  const onSelectDate = (data) => {
    setFilterObject({ date: data });
  };

  useEffect(() => {
    if (searchData?.length > 0) {
      const data = resultData?.data?.rows?.map((item) => item);
      const searchObject = {
        searchByKeyword: searchData,
      };
      const result = SearchAndFilter(searchObject, data);
      setTableData([...result]);
    } else {
      if (resultData) {
        const data = [...resultData?.data?.rows];
        setTableData([...data]);
      }
    }
  }, [searchData]);
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
                borderRadius: "5px",
              },
            }}
          />
        </Grid>
        {/* <Divider sx={{ width: "100%", margin: "1.12rem 0 0.75rem" }} /> */}
        <Tabledata
          tableHeading={columns}
          data={tableData}
          load={isLoading}
          label="payment"
        />
        {console.log(resultData?.data)}
        {resultData?.data?.rows?.length > 0 && (
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
              count={resultData?.data?.count}
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
export default PgStatusReports;
