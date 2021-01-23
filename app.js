"use strict";
require("electron-reload")(__dirname);

// -----------------------
//        Imports
// -----------------------

const { app, ipcMain } = require("electron");
const Registry = require("./src/util/registry/Registry");
const FileManager = require("./src/util/FileManager");
const Window = require("./src/util/Window");
const Store = require("./src/util/Store");
const Args = require("./src/util/Args");
const Event = require("./src/util/Event");

function init() {
  Store.init(); // Init storage
  Args.init(); // Check arguments
  Registry.init(); // Init windows-registry
}

app.whenReady().then(Window.create);
app.on("window-all-closed", () => app.quit());

ipcMain.on("ready", init);
ipcMain.on("click", Event.call);
ipcMain.on("save", (event, data) => FileManager.saveFile(data.value));
