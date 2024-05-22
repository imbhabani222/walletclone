"use client";
import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Axios from "axios";
import { useRouter } from "next/navigation";
import { Grid, Stack, Typography, Box, Snackbar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import successicon from "../../../public/successverify.svg";
import LoginLayout from "@/src/component/loginLayout";
import LABELS from "@/src/constant/label";
import ALL_CONSTANT from "@/src/constant/constant";
import {
  createOrgClear,
  kycVerifyclear,
  ClearAAdhar,
} from "@/src/redux/actionCreator/signupMethod";
import { loginClear } from "@/src/redux/actionCreator/loginMethod";
import URL from "../../config/envURL";
import Auth from "../../config/auth";
import Styles from "./verification.module.scss";
import Image from "next/image";

const {
  KYC: {
    PROOF_OF_IDENTITY,
    VERIFICATION_TITLE,
    ADDITIONAL_PROOF,
    PROOF_OF_BUSSINESS,
    SUCCESS_DATA,
    SUCCESS_MSG,
  },
} = LABELS;
const {
  PAGE_ROUTES: { DASHBOARD, LOGIN },
} = ALL_CONSTANT;
const horizontal = "right";
const vertical = "top";

const VerificationSuccess = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [trackStatus, setTrackStatus] = useState([]);
  const [snackBar, setSnackBar] = useState(false);

  const reducerData1 = useSelector(
    (state) => state.orgDataReducer || null,
    shallowEqual
  );
  const reducerData = useSelector(
    (state) => state.signupReducer || null,
    shallowEqual
  );

  const {
    createOrg: { resultData },
  } = reducerData;
  useEffect(() => {
    setSnackBar(true);
    dispatch(createOrgClear());
    dispatch(ClearAAdhar());
    dispatch(kycVerifyclear());
    dispatch(loginClear());
    if (reducerData1?.data?.gst === "No") {
      setTrackStatus([PROOF_OF_IDENTITY, ADDITIONAL_PROOF]);
    } else {
      setTrackStatus([PROOF_OF_IDENTITY, PROOF_OF_BUSSINESS, ADDITIONAL_PROOF]);
    }
    onUpdateKycStatus();
  }, []);

  const onUpdateKycStatus = async () => {
    const id = resultData?.data?.id || Auth.getOrgId();
    try {
      const reponses = await Axios({
        method: "post",
        url: `${URL.API.baseURL}wallet/api/v1.0/kycstatus/${id}?action=completed`,
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "XXX",
        },
      });
      const redirection =
        localStorage.getItem("redirection") === "true" ? true : false;

      if (redirection) {
        setTimeout(() => router.push(DASHBOARD), 5000);
      } else {
        setTimeout(() => router.push(LOGIN), 5000);
      }
    } catch (error) {}
  };
  const renderTime = ({ remainingTime }) => {
    return (
      <div>
        <div>{remainingTime}</div>
      </div>
    );
  };

  return (
    <LoginLayout>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="center"
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={Styles.kyc_wrap}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box className={Styles.kyc_body_wrap}>
            <Image alt="successicon" {...successicon} />
            <Typography className={Styles.kyc_wrap_text}>
              Thank you for submitting KYC details, your account will be
              approved soon.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
          <Box className={Styles.kyc_wrapper}>
            <CountdownCircleTimer
              isPlaying
              duration={5}
              colors={["#219653", "#219653"]}
              colorsTime={[3, 0]}
              strokeWidth={5}
              size={100}
              onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            >
              {renderTime}
            </CountdownCircleTimer>
          </Box>
        </Grid>
      </Grid>
      {/* <Box sx={{ ml: "6em" }}>
        <Grid
          container
          direction="column"
          justifyContent="left"
          className={Styles.kyc_wrap}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Snackbar
              className={Styles.snackBar_wrap}
              open={snackBar}
              anchorOrigin={{ vertical, horizontal }}
            >
              <div className={Styles.snackBar}>
                <p className={Styles.snackBar_header}>{SUCCESS_DATA}</p>
                <p className={Styles.snackBar_title}>{SUCCESS_MSG}</p>
              </div>
            </Snackbar>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack direction={"Column"}>
              <Typography variant="h3" className={Styles.kyc_title}>
                {VERIFICATION_TITLE}
              </Typography>
              {trackStatus?.map((item, index) => (
                <div key={index} className={Styles.successDiv}>
                  <p className={Styles.successText}>{item}</p>
                  <CheckCircleIcon className={Styles.checkCircle} />
                </div>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box> */}
    </LoginLayout>
  );
};

export default VerificationSuccess;
