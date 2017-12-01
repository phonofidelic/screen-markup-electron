const electron = require('electron');
// Module to control application life.
const app = electron.app;
const { dialog, clipboard } = require('electron');

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// const { BrowserWindow } = require('electron').remote;
const { Menu, MenuItem, globalShortcut, ipcMain } = require('electron');

const screenshot = require('desktop-screenshot');
const screenshotBuffer = require('screenshot-desktop');

const path = require('path');
const url = require('url');
const fs = require('fs');
const canvasBuffer = require('electron-canvas-to-buffer');

// Logger stores console messegas and sends them to render process 
// once browser window has been created
class Logger {
  constructor() {
    this.messages = [];
  }

  sendLogs(win) {
    win.webContents.send('logger', this.messages);
    console.log('logs sent, logger.messages', this.messages)
  }
}

const logger = new Logger();

const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file:',
  slashes: true
});

const screenshotUrl = process.env.SCREENSHOT_URL || url.format({
  pathname: path.join(__dirname, '/assets/screenshot.png'),
  protocol: 'file',
  slashes: true
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep track of devTools toggle state
// TODO: move to wherever we are keeping track of state (model)
let devToolsOpen = false;

// const captureScreen = (winSize) => {
//   console.log('*capture screen*');
//   screenshot(path.join(__dirname, '/../public/screenshot.png'), {width: winSize.width, height: winSize.height}, function(error, complete) {
//     if(error)
//       console.log("Screenshot failed", error);
//     else
//       console.log("Screenshot succeeded");
//   });
// }

const screenCapBuffer = () => {
  screenshotBuffer().then(buffer => {
    // Make image buffer available to render process throug global var
    console.log('screenCapBuffer, buffer', buffer);
    global.imageBuffer = buffer;
    // Create browser window ater buffer is available in global var
    createWindow(); 
  }).catch(err => {
    console.error('screenCapBuffer error:', err);
  });
}

const toggleDevTools = () => {
  // Initiate devtron tab in devtools
  // require('devtron').install();
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

  mainWindow.loadURL(startUrl);
  // mainWindow.loadURL('http://localhost:3000');  

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

ipcMain.on('window-loaded', (e) => {
  console.log('window loaded')
  // Send loggs to render process
  logger.sendLogs(mainWindow);  
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  const SCREEN_SIZE = electron.screen.getPrimaryDisplay().size;

  // Register global keyboard shortcut for screen capture
  const reg = globalShortcut.register('CmdOrCtrl+Alt+P', () => {
    if (!reg) {
      console.log('global shortcut registration failed');
      logger.messages.push({description: 'global shortcut registration failed', value: '(no value)'});
    }
    console.log('global screenshot')
    logger.messages.push({description: 'global screenshot', value: '(no value)'});

    // captureScreen(SCREEN_SIZE);

    // screenCapBuffer();
    screenshotBuffer().then(buffer => {
      // Make image buffer available to render process throug global var
      console.log('screenCapBuffer, buffer', buffer);
      logger.messages.push({description: 'screenCapBuffer, buffer', value: buffer});

      global.imageBuffer = buffer;
      // Create browser window ater buffer is available in global var
      // createWindow(); 
    }).catch(err => {
      console.error('screenCapBuffer error:', err);
      logger.messages.push({description: 'screenCapBuffer error:', value: err})
    });

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
        click: () => { screenCapBuffer(); }
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