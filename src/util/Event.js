const { app } = require("electron");
const FileManager = require("./FileManager");
const OpenWindow = require("../static/OpenWindow");

module.exports = {
  call: (event, data) => {
    if (data.event == "minimize") {
      if (OpenWindow.window.minimizable) OpenWindow.window.minimize();
      else console.log("Cant minimize!");
    } else if (data.event == "exit") {
      app.exit();
    } else if (data.event == "window") {
      if (OpenWindow.window.isFullScreen())
        OpenWindow.window.setFullScreen(false);
      else {
        OpenWindow.window.setFullScreen(true);
      }
    } else if (data.event == "open") {
      FileManager.openFile();
    } else if (data.event == "save") {
      OpenWindow.window.send("do", { event: "save" });
    }
  },
};
