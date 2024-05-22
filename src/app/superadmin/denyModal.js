import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Backdrop,
  Stack,
} from "@mui/material";
import Styles from "../aaditionalProof/modal.module.scss";
import Image from "next/image";
import crossIcon from "../../../public/report/cross_icon.svg";

const DenyModal = ({ visible, handleClose }) => {
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

  const form = useForm({
    defaultValues: {
      reason: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
  }, [visible]);

  return (
    <Modal
      open={visible}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        onClick: () => null,
      }}
      disableBackdropClick
    >
      <Box sx={{ ...style, width: 500, height: 350 }}>
        <Grid container direction="column">
          <form onSubmit={handleSubmit(handleClose)}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box className={Styles.reject_heading}>
                  Reason for Rejection
                </Box>
                <Image
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleClose("cancel")}
                  alt="crossIcon"
                  {...crossIcon}
                />
              </Stack>
              <TextField
                type="text"
                placeholder="Comments"
                {...register("reason", {
                  required: "Please enter reason",
                })}
                variant="outlined"
                label="Comments"
                fullWidth
                className={Styles.inputBox}
                id="outlined-multiline-static"
                multiline
                rows={4}
                error={!!errors.reason}
                helperText={!!errors.reason?.message && errors.reason?.message}
              />
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
export default DenyModal;
