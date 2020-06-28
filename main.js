const { app, Menu, ipcMain } = require('electron')
const path = require('path')
const MainWindow = require('./MainWindow')
const AppTray = require('./AppTray')
const isOnline = require('is-online')

//Set Env
process.env.Node_ENV = 'development'
const isDev = process.env.Node_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow, tray
let checkIsOnlineInterval, currentOnlineStatus

function createMainWindow() {
  mainWindow = new MainWindow('./app/index.html', isDev)

}

function checkIsOnline() {
  isOnline().then(online => {
    console.log("Online? " + online)
    mainWindow.webContents.send('update-online-status', { online: online })
    if (currentOnlineStatus !== online) {
      if (process.platform === 'darwin') {
        app.dock.bounce('informational')
      }
    }
    currentOnlineStatus = online
  })
}

function startCheckingOnlineStatus() {
  checkIsOnlineInterval = setInterval(checkIsOnline, 5000)
}


app.whenReady().then(() => {
  createMainWindow()
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(null)
  mainWindow.setMenu(mainMenu)

  const icon = path.join(__dirname, 'assets', 'icons', 'tray_icon.png')
  tray = new AppTray(icon, mainWindow)

  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show()
  // })
})


const menu = [

  ...(isDev
    ? [
      {
        label: 'Developer',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { type: 'separator' },
          { role: 'toggledevtools' },
        ],
      },
    ]
    : []),
]

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})


startCheckingOnlineStatus()