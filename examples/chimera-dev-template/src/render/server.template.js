import React from "react";
import cheerio from "cheerio";
import ReactDOM from "react-dom/server";

import { I18nextProvider } from "react-i18next";
import { StaticRouter } from "react-router-dom/server";

import init18n from "@/init18n";
import MainBlock from "@/entry";
import { RenderContextProvider } from "./render_context";

export async function server_render({ title, keywords, description, html_template, basename, language, location, dev_inject, initial_value }) {
  const $ = cheerio.load(html_template);
  if (description) {
    $("head").prepend(`<meta name="description" content="${description}">`);
  };
  if (keywords) {
    $("head").prepend(`<meta name="keywords" content="${keywords}">`);
  };
  if (title) {
    $("head").prepend(`<title>${title}</title>`);
  };
  if (basename) {
    $("head").append(`<script>window.basename="${basename}"</script>`);
  };
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
      <StaticRouter basename={basename} location={location}>
        <RenderContextProvider initial_value={initial_value}>
          <MainBlock />
        </RenderContextProvider>
      </StaticRouter>
    </I18nextProvider>
  ));
  return $.html();
};

