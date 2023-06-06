import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { listen_port } from "@/configs/listen_port";
import { render_index } from "@/routers/index.ssr";

import { initial_render_content } from "@/utils/render_content";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

/** 开发环境静态资源目录 **/
app.get("/", render_index);
app.use(express.static(path.resolve(path.dirname(__filename), "./application/")));

const server = app.listen(listen_port, "0.0.0.0", async () => {
  const address = server.address();
  await initial_render_content();
  console.log(address, "process.env.NODE_ENV", process.env.NODE_ENV);
});



