import path from "path";
import deepExtend from "deep-extend";
import defaultConfig from "@/configs/chimera.config";

/**
 * 配置项合成函数
 * 最终的配置是根据../configs/chimera.config.js和项目根目录下的chimera.config.js合并得到的
 * **/
export default async function get_computed_config(runtime_config_path) {
  const configFileResolve = require.resolve("./chimera.config.js", {
    paths: [process.cwd(), path.resolve(__dirname, "../configs/")]
  });
  // delete require.cache[require.resolve(runtime_config_path)];
  const customerConfig = require(configFileResolve);
  return deepExtend(defaultConfig, customerConfig);
};