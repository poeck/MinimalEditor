module.exports = {
  parse: (filename) => {
    let splitted = filename.split(".");
    return splitted[splitted.length - 1];
  },
};
