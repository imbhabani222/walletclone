import React, { useEffect, useState } from "react";
import styles from "./kycPrefSettings.module.scss";
import {
  Box,
  Button,
  Snackbar,
  Grid,
  Typography,
  MenuItem,
  OutlinedInput,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/image";
import Axios from "axios";
import { useForm, Controller } from "react-hook-form";
import editicon from "../../../public/productImg/edit.svg";
import Auth from "../../config/auth";
import URL from "../../config/envURL";
import Loader from "../loader/loader";
import { apiFailureAlert } from "@/src/redux/actionCreator";

const horizontal = "center";
const vertical = "top";

const KycPrefSettings = () => {
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [providerList, setProviderList] = useState([]);
  const [prefrencesList, setPrefrencesList] = useState([]);
  const [loading, setLoading] = useState(false);

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
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    getprovidersList();
    getPreferenceList();
  }, []);

  const getprovidersList = async () => {
    // setLoading(true);
    try {
      const response = await Axios({
        method: "get",
        url: `${URL.API.baseURL1}wallet/api/v1.0/fetchproviders`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Auth.getAuthToken(),
        },
      });
      // setLoading(false);
      setProviderList(response?.data?.data);
    } catch (error) {}
  };
  const getPreferenceList = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        method: "get",
        url: `${URL.API.baseURL1}wallet/api/v1.0/fetchprovidersequence`,
        headers: {
          "Content-Type": "application/json",
          Authorization: Auth.getAuthToken(),
        },
      });
      setLoading(false);
      console.log(response, "response")

      setPrefrencesList(response?.data?.data);
      const preferenceResponse = response?.data?.data?.sort(
        (a, b) => a.preference - b.preference
      );
      preferenceResponse.map((item) => {
        setValue(`preference ${item.preference}`, item.name);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prefrencesList?.length > 0) {
      prefrencesList?.map((item) => {
        setValue(`preference ${item.preference}`, item.name);
      });
    }
  }, [prefrencesList]);
  const onSubmit = async (data) => {
    if (isDirty) {
      const sequence = [];
      for (let key in data) {
        sequence.push({
          name: data[key],
          preference: Number(key.replaceAll("preference ", "")),
        });
      }
      const payload = {
        sequence,
      };
      const checkDuplicate = sequence.map((item) => item.name);
      if (
        checkDuplicate.some(
          (object, index) => checkDuplicate.indexOf(object) !== index
        )
      ) {
        dispatch(apiFailureAlert("One or more Preference have same value"));
      } else {
        try {
          const response = await Axios({
            method: "put",
            url: `${URL.API.baseURL1}wallet/api/v1.0/updatePreference`,
            headers: {
              "Content-Type": "application/json",
              Authorization: Auth.getAuthToken(),
            },
            data: payload,
          });
          setSnackBar(true);
          getPreferenceList();
          setTimeout(() => setSnackBar(false), 1500);
        } catch {}
      }
    } else {
      dispatch(apiFailureAlert("Please update the field"));
    }
  };

  const handleChange = (data, preference) => {
    const {
      target: { value },
    } = data;
    setValue(`preference ${preference}`, value, { shouldDirty: true });
  };

  const clearField = (id) => {
    setIsEdit(id);
  };
  return loading === true ? (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "calc(100vh - 290px)",
        background: "#fbfbfb",
      }}
    >
      <DotSpinner size={40} speed={0.9} color="#3633B7" />
    </Box>
  ) : (
    <Box className={styles.pg_container}>
      {/* <Loader isLoading={true} /> */}

      <Typography className={styles.pg_container_heading}>
        {/* Product List */}
      </Typography>
      <Grid container className={styles.pg_container_body}>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <>
                {prefrencesList?.map(({ preference, name, _id }) => (
                  <>
                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                      <Typography className={styles.preference_title}>
                        {`Preference ${preference}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={6} xl={6}>
                      <FormControl
                        className={styles.input_full_width}
                        size="small"
                      >
                        <Controller
                          name={`preference ${preference}`}
                          control={control}
                          defaultValue={watch(`preference ${preference}`) ?? ""}
                          rules={{ required: "Please select KYC Provider" }}
                          render={({ field: { onChange, value } }) => (
                            <Select
                              // fullWidth
                              disabled={isEdit !== _id}
                              error={!!errors?.[`preference ${preference}`]}
                              onChange={(e) => handleChange(e, preference)}
                              value={value}
                            >
                              {providerList?.map(({ name, id }) => (
                                <MenuItem key={id} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        ></Controller>
                        {!errors?.[`preference ${preference}`]?.ref?.value && (
                          <span className={styles.errorSetting}>
                            {errors?.[`preference ${preference}`]?.message}
                          </span>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                      <Image
                        alt="editicon"
                        {...editicon}
                        onClick={() => clearField(_id)}
                        className={styles.image_align}
                      />
                    </Grid>
                  </>
                ))}
              </>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={10}
                xl={10}
                style={{ marginLeft: "56%" }}
              >
                {prefrencesList?.length > 0 && (
                  <Button type="submit" className={styles.pg_btn_submit}>
                    Submit
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Snackbar
            className={styles.snackBar_wrap}
            open={snackBar}
            anchorOrigin={{ vertical, horizontal }}
          >
            <div className={styles.snackBar}>
              <p className={styles.snackBar_title}>
                KYC Preference updated Successfully
              </p>
            </div>
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KycPrefSettings;
