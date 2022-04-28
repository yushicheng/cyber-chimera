import webpack from "webpack";
import {promisify} from "util";

import get_computed_config from "@/utils/get_computed_config";
import get_webpack_server_build_config from "@/configs/webpack/webpack.server.build";
import get_webpack_client_build_config from "@/configs/webpack/webpack.client.build";

import remove_output_dir from "@/utils/remove_output_dir";

export async function build_action(action,{test_option}){
  const {devServer,...other_config}=await get_computed_config();

  await remove_output_dir(other_config);

  const server_stats=await promisify(webpack)(get_webpack_server_build_config(other_config));
  console.log(server_stats.toString({colors:true}));

  const client_stats=await promisify(webpack)(get_webpack_client_build_config(other_config));
  console.log(client_stats.toString({colors:true}));
};