module.exports = (on, config) => {
  process.env.FAST_REFRESH = "false";
  require("@cypress/react/plugins/react-scripts")(on, config);
  return config;
};
