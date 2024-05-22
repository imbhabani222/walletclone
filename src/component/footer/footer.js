import React from "react";
import { Grid, Box }  from "@mui/material";
import Styles from "./footer.module.scss"

const Footer = () => {

    return (
        <Grid container>
            <Box className={Styles.footer_wrap} />
        </Grid>
    )
}
    
export default Footer;