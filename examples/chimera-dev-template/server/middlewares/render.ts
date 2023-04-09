/* eslint-disable */
import path from "path";
import { fork } from "child_process";
import { server_render } from "./render.template";

export async function runder_method(context, next) {
  if (context.path.match("api")) {
    try {
      const return_values = await next();
      if (!return_values) {
        context.response.status = 404;
        return false;
      };
      context.response.status = 200;
      context.response.body = { code: 0, data: return_values, message: "ok" };
      return false;
    } catch (error) {
      context.response.status = 200;
      context.response.body = { code: 10000, data: null, message: error.message };
      return false;
    };
  } else {
    try {
      const return_values = await next();
      if (return_values instanceof Function) {
        await return_values();
      } else {
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
      };
    } catch (error) {
      console.log(error);
      await context.throw(error, 500);
      return false;
    };
  };
};