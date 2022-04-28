require("@cyber-tools/cli-utils/initial");
require("module-alias").addAlias("@", __dirname);
const selectTemplate = require("@/utils/selectTemplate");
const inputPackageName = require("@/utils/inputPackageName");
const downloadTemplate = require("@/utils/downloadTemplate");
const changeJsonFile = require("@/utils/changeJsonFile");


(async () => {
  try {
    const { remote, devDependencies } = await selectTemplate();
    const packageName = await inputPackageName();
    await downloadTemplate({ folderName: packageName, remote });
    await changeJsonFile({ folderName: packageName, projectName: packageName, devDependencies });
  } catch (error) {
    throw error;
  }
})();