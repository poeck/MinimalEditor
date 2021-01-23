const editorDiv = document.getElementById("editor");
const barTitle = document.getElementById("barTitle");

let fileName = "Untitled";

function createEditor() {
  var editor = CodeMirror(editorDiv, {
    mode: "text/plain",
    lineNumbers: "true",
    matchBrackets: true,
    autoCloseBrackets: true,
    autofocus: true,
    viewportMargin: 0,
    theme: "minimal",
    scrollbarStyle: "simple",
  });

  editor.on("change", () => setSaved(false));

  ipcRenderer.on("saved", () => setSaved(true));

  ipcRenderer.on("do", (event, data) => {
    if (data.event == "save") {
      ipcRenderer.send("save", { value: editor.getValue() });
    }
  });

  ipcRenderer.on("set", (event, data) => {
    if (data) {
      fileName = data.name;
      editor.setValue(data.value);
      setTitle(data.name);
      importMode(CodeMirror.findModeByExtension(data.type).mode);
      setTimeout(
        () =>
          editor.setOption(
            "mode",
            CodeMirror.findModeByExtension(data.type).mime
          ),
        1000
      );
    }
  });
}

function setSaved(to) {
  if (to) setTitle(fileName);
  else setTitle(fileName + " *");
}

function setTitle(title) {
  barTitle.innerHTML = title;
}

function importMode(mode) {
  if (!document.getElementById(mode)) {
    let head = document.getElementsByTagName("head")[0];
    let link = document.createElement("script");
    link.id = mode;
    link.src = "../assets/CodeMirror/mode/" + mode + "/" + mode + ".js";
    head.appendChild(link);
  }
}
