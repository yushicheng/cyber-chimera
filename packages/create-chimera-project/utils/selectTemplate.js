const inquirer = require("inquirer");
const PROJECT_LIST = require("@/configs/runtime.config");

module.exports = async () => {
  const { template } = await inquirer.prompt({
    type: "list",
    name: "template",
    defaultValue: "dva-app",
    message: "选择拉取的项目脚手架:",
    choices: PROJECT_LIST
  });
  return template;
};