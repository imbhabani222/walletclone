"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import LoginLayout from "@/src/component/loginLayout";
import LABELS from "@/src/constant/label";
import ALL_CONSTANT from "@/src/constant/constant";
import Auth from "@/src/config/auth";
import {
  signUpData,
  verifyOtp,
  verifyOtpClear,
  clearSignup,
  signup,
} from "@/src/redux/actionCreator/signupMethod";
import {
  resentOtp,
  resendOTPClear,
} from "@/src/redux/actionCreator/loginMethod";
import Styles from "../login/login.module.scss";

const horizontal = "center";
const vertical = "top";

const {
  VERIFYOTP: {
    VERIFYOTP_HEADER,
    VERIFYOTP_TEXT,
    VERIFYOTP,
    VERIFYOTP_BTN,
    DONT_RECEIVED_OTP,
    RESEND,
  },
} = LABELS;
const {
  PAGE_ROUTES: {
    DASHBOARD,
    LOGIN,
    SUPER_ADMIN,
    CREATE_ORGANISATION,
    SETTING,
    APIKEYSET,
    SALES_REGISTER,
    PROSETTINGS,
  },
} = ALL_CONSTANT;

const VerifyOTP = () => {
  const router = useRouter();
  const [snackBar, setSnackBar] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const dispatch = useDispatch();
  const reducerData = useSelector(
    (state) => state.loginReducer || null,
    shallowEqual
  );
  const signupData = useSelector(
    (state) => state.signupReducer || null,
    shallowEqual
  );
  const signupInputData = useSelector(
    (state) => state.signupDataReducer || null,
    shallowEqual
  );

  const {
    login: { resultData, isLoading, errorData },
    resentOTP: { resultData: resendOTPData },
  } = reducerData;
  const {
    verifyOTP: { resultData: verifyOtpData, isLoading: verifyOTPLoader },
  } = signupData;
  const getRole = Auth.getRole();
  const form = useForm({
    defaultValues: {
      OTP: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  useEffect(() => {
    // if (typeof window !== "undefined"){
    if (window.location.href.includes("email_status")) {
      setEmailVerified(true);
    }
    // }
  }, []);

  useEffect(() => {
    // console.log(verifyOtpData, "verifyOtpData");
    if (verifyOtpData) {
      if (signupInputData?.data?.Phone === "verfied" && !verifyOtpData?.token) {
        router.push(LOGIN);
      } else {
        router.push("/verifyotp");
        Auth.set("identityId", verifyOtpData?.identityId);
        Auth.set("roles", verifyOtpData?.roles?.[0]);
        Auth.set("token", verifyOtpData?.token);
        Auth.set("userDetails", verifyOtpData);
        if (verifyOtpData?.roles?.[0] === "SuperAdmin") {
          router.push(SUPER_ADMIN);
        } else if (verifyOtpData?.roles?.[0] === "ProductOwner") {
          router.push(APIKEYSET);
        } else if (verifyOtpData?.roles?.[0] === "FinanceAdmin") {
          router.push(SALES_REGISTER);
        } else if (verifyOtpData?.roles?.[0] === "TenantAdmin") {
          if (Object.values(verifyOtpData?.org)?.length === 0) {
            router.push(CREATE_ORGANISATION);
          } else {
            router.push(DASHBOARD);
          }
        } else if (verifyOtpData?.roles?.[0] === "OrgAdmin") {
          router.push(DASHBOARD);
        }
      }
    }
  }, [verifyOtpData]);

  const reSendOTP = () => {
    const data = Auth.getLoginUser();
    const key = data?.includes("@") ? "email" : "mobile";
    const payload = {
      url: signupInputData?.data ? "identities" : "identities/?action=signin",
    };
    payload.body = signupInputData?.data
      ? {
          name: signupInputData?.data?.name,
          email: signupInputData?.data?.email?.replaceAll(/\s/g, ""),
          mobile: signupInputData?.data?.phoneNumber,
          role: ["TenantAdmin"],
        }
      : {
          [key]: data,
        };
    dispatch(resentOtp(payload));
  };

  useEffect(() => {
    return () => {
      dispatch(verifyOtpClear());
      dispatch(clearSignup());
    };
  }, []);

  useEffect(() => {
    if (resendOTPData) {
      setSnackBar(true);
      dispatch(resendOTPClear());
      setTimeout(() => setSnackBar(false), 1500);
    }
  }, [resendOTPData]);

  const onSubmit = (data) => {
    if (signupInputData?.data) {
      const key =
        signupInputData?.data.email && !emailVerified
          ? "email_otp"
          : "mobile_otp";
      const payload = {
        params: Auth.getIdenitityId(),
        flag: "verify",
        body: {
          [key]: data?.OTP,
        },
      };
      dispatch(verifyOtp(payload));
      if (key === "email_otp") {
        dispatch(signUpData({ ...signupInputData?.data, email: null }));
        reset();
      } else {
        dispatch(
          signUpData({
            ...signupInputData?.data,
            Phone: "verfied",
          })
        );
      }
    } else {
      const key = Auth.getLoginUser().includes("@")
        ? "email_otp"
        : "mobile_otp";
      const payload = {
        params: Auth.getIdenitityId(),
        flag: "verifyOTP",
        body: {
          [key]: data?.OTP,
        },
      };
      dispatch(verifyOtp(payload));
    }
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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} spacing={3}>
          <Typography variant="h3" className={Styles.Verify_login_Otp_title}>
            {resultData?.message?.includes("mail") ||
            (signupInputData?.data?.email && !emailVerified)
              ? `${VERIFYOTP_HEADER} Email`
              : `${VERIFYOTP_HEADER} Phone Number`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} spacing={3}>
          {signupInputData?.data !== null ? (
            <Typography variant="p" className={Styles.login_description}>
              {VERIFYOTP_TEXT + "received to "}
              {emailVerified
                ? signupInputData?.data?.phoneNumber?.substr(0, 3) +
                  "****" +
                  signupInputData?.data?.phoneNumber?.substr(-3)
                : (signupInputData?.data?.email?.substr(0, 3) ||
                    signupInputData?.data?.phoneNumber?.substr(0, 3)) +
                  "****" +
                  (signupInputData?.data?.email?.substr(-3) ||
                    signupInputData?.data?.phoneNumber?.substr(-3))}
            </Typography>
          ) : (
            <Typography variant="p" className={Styles.login_description}>
              {VERIFYOTP_TEXT +
                "received to " +
                Auth.getLoginUser()?.substr(0, 3) +
                "****" +
                Auth.getLoginUser()?.substr(-3)}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className={Styles.verify_otp_width_spacing}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={4}>
              <TextField
                type="number"
                onKeyDown={(evt) =>
                  ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
                }
                // onKeyPress={(evt) => {
                //   if (evt.target.value.length > 6) {
                //     evt.preventDefault();
                //   }
                // }}
                {...register("OTP", {
                  required: "Please enter OTP",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Please enter 6 digit OTP",
                  },
                })}
                variant="outlined"
                label={VERIFYOTP}
                className={Styles.form_input}
                error={!!errors.OTP}
                helperText={!!errors.OTP?.message && errors.OTP?.message}
              />
              <Button
                className={Styles.login_continue_btn}
                type="submit"
                variant="contained"
                fullWidth
              >
                {verifyOTPLoader ? (
                  <DotSpinner size={40} speed={0.9} color="#fff" />
                ) : (
                  VERIFYOTP_BTN
                )}
              </Button>
            </Stack>
          </form>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className={Styles.footer_Text_verify_otp}
        >
          <Typography variant="p" className={Styles.footer_Text}>
            {DONT_RECEIVED_OTP}
            <span className={Styles.footer_link} onClick={() => reSendOTP()}>
              {RESEND}
            </span>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Snackbar
            className={Styles.snackBar_wrap}
            open={snackBar}
            anchorOrigin={{ vertical, horizontal }}
          >
            <div className={Styles.snackBar}>
              <p className={Styles.snackBar_title}>OTP Sent Successfully</p>
            </div>
          </Snackbar>
        </Grid>
      </Grid>
    </LoginLayout>
  );
};

export default VerifyOTP;
