import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Grid,
  TextField,
  Button,
  Backdrop,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Styles from "../aaditionalProof/modal.module.scss";
import Image from "next/image";
import crossIcon from "../../../public/report/cross_icon.svg";

const CancelModal = ({ visible, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    background: "#FFF",
    p: 4,
  };
  // const [clremark, setClremark] = useState("");
  // const [clremsg, setClremsg] = useState("");
  const form = useForm({
    defaultValues: {
      remark: "",
      reason: "",
    },
  });

  const {
    register,
    watch,
    reset,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });

  useEffect(() => {
    reset();
  }, [visible]);

  const onSelectRemark = async (data) => {
    try {
      const newValue = data.target.value;
      // console.log(newValue);
      // setClremark(newValue);
      setValue("remark", newValue);
      if (newValue === "Duplicate") {
        setValue("reason", "1");
        // setClremsg("1");
      } else if (newValue === "Data Entry Mistake") {
        setValue("reason", "2");
        // setClremsg("2");
      } else if (newValue === "Order Cancelled") {
        setValue("reason", "3");
        // setClremsg("3");
      } else if (newValue === "Others") {
        setValue("reason", "4");
        // setClremsg("4");
      } else {
        // setClremsg("");
      }
      // setValue("remark", clremark);
      // setValue("reason", clremsg);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  return (
    <Modal
      open={visible}
      // onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        onClick: () => null,
      }}
      disableBackdropClick
    >
      <Box sx={{ ...style, width: 500 }}>
        <Grid container direction="column">
          <form onSubmit={handleSubmit(handleClose)}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box className={Styles.reject_heading}>Reason for Cancel</Box>
                <Image
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleClose("cancel")}
                  alt="crossIcon"
                  {...crossIcon}
                />
              </Stack>
              <FormControl
                fullWidth
                sx={{ background: "#fff", marginTop: "2rem" }}
              >
                <InputLabel id="demo-multiple-name-label">Remark</InputLabel>

                <Controller
                  name={"remark"}
                  control={control}
                  rules={{ required: "Please select Remark" }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      value={getValues("remark")}
                      name="remark"
                      label="Remark"
                      className={Styles.materialSelect}
                      onChange={(e) => onSelectRemark(e)}
                      error={
                        errors?.remark?.type === "required" &&
                        !errors?.remark?.ref?.value
                      }
                    >
                      <MenuItem value={"Duplicate"}>Duplicate </MenuItem>
                      <MenuItem value={"Data Entry Mistake"}>
                        Data Entry Mistake
                      </MenuItem>
                      <MenuItem value={"Order Cancelled"}>
                        Order Cancelled
                      </MenuItem>
                      <MenuItem value={"Others"}>Others</MenuItem>
                    </Select>
                  )}
                ></Controller>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ background: "#fff", marginTop: "2rem" }}
              >
                <Controller
                  name={"reason"}
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      value={getValues("reason")}
                      variant="outlined"
                      label={"Reason"}
                      className={Styles.form_input}
                      disabled
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Stack
              direction="row"
              gap="0.94rem"
              justifyContent="space-between"
              sx={{ marginTop: "3.18rem" }}
            >
              <Button
                onClick={() => handleClose("cancel")}
                className={Styles.btn_cancel}
              >
                Cancel
              </Button>
              <Button type="submit" className={Styles.btn_submit}>
                Submit
              </Button>
            </Stack>
          </form>
        </Grid>
      </Box>
    </Modal>
  );
};
export default CancelModal;
