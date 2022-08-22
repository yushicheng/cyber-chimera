import webpack from "webpack";
import { promisify } from "util";

import get_computed_config from "@/utils/get_computed_config";
import get_webpack_server_build_config from "@/configs/webpack/webpack.server.build";
import get_webpack_client_build_config from "@/configs/webpack/webpack.client.build";

import remove_output_dir from "@/utils/remove_output_dir";

export async function build_action() {
  const computed_config = await get_computed_config();

  await remove_output_dir(computed_config);

  console.log("正在编译服务端...");
  const server_stats = promisify(webpack)(get_webpack_server_build_config(computed_config));

  console.log("正在编译客户端...");
  const client_stats = promisify(webpack)(get_webpack_client_build_config(computed_config));

  const compile_result = await Promise.all([server_stats, client_stats]);
  compile_result.map((result_stats) => {
    console.log(result_stats.toString({ colors: true }))
  });
};