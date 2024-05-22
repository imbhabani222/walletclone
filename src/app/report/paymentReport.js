import React, { useEffect, useState } from "react";
import Tabledata from "@/src/component/tabledata/table";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  InputAdornment,
  Divider,
} from "@mui/material";
import { DatePicker } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  paymentReport,
  paymentReportFilter,
  getCustomerList,
  clearCustomerList,
} from "@/src/redux/actionCreator/reportMethod";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import Auth from "../../config/auth";
import SearchAndFilter from "@/src/utils/searchAndFilter";
import ProductIcon from "../../../public/report/product_icon.svg";
import CustomerIcon from "../../../public/report/customer_icon.svg";
import CalendarIcon from "../../../public/report/calendar_icon.svg";
import Styles from "./report.module.scss";
import Image from "next/image";

const { RangePicker } = DatePicker;

const PaymentReports = ({ onSearch, getData }) => {
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const [searchData, setSearchData] = useState(null);

  const reducerData = useSelector(
    (state) => state.reportReducer || null,
    shallowEqual
  );
  const reducerData1 = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  const {
    paymentReport: { resultData },
    customerList: { resultData: customerDatas },
  } = reducerData;

  const {
    byRole: { resultData: byRoleData },
  } = reducerData1;

  useEffect(() => {
    const payload = {
      params: `product?filter=&productId=null&customerId=null&startdate=null&enddate=null&role=${Auth.getRole()}`,
      headers: {
        tenantid: Auth.getUserDetails()?.tenantId,
        orgid: Auth.getUserDetails()?.orgId,
      },
    };
    dispatch(paymentReport(payload));
    return () => {
      dispatch(clearCustomerList());
    };
  }, []);
  useEffect(() => {
    if (resultData) {
      const data = resultData?.data?.rows;
      data?.forEach((element) => {
        (element.created_date = moment(element?.created_date).format(
          "DD/MM/YYYY"
        )),
          (element.amount = formatter.format(element?.amount / 100));
        element.orgCutamount = formatter.format(element?.orgCutamount / 100);
        element.paymentCut = formatter.format(element?.paymentCut / 100);
        element.walletCutAmount = formatter.format(
          element?.walletCutAmount / 100
        );
      });
      data.sort(function (a, b) {
        return new Date(b.created_date) - new Date(a.created_date);
      });
      setTableData(data);
    }
  }, [resultData]);

  useEffect(() => {
    if (tableData) {
      if (Auth.getRole() === "TenantAdmin") {
        const data = tableData?.map((item) => ({
          Date: item.created_date,
          "Org Name": item.organisationName,
          "Customer Name": item.customerName,
          "Product Name": item.productName,
          "Payment Order ID": item.id,
          "Product Order ID": item.orderId,
          Amount: item.amount,
          "PG Amount": item.paymentCut,
          "Org Amount": item.orgCutamount,
        }));
        getData(data);
      } else if (Auth.getRole() === "SuperAdmin") {
        const data = tableData?.map((item) => ({
          Date: item.created_date,
          "Org Name": item.organisationName,
          "Customer Name": item.customerName,
          "Product Name": item.productName,
          "Payment Order ID": item.id,
          "Product Order ID": item.orderId,
          Amount: item.amount,
          "PG Amount": item.paymentCut,
          "Org Amount": item.orgCutamount,
          walletCutAmount: item.walletCutAmount,
        }));
        getData(data);
      } else {
        const data = tableData?.map((item) => ({
          Date: item.created_date,
          "Customer Name": item.customerName,
          "Product Name": item.productName,
          "Payment Order ID": item.id,
          "Product Order ID": item.orderId,
          Amount: item.amount,
          "PG Amount": item.paymentCut,
          "Org Amount": item.orgCutamount,
          walletCutAmount: item.walletCutAmount,
        }));
        getData(data);
      }
    }
  }, [tableData]);

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

  useEffect(() => {
    if (filterObject && Object.values(filterObject)?.length > 0) {
      const payload = {
        params: {
          customerId: filterObject?.customerName || null,
          startdate: moment(filterObject.date?.[0]?.$d).format("YYYY-MM-DD"),
          enddate: moment(filterObject.date?.[1]?.$d).format("YYYY-MM-DD"),
          productId: filterObject?.productName || null,
          role: Auth.getRole(),
        },
        headers: {
          tenantid: Auth.getUserDetails()?.tenantId,
          orgid: Auth.getUserDetails()?.orgId,
        },
      };
      dispatch(paymentReportFilter(payload));
      if (filterObject?.productName) {
        const payload = {
          params: `${filterObject?.productName}/getAllCustomersByProduct`,
        };
        dispatch(getCustomerList(payload));
      }
    }
  }, [filterObject]);

  const columns = [
    { key: "created_date", label: "Date" },
    { key: "organisationName", label: "Org  Name" },
    { key: "customerName", label: "Customer Name" },
    { key: "productName", label: "Product Name" },
    { key: "id", label: "Payment Order ID" },
    { key: "orderId", label: "Product Order ID" },
    { key: "amount", label: "Amount" },
    { key: "paymentCut", label: "PG Amount" },
    { key: "orgCutamount", label: "Org Amount" },
  ];
  const columnsOrg = [
    { key: "created_date", label: "Date" },
    { key: "customerName", label: "Customer Name" },
    { key: "productName", label: "Product Name" },
    { key: "id", label: "Payment Order ID" },
    { key: "orderId", label: "Product Order ID" },
    { key: "amount", label: "Amount" },
    { key: "paymentCut", label: "PG Amount" },
    { key: "orgCutamount", label: "Org Amount" },
  ];
  const columnsSuper = [
    { key: "created_date", label: "Date" },
    { key: "organisationName", label: "Org  Name" },
    { key: "customerName", label: "Customer Name" },
    { key: "productName", label: "Product Name" },
    { key: "id", label: "Payment Order ID" },
    { key: "orderId", label: "Product Order ID" },
    { key: "amount", label: "Amount" },
    { key: "paymentCut", label: "PG Amount" },
    { key: "orgCutamount", label: "Org Amount" },
    { key: "walletCutAmount", label: "Wallet Amount" },
  ];
  const onSelectProductName = (data) => {
    setFilterObject({ ...filterObject, productName: data.target.value });
  };
  const onSelectCustomerName = (data) => {
    setFilterObject({ ...filterObject, customerName: data.target.value });
  };
  const onSelectDate = (data) => {
    setFilterObject({ ...filterObject, date: data });
  };
  const onSearchData = (data) => {
    const {
      target: { value },
    } = data;
    setSearchData(value);
  };
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
          <FormControl size="small" className={Styles.grid_column_item_space}>
            <InputLabel id="demo-simple-select-label">
              {/* <Image alt="ProductIcon" {...ProductIcon} /> */}
              Product Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Product Name"
              value={filterObject?.productName}
              onChange={onSelectProductName}
            >
              {byRoleData?.data?.map(({ name, id }) => (
                <MenuItem key={id} value={id} className={Styles.selected_item}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
          <FormControl className={Styles.grid_column_item_space} size="small">
            <InputLabel id="demo-simple-select-label">
              {" "}
              {/* <Image alt="CustomerIcon" {...CustomerIcon} /> */}
              Customer Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Customer Name"
              value={filterObject?.customerName}
              onChange={onSelectCustomerName}
            >
              {customerDatas &&
                customerDatas?.data?.map(({ name, id }) => (
                  <MenuItem
                    key={id}
                    value={id}
                    className={Styles.selected_item}
                  >
                    {name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
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
            onChange={(event) => onSearchData(event)}
            placeholder="Search"
            onKeyDown={handleKeyDown}
            className={Styles.search_options}
            value={searchData}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{
              style: {
                height: "0.5rem",
                backgroundColor: "#fcfcfc",
                // border: "1px solid #DDDDDD",
                borderRadius: "5px",
              },
            }}
          />
        </Grid>
        <Divider sx={{ width: "100%", margin: "1.12rem 0 0.75rem" }} />
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Tabledata
            tableHeading={
              Auth?.getRole() === "TenantAdmin"
                ? columns
                : Auth?.getRole() === "SuperAdmin"
                ? columnsSuper
                : columnsOrg
            }
            data={tableData}
            label="payment"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default PaymentReports;
