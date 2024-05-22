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
  Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Styles from "../../styles/kyc.module.scss";
import LoginLayout from "../../component/loginLayout";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import LABELS from "../../constant/label";
import CONSTANTS from "../../constant/constant";
import { useRouter } from "next/navigation";
import {
  getAAdhar,
  kycVerify,
  kycVerifyclear,
} from "@/src/redux/actionCreator/signupMethod";
import ModalData from "../aaditionalProof/modalData";
import { DotSpinner } from "@uiball/loaders";
import Auth from "../../config/auth";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const {
  KYC: {
    ADHAR_TITLE_1,
    KYC_SUBTEXT,
    ADHAR_LABEL,
    ADHAR_TAB_NAME,
    SIGNATORY_PAN_TAB_NAME_2,
    PAN_LABEL,
    SEARCH_BTN,
    SUBMIT_BTN,
  },
} = LABELS;
const {
  PAGE_ROUTES: { VERIFY_SUCCESS },
} = CONSTANTS;

const GSTUnRegistered = () => {
  const dispatch = useDispatch();
  const [radioSelect, setRadioSelect] = useState(false);
  const [radioSelectAadhar, setRadioSelectAadhar] = useState(false);
  const [formValue, setFormValue] = useState(null);
  const [tabValue, setTabValue] = useState("one");
  const [enableTabTwo, setEnableTabTwo] = useState(true);
  const [closeModalPopup, setCloseModalPopUp] = useState(false);
  const reducerData = useSelector(
    (state) => state.signupReducer || null,
    shallowEqual
  );

  const {
    kycVerify: { resultData: panData, isLoading: panLoader },
    createOrg: { resultData, isLoading },
    getAAdharData: { resultData: aadharData, isLoading: aadharLoader },
  } = reducerData;

  const router = useRouter();
  const form = useForm({
    defaultValues: {
      [ADHAR_LABEL]: "",
      [PAN_LABEL]: ""
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (panData) {
      const isModalOpen = panData?.data?.message?.includes(
        "OTP sent" || "OTP Sent"
      )
        ? true
        : false;
      setCloseModalPopUp(isModalOpen);
      setValue(ADHAR_LABEL, panData?.data?.data?.aadhar);
    }
  }, [panData]);

  useEffect(()=>{
    if(formValue){
      setValue("Aadhar", formValue?.Aadhar)
      setValue("PAN", formValue?.PAN);
    }
  },[formValue])
  // console.log(watch(ADHAR_LABEL), formValue, "ADHAR_LABEL")
  // console.log(watch(PAN_LABEL), "PAN_LABEL")

  const onSubmitAAdhar = (data) => {
    dispatch(kycVerifyclear());
    if (tabValue === "one") {
      const payload = {
        params: resultData?.data?.id || Auth.getOrgId(),
        body: {
          aadhar: data?.[ADHAR_LABEL],
        },
      };
      dispatch(kycVerify(payload));
    }
    else{
      const payload = {
        params: resultData?.data?.id || Auth.getOrgId(),
        body: {
          signatorypan: data?.PAN,
        },
      };
      dispatch(kycVerify(payload))
    }
    setFormValue({ ...formValue, ...data });
  };


  const getRadioBtnSelect = (event) => {
    setRadioSelect(event.target.checked);
  };
  const getRadioBtnSelectAadhar = (event) => {
    setRadioSelectAadhar(event.target.checked);
  };
  const changeTab = (value, data) => {
    setTabValue(data);
    // reset({ADHAR_LABEL: null})
  };
  const goNext = () => {
    router.push(VERIFY_SUCCESS);
  };
  const closeModal = (data) => {
    if (data) {
      const payload = {
        params: resultData?.data?.id || Auth.getOrgId(),
        body: {
          otp: data,
        },
      };
      dispatch(getAAdhar(payload));
      dispatch(kycVerifyclear());
      setCloseModalPopUp(false);
      // reset();
    }
  };

  const goNextTab = () => {
    setEnableTabTwo(false);
    // reset();
    setTabValue("two");
  };
  return (
    <LoginLayout>
      <Box sx={{ ml: "6em" }}>
        <Grid
          container
          direction="column"
          justifyContent="left"
          className={Styles.kyc_wrap}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack direction={"row"}>
              <Typography variant="h3" className={Styles.kyc_title_2_letters}>
                {ADHAR_TITLE_1.substring(0, 4)}
              </Typography>
              <Typography variant="h3" className={Styles.kyc_title}>
                {ADHAR_TITLE_1.substring(4)}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="p" className={Styles.kyc_description}>
              {KYC_SUBTEXT}
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
            >
              <Tab
                value="one"
                label={ADHAR_TAB_NAME}
                className={Styles.kyc_tabName}
              />
              <Tab
                value="two"
                disabled={enableTabTwo}
                label={SIGNATORY_PAN_TAB_NAME_2}
                className={Styles.kyc_tabName}
              />
            </Tabs>

                <form
                  onSubmit={handleSubmit(onSubmitAAdhar)}
                  className={Styles.form}
                >
                  <Stack direction="row">
                {
                  tabValue === "one" ?
                    <TextField
                      defaultValue={watch(ADHAR_LABEL)?? ""}
                      {...register(ADHAR_LABEL, {
                        required: `Please enter ${ADHAR_LABEL}`,
                        pattern: {
                          value: new RegExp(
                            /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/
                          ),
                          message: `Invalid ${ADHAR_LABEL}`,
                        },
                      })}
                      value={watch(ADHAR_LABEL) ?? ""}
                      InputProps={{
                        style: {
                          paddingRight: "1px",
                        },
                        endAdornment: (
                          <Button
                            className={Styles.kyc_submit_btn}
                            type="submit"
                            variant="contained"
                            disable={!setEnableTabTwo}
                          >
                            {panLoader ? (
                              <DotSpinner size={40} speed={0.9} color="#fff" />
                            ) : (
                              SEARCH_BTN
                            )}
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
                      label={ADHAR_LABEL}
                      className={Styles.kyc_form_input}
                      error={!!errors?.[ADHAR_LABEL]}
                      helperText={
                        !!errors?.[ADHAR_LABEL] &&
                        errors?.[ADHAR_LABEL]?.message
                      }
                    />
                    :
                    <TextField
                      defaultValue={watch(PAN_LABEL)?? ""}
                      value={watch(PAN_LABEL) ?? ""}
                      {...register(PAN_LABEL, {
                        required: `Please enter ${PAN_LABEL}`,
                        pattern: {
                          value: new RegExp(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/),
                          message: `Invalid ${PAN_LABEL}`,
                        },
                      })}
                      InputProps={{
                        style: {
                          paddingRight: "1px",
                        },
                        endAdornment: (
                          <Button
                            className={Styles.kyc_submit_btn}
                            type="submit"
                            variant="contained"
                          >
                            {panLoader ? (
                              <DotSpinner size={40} speed={0.9} color="#fff" />
                            ) : (
                              SEARCH_BTN
                            )}
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
                      label={PAN_LABEL}
                      className={Styles.kyc_form_input}
                      error={!!errors?.[PAN_LABEL]}
                      helperText={
                        !!errors?.[PAN_LABEL] && errors?.[PAN_LABEL]?.message
                      }
                    />
                }
                  </Stack>
                  {/* <span className={Styles.errorText}>{errors?.[ADHAR_LABEL] && errors?.[ADHAR_LABEL]?.message}</span> */}
                </form>
          
            {aadharLoader && (
              <DotSpinner size={40} speed={0.9} color="#3633B7" />
            )}
          </Grid>
          {tabValue === "one" && aadharData?.data?.data?.verificationResult && (
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
                      defaultChecked={radioSelectAadhar}
                      onChange={(event) => getRadioBtnSelectAadhar(event)}
                    />
                  </CardContent>
                  <CardContent className={Styles.card_Content}>
                    <Typography variant="p">
                      {ADHAR_LABEL} : {formValue?.[ADHAR_LABEL]}
                    </Typography>
                  </CardContent>
                  <CardContent className={Styles.card_Content}>
                    <Typography variant="p">
                      Name:{" "}
                      {
                        aadharData?.data?.data?.verificationResult
                          ?.nameAsPerAadhar
                      }
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
                  onClick={goNextTab}
                  disabled={!radioSelectAadhar}
                  className={
                    radioSelectAadhar ? Styles.button_blue : Styles.button_grey
                  }
                  fullWidth
                >
                  Continue
                </Button>
              </Grid>
            </>
          )}

          {tabValue === "two" && panData && (
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
                      defaultChecked={radioSelect}
                      onChange={(event) => getRadioBtnSelect(event)}
                    />
                  </CardContent>
                  <CardContent className={Styles.card_Content}>
                    <Typography variant="p">
                      {PAN_LABEL} : {formValue?.[PAN_LABEL]}
                    </Typography>
                  </CardContent>
                  <CardContent className={Styles.card_Content}>
                    <Typography variant="p">
                      Name: {panData?.data?.data?.nameAsPerPAN}
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
                  onClick={goNext}
                  disabled={!radioSelect}
                  className={
                    radioSelect ? Styles.button_blue : Styles.button_grey
                  }
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </>
          )}
          <ModalData visible={closeModalPopup} handleClose={closeModal} />
        </Grid>
      </Box>
    </LoginLayout>
  );
};
export default GSTUnRegistered;
