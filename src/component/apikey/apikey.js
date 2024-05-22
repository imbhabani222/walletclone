"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tabledata from "@/src/component/tabledata/tabledata";
import styles from "./apikey.module.scss";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  byRole,
  generateKey,
  ClearGenerateKey,
} from "@/src/redux/actionCreator/allOrgMethod";
import Auth from "../../config/auth";
import { loginClear } from "@/src/redux/actionCreator/loginMethod";

const ApiKeyList = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [isOpenToaster, setIsOpenToaster] = useState(false);

  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  const {
    byRole: { resultData: byRoleData },
    generateKeys: { resultData: generateKeyResponse },
  } = reducerData;

  useEffect(() => {
    const payload = {
      headers: {
        tenantid: Auth.getUserDetails()?.tenantId,
        orgid: Auth.getUserDetails()?.orgId,
        resourceid: Auth.getUserDetails()?.resourceId,
      },
    };
    dispatch(byRole(payload));
    return () => {
      dispatch(loginClear());
      // dispatch(ClearGenerateKey());
    };
  }, []);

  useEffect(() => {
   if(generateKeyResponse){
   const updateUserDetails =  {
      ...Auth.getUserDetails(),
      ...{ secretkey :generateKeyResponse?.data?.key}
    }
    Auth.set("userDetails", updateUserDetails)
   }
  },[generateKeyResponse])

  useEffect(() => {
    if (byRoleData) {
      setTableData(byRoleData?.data);
    }
  }, [byRoleData]);

  const onGenerateKey = (ele) => {
    const payload = {
      params: tableData?.[0]?.productid,
      action: "generateKey",
      headers: {
        orgId: Auth.getUserDetails()?.orgId,
        tenantId: Auth.getUserDetails()?.tenantId,
      },
      body: {
        role: "ProductOwner",
        resourceId: Auth.getUserDetails()?.resourceId,
      },
    };
    dispatch(generateKey(payload));
  };

  const handleClose = () => {
    setIsOpenToaster(false);
  };
  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setIsOpenToaster(true);
  };
  return (
    <Box className={styles.table_data_container1}>
      <Snackbar
        open={isOpenToaster}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Copied !"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={styles.product_wrapper}
      >
        <Box className={styles.product_name}>{tableData?.[0]?.name}</Box>
        <Stack className={styles.product_inners}>

          {/* <Stack
            direction="row"
            gap="8px"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "60%" }}
          >
            <Typography variant="p" className={styles.pro_inner_heading}>
              Tenant ID
            </Typography>
            <Stack
              direction="row"
              gap="8px"
              alignItems="center"
              className={styles.pro_inner_box}
            >
              <TextField
                value={Auth.getUserDetails()?.tenantId}
                hiddenLabel
                className={styles.pro_inner_input}
                inputProps={{
                  style: {
                    height: "0.5rem",
                    width: "22.5rem",
                    backgroundColor: "#ffffff",
                    border: "1px solid #DDDDDD",
                    borderRadius: "5px",
                  },
                }}
              />
              <ContentCopyIcon
                onClick={() => {
                  navigator.clipboard.writeText(
                    Auth.getUserDetails()?.tenantId
                  );
                  setIsOpenToaster(true);
                }}
                className={styles.pro_inner_copyicon}
              />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            gap="8px"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "60%" }}
          >
            <Typography variant="p">Organisation ID</Typography>
            <Stack
              direction="row"
              gap="8px"
              alignItems="center"
              className={styles.pro_inner_box}
            >
              <TextField
                value={Auth.getUserDetails()?.orgId}
                hiddenLabel
                inputProps={{
                  style: {
                    height: "0.5rem",
                    width: "22.5rem",
                    backgroundColor: "#ffffff",
                    border: "1px solid #DDDDDD",
                    borderRadius: "5px",
                  },
                }}
              />
              <ContentCopyIcon
                onClick={() => {
                  navigator.clipboard.writeText(Auth.getUserDetails()?.orgId);
                  setIsOpenToaster(true);
                }}
                className={styles.pro_inner_copyicon}
              />
            </Stack>
          </Stack> */}
          <Stack
            direction="row"
            gap="8px"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "60%" }}
          >
            <Typography variant="p">Product ID</Typography>
            <Stack
              direction="row"
              gap="8px"
              alignItems="center"
              className={styles.pro_inner_box}
            >
              <TextField
                value={tableData?.[0]?.productid}
                hiddenLabel
                inputProps={{
                  style: {
                    height: "0.5rem",
                    width: "22.5rem",
                    backgroundColor: "#ffffff",
                    border: "1px solid #DDDDDD",
                    borderRadius: "5px",
                  },
                }}
              />
              <ContentCopyIcon
                onClick={() => {
                  navigator.clipboard.writeText(
                    tableData?.[0]?.productid
                  );
                  setIsOpenToaster(true);
                }}
                className={styles.pro_inner_copyicon}
              />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            gap="8px"
            alignItems="center"
            justifyContent="space-between"
            className={styles.pro_inner_box}
            sx={{ width: "60%" }}
          >
            {/* <Typography variant="p">Key</Typography> */}
            <Button
              onClick={() => onGenerateKey()}
              className={styles.api_key_btn}
            >
              Generate API Key
            </Button>
            <Stack
              direction="row"
              gap="8px"
              alignItems="center"
              className={styles.pro_inner_box}
            >
              <TextField
                value={
                  generateKeyResponse?.data?.key ||
                  Auth?.getUserDetails()?.secretkey
                }
                hiddenLabel
                inputProps={{
                  style: {
                    height: "0.5rem",
                    width: "22.5rem",
                    backgroundColor: "#ffffff",
                    border: "1px solid #DDDDDD",
                    borderRadius: "5px",
                  },
                }}
              />
              <ContentCopyIcon
                onClick={
                  generateKeyResponse?.data?.key ||  Auth?.getUserDetails()?.secretkey
                    ? () => handleCopy(generateKeyResponse?.data?.key || Auth?.getUserDetails()?.secretkey)
                    : null
                }
                className={styles.pro_inner_copyicon}
              />
            </Stack>
          </Stack>
          <span className={styles.note_text}>Note: Please store the key securely and also note any change made to key should be updated in the applications using wallet APIs</span>
        </Stack>
      </Grid>
    </Box>
  );
};

export default ApiKeyList;
