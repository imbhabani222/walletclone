import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Button,
  DataGrid,
  Tooltip,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { DotSpinner } from "@uiball/loaders";
import Fade from "@mui/material/Fade";
import SideDrawer from "./sidedrawer";
import styles from "./tabledata.module.scss";
import Image from "next/image";
import deleteicon from "../../../public/productImg/delete.svg";
import editicon from "../../../public/productImg/edit.svg";
const AmountData = [
  "Amount",
  "PG Amount",
  "Org Amount",
  "Wallet Amount",
  "Amount(paise)",
];

const ReportTable = ({
  load,
  data,
  tableHeading,
  label,
  callBack,
  isIcon,
  onUpdateProductdata,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [record, setRecord] = useState(null);

  const handleDrawerToggle = (ele, eleIndex) => {
    if (label) {
      if (label !== "userList") {
        callBack(ele);
      }
    } else {
      if (ele.orderType === "salestxn") {
        if (ele.journals?.length > 0) {
          setRecord(ele);
          setIsDrawerOpen(!isDrawerOpen);
        }
      } else {
        setIsDrawerOpen(false);
      }
    }
  };

  return load === true ? (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "12% auto",
      }}
    >
      <DotSpinner size={40} speed={0.9} color="#3633B7" />
    </Box>
  ) : (
    <TableContainer
      className={
        data?.length === 0
          ? styles.table_container
          : styles.table_container_data
      }
    >
      <Table
        className={styles.table_bg}
        stickyHeader
        aria-label="customized table"
      >
        <TableHead className={styles.table_head}>
          <TableRow>
            {tableHeading?.map((ele, index) => (
              <TableCell
                className={
                  AmountData.includes(ele.label)
                    ? styles.table_cell_amount_data
                    : styles.table_cells
                }
                key={index}
              >
                {ele.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody className={styles.table_body}>
          {data?.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={
                row?.approvedStatus !== "enable"
                  ? styles.table_body_row
                  : styles.table_body_row_disable
              }
            >
              <>
                {tableHeading.map((ele, eleIndex) => (
                  <>
                    {isIcon ? (
                      <TableCell
                        key={eleIndex}
                        component="th"
                        scope="row"
                        className={
                          AmountData.includes(ele.label)
                            ? styles.table_body_header_amount
                            : styles.table_body_header
                        }
                        onClick={() => handleDrawerToggle(row, eleIndex)}
                      >
                        {ele.label === "Action" ? (
                          <Image
                            alt="editicon"
                            {...editicon}
                            onClick={() => onUpdateProductdata(row)}
                          />
                        ) : row[ele.key] !== "edit" ? (
                          row[ele.key]
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    ) : (
                      <TableCell
                        key={eleIndex}
                        component="th"
                        scope="row"
                        className={
                          AmountData.includes(ele.label)
                            ? styles.table_body_header_amount
                            : styles.table_body_header
                        }
                        onClick={() => handleDrawerToggle(row, eleIndex)}
                        style={{ cursor: "pointer" }}
                      >
                        {row[ele.key] !== "approve" &&
                        row[ele.key] !== "disapprove" &&
                        row[ele.key] !== "pending" &&
                        row[ele.key] !== "completed" &&
                        row[ele.key] !== 0 ? (
                          row[ele.key] || "-"
                        ) : row[ele.key] === "approve" ? (
                          <Button
                            variant="outlined"
                            color="success"
                            sx={{ width: "90%" }}
                            className={styles.btn_success}
                          >
                            Approved
                          </Button>
                        ) : row[ele.key] === "disapprove" ? (
                          <Tooltip
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            title=<React.Fragment>
                              <Typography color="inherit">
                                {row?.disapproveMessage}
                              </Typography>
                            </React.Fragment>
                          >
                            <Button
                              variant="outlined"
                              color="error"
                              sx={{ width: "90%" }}
                              className={styles.btn_denied}
                            >
                              Denied
                            </Button>
                          </Tooltip>
                        ) : row[ele.key] === 0 ? (
                          0
                        ) : (
                          <Tooltip
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            title=<React.Fragment>
                              <Typography color="inherit">
                                {row[ele.key] === "completed"
                                  ? "Pending for admin approval"
                                  : "Please complete KYC"}
                              </Typography>
                            </React.Fragment>
                          >
                            <Button
                              variant="outlined"
                              color="success"
                              sx={{ width: "90%" }}
                              className={styles.btn_pending}
                            >
                              Pending
                            </Button>
                          </Tooltip>
                        )}
                      </TableCell>
                    )}
                  </>
                ))}
              </>
            </TableRow>
          ))}
          <SideDrawer
            anchor={"right"}
            open={isDrawerOpen}
            rowData={record}
            onClose={handleDrawerToggle}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ReportTable;
