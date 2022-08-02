const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const { server_render } = require("../../assets/server");

const html_template_path = path.resolve(__dirname, "../../assets/index.html");

module.exports = async () => {
  const render_template = await promisify(fs.readFile)(html_template_path, "utf-8");
  return async (context, next) => {
    try {
      const { API_TOKEN } = context.cookie = {};
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
  }
};