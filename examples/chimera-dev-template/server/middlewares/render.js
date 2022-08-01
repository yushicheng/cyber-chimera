const { server_render } = require("../../assets/server");

const render_template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/public/favicon.ico">
    <script defer src="/assets/main.js"></script>
    <link href="/assets/main.css" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
  </body>
  </html>
`

module.exports = async (context, next) => {
  try {
    const { API_TOKEN } = context.cookies;
    console.log("当前身份令牌==>", API_TOKEN);
    const return_values = await next();
    const { language, seo_option = {}, initial_value } = return_values;
    const render_html = await server_render({
      dev_inject: {},
      basename: "/",
      initial_value,
      html_template: render_template,
      location: context.path,
      language: language || "zh",
      title: seo_option.title || "",
      keywords: seo_option.keywords || "keyword1, keyword2, keyword3",
      description: seo_option.description || "这是本路径的描述文字",
    });
    context.response.status = 200;
    context.response.body = render_html;
  } catch (error) {
    console.log(error);
    context.response.body = error;
  };
};