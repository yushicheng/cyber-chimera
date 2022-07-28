const path = require("path");
const child_process = require("child_process");
const server_file_path = path.join(process.cwd(), "./assets/server.js");


module.exports = async (input_params) => {
  const render_content = await new Promise((resolve) => {
    const sub_node = child_process.fork(server_file_path);
    sub_node.send(input_params);
    sub_node.on("message", (render_content) => {
      resolve(render_content);
      sub_node.kill();
    });
  });
  return render_content;
};