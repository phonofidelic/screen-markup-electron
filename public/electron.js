const electron = require('electron');
// Module to control application life.
const app = electron.app;
const { dialog, clipboard } = require('electron');

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// const { BrowserWindow } = require('electron').remote;
const { Menu, MenuItem, globalShortcut, ipcMain } = require('electron');

const screenshot = require('desktop-screenshot');

const path = require('path');
const url = require('url');
const fs = require('fs');
const canvasBuffer = require('electron-canvas-to-buffer');

const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file',
  slashes: true
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep track of devTools toggle state
// TODO: move to wherever we are keeping track of state (model)
let devToolsOpen = false;

const captureScreen = (winSize) => {
  console.log('*capture screen*');
  screenshot(path.join(__dirname, '/../public/screenshot.png'), {width: winSize.width, height: winSize.height}, function(error, complete) {
    if(error)
      console.log("Screenshot failed", error);
    else
      console.log("Screenshot succeeded");
  });
}

const toggleDevTools = () => {
  // Initiate devtron tab in devtools
  require('devtron').install();
  // Open the DevTools.
  if (!devToolsOpen) { 
    mainWindow.webContents.openDevTools();
    devToolsOpen = true;
  } else {
    mainWindow.webContents.closeDevTools();
    devToolsOpen = false;
  }
}

const createWindow = () => {
  // Create the browser window.

  // TODO: Get width and height of captured image and pass to BrowserWindow
  // The image may not always be the full screen, if support for capturing 
  // specified windows or marked out rectangles is added.
  const {width, height} = electron.screen.getPrimaryDisplay().size;
  mainWindow = new BrowserWindow({
    width: width, 
    height: height, 
    titleBarStyle: 'hidden'
  });

  // mainWindow.loadURL(startUrl);
  mainWindow.loadURL('http://localhost:3000');

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

ipcMain.on('save-test', (evt, canvas) => {
  console.log('ipcMain save-test', canvas)
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  const SCREEN_SIZE = electron.screen.getPrimaryDisplay().size;

  const reg = globalShortcut.register('CmdOrCtrl+Alt+P', () => {
    if (!reg) {
      console.log('global shortcut registration failed');
    }
    console.log('global screenshot')
    // TODO: Create promise to wait untill captureScreen has saved
    //       the new screenshot before calling createWindow().
    captureScreen(SCREEN_SIZE);
    createWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregister('CmdOrCtrl+Alt+P');
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
      createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const menuTemplate = [
  {
    label: 'Electron',
    submenu: [
      {
        label: 'Capture screen',
        accelerator: 'CmdOrCtrl+Alt+P',
        click: () => { captureScreen(SCREEN_SIZE); }
      },
      {
        role: 'quit'
      },
    ]
  },
  {
    label: 'File',
    submenu: [
      { 
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: () => { 
          mainWindow.webContents.send('save-img');
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { 
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        click: () => { mainWindow.webContents.send('undo'); }
      }
    ]
  },
  {
    label: 'Tools',
    submenu: [
      {
        label: 'Rectangle',
        accelerator: 'R',
        click: () => { mainWindow.webContents.send('select-rectangle'); }
      },
      {
        label: 'Brush',
        accelerator: 'B',
        click: () => { mainWindow.webContents.send('select-brush'); }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Show Developer Clonsole',
        accelerator: 'CmdOrCtrl+Alt+I',
        click: () => { toggleDevTools(); }
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: () => { mainWindow.reload(); }
      }
    ]
  }
];