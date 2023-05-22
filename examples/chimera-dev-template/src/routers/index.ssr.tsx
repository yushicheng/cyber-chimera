import path from "path";
import React from "react";
import { promisify } from "util";
import { readFile } from "jsonfile";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import { Application } from "@/application/application";

const mainfast_filepath = {
  "local": path.resolve(process.cwd(), "./.temp/manifest.json"),
  "test": path.resolve(process.cwd(), "./assets/manifest.json"),
  "prod": path.resolve(process.cwd(), "./assets/manifest.json")
}[process.env.NODE_ENV];

export const render_index = async (request, response) => {
  const mainfast = await promisify(readFile)(mainfast_filepath);
  const render_content = renderToString(
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>cyber-chimera-application</title>
        <link rel="stylesheet" href={mainfast["main.css"]} />
      </head>
      <body>
        <div id="root">
          <StaticRouter location={request.url}>
            <Application />
          </StaticRouter>
        </div>
        <script src={mainfast["vendors.js"]}></script>
        <script src={mainfast["main.js"]}></script>
      </body>
    </html>
  );
  response.send(render_content);
};