const { app, Menu, Tray } = require('electron')

class AppTray extends Tray {
    constructor(icon, mainWindow) {
        super(icon)
        this.mainWindow = mainWindow
        this.contextMenu = Menu.buildFromTemplate([
            {
                label: 'AppTitle',
                click: () => {
                    if (this.mainWindow.isVisible() === true) {
                        this.mainWindow.hide()
                    } else {
                        this.mainWindow.show()
                    }
                }
            },
            { role: "quit" },


        ])
        this.setContextMenu(this.contextMenu)
    }

}



module.exports = AppTray