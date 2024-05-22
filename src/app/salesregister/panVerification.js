import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Grid,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Modal } from "antd";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Styles from "./salesregister.module.scss";
import UploadIcon from "../../../public/report/upload_icon.svg";
import UploadFileIcon from "../../../public/report/upload_file_icon.svg";
import Image from "next/image";
import URL from "../../config/envURL";
import Auth from "../../config/auth";
import Dragger from "antd/es/upload/Dragger";
import config from "../../config/envURL";
import { DotSpinner } from "@uiball/loaders";
import {
  panAadharLink,
  clearPanAadharLink,
  panAadharLinkExcel,
} from "@/src/redux/actionCreator/invoiceMethod";
import axios from "axios";

const PanVerification = () => {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(null);
  const [fetchExcelData, setFetchExcelData] = useState([]);
  const [disableUploadBtn, setDisableUploadBtn] = useState(true);
  const [fileListDoc, setFileListDoc] = useState([]);
  const reducerData = useSelector(
    (state) => state?.invoiceReducer || null,
    shallowEqual
  );
  const {
    panAadharLinkData: {
      resultData: panAadharLinkResponse,
      isLoading: panLoader,
    },
  } = reducerData;
  useEffect(() => {
    dispatch(clearPanAadharLink());
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      body: {
        businessPan: data?.pan,
      },
    };
    dispatch(panAadharLink(payload));
  };

  const handleModalOpen = () => {
    dispatch(clearPanAadharLink());
    setModalOpen(true);
    reset();
  };

  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
  };

  const handlefileChange = async ({ fileList: newFileList }) => {
    setFileListDoc(newFileList);
    setDisableUploadBtn(false);
    setLoading(true);
  };
  const onUploadExcel = () => {
    var formData = new FormData();
    formData.append("excelFile", fileListDoc[0]?.originFileObj);

    axios
      .post(
        `${URL.API.baseURL}customer/api/v2.0/customers/panstatusMulti`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": "XXX",
          },
        }
      )
      .then((response) => {
        console.log(response?.data || "Data Saved successfully");
        setFetchExcelData(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
      });
    reset();
    setModalOpen(false);
    setFileListDoc([]);
    setDisableUploadBtn(true);
  };
  const downloadPanXL = (e) => {
    if (e && e?.length > 0) {
      const ws = XLSX.utils.json_to_sheet(e);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer]);
      FileSaver.saveAs(data, "PanList" + ".xlsx");
    }
  };
  return (
    <Grid container className={Styles.fin_container}>
      <Grid
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={Styles.fin_con_grid}
      >
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className={Styles.text_field_data}
            >
              <TextField
                type="text"
                defaultValue={watch("pan") ?? ""}
                {...register("pan", {
                  required: "Please enter Pan Number",
                })}
                value={watch("pan") ?? ""}
                onKeyDown={handleKeyDown}
                variant="outlined"
                label={"PAN"}
                size="small"
                className={Styles.form_input}
                error={!!errors.pan}
                helperText={!!errors.pan && errors.pan?.message}
              />
              <Button
                className={Styles.pan_sub_btn}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </form>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={Styles.text_pan_data}
          >
            <Card className={Styles.pan_ver_card}>
              {panLoader ? (
                <CardContent className={Styles.card_content_style}>
                  <DotSpinner size={40} speed={0.9} color="#3633B7" />
                </CardContent>
              ) : (
                panAadharLinkResponse?.message && (
                  <CardContent className={Styles.card_content_style}>
                    <Typography
                      variant="p"
                      style={{
                        color:
                          panAadharLinkResponse?.linked === true
                            ? "#219653"
                            : "red",
                      }}
                    >
                      {panAadharLinkResponse?.message}
                    </Typography>
                  </CardContent>
                )
              )}
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          {" "}
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={10}
            xl={10}
            // style={{ margin: "0 6rem" }}
          >
            <Button
              className={Styles.bulk_btn}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              onClick={handleModalOpen}
            >
              <Image src={UploadIcon} className={Styles.uploadIcon} /> Bulk
              Upload
            </Button>
            <Modal
              footer={null}
              open={modalOpen}
              onCancel={() => {
                setModalOpen(false);
              }}
            >
              <Box style={{ height: "400px" }}>
                <p style={{ fontSize: "18px", margin: "5px 0px 25px 5px" }}>
                  Upload Document
                </p>
                <div
                  style={{
                    height: "250px",
                    width: "100%",
                    margin: "auto",
                    background: "#f8f8ff",
                  }}
                >
                  <Dragger
                    className={Styles.dragger_file}
                    style={{
                      width: "100%",
                    }}
                    name="excelFile"
                    method="POST"
                    action={`${URL.API.baseURL}customer/api/v2.0/customers/panstatusMulti`}
                    fileList={fileListDoc}
                    onChange={handlefileChange}
                    accept=".xls, .xlsx"
                    maxCount={1}
                    multiple={false}
                    beforeUpload={(file) => {
                      const maxSize = 5 * 1024 * 1024;
                      if (file.size > maxSize) {
                        console.log("File size must be less than 5MB");
                      }
                    }}
                    onRemove={() => {
                      setDisableUploadBtn(true);
                      setFileListDoc([]);
                    }}
                  >
                    <Image src={UploadFileIcon} className={Styles.uploadIcon} />
                    <p
                      style={{
                        fontWeight: "bold",
                        margin: "1.59rem auto 0.62rem",
                        textAlign: "center",
                        fontSize: "1rem",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "1.5rem",
                      }}
                    >
                      <>
                        Drag & drop files or{" "}
                        <span
                          style={{
                            color: "#483ea8",
                            textDecorationLine: "underline",
                          }}
                        >
                          Browse
                        </span>
                      </>
                    </p>

                    <p className="ant-upload-hint">Supported File size 5 MB</p>
                  </Dragger>

                  <Button
                    className={
                      !disableUploadBtn
                        ? Styles.upload_btn_active
                        : Styles.upload_btn_disable
                    }
                    onClick={onUploadExcel}
                    disabled={disableUploadBtn}
                  >
                    {" "}
                    UPLOAD FILE
                  </Button>
                </div>
              </Box>
            </Modal>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={10}
            xl={10}
            // style={{ margin: "0 5rem" }}
          >
            {/* <Card className={Styles.pan_ver_card2}>
              {" "}
              {fetchExcelData.length > 0 && (
              <CardContent className={Styles.card_content_style}>
                {loading === false ? (
                  <Button
                    className={Styles.pan_list_btn}
                    onClick={() => downloadPanXL(fetchExcelData)}
                    variant="contained"
                  >
                    Download
                  </Button>
                ) : loading === true ? (
                  <CardContent className={Styles.card_content_style}>
                    <DotSpinner size={40} speed={0.9} color="#3633B7" />
                  </CardContent>
                ) : null}
              </CardContent>
              )}
            </Card> */}
            {loading === false ? (
              <Card className={Styles.pan_ver_card2}>
                <CardContent className={Styles.card_content_style}>
                  <Button
                    className={Styles.pan_list_btn}
                    onClick={() => downloadPanXL(fetchExcelData)}
                    variant="contained"
                  >
                    Download
                  </Button>
                </CardContent>
              </Card>
            ) : loading === true ? (
              <Card className={Styles.pan_ver_card2}>
                <CardContent className={Styles.card_content_style}>
                  <DotSpinner size={40} speed={0.9} color="#3633B7" />
                </CardContent>
              </Card>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PanVerification;
