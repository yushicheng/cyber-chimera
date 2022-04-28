import open from "open";
import path from "path";
import express from "express";
import webpack from "webpack";
import {Option} from "commander";

import {createProxyMiddleware} from "http-proxy-middleware";
import webpack_dev_middleware from "webpack-dev-middleware";
import webpack_hot_middleware from "webpack-hot-middleware";
import history_api_fallback from "connect-history-api-fallback";

import get_webpack_server_dev_config from "@/configs/webpack/webpack.server.dev";
import get_webpack_client_dev_config from "@/configs/webpack/webpack.client.dev";
import get_computed_config from "@/utils/get_computed_config";

export const runtime_config_option=new Option("-c,--config <string>").default("./chimera.config.js");

export async function development_action(){
  const app=express();
  const {devServer,...other_config}=await get_computed_config();

  const server_dev_compiler=webpack(get_webpack_server_dev_config(other_config));
  const client_dev_compiler=webpack(get_webpack_client_dev_config(other_config));

  await new Promise((resolve,reject)=>server_dev_compiler.watch({},(error,stats)=>error?reject(error):resolve(stats)));
  
  if(other_config.proxy){
    Object.keys(other_config.proxy).forEach((proxy_rule)=>{
      app.use(proxy_rule,createProxyMiddleware(other_config.proxy[proxy_rule]));
    });
  };

  app.use(express.static(process.cwd()));
  require(devServer.server_callback)(app);
  app.use(webpack_dev_middleware(client_dev_compiler,{}));
  app.use(webpack_hot_middleware(client_dev_compiler,{reload:true}));

  if(devServer.history_api_fallback){
    app.use(history_api_fallback())
  }

  const listen=app.listen(devServer.port,async ()=>{
    if(devServer.open){
      const {port}=listen.address();
      await open(`http://localhost:${port}`);
    };
  });
};