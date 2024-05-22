import React, { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import Styles from "../../styles/toaster.module.scss";
import { sentenceCase } from "@/src/app/signup/util";
import { useDispatch } from "react-redux";
import { clearApiMessage } from "@/src/redux/actionCreator";

const Toaster = () => {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const apiMessage = useSelector(
    (state) => state.apiMessageReducer,
    shallowEqual
  );
  const { errorMessage } = apiMessage;
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        dispatch(clearApiMessage());
      }, 3000);
    }
  }, [errorMessage]);
  return (
    <>
      {errorMessage && (
        <Snackbar
          className={Styles.snackBar_wrap}
          open={errorMessage}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          // onClose={() => setIsVisible(false)}
        >
          <p className={Styles.toaster_wrap}>{sentenceCase(errorMessage)}</p>
        </Snackbar>
      )}
    </>
  );
};

export default Toaster;
