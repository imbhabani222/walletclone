import React, { useEffect, useState, useRef } from "react";
import styles from "./pgSettings.module.scss";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Divider,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  allOrg,
  updatePaymentGateWayCut,
  clearupdatePaymentGateWayCut,
  getPaymentMethod,
  getPaymentMethodClear,
  byRole,
  fetchPaymentProviders,
} from "@/src/redux/actionCreator/allOrgMethod";
import Auth from "../../config/auth";
import { useForm, Controller } from "react-hook-form";

const horizontal = "center";
const vertical = "top";

const PgSettings = (props) => {
  const dispatch = useDispatch();
  const [charge, setCharge] = useState(null);
  const [snackBar, setSnackBar] = useState(false);
  const [productId, setProductId] = useState(null);
  const [productCharge, setProductCharge] = useState(null);
  const [gateWayProvider, setGateWayProvider] = useState(null);
  const [paymentChargeReponse, setPaymentChargeResponse] = useState(null);
  const form = useForm({
    defaultValues: {
      gatewayProvider: "",
      ProList: "",
      productCharge: "",
    },
  });
  const firstErrorRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    clearErrors,
    control,
    setError,
    formState: { errors },
  } = useForm({ mode: "all" });

  useEffect(() => {
    if (firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  const reducerData = useSelector((state) => state.allOrgReducer);
  const {
    allOrg: { resultData },
    byRole: { resultData: byRoleData },
    updatePaymentGateWay: { resultData: paymentgateWayData, errorData },
    fetchPaymentProviders: { resultData: fetchPaymentProvidersList },
    getPaymentCharge: { resultData: paymentCharge },
  } = reducerData;

  useEffect(() => {
    if (props?.isWallet === false) {
      dispatch(getPaymentMethodClear());
      dispatch(fetchPaymentProviders());
    } else {
      if (Auth.getRole() === "ProductOwner") {
        const payload = {
          params: `walletFees?productId=${byRoleData?.data?.[0]?.productid}&name=${gateWayProvider}`,
        };
        dispatch(getPaymentMethod(payload));
      }
      dispatch(getPaymentMethodClear());
    }
  }, [props, gateWayProvider]);

  useEffect(() => {
    const payload = {
      headers: {
        tenantid: Auth.getUserDetails()?.tenantId,
        orgid: Auth.getUserDetails()?.orgId,
        resourceid: Auth.getUserDetails()?.resourceId,
      },
    };
    dispatch(byRole(payload));
  }, []);

  useEffect(() => {
    if (paymentgateWayData) {
      setSnackBar(true);
      const payload = {
        headers: {
          orgid: Auth.getUserDetails()?.orgId,
          tenantid: Auth.getUserDetails()?.tenantId,
        },
      };
      dispatch(allOrg(payload));
    }
  }, [paymentgateWayData]);

  useEffect(() => {
    console.log(paymentCharge?.walletCharges);
    if (paymentCharge) {
      const object =
        paymentCharge?.paymentCharge || paymentCharge?.walletCharges;
      if (props?.isWallet === false) {
        for (let data in object) {
          setValue(data, object?.[data]);
        }
      } else {
        for (let data in object) {
          if (productCharge === "convenienceFee") {
            setValue(
              data,
              paymentCharge?.walletCharges?.convenienceFeeInPercentage
            );
          } else {
            setValue(
              data,
              paymentCharge?.walletCharges?.paymentgatewayInPercentage
            );
            // setValue(data, 0);
          }
        }
      }

      if (paymentCharge?.paymentCharge) {
        setPaymentChargeResponse(paymentCharge?.paymentCharge);
      }
      setValue("ProList", object?.productId || productId);
      setValue(
        "gatewayProvider",
        paymentCharge?.paymentCharge?.providerName || gateWayProvider
      );
      setValue("productCharge", productCharge);
      if (productCharge === "convenienceFee") {
        setValue(
          "convenienceFees",
          paymentCharge?.walletCharges?.convenienceFeeInPercentage
        );
        setValue(
          "chargeMode",
          paymentCharge?.walletCharges?.convenienceFeeInPercentage
        );
      } else {
        setValue(
          "convenienceFees",
          paymentCharge?.walletCharges?.paymentgatewayInPercentage
        );
        setValue(
          "chargeMode",
          paymentCharge?.walletCharges?.paymentgatewayInPercentage
        );
      }
    } else {
      reset();
    }
  }, [paymentCharge]);

  useEffect(() => {
    if (resultData) {
      setTimeout(() => setSnackBar(false), 1500);
      dispatch(clearupdatePaymentGateWayCut());
    }
  }, [resultData]);

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const providerId = fetchPaymentProvidersList?.data?.rows?.filter(
      (item) => item.name === gateWayProvider
    )?.[0]?.id;
    if (productId && props.isWallet) {
      console.log(data);
      const bodyData = {
        UPI: data?.UPI,
        Netbanking: data?.Netbanking,
        CreditCard: data?.CreditCard,
        DebitCard_Rupey: data?.DebitCard_Rupey,
        DebitCard_VISA_MASTER_MAESTRO: data?.DebitCard_VISA_MASTER_MAESTRO,
        NB_HDFC_KOTAK_ICICI_AXIS_YES: data?.NB_HDFC_KOTAK_ICICI_AXIS_YES,
        NB_SBI: data?.NB_SBI,
        NB_OTHERS: data?.NB_OTHERS,
        payLater: data?.payLater,
        EMI_ON_Cards: data?.EMI_ON_Cards,
        wallet: data?.wallet,
      };

      const payload1 = {
        params: `walletCharges?productId=${productId}&name=${gateWayProvider}&providerId=${providerId}`,
        body: { ...bodyData, convenienceFeeInPercentage: data?.convenienceFee },
      };
      const payload2 = {
        params: `walletCharges?productId=${productId}&name=${gateWayProvider}&providerId=${providerId}`,
        body: { ...bodyData, paymentgatewayInPercentage: data?.convenienceFee },
      };

      dispatch(
        updatePaymentGateWayCut(
          productCharge === "convenienceFee" ? payload1 : payload2
        )
      );
    } else {
      const payload = {
        body: {
          name: gateWayProvider,
          providerId: providerId,
          UPI: data?.UPI,
          Netbanking: data?.Netbanking,
          CreditCard: data?.CreditCard,
          DebitCard_Rupey: data?.DebitCard_Rupey,
          DebitCard_VISA_MASTER_MAESTRO: data?.DebitCard_VISA_MASTER_MAESTRO,
          NB_HDFC_KOTAK_ICICI_AXIS_YES: data?.NB_HDFC_KOTAK_ICICI_AXIS_YES,
          NB_SBI: data?.NB_SBI,
          NB_OTHERS: data?.NB_OTHERS,
          payLater: data?.payLater,
          EMI_ON_Cards: data?.EMI_ON_Cards,
          wallet: data?.wallet,
        },
        params: "paymentcut",
      };
      dispatch(updatePaymentGateWayCut(payload));
    }
  };

  const handleChangePgSettings = (data) => {
    const {
      target: { value },
    } = data;
    setValue("gatewayProvider", value);
    setGateWayProvider(value);
    if (props?.isWallet !== true) {
      const payload = {
        params: `paymentFees?name=${value}`,
      };
      dispatch(getPaymentMethod(payload));
    }
  };
  const handleChange = (data) => {
    const {
      target: { value },
    } = data;
    setValue("ProList", value);
    setProductId(value);
  };
  const handleChargeChange = (data) => {
    const {
      target: { value },
    } = data;
    setValue("productCharge", value);
    setProductCharge(value);
    const payload = {
      params: `walletFees?productId=${productId}&name=${gateWayProvider}`,
    };
    dispatch(getPaymentMethod(payload));
  };
  const getTextChangeInput = (e) => {
    if (e.target.value !== "" && gateWayProvider !== "ICICI") {
      payModeName.forEach(({ key, label }) => setValue(key, e.target.value));
    } else if (e.target.value !== "" && gateWayProvider === "ICICI") {
      payModeName.forEach(({ key, label }) => setValue(key, 0));
    } else {
      payModeName.forEach(({ key, label }) => setValue(key, 0));
    }
  };

  const payModeName = [
    { key: "UPI", label: "UPI (platform charges)" },
    { key: "CreditCard", label: "Credit card (visa, mastercard, rupay)" },
    { key: "DebitCard_Rupey", label: "Debit card - rupay (platform charges)" },
    {
      key: "DebitCard_VISA_MASTER_MAESTRO",
      label: "Debit cards (visa, mastercard, maestro)(incl. platform fees)",
    },
    {
      key: "NB_HDFC_KOTAK_ICICI_AXIS_YES",
      label: "NB (HDFC, ICICI, Axis, Kotak, Yes) (incl. platform fees)",
    },
    { key: "NB_SBI", label: "NB (SBI) (incl. platform fees)" },
    { key: "NB_OTHERS", label: "NB (others) (incl. platform fees)" },
    { key: "payLater", label: "Pay later" },
    { key: "wallet", label: "Wallets" },
    { key: "EMI_ON_Cards", label: "EMI on cards" },
  ];
  const getOnChangeInput = (event, walletKey) => {
    const {
      target: { value },
    } = event;
    for (let key in paymentChargeReponse) {
      if (key === walletKey) {
        if (Number(paymentChargeReponse[key]) > Number(value)) {
          setError(walletKey, {
            type: "custom",
            message: "should be greater than paymentCharge",
          });
        } else {
          clearErrors(walletKey);
        }
      }
    }
  };
  return (
    <Box className={styles.pg_container}>
      <Box className={styles.pg_container_heading}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.input_form}>
          <Grid
            container
            spacing={2}
            className={styles.pg_container_table_header}
          >
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <FormControl className={styles.input_full_width} size="small">
                <InputLabel id="demo-multiple-name-label">
                  Payment Partner
                </InputLabel>
                <Controller
                  name="gatewayProvider"
                  control={control}
                  // defaultValue={watch("gatewayProvider") ?? ""}
                  rules={{
                    required: "Please select payment partner",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      // fullWidth
                      required
                      error={
                        errors?.gatewayProvider?.type === "required" &&
                        !errors?.gatewayProvider?.ref?.value
                      }
                      inputRef={(el) => {
                        if (errors?.gatewayProvider && !firstErrorRef.current) {
                          firstErrorRef.current = el;
                        }
                      }}
                      onChange={(e) => handleChangePgSettings(e)}
                      input={<OutlinedInput label={"Payment Partner"} />}
                      value={value}
                    >
                      {!props?.isWallet
                        ? fetchPaymentProvidersList &&
                          fetchPaymentProvidersList?.data?.rows
                            ?.filter((item) => item.name !== "ICICI")
                            ?.map(({ name, id }) => (
                              <MenuItem key={id} value={name}>
                                {name}
                              </MenuItem>
                            ))
                        : fetchPaymentProvidersList &&
                          fetchPaymentProvidersList?.data?.rows?.map(
                            ({ name, id }) => (
                              <MenuItem key={id} value={name}>
                                {name}
                              </MenuItem>
                            )
                          )}
                    </Select>
                  )}
                ></Controller>
                {!errors?.gatewayProvider?.ref?.value && (
                  <span className={styles.errorSetting}>
                    {errors.gatewayProvider?.message}
                  </span>
                )}
              </FormControl>
            </Grid>
            <Grid
              container
              spacing={2}
              item
              xs={12}
              sm={12}
              md={12}
              lg={8}
              xl={8}
            >
              {props?.isWallet && (
                <>
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <FormControl
                      className={styles.input_full_width_product_id}
                      size="small"
                    >
                      <InputLabel id="demo-multiple-name-label">
                        Product List
                      </InputLabel>
                      <Controller
                        name="ProList"
                        control={control}
                        defaultValue={watch("ProList") ?? ""}
                        rules={{ required: "Please select Product Name" }}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            required
                            error={
                              errors?.ProList?.type === "required" &&
                              !errors?.ProList?.ref?.value
                            }
                            onChange={(e) => handleChange(e)}
                            input={<OutlinedInput label={"Product List"} />}
                            value={value}
                            className={styles.materialSelect}
                          >
                            {byRoleData &&
                              byRoleData?.data
                                ?.filter(
                                  (item) => item.ownershipType === "Self"
                                )
                                .map(({ name, productid }) => (
                                  <MenuItem key={productid} value={productid}>
                                    {name}
                                  </MenuItem>
                                ))}
                          </Select>
                        )}
                      ></Controller>
                      {!errors?.ProList?.ref?.value && (
                        <span className={styles.errorSetting}>
                          {errors.ProList?.message}
                        </span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <FormControl
                      className={styles.input_full_width_product_id}
                      size="small"
                    >
                      <InputLabel id="demo-multiple-name-label">
                        Product Charge
                      </InputLabel>
                      <Controller
                        name="productCharge"
                        control={control}
                        defaultValue={watch("productCharge") ?? ""}
                        rules={{ required: "Please select Product charge" }}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            required
                            error={
                              errors?.productCharge?.type === "required" &&
                              !errors?.productCharge?.ref?.value
                            }
                            onChange={(e) => handleChargeChange(e)}
                            input={<OutlinedInput label={"Product Charge"} />}
                            value={value}
                            className={styles.materialSelect}
                          >
                            <MenuItem value={"convenienceFee"}>
                              {"Convenience Fee"}
                            </MenuItem>
                            {gateWayProvider !== "ICICI" && (
                              <MenuItem value={"paymentGatewayCharge"}>
                                {"Payment Gateway Charge"}
                              </MenuItem>
                            )}
                          </Select>
                        )}
                      ></Controller>
                      {!errors?.productCharge?.ref?.value && (
                        <span className={styles.errorSetting}>
                          {errors.productCharge?.message}
                        </span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <FormControl
                      fullWidth
                      size="small"
                      // className={styles.input_full_width_product_id}
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Controller
                        name={"convenienceFees"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            size="small"
                            type="text"
                            {...register("convenienceFees", {
                              pattern: {
                                value: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,
                                message: "Invalid percentage",
                              },
                            })}
                            defaultValue={watch("convenienceFees") ?? ""}
                            variant="outlined"
                            placeholder="Charges"
                            error={!!errors.convenienceFees}
                            helperText={
                              !!errors.convenienceFees &&
                              errors.convenienceFees?.message
                            }
                            onInput={(e) => getTextChangeInput(e)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  %
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid container className={styles.pg_container_table_head}>
            <Grid item xs={6} sm={6} md={6} lg={8} xl={8}>
              Mode of Payments
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={4}
              xl={4}
              className={styles.pg_table_head_right}
            >
              {gateWayProvider || "Payment Gateway Provider"}
            </Grid>
          </Grid>
          <Grid container className={styles.pg_container_body}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {payModeName?.map(({ key, label }) => (
                <>
                  <Grid container spacing={3} alignItems="center">
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      lg={8}
                      xl={8}
                      className={styles.content_heading}
                    >
                      {label}
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                      <FormControl
                        fullWidth
                        size="small"
                        // className={styles.input_full_width_product_id}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Controller
                          name={"chargeMode"}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              type="text"
                              {...register("chargeMode")}
                              defaultValue={watch("chargeMode") ?? ""}
                              disabled={
                                Auth.getRole() === "ProductOwner" ||
                                (props?.isWallet === true && gateWayProvider)
                                  ? // gateWayProvider === "ICICI" ||
                                    // gateWayProvider === "Razorpay" ||
                                    // gateWayProvider === "PhonePe" ||
                                    // gateWayProvider === "Cashfree"
                                    true
                                  : false
                              }
                              variant="outlined"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                              inputProps={{
                                min: 1,
                                max: 100,
                                step: "1",
                                style: {
                                  height: "0.5em",
                                  borderRadius: " 0.3125rem",
                                },
                              }}
                              className={styles.input_full_width1}
                              {...register(key, {
                                required: `Field cannot be blank`,
                                pattern: {
                                  value:
                                    /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,
                                  message: "Invalid Input",
                                },
                              })}
                              error={!!errors?.[key]}
                              helperText={!!errors[key] && errors[key]?.message}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Divider
                    variant="fullWidth"
                    sx={{
                      padding: "0 2.25rem ",
                      margin: "0.88rem 0 0.62rem",
                    }}
                  />
                </>
              ))}
              {Auth.getRole() !== "ProductOwner" && (
                <Grid container className={styles.pg_btn_con}>
                  <Grid item>
                    <Button type="submit" className={styles.pg_btn_submit}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Snackbar
                className={styles.snackBar_wrap}
                open={snackBar}
                anchorOrigin={{ vertical, horizontal }}
              >
                <div className={styles.snackBar}>
                  <p className={styles.snackBar_title}>
                    Charges updated Successfully
                  </p>
                </div>
              </Snackbar>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default PgSettings;

{
  /* <form onSubmit={handleSubmit(onSubmit)}>
<Grid container>
  <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
    <FormControl className={styles.input_full_width}>
      <InputLabel id="demo-multiple-name-label">
        Organisation Name
      </InputLabel>
      <Controller
        name="orgName"
        render={({ field }) => (
          <Select
            {...field}
            fullWidth
            error={!!errors.orgName}
            // helperText={!!errors.orgName && errors.orgName?.message}
            onChange={handleChange}
            input={<OutlinedInput label={"Organisation Name"} />}
          >
            {resultData &&
              resultData?.data?.map(({ name, id }) => (
                <MenuItem
                  key={id}
                  value={id}

                  // className={Styles.selected_item}
                >
                  {name}
                </MenuItem>
              ))}
          </Select>
        )}
        control={control}
      ></Controller>
    </FormControl>
  </Grid>
  <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
    <TextField
      type="number"
      onKeyDown={(evt) =>
        ["e", "E", "+", "-"].includes(evt.key) &&
        evt.preventDefault()
      }
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">%</InputAdornment>
        ),
      }}
      value={watch("paymentCut") || ""}
      label={"Payment Gateway Charge"}
      className={styles.input_full_width}
      {...register("paymentCut", {
        required: "Please enter payment gateway charge",
        pattern: {
          value: /^[1-9]\d{0,1}(?:\.\d{1,2})?$/,
          message: "Invalid Input",
        },
      })}
      error={!!errors.paymentCut}
      helperText={
        !!errors.paymentCut && errors.paymentCut?.message
      }
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
</form> */
}
