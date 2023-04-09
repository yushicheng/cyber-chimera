import path from "path";
import webpack from "webpack";
import { promisify } from "util";
import { readFile } from "jsonfile";

import { create_src_render } from "@/methods/create_src_render";
import { create_csr_template } from "@/methods/create_csr_template";
import { create_ssr_template } from "@/methods/create_ssr_template";
import get_webpack_server_build_config from "@/configs/webpack/webpack.ssr.build";
import get_webpack_client_build_config from "@/configs/webpack/webpack.csr.build";

import get_computed_config from "@/utils/get_computed_config";
import remove_output_dir from "@/utils/remove_output_dir";

export async function build_action() {
  const computed_config = await get_computed_config();

  /** 创建src/.render/文件夹 **/
  await create_src_render();
  await create_csr_template();
  await create_ssr_template();

  /** 清空开发模式下的.temp文件夹 **/
  await remove_output_dir(computed_config);

  console.log("正在编译客户端...");
  const client_stats = await promisify(webpack)(get_webpack_client_build_config(computed_config));
  client_stats.toString({ colors: true });
  /** 编译完客户端之后读取mainfast.json **/
  const manifest_content = await readFile(path.resolve(computed_config.output_path, "./manifest.json"));

  console.log("正在编译服务端...");
  const server_stats = await promisify(webpack)(get_webpack_server_build_config({ ...computed_config, manifest_content }));
  server_stats.toString({ colors: true });
};