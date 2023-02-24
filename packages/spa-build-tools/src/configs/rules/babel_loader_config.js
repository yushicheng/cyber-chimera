import path from "path";

export default [{
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  use: [{
    loader: "babel-loader",
    options: {
      configFile: path.join(process.cwd(), "./.babelrc.js")
    }
  }]
}];