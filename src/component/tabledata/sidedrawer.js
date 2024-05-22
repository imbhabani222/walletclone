import React, { useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./tabledata.module.scss";
import { singleorg } from "@/src/redux/actionCreator/allOrgMethod";
import crossIcon from "../../../public/report/cross_icon.svg";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/image";
import moment from "moment";

const SideDrawer = ({ open, onClose, activeRow, rowData }) => {
  const dispatch = useDispatch();
  const reducerData = useSelector((state) => state || null, shallowEqual);
  useEffect(() => {
    if (activeRow) {
      const payload = {
        params: activeRow,
      };
      dispatch(singleorg(payload));
    }
  }, [activeRow]);
  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={onClose}
      className={styles.drawer_container}
    >
      {rowData?.journals ? (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            // alignItems="center"
          >
            <Box className={styles.drawer_heading}>Product Details</Box>
            <Image
              onClick={onClose}
              className={styles.drawer_cross}
              alt="crossIcon"
              {...crossIcon}
            />
          </Stack>
          {rowData?.journals?.map(
            (ele, index) =>
              ele?.productName !== "Razorpay" && (
                <List key={index}>
                  <ListItem>
                    <ListItemText>
                      <Card variant="outlined" className={styles.card_wrapper}>
                        <Typography className={styles.card_heading}>
                          {ele?.productName}
                        </Typography>
                        <Divider />
                        <CardContent>
                          <Stack
                            flexWrap="wrap"
                            direction="row"
                            justifyContent="space-between"
                            gap="10px"
                            sx={{ width: "100%" }}
                          >
                            <Box className={styles.card_body}>
                              <Typography className={styles.data_key}>
                                Date
                              </Typography>
                              <Typography className={styles.data_value}>
                                {moment(rowData?.createdAt).format(
                                  "DD/MM/YYYY  hh:mm a"
                                ) || "- "}
                              </Typography>
                            </Box>
                            <Box className={styles.card_body}>
                              <Typography className={styles.data_key}>
                                Service Type
                              </Typography>
                              <Typography className={styles.data_value}>
                                {ele?.category || "-"}
                              </Typography>
                            </Box>
                            <Box className={styles.card_body}>
                              <Typography className={styles.data_key}>
                                Product ID
                              </Typography>
                              <Typography className={styles.data_value}>
                                {ele?.productid || "-"}
                              </Typography>
                            </Box>
                            <Box className={styles.card_body}>
                              <Typography className={styles.data_key}>
                                Amount with GST (in Rs.)
                              </Typography>
                              <Typography className={styles.data_value}>
                                {ele.amountWithGstInPaise !== 0
                                  ? ele.amountWithGstInPaise / 100
                                  : 0}
                              </Typography>
                            </Box>
                            <Box className={styles.card_body}>
                              <Typography className={styles.data_key}>
                                Amount without GST (in Rs.)
                              </Typography>
                              <Typography className={styles.data_value}>
                                {ele.amountWithoutGstInPaise !== 0
                                  ? ele.amountWithoutGstInPaise / 100
                                  : 0}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </ListItemText>
                  </ListItem>
                </List>
              )
          )}
        </>
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            // alignItems="center"
          >
            <Box className={styles.drawer_heading}>Tenant Details</Box>
            <Image
              onClick={onClose}
              className={styles.drawer_cross}
              style={{ marginTop: "1.25rem", marginRight: "1rem" }}
              alt="crossIcon"
              {...crossIcon}
            />
          </Stack>

          <List>
            <ListItem>
              <ListItemText>
                <Card variant="outlined">
                  <Typography className={styles.card_heading}>
                    Basic Details
                  </Typography>
                  <Divider />
                  <CardContent>
                    <Stack
                      flexWrap="wrap"
                      direction="row"
                      justifyContent="space-between"
                      gap="10px"
                      sx={{ width: "330px" }}
                    >
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Tenant Name
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.data?.name || "- "}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Phone Number
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.data?.mobile || "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Email ID
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.data?.email || "-"}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                {" "}
                <Card variant="outlined">
                  <Typography className={styles.card_heading}>
                    Organistion Details
                  </Typography>
                  <Divider />
                  <CardContent>
                    <Stack
                      flexWrap="wrap"
                      direction="row"
                      justifyContent="space-between"
                      gap="10px"
                      sx={{ width: "330px" }}
                    >
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Organisation Name
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.name || "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Industry Type
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.industryType?.toString() || "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Business Type
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.businessType || "-"}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>{" "}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                {" "}
                <Card variant="outlined">
                  <Typography className={styles.card_heading}>
                    KYC Details
                  </Typography>
                  <Divider />
                  <CardContent>
                    <Stack
                      flexWrap="wrap"
                      direction="row"
                      justifyContent="space-between"
                      gap="10px"
                      sx={{ width: "330px" }}
                    >
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          GSTIN
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.gst}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          GSTIN Name
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.gstName}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Business PAN
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.businessPan || "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Aadhar
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.aadhar
                            ? `${rowData?.aadhar.substr(
                                0,
                                2
                              )} ***** ${rowData?.aadhar.substr(-2)}`
                            : "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Signatory PAN
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.signatoryPan || "-"}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack
                      flexWrap="wrap"
                      direction="row"
                      justifyContent="space-between"
                      gap="10px"
                      sx={{ width: "330px" }}
                    >
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Address Line 1
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.Address?.addressline1 || "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Address Line 2
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.Address?.addressline2 || "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          City
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.Address?.city || "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Country
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.Address?.country || "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          State
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.Address?.state || "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Country
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.Address?.country || "-"}
                        </Typography>
                      </Box>
                      <Box className={styles.card_body}>
                        <Typography className={styles.data_key}>
                          Pincode
                        </Typography>
                        <Typography className={styles.data_value}>
                          {rowData?.Address?.pincode || "-"}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </ListItemText>
            </ListItem>
          </List>
        </>
      )}
    </Drawer>
  );
};

export default SideDrawer;
