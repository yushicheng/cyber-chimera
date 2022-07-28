import React from "react";
import cheerio from "cheerio";
import ReactDOM from "react-dom/server";

import { I18nextProvider } from "react-i18next";
import { StaticRouter } from "react-router-dom/server";

import init18n from "@/init18n";
import MainBlock from "@/entry";
import { RenderContextProvider } from "./render_context";

export async function server_render({ html_template, language, location, dev_inject, initial_value }) {
  const $ = cheerio.load(html_template);
  /** 多语言注水 **/
  if (language) {
    $("head").append(`<script>window.language="${language}"</script>`);
  };
  /** 开发模式注水 **/
  if (dev_inject) {
    $("head").append(`<script>window.dev_inject=${JSON.stringify(dev_inject)}</script>`);
  };
  /** 初始值注水 **/
  if (initial_value) {
    $("head").append(`<script>window.initial_value=${JSON.stringify(initial_value)}</script>`);
  };
  /** 服务端渲染结构 **/
  $("#root").append(ReactDOM.renderToString(
    <I18nextProvider i18n={init18n(language)}>
      <StaticRouter basename={`/${language}`} location={location}>
        <RenderContextProvider initial_value={initial_value}>
          <MainBlock />
        </RenderContextProvider>
      </StaticRouter>
    </I18nextProvider>
  ));
  return $.html();
}

/**
 * 开发环境下使用父子进程通信的方式实现服务端渲染的热更新策略
 * 为什么不使用delete require.cache来实现热更新是因为会导致内存栈溢出,而子线程不会
 * 父子进程通信请参考这里
 * @see https://byvoid.com/zhs/blog/node-child-process-ipc/
 * **/
if (process.env.NODE_ENV === "development") {
  process.on("message", async (message) => {
    try {
      const render_content = await server_render(message);
      process.send(render_content);
    } catch (error) {
      console.log(error);
      process.send(`<pre>${error.message}</pre>`);
    }
  });
};

