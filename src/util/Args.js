const fs = require("fs");
const OpenWindow = require("../static/OpenWindow");
const OpenFile = require("../static/OpenFile");
const Path = require("path");
const Extension = require("./file/Extension");

module.exports = {
  init: () => {
    let path;
    if (process.platform == "win32" && process.argv.length >= 2) {
      path = String(process.argv[1]);
    }

    if (
      path !== "" &&
      path !== undefined &&
      path !== "." &&
      fs.existsSync(path)
    ) {
      let text = fs.readFileSync(path).toString();
      OpenFile.path = path;
      let parsed = Path.parse(OpenFile.path);

      OpenWindow.window.send("set", {
        value: text,
        path: path,
        name: parsed.base,
        type: Extension.parse(parsed.base),
      });
      OpenWindow.window.send("saved");
    }
  },
};
