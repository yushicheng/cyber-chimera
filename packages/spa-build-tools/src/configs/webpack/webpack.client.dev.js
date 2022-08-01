// import webpack from "webpack";
import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import create_webpack_basic_config from "@/configs/webpack/webpack.basic";
import css_loader_config from "@/configs/rules/css_loader_config";
import less_loader_config from "@/configs/rules/less_loader_config";
import scss_loader_config from "@/configs/rules/scss_loader_config";
import file_loader_config from "@/configs/rules/file_loader_config";

export default function get_webpack_client_dev_config({ title, define, output_path, publicPath, client_template }) {
  return merge(create_webpack_basic_config({
    define: {
      "process.env.isServer": false,
      "process.env.NODE_ENV": "development",
      ...define
    },
  }), {
    mode: "development",
    entry: [client_template],
    output: {
      publicPath,
      path: output_path,
      filename: "[name].js"
    },
    module: {
      rules: [
        ...css_loader_config({ isServer: false }),
        ...less_loader_config({ isServer: false }),
        ...scss_loader_config({ isServer: false }),
        ...file_loader_config({ isServer: false })
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        linkType: "text/css",
        filename: "[name].css"
      })
    ]
  })
};