const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const { Menu, MenuItem, globalShortcut } = require('electron');

const screenshot = require('desktop-screenshot');

const path = require('path');
const url = require('url');

const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file',
  slashes: true
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const captureScreen = () => {
  console.log('*capture screen*');
  screenshot(path.join(__dirname, '/../build/screenshot.png'), function(error, complete) {
    if(error)
      console.log("Screenshot failed", error);
    else
      console.log("Screenshot succeeded");
  });
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  const menuTemplate = [
    {
      label: 'Electron',
      submenu: [
        {
            label: 'Capture screen',
            accelerator: 'CmdOrCtrl+Alt+P',
            click: () => {captureScreen()}
        },
        {
            role: 'quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },   
        { role: 'redo' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const reg = globalShortcut.register('CmdOrCtrl+Alt+P', () => {
    if (!reg) {
      console.log('global shortcut registration failed');
    }
    console.log('global screenshot')
    // TODO: Create promise to wait untill captureScreen has saved
    //       the new screenshot before calling createWindow().
    captureScreen();
    createWindow();
  });
});



app.on('will-quit', () => {
  globalShortCut.unregister('CmdOrCtrl+Alt+P');
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
      app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
      createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.