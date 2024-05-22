import React, { useEffect, useState } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "../tabledata/tabledata.module.scss";
import ToggleSwitch from "../toggle";
import Image from "next/image";
import deleteicon from "../../../public/productImg/delete.svg";
import editicon from "../../../public/productImg/edit.svg";

const UserTable = ({ tableHeading, tableData, onChangeToggle, onUserEdit }) => {
  return (
    <TableContainer
      className={styles.table_container}
      sx={{ height: "calc(100vh - 370px)" }}
    >
      <Table
        stickyHeader
        className={styles.table_bg}
        aria-label="customized table"
        sx={{
          // height: "100%",
          width: "100%",
        }}
      >
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
          {tableData?.map((ele, eleIndex) => (
            <TableRow
              key={eleIndex}
              className={styles.table_body_row}
              // onClick={() => handleTableRow(ele?.id, ele)}
            >
              <TableCell className={styles.table_body_header}>
                {ele.name}
              </TableCell>
              <TableCell className={styles.table_body_header}>
                {ele.email}
              </TableCell>
              <TableCell className={styles.table_body_header}>
                {ele.mobile || "-"}
              </TableCell>
              <TableCell className={styles.table_body_header}>
                {ele.roles || "-"}
              </TableCell>
              <TableCell className={styles.table_body_header}>
                {ele.assignedResource || "-"}
              </TableCell>

              <TableCell className={styles.table_body_header}>
                <ToggleSwitch
                  id={ele.id}
                  className={styles.row_toggle}
                  checked={ele.status === "disabled" ? false : true}
                  onChange={(e) => onChangeToggle(e, ele)}
                />
              </TableCell>
              <TableCell className={styles.table_body_header}>
                <Stack direction="row" alignItems="center" gap="10px">
                  <Image
                    alt="editicon"
                    {...editicon}
                    onClick={
                      ele.status !== "disabled"
                        ? () => onUserEdit(ele)
                        : undefined
                    }
                    className={
                      ele.status !== "disabled"
                        ? styles.editOption
                        : styles.editOptionDisabled
                    }
                  />
                  {/* <Image alt="deleteicon" {...deleteicon} /> */}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
