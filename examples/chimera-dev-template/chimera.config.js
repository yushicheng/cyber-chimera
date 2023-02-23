/* eslint-disable */
const path = require("path");

module.exports = {
  hash: true,
  publicPath: "/",
  output_path: path.resolve(__dirname, "./assets/"),
  title: "My Server App",
  client_entry: path.resolve(__dirname, "./src/client/client.entry.js"),
  server_entry: path.resolve(__dirname, "./src/server/server.entry.js"),
  define: {},
  bundle_analyzer: false
};