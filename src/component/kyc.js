"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Box,
  Skeleton,
  Card,
  CardContent,
  Radio,
  getRadioUtilityClass,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import { useForm } from "react-hook-form";
import Styles from "../styles/kyc.module.scss";
import LoginLayout from "./loginLayout";
import { useSelector, shallowEqual } from "react-redux";
import LABELS from "../constant/label";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const bussinessType = ["Individual", "Proprietorship", "Un Registered"];

const {
  KYC: { SIGNATORY_PAN_TAB_NAME },
} = LABELS;

const KYC = ({
  title,
  subText,
  tabName,
  label,
  btn_name,
  callBack,
  goNext,
}) => {
  const [radioSelect, setRadioSelect] = useState(false);
  const [formValue, setFormValue] = useState(null);
  const [tabValue, setTabValue] = useState("one");
  const [isLoad, setisLoad] = useState(false);
  const reducerData = useSelector(
    (state) => state.signupReducer || null,
    shallowEqual
  );
  // const reducerData1 = useSelector(state => state.orgDataReducer || null, shallowEqual);

  const {
    kycVerify: { resultData: kycData, isLoading: kycLoader },
  } = reducerData;
  const form = useForm({
    defaultValues: {
      [label]: "",
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });
  const onSubmit = (data) => {
    setFormValue(data[label]);
    callBack(data);
  };
  const getRadioBtnSelect = (event) => {
    setRadioSelect(event.target.checked);
  };
  const changeTab = (value, data) => {
    setTabValue(data);
  };
  const handlegonext = () => {
    setisLoad(true);
    goNext();
  };
  useEffect(() => {
    setisLoad(false);
  }, []);
  return (
    <Box sx={{ ml: "2em", mt: "4em" }}>
      <Grid container direction="column" justifyContent="left">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Stack direction={"row"}>
            <Typography variant="h3" className={Styles.kyc_title_2_letters}>
              {title.substring(0, 3)}
            </Typography>
            <Typography variant="h3" className={Styles.kyc_title}>
              {title.substring(3)}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="p" className={Styles.kyc_description}>
            {subText}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ marginTop: "1.875em" }}
        >
          <Tabs
            aria-label="wrapped label tabs example"
            onChange={changeTab}
            value={tabValue}
            TabIndicatorProps={{
              style: {
                background: "#6d96fb",
                paddingBottom: "4px",
                borderRadius: "5px",
                width: "438px",
              },
            }}
          >
            <Tab value="one" label={tabName} className={Styles.kyc_tabName} />
          </Tabs>

          <form onSubmit={handleSubmit(onSubmit)} className={Styles.form}>
            <Stack direction="row">
              <TextField
                {...register(label, {
                  required: `Please enter ${label}`,
                  pattern: {
                    value:
                      label === "PAN"
                        ? new RegExp(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/)
                        : label === "GSTIN"
                        ? new RegExp(
                            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
                          )
                        : new RegExp(
                            /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/
                          ),
                    message: `Invalid ${label}`,
                  },
                })}
                InputProps={{
                  style: {
                    paddingRight: "0",
                  },
                  endAdornment: (
                    <Button
                      className={Styles.kyc_submit_btn}
                      type="submit"
                      variant="contained"
                    >
                      {kycLoader ? (
                        <DotSpinner size={40} speed={0.9} color="#fff" />
                      ) : (
                        btn_name
                      )}{" "}
                    </Button>
                  ),
                }}
                inputProps={{
                  style: {
                    width: "17rem",
                    backgroundColor: "#fcfcfc",
                    borderRadius: "0.3125rem",
                  },
                }}
                variant="outlined"
                label={label}
                className={Styles.kyc_form_input}
                error={!!errors?.[label]}
                helperText={!!errors?.[label] && errors?.[label]?.message}
              />
            </Stack>
            {/* <span className={Styles.errorText}>{errors?.[label] && errors?.[label]?.message}</span> */}
          </form>
          {/* {kycLoader && <Skeleton className={Styles.Skeleton_kyc} />} */}
        </Grid>
        {!isLoad ? (
          kycData && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card className={Styles.kyc_card}>
                  <CardContent className={Styles.kyc_card_radio}>
                    <Checkbox
                      icon={<CircleOutlinedIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      sx={{
                        "&.Mui-checked": {
                          color: "#219653",
                        },
                      }}
                      onChange={(event) => getRadioBtnSelect(event)}
                    />
                  </CardContent>
                  <CardContent className={Styles.card_Content}>
                    <Typography variant="p">
                      {label} : {formValue}
                    </Typography>
                  </CardContent>
                  <CardContent className={Styles.card_Content}>
                    <Typography variant="p">
                      Name:{" "}
                      {kycData?.data?.data?.nameOfOrgAsPerGST ||
                        kycData?.data?.data?.nameAsPerPAN ||
                        kycData?.data?.data?.verificationResult
                          ?.nameAsPerAadhar}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                className={Styles.grid_width}
              >
                <Button
                  onClick={() => handlegonext()}
                  disabled={!radioSelect}
                  className={
                    radioSelect ? Styles.button_blue : Styles.button_grey
                  }
                  fullWidth
                >
                  Continue
                </Button>
              </Grid>
            </>
          )
        ) : (
          <DotSpinner
            size={40}
            speed={0.9}
            color="#3633B7"
            sx={{ textAlign: "center", marginTop: "20px" }}
          />
        )}
      </Grid>
    </Box>
  );
};
export default KYC;
