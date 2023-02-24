import fs from "fs";
import path from "path";
import webpack from "webpack";
import chokidar from "chokidar";
import { promisify } from "util";
import { Option } from "commander";
import { readFile } from "jsonfile";
import pathExists from "path-exists";
import { fork } from "child_process";
import { EventEmitter } from "events";

import get_webpack_server_dev_config from "@/configs/webpack/webpack.server.dev";
import get_webpack_client_dev_config from "@/configs/webpack/webpack.client.dev";
import get_computed_config from "@/utils/get_computed_config";

export const runtime_config_option = new Option("-c,--config <string>").default("./chimera.config.js");

export async function development_action() {
  const { ...other_config } = await get_computed_config();

  const dev_output_path = path.resolve(process.cwd(), "./.temp/");

  if (await pathExists(dev_output_path)) {
    await promisify(fs.rm)(dev_output_path, { recursive: true });
  };

  const compiler_events = new EventEmitter();

  compiler_events.on("server-complate", () => {
    fork_task.forEach((current_fork) => current_fork.kill());
    fork_task.push(fork(path.resolve(dev_output_path, `./server.js`)));
  });

  const fork_task = [];

  /** 合并出客户端的配置 **/
  const client_dev_config = get_webpack_client_dev_config({ ...other_config, output_path: dev_output_path });

  /** 先完成一次完整的客户端编译 **/
  await promisify(webpack)(client_dev_config);
  /** 编译完客户端之后读取mainfast.json **/
  const manifest_content = await readFile(path.resolve(dev_output_path, "./manifest.json"));
  /** 将mainfast.json作为环境变量传递给服务端 **/
  const server_dev_config = get_webpack_server_dev_config({ ...other_config, output_path: dev_output_path, manifest_content });

  /** 开启客户端和服务端的监听服务 **/
  const client_dev_compiler = webpack(client_dev_config);
  const server_dev_compiler = webpack(server_dev_config);

  server_dev_compiler.watch({}, (error, stats) => {
    if (error) {
      console.log(error)
    } else {
      console.log(stats.toString({ colors: true }));
      compiler_events.emit("server-complate");
    };
  });

  client_dev_compiler.watch({}, (error, stats) => {
    if (error) {
      console.log(error);
    } else {
      console.log(stats.toString({ colors: true }));
    };
  });

  chokidar.watch([path.resolve(process.cwd(), "./src/server/")], {
    ignoreInitial: true,
    persistent: true
  }).on("all", () => {
    fork_task.forEach((current_fork) => current_fork.kill());
    fork_task.push(fork(path.resolve(dev_output_path, `./server.js`)));
  });

};