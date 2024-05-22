import Cookies from "universal-cookie";

const cookies = new Cookies();

const date = `=;expires=${new Date().toUTCString()};path=/`;

const Auth = {
  set(name, value, options = { path: "/" }) {
    return cookies.set(name, value, options);
  },

  get(value) {
    const token = cookies.get(value);
    return token;
  },

  remove(value) {
    return cookies.remove(value);
  },
  getIdenitityId() {
    const token = cookies.get("identityId");
    return token;
  },
  getLoginUser() {
    const token = cookies.get("loginuser");
    return token;
  },
  getAuthToken() {
    const token = cookies.get("token");
    return token;
  },
  getRole() {
    const token = cookies.get("roles");
    return token;
  },
  getUserDetails() {
    const token = cookies.get("userDetails");
    return token;
  },
  getSessionKey() {
    const token = cookies.get("sessionKey");
    return token;
  },
  getOrgId() {
    const token = cookies.get("orgId");
    return token;
  },
  getSessionDetails() {
    const details = cookies.get("sessionDetails");
    return details;
  },
  removeCandidateDetail() {
    deleteAllCookies();
    return cookies.remove("roles", { path: "/" });
  },
  setSessionKey(sessionKey) {
    this.set("sessionKey", sessionKey, {
      path: "/",
      // expires: new Date(Date.now() + 12 * 60 * 60 * 1000)
      expires: 0,
    });
  },

  storeSessionDetails(obj) {
    this.set("sessionDetails", obj);
  },

  isAuthenticated() {
    const sessionKey = cookies.get("sessionKey");
    const isSessionValid =
      sessionKey !== null && sessionKey !== "" && sessionKey !== undefined;
    return isSessionValid;
  },

  removeSessionKey() {
    deleteAllCookies();
    cookies.remove("sessionKey", { path: "/" });
  },
};

const deleteAllCookies = () => {
  document.cookie.split(";").forEach((ck) => {
    document.cookie = ck?.replace(/^ +/, "")?.replace(/=.*/, date);
  });
};

export default Auth;
