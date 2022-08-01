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
    if (!return_values) {
      const language = "zh";
      const seo_option = {};
      const initial_value = {};
      const render_html = await server_render({
        language,
        dev_inject: {},
        basename: "/",
        initial_value,
        location: context.path,
        html_template: render_template,
        title: seo_option.title || "免版权视频素材下载",
        keywords: seo_option.keywords || "免版权, 视频, 素材, 下载",
        description: seo_option.description || "免版权高清视频素材下载",
      });
      context.response.status = 200;
      context.response.body = render_html;
    } else {
      const { language = "zh", seo_option = {}, initial_value } = return_values;
      const render_html = await server_render({
        language,
        dev_inject: {},
        basename: "/",
        initial_value,
        location: context.path,
        html_template: render_template,
        title: seo_option.title || "免版权视频素材下载",
        keywords: seo_option.keywords || "免版权, 视频, 素材, 下载",
        description: seo_option.description || "免版权高清视频素材下载",
      });
      context.response.status = 200;
      context.response.body = render_html;
    };
  } catch (error) {
    console.log(error);
    context.response.body = `<pre>${error.message}</pre>`;
  };
};