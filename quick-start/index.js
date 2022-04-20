const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
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

  const tray = new Tray('icon-desk.png')
  tray.setToolTip('老万录屏')

  const menu = Menu.buildFromTemplate([
    {
      label:'设置',
      click:() => {
        console.log('我点击设置')
      }
    },
    {
      label:'退出',
      click:() => {
        app.quit()
      }
    }
  ])

  tray.setContextMenu(menu)

  mainWin.loadFile('./index.html')
  mainWin.once('ready-to-show',function(){
    mainWin.show()
  })
})
