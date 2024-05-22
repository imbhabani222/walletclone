import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import DownloadIcon from "../../../public/report/download_icon.svg";
import styles from "../tabledata/tabledata.module.scss";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  CleargetSalesHeader,
  getSalesHeader,
} from "@/src/redux/actionCreator/allOrgMethod";
import { apiFailureAlert } from "@/src/redux/actionCreator";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const SalesTable = ({
  tableHeading,
  data,
  getProductId,
  getSelectStartDate,
  getSelectEndDate,
}) => {
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  const {
    getSalesHeader: { resultData, isLoading },
  } = reducerData;
  const downloadHeaderXL = (e) => {
    if (e?.length === 0) {
      dispatch(apiFailureAlert("No Record Found"));
    }
    if (e && e?.length > 0) {
      const ws = XLSX.utils.json_to_sheet(e);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "Sales header" + fileExtension);
    }
  };
  const downloadLineXL = (e) => {
    if (e?.length === 0) {
      dispatch(apiFailureAlert("No Record Found"));
    }
    if (e && e?.length > 0) {
      const ws = XLSX.utils.json_to_sheet(e);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "Sales line" + fileExtension);
    }
  };
  const downloadConsolidateXL = (e) => {
    if (e?.length === 0) {
      dispatch(apiFailureAlert("No Record Found"));
    }
    if (e && e?.length > 0) {
      const ws = XLSX.utils.json_to_sheet(e);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "Consolidate Sales" + fileExtension);
    }
  };

  const getSalesHeaderData = (
    type,
    getProductId,
    getSelectStartDate,
    getSelectEndDate
  ) => {
    dispatch(
      getSalesHeader({
        query: `?startDate=${getSelectStartDate}&endDate=${getSelectEndDate}&productId=${getProductId}&fileType=${type}`,
      })
    );

    if (type === "salesheader") {
      setType("salesheader");
    } else if (type === "salesline") {
      setType("salesline");
    } else {
      setType("consolidatedSales");
    }
  };

  useEffect(() => {
    if (resultData?.data && type) {
      if (type) {
        type === "salesheader" && downloadHeaderXL(resultData?.data);
        type === "salesline" && downloadLineXL(resultData?.data);
        type === "consolidatedSales" && downloadConsolidateXL(resultData?.data);
        setType(null);
      }
    }

    dispatch(CleargetSalesHeader());
  }, [resultData?.data, type]);
  return (
    <TableContainer
      className={styles.table_container_sales}
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
          {data?.map((ele, eleIndex) => (
            <TableRow key={eleIndex} className={styles.table_body_row}>
              <TableCell className={styles.table_body_header}>
                {ele.fileName}
              </TableCell>
              <TableCell className={styles.table_body_header}>
                {ele.description}
              </TableCell>

              <TableCell className={styles.table_body_header}>
                <Button
                  className={styles.btn_submit}
                  onClick={() =>
                    getSalesHeaderData(
                      ele.filetype,
                      getProductId,
                      getSelectStartDate,
                      getSelectEndDate
                    )
                  }
                >
                  <Image {...DownloadIcon} alt="Download icon" /> {ele.dwnBtn}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesTable;
