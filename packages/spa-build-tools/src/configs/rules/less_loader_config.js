import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default ({ isServer }) => [{
  test: /\.less$/,
  use: [(isServer ? {
    loader: require.resolve("../loaders/ssr_css_module_loader.js")
  } : {
    loader: MiniCssExtractPlugin.loader,
  }), {
    loader: "css-loader",
    options: {
      modules: {
        exportOnlyLocals: isServer,
        mode: (resourcePath) => {
          if (/\.(module)/.test(resourcePath)) {
            return "local";
          }
          if (/(node_modules)/.test(resourcePath)) {
            return "global";
          };
          return "global";
        }
      },
      sourceMap: true
    }
  }, {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        config: true
      },
      sourceMap: true
    }
  }, {
    loader: "less-loader",
    options: {
      lessOptions: {
        javascriptEnabled: true,
      },
      implementation: require("less"),
      sourceMap: true
    }
  }].filter(Boolean)
}];