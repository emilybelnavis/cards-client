const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
const DiscordRPC = require('discord-rpc');
const ipc = require('electron').ipcMain;

let mainWindow;

function onWindowAllClosed() {
    if (process.platform !== "darwin") {
        app.quit();
    }
}


function onReady() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        resizable: true,
        titleBarStyle: "default",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    mainWindow.on("closed", () => (mainWindow?.destroy()))
}

app.on('window-all-closed', onWindowAllClosed);
app.on("ready", onReady);
app.on("activate", () => {
    if (mainWindow === null) {
        onReady();
    }
})

// Discord RPC
const rpcClientId = "833186794706042910";
DiscordRPC.register(rpcClientId);
const rpc = new DiscordRPC.Client({transport: 'ipc'});
const startTimestamp = new Date();

async function setActivity(info, nState) {
    if (!rpc || !mainWindow) {
        return;
    }

    await rpc.setActivity({
        details: info,
        state: nState,
        startTimestamp: startTimestamp,
        largeImageKey: 'icon',
        instance: false
    }).then();
}


ipc.on('rpc-lobby', (event, arg) => {
    
})

rpc.on('ready', () => {
    //setActivity("", "waiting", "in lobby").then();

    // activity can only be set every 15 seconds
    setInterval(() => {
        setActivity("waiting", "In Lobby")
            .then()
            .catch(() => {
                console.error("error has occured");
            });
    }, 15e3);
})

rpc.login({ clientId: rpcClientId }).catch(console.error)