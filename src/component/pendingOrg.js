import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Switch,
  TextField,
  Tooltip,
  Grid,
  InputAdornment,
} from "@mui/material";
import styles from "../app/superadmin/superadmin.module.scss";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { allOrg } from "@/src/redux/actionCreator/allOrgMethod";
import Auth from "@/src/config/auth";
import SideDrawer from "./tabledata/sidedrawer";
import axios from "axios";
import { allTenant } from "../redux/actionCreator/allTenantMethod";
import URL from "../config/envURL";
import SearchAndFilter from "../utils/searchAndFilter";
import SearchIcon from "@mui/icons-material/Search";
import DenyModal from "../app/superadmin/denyModal";

const Pendingorg = () => {
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);
  const [activeRow, setActiveRow] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const reducerData = useSelector(
    (state) => state?.allOrgReducer?.allOrg?.resultData?.data || null,
    shallowEqual
  );

  const reducerData2 = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );

  const tenantReducerData = useSelector(
    (state) => state.allTenantReducer || null,
    shallowEqual
  );
  const {
    allTenant: { resultData: allTenantData },
  } = tenantReducerData;
  const {
    approveDeny: { resultData },
  } = reducerData2;

  useEffect(() => {
    if (reducerData) {
      const filterData = reducerData.filter(
        (item) => item.verificationStatus === "completed"
      );
      setTableData([...filterData]);
    }
  }, [reducerData]);

  useEffect(() => {
    getAllOrgApi();
  }, [resultData]);

  useEffect(() => {
    const stateData = { ...currentRowData, ...allTenantData };
    setCurrentRowData(stateData);
  }, [allTenantData]);

  const getAllOrgApi = () => {
    const payload = {
      headers: {
        orgid: Auth.getUserDetails()?.orgId,
        tenantid: Auth.getUserDetails()?.tenantId,
      },
    };
    dispatch(allOrg(payload));
  };

  const orgTableHeading = [
    { label: "Organisation Name", key: "name" },
    { label: "Business Type", key: "businessType" },
    { label: "Industry Type", key: "industryType" },
    { label: "Action", key: "" },
  ];

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

  const onApproveOrDeny = async (flag, id, message) => {
    const token = Auth.getAuthToken();

    try {
      const reponses = await axios({
        method: "post",
        url: `${URL.API.baseURL}wallet/api/v1.0/kycStatus/${id}?action=${flag}`,
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "XXX",
          Authorization: token,
        },
        data: {
          message,
        },
      });
      getAllOrgApi();
    } catch (error) {}
  };
  const getTenentList = (id) => {
    const payload = {
      headers: {
        tenantId: Auth.getUserDetails().tenantId,
      },
    };
    dispatch(allTenant(payload));
  };
  const onSearchData = (event) => {
    const {
      target: { value },
    } = event;
    const filterData = reducerData.filter(
      (item) => item.verificationStatus === "completed"
    );
    if (value?.length > 0) {
      const searchObject = {
        searchByKeyword: value,
      };
      const result = SearchAndFilter(searchObject, filterData);
      setTableData([...result]);
    } else {
      setTableData([...filterData]);
    }
  };

  const closeModal = (data) => {
    setIsModalOpen(false);
    if (data?.reason) {
      const flag = "disapprove";
      const id = selectedRecord?.id;
      onApproveOrDeny(flag, id, data?.reason);
    }
    setSelectedRecord(null);
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
        xs={12}
        sm={12}
        md={12}
        lg={4}
        xl={4}
        spacing={3}
      >
        <Typography className={styles.table_data_text}>
          Approval List
        </Typography>
        <TextField
          onChange={(event) => onSearchData(event)}
          hiddenLabel
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
              {orgTableHeading?.map((ele, index) => (
                <TableCell
                  width="25%"
                  className={styles.table_cells}
                  key={index}
                >
                  {ele.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.table_body}>
            {tableData?.map((ele, eleIndex) => (
              <TableRow key={eleIndex} className={styles.table_body_row}>
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
                  {ele.businessType}
                </TableCell>
                {ele.industryType.toString().length > 25 ? (
                  <Tooltip title={ele.industryType} placement="bottom">
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
                )}
                <TableCell>
                  <Stack direction="row" gap="24px">
                    <Button
                      className={styles.table_app_btn}
                      // sx={{ textTransform: "capitalize" }}
                      variant="outlined"
                      color="success"
                      onClick={() => onApproveOrDeny("approve", ele?.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      className={styles.table_deny_btn}
                      // sx={{ textTransform: "capitalize" }}
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setIsModalOpen(true);
                        setSelectedRecord(ele);
                      }}
                    >
                      Deny
                    </Button>
                  </Stack>
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

            <DenyModal visible={isModalOpen} handleClose={closeModal} />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Pendingorg;
