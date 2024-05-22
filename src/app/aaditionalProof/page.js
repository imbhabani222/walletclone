"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import KYC from "@/src/component/kyc";
import LABELS from "@/src/constant/label";
import ALL_CONSTANT from "../../constant/constant";
import ModalData from "./modalData";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  kycVerify,
  kycVerifyclear,
} from "@/src/redux/actionCreator/signupMethod";
import { useRouter } from "next/navigation";
import Auth from "../../config/auth";

const {
  KYC: {
    ADHAR_TITLE,
    ADHAR_TITLE_1,
    KYC_SUBTEXT,
    ADHAR_LABEL,
    SEARCH_BTN,
    SUBMIT_BTN,
    ADHAR_TAB_NAME,
    SIGNATORY_PAN_TAB_NAME,
    PAN_LABEL,
  },
} = LABELS;
const {
  PAGE_ROUTES: { VERIFY_SUCCESS },
} = ALL_CONSTANT;
const Adhar = ({ onGoNext }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [closeModalPopUp, setCloseModalPopUp] = useState(false);
  const reducerData = useSelector(
    (state) => state.signupReducer || null,
    shallowEqual
  );
  const reducerData1 = useSelector(
    (state) => state.orgDataReducer || null,
    shallowEqual
  );
  const {
    register,
    handleClose,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const {
    createOrg: { resultData, isLoading },
    kycVerify: { resultData: kycData, isLoading: kycLoader },
  } = reducerData;

  useEffect(() => {
    if (kycData) {
      const isModalOpen = kycData?.data?.message?.includes(
        "OTP sent" || "OTP Sent"
      )
        ? true
        : false;
      setCloseModalPopUp(isModalOpen);
    }
  }, [kycData]);

  const closeModal = (data) => {
    if (data !== "close") {
      const payload = {
        params: resultData?.data?.id || Auth?.getOrgId(),
        body: {
          otp: data,
        },
      };
      dispatch(kycVerify(payload));
      reset();
      setCloseModalPopUp(false);
    } else {
      dispatch(kycVerifyclear());
      setCloseModalPopUp(false);
    }
  };

  const onGetAadhar = (data) => {
    if (data?.[PAN_LABEL]) {
      const payload = {
        params: resultData?.data?.id || Auth.getOrgId(),
        body: {
          signatorypan: data?.[PAN_LABEL],
        },
      };
      dispatch(kycVerify(payload));
    } else {
      const payload = {
        params: resultData?.data?.id || Auth.getOrgId(),
        body: {
          aadhar: data?.[ADHAR_LABEL],
        },
      };
      dispatch(kycVerify(payload));
    }
  };
  const bussinessType = ["Individual", "Proprietorship", "Un Registered"];

  const goToNextPage = (data) => {
    dispatch(kycVerifyclear());
    onGoNext();
  };
  return (
    <>
      <KYC
        title={reducerData1?.data?.gst === "No" ? ADHAR_TITLE_1 : ADHAR_TITLE}
        subText={KYC_SUBTEXT}
        tabName={ADHAR_TAB_NAME}
        label={ADHAR_LABEL}
        btn_name={SEARCH_BTN}
        submit_btn={SUBMIT_BTN}
        callBack={onGetAadhar}
        goNext={goToNextPage}
      />
      <ModalData visible={closeModalPopUp} handleClose={closeModal} />
    </>
  );
};
export default Adhar;
