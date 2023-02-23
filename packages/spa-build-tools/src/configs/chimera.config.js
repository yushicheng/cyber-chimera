/* eslint-disable */
const path = require("path");

module.exports = {
  hash: true,
  title: "My Server App",
  output_path: path.resolve(process.cwd(), "./assets/"),
  define: {},
  proxy: {},
  resolve: {
    fallback: {
      "url": require.resolve("url"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify")
    }
  },
  bundle_analyzer: false
};