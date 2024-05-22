"use client";
import React, { useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/navigation";
import LoginLayout from "@/src/component/loginLayout";
import LABELS from "@/src/constant/label";
import Styles from "../createOrg/createOrg.module.scss";
import {
  createOrg,
  storeOrgDetails,
} from "@/src/redux/actionCreator/signupMethod";
import Auth from "@/src/config/auth";
import { kycVerifyclear } from "@/src/redux/actionCreator/signupMethod";

const {
  CREATE_ORG: {
    ORG_HEADER,
    ORG_NAME,
    ORG_CODE,
    INDUSTRY_TYPE,
    BUSSINESS_TYPE,
    GST_REGISTERED,
    YES,
    NO,
  },
  SIGNIN_SIGNUP_LABELS: { LOGIN_SUBMIT_BTN },
  INDUSTRY_TYPE_OPTION,
  BUSINESS_TYPE_OPTION,
} = LABELS;

const SisterOrg = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const reducerData = useSelector(
    (state) => state.signupReducer || null,
    shallowEqual
  );
  const reducerData1 = useSelector(
    (state) => state.orgDataReducer || null,
    shallowEqual
  );

  const {
    createOrg: { resultData, isLoading },
  } = reducerData;
  const form = useForm({
    defaultValues: {
      orgName: "",
    },
  });
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (resultData) {
      dispatch(kycVerifyclear());
      router.push("/kycVerification");
    }
  }, [resultData]);

  const onSubmit = (data) => {
    localStorage.setItem("redirection", true);
    const payload = {
      name: data?.orgName,
      orgcode: data?.orgcode,
      cin:data?.cin,
      industryType: [data?.industry_type],
      businessType: data?.bussiness_type,
      groupId: Auth.getUserDetails()?.tenantId,
      gstRegistered: data?.gst === "Yes" ? true : false,
    };
    dispatch(storeOrgDetails(data));
    dispatch(createOrg(payload));
  };

  return (
    <LoginLayout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={Styles.verify_otp_wrap}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h3" className={Styles.login_title}>
            {ORG_HEADER}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className={Styles.width_spacing}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column">
              <TextField
                type="text"
                {...register("orgName", {
                  required: "Please enter organisation name",
                })}
                variant="outlined"
                onKeyDown={handleKeyDown}
                label={ORG_NAME}
                className={Styles.form_input}
                error={!!errors.orgName}
                helperText={!!errors.orgName && errors.orgName?.message}
              />
              <TextField
                type="text"
                {...register("orgcode", {
                  required: "Please enter organisation code",
                })}
                variant="outlined"
                onKeyDown={handleKeyDown}
                label={ORG_CODE}
                className={Styles.form_input}
                error={!!errors.orgcode}
                helperText={!!errors.orgcode && errors.orgcode?.message}
              />

              <TextField
                type="text"
                {...register("cin", {
                  required: "Please enter Cin",
                })}
                variant="outlined"
                onKeyDown={handleKeyDown}
                label={"CIN"}
                className={Styles.form_input}
                error={!!errors.cin}
                helperText={!!errors.cin && errors.cin?.message}
              />
              <FormControl
                className={Styles.width_100}
                error={!!errors.industry_type}
              >
                <InputLabel id="demo-multiple-name-label">
                  {INDUSTRY_TYPE}
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  className={Styles.select_options}
                  input={<OutlinedInput label={INDUSTRY_TYPE} />}
                  {...register("industry_type", {
                    required: "Please select industry type",
                  })}
                >
                  {INDUSTRY_TYPE_OPTION.map(({ label, value }) => (
                    <MenuItem
                      key={value}
                      value={value}
                      className={Styles.selected_item}
                    >
                      {label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.industry_type && (
                  <span className={Styles.selected_item_error}>
                    {errors.industry_type.message}
                  </span>
                )}
              </FormControl>
              <FormControl
                className={Styles.width_100}
                error={!!errors.bussiness_type}
              >
                <InputLabel id="demo-multiple-name-label">
                  {BUSSINESS_TYPE}
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  className={Styles.select}
                  {...register("bussiness_type", {
                    required: "Please select bussiness type",
                  })}
                  input={<OutlinedInput label={BUSSINESS_TYPE} />}
                >
                  {BUSINESS_TYPE_OPTION.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.bussiness_type && (
                  <span className={Styles.selected_item_error}>
                    {errors.bussiness_type.message}
                  </span>
                )}
              </FormControl>
              <FormControl>
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className={Styles.gst_gegistered}
                >
                  {GST_REGISTERED}
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  row
                  {...register("gst", { required: "Please select GST" })}
                  style={{ width: "250px", justifyContent: "space-between" }}
                >
                  <FormControlLabel
                    // className={Styles.gst_gegistered}
                    {...register("gst", { required: true })}
                    value="Yes"
                    control={
                      <Radio
                        sx={{
                          color: "#3633B7",
                          "&.Mui-checked": {
                            color: "#3633B7",
                          },
                        }}
                      />
                    }
                    label={YES}
                  />
                  <FormControlLabel
                    // className={Styles.gst_gegistered}
                    {...register("gst", { required: true })}
                    value="No"
                    control={
                      <Radio
                        sx={{
                          color: "#3633B7",
                          "&.Mui-checked": {
                            color: "#3633B7",
                          },
                        }}
                      />
                    }
                    label={NO}
                  />
                </RadioGroup>
                <span className={Styles.helper_text}>
                  {errors?.gst && errors?.gst?.message}
                </span>
              </FormControl>

              <Button
                className={Styles.login_continue_btn}
                type="submit"
                variant="contained"
                fullWidth
              >
                {isLoading ? (
                  <DotSpinner size={40} speed={0.9} color="#fff" />
                ) : (
                  LOGIN_SUBMIT_BTN
                )}{" "}
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </LoginLayout>
  );
};
export default SisterOrg;
