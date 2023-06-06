import fs from "fs";
import { promisify } from "util";
import path_exists from "path-exists";

/**
 * 删除build文件夹的方法
 * **/
export async function remove_output_dir(output_path) {
  if (await path_exists(output_path)) {
    await promisify(fs.rm)(output_path, { recursive: true });
  };
};