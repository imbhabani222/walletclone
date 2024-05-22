import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import Tabledata from "@/src/component/tabledata/table";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  settlementReport,
  getCustomerList,
  getSearchList,
  clearCustomerList,
  clearSearchList,
} from "@/src/redux/actionCreator/reportMethod";
import moment from "moment";
import Auth from "../../config/auth";
import SearchAndFilter from "@/src/utils/searchAndFilter";
import {
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
  InputAdornment,
  Divider,
  TablePagination,
} from "@mui/material";
import { DatePicker, Select, Typography } from "antd";
import Styles from "./report.module.scss";
import SearchIcon from "@mui/icons-material/Search";

const { RangePicker } = DatePicker;

const SettlementReports = ({ onSearch, getData, getFilteredData }) => {
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const [searchData, setSearchData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [apiInputPageNumber, setApiInputPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(50);

  const reducerData = useSelector(
    (state) => state.reportReducer || null,
    shallowEqual
  );
  const reducerData1 = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  useEffect(() => {
    getFilteredData(filterObject);
  }, [filterObject]);
  const {
    settlementReport: { resultData, isLoading },
    customerList: { resultData: customerDatas },
    searchReportList: { resultData: reportSearchData },
  } = reducerData;

  const {
    byRole: { resultData: byRoleData },
  } = reducerData1;
  useEffect(() => {
    const payload = {
      params: `role=${Auth.getRole()}&startdate=${moment(
        filterObject.date?.[0]?.$d
      ).format("YYYY-MM-DD")}&enddate=${moment(
        filterObject.date?.[1]?.$d
      ).format("YYYY-MM-DD")}&page=${apiInputPageNumber}&limit=${pageLimit}`,
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
    return () => {
      dispatch(clearCustomerList());
    };
  }, [apiInputPageNumber, pageLimit]);

  // useEffect(() => {
  //   if (searchData && searchData?.length > 0) {
  //     const payload = {
  //       params: `productOrderId=${searchData}`,
  //       headers: {
  //         orgid: Auth.getUserDetails().orgId,
  //         tenantid: Auth.getUserDetails().tenantId,
  //       },
  //       body: {
  //         payload: {},
  //       },
  //     };
  //     dispatch(getSearchList(payload));
  //   } else {
  //     if (resultData) {
  //       const data = [...resultData?.orders?.rows];
  //       setTableData([...data]);
  //     }
  //   }
  // }, [searchData]);

  useEffect(() => {
    if (reportSearchData) {
      const data = [...reportSearchData?.data?.rows];
      data?.forEach((element) => {
        (element.date = moment(element?.createdAt).format("DD/MM/YYYY")),
          (element.totalAmount =
            element?.orderType === "subscription"
              ? element.walletDebitAmountInPaise
              : element?.orderType === "walletrecharge"
              ? element.walletCreditAmountInPaise
              : element.totalSalesAmountInPaise);
      });
      setTableData([...data]);
      // const { data } = reportSearchData;
      // setTableData([data]);
    }
  }, [reportSearchData]);

  useEffect(() => {
    if (resultData) {
      const data = [...resultData?.orders?.rows];
      data?.forEach((element) => {
        (element.date = moment(element?.createdAt).format("DD/MM/YYYY")),
          (element.totalAmount =
            element?.orderType === "subscription"
              ? element.walletDebitAmountInPaise
              : element?.orderType === "walletrecharge"
              ? element.walletCreditAmountInPaise
              : element.totalSalesAmountInPaise);
      });
      const sortedData = data.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTableData(sortedData);
    }
  }, [resultData]);

  useEffect(() => {
    if (tableData?.length > 0) {
      if (Auth.getRole() === "TenantAdmin") {
        const data = [...tableData]?.map((item) => ({
          Date: item.date,
          "Organization Name": item.orgName,
          "Product Name": item.productName,
          "Customer Name": item.customerName,
          "Payment Transaction ID": item.paymentTxnId,
          "Payment Order ID": item.paymentOrderId,
          "Product Order ID": item.productOrderId,
          "Wallet Order Number": item?.walletOrderId,
          Amount: item.totalAmount,
          Journals: JSON.stringify(item.journals),
        }));
        getData(data);
      } else {
        const data = [...tableData]?.map((item) => ({
          Date: item.date,
          "Product Name": item.productName,
          "Customer Name": item.customerName,
          "Payment Transaction ID": item.paymentTxnId,
          "Payment Order ID": item.paymentOrderId,
          "Product Order ID": item.productOrderId,
          "Wallet Order Number": item?.walletOrderId,
          Amount: item.totalAmount,
          Journals: JSON.stringify(item.journals),
        }));
        getData(data);
      }
    }
  }, [tableData]);

  useEffect(() => {
    if (filterObject && Object.values(filterObject)?.length > 0) {
      const payload = {
        params: `role=${Auth.getRole()}&startdate=${moment(
          filterObject.date?.[0]?.$d
        ).format("YYYY-MM-DD")}&enddate=${moment(
          filterObject.date?.[1]?.$d
        ).format("YYYY-MM-DD")}&page=${apiInputPageNumber}&limit=${pageLimit}`,
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
      if (filterObject?.productName) {
        const payload = {
          params: `${filterObject?.productName}/getAllCustomersByProduct`,
        };
        dispatch(getCustomerList(payload));
      }
      dispatch(settlementReport(payload));
    }
  }, [filterObject]);

  // useEffect(() => {
  //   if (searchData?.length > 0) {
  //     const data = resultData?.orders.rows?.map((item) => item);
  //     const searchObject = {
  //       searchByKeyword: searchData,
  //     };

  //     const result = SearchAndFilter(searchObject, data);
  //     setTableData([...result]);
  //   } else {
  //     if (resultData) {
  //       const data = [...resultData?.orders?.rows];
  //       setTableData([...data]);
  //     }
  //   }
  // }, [searchData]);
  // const amountWithGstInPai = tableData?.amountWithGstInPaise;
  // console.log(amountWithGstInPai);
  const columns = [
    { key: "date", label: "Date" },
    // { key: "orgName", label: "Organization Name" },
    { key: "productName", label: "Product Name" },
    { key: "customerName", label: "Customer Name" },
    { key: "paymentprovider", label: "Payment Provider" },
    // { key: "paymentTxnId", label: "Payment Transaction ID" },
    { key: "paymentTxnId", label: "Payment Transaction ID" },
    { key: "productOrderId", label: "Product Order ID" },
    { key: "walletOrderId", label: "Wallet Order Number" },
    {
      key: "amountWithGstInPaise",
      label: "Amount with GST(Rs.)",
    },
    { key: "amountWithoutGstInPaise", label: "Amount without GST(Rs.)" },
  ];

  const columnsOrg = [
    { key: "date", label: "Date" },
    { key: "productName", label: "Product Name" },
    { key: "customerName", label: "Customer Name" },
    { key: "paymentprovider", label: "Payment Provider" },
    // { key: "paymentTxnId", label: "Payment Transaction ID" },
    { key: "paymentTxnId", label: "Payment Transaction ID" },
    { key: "productOrderId", label: "Product Order ID" },
    { key: "walletOrderId", label: "Wallet Order Number" },
    {
      key: "amountWithGstInPaise",
      label: "Amount with GST(Rs.)",
    },
    { key: "amountWithoutGstInPaise", label: "Amount without GST(Rs.)" },
  ];
  const dataWithTotalCal = tableData.map((row) => ({
    ...row,
    amountWithGstInPaise: row?.amountWithGstInPaise / 100,
    amountWithoutGstInPaise: row?.amountWithoutGstInPaise / 100,
  }));
  const onSelectProductName = (data) => {
    setFilterObject({ ...filterObject, productName: data });
  };
  const onSelectCustomerName = (data) => {
    setFilterObject({ ...filterObject, customerName: data });
  };
  const onSelectDate = (data) => {
    setFilterObject({ ...filterObject, date: data });
  };
  const handleSearch = (query) => {
    if (query && query?.length > 0) {
      const payload = {
        params: `productOrderId=${query}`,
        headers: {
          orgid: Auth.getUserDetails().orgId,
          tenantid: Auth.getUserDetails().tenantId,
        },
        body: {
          payload: {},
        },
      };
      dispatch(getSearchList(payload));
    } else {
      if (resultData) {
        const data = [...resultData?.orders?.rows];
        setTableData([...data]);
      }
    }
  };
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);
  // const onSearchData = (data) => {
  //   const {
  //     target: { value },
  //   } = data;
  //   setSearchData(value);
  // };
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
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
      <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
        <Select
          showSearch
          placeholder="Product Name"
          filterOption={(input, option) =>
            (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
          }
          allowClear
          value={filterObject?.productName}
          onChange={onSelectProductName}
          className={Styles.grid_column_item_space}
        >
          {byRoleData?.data?.map(({ name, productid }) => (
            <Select.Option
              key={productid}
              value={productid}
              className={Styles.selected_item}
            >
              {name}
            </Select.Option>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
        <Select
          size="small"
          showSearch
          placeholder="Customer Name"
          filterOption={(input, option) =>
            (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
          }
          allowClear
          value={filterObject?.customerName}
          onChange={onSelectCustomerName}
          className={Styles.grid_column_item_space}
        >
          {customerDatas &&
            customerDatas?.data?.map(({ name, customerid }) => (
              <Select.Option
                key={customerid}
                value={customerid}
                className={Styles.selected_item}
              >
                {name}
              </Select.Option>
            ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
        <RangePicker
          size="small"
          format={"DD/MM/YYYY"}
          className={Styles.grid_column_item_date_picker}
          suffixIcon={null}
          def
          onChange={onSelectDate}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
        <TextField
          fullWidth
          hiddenLabel
          size="small"
          // onChange={onSearchData}
          onChange={(e) => debouncedHandleSearch(e.target.value)}
          placeholder="Search by Product Order ID"
          // onKeyDown={handleKeyDown}
          className={Styles.search_options}
          // value={searchData}
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
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Tabledata
          load={isLoading}
          tableHeading={
            Auth?.getRole() === "TenantAdmin" ? columns : columnsOrg
          }
          data={dataWithTotalCal}
        />
        {/* </Grid> */}
      </Grid>
      {resultData?.orders?.rows?.length > 0 && (
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
            className={Styles.table_pagination}
            rowsPerPageOptions={[50, 100, 200]}
            component="div"
            count={resultData?.orders?.count}
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
  );
};
export default SettlementReports;
