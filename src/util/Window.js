const { BrowserWindow } = require("electron");
const OpenWindow = require("../static/OpenWindow");

module.exports = {
  create: () => {
    OpenWindow.window = new BrowserWindow({
      frame: false,
      fullscreenable: true,
      webPreferences: {
        nodeIntegration: true,
      },
      autoHideMenuBar: true,
    });

    OpenWindow.window.loadFile("./html/editor/editor.html");
  },
};
