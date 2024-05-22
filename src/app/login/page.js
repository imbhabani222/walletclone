"use client";
import React, { useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { login, loginClear } from "@/src/redux/actionCreator/loginMethod";
import { signUpData } from "@/src/redux/actionCreator/signupMethod";
import LoginLayout from "@/src/component/loginLayout";
import LABELS from "@/src/constant/label";
import ALL_CONSTANT from "../../constant/constant";
import Styles from "./login.module.scss";
import Auth from "@/src/config/auth";

const {
  SIGNIN_SIGNUP_LABELS: {
    LOGIN_HEADER,
    LOGIN_TEXT,
    LOGIN,
    SIGNUPL,
    EMAILPHONEKEY,
    EMAILPHONE,
    LOGIN_SUBMIT_BTN,
    DONT_HAVE_ACCOUNT,
    SIGNUP_FOOTER_TEXT,
  },
} = LABELS;
const {
  PAGE_ROUTES: { SIGNUP },
} = ALL_CONSTANT;
const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const reducerData = useSelector(
    (state) => state.loginReducer || null,
    shallowEqual
  );
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
  };

  const {
    login: { resultData, isLoading, errorData },
  } = reducerData;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (resultData) {
      Auth.set("identityId", resultData?.identityId);
      router.push("/verifyotp");
      dispatch(signUpData(null));
    }
  }, [resultData, errorData]);

  useEffect(() => {
    return () => {
      //   dispatch(loginClear());
      localStorage.clear();
    };
  }, []);
  const onSubmit = (data) => {
    const key = data.email.includes("@") ? "email" : "mobile";
    const payload = {
      [key]: data.email.replaceAll(/\s/g, ""),
    };
    Auth.set("loginuser", data?.email);
    dispatch(login(payload));
  };
  return (
    <LoginLayout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={Styles.login_wrap}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h3" className={Styles.login_title}>
            {LOGIN_HEADER}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="p" className={Styles.login_description}>
            {LOGIN_TEXT}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className={Styles.width}
        >
          <Stack direction="row" spacing={2} className={Styles.switchWrap}>
            <Button
              size="small"
              className={Styles.switchWrap_btn_active}
              variant="outlined"
            >
              {LOGIN}
            </Button>
            <Button
              onClick={() => {
                router.push(SIGNUP);
              }}
              size="small"
              className={Styles.switchWrap_btn}
              variant="outlined"
            >
              {SIGNUPL}
            </Button>
          </Stack>
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
            <Stack direction="column" spacing={4}>
              <TextField
                {...register("email", {
                  required: "Please enter your email or phone number",
                })}
                onKeyDown={handleKeyDown}
                variant="outlined"
                label={EMAILPHONE}
                className={Styles.form_input}
                error={!!errors[EMAILPHONEKEY]}
                helperText={
                  !!errors[EMAILPHONEKEY] && errors[EMAILPHONEKEY]?.message
                }
              />
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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="p" className={Styles.footer_Text}>
            {DONT_HAVE_ACCOUNT}
            <span
              onClick={() => {
                router.push(SIGNUP);
              }}
              className={Styles.footer_link}
            >
              {SIGNUP_FOOTER_TEXT}
            </span>
          </Typography>
        </Grid>
      </Grid>
    </LoginLayout>
  );
};
export default Login;
