"use client";
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
} from "@mui/material";
import Fade from "@mui/material/Fade";
import SideDrawer from "./sidedrawer";
import styles from "./tabledata.module.scss";
import Image from "next/image";
import deleteicon from "../../../public/productImg/delete.svg";
import editicon from "../../../public/productImg/edit.svg";

const Tabledata = ({
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
      setRecord(ele);
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  return (
    <TableContainer
      className={styles.table_container}
      sx={{ height: "calc(100vh - 370px)" }}
    >
      <Table className={styles.table_bg} aria-label="customized table">
        <TableHead className={styles.table_head}>
          <TableRow>
            {tableHeading?.map((ele, index) => (
              <TableCell className={styles.table_cell} key={index}>
                {ele.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={styles.table_body}>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={
                row?.approvedStatus !== "enable"
                  ? styles.table_body_row
                  : row?.approvedStatus === "disable"
                  ? styles.table_body_row_disable
                  : styles.table_body_row
              }
            >
              <>
                {tableHeading.map((ele, eleIndex) => (
                  <>
                    {isIcon ? (
                      row[ele.key]?.toString()?.length > 30 ? (
                        <Tooltip
                          title={row[ele.key]}
                          placement="bottom-start"
                          PopperProps={{ style: { zIndex: 0 } }}
                        >
                          <TableCell
                            key={eleIndex}
                            component="th"
                            scope="row"
                            className={styles.table_body_header}
                            onClick={() => handleDrawerToggle(row, eleIndex)}
                            style={{ cursor: "pointer" }}
                          >
                            {`${row[ele.key]?.toString()?.slice(0, 30)}...`}
                          </TableCell>
                        </Tooltip>
                      ) : (
                        <TableCell
                          key={eleIndex}
                          component="th"
                          scope="row"
                          className={styles.table_body_header}
                          onClick={() => handleDrawerToggle(row, eleIndex)}
                          style={{ cursor: "pointer" }}
                        >
                          {ele?.label === "Action" ? (
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
                      )
                    ) : row[ele.key] !== "approve" &&
                      row[ele.key] !== "disapprove" &&
                      row[ele.key] !== "pending" &&
                      row[ele.key] !== "completed" &&
                      ele.label !== "Product ID" &&
                      row[ele.key]?.toString()?.length > 25 ? (
                      <Tooltip title={row[ele.key]} placement="bottom-start">
                        <TableCell
                          key={eleIndex}
                          component="th"
                          scope="row"
                          className={styles.table_body_header}
                          onClick={() => handleDrawerToggle(row, eleIndex)}
                          style={{ cursor: "pointer" }}
                        >
                          {`${row[ele.key]?.toString()?.slice(0, 25)}...`}
                        </TableCell>
                      </Tooltip>
                    ) : row[ele.key] !== "approve" &&
                      row[ele.key] !== "disapprove" &&
                      row[ele.key] !== "pending" &&
                      row[ele.key] !== "completed" ? (
                      <TableCell
                        key={eleIndex}
                        component="th"
                        scope="row"
                        className={styles.table_body_header}
                        onClick={() => handleDrawerToggle(row, eleIndex)}
                        style={{ cursor: "pointer" }}
                      >
                        {row[ele.key] || "-"}
                      </TableCell>
                    ) : (
                      <TableCell
                        key={eleIndex}
                        component="th"
                        scope="row"
                        className={styles.table_body_header}
                        onClick={() => handleDrawerToggle(row, eleIndex)}
                        style={{ cursor: "pointer" }}
                      >
                        {row[ele.key] === "approve" ? (
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
                            title={
                              <React.Fragment>
                                <Typography color="inherit">
                                  {row?.disapproveMessage}
                                </Typography>
                              </React.Fragment>
                            }
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
                        ) : (
                          <Tooltip
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            title={
                              <React.Fragment>
                                <Typography color="inherit">
                                  {row[ele.key] === "completed"
                                    ? "Pending for admin approval"
                                    : "Please complete KYC"}
                                </Typography>
                              </React.Fragment>
                            }
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
export default Tabledata;
