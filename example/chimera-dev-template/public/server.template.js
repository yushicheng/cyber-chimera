import React from "react";
import cheerio from "cheerio";
import ReactDOM from "react-dom/server";

import {I18nextProvider} from "react-i18next";
import {StaticRouter} from "react-router-dom/server";

import init18n from "@/init18n";
import MainBlock from "@/entry";

export function server_render({location,language,html_template}){
  const $=cheerio.load(html_template);
  $("head").append(`<script>window.language="${language}"</script>`);
  $("#root").append(ReactDOM.renderToString(
    <I18nextProvider i18n={init18n(language)}>
      <StaticRouter basename={language} location={location}>
        <MainBlock />
      </StaticRouter>
    </I18nextProvider>
  ));
  return $.html();
}

