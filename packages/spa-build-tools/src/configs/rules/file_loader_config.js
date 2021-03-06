

export default ({ isServer }) => [{
  test: /\.(png|jpg|jpeg|gif|mp4|avi|svg|ttf|eot|otf|fon|ttc|woff|woff2)$/,
  use: [{
    loader: "file-loader",
    options: {
      emitFile: !isServer,
      outputPath: "assets",
      name: `[name][contenthash].[ext]`
    }
  }].filter(Boolean)
}]