/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const auth = require("./middlewares/auth");
const prefix = require("./middlewares/prefix");
const render_build_html = require("./utils/render_build_html");
const render_with_function = require("./utils/render_with_function");

(async () => {
  const app = express();
  app.use("/public", express.static(path.resolve(__dirname, "../public/"), { index: false }));
  app.use("/assets", express.static(path.resolve(__dirname, "../assets/"), { index: false }));
  app.use(cookieParser());
  app.use([auth, prefix]);
  app.use("/zh", async (request, response, next) => {
    request.initial_value = { a: "test" };
    next();
  });
  app.use(async (request, response) => {
    const render_html = await render_with_function({
      dev_inject: {},
      location: request.path,
      language: request.language,
      title: request.title || "测试标题",
      keywords: request.keywords || "keyword1, keyword2, keyword3",
      description: request.description || "这是本路径的描述文字",
      html_template: render_build_html(),
      initial_value: request.initial_value,
    });
    response.send(render_html);
  });
  app.listen(8090, () => console.log("server is runing 8090"));
})();

