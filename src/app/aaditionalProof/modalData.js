import React, { useEffect, useState } from "react";
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
import Styles from "./modal.module.scss";

const ModalData = ({ visible, handleClose }) => {
  const [otp, setOtp] = useState(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const form = useForm({
    defaultValues: {
      OTP: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const getOTP = (data) => {
    setOtp(data.target.value);
  };
  useEffect(() => {
    reset();
  }, [visible]);

  const onSubmitForm = (data) => {
    if (data) {
      handleClose(data?.OTP);
    }
  };
  return (
    <Modal
      open={visible}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        onClick: () => null,
      }}
      disableBackdropClick
    >
      <Box sx={{ ...style, width: 500 }}>
        <Grid container direction="column">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="p" className={Styles.title}>
              Check your mobile for the Aadhar OTP
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                type="number"
                placeholder="Enter OTP"
                onKeyDown={(evt) =>
                  ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
                }
                onKeyPress={(evt) => {
                  if (evt.target.value.length >= 6) {
                    evt.preventDefault();
                  }
                }}
                {...register("OTP", {
                  required: "Please enter otp",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Invalid otp",
                  },
                })}
                variant="outlined"
                label="OTP"
                // onChange={(event) => getOTP(event)}
                fullWidth
                className={Styles.inputBox}
                error={!!errors.OTP}
                helperText={!!errors.OTP?.message && errors.OTP?.message}
              />
              <span className={Styles.otp_text_wait}>
                Please wait, OTP will reach in 30 secs.
              </span>
            </Grid>
            <Stack
              direction="row"
              gap="0.94rem"
              justifyContent="space-between"
              sx={{ marginTop: "3.18rem" }}
            >
              <Button
                className={Styles.btn_cancel}
                onClick={() => handleClose("close")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={Styles.btn_submit}
                // onClick={() => handleClose(otp)}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Grid>
      </Box>
    </Modal>
  );
};
export default ModalData;
