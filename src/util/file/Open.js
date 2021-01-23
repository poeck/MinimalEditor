const { dialog } = require("electron");
const fs = require("fs");
const Path = require("path");
const OpenFile = require("../../static/OpenFile");
const OpenWindow = require("../../static/OpenWindow");
const Extension = require("./Extension");

module.exports = async () => {
  let result = await dialog.showOpenDialog({
    properties: ["openFile"],
  });

  if (!result.canceled) {
    let path = result.filePaths[0];
    OpenFile.path = path;

    let text = fs.readFileSync(path).toString();
    let parsed = Path.parse(path);

    OpenWindow.window.send("set", {
      value: text,
      path: path,
      name: parsed.base,
      type: Extension.parse(parsed.base),
    });
    OpenWindow.window.send("saved");
  }
};
