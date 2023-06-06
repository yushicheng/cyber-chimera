

export default ({ isServer, hash }) => [{
  test: /\.(ico|png|jpg|jpeg|gif|mp3|mp4|avi|svg|ttf|eot|otf|fon|ttc|woff|woff2)$/,
  use: [{
    loader: "file-loader",
    options: {
      emitFile: !isServer,
      outputPath: "files",
      publicPath: "/files/",
      name: `[name]${hash ? ".[fullhash]" : ""}.[ext]`
    }
  }].filter(Boolean)
}]