const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const fs = require('fs')

const url = path.resolve('root','resource')

console.log(fs.existsSync(url))

ipcMain.on('renderer-send',(event,data) => {
  console.log(data)
  event.reply('main-send','我接受到了，现在给你')
})
let mainWin;
app.on('ready',function(){
  mainWin = new BrowserWindow({
    width:800,
    height:600, 
    frame:false,
    show:false,
    webPreferences:{
      nodeIntegration:true,   // 是否支持开启node，默认false
      contextIsolation:false  // 是否开启上下文隔离  默认是true
    }
  })

  mainWin.loadFile('./index.html')
  mainWin.once('ready-to-show',function(){
    mainWin.show()
  })
})

ipcMain.on('move-application',(event,pos) => {
  console.log(pos)

  mainWin && mainWin.setPosition(pos.posX,pos.posY)
})


/**
 * 主进程和渲染进程
 * 
 * 主进程中可以使用nodejs的所有API
 * 
 * ipc通信，  ipcMain  ipcRenderer
 * 
 * ipcMain 主进程中的模块
 * 
 * ipcRenderer 渲染进程中的模块
 */