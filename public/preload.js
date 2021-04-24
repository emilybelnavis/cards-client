const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld("client", {
    rpcLobby: (content) => ipcRenderer.send('rpc-lobby', content)
})