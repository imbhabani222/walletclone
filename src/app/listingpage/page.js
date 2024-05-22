"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Grid,
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
import ProductTable from "@/src/component/userTable/productTable";

const ListingPage = () => {
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
  // console.log(reducerData, "+++++++++++++++++++++++++=");
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
    // dispatch(byRole(payload));
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
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              className={styles.table_tab_header}
            >
              <Typography className={styles.table_data_text}>
                Product List
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              justifyContent={"flex-end"}
              className={styles.table_tab_header}
            >
              <TextField
                hiddenLabel
                size="small"
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
                    height: "1rem",
                    width: "25rem",
                    backgroundColor: "#fcfcfc",
                    // border: "1px solid #DDDDDD",
                    borderRadius: "5px",
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* <Divider sx={{ width: "100%", margin: "1rem 0 1.5rem" }} /> */}

          {/* <Tabledata
            data={tableData}
            tableHeading={productTableHead}
            label="productList"
          /> */}
          <ProductTable
            tableData={tableData}
            tableHeading={productTableHead}
            label="productList"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default ListingPage;
