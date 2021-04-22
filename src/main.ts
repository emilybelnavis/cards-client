import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    // @ts-ignore
    static BrowserWindow;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            this.application.quit();
        }
    }

    private static onClose() {
        // @ts-ignore
        this.mainWindow = null;
    }

    private static onReady() {
        this.mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            resizable: false,
            titleBarStyle: 'hidden',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true,
            }
        });

        this.mainWindow.loadFile(path.join(__dirname, "public", "views", "home", "index.html"));
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        this.BrowserWindow = browserWindow;
        this.application = app;
        this.application.on("window-all-closed", this.onWindowAllClosed);
        this.application.on("ready", this.onReady);
    }
}
