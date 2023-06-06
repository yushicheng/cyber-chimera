import path from "path";
import { merge } from "webpack-merge";
import WebpackCopyPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import create_webpack_basic_config from "@/configs/server/webpack.ssr.basic";
import css_loader_config from "@/configs/rules/css_loader_config";
import less_loader_config from "@/configs/rules/less_loader_config";
import scss_loader_config from "@/configs/rules/scss_loader_config";
import file_loader_config from "@/configs/rules/file_loader_config";

export default function get_webpack_server_build_config({ entry, bundle_analyzer, define, output_path, publicPath }) {

  const basic_config = create_webpack_basic_config({
    entry,
    define: {
      "process.env.isServer": true,
      "process.env.NODE_ENV": process.env.NODE_ENV,
      ...define
    }
  });

  return merge(basic_config, {
    mode: "production",
    output: {
      publicPath,
      clean: false,
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
      bundle_analyzer ? new BundleAnalyzerPlugin({
        analyzerPort: "auto",
        generateStatsFile: true
      }) : null
    ].filter(Boolean)
  });
};