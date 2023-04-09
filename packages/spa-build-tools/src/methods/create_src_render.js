import fs from "fs";
import { promisify } from "util";
import pathExists from "path-exists";

import { dev_render_template_dir } from "@/configs/runtime.config";

export async function create_src_render() {
  /** 如果存在src/.render/文件夹则需要先移除 **/
  if (await pathExists(dev_render_template_dir)) {
    await promisify(fs.rm)(dev_render_template_dir, { recursive: true });
  };

  /** 创建src/.render/文件夹 **/
  await promisify(fs.mkdir)(dev_render_template_dir);
};