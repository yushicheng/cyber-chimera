import WebpackBar from "webpackbar";
import { merge } from "webpack-merge";

import create_webpack_basic_config from "@/configs/webpack/webpack.basic";
import css_loader_config from "@/configs/rules/css_loader_config";
import less_loader_config from "@/configs/rules/less_loader_config";
import scss_loader_config from "@/configs/rules/scss_loader_config";
import file_loader_config from "@/configs/rules/file_loader_config";

export default function get_webpack_server_build_config({ title, define, output_path, publicPath, server_template }) {
  return merge(create_webpack_basic_config({
    define: {
      "process.env.isServer": true,
      "process.env.NODE_ENV": "production",
      ...define
    }
  }), {
    target: "node",
    mode: "production",
    entry: server_template,
    output: {
      publicPath,
      library: { type: "commonjs" },
      path: output_path,
      filename: "server.js"
    },
    module: {
      rules: [
        ...css_loader_config({ isServer: true }),
        ...less_loader_config({ isServer: true }),
        ...scss_loader_config({ isServer: true }),
        ...file_loader_config({ isServer: true })
      ]
    },
    plugins: [
      new WebpackBar({ name: "building-server" }),
    ]
  })
}