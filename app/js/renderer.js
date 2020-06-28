// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering

const { ipcRenderer } = require("electron")
let onlineStatus
// process.
const updateOnlineStatus = (event, status) => {
    if (status.online) {
        document.body.style.backgroundColor = 'green'
        document.getElementById('h2-checking').style.display = 'none'
        document.getElementById('h2-online').style.display = 'block'
        document.getElementById('h2-offline').style.display = 'none'
    } else {
        document.body.style.backgroundColor = 'red'
        document.getElementById('h2-checking').style.display = 'none'
        document.getElementById('h2-online').style.display = 'none'
        document.getElementById('h2-offline').style.display = 'block'
    }
    if (this.onlineStatus !== undefined && this.onlineStatus !== status.online) {
        let note = new Notification('App',
            { body: status.online == true ? 'You can proceed your work' : 'Interruption in  Access. Please continue later.' })
        note.onclick = () => {
            console.log('Notification clicked!')
        }
    }
    this.onlineStatus = status.online
}
ipcRenderer.on('update-online-status', updateOnlineStatus)

const checkOnlineStatus = () => {
    document.body.style.backgroundColor = 'white'
    document.getElementById('h2-checking').style.display = 'block'
    document.getElementById('h2-online').style.display = 'none'
    document.getElementById('h2-offline').style.display = 'none'
    ipcRenderer.send('check-online-status')
}


window.addEventListener('online', checkOnlineStatus)
window.addEventListener('offline', checkOnlineStatus)
document.getElementById('checkStatusButton').addEventListener('click', checkOnlineStatus,
    false)