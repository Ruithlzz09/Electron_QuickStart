const { app, Menu, ipcMain } = require('electron')
const path = require('path')
const { MainWindow, SplashWindow } = require('./MainWindow')
const AppTray = require('./AppTray')
const menu = require('./AppMenu')
const { title } = require('process')

//Set Env
process.env.Node_ENV = 'development'

const isDev = process.env.Node_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow, splashWindow, tray, notice

//Designing Menu 
const mainMenu = Menu.buildFromTemplate(menu)
Menu.setApplicationMenu(null)

function createMainWindow() {
  mainWindow = new MainWindow('./app/index.html', isDev)
}

function createSplashWindow() {
  splashWindow = new SplashWindow('./app/splash.html')
}

app.on('ready', () => {
  createSplashWindow()
  splashWindow.once('ready-to-show', () => {
    splashWindow.show()
    createMainWindow()
    mainWindow.setMenu(mainMenu)
  })

  splashWindow.on('closed', () => {
    splashWindow = null
  })

})



ipcMain.on('app-init', event => {
  if (splashWindow) {

    splashWindow.close()
    setTimeout(() => {
      mainWindow.show()
    }, 1000);

    const icon = path.join(__dirname, 'assets', 'icons', 'tray_icon.png')
    tray = new AppTray(icon, mainWindow)
    mainWindow.on('closed', () => {
      mainWindow = null;
    })

  }
})


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
