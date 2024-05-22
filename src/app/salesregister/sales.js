"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  OutlinedInput,
} from "@mui/material";
import moment from "moment";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { byRole } from "@/src/redux/actionCreator/allOrgMethod";
import { DatePicker } from "antd";
import Auth from "../../config/auth";
import styles from "../../app/dashboard/dashboard.module.scss";
import SalesTable from "@/src/component/userTable/salesTable";

const { RangePicker } = DatePicker;

const Sales = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");

  const [selectDate, setSelectDate] = useState(moment().format("YYYY/MM/DD"));
  const reducerData = useSelector((state) => state.allOrgReducer);
  const {
    byRole: { resultData: byRoleData },
  } = reducerData;

  const defaultValue = byRoleData?.data?.filter(
    (item) => item.ownershipType === "Self"
  )[0]?.productid;

  const tableData = [
    {
      filetype: "salesheader",
      fileName: "Sales Header",
      description: "Sales Register Header information",
      dwnBtn: "Download",
    },
    {
      filetype: "salesline",
      fileName: "Sales Line",
      description: "Sales Register Line item information",
      dwnBtn: "Download",
    },
    {
      filetype: "consolidatedSales",
      fileName: "Consolidate Sales",
      description: "Consolidate Sales item information",
      dwnBtn: "Download",
    },
  ];

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleChange = (data) => {
    const {
      target: { value },
    } = data;
    setValue("ProName", value);
    setProductId(data.target.value);
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    const payload = {
      headers: {
        tenantid: Auth.getUserDetails()?.tenantId,
        orgid: Auth.getUserDetails()?.orgId,
        resourceid: Auth.getUserDetails()?.resourceId,
      },
    };
    dispatch(byRole(payload));
  }, []);

  useEffect(() => {
    setValue("ProName", defaultValue);
  }, [defaultValue]);

  const onSelectDate = (data) => {
    setSelectDate({ ...selectDate, date: data });
    // console.log("data", data);
  };

  const formattedStartDate =
    selectDate?.date?.length > 0
      ? moment(selectDate?.date[0]?.$d)
      : moment(new Date());
  const formattedEndDate =
    selectDate?.date?.length > 0
      ? moment(selectDate?.date[1]?.$d)
      : moment(new Date());

  const startDate = formattedStartDate.format("YYYY-MM-DD");
  const endDate = formattedEndDate.format("YYYY-MM-DD");
  const salesTableHead = [
    { label: "File Type", key: "filetype" },
    { label: "Description", key: "description" },
    { label: " ", key: "dwnBtn" },
  ];
  return (
    <Box className={styles.super1_container}>
      <Box className={styles.tabs_container}>
        <Box className={styles.table_data_container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              direction="row"
              gap="1.44rem"
              className={styles.table_tab_header}
            >
              <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                <FormControl fullWidth sx={{ background: "#fff" }}>
                  <RangePicker
                    size="small"
                    defaultValue={[
                      dayjs(dayjs(), "YYYY/MM/DD"),
                      dayjs(dayjs(), "YYYY/MM/DD"),
                    ]}
                    format={"YYYY/MM/DD"}
                    // className={styles.report_date_picker}
                    className={styles.grid_column_item}
                    suffixIcon={null}
                    onChange={onSelectDate}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <FormControl sx={{ background: "#fff", width: "100%" }}>
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
                        size="small"
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        onChange={(e) => handleChange(e)}
                        value={value}
                        className={styles.materialSelect}
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
                    <span className={styles.errorSetting}>
                      {errors.ProName?.message}
                    </span>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </form>
          {tableData?.length > 0 && (
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              // style={{
              //   margin: "0rem 0 0",
              //   height: "calc(100vh - 210px)",
              //   width: " calc(100vw - 170px)",
              // }}
            >
              <SalesTable
                checkboxSelection
                data={tableData || []}
                tableHeading={salesTableHead}
                label="salesProduct"
                getProductId={productId || defaultValue}
                getSelectStartDate={startDate || moment().format("YYYY-MM-DD")}
                getSelectEndDate={endDate || moment().format("YYYY-MM-DD")}
              />
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Sales;
