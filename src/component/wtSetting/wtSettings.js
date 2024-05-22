import React, { useEffect, useState } from "react";
import styles from "./wtSettings.module.scss";
import {
  Box,
  Button,
  Stack,
  Snackbar,
  Grid,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import editicon from "../../../public/productImg/edit.svg";
import {
  byRole,
  updateThershold,
  clearUpdateThershold,
} from "@/src/redux/actionCreator/allOrgMethod";
import { apiFailureAlert } from "@/src/redux/actionCreator";
import Auth from "../../config/auth";

const horizontal = "center";
const vertical = "top";

const WtSettings = () => {
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState(false);
  const [isEdit, setisEdit] = useState(true);
  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );

  const {
    byRole: { resultData: byRoleData },
    updateThershold: { resultData: updateThersholdData },
  } = reducerData;

  const form = useForm({
    defaultValues: {
      productName: "",
      walletCharge: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    resetField,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm();

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
    if (updateThersholdData) {
      setSnackBar(true);
      setisEdit(true);
      const payload = {
        headers: {
          tenantid: Auth.getUserDetails()?.tenantId,
          orgid: Auth.getUserDetails()?.orgId,
          resourceid: Auth.getUserDetails()?.resourceId,
        },
      };
      dispatch(byRole(payload));
    }
  }, [updateThersholdData]);
  useEffect(() => {
    if (byRoleData) {
      setTimeout(() => setSnackBar(false), 1500);
      dispatch(clearUpdateThershold());
    }
  }, [byRoleData]);

  const onSubmit = (data) => {
    if (isDirty) {
      const payload = {
        headers: {
          orgid: Auth.getUserDetails()?.orgId,
          tenantid: Auth.getUserDetails()?.tenantId,
        },
        body: {
          threshold: Number(data.walletCharge) * 100,
        },
        params: data?.productName,
      };
      dispatch(updateThershold(payload));
    } else {
      dispatch(apiFailureAlert("please update the field"));
    }
  };

  const handleChange = (data) => {
    const {
      target: { value },
    } = data;
    clearErrors("productName");
    const filterdata = byRoleData?.data?.filter((item) => item.id === value);
    setValue("productName", value);
    // setCharge(filterdata?.[0]?.paymentGatewayCut)
    setValue("walletCharge", filterdata?.[0]?.threshold / 100);
  };

  const clearField = () => {
    setisEdit(false);
    // resetField("walletCharge");
  };
  return (
    <>
      <Box className={styles.pg_container}>
        <Typography className={styles.pg_container_heading}>
          {/* Product List */}
        </Typography>
        <Grid container className={styles.pg_container_body}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                {Auth.getRole() === "SuperAdmin" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                      <TextField
                        type="number"
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-"].includes(evt.key) &&
                          evt.preventDefault()
                        }
                        variant="outlined"
                        value={watch("walletCharge") || "1"}
                        label={"Wallet Fee"}
                        className={styles.input_full_width}
                        {...register("walletCharge", {
                          required: "Please enter wallet threshold limit",
                        })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                        }}
                        error={!!errors.walletCharge}
                        helperText={
                          !!errors.walletCharge && errors.walletCharge?.message
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                      <Image
                        alt="editicon"
                        {...editicon}
                        onClick={() => clearField()}
                        className={styles.image_align}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={10}
                      xl={10}
                      style={{ textAlign: "end" }}
                    >
                      <Button type="submit" className={styles.pg_btn_submit}>
                        Submit
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                      <FormControl className={styles.input_full_width}>
                        <InputLabel id="demo-multiple-name-label">
                          Product Name
                        </InputLabel>
                        <Controller
                          name="productName"
                          control={control}
                          defaultValue={watch("productName") ?? ""}
                          rules={{ required: "Please select Product Name" }}
                          render={({ onChange, value }) => (
                            <Select
                              fullWidth
                              value={value}
                              error={!!errors?.productName?.ref?.value}
                              onChange={(e) => handleChange(e)}
                              input={<OutlinedInput label={"productName"} />}
                            >
                              {byRoleData &&
                                byRoleData?.data
                                  ?.filter(
                                    (item) => item.ownershipType === "Self"
                                  )
                                  .map(({ name, id }) => (
                                    <MenuItem
                                      key={id}
                                      value={id}

                                      // className={Styles.selected_item}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                            </Select>
                          )}
                        ></Controller>
                        {!errors?.productName?.ref?.value && (
                          <span className={styles.errorSetting}>
                            {errors.productName?.message}
                          </span>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                      <TextField
                        type="number"
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-"].includes(evt.key) &&
                          evt.preventDefault()
                        }
                        variant="outlined"
                        value={watch("walletCharge") || ""}
                        label={"Wallet Threshold Limit"}
                        className={styles.input_full_width}
                        {...register("walletCharge", {
                          required: "Please enter wallet threshold limit",
                        })}
                        disabled={isEdit}
                        error={!!errors.walletCharge}
                        helperText={
                          !!errors.walletCharge && errors.walletCharge?.message
                        }
                      />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                      <Image
                        alt="editicon"
                        {...editicon}
                        onClick={() => clearField()}
                        className={styles.image_align}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={10}
                      xl={10}
                      style={{ textAlign: "end" }}
                    >
                      <Button type="submit" className={styles.pg_btn_submit}>
                        Submit
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Snackbar
              className={styles.snackBar_wrap}
              open={snackBar}
              anchorOrigin={{ vertical, horizontal }}
            >
              {/* <LinearProgress variant="determinate" value={progress} /> */}
              <div className={styles.snackBar}>
                {/* <p className={styles.snackBar_header}>Success!</p> */}
                <p className={styles.snackBar_title}>
                  Wallet threshold updated Successfully
                </p>
              </div>
            </Snackbar>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default WtSettings;
