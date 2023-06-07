import path from "path";
import { merge } from "webpack-merge";
import WebpackCopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";

import create_webpack_basic_config from "@/configs/client/webpack.csr.basic";
import css_loader_config from "@/configs/rules/css_loader_config";
import less_loader_config from "@/configs/rules/less_loader_config";
import scss_loader_config from "@/configs/rules/scss_loader_config";
import file_loader_config from "@/configs/rules/file_loader_config";

export default function get_webpack_client_dev_config({ entry, define, output_path, publicPath }) {

  const basic_config = create_webpack_basic_config({
    entry,
    define: {
      "process.env.isServer": JSON.stringify(false),
      "process.env.NODE_ENV": "window.process.env.NODE_ENV",
      ...define
    },
  });

  return merge(basic_config, {
    mode: "development",
    output: {
      publicPath,
      clean: false,
      path: path.resolve(output_path, "./application/"),
      filename: "[name].js"
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
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
      new WebpackCopyPlugin({
        patterns: [{ from: path.resolve(process.cwd(), "./public/"), to: path.resolve(output_path, "./application/") }]
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