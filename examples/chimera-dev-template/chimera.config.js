/* eslint-disable */
const path = require("path");


module.exports = {
  hash: false,
  publicPath: "/",
  output_path: path.resolve(__dirname, "./assets/"),
  title: "My Server App",
  client_template: path.resolve(__dirname, "./src/render/client.template.js"),
  server_template: path.resolve(__dirname, "./src/render/server.template.js"),
  define: {},
  proxy: require("./configs/proxy_middleware"),
  devServer: {
    port: 8200,
    open: true,
    history_api_fallback: false,
    server_callback: path.resolve(__dirname, "./server/local")
  }
};