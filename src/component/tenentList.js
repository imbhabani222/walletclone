import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import styles from "../app/superadmin/superadmin.module.scss";
import Tabledata from "@/src/component/tabledata/tabledata";
import ALL_USER_CONSTANTS from "../constant/userconstant";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { allTenant } from "../redux/actionCreator/allTenantMethod";
import {
  allOrg,
  enableDisableOrg,
} from "@/src/redux/actionCreator/allOrgMethod";
import Auth from "@/src/config/auth";
import SideDrawer from "./tabledata/sidedrawer";
import ToggleSwitch from "./toggle/index";
import axios from "axios";
import URL from "../config/envURL";
import SearchIcon from "@mui/icons-material/Search";
import SearchAndFilter from "../utils/searchAndFilter";

const Tenentlist = () => {
  const {
    TENENT_LIST: { TENENT_DATA, TENENT_TABLE_HEADING, TENENT_LIST_DATA },
  } = ALL_USER_CONSTANTS;
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);
  const [activeRow, setActiveRow] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const reducerData = useSelector(
    (state) => state?.allOrgReducer?.allOrg?.resultData?.data || null,
    shallowEqual
  );
  const tenantReducerData = useSelector(
    (state) => state.allTenantReducer || null,
    shallowEqual
  );

  const {
    allTenant: { resultData: allTenantData },
  } = tenantReducerData;

  const reducerData2 = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );

  const {
    enabledDisable: { resultData },
  } = reducerData2;
  useEffect(() => {
    if (reducerData) {
      const filter = reducerData?.filter(
        (item) => item.verificationStatus === "approve"
      );
      const sortedArray = filter?.sort((a, b) =>
        a?.name.toLowerCase().localeCompare(b?.name.toLowerCase())
      );
      setTableData([...sortedArray]);
    }
  }, [reducerData]);

  useEffect(() => {
    const stateData = { ...currentRowData, ...allTenantData };
    setCurrentRowData(stateData);
  }, [allTenantData]);

  const getPendingOrg = () => {
    const payload = {
      headers: {
        orgid: Auth.getUserDetails().orgId,
        tenantid: Auth.getUserDetails().tenantId,
      },
    };
    dispatch(allOrg(payload));
  };

  const onChangeToggle = async (checked, id) => {
    const token = Auth.getAuthToken();
    const flag = checked ? "enable" : "disable";
    try {
      const reponses = await axios({
        method: "post",
        url: `${URL.API.baseURL}wallet/api/v1.0/${id}?action=${flag}`,
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "XXX",
          Authorization: token,
        },
      });
      getPendingOrg();
    } catch (error) {}
  };
  const handleTableRow = (id, data) => {
    setIsDrawerOpen(!isDrawerOpen);
    setActiveRow(id);
    const payload = {
      params: data?.groupOrgId,
    };
    dispatch(allTenant(payload));
    setCurrentRowData(data);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onSearchData = (event) => {
    const {
      target: { value },
    } = event;
    const filter = reducerData?.filter(
      (item) => item.verificationStatus === "approve"
    );
    if (value?.length > 0) {
      const searchObject = {
        searchByKeyword: value,
      };
      const result = SearchAndFilter(searchObject, filter);
      setTableData([...result]);
    } else {
      setTableData([...filter]);
    }
  };
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
  };
  return (
    <Box className={styles.table_data_container}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ padding: "1.88em 1.56em 1.37em" }}
      >
        <Typography className={styles.table_data_text_tenent}>
          {TENENT_LIST_DATA}
        </Typography>
        <TextField
          hiddenLabel
          onChange={(event) => onSearchData(event)}
          placeholder="Search"
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{
            style: {
              width: "25rem",
              height: "0.5rem",
              backgroundColor: "#fff",
              // border: "1px solid #DDDDDD",
              borderRadius: "5px",
            },
          }}
        />
      </Stack>
      <Divider sx={{ width: "100%", margin: "0 0 1.25rem" }} />

      <TableContainer
        className={styles.table_container}
        sx={{ height: "370px" }}
      >
        <Table
          className={styles.table_bg}
          stickyHeader
          aria-label="customized table"
          sx={{
            // height: "100%",
            width: "100%",
          }}
        >
          <TableHead className={styles.table_head}>
            <TableRow>
              {TENENT_TABLE_HEADING?.map((ele, index) => (
                <TableCell className={styles.table_cells} key={index}>
                  {ele.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.table_body}>
            {tableData?.map((ele, eleIndex) => (
              <TableRow
                key={eleIndex}
                className={styles.table_body_row}
                onClick={() => handleTableRow(ele?.id, ele)}
                style={{ cursor: "pointer" }}
              >
                <TableCell
                  onClick={() => handleTableRow(ele?.id, ele)}
                  style={{ cursor: "pointer" }}
                >
                  {ele.name}
                </TableCell>
                <TableCell
                  onClick={() => handleTableRow(ele?.id, ele)}
                  style={{ cursor: "pointer" }}
                >
                  {ele.businessType || "-"}
                </TableCell>
                {ele.industryType.toString().length > 25 ? (
                  <Tooltip title={ele.industryType} placement="bottom-start">
                    <TableCell
                      onClick={() => handleTableRow(ele?.id, ele)}
                      style={{ cursor: "pointer" }}
                    >{`${ele.industryType
                      .toString()
                      .slice(0, 25)}...`}</TableCell>
                  </Tooltip>
                ) : (
                  <TableCell
                    onClick={() => handleTableRow(ele?.id, ele)}
                    style={{ cursor: "pointer" }}
                  >
                    {ele.industryType}
                  </TableCell>
                )}{" "}
                <TableCell>
                  <ToggleSwitch
                    id={ele.id}
                    className={styles.row_toggle}
                    checked={ele.approvedStatus === "disable" ? false : true}
                    onChange={(e) => onChangeToggle(e, ele?.id)}
                  />
                </TableCell>
              </TableRow>
            ))}

            <SideDrawer
              anchor={"right"}
              activeRow={activeRow || ""}
              open={isDrawerOpen}
              onClose={handleDrawerToggle}
              rowData={currentRowData}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tenentlist;
