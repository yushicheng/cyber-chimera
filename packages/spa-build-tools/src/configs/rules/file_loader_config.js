

export default ({isServer,hash})=>[{
  test:/\.(png|jpg|jpeg|gif|mp4|avi|svg|ttf|eot|otf|fon|ttc|woff|woff2)$/,
  use:[{
    loader:"file-loader",
    options:{
      emitFile:!isServer,
      outputPath:"assets",
      publicPath:"/assets/",
      name:`[name][contenthash]${hash?".[contenthash]":null}.[ext]`
    }
  }].filter(Boolean)
}]