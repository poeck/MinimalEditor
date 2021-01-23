const nav = ["minimize", "window", "exit", "open", "save"];
let isCtrl = false;

function listenButtons() {
  nav.forEach((id) => {
    let button = document.getElementById(id);
    button.addEventListener("click", () => {
      ipcRenderer.send("click", { event: id });
    });
  });

  document.onkeyup = function (e) {
    if (e.keyCode == 17) isCtrl = false;
  };

  document.onkeydown = function (e) {
    if (e.keyCode == 17) isCtrl = true;
    if (e.keyCode == 83 && isCtrl == true) {
      ipcRenderer.send("click", { event: "save" });
      return false;
    }
  };
}
