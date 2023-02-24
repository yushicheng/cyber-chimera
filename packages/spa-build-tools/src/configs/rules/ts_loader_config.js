import path from "path";

export default [{
  test: /\.(ts|tsx)$/,
  exclude: /(node_modules)/,
  use: [{
    loader: "ts-loader",
    options: {
      configFile: path.resolve(process.cwd(), "./tsconfig.json")
    }
  }]
}];