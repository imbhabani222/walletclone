"use client";
import React, { useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import LoginLayout from "@/src/component/loginLayout";
import LABELS from "@/src/constant/label";
import Styles from "./signup.module.scss";
import { signup, signUpData } from "@/src/redux/actionCreator/signupMethod";
import Auth from "../../config/auth";

import { sentenceCase } from "./util";

const {
  SIGNIN_SIGNUP_LABELS: {
    LOGIN,
    SIGNUPL,
    LOGIN_SUBMIT_BTN,
    NAME,
    PHONENUMBER,
    EMAIL,
    ALREADY_HAVE_ACCOUNT,
    SIGNIN_FOOTER_TEXT,
    SIGNUP_HEADER,
    LOGIN_TEXT,
  },
} = LABELS;
const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
    },
  });
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
    const allowedCharactersRegex = /^[A-Za-z ]*$/;

    if (!allowedCharactersRegex.test(event.key)) {
      event.preventDefault();
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });
  const reducerData = useSelector(
    (state) => state.signupReducer || null,
    shallowEqual
  );
  const {
    signup: { resultData, isLoading },
  } = reducerData;
  useEffect(() => {
    // console.log(resultData, "resultDataresultDataresultData");
    if (resultData) {
      Auth.set("identityId", resultData?.data?.identityId);
      if (resultData?.data?.email_status) {
        router.push("/verifyotp?email_status");
      } else {
        router.push("/verifyotp");
      }
    }
  }, [resultData]);

  useEffect(() => {
    Auth.removeSessionKey();
  }, []);
  const onSubmit = (data) => {
    const payload = {
      name: sentenceCase(data.name),
      email: data.email.replaceAll(/\s/g, ""),
      role: ["TenantAdmin"],
      mobile: data.phoneNumber,
    };
    dispatch(signUpData(data));
    dispatch(signup(payload));
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
            {SIGNUP_HEADER}
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
              onClick={() => {
                router.push("/login");
              }}
              size="small"
              className={Styles.switchWrap_btn}
              variant="outlined"
            >
              {LOGIN}
            </Button>
            <Button
              size="small"
              className={Styles.switchWrap_btn_active}
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
                type="text"
                {...register("name", {
                  required: "Please enter your name",
                  minLength: {
                    value: 3,
                    message: "Minimum length is 3 characters",
                  },
                })}
                onKeyDown={handleKeyDown}
                variant="outlined"
                label={NAME}
                className={Styles.form_input}
                error={!!errors.name}
                helperText={!!errors.name && errors.name.message}
              />
              <TextField
                type="number"
                onKeyDown={(evt) =>
                  ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
                }
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                {...register("phoneNumber", {
                  required: "Please enter your phone number",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 digit",
                  },
                })}
                variant="outlined"
                label={PHONENUMBER}
                className={Styles.form_input}
                error={!!errors?.phoneNumber}
                helperText={
                  !!errors?.phoneNumber && errors?.phoneNumber?.message
                }
              />
              <TextField
                // type="email"
                type="text"
                {...register("email", {
                  required: false,
                  pattern: {
                    value: new RegExp(
                      /^\w*[A-Za-z]+(?:([._]?\w+)*)\@[A-Za-z]\w*[-]?\w+\.[A-Za-z]{1,}?(\.?[A-Za-z]+)$/
                    ),
                    message: "Invalid email address",
                  },
                })}
                // onKeyDown={handleKeyDown}
                variant="outlined"
                label={EMAIL}
                className={Styles.form_input_not_req}
                error={!!errors.email}
                helperText={!!errors.email && errors.email?.message}
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
                )}
              </Button>
            </Stack>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="p" className={Styles.footer_Text}>
            {ALREADY_HAVE_ACCOUNT}
            <span
              onClick={() => {
                router.push("/login");
              }}
              className={Styles.footer_link}
            >
              {SIGNIN_FOOTER_TEXT}
            </span>
          </Typography>
        </Grid>
      </Grid>
    </LoginLayout>
  );
};

export default SignUp;
