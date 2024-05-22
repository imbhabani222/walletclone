const ALL_CONSTANT = {
  PAGE_ROUTES: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    PRODUCT: "/product",
    ORGANIZATION: "/organization",
    SUPER_ADMIN: "/superadmin",
    DASHBOARD: "/dashboard",
    WALLET: "/wallet",
    PROFILE: "/profile",
    SETTING: "/settings",
    NOT_AUTH: "/401",
    REPORT: "/report",
    APIKEY: "/apikey",
    // SALESREGISTER: "/salesregister",
    APIKEYSET: "/apiKey",
    PROSETTINGS: "/proSettings",
    CREATE_ORGANISATION: "/createOrg",
    VERIFY_SUCCESS: "/verificationSuccess",
    PRODUCT_LISTING: "/listingpage",
    SALES_REGISTER: "/salesregister",
    PRODUCTS: "/products",
  },
  API_ERROR: "API Error",
  HTTP_REQUEST_METHODS: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
    METHOD_NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    UNPROCESSABLE: 422,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
  },
  HTTP_REQ_DEFAULT_HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  },
  ROLES: {
    TENANTADMIN: "TenantAdmin",
    ORGADMIN: "OrgAdmin",
    SUPERADMIN: "SuperAdmin",
    PRODUCTOWNER: "ProductOwner",
    FINANCEADMIN: "FinanceAdmin",
  },
};

const CONSTANTS = Object.freeze(ALL_CONSTANT);

export default CONSTANTS;
