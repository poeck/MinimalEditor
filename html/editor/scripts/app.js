const { ipcRenderer } = require("electron");

function app() {
  ipcRenderer.send("ready");
  listenButtons();
  createEditor();
}

app();
