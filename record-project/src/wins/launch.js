import { BrowserWindow, WebContents, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const events = require('events')

const winConfig = {
  show: false,
  frame: false,
  focusable: true,
  alwaysOnTop: false,
  resizable: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  }
}
class Launch extends events {
  constructor (confInfo) {
    super()
    this.confInfo = confInfo
    this.state = Object.assign({}, winConfig, confInfo)
    this.windowInstance = new BrowserWindow(this.state)

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.windowInstance.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}/#/launchPage`)
      // this.windowInstance.webContents.openDevTools()
    } else {
      createProtocol('app')
      this.windowInstance.loadURL('app://./index.html/#/launchPage')
    }

    this.init()
  }

  init () {
    this.windowInstance.once('ready-to-show', () => {
      this.windowInstance.show()
    })

    this.windowInstance.on('show', () => {
      this.emit('show')
    })

    this.listenIpc()
  }

  listenIpc () {
    const { width, height } = this.confInfo
    ipcMain.on('move-launch', (event, pos) => {
      this.windowInstance && this.windowInstance.setBounds({ width, height })
      this.windowInstance && this.windowInstance.setPosition(pos.baseX, pos.baseY)
    })
  }

  getWebContents () {
    return this.windowInstance.webContents
  }

  getWindowInstance () {
    return this.windowInstance
  }

  hide () {
    this.windowInstance && this.windowInstance.hide()
  }

  close () {
    if (this.windowInstance && this.windowInstance.isVisible()) {
      this.windowInstance.close()
      this.windowInstance = null
    }
  }
}

export default Launch
