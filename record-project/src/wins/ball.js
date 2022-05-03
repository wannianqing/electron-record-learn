import { BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const events = require('events')

const winConfig = {
  frame:false,
  transparent:true,
  alwaysOnTop:true,
  focusable:false,
  resizable:false,
  webPreferences:{
    nodeIntegration:true,
    contextIsolation:false
  }
}

class SuspendBall extends events {
  constructor(confInfo){
    super()
    this.confInfo = confInfo
    this.conf = Object.assign({},winConfig,confInfo)
    this.windowInstance = new BrowserWindow(this.conf)

    if(process.env.WEBPACK_DEV_SERVER_URL){
      this.windowInstance.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}/#/suspend`)
    }else{
      createProtocol('app')
      this.windowInstance.loadURL('app://./index.html/#/suspend')
    }
    this.listIpc()
  }

  listIpc(){
    ipcMain.on('ball-move',(event,pos) => {
      this.windowInstance&&this.windowInstance.setPosition(pos.x,pos.y)
    })
  }
  getWebcontents(){
    return this.windowInstance.webContents
  }
}

export default SuspendBall