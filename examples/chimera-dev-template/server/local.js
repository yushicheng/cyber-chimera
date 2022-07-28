const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const auth = require("./middlewares/auth");
const prefix = require("./middlewares/prefix");
const { sub_with_file } = require("./utils/fork_data");
const render_dev_html = require("./utils/render_dev_html");
const render_with_process = require("./utils/render_with_process");

module.exports = function server_callback(app) {
  app.use("/public", express.static(path.resolve(__dirname, "../assets/"), { index: false }));
  app.use(cookieParser());
  app.use([auth, prefix]);
  app.use("/zh", async (request, response, next) => {
    const result = await sub_with_file(path.resolve(__dirname, "./services/get_initial_value.js"));
    request.initial_value = result;
    next();
  });
  app.use(async (request, response) => {
    const { devMiddleware } = response.locals.webpack;
    const jsonWebpackStats = devMiddleware.stats.toJson();
    const render_html = await render_with_process({
      dev_inject: {},
      location: request.path,
      language: request.language,
      title: request.title || "测试标题",
      keywords: request.keywords || "keyword1, keyword2, keyword3",
      description: request.description || "这是本路径的描述文字",
      initial_value: request.initial_value,
      html_template: render_dev_html(jsonWebpackStats),
    });
    response.send(render_html);
  });
};
