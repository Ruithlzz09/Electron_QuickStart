const { BrowserWindow } = require('electron')

class MainWindow extends BrowserWindow {
    constructor(file, isDev) {
        super({
            title: "App",
            width: isDev ? 800 : 400,
            height: 450,
            show: false,
            icon: `${__dirname}/assets/icons/icon_1024x1024.png`,
            resizable: isDev,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            },

        })

        this.loadFile(file)
        if (isDev) {
            this.webContents.openDevTools()
        }
    }
}

class SplashWindow extends BrowserWindow {
    constructor(file) {
        super({
            title: "App",
            width: 400,
            height: 400,
            icon: `${__dirname}/assets/icons/icon_1024x1024.png`,
            resizable: false,
            backgroundColor: '#fff',
            alwaysOnTop: true,
            show: false,
            frame: false,
            movable: false
            
        })

        this.loadFile(file)
    }
}

module.exports = {MainWindow,SplashWindow}