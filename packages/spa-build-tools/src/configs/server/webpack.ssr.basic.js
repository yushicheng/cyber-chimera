import path from "path";
import webpack from "webpack";
import { fromPairs } from "lodash";
import WebpackBar from "webpackbar";
import nodeExternals from "webpack-node-externals";

import babel_loader_config from "@/configs/rules/babel_loader_config";
import ts_loader_config from "@/configs/rules/ts_loader_config";

export default function create_webpack_basic_config({ entry, define }) {
  const define_pairs = Object.keys(define).map((keyname) => [keyname, define[keyname]]);
  const define_object = fromPairs(define_pairs);
  return {
    entry,
    target: "node",
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@@": process.cwd(),
        "@": path.resolve(process.cwd(), "./src/")
      }
    },
    externalsPresets: { node: true },
    externals: [nodeExternals({
      modulesFromFile: path.resolve(process.cwd(), "./package.json")
    })],
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
      new WebpackBar({ name: "编译服务端" }),
      new webpack.DefinePlugin(define_object)
    ]
  }
};