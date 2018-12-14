const { app, BrowserWindow } = require('electron')
const fs = require('fs');
const path = require('path');
let win;

function createWindow () {
    // Create the browser window.

    try {
        const keyArg = process.argv.filter(x => x.includes("--keyFile"));
        if(keyArg.length === 0) throw new Error("Add path to key file with --keyFile=FILEPATH")
        keyPath = path.resolve(keyArg[0].split("=")[1]);
        if(!fs.existsSync(keyPath)) throw new Error("Key File does not exists");
    } catch(e) {
        console.error(e);
        process.exit("1");
    }

    let windowOptions;
    if(process.argv.includes("--live")) {
        windowOptions = {
            width: 800,
            height: 600,
            fullscreen: true,
            frame: false,
            backgroundColor: '#ffffff',
            "web-preferences": {
                "web-security": true,
                devTools: false
            }
        }
    } else {
        windowOptions = {
            width: 800,
            height: 600,
            backgroundColor: '#ffffff',
            "web-preferences": {"web-security": false}
        }
    }
    win = new BrowserWindow(windowOptions);
    win.loadFile(`app/index.html`)

    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})