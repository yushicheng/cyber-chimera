import webpack from "webpack";

import get_webpack_server_build_config from "@/configs/server/webpack.ssr.build";
import get_webpack_client_build_config from "@/configs/client/webpack.csr.build";

import { remove_output_dir } from "@/utils/remove_output_dir";
import get_computed_config from "@/utils/get_computed_config";

export async function build_action() {
  const { client_entry, server_entry, output_path, ...other_config } = await get_computed_config();
  await remove_output_dir(output_path);
  /** 编译客户端 **/
  const client_build_config = get_webpack_client_build_config({ entry: client_entry, ...other_config, output_path });
  const client_stats = webpack(client_build_config);
  client_stats.run((error, stats) => {
    if (error) {
      console.log("client_error", error);
    } else {
      stats.toString({ colors: true });
    };
  });

  /** 编译服务端 **/
  const server_build_config = get_webpack_server_build_config({ entry: server_entry, ...other_config, output_path });
  const server_stats = webpack(server_build_config);
  server_stats.run((error, stats) => {
    if (error) {
      console.log("server_error", error);
    } else {
      stats.toString({ colors: true });
    };
  });

};