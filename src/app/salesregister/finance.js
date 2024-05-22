import React, { useCallback, useEffect, useState } from "react";
import JSZip from "jszip";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import Image from "next/image";
import { saveAs } from "file-saver";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "antd";
import crossIcon from "../../../public/report/cross_icon.svg";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import filterIcon from "../../../public/MasterLayoutImg/filterlines.svg";
import {
  getInvoice,
  generateInvoice,
  cancelInvoice,
} from "../../redux/actionCreator/invoiceMethod";
import Auth from "../../config/auth";
import {
  getCustomerList,
  clearCustomerList,
  getClientList,
} from "@/src/redux/actionCreator/reportMethod";
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
  Tooltip,
  TablePagination,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Styles from "./salesregister.module.scss";
import CancelModal from "./cancelModal";

const { RangePicker } = DatePicker;

const Finance = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectDate, setSelectDate] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  const [filterObject, setFilterObject] = useState({});
  const [apiInputPageNumber, setApiInputPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(50);
  const [pageNumber, setPageNumber] = useState(0);
  const [s3Urls, setS3Urls] = useState([]);
  const [rowGst, setRowGst] = useState("");
  const [rowIrn, setRowIrn] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [rowStatus, setRowStatus] = useState([]);
  const [selectionType, setSelectionType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  const reducerInvoiceData = useSelector(
    (state) => state?.invoiceReducer || null,
    shallowEqual
  );
  const reducerCusData = useSelector(
    (state) => state.reportReducer || null,
    shallowEqual
  );

  const disabledDate = (current) => {
    return current && current > Date.now();
  };
  const [msg, setmsg] = useState({
    open: false,
    msg: "",
  });

  const {
    byRole: { resultData: byRoleData },
  } = reducerData;
  console.log(reducerInvoiceData);
  const {
    getInvoiceData: { resultData: InvoiceData, isLoading },
    cancelInvoiceData: { resultData: CancelInvoiceData },
    generateInvoiceData: { resultData: GenerateInvoiceData },
  } = reducerInvoiceData;
  const {
    customerList: { resultData: customerDatas },
    clientList: { resultData: clientDatas },
  } = reducerCusData;

  useEffect(() => {
    if (reducerInvoiceData?.cancelInvoiceData?.resultData?.data?.id) {
      setmsg({
        open: true,
        msg: reducerInvoiceData?.cancelInvoiceData?.resultData?.message || "",
      });
    }
    if (reducerInvoiceData?.generateInvoiceData?.resultData?.data?.[0]?.CDKey) {
      setmsg({
        open: true,
        msg: reducerInvoiceData?.generateInvoiceData?.resultData?.message || "",
      });
    }
  }, [
    reducerInvoiceData?.cancelInvoiceData?.resultData?.data?.id ||
      reducerInvoiceData?.generateInvoiceData?.resultData?.data?.[0]?.CDKey,
  ]);

  useEffect(() => {
    if (selectDate !== null) {
      const startDate = new Date(selectDate?.[0]?.$d);
      const endDate = new Date(selectDate?.[1]?.$d);
      startDate.setDate(startDate.getDate() + 1);
      const startDateUTCString = startDate.toUTCString();
      endDate.setDate(endDate.getDate() + 1);
      const endDateUTCString = endDate.toUTCString();

      const payload = {
        params: `startDate=${startDateUTCString}&endDate=${endDateUTCString}&page=${apiInputPageNumber}&limit=${pageLimit}`,
        headers: {
          orgid: Auth.getUserDetails().orgId,
          tenantid: Auth.getUserDetails().tenantId,
        },
        body: {
          payload: {},
        },
      };
      console.log(payload.params);
      console.log(new Date(selectDate?.[0]?.$d)?.toUTCString());
      // console.log(filterObject.productName);
      if (
        filterObject?.customerName &&
        filterObject?.productName &&
        filterObject?.clientName
      ) {
        payload.params += `&product=${filterObject.productName}&customer=${filterObject.customerName}&client=${filterObject.clientName}`;
      } else if (filterObject?.customerName && filterObject?.productName) {
        payload.params += `&product=${filterObject.productName}&customer=${filterObject.customerName}`;
      } else if (filterObject?.productName) {
        payload.params += `&product=${filterObject.productName}`;
      } else {
        if (selectedProduct) {
          payload.params += `&product=${selectedProduct}`;
        } else {
          payload.params;
        }
      }

      dispatch(getInvoice(payload));
      reset();
      setModalOpen(false);
      return () => {
        dispatch(clearCustomerList());
      };
    }
  }, [
    apiInputPageNumber,
    pageLimit,
    CancelInvoiceData,
    GenerateInvoiceData,
    selectDate,
  ]);

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

  useEffect(() => {
    if (filterObject?.customerName) {
      const payload = {
        params: `${filterObject?.customerName}/fetchClients`,
      };
      dispatch(getClientList(payload));
    }
  }, [filterObject?.customerName]);

  const columns = [
    {
      field: "sellerName",
      headerName: "Seller Name",
      headerClassName: "super-app-theme--header",
      width: 120,
      disableColumnMenu: true,
      renderCell: (params) =>
        params.row.invoiceStatus === "Success" ? (
          <a target="_blank" href={params.row.invokeUrl}>
            {params.row.sellerName}
          </a>
        ) : (
          params.row.sellerName
        ),
    },
    {
      field: "buyerName",
      headerName: "Buyer Name",
      headerClassName: "super-app-theme--header",
      width: 120,
      disableColumnMenu: true,
    },
    {
      field: "invoiceNo",
      headerName: "Invoice No.",
      headerClassName: "super-app-theme--header",
      width: 160,
      disableColumnMenu: true,
    },
    {
      field: "ackNo",
      headerName: "Ack. No.",
      headerClassName: "super-app-theme--header",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "irnNo",
      headerName: "IRN No.",
      headerClassName: "super-app-theme--header",
      width: 200,
      disableColumnMenu: true,
    },

    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      headerClassName: "super-app-theme--header",
      width: 120,
      disableColumnMenu: true,
      renderCell: (params) =>
        params?.row?.invoiceDate !== null
          ? moment(params?.row?.invoiceDate).format("DD/MM/YYYY")
          : "-",
    },
    {
      field: "grossAmount",
      headerName: "Amount with GST(Paise)",
      headerClassName: "super-app-theme--header",
      type: "number",
      align: "center",
      disableColumnMenu: true,
      width: 200,
    },

    {
      field: "netAmount",
      headerName: "Amount without GST(Paise)",
      headerClassName: "super-app-theme--header",
      type: "number",
      align: "center",
      disableColumnMenu: true,
      width: 230,
    },
    {
      field: "invoiceStatus",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) =>
        params.row.invoiceStatus === "Failed" ||
        params.row.invoiceStatus === "System Failure" ||
        params.row.invoiceStatus === "Cancellation Failed" ? (
          <Tooltip title={params.row.irnError}>
            <span>{params.row.invoiceStatus}</span>
          </Tooltip>
        ) : params.row.invoiceStatus === "Cancelled" ? (
          <Tooltip title={params.row.cancelReason}>
            <span>{params.row.invoiceStatus}</span>
          </Tooltip>
        ) : (
          params.row.invoiceStatus
        ),
    },
  ];

  // const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  //   "& .super-app-theme--Cancellation Failed": {
  //     color: "black",
  //   },
  //   "& .super-app-theme--Success": {
  //     color: "green",
  //   },
  //   "& .super-app-theme--System Failure": {
  //     color: "red",
  //   },
  //   "& .super-app-theme--Cancelled": {
  //     color: "rgba(0, 0, 0, 0.5)",
  //   },
  //   "& .super-app-theme--header": {
  //     background: "#EAECF0",
  //     color: "#5A6273",
  //   },
  //   "& .MuiDataGrid-columnHeaderCheckbox": {
  //     background: "#EAECF0",
  //   },
  // }));
  const isDisabledGenerate =
    rowStatus.includes("Failed") ||
    rowStatus.includes("System Failure") ||
    rowStatus.includes("Cancelled");
  const isDisabledCancel =
    rowStatus.includes("Success") || rowStatus?.includes("Cancellation Failed");
  const isDisabledDownload = rowStatus.includes("Success");
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
    const startDate = new Date(selectDate?.[0]?.$d);
    const endDate = new Date(selectDate?.[1]?.$d);
    startDate.setDate(startDate.getDate() + 1);
    const startDateUTCString = startDate.toUTCString();
    endDate.setDate(endDate.getDate() + 1);
    const endDateUTCString = endDate.toUTCString();

    const payload = {
      params: `startDate=${startDateUTCString}&endDate=${endDateUTCString}&page=${apiInputPageNumber}&limit=${pageLimit}`,
      headers: {
        orgid: Auth.getUserDetails().orgId,
        tenantid: Auth.getUserDetails().tenantId,
      },
      body: {
        payload: {},
      },
    };
    setSelectedProduct(filterObject.productName);
    console.log(filterObject.productName);
    if (
      filterObject?.customerName &&
      filterObject?.productName &&
      filterObject?.clientName
    ) {
      payload.params += `&product=${filterObject.productName}&customer=${filterObject.customerName}&client=${filterObject.clientName}`;
    } else if (filterObject?.customerName && filterObject?.productName) {
      payload.params += `&product=${filterObject.productName}&customer=${filterObject.customerName}`;
    } else {
      payload.params += `&product=${filterObject.productName}`;
    }
    dispatch(getInvoice(payload));
    reset();
    setFilterObject({});
    setModalOpen(false);
    return () => {
      dispatch(clearCustomerList());
    };
  };

  const createInvoice = (selectNo) => {
    const payload = {
      headers: {
        orgid: Auth.getUserDetails().orgId,
        tenantid: Auth.getUserDetails().tenantId,
      },
      body: {
        invoiceNo: selectNo,
      },
    };
    dispatch(generateInvoice(payload));
  };

  const cancelInvoiceData = () => {
    setIsModalOpen(true);
  };
  const closeModal = async (data) => {
    try {
      if (data?.reason && data?.remark) {
        const payload = {
          body: {
            irn: rowIrn,
            gstin: rowGst,
            cnlRsn: data?.reason,
            cnlRem: data?.remark,
          },
        };
        await dispatch(cancelInvoice(payload));
        setIsModalOpen(false);
      } else {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
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
  // const onSelectClientName = (data) => {
  //   setFilterObject({ ...filterObject, clientName: data.target.value });
  // };
  const onSelectDate = (data) => {
    setSelectDate(data);
    setFilterObject({ ...filterObject, date: data });
    const startDate = new Date(selectDate?.[0]?.$d);
    const endDate = new Date(selectDate?.[1]?.$d);
    startDate.setDate(startDate.getDate() + 1);
    const startDateUTCString = startDate.toUTCString();
    endDate.setDate(endDate.getDate() + 1);
    const endDateUTCString = endDate.toUTCString();

    const payload = {
      params: `startDate=${startDateUTCString}&endDate=${endDateUTCString}&page=${apiInputPageNumber}&limit=${pageLimit}`,
      headers: {
        orgid: Auth.getUserDetails().orgId,
        tenantid: Auth.getUserDetails().tenantId,
      },
      body: {
        payload: {},
      },
    };
    dispatch(getInvoice(payload));
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
  const downloadZip = useCallback(() => {
    try {
      const zip = new JSZip();
      const fetchPromises = s3Urls.map(async (url) => {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        return Promise.resolve({
          name: url.substring(url.lastIndexOf("/") + 1),
          data: response.data,
        });
      });
      Promise.all(fetchPromises)
        .then(async (data) => {
          for (let i = 0; i < data.length; i++) {
            zip.file(data[i].name, data[i].data);
            // console.log("#Data", i, data.length);
            if (i + 1 === data.length) {
              const zipContent = await zip.generateAsync({ type: "blob" });
              try {
                saveAs(zipContent, `Invoice-${data.length}.zip`);
              } catch (err) {
                console.log(err);
              }
            }
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.error("Error downloading PDFs: ", error);
    }
  }, [rowSelectionModel]);

  const CustomHeader = ({ column }) => {
    return <div>{column.headerName}</div>;
  };
  // console.log(rowSelectionModel, "ss");

  return (
    <Grid container spacing={2} className={Styles.invoice_container}>
      <Snackbar
        autoHideDuration={3000}
        open={msg?.open || false}
        // onClose={handleClose}
        message={msg?.msg}
        onClose={() => setmsg({ open: false, msg: "" })}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        // action={action}
      />

      <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
        <RangePicker
          size="small"
          defaultValue={[
            dayjs(dayjs().startOf("month"), "YYYY/MM/DD"),
            dayjs(dayjs().endOf("month"), "YYYY/MM/DD"),
          ]}
          format={"YYYY/MM/DD"}
          className={Styles.report_date_picker}
          suffixIcon={null}
          def
          onChange={(e) => onSelectDate(e)}
          disabledDate={disabledDate}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
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
              {/* <FormControl fullWidth sx={{ background: "#fff" }}>
                <InputLabel id="demo-multiple-name-label">
                  Client name
                </InputLabel>
                <Controller
                  name="CliName"
                  control={control}
                  defaultValue={watch({ defaultValue })}
                  rules={{ required: "Please select Client name" }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      onChange={onSelectClientName}
                      value={filterObject?.clientName}
                      className={Styles.materialSelect}
                      input={<OutlinedInput label={"Client name"} />}
                    >
                      {clientDatas &&
                        clientDatas?.data?.clientV2s.map(
                          ({ name, clientId }) => (
                            <MenuItem key={clientId} value={clientId}>
                              {name}
                            </MenuItem>
                          )
                        )}
                    </Select>
                  )}
                ></Controller>
                {!errors?.CliName?.ref?.value && (
                  <span className={Styles.errorSetting}>
                    {errors.CliName?.message}
                  </span>
                )}
              </FormControl> */}
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
        justifyContent={"end"}
        spacing={2}
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
      >
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <Button
            disabled={!isDisabledCancel}
            className={Styles.btn_submit}
            sx={{
              "&.Mui-disabled": {
                background: "#6B68C5 !important",
                color: "#9e9e9e !important",
              },
            }}
            // style={customButtonStyle}
            onClick={() => cancelInvoiceData()}
          >
            Cancel
          </Button>
        </Grid>

        <CancelModal visible={isModalOpen} handleClose={closeModal} />

        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <Button
            // style={customButtonStyle}
            className={Styles.btn_submit}
            sx={{
              "&.Mui-disabled": {
                background: "#6B68C5 !important",
                color: "#9e9e9e !important",
              },
            }}
            onClick={() =>
              rowSelectionModel.length > 0 && createInvoice(rowSelectionModel)
            }
            disabled={!isDisabledGenerate}
          >
            Generate
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <Button
            disabled={!isDisabledDownload}
            onClick={() => rowSelectionModel.length > 0 && downloadZip()}
            // style={customButtonStyle}
            className={Styles.btn_submit}
            sx={{
              "&.Mui-disabled": {
                background: "#6B68C5 !important",
                color: "#9e9e9e !important",
              },
            }}
          >
            Download
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ width: "100%", margin: "1rem 0 0" }} />
      {InvoiceData?.data?.length > 0 && (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            margin: "0rem 0 0rem",
            height: "calc(100vh - 210px)",
            width: " calc(100vw - 170px)",
          }}
        >
          {" "}
          <DataGrid
            rowHeight={35}
            getRowClassName={(params) =>
              `super-app-theme--${params?.row?.invoiceStatus}`
            }
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
              ".MuiGrid-item": {
                paddingTop: "0 !important",
              },
              // disable cell selection style
              ".MuiDataGrid-cell:focus": {
                outline: "none",
              },
              // pointer cursor on ALL rows
              "& .MuiDataGrid-row:hover": {
                cursor: "pointer",
              },
              "& .super-app-theme--Cancellation Failed": {
                color: "black",
              },
              "& .super-app-theme--Success": {
                color: "green",
              },
              "& .super-app-theme--System Failure": {
                color: "red",
              },
              "& .super-app-theme--Cancelled": {
                color: "rgba(0, 0, 0, 0.5)",
              },
              "& .super-app-theme--header": {
                background: "#EAECF0",
                color: "#5A6273",
              },
              "& .MuiDataGrid-columnHeaderCheckbox": {
                background: "#EAECF0",
              },
            }}
            isRowSelectable={(params) => {
              return (
                params?.row?.invoiceStatus === selectionType || !selectionType
              );
            }}
            hideFooter={true}
            getRowId={(row) => row?.invoiceNo || 0}
            rows={InvoiceData?.data}
            columns={columns.map((column) => ({
              ...column,
              headerRender: (props) => <CustomHeader {...props} />,
              sortable: false,
              filterable: false,
            }))}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              const selectedRows = newRowSelectionModel?.map((id) =>
                InvoiceData.data.find((row) => row.invoiceNo === id)
              );
              const selectedStatus = selectedRows?.map(
                (ele) => ele.invoiceStatus
              );
              const selectedUrl = selectedRows?.map((ele) => ele.invokeUrl);
              const selectedGst = selectedRows?.map((ele) => ele.gstin);
              const selectedIrn = selectedRows?.map((ele) => ele.irnNo);
              setRowGst(selectedGst[0]);
              setRowIrn(selectedIrn[0]);
              setRowSelectionModel(newRowSelectionModel);
              setRowStatus(selectedStatus);
              setSelectionType(selectedStatus?.[0]);
              setS3Urls(selectedUrl);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </Grid>
      )}
      {InvoiceData?.data?.length > 0 && (
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
            count={InvoiceData?.count}
            page={pageNumber}
            onPageChange={handleChangePage}
            rowsPerPage={pageLimit}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      )}
      {console.log(InvoiceData)}
      {(InvoiceData?.data?.length === 0 || InvoiceData == null) && (
        <Grid
          style={{ paddingTop: "0" }}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <Typography className={Styles.No_Record_found}>
            Invoice detail not available
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
export default Finance;

// let params = "";
// if (selectDate?.[0]?.$d && selectDate?.[1]?.$d) {
//   params += `startdate=${new Date(selectDate?.[0]?.$d)}&enddate=${new Date(
//     selectDate?.[1]?.$d
//   )}`;
// }
// if (params) params += `&page=${apiInputPageNumber}&limit=${pageLimit}`;
// else params += `page=${apiInputPageNumber}&limit=${pageLimit}`;
