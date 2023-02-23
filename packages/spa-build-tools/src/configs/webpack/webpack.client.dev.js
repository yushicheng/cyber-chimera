import path from "path";
import WebpackBar from "webpackbar";
import { merge } from "webpack-merge";
import WebpackCopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";

import create_webpack_basic_config from "@/configs/webpack/webpack.basic";
import css_loader_config from "@/configs/rules/css_loader_config";
import less_loader_config from "@/configs/rules/less_loader_config";
import scss_loader_config from "@/configs/rules/scss_loader_config";
import file_loader_config from "@/configs/rules/file_loader_config";

export default function get_webpack_client_dev_config({ title, define, resolve, output_path, publicPath, client_entry }) {

  return merge(create_webpack_basic_config({
    define: {
      "process.env.isServer": false,
      "process.env.NODE_ENV": "development",
      "process.env.RUNTIME_CONFIG": { title },
      ...define
    },
  }), { resolve }, {
    mode: "development",
    entry: client_entry,
    output: {
      publicPath,
      path: output_path,
      filename: "[name].js"
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
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
      new WebpackBar({
        name: "client-render"
      }),
      new WebpackCopyPlugin({
        patterns: [{ from: path.resolve(process.cwd(), "./public/"), to: output_path }]
      }),
      new WebpackAssetsManifest({
        output: path.resolve(output_path, "./manifest.json")
      }),
      new MiniCssExtractPlugin({
        linkType: "text/css",
        filename: "[name].css"
      })
    ]
  })
};