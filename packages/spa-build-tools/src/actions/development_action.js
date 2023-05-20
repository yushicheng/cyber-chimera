import fs from "fs";
import path from "path";
import webpack from "webpack";
import spawn from "cross-spawn";
import { promisify } from "util";
import { Option } from "commander";
import pathExists from "path-exists";

import get_computed_config from "@/utils/get_computed_config";
import get_webpack_server_dev_config from "@/configs/webpack/webpack.ssr.dev";
import get_webpack_client_dev_config from "@/configs/webpack/webpack.csr.dev";

export const runtime_config_option = new Option("-c,--config <string>").default("./chimera.config.js");

export async function development_action() {
  const { client_entry, server_entry, ...other_config } = await get_computed_config();

  /** 创建开发环境临时文件夹.temp **/
  const dev_output_path = path.resolve(process.cwd(), "./.temp/");
  if (await pathExists(dev_output_path)) {
    await promisify(fs.rm)(dev_output_path, { recursive: true });
  };

  /** 合并出客户端的配置 **/
  const client_dev_config = get_webpack_client_dev_config({ entry: client_entry, ...other_config, output_path: dev_output_path });
  /** 合并出服务端的配置 **/
  const server_dev_config = get_webpack_server_dev_config({ entry: server_entry, ...other_config, output_path: dev_output_path });

  /** 开启客户端的监听服务 **/
  const client_dev_compiler = webpack(client_dev_config);
  /** 开启服务端的监听服务 **/
  const server_dev_compiler = webpack(server_dev_config);

  /** 处理客户端监听 **/
  client_dev_compiler.watch({}, (error, stats) => {
    if (error) {
      console.log(error);
    } else {
      console.log(stats.toString({ colors: true }));
    };
  });

  const process_task_list = [];
  /** 处理服务端监听 **/
  server_dev_compiler.watch({}, (error, stats) => {
    if (error) {
      console.log(error);
    } else {
      console.log(stats.toString({ colors: true }));
      const process_task = spawn("node", [path.resolve(dev_output_path, "./server.js")], { stdio: "inherit" });
      process_task_list.forEach((single_process_task) => single_process_task.kill());
      process_task_list.push(process_task);
    };
  });

};