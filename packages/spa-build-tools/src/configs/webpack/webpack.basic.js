import path from "path";
import webpack from "webpack";
import { fromPairs } from "lodash";

import babel_loader_config from "@/configs/rules/babel_loader_config";
import html_loader_config from "@/configs/rules/html_loader_config";


export default function create_webpack_basic_config({ define }) {
  const define_pairs = Object.keys(define).map((keyname) => [keyname, JSON.stringify(define[keyname])]);
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
      new webpack.DefinePlugin(fromPairs(define_pairs))
    ],
    module: {
      rules: [
        ...babel_loader_config,
        ...html_loader_config
      ]
    }
  }
};