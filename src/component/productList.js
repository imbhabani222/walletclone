"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
  Backdrop,
  InputAdornment,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Tabledata from "@/src/component/tabledata/tabledata";
import styles from "../app/dashboard/dashboard.module.scss";
import WestIcon from "@mui/icons-material/West";
import crossIcon from "../../public/report/cross_icon.svg";
import {
  getProduct,
  addProduct,
  dependentProduct,
  updateProduct,
} from "../redux/actionCreator/allOrgMethod";
import Auth from "../config/auth";
import LABELS from "@/src/constant/label";
import { useRouter } from "next/navigation";
import SearchAndFilter from "../utils/searchAndFilter";
import Image from "next/image";
// import { addProduct } from "../redux/worker/allOrgWorker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "auto",
  overflow: "auto",
  bgcolor: "background.paper",
  borderRadius: "5px",
};

const ProList = ({ record, goBack }) => {
  const router = useRouter();
  const { INDUSTRY_TYPE_OPTION } = LABELS;
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      type: "",
      category: "",
      dependency: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [modalOpen, setModalOpen] = useState(false);
  const [proFormData, setProFormData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [tableDatas, setTableData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log(value, "value");
    setSelectedOptions(typeof value === "string" ? value.split(",") : value);
  };
  const handleTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedType(value);
  };
  const reducerData = useSelector(
    (state) => state.allOrgReducer || null,
    shallowEqual
  );
  const {
    getProducts: { resultData: getProductData },
    addProducts: { resultData: addProductsData },
    dependantProductData: { resultData: byRoleData },
    updateProductData: { resultData: updateProductResponse },
  } = reducerData;
  const productData = byRoleData?.data?.map(({ name, id, orgId }) => {
    return { label: name, value: id, orgId: orgId };
  });

  const handleReset = () => {
    reset();
    setSelectedOptions([]);
  };
  const proTableHeading = [
    { label: "Product Name", key: "name" },
    { label: "Category", key: "type" },
    { label: "Description", key: "description" },
    { label: "Type", key: "ownershipType" },
    { label: "Dependency", key: "productsData" },
    { label: "Action", key: "edit" },
  ];
  useEffect(() => {
    const payload = {
      headers: {
        orgid: record?.id || Auth.getUserDetails()?.orgId,
        tenantid: Auth.getUserDetails()?.tenantId,
        resourceId:
          Auth.getRole() === "ProductOwner"
            ? Auth.getUserDetails()?.resourceId
            : null,
      },
    };
    dispatch(getProduct(payload));
    dispatch(dependentProduct(payload));
    handleReset();
  }, [addProductsData, updateProductResponse]);

  useEffect(() => {
    if (getProductData) {
      const { data } = getProductData;
      formatData(data);
    }
  }, [getProductData]);
  console.log(getProductData);
  const formatData = (data) => {
    console.log(data);
    data?.forEach((element) => {
      element.productsData = element?.products
        ?.toString()
        .replaceAll(",", ", ");
    });
    console.log(data);
    setTableData([...data]);
  };

  const handleModalOpen = () => {
    setSelectedRecord(null);
    setModalOpen(true);
    reset();
    setSelectedOptions([]);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const onSubmit = (data) => {
    if (selectedRecord) {
      console.log(selectedRecord);
      const payload = {
        body: {
          name: data?.name || "",
          type: data?.category || "",
          orgId: record?.id || Auth.getUserDetails()?.orgId,
          tenantId: record?.groupOrgId || Auth.getUserDetails()?.tenantId,
          ownershipType: data.type,
          products:
            data.type === "Self" ? selectedOptions?.map((ele) => ele) : [],
          description: data?.description || "",
          bankFixedCode: data?.bank_fixed_code,
          product_code: data?.["product_code"] || [],
          businessSegment: data?.business_segment || "",
          status: "active",
        },
        params: selectedRecord?.productid,
      };
      dispatch(updateProduct(payload));
      setSelectedRecord(null);
    } else {
      const payload = {
        body: {
          name: data?.name || "",
          type: data?.category || "",
          orgId: record?.id || Auth.getUserDetails()?.orgId,
          tenantId: record?.groupOrgId || Auth.getUserDetails()?.tenantId,
          ownershipType: data.type,
          products:
            data.type === "Self" ? selectedOptions?.map((ele) => ele) : [],
          product_code: data?.["product_code"] || [],
          bankFixedCode: data?.bank_fixed_code,
          businessSegment: data?.business_segment,
          description: data?.description || "",
          status: "active",
        },
      };
      dispatch(addProduct(payload));
    }

    setProFormData(data);
    setModalOpen(false);
  };

  const onUpdateProduct = (record) => {
    // console.log(record);
    setSelectedRecord(record);
    setModalOpen(true);
    setValue("name", record?.name);
    setValue("description", record?.description);
    setValue("category", record?.type);
    setValue("type", record?.ownershipType);
    setValue("business_segment", record?.businessSegment);
    setValue("bank_fixed_code", record?.bankCode);
    setValue("product_code", record?.product_code);

    //  setValue("type", record?.products)
    setSelectedOptions(record?.products);
  };
  const getRecordData = () => {};

  const onSearchData = (event) => {
    const {
      target: { value },
    } = event;
    const { data } = getProductData;
    if (value?.length > 0) {
      const searchObject = {
        searchByKeyword: value,
      };
      const result = SearchAndFilter(searchObject, data);
      formatData(result);
    } else {
      formatData(data);
    }
  };
  const handleKeyDown = (event) => {
    const { value, selectionStart } = event.target;
    if (event.keyCode === 32 && selectionStart === 0) {
      event.preventDefault();
    }
    const allowedCharactersRegex = /^[A-Za-z0-9]*$/;

    if (!allowedCharactersRegex.test(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <Box className={styles.table_data_container1}>
      <Grid
        container
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        className={styles.table_tab_header}
      >
        <Grid item xs={12} sm={6} className={styles.table_data_text}>
          {Auth?.getRole() !== "OrgAdmin" && (
            <IconButton color="#000" onClick={() => goBack()}>
              <WestIcon />
            </IconButton>
          )}
          Product List
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
              sx={{ width: "100%" }}
              hiddenLabel
              onChange={(event) => onSearchData(event)}
              placeholder="Search"
              onKeyDown={handleKeyDown}
              // className={styles.search_options}
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
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              className={styles.table_btn_product}
              onClick={handleModalOpen}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>

        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            onClick: () => null,
          }}
          disableBackdropClick
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.table_modal}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {" "}
              <Box sx={{ margin: "1.25rem 1.19rem 0" }}>
                {selectedRecord ? "Update Product" : "Add Product"}
              </Box>
              <Image
                onClick={handleModalClose}
                style={{ marginTop: "1.25rem", marginRight: "1rem" }}
                alt="crossIcon"
                {...crossIcon}
              />
            </Stack>
            <Divider sx={{ width: "100%", margin: "1.25rem 0" }} />
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ height: "550px", overflowY: "auto", paddingTop: "1rem" }}
            >
              <Stack
                direction="column"
                spacing={4}
                sx={{ padding: "0 2.44rem 2.44rem" }}
              >
                <TextField
                  type="text"
                  {...register("name", {
                    required: "Please enter product name",
                  })}
                  // onKeyDown={handleKeyDown}
                  variant="outlined"
                  label={"Product Name"}
                  className={styles.form_input}
                  error={!!errors.name}
                  helperText={!!errors.name && errors.name?.message}
                />
                <TextField
                  type="text"
                  {...register("product_code", {
                    required: "Please enter product code ",
                  })}
                  disabled={selectedRecord ? true : false}
                  // onKeyDown={handleKeyDown}
                  variant="outlined"
                  label={"Product Code"}
                  className={styles.form_input}
                  error={!!errors?.["product_code"]}
                  helperText={
                    !!errors?.["product_code"] &&
                    errors?.["product_code"]?.message
                  }
                />
                <TextField
                  type="text"
                  {...register("bank_fixed_code", {
                    required: "Please enter bank fixed code ",
                  })}
                  // onKeyDown={handleKeyDown}
                  variant="outlined"
                  label={"Bank Fixed Code"}
                  className={styles.form_input}
                  error={!!errors?.bank_fixed_code}
                  helperText={
                    !!errors?.bank_fixed_code &&
                    errors?.bank_fixed_code?.message
                  }
                />
                <TextField
                  type="text"
                  {...register("business_segment", {
                    required: "Please enter Finance Dimension Code",
                  })}
                  // onKeyDown={handleKeyDown}
                  variant="outlined"
                  label={"Finance Dimension Code"}
                  className={styles.form_input}
                  error={!!errors?.business_segment}
                  helperText={
                    !!errors?.business_segment &&
                    errors?.business_segment?.message
                  }
                />
                <TextField
                  type="Description"
                  {...register("description")}
                  // onKeyDown={handleKeyDown}
                  variant="outlined"
                  label={"Description"}
                  className={styles.form_input_not_req}
                />
                <FormControl error={!!errors.category}>
                  <InputLabel id="demo-multiple-name-label">
                    {"Category*"}
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={watch("category") || selectedRecord?.type}
                    className={styles.select_options}
                    input={<OutlinedInput label={"Category*"} />}
                    {...register("category", {
                      required: "Please select category",
                    })}
                  >
                    {INDUSTRY_TYPE_OPTION.map(({ label, value }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <span className={styles.selected_item_error}>
                      {errors.category.message}
                    </span>
                  )}
                </FormControl>
                <FormControl error={!!errors.type}>
                  <InputLabel id="demo-multiple-name-label">
                    {"Type*"}
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    input={<OutlinedInput label={"Type"} />}
                    onChange={handleTypeChange}
                    value={watch("type") || selectedRecord?.ownershipType}
                    // required="Please select type"
                    {...register("type", {
                      required: "Please select type",
                    })}
                  >
                    {["Self", "Third Party"]?.map((ele, i) => (
                      <MenuItem key={i} value={ele}>
                        {ele}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.type && (
                    <span className={styles.selected_item_error}>
                      {errors.type.message}
                    </span>
                  )}
                </FormControl>
                {watch("type") === "Self" && (
                  <FormControl>
                    <InputLabel id="demo-multiple-name-label">
                      Dependency
                    </InputLabel>
                    <Select
                      multiple
                      value={selectedOptions}
                      onChange={handleChange}
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      input={<OutlinedInput label="Dependency" />}
                      // {...register("dependency")}
                    >
                      {byRoleData?.data
                        ?.filter((item) => item.id !== selectedRecord?.id)
                        ?.map(({ id, name }) => (
                          <MenuItem key={id} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              </Stack>
              <Divider />
              <Stack
                direction="row"
                justifyContent="end"
                gap="10px"
                // spacing={4}
                sx={{ padding: "1.19rem 1.13rem" }}
              >
                <Button
                  className={styles.login_continue_btn}
                  type="submit"
                  variant="outlined"
                  sx={{
                    background: "#FFFFFF",
                    border: "1px solid  #DDDDDD",
                    borderRadius: "5px",
                    width: "25%",
                    color: "#444444",
                    textTransform: "capitalize",
                  }}
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
                <Button
                  className={styles.login_continue_btn}
                  type="submit"
                  sx={{
                    background: "#3633B7",
                    width: "25%",
                    textTransform: "capitalize",
                  }}
                  variant="contained"
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </Grid>
      {/* <Divider sx={{ width: "100%", margin: "1rem 0 1.25rem" }} /> */}
      <Tabledata
        data={tableDatas || []}
        tableHeading={proTableHeading}
        label="productList"
        isIcon={true}
        callBack={getRecordData}
        onUpdateProductdata={onUpdateProduct}
      />
    </Box>
  );
};

export default ProList;
