const { app, BrowserWindow } = require('electron');
const fs = require('fs');

function createWindow() {

  fs.writeFileSync('badge.html', '<html><head><title>Electron window</title></head><body><h1>Hallo ik ben een badge</h1></body></html>');

  let win = new BrowserWindow({
    width: 800,
    height: 600, 
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  win.loadFile('badge.html');
  let printer = win.webContents.getPrinters().filter(p => p.name === "Microsoft Print to PDF");

  const printOptions = {
    silent: true,
    // deviceName: 'Microsoft Print to PDF'
    deviceName: "" // Takes your pc's default printer. This is also the default behavior. 
  }

  win.webContents.on('dom-ready', (event) => {
    win.webContents.print(printOptions, succes => {
      console.log("printen is geslaagd");
    })
  })
}

app.whenReady().then(createWindow);