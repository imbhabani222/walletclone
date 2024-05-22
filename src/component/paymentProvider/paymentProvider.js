import React, { useEffect, useState } from "react";
import styles from "../kycPrefSetting/kycPrefSettings.module.scss";
import {
  Box,
  Button,
  Snackbar,
  Grid,
  TextField,
  Typography,
  MenuItem,
  OutlinedInput,
  Select,
  InputLabel,
  FormControl,
  Divider,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/image";
import editicon from "../../../public/productImg/edit.svg";
import Auth from "../../config/auth";
import { useForm, Controller } from "react-hook-form";
import {
  fetchPaymentProviders,
  updatePaymentProviders,
  allOrg,
  getProduct,
  fetchPrefrenceList,
  clearUpdatePaymentProviders,
  clearFetchPrefrenceList,
  dependentProduct,
} from "@/src/redux/actionCreator/allOrgMethod";
import { apiFailureAlert } from "@/src/redux/actionCreator";

const horizontal = "center";
const vertical = "top";

const PaymentProvider = () => {
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState(false);
  const [prefrencesList, setPrefrencesList] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedPro, setSelectedPro] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [selectedProductList, setSelectedProductList] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );

  const {
    updatePaymentProviders: { resultData: updatePaymentProviderPref },
    fetchPrefrenceList: { resultData: prefrenceListReponse },
    fetchPaymentProviders: { resultData: fetchPaymentProvidersList, isLoading },
    allOrg: { resultData: allOrgResponse },
    dependantProductData: { resultData: byRoleData },
    getProducts: { resultData: getProductData },
    updateProductData: { resultData: updateProductResponse },
  } = reducerData;

  const form = useForm({
    defaultValues: {
      Provider: "",
      orgName: "",
    },
  });

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    register,
    resetField,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    const payload = {
      headers: {
        orgid: Auth.getUserDetails()?.orgId,
        tenantid: Auth.getUserDetails()?.tenantId,
      },
    };
    dispatch(fetchPaymentProviders());
    dispatch(allOrg(payload));

    return () => {
      dispatch(clearFetchPrefrenceList());
    };
  }, []);

  useEffect(() => {
    if (selectedOrg) {
      const payload = {
        headers: {
          orgid: selectedOrg,
          tenantid: Auth.getUserDetails()?.tenantId,
          resourceId:
            Auth.getRole() === "ProductOwner"
              ? Auth.getUserDetails()?.resourceId
              : null,
        },
      };
      dispatch(getProduct(payload));
      dispatch(dependentProduct(payload));
    }
  }, [
    selectedOrg,
    selectedPro,
    updatePaymentProviderPref,
    updateProductResponse,
  ]);
  console.log(selectedRadio);
  useEffect(() => {
    if (selectedOrg && selectedPro && selectedFeature) {
      dispatch(
        fetchPrefrenceList({
          query: `?orgId=${selectedOrg}&productId=${selectedPro}&providerFeature=${
            selectedFeature !== "QR/Payment link"
              ? selectedFeature
              : selectedRadio
          }`,
        })
      );
    }
  }, [
    selectedFeature,
    selectedOrg,
    selectedPro,
    selectedRadio,
    updatePaymentProviderPref,
  ]);

  useEffect(() => {
    if (getProductData) {
      const { data } = getProductData;
      formatData(data);
    }
  }, [getProductData]);

  const formatData = (data) => {
    data?.forEach((element) => {
      element.productsData = element?.products
        ?.toString()
        .replaceAll(",", ", ");
    });
    setSelectedProductList([...data]);
  };

  useEffect(() => {
    if (prefrenceListReponse?.data?.rows?.length > 0) {
      const {
        data: { rows },
      } = prefrenceListReponse;
      rows?.map((item) => {
        setValue(`preference ${item.preference}`, item.providername);
      });
      rows?.map((item) => {
        if (item.providername === "PhonePe") {
          setValue(`saltIndex_${item?.preference}`, item.PhonePe_SaltIndex);
          setValue(`saltKey_${item?.preference}`, item.PhonePe_SaltKey);
          setValue(`merchantID_${item?.preference}`, item.PhonePe_MerchantId);
        } else if (item.providername === "Razorpay") {
          setValue(`keyId_${item?.preference}`, item.razorpay_Id);
          setValue(`keySecret_${item?.preference}`, item.razorpay_Secret);
        } else {
          setValue(`keyId_${item?.preference}`, item.cashfree_id);
          setValue(`keySecret_${item?.preference}`, item.cashfree_secret);
        }
      });
      // rows?.length === 1
      //   ? (setValue("preference 2", "none"), setValue("preference 3", "none"))
      //   : null;
      rows?.length === 1 ? setValue("preference 2", "none") : null;
      const preference = rows.sort((a, b) => a.preference - b.preference);
      // setPrefrencesList(preference);
      setIsEdit(null);
    } else {
      if (getValues()) {
        const formData = getValues();
        for (const key in formData) {
          if (Object.hasOwnProperty.call(formData, key)) {
            if (key.startsWith("preference")) {
              setValue(`${key}`, "none");
            } else {
              setValue(`${key}`, formData[key]);
            }
          }
        }
      }

      // setValue(`saltIndex_PhonePe`, undefined);
      // setValue(`saltKey_PhonePe`, undefined);
      // setValue(`merchantID_PhonePe`, undefined);

      // setValue(`keyId_Razorpay`, undefined);
      // setValue(`keySecret_Razorpay`, undefined);

      // setValue(`keyId_Cashfree`, undefined);
      // setValue(`keySecret_Cashfree`, undefined);
    }
    if (fetchPaymentProvidersList?.data?.rows?.length > 0) {
      const preferenceList = fetchPaymentProvidersList?.data?.rows
        ?.filter((item) => item.name !== "ICICI")
        ?.map((item, index) => {
          return {
            preference: index + 1,
            providername: item.name,
          };
        });

      setPrefrencesList(preferenceList);
    }
  }, [prefrenceListReponse, fetchPaymentProvidersList]);

  useEffect(() => {
    if (updatePaymentProviderPref) {
      setSnackBar(true);
      setTimeout(() => setSnackBar(false), 1500);
      dispatch(clearUpdatePaymentProviders());
      setIsEdit(null);
    }
  }, [updatePaymentProviderPref]);

  const handleChange = (data, index, provider) => {
    const {
      target: { value },
    } = data;
    setValue(`preference ${index}`, value);
    if (value !== provider) {
      if (value === "PhonePe") {
        setValue(`saltIndex_${index}`, "");
        setValue(`saltKey_${index}`, "");
        setValue(`merchantID_${index}`, "");
      } else if (value === "Razorpay") {
        setValue(`keyId_${index}`, "");
        setValue(`keySecret_${index}`, "");
      } else {
        setValue(`keyId_${index}`, "");
        setValue(`keySecret_${index}`, "");
      }
    }
    setIsEdit(index);
  };

  const clearField = (id) => {
    setIsEdit(id);
  };
  const onOrgChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOrg(value);
    setValue("orgName", value);
  };
  const onProductChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedType(
      selectedProductList?.filter((e) => e?.productid === value)?.[0]?.type
    );
    setSelectedPro(value);
    // setSelectedRadio(null);
    setValue("ProName", value);
  };
  const onProviderChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedFeature(value);

    setValue("feature", value);
  };
  const onRadioChange = (event) => {
    console.log(event);
    const {
      target: { value },
    } = event;
    setSelectedRadio(value);
    setValue("paymentfeature", value);
  };
  const hasDuplicatePreferences = (data) => {
    const preferences = Object.keys(data).filter((key) =>
      key.startsWith("preference ")
    );
    const preferenceValues = preferences
      .map((key) => data[key])
      .filter((value) => value !== "none");
    console.log(preferenceValues);
    if (preferenceValues.length === 0 || preferenceValues.length === 1) {
      return true;
    } else {
      const uniquePreferenceValues = preferenceValues.filter(
        (item, index) => preferenceValues.indexOf(item) !== index
      );

      return uniquePreferenceValues.length === 0 ? true : false;
    }

    // return uniquePreferenceValues.size !== preferenceValues.length;
  };
  const onSubmit = (data) => {
    let preferences = [];
    if (isDirty) {
      const pref1 = data?.["preference 1"];
      const pref2 = data?.["preference 2"];
      const pref3 = data?.["preference 3"];

      const allUnique = hasDuplicatePreferences(data);
      // const pref2None = pref2 === "none";
      // const pref3None = pref3 === "none";
      console.log(allUnique, "un", pref1, pref2, pref3);

      if (allUnique) {
        if (data?.["preference 1"]) {
          if (data?.["preference 2"]) {
            if (data?.["preference 3"]) {
              //1,2,3
              preferences = setPref(data?.["preference 1"], [], data, 1);
              preferences = setPref(
                data?.["preference 2"],
                preferences,
                data,
                2
              );
              preferences = setPref(
                data?.["preference 3"],
                preferences,
                data,
                3
              );
            } else {
              //1,2
              preferences = setPref(data?.["preference 1"], [], data, 1);
              preferences = setPref(
                data?.["preference 2"],
                preferences,
                data,
                2
              );
            }
          } else {
            if (data?.["preference 3"]) {
              //1,3
              preferences = setPref(data?.["preference 1"], [], data, 1);
              preferences = setPref(
                data?.["preference 3"],
                preferences,
                data,
                2
              );
            } else {
              //1
              preferences = setPref(data?.["preference 1"], [], data, 1);
            }
          }
        } else {
          dispatch(apiFailureAlert("Select atleast One preference"));
        }
        const payload = {
          preferences,
        };
        dispatch(updatePaymentProviders(payload));
      } else {
        dispatch(apiFailureAlert("One or more Preference have same value"));
      }
    } else {
      dispatch(apiFailureAlert("Please update the field"));
    }
  };

  function setPref(pg, oldPref, data, priority) {
    switch (pg) {
      case "Razorpay":
        oldPref.push({
          orgid: selectedOrg,
          productId: selectedPro,
          providerFeature:
            selectedFeature !== "QR/Payment link"
              ? data?.feature
              : data?.paymentfeature,
          providername: "Razorpay",
          orgname: allOrgResponse?.data?.filter(
            (item) => item.id === selectedOrg
          )?.[0]?.name,
          providerid: fetchPaymentProvidersList?.data?.rows?.filter(
            (item) => item.name === "Razorpay"
          )?.[0]?.id,
          preference: priority,
          razorpay_Id: data?.[`keyId_${priority}`],
          razorpay_Secret: data?.[`keySecret_${priority}`],
        });
        break;
      case "PhonePe":
        oldPref.push({
          orgid: selectedOrg,
          productId: selectedPro,
          providerFeature:
            selectedFeature !== "QR/Payment link"
              ? data?.feature
              : data?.paymentfeature,
          providername: "PhonePe",
          orgname: allOrgResponse?.data?.filter(
            (item) => item.id === selectedOrg
          )?.[0]?.name,
          providerid: fetchPaymentProvidersList?.data?.rows?.filter(
            (item) => item.name === "PhonePe"
          )?.[0]?.id,
          preference: priority,
          PhonePe_SaltIndex: data?.[`saltIndex_${priority}`],
          PhonePe_SaltKey: data?.[`saltKey_${priority}`],
          PhonePe_MerchantId: data?.[`merchantID_${priority}`],
        });
        break;
      case "Cashfree":
        oldPref.push({
          orgid: selectedOrg,
          productId: selectedPro,
          providerFeature:
            selectedFeature !== "QR/Payment link"
              ? data?.feature
              : data?.paymentfeature,
          providername: "Cashfree",
          orgname: allOrgResponse?.data?.filter(
            (item) => item.id === selectedOrg
          )?.[0]?.name,
          providerid: fetchPaymentProvidersList?.data?.rows?.filter(
            (item) => item.name === "Cashfree"
          )?.[0]?.id,
          preference: priority,
          cashfree_Id: data?.[`keyId_${priority}`],
          cashfree_Secret: data?.[`keySecret_${priority}`],
        });
        break;

      default:
        break;
    }
    return oldPref;
  }
  return isLoading === true ? (
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <FormControl className={styles.orgList_select} size="small">
              <InputLabel id="demo-multiple-name-label">
                Organisation Name
              </InputLabel>
              <Controller
                name="orgName"
                control={control}
                defaultValue={watch("orgName") ?? ""}
                rules={{
                  required: "Please select Organisation Name",
                }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    error={!!errors?.orgName}
                    onChange={(e) => onOrgChange(e)}
                    input={<OutlinedInput label={"Organisation Name"} />}
                    value={value}
                  >
                    {allOrgResponse?.data
                      ?.filter((item) => item.verificationStatus === "approve")
                      .map(({ name, id }) => (
                        <MenuItem key={id} value={id}>
                          {name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              ></Controller>
              {!errors?.orgName?.ref?.value && (
                <span className={styles.errorSetting}>
                  {errors?.orgName?.message}
                </span>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <FormControl className={styles.orgList_select} size="small">
              <InputLabel id="demo-multiple-name-label">
                Product name
              </InputLabel>
              <Controller
                name="ProName"
                control={control}
                defaultValue={watch("ProName") ?? ""}
                rules={{ required: "Please select Product name" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    error={!!errors?.ProName}
                    onChange={(e) => onProductChange(e)}
                    value={value}
                    input={<OutlinedInput label={"Product name"} />}
                  >
                    {selectedProductList &&
                      selectedProductList
                        ?.filter((item) => item.ownershipType === "Self")
                        .map((ele) => (
                          <MenuItem key={ele?.productid} value={ele?.productid}>
                            {ele?.name}
                          </MenuItem>
                        ))}
                  </Select>
                )}
              ></Controller>
              {!errors?.ProName?.ref?.value && (
                <span className={styles.errorSetting}>
                  {errors.ProName?.message}
                </span>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <FormControl className={styles.orgList_select} size="small">
              <InputLabel id="demo-multiple-name-label">
                Provider Feature
              </InputLabel>
              <Controller
                name="feature"
                control={control}
                defaultValue={watch("feature") ?? ""}
                rules={{
                  required: "Please select Provider Feature",
                }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    error={!!errors?.feature}
                    onChange={(e) => onProviderChange(e)}
                    input={<OutlinedInput label={"Provider Feature"} />}
                    value={value}
                  >
                    <MenuItem value={"Payment Gateway"}>
                      Payment Gateway{" "}
                    </MenuItem>
                    <MenuItem value={"QR/Payment link"}>
                      QR/Payment link
                    </MenuItem>
                  </Select>
                )}
              ></Controller>
              {!errors?.feature?.ref?.value && (
                <span className={styles.errorSetting}>
                  {errors?.feature?.message}
                </span>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          className={styles.pg_container_body_payment_gatewayProvider}
        >
          <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
            {selectedFeature === "QR/Payment link" ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography className={styles.provider_title}>
                  {" "}
                  QR/Payment Link
                </Typography>
                <Divider fullWidth style={{ margin: "10px 0" }} />
                <Controller
                  name="paymentfeature"
                  control={control}
                  defaultValue={watch("paymentfeature") ?? ""}
                  rules={{
                    required: "Please select any",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      row
                      value={value}
                      onChange={onRadioChange}
                      style={{ justifyContent: "start" }}
                    >
                      <FormControlLabel
                        value="qr"
                        control={
                          <Radio
                            sx={{
                              color: "#3633B7",
                              "&.Mui-checked": {
                                color: "#3633B7",
                              },
                            }}
                          />
                        }
                        label={"QR"}
                      />
                      <FormControlLabel
                        value="paymentlink"
                        control={
                          <Radio
                            sx={{
                              color: "#3633B7",
                              "&.Mui-checked": {
                                color: "#3633B7",
                              },
                            }}
                          />
                        }
                        label={"Payment Link"}
                      />
                    </RadioGroup>
                  )}
                ></Controller>
                {!errors?.paymentfeature?.ref?.value && (
                  <span className={styles.errorSetting}>
                    {errors?.paymentfeature?.message}
                  </span>
                )}
              </Grid>
            ) : selectedFeature === "Payment Gateway" ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography className={styles.provider_title}>
                  {" "}
                  Payment Gateway{" "}
                  {selectedType === "D2C" ? "(Split)" : "(Single)"}
                </Typography>
                <Divider fullWidth style={{ margin: "10px 0" }} />
              </Grid>
            ) : null}

            <Grid container>
              {prefrencesList?.length > 0 && selectedType !== "D2C"
                ? prefrencesList
                    ?.filter((item) => item.providername !== "ICICI")
                    ?.map(({ preference, providername }) => (
                      <>
                        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                          <Typography className={styles.preference_title}>
                            Preference {preference}
                          </Typography>
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} lg={5} xl={5}>
                          <FormControl
                            className={styles.input_full_width}
                            size="small"
                          >
                            <Controller
                              name={`preference ${preference}`}
                              control={control}
                              defaultValue={
                                watch(`preference ${preference}`) ?? "none"
                              }
                              rules={{
                                required:
                                  "Please select payment gateway provider",
                              }}
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  // fullWidth
                                  disabled={
                                    prefrenceListReponse?.data?.rows?.length ===
                                    0
                                      ? false
                                      : isEdit !== preference
                                      ? true
                                      : false
                                  }
                                  error={!!errors?.preference}
                                  onChange={(e) =>
                                    handleChange(e, preference, providername)
                                  }
                                  placeholder="Payment Provider"
                                  value={value}
                                >
                                  {fetchPaymentProvidersList?.data?.rows
                                    ?.filter((item) => item.name !== "ICICI")
                                    ?.map(({ name, id }) => (
                                      <MenuItem key={id} value={name}>
                                        {name}
                                      </MenuItem>
                                    ))}
                                  {preference !== 1 && (
                                    <MenuItem key={"none"} value={"none"}>
                                      None
                                    </MenuItem>
                                  )}
                                </Select>
                              )}
                            ></Controller>
                            {!errors?.[preference]?.ref?.value && (
                              <span className={styles.errorSetting}>
                                {errors?.[preference]?.message}
                              </span>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                          <Image
                            alt="editicon"
                            {...editicon}
                            onClick={() => clearField(preference)}
                            className={styles.image_align}
                          />
                        </Grid>

                        {isEdit === preference &&
                        watch(`preference ${preference}`) === "Razorpay" ? (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`keyId_${preference}`, {
                                  required: "Please enter Razorpay Key ID",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                defaultValue={
                                  watch(`keyId_${preference}`) ?? ""
                                }
                                label={"Razorpay Key ID"}
                                className={styles.form_input}
                                error={!!errors?.[`keyId_${preference}`]}
                                helperText={
                                  !!errors?.[`keyId_${preference}`] &&
                                  errors?.[`keyId_${preference}`]?.message
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`keySecret_${preference}`, {
                                  required: "Please enter Razorpay Key Secret",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                label={"Razorpay Key Secret"}
                                defaultValue={
                                  watch(`keySecret_${preference}`) ?? ""
                                }
                                className={styles.form_input}
                                error={!!errors?.[`keySecret_${preference}`]}
                                helperText={
                                  !!errors?.[`keySecret_${preference}`] &&
                                  errors?.[`keySecret_${preference}`]?.message
                                }
                              />
                            </Grid>
                          </>
                        ) : isEdit === preference &&
                          watch(`preference ${preference}`) === "PhonePe" ? (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`saltIndex_${preference}`, {
                                  required: "Please enter Salt Index",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                // placeholder={"SaltIndex"}
                                label={"SaltIndex"}
                                defaultValue={
                                  watch(`saltIndex_${preference}`) ?? ""
                                }
                                className={styles.form_input}
                                error={!!errors?.[`saltIndex_${preference}`]}
                                helperText={
                                  !!errors?.[`saltIndex_${preference}`] &&
                                  errors?.[`saltIndex_${preference}`]?.message
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`saltKey_${preference}`, {
                                  required: "Please enter Salt Key",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                label={"SaltKey"}
                                defaultValue={
                                  watch(`saltKey_${preference}`) ?? ""
                                }
                                className={styles.form_input}
                                error={!!errors?.[`saltKey_${preference}`]}
                                helperText={
                                  !!errors?.[`saltKey_${preference}`] &&
                                  errors?.[`saltKey_${preference}`]?.message
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`merchantID_${preference}`, {
                                  required: "Please enter Merchant ID",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                label={"Merchant ID"}
                                className={styles.form_input}
                                defaultValue={
                                  watch(`merchantID_${preference}`) ?? ""
                                }
                                error={!!errors?.[`merchantID_${preference}`]}
                                helperText={
                                  !!errors?.[`merchantID_${preference}`] &&
                                  errors?.[`merchantID_${preference}`]?.message
                                }
                              />
                            </Grid>
                          </>
                        ) : isEdit === preference &&
                          watch(`preference ${preference}`) === "Cashfree" ? (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`keyId_${preference}`, {
                                  required: "Please enter Cashfree Key ID",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                defaultValue={
                                  watch(`keyId_${preference}`) ?? ""
                                }
                                label={"Cashfree Key ID"}
                                className={styles.form_input}
                                error={!!errors?.[`keyId_${preference}`]}
                                helperText={
                                  !!errors?.[`keyId_${preference}`] &&
                                  errors?.[`keyId_${preference}`]?.message
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`keySecret_${preference}`, {
                                  required: "Please enter Cashfree Key Secret",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                label={"Cashfree Key Secret"}
                                defaultValue={
                                  watch(`keySecret_${preference}`) ?? ""
                                }
                                className={styles.form_input}
                                error={!!errors?.[`keySecret_${preference}`]}
                                helperText={
                                  !!errors?.[`keySecret_${preference}`] &&
                                  errors?.[`keySecret_${preference}`]?.message
                                }
                              />
                            </Grid>
                          </>
                        ) : null}
                      </>
                    ))
                : prefrencesList
                    ?.filter(
                      (item) =>
                        item.providername !== "ICICI" &&
                        item.providername !== "PhonePe"
                    )
                    ?.map(({ preference, providername }) => (
                      <>
                        {console.log(providername, "providername")}
                        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                          <Typography className={styles.preference_title}>
                            Preference {preference}
                          </Typography>
                        </Grid>
                        <Grid item xs={10} sm={10} md={10} lg={5} xl={5}>
                          <FormControl
                            className={styles.input_full_width}
                            size="small"
                          >
                            <Controller
                              name={`preference ${preference}`}
                              control={control}
                              defaultValue={
                                watch(`preference ${preference}`) ?? "none"
                              }
                              rules={{
                                required:
                                  "Please select payment gateway provider",
                              }}
                              render={({ field: { onChange, value } }) => (
                                <Select
                                  // fullWidth
                                  disabled={
                                    prefrenceListReponse?.data?.rows?.length ===
                                    0
                                      ? false
                                      : isEdit !== preference
                                      ? true
                                      : false
                                  }
                                  error={!!errors?.preference}
                                  onChange={(e) =>
                                    handleChange(e, preference, providername)
                                  }
                                  placeholder="Payment Provider"
                                  // input={<OutlinedInput label={"Payment Gateway Provider"} />}
                                  value={value}
                                >
                                  {fetchPaymentProvidersList?.data?.rows
                                    ?.filter(
                                      (item) =>
                                        item.name !== "ICICI" &&
                                        item.name !== "PhonePe"
                                    )
                                    ?.map(({ name, id }) => (
                                      <MenuItem key={id} value={name}>
                                        {name}
                                      </MenuItem>
                                    ))}
                                  {preference !== 1 && (
                                    <MenuItem key={"none"} value={"none"}>
                                      None
                                    </MenuItem>
                                  )}
                                </Select>
                              )}
                            ></Controller>
                            {!errors?.[preference]?.ref?.value && (
                              <span className={styles.errorSetting}>
                                {errors?.[preference]?.message}
                              </span>
                            )}
                          </FormControl>
                        </Grid>

                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                          <Image
                            alt="editicon"
                            {...editicon}
                            onClick={() => clearField(preference)}
                            className={styles.image_align}
                          />
                        </Grid>

                        {isEdit === preference &&
                        watch(`preference ${preference}`) === "Razorpay" ? (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`keyId_${preference}`, {
                                  required: "Please enter Razorpay Key ID",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                defaultValue={
                                  watch(`keyId_${preference}`) ?? ""
                                }
                                label={"Razorpay Key ID"}
                                className={styles.form_input}
                                error={!!errors?.[`keyId_${preference}`]}
                                helperText={
                                  !!errors?.[`keyId_${preference}`] &&
                                  errors?.[`keyId_${preference}`]?.message
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`keySecret_${preference}`, {
                                  required: "Please enter Razorpay Key Secret",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                label={"Razorpay Key Secret"}
                                defaultValue={
                                  watch(`keySecret_${preference}`) ?? ""
                                }
                                className={styles.form_input}
                                error={!!errors?.[`keySecret_${preference}`]}
                                helperText={
                                  !!errors?.[`keySecret_${preference}`] &&
                                  errors?.[`keySecret_${preference}`]?.message
                                }
                              />
                            </Grid>
                          </>
                        ) : isEdit === preference &&
                          watch(`preference ${preference}`) === "PhonePe" ? (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`saltIndex_${preference}`, {
                                  required: "Please enter Salt Index",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                // placeholder={"SaltIndex"}
                                label={"SaltIndex"}
                                defaultValue={
                                  watch(`saltIndex_${preference}`) ?? ""
                                }
                                className={styles.form_input}
                                error={!!errors?.[`saltIndex_${preference}`]}
                                helperText={
                                  !!errors?.[`saltIndex_${preference}`] &&
                                  errors?.[`saltIndex_${preference}`]?.message
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`saltKey_${preference}`, {
                                  required: "Please enter Salt Key",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                label={"SaltKey"}
                                defaultValue={
                                  watch(`saltKey_${preference}`) ?? ""
                                }
                                className={styles.form_input}
                                error={!!errors?.[`saltKey_${preference}`]}
                                helperText={
                                  !!errors?.[`saltKey_${preference}`] &&
                                  errors?.[`saltKey_${preference}`]?.message
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`merchantID_${preference}`, {
                                  required: "Please enter Merchant ID",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                label={"Merchant ID"}
                                className={styles.form_input}
                                defaultValue={
                                  watch(`merchantID_${preference}`) ?? ""
                                }
                                error={!!errors?.[`merchantID_${preference}`]}
                                helperText={
                                  !!errors?.[`merchantID_${preference}`] &&
                                  errors?.[`merchantID_${preference}`]?.message
                                }
                              />
                            </Grid>
                          </>
                        ) : isEdit === preference &&
                          watch(`preference ${preference}`) === "Cashfree" ? (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`keyId_${preference}`, {
                                  required: "Please enter Cashfree Key ID",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                defaultValue={
                                  watch(`keyId_${preference}`) ?? ""
                                }
                                label={"Cashfree Key ID"}
                                className={styles.form_input}
                                error={!!errors?.[`keyId_${preference}`]}
                                helperText={
                                  !!errors?.[`keyId_${preference}`] &&
                                  errors?.[`keyId_${preference}`]?.message
                                }
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={4}
                              xl={4}
                            ></Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <TextField
                                {...register(`keySecret_${preference}`, {
                                  required: "Please enter Cashfree Key Secret",
                                })}
                                size="small"
                                fullWidth
                                variant="outlined"
                                label={"Cashfree Key Secret"}
                                defaultValue={
                                  watch(`keySecret_${preference}`) ?? ""
                                }
                                className={styles.form_input}
                                error={!!errors?.[`keySecret_${preference}`]}
                                helperText={
                                  !!errors?.[`keySecret_${preference}`] &&
                                  errors?.[`keySecret_${preference}`]?.message
                                }
                              />
                            </Grid>
                          </>
                        ) : null}
                      </>
                    ))}

              {prefrencesList?.length !== 0 && (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={10}
                  xl={10}
                  style={{ marginLeft: "56%" }}
                >
                  <Button type="submit" className={styles.pg_btn_submit}>
                    Submit
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Snackbar
              className={styles.snackBar_wrap}
              open={snackBar}
              anchorOrigin={{ vertical, horizontal }}
            >
              <div className={styles.snackBar}>
                <p className={styles.snackBar_title}>
                  Payment Gateway Provider updated Successfully
                </p>
              </div>
            </Snackbar>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PaymentProvider;
