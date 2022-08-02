/* eslint-disable */
const path = require("path");

module.exports = {
  hash: true,
  publicPath: "/",
  output_path: path.resolve(__dirname, "./assets/"),
  title: "My Server App",
  client_template: path.resolve(__dirname, "./src/render/client.template.js"),
  server_template: path.resolve(__dirname, "./src/render/server.template.js"),
  server_process: path.resolve(__dirname, "./server/app.js"),
  define: {},
  bundle_analyzer: false
};