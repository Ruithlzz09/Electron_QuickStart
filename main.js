const {app, BrowserWindow,Menu} = require('electron')
const path = require('path')

//Set Env
process.env.Node_ENV = 'development'

const isDev = process.env.Node_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow
const menu = [
  ...(isMac ? [
    {
      label: app.name,
      submenu: [
        {
          label: 'About',
          accelerator: "CmdOrCtrl+H",
          // click: createAboutWindow, Unavailable currently 
        }
      ]
    }] : []),

  {
    role: 'fileMenu',
  },
  ...(isDev ? [
    {
      label: 'Developer',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { type: 'separator' },
        { role: 'toggledevtools' },
      ],
    },

  ] : []),

  ...(!isMac ? [
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          accelerator: "CmdOrCtrl+H",
          click: createWindow
        },
      ],
    },
  ] : [])
]

function createWindow () {
  mainWindow = new BrowserWindow({
    title: '',
    width: isDev ? 500 : 450,
    height: 500,
    icon: `${__dirname}/assets/icons/icon_1024x1024.png`,
    show: false,
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  mainWindow.loadFile('./app/index.html')

}

app.whenReady().then(() => {
  createWindow()
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(null)
  mainWindow.setMenu(mainMenu)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.on('closed', () => { mainWindow = null; })
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
