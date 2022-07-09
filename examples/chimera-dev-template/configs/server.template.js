import React from "react";
import cheerio from "cheerio";
import ReactDOM from "react-dom/server";

import { I18nextProvider } from "react-i18next";
import { StaticRouter } from "react-router-dom/server";

import init18n from "@/init18n";
import MainBlock from "@/entry";


export function server_render({ html_template, language, location, dev_inject }) {
  const $ = cheerio.load(html_template);
  /** 服务端注水数据 **/
  $("head").append(`<script>window.language="${language}"</script>`);
  if (dev_inject) {
    $("head").append(`<script>window.dev_inject=${JSON.stringify(dev_inject)}</script>`);
  };
  /** 服务端渲染结构 **/
  $("#root").append(ReactDOM.renderToString(
    <I18nextProvider i18n={init18n(language)}>
      <StaticRouter basename={`/test-website/${language}`} location={location}>
        <MainBlock />
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
  process.on("message", (message) => {
    const { html_template, language, location, dev_inject } = message;
    process.send(server_render({ html_template, language, location, dev_inject }));
    process.exit(0);
  });
};

