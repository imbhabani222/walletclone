import DashboardIcon from "../../../../public/MasterLayoutImg/Dashboard.svg";
import ProfileIcon from "../../../../public/MasterLayoutImg/Profile.svg";
import SettingIcon from "../../../../public/MasterLayoutImg/Setting.svg";
import ProductIcon from "../../../../public/MasterLayoutImg/product.svg";
import SalesIcon from "../../../../public/MasterLayoutImg/finance.svg";
import ReportIcon from "../../../../public/MasterLayoutImg/report.svg";
import ALL_USER_CONSTANTS from "../../../constant/userconstant";
import CONSTANTS from "@/src/constant/constant";

const {
  MASTER_LAYOUT: {
    DASHBOARD_DATA,
    REPORT_DATA,
    PROFILE_DATA,
    WALLET_DATA,
    SETTING_DATA,
    PRODUCTS,
    SALES_REGISTER_DATA,
  },
} = ALL_USER_CONSTANTS;

const {
  PAGE_ROUTES: {
    REPORT,
    DASHBOARD,
    SUPER_ADMIN,
    SETTING,
    APIKEYSET,
    PROSETTINGS,
    PRODUCT_LISTING,
    SALES_REGISTER,
  },
  ROLES: { TENANTADMIN, ORGADMIN, SUPERADMIN, PRODUCTOWNER,FINANCEADMIN },
} = CONSTANTS;

export const HomeButtons = [
  {
    id: 1,
    text: DASHBOARD_DATA,
    icon: DashboardIcon,
    active: true,
    roleData: [
      {
        role: SUPERADMIN,
        path: SUPER_ADMIN,
      },
      {
        role: TENANTADMIN,
        path: DASHBOARD,
      },
      {
        role: ORGADMIN,
        path: DASHBOARD,
      },
      {
        role: PRODUCTOWNER,
        path: APIKEYSET,
      },
    ],
  },
  {
    id: 2,
    text: REPORT_DATA,
    icon: ReportIcon,
    active: true,
    roleData: [
      // {
      //   role: SUPERADMIN,
      //   path: REPORT,
      // },
      {
        role: TENANTADMIN,
        path: REPORT,
      },
      {
        role: ORGADMIN,
        path: REPORT,
      },
    ],
  },
  {
    id: 3,
    text: PRODUCTS,
    icon: ProductIcon,
    active: true,
    roleData: [
      {
        role: PRODUCTOWNER,
        path: "/listingpage",
      },
      {
        role: TENANTADMIN,
        path: "/listingpage",
      },
    ],
  },
  {
    id: 4,
    text: SALES_REGISTER_DATA,
    icon: SalesIcon,
    active: true,
    roleData: [
      {
        role: TENANTADMIN,
        path: SALES_REGISTER,
      },
      {
        role: ORGADMIN,
        path: SALES_REGISTER,
      },
      {
        role: FINANCEADMIN,
        path: SALES_REGISTER,
      },
    ],
  },
  {
    id: 5,
    text: SETTING_DATA,
    icon: SettingIcon,
    active: true,
    roleData: [
      {
        role: TENANTADMIN,
        path: SETTING,
      },
      {
        role: ORGADMIN,
        path: SETTING,
      },
      {
        role: PRODUCTOWNER,
        path: PROSETTINGS,
      },
    ],
  },
];
