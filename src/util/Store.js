const os = require("os");
const Storage = require("node-storage");

module.exports = class Store {
  static store;

  static init() {
    var tempdir = os.tmpdir();
    this.store = new Storage(tempdir + "\\minimal");
  }

  static get(key) {
    return this.store.get(key);
  }

  static put(key, value) {
    return this.store.put(key, value);
  }
};
