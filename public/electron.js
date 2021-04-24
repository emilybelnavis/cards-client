const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
const DiscordRPC = require('discord-rpc');
const { ipcMain } = require('electron');

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

    setActivity()
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

async function setActivity(nDetails, nState) {
    if (!rpc || !mainWindow) {
        return;
    }

    await rpc.setActivity({
        details: nDetails,
        state: nState,
        startTimestamp: startTimestamp,
        largeImageKey: 'icon',
        instance: false
    }).then();
}


// ipcMain.on('rpc-lobby', (event, arg) => {
//     console.log("received ipc message from lobby: ", arg[0])
// })

// rpc.on('ready', () => {
//     //setActivity("", "waiting", "in lobby").then();
//
//     // activity can only be set every 15 seconds
//     setInterval(() => {
//         setActivity("waiting", "In Lobby")
//             .then()
//             .catch(() => {
//                 console.error("error has occured");
//             });
//     }, 15e3);
// })

rpc.on('ready', () => {
    let details;
    let state;
    ipcMain.on('rpc-lobby', (event, arg) => {
        details = arg[0];
        state = arg[1];
    })

    setActivity(details, state).catch(() => {
        console.error("could not update RPC data");
    });

    setInterval(() => {
        setActivity(details, state).catch(() => {
            console.error("could not update RPC data");
        });
    }, 15e3);
})

rpc.login({ clientId: rpcClientId }).catch(console.error)