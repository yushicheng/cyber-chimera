import Koa from "koa";
import proxy from "koa-proxies";
import koa_static from "koa-static";
import cookieParser from "koa-cookie";

import index_page from "@/server/routers/index_page";
import proxy_list from "@/server/configs/proxy_list";
import { runder_method } from "@/server/middlewares/render";

const static_cache_config = {
  "local": 0,
  "test": 1000 * 60 * 24 * 30,
  "prod": 1000 * 60 * 24 * 30,
};
const app = new Koa();

app.use(koa_static("./", {
  index: false,
  maxage: static_cache_config[process.env.CHIMERA_RUNTIME]
}));

app.use(koa_static("./src/.temp/", {
  index: false,
  maxage: static_cache_config[process.env.CHIMERA_RUNTIME]
}));


/** 本地开发模式需要代理 * */
if (process.env.CHIMERA_RUNTIME === "local") {
  Object.keys(proxy_list).map((current_proxy_path) => app.use(proxy(current_proxy_path, proxy_list[current_proxy_path])));
};

app.use(cookieParser());
app.use(runder_method);
app.use(index_page);

app.listen(8090, () => {
  console.log("server is runing 8090");
});



