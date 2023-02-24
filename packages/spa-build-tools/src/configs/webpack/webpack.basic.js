import path from "path";
import webpack from "webpack";
import { fromPairs } from "lodash";

import babel_loader_config from "@/configs/rules/babel_loader_config";
import ts_loader_config from "@/configs/rules/ts_loader_config";

export default function create_webpack_basic_config({ title, define }) {
  const define_pairs = Object.keys(define).map((keyname) => [keyname, JSON.stringify(define[keyname])]);
  const define_object = fromPairs(define_pairs);
  return {
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@@": process.cwd(),
        "@": path.resolve(process.cwd(), "./src/")
      }
    },
    plugins: [
      new webpack.DefinePlugin(define_object)
    ],
    module: {
      rules: [
        ...babel_loader_config,
        ...ts_loader_config
      ]
    }
  }
};