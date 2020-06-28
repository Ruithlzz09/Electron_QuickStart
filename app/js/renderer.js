// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering

const { app } = require("electron")

// process.
const updateOnlineStatus = () => {
    let status = navigator.onLine ? 'online' : 'offline'
    if (navigator.onLine) {
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

    let note = new Notification('App',{
        body: status=='online'? 'You can proceed your work': 'Interruption in  Access. Please continue later.'
    })

    note.onclick = () => {
        console.log('Notification clicked!')
        
    }
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)
document.getElementById('checkStatusButton').addEventListener('click', () => {
    console.log('checking internet access status')
    updateOnlineStatus()
})
updateOnlineStatus()