import { app, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const events = require('events')

const winConfig = {
  title:'录屏客户端',
  show:false,
  frame:false,
  resizable:false,
  focusable:true,
  webPreferences:{
    nodeIntegration:true,
    contextIsolation:false
  }
}

class Dashboard extends events {
  constructor(confInfo){
    super()
    this.conf = Object.assign({},winConfig,confInfo)
    this.windowInstance = new BrowserWindow(this.conf)

    if(process.env.WEBPACK_DEV_SERVER_URL){
      this.windowInstance.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}/#/dashboard`)
    }else{
      createProtocol('app')
      this.windowInstance.loadURL('app://./index.html/#/dashboard')
    }

    this.init()
  }

  init(){
    this.windowInstance.once('ready-to-show',() => {
      this.windowInstance.show()
    })

    this.windowInstance.on('show',() => {
      this.emit('show')
    })

    this.listenIpc()
  }

  listenIpc(){
    ipcMain.on('move-main',(event,pos) => {
      this.windowInstance&&this.windowInstance.setPosition(pos.x,pos.y)
    })
    // 最小化窗口
    ipcMain.on('mainwin-minimize',() => {
      this.windowInstance.minimize()
    })

    // 最大化窗口
    ipcMain.on('mainwin-maximize',() => {
      this.windowInstance.maximize()
    })

    // 最大化还原
    ipcMain.on('mainwin-restore',() => {
      this.windowInstance.restore()
    })

    // 关闭窗口
    ipcMain.on('mainwin-close',() => {
      app.quit()
    })
  }
  getWebcontents(){
    return this.windowInstance.webContents
  }
}

export default Dashboard