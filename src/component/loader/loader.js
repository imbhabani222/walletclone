import React from "react";
import Styles from "./loader.module.scss"

const Loader = ({isLoading}) => {

    return isLoading ?
       <div className={Styles.Loader}>
        <div className={Styles.dot_spinner}>
            <div className={Styles.dot_spinner_dot}></div>
            <div className={Styles.dot_spinner_dot}></div>
            <div className={Styles.dot_spinner_dot}></div>
            <div className={Styles.dot_spinner_dot}></div>
            <div className={Styles.dot_spinner_dot}></div>
            <div className={Styles.dot_spinner_dot}></div>
            <div className={Styles.dot_spinner_dot}></div>
            <div className={Styles.dot_spinner_dot}></div>
        </div>
        </div>
        : null
    
}

export default Loader;