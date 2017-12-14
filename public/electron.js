const electron = require('electron');
const { 
  Menu, 
  MenuItem, 
  globalShortcut, 
  ipcMain, 
  BrowserWindow, 
  app 
} = electron;

const path = require('path');
const url = require('url');
const fs = require('fs');
const exec = require('child_process').exec;
const temp = require('temp').track();

// TODO: Move Loger to an external module
// Logger stores console messegas and sends them to render process 
// once browser window has been created
class Logger {
  constructor() {
    this.messages = [];
  }

  log(description, value) {
    this.messages.push({description: description, value: value});
  }

  sendLogs(win) {
    win.webContents.send('logger-messages', this.messages);
  }
}
const browserLogger = new Logger();

// Create new Winston logger instance
const logger = require('./utils/logger');

// TODO: Move to module
// Takes a screenshot of the users desktop using Mac screencapture command.
// Saves screenshot to a temporary .png file, then reads that file and 
// returns a promise containing a buffer array of the image data.
const darwinSnapshot = () => {
  return new Promise((resolve, reject) => {
    var tmpPath = temp.path({ suffix: '.png' });
    logger.debug('darwinSnapshot, tmpPath:', tmpPath);
    browserLogger.log('darwinSnapshot, tmpPath:', tmpPath);

    exec('screencapture -x -t png ' + tmpPath, function (err, stdOut) {
      if (err) {
        logger.error('darwinSnapshot, exec error:', err);
        browserLogger.log('darwinSnapshot, exec error:', err);
        return reject(err)
      } else {
        fs.readFile(tmpPath, function (err, img) {
          if (err) {
            browserLogger.log('darwinSnapshot error at fs.readFile:', err);
            return reject(err)
          } else {
            logger.debug('darwinSnapshot resolve, img:', img);
            browserLogger.log('darwinSnapshot resolve, img:', img);
            resolve(img);
          }
          fs.unlink(tmpPath, function (err) {
            if (err) {
              browserLogger.log('darwinSnapshot error at fs.unlink:', err);
              return reject(err)
            }
          })
        })
      }
    })
  })
}

const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file:',
  slashes: true
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep track of devTools toggle state
// TODO: move to wherever we are keeping track of state (model)
let devToolsOpen = false;

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

// Listen for window-loaded event from render process. 
// This event is fired once Canvas react component has mounted.
ipcMain.on('canvas-did-mount', (e) => {
  // Send loggs to render process
  browserLogger.sendLogs(mainWindow);  
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Register global keyboard shortcut for screen capture
  const reg = globalShortcut.register('CmdOrCtrl+Alt+P', () => {
    if (!reg) {
      logger.error('global shortcut registration failed');
      browserLogger.log('global shortcut registration failed', '');
    }

    darwinSnapshot().then(buffer => {
 
      // Make image buffer available to render process throug global var
      global.imageBuffer = buffer;
      
      // Create browser window ater buffer is available in global var
      createWindow(); 
    }).catch(err => {
      console.error('screenCapBuffer error:', err);
      browserLogger.log('screenCapBuffer error:', err);
    });
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