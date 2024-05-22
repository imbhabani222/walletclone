import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Backdrop,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import styles from "../app/dashboard/dashboard.module.scss";
import crossIcon from "../../public/report/cross_icon.svg";
import Tabledata from "@/src/component/tabledata/tabledata";
import ALL_USER_CONSTANTS from "../constant/userconstant";
import {
  userList,
  byRole,
  addUser,
  enableDisableOrg,
  updateUser,
} from "../redux/actionCreator/allOrgMethod";
import Auth from "../config/auth";
import { sentenceCase } from "../app/signup/util";
import SearchAndFilter from "../utils/searchAndFilter";
import {
  allOrg,
  clearallOrg,
  enableDisableProductOwner,
} from "../redux/actionCreator/allOrgMethod";
import UserTable from "./userTable/userTable";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

const Userlist = () => {
  const {
    USER_LIST: { USER_LIST_DATA, ADD_USER_BTN, USER_TABLE_HEADING, USER_DATA },
  } = ALL_USER_CONSTANTS;
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [roleArray, setRolesArray] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  const {
    addUser: { resultData: addUserData },
    userList: { resultData: userListData },
    byRole: { resultData: byRoleData },
    allOrg: { resultData: orgData },
    enabledDisableProductOwner: { resultData: enabledDisableProductOwnerData },
    updateUserData: { resultData: updateUserResponse },
  } = reducerData;
  // console.log("addUser", enabledDisableProductOwnerData);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "5px",
    // p: 4,
  };
  useEffect(() => {
    if (addUserData || enabledDisableProductOwnerData || updateUserResponse) {
      const payload = {
        headers: {
          tenantid: Auth.getUserDetails().tenantId,
          orgid: Auth.getUserDetails().orgId,
        },
      };
      dispatch(userList(payload));
      // dispatch(byRole(payload));
    }
  }, [addUserData, enabledDisableProductOwnerData, updateUserResponse]);

  useEffect(() => {
    const role =
      Auth?.getRole() === "OrgAdmin"
        ? ["ProductOwner"]
        : ["ProductOwner", "OrgAdmin", "FinanceAdmin"];
    setRolesArray(role);
    const payload = {
      headers: {
        orgid: Auth.getUserDetails()?.orgId,
        tenantid: Auth.getUserDetails()?.tenantId,
      },
    };
    dispatch(allOrg(payload));

    const payloadUser = {
      headers: {
        tenantid: Auth.getUserDetails().tenantId,
        orgid: Auth.getUserDetails().orgId,
      },
    };
    dispatch(userList(payloadUser));
    dispatch(byRole(payloadUser));
    return () => {
      dispatch(clearallOrg());
    };
  }, []);

  useEffect(() => {
    if (userListData) {
      const data = userListData?.rows;
      const sortedArray = data?.sort((a, b) =>
        a?.name.toLowerCase().localeCompare(b?.name.toLowerCase())
      );
      sortedArray?.forEach((item) => {
        item.roles = item.roles.toString();
        item.assignedResource = item?.resource?.name;
      });
      setTableData([...data]);
    }
  }, [userListData]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      Phone: "",
      AssignedProduct: "",
      role: "",
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleReset = () => {
    reset();
  };
  const onSubmit = (data) => {
    if (selectedRecord) {
      console.log(data);
      const resourceData =
        data.role === "ProductOwner" || data.role === "FinanceAdmin"
          ? byRoleData?.data?.filter((item) => item.id === data.AssignedProduct)
          : // ? data.role === "OrgAdmin"
            orgData?.data?.filter((item) => item.id === data.AssignedProduct);
      // : [];
      console.log("resourceData", resourceData, orgData);
      const payload = {
        headers: {
          orgid:
            data.role === "ProductOwner" || data.role === "FinanceAdmin"
              ? resourceData?.[0]?.orgId
              : resourceData?.[0]?.id,
          tenantid: Auth.getUserDetails()?.tenantId,
          id: selectedRecord?.id,
        },
        params: selectedRecord?.id,
        body: {
          name: sentenceCase(data.name),
          resourceId:
            data.role === "ProductOwner" || data.role === "FinanceAdmin"
              ? resourceData?.[0]?.productid
              : resourceData?.[0]?.id,
          email: data.email,
          role: [data.role],
          mobile: data.Phone,
          resource: resourceData?.[0],
        },
      };
      dispatch(updateUser(payload));
      setSelectedRecord(null);
    } else {
      // console.log(data.role);
      const resourceData =
        data.role === "ProductOwner" || data.role === "FinanceAdmin"
          ? byRoleData?.data?.filter((item) => item.id === data.AssignedProduct)
          : orgData?.data?.filter((item) => item.id === data.AssignedProduct);
      // console.log("resourceData", resourceData);
      const payload = {
        headers: {
          orgid:
            data.role === "ProductOwner" || data.role === "FinanceAdmin"
              ? resourceData?.[0]?.orgId
              : resourceData?.[0]?.id,
          tenantid: Auth.getUserDetails()?.tenantId,
        },
        body: {
          name: sentenceCase(data.name),
          resourceId:
            data.role === "ProductOwner" || data.role === "FinanceAdmin"
              ? resourceData?.[0]?.productid
              : resourceData?.[0]?.id,
          email: data.email,
          role: [data.role],
          mobile: data.Phone,
          status: "Active",
          resource: resourceData?.[0],
        },
      };
      dispatch(addUser(payload));
    }
    reset();
    setOpen(false);
  };
  const getFormValues = (data) => {
    console.log(data, "data");
  };

  const onSearchData = (event) => {
    const {
      target: { value },
    } = event;
    const data = userListData?.rows;
    data?.forEach((item) => {
      item.roles = item.roles.toString();
      item.assignedResource = item?.resource?.name;
    });
    if (value?.length > 0) {
      const searchObject = {
        searchByKeyword: value,
      };
      const result = SearchAndFilter(searchObject, data);
      setTableData([...result]);
    } else {
      setTableData([...data]);
    }
  };
  const onChangeStatus = (event, record) => {
    const payload = {
      params: record?.id,
      body: {
        role: record?.roles,
        status: event ? "enabled" : "disabled",
      },
    };
    dispatch(enableDisableProductOwner(payload));
  };
  const oneditUserDetails = (record) => {
    setSelectedRecord(record);
    setOpen(true);
    setValue("name", record?.name);
    setValue("email", record?.email);
    setValue("Phone", record?.mobile);
    setValue("role", record?.roles);
    setValue("AssignedProduct", record?.resource?.id);
  };

  const onSelectRole = (role) => {
    setSelectedRecord({ ...selectedRecord, roles: role });
  };
  const handleChange = (data, name) => {
    setValue(`${name}`, data?.target?.value);
    if (name === "role") {
      setValue("AssignedProduct", "");
    }
  };
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
  };

  return (
    <Box className={styles.table_data_container}>
      <Grid
        container
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        className={styles.table_tab_header}
      >
        <Grid item xs={12} sm={6}>
          <Box className={styles.table_data_text}> {USER_LIST_DATA}</Box>
        </Grid>

        <Grid
          direction="row"
          flexWrap="wrap"
          // gap="1.44rem"
          container
          item
          xs={12}
          sm={6}
          spacing={2}
        >
          <Grid item xs={12} sm={8}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              hiddenLabel
              onChange={(event) => onSearchData(event)}
              placeholder="Search"
              onKeyDown={handleKeyDown}
              InputProps={{
                style: { backgroundColor: "#fff" },
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                style: {
                  height: "0.5rem",
                  backgroundColor: "#fff",
                  // border: "1px solid #DDDDDD",
                  borderRadius: "5px",
                  padding: "0.9rem 0 0.9rem 1.25rem",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} className={styles.table_btn_wrapper}>
            <Button
              variant="contained"
              className={styles.table_btn_user}
              onClick={handleOpen}
            >
              {ADD_USER_BTN}
            </Button>
          </Grid>

          <Modal
            open={open}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              onClick: () => null,
            }}
            disableBackdropClick
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.table_modal}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box sx={{ margin: "1.25rem 1.19rem 0" }}>New User</Box>
                <Image
                  onClick={() => {
                    setOpen(false);
                    handleReset();
                  }}
                  style={{ marginTop: "1.25rem", marginRight: "1rem" }}
                  alt="crossIcon"
                  {...crossIcon}
                />
              </Stack>
              <Divider sx={{ width: "100%", margin: "1.25rem 0 3rem" }} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                  direction="column"
                  spacing={4}
                  sx={{ padding: "0 2.44rem 2.44rem" }}
                >
                  <TextField
                    type="text"
                    variant="outlined"
                    label={"Name"}
                    className={styles.form_input}
                    {...register("name", {
                      required: "Please enter your name",
                      minLength: {
                        value: 3,
                        message: "Minimum length is 3 characters",
                      },
                    })}
                    onKeyDown={handleKeyDown}
                    error={!!errors.name}
                    helperText={!!errors.name && errors.name.message}
                  />
                  <TextField
                    // type="email"
                    type="text"
                    variant="outlined"
                    label={"Email Address"}
                    className={styles.form_input}
                    {...register("email", {
                      required: "Please enter your email",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    onKeyDown={handleKeyDown}
                    error={!!errors.email}
                    helperText={!!errors.email && errors.email?.message}
                  />
                  <TextField
                    type="number"
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }}
                    {...register("Phone", {
                      required: "Please enter your phone number",
                      minLength: {
                        value: 10,
                        message: "Minimum 10 digit",
                      },
                    })}
                    variant="outlined"
                    label={"Phone Number"}
                    className={styles.form_input}
                    error={!!errors.Phone}
                    helperText={!!errors.Phone && errors.Phone?.message}
                  />

                  <FormControl
                    className={styles.form_input}
                    error={
                      errors?.role?.type === "required" &&
                      !errors?.role?.ref?.value
                    }
                  >
                    <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                    <Controller
                      name="role"
                      control={control}
                      defaultValue={watch("role") ?? ""}
                      rules={{ required: "Please select role" }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          onChange={(e) => handleChange(e, "role")}
                          AssignedProduct
                          className={styles.form_input}
                          error={
                            errors?.role?.type === "required" &&
                            !errors?.role?.ref?.value
                          }
                          input={<OutlinedInput label={"Role"} />}
                          value={value}
                        >
                          {roleArray.map((item, index) => (
                            <MenuItem
                              key={item}
                              value={item}
                              className={styles.selected_item}
                            >
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    ></Controller>

                    {!errors?.role?.ref?.value && (
                      <span className={styles.selected_item_error}>
                        {errors.role?.message}
                      </span>
                    )}
                  </FormControl>
                  {watch("role") === "OrgAdmin" && (
                    <FormControl
                      className={styles.form_input}
                      error={
                        errors?.AssignedProduct?.type === "required" &&
                        !errors?.AssignedProduct?.ref?.value
                      }
                    >
                      <InputLabel id="demo-multiple-name-label">
                        {"Assigned Resource"}
                      </InputLabel>

                      <Controller
                        name="AssignedProduct"
                        control={control}
                        defaultValue={watch("AssignedProduct") ?? ""}
                        rules={{ required: "Please select resources" }}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            // fullWidth
                            onChange={(e) => handleChange(e, "AssignedProduct")}
                            className={styles.form_input}
                            error={
                              errors?.AssignedProduct?.type === "required" &&
                              !errors?.AssignedProduct?.ref?.value
                            }
                            input={
                              <OutlinedInput label={"Assigned Resource"} />
                            }
                            value={value}
                          >
                            {orgData?.data
                              ?.filter(
                                (item) =>
                                  item.verificationStatus === "approve" &&
                                  item.approvedStatus !== "disable"
                              )
                              .map(({ name, id }) => (
                                <MenuItem
                                  key={id}
                                  value={id}
                                  className={styles.selected_item}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                          </Select>
                        )}
                      ></Controller>

                      {!errors?.AssignedProduct?.ref?.value && (
                        <span className={styles.selected_item_error}>
                          {errors.AssignedProduct?.message}
                        </span>
                      )}
                    </FormControl>
                  )}
                  {watch("role") === "ProductOwner" && (
                    <FormControl
                      className={styles.form_input}
                      error={
                        errors?.AssignedProduct?.type === "required" &&
                        !errors?.AssignedProduct?.ref?.value
                      }
                    >
                      <InputLabel id="demo-multiple-name-label">
                        Assigned Product
                      </InputLabel>
                      <Controller
                        name="AssignedProduct"
                        control={control}
                        defaultValue={watch("AssignedProduct") ?? ""}
                        rules={{ required: "Please select products" }}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            // fullWidth
                            onChange={(e) => handleChange(e, "AssignedProduct")}
                            className={styles.form_input}
                            error={
                              errors?.AssignedProduct?.type === "required" &&
                              !errors?.AssignedProduct?.ref?.value
                            }
                            input={<OutlinedInput label={"Assigned Product"} />}
                            value={value}
                          >
                            {byRoleData?.data?.map(({ name, id }) => (
                              <MenuItem
                                key={id}
                                value={id}
                                className={styles.selected_item}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      ></Controller>

                      {!errors?.AssignedProduct?.ref?.value && (
                        <span className={styles.selected_item_error}>
                          {errors.AssignedProduct?.message}
                        </span>
                      )}
                    </FormControl>
                  )}
                  {watch("role") === "FinanceAdmin" && (
                    <FormControl
                      className={styles.form_input}
                      error={
                        errors?.AssignedProduct?.type === "required" &&
                        !errors?.AssignedProduct?.ref?.value
                      }
                    >
                      <InputLabel id="demo-multiple-name-label">
                        Assigned Product
                      </InputLabel>
                      <Controller
                        name="AssignedProduct"
                        control={control}
                        defaultValue={watch("AssignedProduct") ?? ""}
                        rules={{ required: "Please select products" }}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            // fullWidth
                            onChange={(e) => handleChange(e, "AssignedProduct")}
                            className={styles.form_input}
                            error={
                              errors?.AssignedProduct?.type === "required" &&
                              !errors?.AssignedProduct?.ref?.value
                            }
                            input={<OutlinedInput label={"Assigned Product"} />}
                            value={value}
                          >
                            {byRoleData?.data?.map(({ name, id }) => (
                              <MenuItem
                                key={id}
                                value={id}
                                className={styles.selected_item}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      ></Controller>

                      {!errors?.AssignedProduct?.ref?.value && (
                        <span className={styles.selected_item_error}>
                          {errors.AssignedProduct?.message}
                        </span>
                      )}
                    </FormControl>
                  )}
                  <Divider />
                  <Stack direction="row" justifyContent="end" gap="10px">
                    <Button
                      className={styles.login_continue_btn}
                      sx={{ textTransform: "capitalize" }}
                      type="submit"
                      variant="outlined"
                      onClick={() => {
                        setOpen(false);
                        handleReset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={styles.login_continue_btn}
                      type="submit"
                      sx={{
                        background: "#3633B7",
                        textTransform: "capitalize",
                      }}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Modal>
        </Grid>
      </Grid>
      {/* <Divider sx={{ width: "100%", margin: "1rem 0 1.25rem" }} /> */}
      <UserTable
        tableData={tableData}
        tableHeading={USER_TABLE_HEADING}
        onChangeToggle={onChangeStatus}
        onUserEdit={oneditUserDetails}
      />
    </Box>
  );
};

export default Userlist;
