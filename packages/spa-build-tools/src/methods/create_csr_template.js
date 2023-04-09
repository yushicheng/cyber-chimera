import fs from "fs";
import path from "path";
import { promisify } from "util";

import { dev_render_template_dir } from "@/configs/runtime.config";

const source_csr_template_file = path.resolve(__dirname, "../../templates/csr.template.js");
const target_csr_template_file = path.resolve(dev_render_template_dir, "./csr.entry.js");

export async function create_csr_template() {
  await promisify(fs.copyFile)(source_csr_template_file, target_csr_template_file);
};