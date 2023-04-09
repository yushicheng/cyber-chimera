/* eslint-disable react/no-danger */
import React from "react";
import ReactDOM from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import MainBlock from "@/entry";

// eslint-disable-next-line no-unused-vars
export async function server_render({ seo_option, basename, language, location, dev_inject, initial_value }) {
  // if (seo_option) {
  //   $("head").append(`<script>window.seo_option=${JSON.stringify(seo_option)}</script>`);
  // };
  // if (seo_option.type === "video") {
  //   $("head").attr("itemprop", "video");
  //   $("head").attr("itemscope", "");
  //   $("head").attr("itemtype", "http://schema.org/VideoObject");
  //   $("head").prepend(`<meta property="og:type" content="video">`);
  // };
  // if (seo_option.description) {
  //   $("head").prepend(`<meta itemprop="description" name="description" content="${seo_option.description}">`);
  // };
  // if (seo_option.keywords) {
  //   $("head").prepend(`<meta itemprop="keywords" name="keywords" content="${seo_option.keywords}">`);
  // };
  // if (seo_option.author) {
  //   $("head").prepend(`<meta itemprop="author" name="author" content="${seo_option.author}">`);
  // };
  // if (seo_option.uploadDate) {
  //   $("head").prepend(`<meta itemprop="uploadDate" content="${seo_option.uploadDate}">`);
  // };
  // if (seo_option.contentUrl) {
  //   $("head").prepend(`<meta itemprop="contentUrl" content="${seo_option.contentUrl}">`);
  // };
  // if (seo_option.thumbnailUrl) {
  //   $("head").prepend(`<meta itemprop="thumbnailUrl" content="${seo_option.thumbnailUrl}">`);
  // };
  // if (seo_option.image) {
  //   $("head").prepend(`<meta itemprop="image" content="${seo_option.image}">`);
  //   $("head").prepend(`<meta property="og:image" content="${seo_option.image}">`);
  // };
  // if (seo_option.url) {
  //   $("head").prepend(`<meta itemprop="url" content="${seo_option.url}">`);
  //   $("head").prepend(`<meta property="og:url" content="${seo_option.url}">`);
  // };
  // if (seo_option.title) {
  //   $("head").prepend(`<meta property="og:title" name="title" content="${seo_option.title}">`);
  //   $("head").prepend(`<meta itemprop="title" name="title" content="${seo_option.title}">`);
  //   $("head").prepend(`<meta itemprop="name" name="title" content="${seo_option.title}">`);
  //   $("head").prepend(`<title>${seo_option.title}</title>`);
  //   $("body").prepend(`<h1 style="display:none">${seo_option.title}</h1>`);
  // };
  /** 服务端渲染结构 * */
  const { title } = process.env.RUNTIME_CONFIG;
  const { manifest_content } = process.env;
  return ReactDOM.renderToString(
    <html lang="zh">
      <head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href={`/${manifest_content["main.css"]}`} />
        {basename ? (<script dangerouslySetInnerHTML={{ __html: `window.basename="${basename}"` }} />) : null}
        {language ? (<script dangerouslySetInnerHTML={{ __html: `window.language="${language}"` }} />) : null}
        {dev_inject ? (<script dangerouslySetInnerHTML={{ __html: `window.dev_inject=${JSON.stringify(dev_inject)}` }} />) : null}
        {initial_value ? (<script dangerouslySetInnerHTML={{ __html: `window.initial_value=${JSON.stringify(initial_value)}` }} />) : null}
      </head>
      <body>
        <div id="root">
          <StaticRouter basename={basename} location={location}>
            <MainBlock />
          </StaticRouter>
        </div>
        <script src={`/${manifest_content["vendors.js"]}`} />
        <script src={`/${manifest_content["main.js"]}`} />
      </body>
    </html>
  )
};

