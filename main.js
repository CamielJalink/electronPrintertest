const { app, BrowserWindow } = require('electron');

function createWindow() {

  let win = new BrowserWindow({
    width: 800,
    height: 600, 
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html');

  let printer = win.webContents.getPrinters().filter(p => p.name === "Microsoft Print to PDF");
  
  console.log(printer);
  console.log(printer[0].name);


  const printOptions = {
    silent: true,
    // deviceName: 'Microsoft Print to PDF'
    // deviceName: 'NPIF05A66 (HP Color LaserJet MFP M281fdw)'
    deviceName: printer[0].name
    // deviceName: ""
  }

  win.webContents.print(printOptions, succes => {
    console.log("printen is geslaagd");
  })
}

app.whenReady().then(createWindow);
