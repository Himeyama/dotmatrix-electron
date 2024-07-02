const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('sendFont', {
  sendFont: (codes, com) => {
    ipcRenderer.send('send-font', codes, com)
  }
})

contextBridge.exposeInMainWorld('api', {
  exit: () => {
    ipcRenderer.send('exit')
  },
  getComports: () => {
    ipcRenderer.send('get-comports')
  }
})

ipcRenderer.on('portPath', (_event, paths) => {
  let selectElement = document.getElementById('select-comport');
  let i = 1;
  for(let path of paths){
    const newOption = document.createElement('fluent-option');
    const com = `${path.path} (${path.manufacturer})`
    newOption.value = '' + i;
    newOption.textContent = com;
    selectElement.appendChild(newOption);
  }
});
