/* eslint-disable */
const path = require("path");

module.exports = {
  hash: true,
  publicPath: "/",
  output_path: path.resolve(__dirname, "./assets/"),
  client_entry: path.resolve(__dirname, "./src/application/client.csr.tsx"),
  server_entry: path.resolve(__dirname, "./src/server.ts"),
  define: {},
  bundle_analyzer: false
};