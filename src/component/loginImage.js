import React from "react";
import  { Grid }  from "@mui/material";
import LoginLeftSideImage from "../../public/loginImage.svg"
import Image from "next/image";
import Styles from "./loginImage.module.scss";

const LoginImage = () => (
  <Grid container className={Styles.login_image_wrap}>
    <Image
      src={LoginLeftSideImage}
      alt="image will be apper"
      fill={true}
      className={Styles.login_image}
    />
  </Grid>
);

export default LoginImage;
