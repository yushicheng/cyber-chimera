import Koa from "koa";
import path from "path";
import koa_static from "koa-static";
import cookieParser from "koa-cookie";

import index_page from "@/routers/index_page";

const app = new Koa();

/** 开发环境静态资源目录 **/
app.use(koa_static(path.resolve(process.cwd(), "./.temp/"), {
  index: false,
  maxage: 0
}));

/** 生产环境静态资源目录 **/
app.use(koa_static(path.resolve(process.cwd(), "./assets/"), {
  index: false,
  maxage: 0
}));

app.use(cookieParser());
app.use(index_page);

app.listen(8090, () => {
  console.log("server is runing 8090");
});



