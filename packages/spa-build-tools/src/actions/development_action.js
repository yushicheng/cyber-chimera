import path from "path";
import webpack from "webpack";
import chokidar from "chokidar";
import { Option } from "commander";
import { fork } from "child_process";
import { EventEmitter } from "events";

import get_webpack_server_dev_config from "@/configs/webpack/webpack.server.dev";
import get_webpack_client_dev_config from "@/configs/webpack/webpack.client.dev";
import get_computed_config from "@/utils/get_computed_config";

export const runtime_config_option = new Option("-c,--config <string>").default("./chimera.config.js");

export async function development_action() {
  const { server_process, ...other_config } = await get_computed_config();

  const compiler_events = new EventEmitter();

  const fork_task = [];

  const server_dev_compiler = webpack(get_webpack_server_dev_config(other_config));
  const client_dev_compiler = webpack(get_webpack_client_dev_config(other_config));

  server_dev_compiler.watch({}, (error, stats) => {
    if (error) {
      console.log(error)
    } else {
      console.log(stats.toString({ colors: true }));
      compiler_events.emit("complate");
    }
  });

  client_dev_compiler.watch({}, (error, stats) => {
    if (error) {
      console.log(error);
    } else {
      console.log(stats.toString({ colors: true }));
      compiler_events.emit("complate");
    };
  });

  compiler_events.on("complate", () => {
    fork_task.forEach((current_fork) => current_fork.kill());
    fork_task.push(fork(server_process));
  });

  chokidar.watch([
    path.resolve(process.cwd(), "./configs/"),
    path.resolve(process.cwd(), "./server/")
  ], {
    ignoreInitial: true,
    persistent: true
  }).on("all", () => {
    fork_task.forEach((current_fork) => current_fork.kill());
    fork_task.push(fork(server_process));
  });

};