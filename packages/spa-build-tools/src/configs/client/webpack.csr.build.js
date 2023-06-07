import path from "path";
import { merge } from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import WebpackCopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import WebpackAssetsManifest from "webpack-assets-manifest";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import create_webpack_basic_config from "@/configs/client/webpack.csr.basic";
import css_loader_config from "@/configs/rules/css_loader_config";
import less_loader_config from "@/configs/rules/less_loader_config";
import scss_loader_config from "@/configs/rules/scss_loader_config";
import file_loader_config from "@/configs/rules/file_loader_config";

export default function get_webpack_client_build_config({ entry, hash, define, output_path, publicPath, bundle_analyzer }) {

  const basic_config = create_webpack_basic_config({
    entry,
    define: {
      "process.env.isServer": JSON.stringify(false),
      "process.env.NODE_ENV": "window.process.env.NODE_ENV",
      ...define
    },
  });

  return merge(basic_config, {
    mode: "production",
    output: {
      publicPath,
      clean: false,
      path: path.resolve(output_path, "./application/"),
      filename: `[name]${hash ? ".[fullhash]" : ""}.js`
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
      },
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: true,
        })
      ]
    },
    module: {
      rules: [
        ...css_loader_config({ isServer: false }),
        ...less_loader_config({ isServer: false }),
        ...scss_loader_config({ isServer: false }),
        ...file_loader_config({ isServer: false, hash })
      ]
    },
    plugins: [
      new WebpackAssetsManifest({
        output: path.resolve(output_path, "./manifest.json")
      }),
      bundle_analyzer ? new BundleAnalyzerPlugin({
        analyzerPort: "auto",
        generateStatsFile: true
      }) : null,
      new WebpackCopyPlugin({
        patterns: [{ from: path.resolve(process.cwd(), "./public/"), to: path.resolve(output_path, "./application/") }]
      }),
      new MiniCssExtractPlugin({
        linkType: "text/css",
        filename: `[name]${hash ? ".[fullhash]" : ""}.css`
      })
    ].filter(Boolean)
  })
};