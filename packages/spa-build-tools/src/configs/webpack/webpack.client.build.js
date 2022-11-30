import path from "path";
import WebpackBar from "webpackbar";
import { merge } from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import WebpackCopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import create_webpack_basic_config from "@/configs/webpack/webpack.basic";
import css_loader_config from "@/configs/rules/css_loader_config";
import less_loader_config from "@/configs/rules/less_loader_config";
import scss_loader_config from "@/configs/rules/scss_loader_config";
import file_loader_config from "@/configs/rules/file_loader_config";

export default function get_webpack_client_build_config({ hash, define, resolve, copy, output_path, publicPath, bundle_analyzer, client_template }) {
  return merge(create_webpack_basic_config({
    define: {
      "process.env.isServer": false,
      "process.env.NODE_ENV": "production",
      ...define
    },
  }), { resolve }, {
    mode: "production",
    entry: client_template,
    output: {
      publicPath: publicPath,
      path: output_path,
      filename: `[name]${hash ? ".[contenthash]" : ""}.js`
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
        ...file_loader_config({ isServer: false })
      ]
    },
    plugins: [
      new WebpackBar({ name: "building-client" }),
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), "./public/index.html")
      }),
      bundle_analyzer ? new BundleAnalyzerPlugin({
        analyzerPort: "auto",
        generateStatsFile: true
      }) : null,
      copy ? new WebpackCopyPlugin({ patterns: copy }) : null,
      new MiniCssExtractPlugin({
        linkType: "text/css",
        filename: `[name]${hash ? ".[contenthash]" : ""}.css`
      })
    ].filter(Boolean)
  })
};