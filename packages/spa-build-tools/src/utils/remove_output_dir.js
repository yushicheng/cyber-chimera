import remove from "remove";
import path_exists from "path-exists";

import { promisify } from "util";

/**
 * 删除build文件夹的方法
 * **/
export default async function remove_output_dir({ output_path }) {
  if (await path_exists(output_path)) {
    await promisify(remove)(output_path);
  };
};