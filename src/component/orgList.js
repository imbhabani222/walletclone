"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "../app/dashboard/dashboard.module.scss";
import Tabledata from "@/src/component/tabledata/tabledata";
import Auth from "../config/auth";
import { allOrg, clearallOrg } from "../redux/actionCreator/allOrgMethod";
import ProList from "@/src/component/productList";
import { storeOrgDetails } from "../redux/actionCreator/signupMethod";
import SearchAndFilter from "../utils/searchAndFilter";

const OrgList = ({ tabvalue, getTableData }) => {
  const router = useRouter();
  const [isLoad, setisLoad] = useState(false);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [selectedRecord, setSelectRecord] = useState(null);
  const reducerData = useSelector(
    (state) => state?.allOrgReducer?.allOrg?.resultData?.data || null,
    shallowEqual
  );
  const handleSisterOrg = () => {
    setisLoad(true);
    router.push("/sisterorg");
  };
  useEffect(() => {
    setisLoad(false);
  }, []);
  const orgTableHeading = [
    { label: "Organisation", key: "name" },
    // { label: "Organisation Admin", key: "type" },
    { label: "GSTIN", key: "gst" },
    { label: "Business PAN", key: "businessPan" },
    { label: "Aadhar", key: "aadhar" },
    { label: "Signatory PAN", key: "signatoryPan" },
    { label: "Industry Type", key: "industryType" },
    { label: "Business Type", key: "businessType" },
    { label: "KYC Status", key: "verificationStatus" },
  ];

  useEffect(() => {
    const payload = {
      headers: {
        orgid: Auth.getUserDetails()?.orgId,
        tenantid: Auth.getUserDetails()?.tenantId,
      },
    };
    dispatch(allOrg(payload));
    return () => {
      dispatch(clearallOrg());
    };
  }, []);

  useEffect(() => {
    if (reducerData) {
      const data = [...reducerData];

      formatData(data, "intital");
    }
  }, [reducerData]);

  const formatData = (data, flag) => {
    data?.forEach((element) => {
      element.aadhar = element.aadhar
        ? `${element.aadhar.substr(0, 2)}****${element.aadhar.substr(-2)}`
        : null;
    });
    setTableData(data);
    if (flag) {
      const value = data?.some((item) => item.verificationStatus === "approve");
      getTableData(value);
    }
  };
  const getRecord = (record) => {
    if (record.verificationStatus === "pending") {
      Auth.set("orgId", record?.id);
      const data = {
        gst: record?.gstRegistered ? "Yes" : "No",
        bussiness_type: record?.businessType,
      };
      dispatch(storeOrgDetails(data));
      if (record?.gstRegistered) {
        router.push("/kycVerification");
      } else {
        router.push("/kycVerification");
      }
    } else {
      if (record?.approvedStatus !== "disable") {
        setSelectRecord(record);
      } else {
        setSelectRecord(null);
      }
    }
  };
  const changeTab = () => {
    setSelectRecord(null);
  };
  const onSearchData = (data) => {
    const {
      target: { value },
    } = data;
    if (value?.length > 0) {
      const searchObject = {
        searchByKeyword: value,
      };
      const dataChange = JSON.parse(JSON.stringify(reducerData));
      dataChange.forEach((element) => {
        if (element.verificationStatus === "completed") {
          element.Status = "pending";
        } else if (element.verificationStatus === "approve") {
          element.Status = "approved";
        } else {
          element.verificationStatus = element.verificationStatus;
        }
      });
      const result = SearchAndFilter(searchObject, dataChange);
      formatData(result);
    } else {
      formatData([...reducerData]);
    }
  };
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
    const allowedCharactersRegex = /^[A-Za-z0-9 ]*$/;

    if (!allowedCharactersRegex.test(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <Box className={styles.table_data_container}>
      {(selectedRecord &&
        tabvalue === 0 &&
        selectedRecord?.verificationStatus === "approve") ||
      Auth?.getRole() === "OrgAdmin" ? (
        <ProList goBack={changeTab} record={selectedRecord} />
      ) : (
        <>
          <Grid
            container
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            className={styles.table_tab_header}
          >
            <Grid item xs={12} sm={6}>
              <Box className={styles.table_data_text}>Organisation List</Box>
            </Grid>
            <Grid
              direction="row"
              flexWrap="wrap"
              // gap="1.44rem"
              container
              item
              xs={12}
              sm={6}
              spacing={2}
            >
              <Grid item xs={12} sm={8}>
                <TextField
                  size="small"
                  sx={{ width: "100%" }}
                  hiddenLabel
                  onChange={(event) => onSearchData(event)}
                  placeholder="Search"
                  // className={styles.search_options}
                  onKeyDown={handleKeyDown}
                  InputProps={{
                    style: { backgroundColor: "#fff" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    style: {
                      height: "0.5rem",
                      backgroundColor: "#fff",
                      // border: "1px solid #DDDDDD",
                      borderRadius: "5px",
                      padding: "0.9rem 0 0.9rem 1.25rem",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} className={styles.table_btn_wrapper}>
                {!isLoad ? (
                  <>
                    <Button
                      variant="contained"
                      className={styles.table_btn}
                      onClick={handleSisterOrg}
                    >
                      Add Organisation
                    </Button>
                  </>
                ) : (
                  <DotSpinner size={40} speed={0.9} color="#3633B7" />
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* <Divider sx={{ width: "100%", margin: "1rem 0 1.25rem" }} /> */}
          <Tabledata
            data={tableData}
            tableHeading={orgTableHeading}
            callBack={getRecord}
            label="orgList"
          />
        </>
      )}
    </Box>
  );
};

export default OrgList;
