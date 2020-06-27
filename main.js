const { app, Menu} = require('electron')
const path = require('path')
const MainWindow = require('./MainWindow')
const AppTray = require('./AppTray')

//Set Env
process.env.Node_ENV = 'development'

const isDev = process.env.Node_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow
let tray

function createMainWindow() {
  mainWindow = new MainWindow('./app/index.html', isDev)

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

  mainWindow.on('closed', () => { mainWindow = null; })
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
