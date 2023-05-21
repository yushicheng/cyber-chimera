import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { server_render } from "@/routers/server.ssr";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

/** 开发环境静态资源目录 **/
app.use(express.static(path.resolve(process.cwd(), "./.temp/")));

/** 生产环境静态资源目录 **/
app.use(express.static(path.resolve(process.cwd(), "./assets/")));

app.get("/*", server_render);

const server = app.listen(8090, () => {
  const { port }: any = server.address();
  console.log(`server is runing ${port}`);
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
});



