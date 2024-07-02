const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const { SerialPort } = require('serialport');


const createWindow = () => {
    const win = new BrowserWindow({
        width: 1090,
        height: 390,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js')
        },
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            // color: '#2f3241',
            color: '#F8F8F8',
            height: 48
        }
    })

    win.loadFile(path.join(__dirname, 'src/renderer', 'index.html'))
}

ipcMain.on('exit', (_event) => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('get-comports', (event) => {
    SerialPort.list().then((ports) => {
        portList = []
        ports.forEach((port) => {
            portList.push({path: port.path, manufacturer: port.manufacturer})
        });
        event.sender.send('portPath', portList)
    });
})


ipcMain.on('send-font', (_event, codes, com) => {
    const port = new SerialPort({
        path: com,
        baudRate: 9600
    })

    port.on('open', () => {
        console.log('Port Opened')

        setTimeout(() => {
            port.write(codes, (err) => {
                if (err) {
                    return console.log('Error on write: ', err.message)
                }
                console.log('Message written')
    
                // 書き込み後、ポートを閉じる
                port.close((err) => {
                    if (err) {
                        return console.log('Error on close: ', err.message)
                    }
                    console.log('Port Closed')
                })
            })
        }, 2000)
    })

    port.on('error', (err) => {
        console.log('Error: ', err.message)
    })

    port.on("data", (data) => {
        console.log(data)
    })
})


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})