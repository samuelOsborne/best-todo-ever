import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { registerIPCHandlers } from './IPC/IPCHandlers'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let forceQuit = false;

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(__dirname + "/public/", 'notepad.icns'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  win.on('close', e => {
    if (!forceQuit && process.platform === 'darwin') {
      e.preventDefault() // Prevents quit
      if (win) {
        console.log("Hiding window")
        win.hide()
      }
    }
        // Let the app quit normally…
  })
}

// Triggered before close event, i.e. when pressing command + Q
app.on('before-quit', () => {
  forceQuit = true
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log("Quitting..")
    app.quit()
  }
})

app.on('activate', () => {
  // createWindow();
  console.log("Browser window" + BrowserWindow.getAllWindows().length);
  if (BrowserWindow.getAllWindows().length === 0) {
    console.log("Activating..")
    createWindow()
  } else {
    console.log("Showing window")
    win?.show()
  }
})

app.whenReady().then(() => {
  registerIPCHandlers();
  createWindow();
})