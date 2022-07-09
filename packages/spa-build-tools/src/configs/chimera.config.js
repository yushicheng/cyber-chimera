/* eslint-disable */
const path = require("path");

module.exports = {
  hash: true,
  title: "My Server App",
  output_path: path.resolve(process.cwd(), "./assets/"),
  client_template: path.resolve(__dirname, "../template/client.template.js"),
  server_template: path.resolve(__dirname, "../template/server.template.js"),
  define: {},
  proxy: {},
  devServer: {
    open: true,
    historyApiFallback: true
  },
};