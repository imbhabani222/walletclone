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
import styles from "../tabledata/productTable.module.scss";

const ProductTable = ({ tableHeading, tableData }) => {
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
            <TableRow key={eleIndex} className={styles.table_body_row}>
              <TableCell className={styles.table_body_header}>
                {ele.name}
              </TableCell>
              <TableCell className={styles.table_body_header}>
                {ele.productid}
              </TableCell>
              <TableCell className={styles.table_body_header}>
                {ele.type || "-"}
              </TableCell>
              <TableCell className={styles.table_body_header}>
                {`${ele.products?.toString()?.slice(0, 30)}` || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
