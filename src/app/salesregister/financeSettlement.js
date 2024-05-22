import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";
import Image from "next/image";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "antd";
import crossIcon from "../../../public/report/cross_icon.svg";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import filterIcon from "../../../public/MasterLayoutImg/filterlines.svg";
import editicon from "../../../public/report/edit_icon.svg";
import tick_icon from "../../../public/report/tick.svg";
import cross_icon from "../../../public/report/redcross.svg";
import {
  getSettlementReport,
  updateSettlement,
} from "../../redux/actionCreator/invoiceMethod";
import { allOrg } from "../../redux/actionCreator/allOrgMethod";
import {
  getCustomerList,
  clearCustomerList,
} from "@/src/redux/actionCreator/reportMethod";
import Auth from "../../config/auth";
import {
  Divider,
  Grid,
  Button,
  Stack,
  Box,
  Modal,
  Backdrop,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  Typography,
  TablePagination,
  TextField,

  // TableRow,
  // TableCell,
} from "@mui/material";

import Styles from "./salesregister.module.scss";

const { RangePicker } = DatePicker;

const FinanceSettlement = () => {
  const dispatch = useDispatch();
  const reducerInvoiceData = useSelector(
    (state) => state?.invoiceReducer || null,
    shallowEqual
  );
  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  const reducerCusData = useSelector(
    (state) => state.reportReducer || null,
    shallowEqual
  );
  const {
    allOrg: { resultData: orgData },
    byRole: { resultData: byRoleData },
  } = reducerData;

  const {
    getSettlementReportData: { resultData: settlementData, isLoading },
  } = reducerInvoiceData;
  const {
    customerList: { resultData: customerDatas },
  } = reducerCusData;
  // console.log(customerDatas);

  const [modalOpen, setModalOpen] = useState(false);
  const [editWaiveoff, setEditWaiveoff] = useState(false);
  const [editTextMenu, setEditTextMenu] = useState(false);
  const [editMenu, setEditMenu] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputRemarkText, setInputRemarkText] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [selectDate, setSelectDate] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  const [filterObject, setFilterObject] = useState({});
  const [apiInputPageNumber, setApiInputPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(50);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [rows, setRows] = useState(settlementData?.data || []);
  const [selectionModel, setSelectionModel] = useState([]);
  // const [rowInvoiceNo, setRowInvoiceNo] = useState("");
  useEffect(() => {
    const payload = {
      headers: {
        orgid: Auth.getUserDetails()?.orgId,
        tenantid: Auth.getUserDetails()?.tenantId,
      },
    };
    dispatch(allOrg(payload));
  }, []);

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

  const handleInputChange = (event, id) => {
    // setValue("waivedOffAmount", event?.target?.value);
    // console.log(rowInvoiceNo[0], id, event?.target?.value);
    setValue(`waivedOffAmount-${id}`, event.target.value);

    // if (rowInvoiceNo[0] === id) {
    setInputText(event?.target?.value);
    // }
    const updatedRows = settlementData?.data?.map((row) =>
      row?.invoiceNo === id
        ? { ...row, waivedOffAmount: event.target.value }
        : row
    );
    setRows(updatedRows);
  };
  const handleKeyPress = (event, data) => {
    console.log(event, data, rows);
    if (event.key === "Enter") {
      const payload = {
        body: {
          invoiceNo: data?.row?.invoiceNo,
          customerId: data?.row?.customerId,
          waivedOffAmount: inputText,
          waivedOffRemarks: inputRemarkText,
        },
      };
      console.log(payload);
      dispatch(updateSettlement(payload));
      setEditMenu(false);
      setEditWaiveoff(false);
      setEditTextMenu(false);
      const payloadGet = {
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
      dispatch(getSettlementReport(payloadGet));
    }
  };
  const handelRowStatus = (e, data) => {
    console.log(inputStatus);
    const payload = {
      body: {
        invoiceNo: data?.row?.invoiceNo,
        customerId: data?.row?.customerId,
        status: inputStatus,
      },
    };
    console.log(payload);
    dispatch(updateSettlement(payload));
    const payloadGet = {
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
    dispatch(getSettlementReport(payloadGet));
  };
  const handleInputRemarkChange = (event, id) => {
    // setValue("waivedOffAmount", event?.target?.value);
    // if (rowInvoiceNo[0] === id) {
    setValue(`waivedOffRemarks-${id}`, event.target.value);
    setInputRemarkText(event?.target?.value);
    // }
    const updatedRows = settlementData?.data?.map((row) =>
      row?.invoiceNo === id
        ? { ...row, waivedOffRemarks: event.target.value }
        : row
    );
    setRows(updatedRows);
  };
  const disabledDate = (current) => {
    return current && current > Date.now();
  };

  useEffect(() => {
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
    dispatch(getSettlementReport(payload));
  }, [apiInputPageNumber, pageLimit, selectDate]);

  useEffect(() => {
    if (filterObject && Object.values(filterObject)?.length > 0) {
      if (filterObject?.productName) {
        const payload = {
          params: `${filterObject?.productName}/getAllCustomersByProduct`,
        };
        dispatch(getCustomerList(payload));
      }
    }
  }, [filterObject]);

  const handleSelectChange = (event, name, id) => {
    console.log(event, name, id, "****");
    // console.log(rowInvoiceNo[0], id);
    setValue(`amountPaidStatus-${id}`, event.target.value);
    // if (rowInvoiceNo[0] === id) {
    setInputStatus(event?.target?.value);
    // }
    const updatedRows = settlementData?.data?.map((row) =>
      row.invoiceNo === id
        ? { ...row, amountPaidStatus: event.target.value }
        : row
    );

    setRows(updatedRows);
  };
  const handelEditMenu = () => {
    settlementData?.data?.map((item) => {
      setValue(`amountPaidStatus-${item?.invoiceNo}`, item.amountPaidStatus);
    });
    setEditMenu(true);
  };
  const handelEditWaiveoff = () => {
    settlementData?.data?.map((item) => {
      setValue(`waivedOffRemarks ${item?.invoiceNo}`, item.waivedOffRemarks);
    });
    setEditWaiveoff(true);
  };
  const handelEditTextMenu = () => {
    settlementData?.data?.map((item) => {
      setValue(`waivedOffAmount ${item?.invoiceNo}`, item.waivedOffAmount);
    });
    setEditTextMenu(true);
  };
  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 120,
      disableColumnMenu: true,
      renderCell: (params) =>
        params?.row?.totalGrossAmount > 0
          ? ""
          : params?.row?.invoiceDate !== null
          ? moment(params?.row?.invoiceDate).format("DD/MM/YYYY")
          : "-",
    },
    {
      field: "invoiceNo",
      headerName: "Invoice No.",
      width: 160,
      disableColumnMenu: true,
      renderCell: (params) =>
        params?.row?.totalGrossAmount > 0 ? "Amount" : params?.row?.invoiceNo,
    },
    {
      field: "grossAmount",
      headerName: "Amount Due",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) =>
        params?.row?.totalGrossAmount > 0
          ? params?.row?.totalGrossAmount
          : params?.row?.grossAmount,
    },
    {
      field: "settledAmount",
      width: 200,
      headerName: "Settled Amount",
      disableColumnMenu: true,
      renderCell: (params) =>
        params?.row?.totalSettledAmount > 0
          ? params?.row?.totalSettledAmount
          : params?.row?.settledAmount,
    },
    {
      field: "waivedOffAmount",
      width: 200,
      disableColumnMenu: true,
      renderHeader: () => (
        <>
          {"Waived Amount "}
          <span role="img" aria-label="enjoy">
            <Image
              alt="editicon"
              {...editicon}
              onClick={handelEditTextMenu}
              className={Styles.image_align}
            />
          </span>
        </>
      ),
      renderCell: (params) =>
        params?.row?.totalWaivedOffAmount > 0 ? (
          params?.row?.totalWaivedOffAmount
        ) : editTextMenu &&
          params?.row?.amountPaidStatus !== "Settled" &&
          params?.row?.settledAmount > 0 ? (
          <FormControl fullWidth sx={{ background: "#fff", marginTop: "0rem" }}>
            <Controller
              name={`waivedOffAmount-${params?.row?.invoiceNo}`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  hiddenLabel
                  defaultValue={watch(
                    `waivedOffAmount-${params?.row?.invoiceNo}`
                  )}
                  // value={params?.row?.waivedOffAmount}
                  value={value}
                  onInput={(e) => handleInputChange(e, params?.row?.invoiceNo)}
                  onKeyPress={(e) => handleKeyPress(e, params)}
                  inputProps={{
                    style: {
                      height: "0.5rem",
                      width: "25rem",
                      backgroundColor: "#fcfcfc",
                      borderRadius: "5px",
                    },
                  }}
                />
              )}
            />
          </FormControl>
        ) : (
          params?.row?.waivedOffAmount
        ),
    },
    {
      field: "waivedOffRemarks",
      width: 200,
      disableColumnMenu: true,
      renderHeader: () => (
        <>
          {"Waivedoff Remark"}
          <span role="img" aria-label="enjoy">
            <Image
              alt="editicon"
              {...editicon}
              onClick={handelEditWaiveoff}
              className={Styles.image_align}
            />
          </span>
        </>
      ),
      renderCell: (params) =>
        editWaiveoff &&
        params?.row?.amountPaidStatus !== "Settled" &&
        params?.row?.settledAmount > 0 ? (
          <FormControl fullWidth sx={{ background: "#fff", marginTop: "0rem" }}>
            <Controller
              name={`waivedOffRemarks-${params?.row?.invoiceNo}`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  hiddenLabel
                  defaultValue={watch(
                    `waivedOffRemarks-${params?.row?.invoiceNo}`
                  )}
                  // value={params?.row?.waivedOffRemarks}
                  value={value}
                  onInput={(e) =>
                    handleInputRemarkChange(e, params?.row?.invoiceNo)
                  }
                  onKeyPress={(e) => handleKeyPress(e, params)}
                  inputProps={{
                    style: {
                      height: "0.5rem",
                      width: "25rem",
                      backgroundColor: "#fcfcfc",
                      borderRadius: "5px",
                    },
                  }}
                />
              )}
            />
          </FormControl>
        ) : (
          params?.row?.waivedOffRemarks
        ),
    },
    {
      field: "pendingAmount",
      headerName: "Pending Amount",
      width: 200,
      disableColumnMenu: true,
      renderCell: (params) =>
        params?.row?.totalPendingAmount > 0
          ? params?.row?.totalPendingAmount
          : params?.row?.pendingAmount,
    },
    {
      field: "amountPaidStatus",
      width: 300,
      disableColumnMenu: true,
      renderHeader: () => (
        <>
          {"Status"}
          <span role="img" aria-label="enjoy">
            <Image
              alt="editicon"
              {...editicon}
              onClick={handelEditMenu}
              className={Styles.image_align}
            />
          </span>
        </>
      ),

      renderCell: (params) =>
        editMenu && params?.row?.amountPaidStatus === "Pending Confirmation" ? (
          <>
            {console.log(params?.row?.amountPaidStatus)}
            <FormControl>
              <Controller
                name={`amountPaidStatus-${params?.row?.invoiceNo}`}
                defaultValue={
                  watch(`amountPaidStatus-${params?.row?.invoiceNo}`) || ""
                }
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    style={{ height: "25px", width: "200px" }}
                    onChange={(e) =>
                      handleSelectChange(
                        e,
                        "amountPaidStatus",
                        params?.row?.invoiceNo
                      )
                    }
                  >
                    {console.log(
                      watch(`amountPaidStatus ${params?.row?.customerId}`),
                      value,
                      "****"
                    )}

                    <MenuItem value="Pending Payment" disabled>
                      Pending Payment
                    </MenuItem>
                    <MenuItem value="Pending Confirmation" disabled>
                      Pending Confirmation
                    </MenuItem>
                    <MenuItem
                      value="Settled"
                      disabled={value === "Pending Confirmation" ? false : true}
                    >
                      Settled
                    </MenuItem>
                  </Select>
                )}
              ></Controller>
            </FormControl>
            <Image
              alt="tickicon"
              {...tick_icon}
              onClick={(e) => handelRowStatus(e, params)}
              className={Styles.image_align}
            />
            <Image
              alt="crossicon"
              {...cross_icon}
              // onClick={handelEditMenu}
              className={Styles.image_align}
            />
          </>
        ) : (
          params?.row?.amountPaidStatus
        ),
    },
  ];

  const {
    register,
    watch,
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = () => {
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
    if (
      filterObject?.orgName &&
      filterObject?.customerName &&
      filterObject?.productName
    ) {
      payload.params += `&productId=${filterObject.productName}&customerId=${filterObject.customerName}&orgId=${filterObject.orgName}`;
    } else if (filterObject?.customerName && filterObject?.productName) {
      payload.params += `&productId=${filterObject.productName}&customerId=${filterObject.customerName}`;
    } else {
      payload.params += `&productId=${filterObject.productName}`;
    }
    dispatch(getSettlementReport(payload));
    reset();
    setFilterObject({});
    setModalOpen(false);
    return () => {
      dispatch(clearCustomerList());
    };
  };

  const defaultValue = byRoleData?.data?.filter(
    (item) => item.ownershipType === "Self"
  )[0]?.productid;

  const onSelectProductName = (data) => {
    setValue("ProName", data.target.value);
    setFilterObject({ ...filterObject, productName: data.target.value });
  };
  const onSelectCustomerName = (data) => {
    setValue("CusName", data.target.value);
    setFilterObject({ ...filterObject, customerName: data.target.value });
  };
  const onSelectOrgName = (data) => {
    setFilterObject({ ...filterObject, orgName: data.target.value });
  };
  const onSelectDate = (data) => {
    setSelectDate(data);
    setFilterObject({ ...filterObject, date: data });
    const payload = {
      params: `startdate=${selectDate?.[0]?.$d}&enddate=${selectDate?.[1]?.$d}&page=${apiInputPageNumber}&limit=${pageLimit}`,
      headers: {
        orgid: Auth.getUserDetails().orgId,
        tenantid: Auth.getUserDetails().tenantId,
      },
      body: {
        payload: {},
      },
    };
    dispatch(getSettlementReport(payload));
  };
  const handleModalOpen = () => {
    setModalOpen(true);
    reset();
  };
  const handleModalClose = () => {
    reset();
    setFilterObject({});
    setModalOpen(false);
  };

  const CustomHeader = ({ column }) => {
    return <div>{column.headerName}</div>;
  };
  const SummaryRow = () => {
    // const totalAge = rows.reduce((sum, row) => sum + row.age, 0);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <div>Total</div>
        {/* <div>{totalAge}</div> */}
      </div>
    );
  };
  const totalData = settlementData?.data?.find((e) => e?.totalGrossAmount > 0);
  console.log(totalData);
  // console.log(settlementData, "settlementData");
  return (
    <Grid container className={Styles.fin_container}>
      <Grid container spacing={2} item xs={12} sm={12} md={12} lg={5} xl={5}>
        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
          <RangePicker
            size="small"
            defaultValue={[
              dayjs(dayjs().startOf("month"), "YYYY/MM/DD"),
              dayjs(dayjs().endOf("month"), "YYYY/MM/DD"),
            ]}
            format={"YYYY/MM/DD"}
            className={Styles.grid_column_item_date_picker_three}
            suffixIcon={null}
            def
            onChange={(e) => onSelectDate(e)}
            disabledDate={disabledDate}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <Button
            className={Styles.btn_cancel}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            onClick={handleModalOpen}
          >
            <Image
              style={{ marginRight: "1rem" }}
              alt="filterIcon"
              {...filterIcon}
            />
            Filter
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          onClick: () => null,
        }}
        disablebackdropclick
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={Styles.table_modal}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {" "}
            <Box sx={{ margin: "1.25rem 1.19rem 0" }}>Filter</Box>
            <Image
              onClick={handleModalClose}
              style={{ marginTop: "1.25rem", marginRight: "1rem" }}
              alt="crossIcon"
              {...crossIcon}
            />
          </Stack>
          <Divider sx={{ width: "100%", margin: "1.25rem 0" }} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              direction="column"
              spacing={4}
              sx={{ padding: "0 2.44rem 2.44rem" }}
            >
              <FormControl fullWidth sx={{ background: "#fff" }}>
                <InputLabel id="demo-multiple-name-label">
                  Organisation name
                </InputLabel>
                <Controller
                  name="OrgName"
                  control={control}
                  defaultValue={watch({ defaultValue })}
                  rules={{ required: "Please select Organsation name" }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      onChange={onSelectOrgName}
                      value={filterObject?.orgName}
                      className={Styles.materialSelect}
                      input={<OutlinedInput label={"Organsation name"} />}
                    >
                      {orgData &&
                        orgData?.data
                          ?.filter(
                            (item) =>
                              item.verificationStatus === "approve" &&
                              item.approvedStatus !== "disable"
                          )
                          .map(({ name, id }) => (
                            <MenuItem
                              key={id}
                              value={id}
                              className={Styles.selected_item}
                            >
                              {name}
                            </MenuItem>
                          ))}
                    </Select>
                  )}
                ></Controller>
                {!errors?.OrgName?.ref?.value && (
                  <span className={Styles.errorSetting}>
                    {errors.OrgName?.message}
                  </span>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ background: "#fff" }}>
                <InputLabel id="demo-multiple-name-label">
                  Product name
                </InputLabel>
                <Controller
                  name="ProName"
                  control={control}
                  defaultValue={watch({ defaultValue })}
                  rules={{ required: "Please select Product name" }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      onChange={onSelectProductName}
                      value={filterObject?.productName}
                      className={Styles.materialSelect}
                      input={<OutlinedInput label={"Product name"} />}
                    >
                      {byRoleData &&
                        byRoleData?.data
                          ?.filter((item) => item.ownershipType === "Self")
                          .map(({ name, productid }) => (
                            <MenuItem key={productid} value={productid}>
                              {name}
                            </MenuItem>
                          ))}
                    </Select>
                  )}
                ></Controller>
                {!errors?.ProName?.ref?.value && (
                  <span className={Styles.errorSetting}>
                    {errors.ProName?.message}
                  </span>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ background: "#fff" }}>
                <InputLabel id="demo-multiple-name-label">
                  Customer name
                </InputLabel>
                <Controller
                  name="CusName"
                  control={control}
                  defaultValue={watch({ defaultValue })}
                  rules={{ required: "Please select Customer name" }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      onChange={onSelectCustomerName}
                      value={filterObject?.customerName}
                      className={Styles.materialSelect}
                      input={<OutlinedInput label={"Customer name"} />}
                    >
                      {customerDatas &&
                        customerDatas?.data
                          ?.filter((item) => item.status !== "disabled")
                          .map(({ name, customerid }) => (
                            <MenuItem key={customerid} value={customerid}>
                              {name}
                            </MenuItem>
                          ))}
                    </Select>
                  )}
                ></Controller>
                {!errors?.CusName?.ref?.value && (
                  <span className={Styles.errorSetting}>
                    {errors.CusName?.message}
                  </span>
                )}
              </FormControl>
            </Stack>

            <Divider />
            <Stack
              direction="row"
              justifyContent="end"
              gap="10px"
              sx={{ padding: "1.19rem 1.13rem" }}
            >
              <Button
                className={Styles.login_continue_btn}
                type="submit"
                variant="outlined"
                sx={{
                  background: "#FFFFFF",
                  border: "1px solid  #DDDDDD",
                  borderRadius: "5px",
                  width: "25%",
                  color: "#444444",
                  textTransform: "capitalize",
                }}
                onClick={handleModalClose}
              >
                Cancel
              </Button>
              <Button
                className={Styles.login_continue_btn}
                type="submit"
                sx={{
                  background: "#3633B7",
                  width: "25%",
                  textTransform: "capitalize",
                }}
                variant="contained"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      <Grid
        container
        justifyContent={"flex-end"}
        spacing={2}
        item
        xs={12}
        sm={12}
        md={12}
        lg={7}
        xl={7}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={4}
          xl={4}
          style={{ margintTop: "3px" }}
        >
          <TextField
            disabled
            id="outlined-disabled"
            label="Advance Amount"
            defaultValue={
              settlementData?.data[settlementData?.data.length - 1]
                ?.advanceAmount || 0
            }
            value={
              settlementData?.data[settlementData?.data.length - 1]
                ?.advanceAmount
            }
            className={Styles.inputBox}
          />
          {/* <TextField
            disabled
            defaultValue={
              settlementData?.data[settlementData?.data.length - 1]
                ?.advanceAmount || 0
            }
            // value={
            //   settlementData?.data[settlementData?.data.length - 1]
            //     ?.advanceAmount
            // }
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            }
            {...register("advanceAmount")}
            variant="outlined"
            label="Advance Amount"
            InputProps={{
              readOnly: true,
            }}
            className={Styles.inputBox}
          /> */}
        </Grid>
      </Grid>

      <Divider sx={{ width: "100%", margin: "1.12rem 0 0.75rem" }} />

      <Box
        sx={{
          height: 300,
          width: "100%",
        }}
      >
        <DataGrid
          editMode="row"
          hideFooter={false}
          getRowId={(row) => row?.invoiceNo || 0}
          rows={
            settlementData?.data.length > 0
              ? settlementData?.data?.filter((e) => !e?.totalGrossAmount)
              : []
          }
          disableRowSelectionOnClick={true}
          columns={columns.map((column) => ({
            ...column,
            headerRender: (props) => <CustomHeader {...props} />,
            sortable: false,
            filterable: false,
          }))}
          FooterRowCount={true}
          slots={{
            footer: () => (
              <>
                {/* <GridPagination /> */}
                <Box sx={{ p: 1, display: "flex", background: "#CBD8FA" }}>
                  <div style={{ width: "280px", minWidth: "280px" }}>
                    Total:
                  </div>
                  <div style={{ width: "150px" }}>
                    {totalData?.totalGrossAmount}
                  </div>
                  <div style={{ width: "200px" }}>
                    {totalData?.totalSettledAmount}
                  </div>
                  <div style={{ width: "200px" }}>
                    {totalData?.totalWaivedOffAmount}
                  </div>
                  <div style={{ width: "200px" }}></div>
                  <div style={{ width: "200px" }}>
                    {totalData?.totalPendingAmount}
                  </div>
                </Box>
              </>
            ),
          }}
          // checkboxSelection
          // onRowSelectionModelChange={(newRowSelectionModel) => {
          //   const selectedRows = newRowSelectionModel.map((id) =>
          //     settlementData.data.find((row) => row.invoiceNo === id)
          //   );
          //   const selectedInvoiceNo = selectedRows.map(
          //     (ele) => ele.invoiceNo
          //   );
          //   // setRowInvoiceNo(selectedInvoiceNo);

          //   // console.log(selectedRows);
          //   setRowSelectionModel(newRowSelectionModel);
          // }}
          rowSelectionModel={rowSelectionModel}
          footerRender={() => <SummaryRow />}
        />
      </Box>

      {/* {settlementData?.data.length > 0 && (
        <Box
          sx={{
            height: 60,
            width: "100%",
            overflowX: "hidden",
            background: "#becef4",
          }}
          className={Styles?.totalfooter}
          style={{ overflow: "hidden" }}
        >
          <DataGrid
            slots={{
              columnHeaders: () => null,
            }}
            style={{ overflow: "hidden" }}
            editMode="row"
            hideFooter={true}
            getRowId={(row) => row?.invoiceNo || 0}
            rows={settlementData?.data?.filter((e) => e?.totalGrossAmount > 0)}
            disableRowSelectionOnClick={true}
            columns={columns.map((column) => ({
              ...column,
              headerRender: (props) => <CustomHeader {...props} />,
              sortable: false,
              filterable: false,
            }))}
            // Footer={}
          
            // checkboxSelection
            // onRowSelectionModelChange={(newRowSelectionModel) => {
            //   const selectedRows = newRowSelectionModel.map((id) =>
            //     settlementData.data.find((row) => row.invoiceNo === id)
            //   );
            //   const selectedInvoiceNo = selectedRows.map(
            //     (ele) => ele.invoiceNo
            //   );
            //   // setRowInvoiceNo(selectedInvoiceNo);

            //   // console.log(selectedRows);
            //   setRowSelectionModel(newRowSelectionModel);
            // }}
            rowSelectionModel={rowSelectionModel}
            footerRender={() => <SummaryRow />}
          />
        </Box>
      )} */}
      {/* <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid item xs={12} sm={6} md={12} lg={1} xl={2}></Grid>
        <Grid item xs={12} sm={6} md={12} lg={2} xl={2}>
          Total
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={2} xl={2}>
          Total
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={2} xl={2}>
          Total
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={2} xl={2}>
          Total
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={1} xl={1}>
          Total
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={1} xl={1}>
          Total
        </Grid>
      </Grid> */}

      {settlementData?.data.length > 0 && (
        <Grid item xs={12} sm={13} md={12} lg={12} xl={12}>
          <TablePagination
            rowsPerPageOptions={[50, 100, 200]}
            component="div"
            count={settlementData?.count}
            page={pageNumber}
            onPageChange={handleChangePage}
            rowsPerPage={pageLimit}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      )}

      {settlementData?.data.length === 0 && !isLoading && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography className={Styles.No_Record_found}>
            Invoice detail not available
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
export default FinanceSettlement;
