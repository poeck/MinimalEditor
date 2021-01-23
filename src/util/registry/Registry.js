const { app } = require("electron");
const { ProgId, ShellOption, Regedit } = require("electron-regedit");
const isPackaged = require("electron-is-packaged").isPackaged;
const Store = require("../Store");
const Extensions = require("./Extensions");
const path = require("path");

let iconPath;

module.exports = {
  init: () => {
    // Check if registered
    if (Store.get("registered") == undefined) {
      if (isPackaged) {
        iconPath = path.join(process.resourcesPath, "assets", "mid.ico");
      } else {
        iconPath = path.join(app.getAppPath(), "assets", "mid.ico");
      }

      registerExtensions();
      Store.put("registered", true); // Save
    }
  },
};

async function registerExtensions() {
  await Regedit.uninstallAll();

  new ProgId({
    appName: "Minimal",
    description: "Minimal Editor",
    icon: iconPath,
    extensions: Extensions,
    shell: [
      new ShellOption({ verb: ShellOption.OPEN }),
      new ShellOption({ verb: ShellOption.EDIT, args: ["--edit"] }),
      new ShellOption({ verb: ShellOption.PRINT, args: ["--print"] }),
    ],
  });

  await Regedit.installAll();
}
