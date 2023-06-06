import fs from "fs";
import path from "path";
import React from "react";
import { promisify } from "util";
import { readFile } from "jsonfile";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { RenderContextProvider } from "@/application/context/render_context";
import { Application } from "@/application/application";

let mainfast = {};
let style_content = "";

const application_dirname = path.resolve(path.dirname(__filename), "./application/");
const mainfast_filepath = {
  "local": path.resolve(process.cwd(), "./.temp/manifest.json"),
  "test": path.resolve(process.cwd(), "./assets/manifest.json"),
  "prod": path.resolve(process.cwd(), "./assets/manifest.json")
}[process.env.NODE_ENV];

export async function initial_render_content() {
  mainfast = await promisify(readFile)(mainfast_filepath);
  const style_filename = mainfast["main.css"];
  style_content = await promisify(fs.readFile)(path.resolve(application_dirname, style_filename), "utf-8");
};


export async function render_content({ title = "默认标题", request_url, initial_value }) {

  const content_string = renderToString(
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <style>{style_content}</style>
        <script dangerouslySetInnerHTML={{ __html: `window.initial_value=${JSON.stringify(initial_value, null, "")}` }}></script>
      </head>
      <body>
        <div id="root">
          <RenderContextProvider initial_value={initial_value}>
            <StaticRouter location={request_url}>
              <Application />
            </StaticRouter>
          </RenderContextProvider>
        </div>
        <script src={`/${mainfast["vendors.js"]}`}></script>
        <script src={`/${mainfast["main.js"]}`}></script>
      </body>
    </html>
  );
  return content_string;
};