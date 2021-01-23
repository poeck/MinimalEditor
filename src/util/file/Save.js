const { dialog } = require("electron");
const fs = require("fs");
const Path = require("path");
const OpenFile = require("../../static/OpenFile");
const OpenWindow = require("../../static/OpenWindow");
const Extension = require("./Extension");

module.exports = async (text) => {
  if (OpenFile.path !== "Undefined") {
    fs.writeFileSync(OpenFile.path, text);
    OpenWindow.window.send("saved");
  } else {
    let result = await dialog.showSaveDialog();
    if (!result.canceled) {
      fs.writeFileSync(result.filePath, text);
      OpenWindow.window.send("saved");

      OpenFile.path = result.filePath;
      let parsed = Path.parse(result.filePath);

      OpenWindow.window.send("set", {
        value: text,
        path: result.filePath,
        name: parsed.base,
        type: Extension.parse(parsed.base),
      });
    }
  }
};
