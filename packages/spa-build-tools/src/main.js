import { program } from "commander";
import { name, version } from "@@/package.json";

import { runtime_config_option, development_action } from "@/actions/development_action";
import { build_action } from "@/actions/build_action";

program
  .usage(name)
  .version(version);

program
  .command("dev")
  .description("开发调试")
  .addOption(runtime_config_option)
  .action(development_action);

program
  .command("build")
  .description("打包构筑")
  .action(build_action);

program.parse();