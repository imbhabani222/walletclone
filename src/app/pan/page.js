"use client"
import React from "react";
import KYC from "@/src/component/kyc";
import LABELS from "@/src/constant/label";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { kycVerify, kycVerifyclear } from "@/src/redux/actionCreator/signupMethod";
import { useRouter } from "next/navigation";
import Auth from "../../config/auth"

const {
    KYC: { PAN_TITLE, PAN_TITLE_1, KYC_SUBTEXT, PAN_LABEL, SEARCH_BTN, CONTINUE_BTN, SIGNATORY_PAN_TAB_NAME, BUSSINESS_PAN_TAB_NAME }
} = LABELS

const bussinessType = [
 "Individual",
 "Proprietorship",
 "Un Registered"
]
const Pan = ({onGoNext}) => {
  const reducerData = useSelector(state => state.orgDataReducer || null, shallowEqual);
  const reducerData1 = useSelector(state=> state.signupReducer || null, shallowEqual);
  const router  = useRouter()

  const { 
    createOrg: { resultData, isLoading },
    kycVerify: { resultData: kycData, isLoading: kycLoader }
  } = reducerData1  
  
  const dispatch = useDispatch();
  const onGetPan = (data) => {
    const payload = {
      params: resultData?.data?.id || Auth.getOrgId(),
  }
  if(bussinessType.includes(reducerData?.data?.bussiness_type || null)){
    payload.body = { signatorypan : data?.[PAN_LABEL]}
  }
  else {
    payload.body = { businesspan : data?.[PAN_LABEL]}

  }

  dispatch(kycVerify(payload))
  }

  const goToNextPage = () => {
    dispatch(kycVerifyclear())
    onGoNext()
   
}
  return (
  <KYC
        title={reducerData?.data?.gst === "No" ? PAN_TITLE_1 : PAN_TITLE}
        subText={KYC_SUBTEXT}
        tabName={bussinessType.includes(reducerData?.data?.bussiness_type || null) ? SIGNATORY_PAN_TAB_NAME: BUSSINESS_PAN_TAB_NAME}
        label={PAN_LABEL}
        btn_name={SEARCH_BTN}
        submit_btn={CONTINUE_BTN}
        callBack = {onGetPan}
        goNext = {goToNextPage}
    />
  )


}
export default Pan