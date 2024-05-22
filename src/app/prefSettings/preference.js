import React from "react";
import  { Grid, Select, Typography, Button, MenuItem } from "@mui/material";
import Styles from "./prefsetting.module.scss"




const Preference = () => {

    return (
        <>
        <Grid container>
          <Grid item xs={12} sm={12} md = {12} lg = {4} xl = {4}>
            <Typography>Preference 1</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md = {12} lg = {4} xl = {4}>
             <Select
              className={Styles.preferenceDropDown}
               >
              <MenuItem>
              
              </MenuItem>
             </Select>
          </Grid>
        
        </Grid>

        
        </>
    )


}

export default Preference;