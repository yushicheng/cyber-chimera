/* eslint-disable */
const path = require("path");

module.exports = {
  hash: true,
  publicPath: "/",
  output_path: path.resolve(__dirname, "./assets/"),
  title: "My Server App",
  client_entry: path.resolve(__dirname, "./src/application/client.tsx"),
  server_entry: path.resolve(__dirname, "./src/server.tsx"),
  define: {},
  bundle_analyzer: false
};