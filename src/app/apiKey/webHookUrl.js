import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  Snackbar,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import editicon from "../../../public/productImg/edit.svg";
import styles from "../../component/wtSetting/wtSettings.module.scss";
import Auth from "@/src/config/auth";
import {
  getWebHookURL,
  createWebHookURL,
  ClearcreateWebHookURL,
} from "@/src/redux/actionCreator/allOrgMethod";

const horizontal = "center";
const vertical = "top";

const WebHookURL = () => {
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );

  const {
    getWebHookURL: { resultData: getWebHookURLResponse },
    createWebHookURL: { resultData: createWebHookURLResponse },
  } = reducerData;
  const form = useForm({
    defaultValues: {
      productName: "",
      walletCharge: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    resetField,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const payload = {
      params: `?productId=${Auth.getUserDetails()?.resourceId}`,
    };
    dispatch(getWebHookURL(payload));
  }, []);

  useEffect(() => {
    if (createWebHookURLResponse) {
      setSnackBar(true);
      const payload = {
        params: `?productId=${Auth.getUserDetails()?.resourceId}`,
      };
      dispatch(getWebHookURL(payload));
    }
  }, [createWebHookURLResponse]);

  useEffect(() => {
    if (getWebHookURLResponse?.data) {
      setValue("url", getWebHookURLResponse?.data?.callbackUrl);
      setisEdit(true);
      setTimeout(() => setSnackBar(false), 1500);
      dispatch(ClearcreateWebHookURL());
    }
  }, [getWebHookURLResponse]);

  const onSubmit = (data) => {
    const payload = {
      body: {
        productId: Auth.getUserDetails()?.resourceId,
        callbackUrl: data?.url,
      },
    };
    dispatch(createWebHookURL(payload));
  };

  const handleChange = (data) => {
    const {
      target: { value },
    } = data;
  };

  const clearField = () => {
    setisEdit(false);
    // resetField("walletCharge");
  };
  return (
    <Box className={styles.pg_container_wrapper}>
      <Box className={styles.pg_container_wrapper_heading}>
        <Grid container className={styles.pg_container_body_url}>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}
                  style={{ paddingTop: "7px" }}
                >
                  <Typography variant="p">Callback URL</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <TextField
                    fullWidth
                    // className={styles.input_full_width}
                    disabled={isEdit}
                    {...register("url", {
                      required: "Please enter webhook url",
                      // pattern: {
                      //   value: new RegExp(
                      //     /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/
                      //   ),
                      //   message: "Invalid URL",
                      // },
                    })}
                    error={!!errors.url}
                    helperText={!!errors.url && errors.url?.message}
                    hiddenLabel
                    inputProps={{
                      style: {
                        height: "0.5rem",
                        //   width: "22.5rem",
                        backgroundColor: "#ffffff",
                        border: "1px solid #DDDDDD",
                        borderRadius: "5px",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                  <Image
                    alt="editicon"
                    {...editicon}
                    onClick={() => clearField()}
                    className={styles.image_align}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={10}
                  xl={10}
                  style={{ textAlign: "end" }}
                >
                  <Button type="submit" className={styles.pg_btn_submit}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Snackbar
              className={styles.snackBar_wrap}
              open={snackBar}
              anchorOrigin={{ vertical, horizontal }}
            >
              <div className={styles.snackBar}>
                <p className={styles.snackBar_title}>
                  WebHookURL updated Successfully
                </p>
              </div>
            </Snackbar>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default WebHookURL;
