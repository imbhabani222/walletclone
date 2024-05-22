"use client";
import React, { useEffect, useState } from "react";
import { Grid, Stepper, Step, StepLabel } from "@mui/material";
import LoginLayout from "@/src/component/loginLayout";
import Styles from "../../styles/kyc.module.scss";
import GST from "../gst/page";
import {
  QontoConnector,
  QontoStepIcon,
  returnStepperLabel,
} from "../../utils/stepper";
import PAN from "../pan/page";
import AdditonalProof from "../aaditionalProof/page";
import SignatoryPan from "../signatoryPan/page";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/navigation";

const KYCVerification = () => {
  const [stepOptions, setStepOptions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const reducerData = useSelector(
    (state) => state.orgDataReducer || null,
    shallowEqual
  );
  const reducerData1 = useSelector(
    (state) => state.signupReducer || null,
    shallowEqual
  );
  const {
    createOrg: { resultData, isLoading },
  } = reducerData1;

  const router = useRouter();

  useEffect(() => {
    if (reducerData) {
      const data = returnStepperLabel(reducerData?.data);
      setStepOptions([...data]);
    }
  }, [reducerData]);

  const gotoNext = () => {
    const length = stepOptions?.length;
    // console.log(length, currentStep);
    if (length === currentStep + 1) {
      router.push("/verificationSuccess");
    }
    setCurrentStep((current) => current + 1);
  };

  return (
    <LoginLayout>
      <Grid container className={Styles.kyc_wrap}>
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
          <Stepper
            alternativeLabel
            activeStep={currentStep}
            connector={<QontoConnector />}
          >
            {stepOptions.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        {stepOptions?.[currentStep] === "Proof of Business" ? (
          <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <GST onGoNext={gotoNext} />
          </Grid>
        ) : stepOptions?.[currentStep] === "Proof of Identity" ? (
          <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <PAN onGoNext={gotoNext} />
          </Grid>
        ) : stepOptions?.[currentStep] === "Additional Proof" ||
          stepOptions?.[currentStep] === "Additional Proof(part 1)" ? (
          <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <AdditonalProof onGoNext={gotoNext} />
          </Grid>
        ) : stepOptions?.[currentStep] === "Additional Proof(part 2)" ? (
          <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            <SignatoryPan onGoNext={gotoNext} />
          </Grid>
        ) : null}
      </Grid>
    </LoginLayout>
  );
};

export default KYCVerification;
