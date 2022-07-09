const path = require("path");
const child_process = require("child_process");
const server_file_path = path.join(process.cwd(), "./assets/server.js");


module.exports = async ({ html_template, location, language }) => {
  const render_content = await new Promise((resolve) => {
    const sub_node = child_process.fork(server_file_path);
    sub_node.send({ html_template, location, language, dev_inject: {} });
    sub_node.on("message", resolve);
  });
  return render_content;
};