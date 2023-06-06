/* eslint-disable */
const path = require("path");

module.exports = {
  hash: true,
  title: "My Server App",
  output_path: path.resolve(process.cwd(), "./assets/"),
  define: {},
  proxy: {},
  bundle_analyzer: false
};