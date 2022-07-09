const path = require("path");

const server_file_path = path.join(process.cwd(), "./assets/server.js");
const { server_render } = require(server_file_path);

module.exports = async ({ html_template, location, language }) => {
  return server_render({ html_template, location, language });
};