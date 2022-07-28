const path = require("path");

const server_file_path = path.join(process.cwd(), "./assets/server.js");
const { server_render } = require(server_file_path);

module.exports = async (input_params) => {
  return server_render(input_params);
};