const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('sendFont', {
  sendFont: (codes) => {
    ipcRenderer.send('send-font', codes)
  }
})

contextBridge.exposeInMainWorld('api', {
  exit: () => {
    ipcRenderer.send('exit')
  }
})