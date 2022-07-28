/* eslint-disable import/no-extraneous-dependencies */
const fs = require("fs");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const { promisify } = require("util");

const auth = require("./middlewares/auth");
const prefix = require("./middlewares/prefix");
const render_with_function = require("./utils/render_with_function");

(async () => {
  const app = express();
  const html_template_path = path.resolve(__dirname, "../assets/index.html");
  const html_template = await promisify(fs.readFile)(html_template_path, "utf-8");
  app.use("/public", express.static(path.resolve(__dirname, "../assets/"), { index: false }));
  app.use(cookieParser());
  app.use([auth, prefix]);
  app.use("/zh", async (request, response, next) => {
    request.initial_value = { a: "test" };
    next();
  });
  app.use(async (request, response) => {
    const render_html = await render_with_function({
      dev_inject: {},
      html_template,
      location: request.path,
      language: request.language,
      initial_value: request.initial_value,
    });
    response.send(render_html);
  });
  app.listen(8090, () => console.log("server is runing 8090"));
})();

