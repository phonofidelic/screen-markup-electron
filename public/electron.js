const electron = require('electron');
// Module to control application life.
const app = electron.app;
const {dialog, clipboard} = require('electron');

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

const captureScreen = () => {
  console.log('*capture screen*');
  screenshot(path.join(__dirname, '/../public/screenshot.png'), function(error, complete) {
    if(error)
      console.log("Screenshot failed", error);
    else
      console.log("Screenshot succeeded");
  });
}

const saveImg = (canvas) => {
  console.log('Save!')
  // Send save message to render process

  // TODO: get reference edited image in main window
  const img = 'placeholder';

  // dialog.showSaveDialog(fileName => {
  //   // TODO: add prefix to filename before saving.
  //   // Add a way for the user to set this prefix in 
  //   // a settings UI.
  //   fs.writeFile(`${fileName}.txt`, img, err => {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log(`Image ${fileName} was saved!`);
  //   });
  // });
  dialog.showSaveDialog(saveCanvas(canvas));
}

const saveCanvas = canvas => {
  const buffer = canvasBuffer(canvas, 'image/png');

  fs.writeFile('canva-buffer-img.png', buffer, err => {
    if (err) {
      throw err;
    } else {
      console.log('Write of',filePath,'was successful')
    }
  });
}

const toggleDevTools = () => {
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
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({width: width, height: height});

  // mainWindow.loadURL(startUrl);
  mainWindow.loadURL('http://localhost:3000');


  // TODO: Create some kind of stream to connect the browsers canvas image 
  // to main electron process.

  // *** documenr is not defined
  // console.log('canvas element?', document.querySelector('#canvas'))

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

ipcMain.on('save-img', (evt, canvas) => {
  console.log('ipcMain save-img', canvas)

  // saveCanvas(canvas);
  saveImg(canvas);
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

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
          click: () => { captureScreen(); }
      },
      {
          role: 'quit'
      }
    ]
  },
  {
    label: 'File',
    submenu: [
      { 
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: () => { saveImg(); }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },   
      { role: 'redo' }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Show Developer Clonsole',
        accelerator: 'CmdOrCtrl+Alt+I',
        click: () => { toggleDevTools(); }
      }
    ]
  }
];