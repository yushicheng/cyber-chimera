/* eslint-disable import/no-extraneous-dependencies */
const Koa = require("koa");
const proxy = require("koa-proxies");
const static = require("koa-static");
const cookieParser = require("koa-cookie");

const render = require("./middlewares/render");
const index_page = require("./routers/index_page");

const static_cache_config = {
  "local": 0,
  "test": 1000 * 60 * 24 * 30,
  "prod": 1000 * 60 * 24 * 30,
};

(async () => {
  const app = new Koa();

  app.use(static("./assets/", {
    index: false,
    maxage: static_cache_config[process.env.CHIMERA_RUNTIME]
  }));

  app.use(static("./public/", {
    index: false,
    maxage: static_cache_config[process.env.CHIMERA_RUNTIME]
  }));

  /** 本地开发模式需要代理 **/
  if (process.env.CHIMERA_RUNTIME === "local") {
    const proxy_list = require("../configs/proxy_list");
    Object.keys(proxy_list).map((current_proxy_path) => {
      app.use(proxy(current_proxy_path, proxy_list[current_proxy_path]))
    });
  };

  app.use(cookieParser.default());
  app.use(await render());
  app.use(index_page);
  app.listen(8090, () => console.log("server is runing 8090"));
})();



