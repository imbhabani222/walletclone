const ALL_USER_CONSTANTS = {
  MASTER_LAYOUT: {
    USER_NAME: "Thomas",
    LOGOUT: "Logout",
    DASHBOARD_DATA: "Dashboard",
    PROFILE_DATA: "Profile",
    WALLET_DATA: "Wallet",
    SETTING_DATA: "Settings",
    REPORT_DATA: "Reports",
    PRODUCTS: "Products",
    FOOTER_DATA: "Copyright ©",
    SALES_REGISTER_DATA: "Finance",
  },
  DASHBOARD_PAGE: {
    ORGANIZATION: "Organisation List",
    USER_MANAGEMENT: "User Management",
  },
  USER_LIST: {
    USER_LIST_DATA: "User List",
    ADD_USER_BTN: "Add User",
    USER_TABLE_HEADING: [
      { label: "Name", key: "name" },
      { label: "Email Address", key: "email" },
      { label: "Phone Number", key: "mobile" },
      { label: "Role", key: "roles" },
      { label: "Assigned Resource", key: "assignedResource" },
      { label: "Action", key: "status" },
      { label: "", key: "edit" },
    ],
    USER_DATA: [
      {
        id: "493ae3ef-edac-4a4f-9e0f-091391a0afc8",
        name: "Mihir Behera",
        email: "mihir@hutechsolutions.com",
        mobile: "9876543567",
        roles: ["ProductOwner"],
      },
      {
        id: "75d6bb09-aa65-4e44-999d-0faa34dedbb4",
        name: "Chitra Sahu",
        email: "chitrasahu020@gmail.com",
        mobile: "9438521269",
        roles: ["TenantAdmin"],
      },
      {
        id: "4d63c35c-da25-402d-8362-9e452a4b86b6",
        name: "Nitya",
        email: "nitya@gmail.com",
        mobile: "1254368754",
        roles: ["ProductOwner"],
      },
    ],
  },
  TENENT_LIST: {
    TENENT_TABLE_HEADING: [
      { label: "Organisation Name", key: "name" },
      { label: "Business Type", key: "businessType" },
      { label: "Industry Type", key: "industryType" },
      { label: "Action", key: "status" },
    ],
    TENENT_DATA: [
      {
        id: "18a20cc4-ea96-49b1-9609-cb70aa7d406e",
        name: "Sulaiman",
        email: "sksckm@gmail.com",
        mobile: "9876578987",
        roles: ["TenantAdmin"],
        status: "enabled",
      },

      {
        id: "4d140d60-45b6-417c-b307-1c85d33c1fc9",
        name: "Vishakha Sinha",
        email: "vishakha@hutechsolutions.com",
        mobile: "7875274633",
        roles: ["TenantAdmin"],
        status: "disabled",
      },
      {
        id: "ad2bd230-4dbf-41d3-a80f-35a44913a846",
        name: "Vishakha",
        email: "vishakha@gmail.com",
        mobile: "7875274644",
        roles: ["TenantAdmin"],
        status: "enabled",
      },
    ],
    TENENT_LIST_DATA: "Organisation List",
  },
};

const USER_CONST = Object.freeze(ALL_USER_CONSTANTS);

export default USER_CONST;
