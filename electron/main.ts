import { app, BrowserWindow } from "electron";
import path from "node:path";

function criarJanela(): void {
  const janela = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "Auto Tonalidades",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  janela.loadFile(path.join(app.getAppPath(), "electron", "index.html"));
}
app.whenReady().then(() => {
  criarJanela();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      criarJanela();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
