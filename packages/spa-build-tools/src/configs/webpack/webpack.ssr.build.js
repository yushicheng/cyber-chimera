import path from "path";
import WebpackBar from "webpackbar";
import { merge } from "webpack-merge";
import WebpackCopyPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import create_webpack_basic_config from "@/configs/webpack/webpack.ssr.basic";
import css_loader_config from "@/configs/rules/css_loader_config";
import less_loader_config from "@/configs/rules/less_loader_config";
import scss_loader_config from "@/configs/rules/scss_loader_config";
import file_loader_config from "@/configs/rules/file_loader_config";

export default function get_webpack_server_build_config({ title, bundle_analyzer, define, resolve, output_path, manifest_content, publicPath }) {
  return merge(create_webpack_basic_config({
    define: {
      "process.env.isServer": true,
      "process.env.NODE_ENV": "production",
      "process.env.RUNTIME_CONFIG": { title },
      "process.env.manifest_content": manifest_content,
      ...define
    }
  }), { resolve }, {
    target: "node",
    devtool: false,
    mode: "production",
    output: {
      publicPath,
      path: output_path,
      filename: "server.js"
    },
    optimization: {
      minimize: false
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
      new WebpackCopyPlugin({
        patterns: [{ from: path.resolve(process.cwd(), "./public/"), to: output_path }]
      }),
      new WebpackBar({ name: "building-server" }),
      bundle_analyzer ? new BundleAnalyzerPlugin({
        analyzerPort: "auto",
        generateStatsFile: true
      }) : null
    ].filter(Boolean)
  })
}