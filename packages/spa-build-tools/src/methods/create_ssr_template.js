import fs from "fs";
import path from "path";
import { promisify } from "util";

import { dev_render_template_dir } from "@/configs/runtime.config";

const source_ssr_template_file = path.resolve(__dirname, "../../templates/ssr.template.js");
const target_ssr_template_file = path.resolve(dev_render_template_dir, "./ssr.entry.js");

export async function create_ssr_template() {
  await promisify(fs.copyFile)(source_ssr_template_file, target_ssr_template_file);
};