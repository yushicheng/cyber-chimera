import path from "path";
import webpack from "webpack";
import { fromPairs } from "lodash";
import WebpackBar from "webpackbar";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

import babel_loader_config from "@/configs/rules/babel_loader_config";
import ts_loader_config from "@/configs/rules/ts_loader_config";

export default function create_webpack_basic_config({ entry, define }) {
  const define_pairs = Object.keys(define).map((keyname) => [keyname, define[keyname]]);
  const define_object = fromPairs(define_pairs);
  return {
    entry,
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@@": process.cwd(),
        "@": path.resolve(process.cwd(), "./src/")
      }
    },
    optimization: {
      nodeEnv: false
    },
    module: {
      rules: [
        ...babel_loader_config,
        ...ts_loader_config
      ]
    },
    plugins: [
      new NodePolyfillPlugin(),
      new WebpackBar({ name: "编译客户端" }),
      new webpack.DefinePlugin(define_object)
    ]
  }
};