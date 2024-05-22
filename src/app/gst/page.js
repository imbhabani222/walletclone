"use client";
import React from "react";
import KYC from "@/src/component/kyc";
import LABELS from "@/src/constant/label";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  kycVerify,
  kycVerifyclear,
} from "@/src/redux/actionCreator/signupMethod";
import { Grid, Skeleton, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Auth from "../../config/auth";
const {
  KYC: {
    GST_TITLE,
    KYC_SUBTEXT,
    GST_LABEL,
    SEARCH_BTN,
    CONTINUE_BTN,
    GST_TAB_NAME,
  },
} = LABELS;

const GST = ({onGoNext}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const reducerData = useSelector(
    (state) => state.signupReducer || null,
    shallowEqual
  );
  const {
    createOrg: { resultData, isLoading: orgLoader },
    kycVerify: { resultData: kycData, isLoading: kycVerifyLoader },
  } = reducerData;

  const onGSTFn = (data) => {
    const payload = {
      params: resultData?.data?.id || Auth.getOrgId(),
      body: {
        gst: data?.GSTIN,
      },
    };
    dispatch(kycVerify(payload));
  };
  const goToNextPage = () => {
    dispatch(kycVerifyclear());
    onGoNext()
  };
  return (
    <KYC
      title={GST_TITLE}
      subText={KYC_SUBTEXT}
      tabName={GST_TAB_NAME}
      label={GST_LABEL}
      btn_name={SEARCH_BTN}
      submit_btn={CONTINUE_BTN}
      callBack={onGSTFn}
      goNext={goToNextPage}
    />

    // <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
    //  {kycLoader && <Skeleton />}
    //   <Card>
    //     <CardContent>
    //             <Typography variant="p">
    //                 PAN: 36AAACC1206D1ZH
    //             </Typography>
    //             <Typography variant="p">
    //                 Name: CENTRAL WAREHOUSING CORPORATION
    //             </Typography>
    //     </CardContent>
    //   </Card>
    // </Grid>
    // </Grid>

    // <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
    //  {kycLoader && <Skeleton />}
    //   <Card>
    //     <CardContent>
    //             <Typography variant="p">
    //                 PAN: 36AAACC1206D1ZH
    //             </Typography>
    //             <Typography variant="p">
    //                 Name: CENTRAL WAREHOUSING CORPORATION
    //             </Typography>
    //     </CardContent>
    //   </Card>
    // </Grid>
    // </Grid>
  );
};
export default GST;
