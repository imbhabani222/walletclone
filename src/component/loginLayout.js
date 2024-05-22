import React from "react";
import { Grid } from "@mui/material";
import LoginImage from "./loginImage";
import Footer from "./footer/footer";

const LoginLayout = ({ children }) => (
  <Grid container>
    <Grid item md={5} lg={5} xl={5}>
      <LoginImage />
    </Grid>
    <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
      {children}
    </Grid>
    <Grid item xs={12} sm={12}>
      <Footer />
    </Grid>
  </Grid>
);

export default LoginLayout;
