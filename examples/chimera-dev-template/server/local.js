const cookieParser = require("cookie-parser");

const auth = require("./middlewares/auth");
const prefix = require("./middlewares/prefix");
const render_with_process = require("./utils/render_with_process");

module.exports = function server_callback(app) {
  app.use(cookieParser());
  app.use([auth, prefix], async (request, response) => {
    if (request.prefix !== "test-website") {
      return response.redirect(301, "/test-website/zh/");
    }
    if (request.language !== "zh") {
      return response.redirect(301, "/test-website/zh/");
    }
    const { devMiddleware } = response.locals.webpack;
    const jsonWebpackStats = devMiddleware.stats.toJson();
    const render_html = await render_with_process({
      location: request.path,
      language: request.language,
      dev_inject: {},
      html_template: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Document</title>
          <link rel="shortcut icon" href="${jsonWebpackStats.publicPath}public/favicon.ico">
          <script defer src="${jsonWebpackStats.publicPath}main.js"></script>
          <link href="${jsonWebpackStats.publicPath}main.css" rel="stylesheet">
        </head>
        <body>
          <div id="root"></div>
        </body>
        </html>
    `});
    response.send(render_html);
  });
};
