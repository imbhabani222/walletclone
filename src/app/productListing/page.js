"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import Tabledata from "@/src/component/tabledata/tabledata";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../app/dashboard/dashboard.module.scss";
import Auth from "../../config/auth";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  byRole,
  dependentProduct,
} from "@/src/redux/actionCreator/allOrgMethod";
import SearchAndFilter from "@/src/utils/searchAndFilter";

const ProductListing = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
  };
  const {
    dependantProductData: { resultData: byRoleData },
  } = reducerData;

  useEffect(() => {
    if (byRoleData) {
      formatApiResponse(byRoleData?.data);
    }
  }, [byRoleData]);

  const formatApiResponse = (data) => {
    data?.forEach((element) => {
      element.productsData = element?.products
        ?.toString()
        .replaceAll(",", ", ");
    });
    setTableData(data);
  };
  useEffect(() => {
    const payload = {
      headers: {
        tenantid: Auth.getUserDetails()?.tenantId,
        orgid: Auth.getUserDetails()?.orgId,
        resourceid: Auth.getUserDetails()?.resourceId,
      },
    };
    dispatch(dependentProduct(payload));
  }, []);

  const productTableHead = [
    { label: "Product Name", key: "name" },
    { label: "Product ID", key: "productid" },
    { label: "Type", key: "ownershipType" },
    { label: "Dependency", key: "productsData" },
  ];

  const onSearchData = (event) => {
    const {
      target: { value },
    } = event;
    if (value?.length > 0) {
      const searchObject = {
        searchByKeyword: value,
      };
      const result = SearchAndFilter(searchObject, byRoleData?.data);
      formatApiResponse(result);
    } else {
      formatApiResponse(byRoleData?.data);
    }
  };
  return (
    <Box className={styles.super_container}>
      <Box className={styles.tabs_container}>
        <Box className={styles.table_data_container}>
          <Stack
            direction="row"
            justifyContent="start"
            className={styles.table_tab_header}
          >
            <Typography className={styles.table_data_text}>
              Product List
            </Typography>
          </Stack>
          <Divider sx={{ width: "100%", margin: "1rem 0 1.5rem" }} />
          <Stack
            direction="row"
            justifyContent="end"
            className={styles.table_tab_header}
          >
            <TextField
              hiddenLabel
              onChange={(event) => onSearchData(event)}
              placeholder="Search"
              onKeyDown={handleKeyDown}
              // className={styles.search_options}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                style: {
                  height: "0.5rem",
                  width: "25rem",
                  backgroundColor: "#fcfcfc",
                  // border: "1px solid #DDDDDD",
                  borderRadius: "5px",
                },
              }}
            />
          </Stack>

          <Tabledata
            data={tableData}
            tableHeading={productTableHead}
            label="productList"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default ProductListing;
