const getConfigURL = () => {
  const env = process.env.NEXT_APP_ENV || "dev";
  switch (env) {
    case "dev":
      return {
        API: {
          baseURL: "https://wallet.hutechweb.com/",
          baseURL1:
            "https://lyprzdcjt2.execute-api.ap-south-1.amazonaws.com/dev/",
        },
      };
    case "uat":
      return {
        API: {
          baseURL: "",
        },
      };
    default:
      return {
        API: {
          baseURL: "",
        },
      };
  }
};
const config = getConfigURL();
export default config;
