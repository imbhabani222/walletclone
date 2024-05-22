import React, { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import debounce from "lodash/debounce";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { getTransactionReport } from "../../redux/actionCreator/invoiceMethod";
import Auth from "../../config/auth";
import {
  Divider,
  Grid,
  Box,
  Typography,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import Styles from "./salesregister.module.scss";
import SearchAndFilter from "@/src/utils/searchAndFilter";

const { RangePicker } = DatePicker;

const FinanceReport = () => {
  const dispatch = useDispatch();
  const [selectDate, setSelectDate] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  const [filterObject, setFilterObject] = useState({});
  const [apiInputPageNumber, setApiInputPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(50);
  const [pageNumber, setPageNumber] = useState(0);
  // const [searchData, setSearchData] = useState(null);
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

  const reducerInvoiceData = useSelector(
    (state) => state?.invoiceReducer || null,
    shallowEqual
  );

  const disabledDate = (current) => {
    return current && current > Date.now();
  };

  useEffect(() => {
    if (selectDate !== null) {
      const payload = {
        params: `startDate=${new Date(
          selectDate?.[0]?.$d
        )?.toUTCString()}&endDate=${new Date(
          selectDate?.[1]?.$d
        )?.toUTCString()}&page=${apiInputPageNumber}&limit=${pageLimit}`,
        headers: {
          orgid: Auth.getUserDetails().orgId,
          tenantid: Auth.getUserDetails().tenantId,
        },
        body: {
          payload: {},
        },
      };
      dispatch(getTransactionReport(payload));
    }
  }, [apiInputPageNumber, pageLimit, selectDate]);

  const {
    getTransactionReportData: { resultData: trasactionData, isLoading },
  } = reducerInvoiceData;
  // console.log(reducerInvoiceData);

  const columns = [
    {
      field: "bankRRN",
      headerName: "Bank Ref No",
      width: 250,
      disableColumnMenu: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "customerId",
      headerName: "Customer ID",
      width: 250,
      disableColumnMenu: true,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "payerAmount",
      headerName: "Total Amount Paid",
      disableColumnMenu: true,
      width: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "txnCompletionDate",
      headerName: "Transaction Date",
      width: 300,
      disableColumnMenu: true,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params?.row?.txnCompletionDate !== null
          ? moment(params?.row?.txnCompletionDate).format("DD/MM/YYYY")
          : "-",
    },

    {
      field: "txnStatus",
      headerName: "Transaction Status",
      width: 350,
      disableColumnMenu: true,
      headerClassName: "super-app-theme--header",
    },
  ];
  const formatApiResponse = (data) => {
    data?.forEach((element) => {
      element.productsData = element?.products
        ?.toString()
        .replaceAll(",", ", ");
    });
  };

  // const onSearchData = (event) => {
  //   const {
  //     target: { value },
  //   } = event;

  //   if (value?.length > 0) {
  //     const searchObject = {
  //       searchByKeyword: value,
  //     };
  //     const result = SearchAndFilter(searchObject, trasactionData?.data);

  //     formatApiResponse(result);
  //     const payload = {
  //       params: `customerId=${value}`,
  //       headers: {
  //         orgid: Auth.getUserDetails().orgId,
  //         tenantid: Auth.getUserDetails().tenantId,
  //       },
  //       body: {
  //         payload: {},
  //       },
  //     };
  //     dispatch(getTransactionReport(payload));
  //   } else {
  //     const payload = {
  //       params: `startDate=${new Date(
  //         selectDate?.[0]?.$d
  //       )?.toUTCString()}&endDate=${new Date(
  //         selectDate?.[1]?.$d
  //       )?.toUTCString()}&page=${apiInputPageNumber}&limit=${pageLimit}`,
  //       headers: {
  //         orgid: Auth.getUserDetails().orgId,
  //         tenantid: Auth.getUserDetails().tenantId,
  //       },
  //       body: {
  //         payload: {},
  //       },
  //     };
  //     dispatch(getTransactionReport(payload));
  //   }
  // };
  const handleSearch = (query) => {
    console.log(query);
    if (query && query?.length > 0) {
      const payload = {
        params: `customerId=${query}`,
        headers: {
          orgid: Auth.getUserDetails().orgId,
          tenantid: Auth.getUserDetails().tenantId,
        },
        body: {
          payload: {},
        },
      };
      dispatch(getTransactionReport(payload));
    } else {
      const payload = {
        params: `startDate=${new Date(
          selectDate?.[0]?.$d
        )?.toUTCString()}&endDate=${new Date(
          selectDate?.[1]?.$d
        )?.toUTCString()}&page=${apiInputPageNumber}&limit=${pageLimit}`,
        headers: {
          orgid: Auth.getUserDetails().orgId,
          tenantid: Auth.getUserDetails().tenantId,
        },
        body: {
          payload: {},
        },
      };
      dispatch(getTransactionReport(payload));

      if (resultData) {
        const data = [...resultData?.orders?.rows];
        setTableData([...data]);
      }
    }
  };
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);
  const onSelectDate = (data) => {
    setSelectDate(data);
    setFilterObject({ ...filterObject, date: data });
    if (data !== null) {
      const payload = {
        params: `startDate=${new Date(
          selectDate?.[0]?.$d
        )?.toUTCString()}&endDate=${new Date(
          selectDate?.[1]?.$d
        )?.toUTCString()}&page=${apiInputPageNumber}&limit=${pageLimit}`,
        headers: {
          orgid: Auth.getUserDetails().orgId,
          tenantid: Auth.getUserDetails().tenantId,
        },
        body: {
          payload: {},
        },
      };
      dispatch(getTransactionReport(payload));
    } else {
      console.log("select a valid date");
    }
  };

  const CustomHeader = ({ column }) => {
    return <div>{column.headerName}</div>;
  };
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
  };
  return (
    <Grid container className={Styles.transaction_report_container}>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <RangePicker
          size="small"
          defaultValue={[
            dayjs(dayjs().startOf("month"), "YYYY/MM/DD"),
            dayjs(dayjs().endOf("month"), "YYYY/MM/DD"),
          ]}
          format={"YYYY/MM/DD"}
          className={Styles.report_date_picker_three}
          suffixIcon={null}
          def
          onChange={(e) => onSelectDate(e)}
          disabledDate={disabledDate}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}></Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={4}
        xl={4}
        // style={{ marginRight: "1rem" }}
      >
        <TextField
          hiddenLabel
          size="small"
          // onChange={(event) => onSearchData(event)}
          onChange={(e) => debouncedHandleSearch(e.target.value)}
          placeholder="Search"
          // value={searchData}
          onKeyDown={handleKeyDown}
          className={Styles.search_options}
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

      {trasactionData?.data.length > 0 && (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            margin: "1.12rem 0 0rem",
            height: "calc(100vh - 210px)",
            width: " calc(100vw - 170px)",
          }}
        >
          {" "}
          <DataGrid
            rowHeight={35}
            sx={{
              "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                {
                  display: "none",
                },
              "& .MuiDataGrid-columnHeaders": {
                minHeight: "32px !important",
                maxHeight: "32px !important",
                lineHeight: "32px !important",
              },
              // disable cell selection style
              ".MuiDataGrid-cell:focus": {
                outline: "none",
              },
              // pointer cursor on ALL rows
              "& .MuiDataGrid-row:hover": {
                cursor: "pointer",
              },
              "& .super-app-theme--header": {
                background: "#EAECF0",
                color: "#5A6273",
              },
            }}
            hideFooter={true}
            // getRowId={(row) => row?.invoiceNo || 0}
            rows={trasactionData?.data}
            columns={columns.map((column) => ({
              ...column,
              headerRender: (props) => <CustomHeader {...props} />,
              sortable: false,
              filterable: false,
            }))}
          />
        </Grid>
      )}
      {trasactionData?.data.length > 0 && (
        <Grid
          item
          xs={12}
          sm={13}
          md={12}
          lg={12}
          xl={12}
          style={{ paddingTop: "0" }}
        >
          <TablePagination
            sx={{
              ".MuiTablePagination-toolbar": {
                minHeight: "20px",
                backgroundColor: "#574d4d0a",
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
            count={trasactionData?.count}
            page={pageNumber}
            onPageChange={handleChangePage}
            rowsPerPage={pageLimit}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      )}

      {trasactionData === null && !isLoading && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography className={Styles.No_Record_found}>
            Transaction report not available
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
export default FinanceReport;
