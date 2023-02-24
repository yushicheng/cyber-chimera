/* eslint-disable */
import { server_render } from "./render.template";

export async function runder_method(context, next) {
  const { API_TOKEN } = context.cookie = {};
  console.log("当前身份令牌==>", API_TOKEN);
  if (context.path.match("api")) {
    try {
      const return_values = await next();
      console.log("return_values", return_values);
      context.response.status = 200;
      context.response.body = { code: 0, data: return_values || null, message: "ok" };
      return false;
    } catch (error) {
      context.response.status = 200;
      context.response.body = { code: 10000, data: null, message: error.message };
      return false;
    };
  } else {
    try {
      const return_values = await next();
      const { language = "zh", seo_option = {}, initial_value } = return_values || {};
      const render_html = await server_render({
        language,
        dev_inject: {},
        basename: "/",
        initial_value,
        location: context.path,
        seo_option: {
          ...seo_option,
          title: seo_option.title || "chimera-project",
          keywords: seo_option.keywords || "cyber,chimera,project,",
          description: seo_option.description || "this is chimera-project",
        }
      });
      context.response.status = 200;
      context.response.body = render_html;
      return false;
    } catch (error) {
      console.log(error);
      context.response.body = `<pre>${error.message}</pre>`;
      return false;
    };
  };
};