"use client";
import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import error from "../../../public/error.svg";
import errorleft from "../../../public/err-left.svg";
import style from "./error.module.scss";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();
  const goToLastPage = () => {
    router.back();
  };
  return (
    <Grid container className={style.error_wrapper}>
      <Grid item xs={12} sm={4} md={4} lg={6} xl={6}>
        <Box className={style.error_left}>
          <Image
            src={errorleft}
            alt="image will be apper"
            className={style.error_image_left}
          />
          <Typography className={style.error_heading}>Oops..!</Typography>
          <Typography className={style.error_subheading}>
            Something went wrong.
          </Typography>
          <Typography className={style.error_para}>
            Sorry for the inconvenience{" "}
          </Typography>
          <Button className={style.back_btn} onClick={goToLastPage}>
            Go Back
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        lg={6}
        xl={6}
        className={style.image_wrapper}
      >
        <Image src={error} alt="sideImg" />
      </Grid>
    </Grid>
  );
};

export default Error;
