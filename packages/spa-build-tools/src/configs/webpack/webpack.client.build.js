import path from "path";
import webpack from "webpack";
import { merge } from "webpack-merge";
import WebpackCopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import create_webpack_basic_config from "@/configs/webpack/webpack.basic";
import css_loader_config from "@/configs/rules/css_loader_config";
import less_loader_config from "@/configs/rules/less_loader_config";
import scss_loader_config from "@/configs/rules/scss_loader_config";
import file_loader_config from "@/configs/rules/file_loader_config";

export default function get_webpack_client_build_config({ hash, define, copy, output_path, publicPath, title, client_template }) {
  return merge(create_webpack_basic_config({
    define: {
      "process.env.isServer": false,
      "process.env.NODE_ENV": "production",
      ...define
    },
  }), {
    mode: "production",
    entry: client_template,
    output: {
      publicPath: publicPath,
      path: output_path,
      filename: `[name]${hash ? ".[contenthash]" : ""}.js`
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
      copy ? new WebpackCopyPlugin({ patterns: copy }) : null,
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        linkType: "text/css",
        filename: `[name]${hash ? ".[contenthash]" : ""}.css`
      }),
      new HtmlWebpackPlugin({
        title,
        filename: "index.html",
        favicon: "./public/favicon.ico",
        template: path.resolve(process.cwd(), "./src/index.html")
      })
    ].filter(Boolean)
  })
};