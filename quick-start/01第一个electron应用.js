const { app, BrowserWindow } = require('electron')

app.on('ready',function(){
  const mainWin = new BrowserWindow({
    width:800,
    height:600
  })

  mainWin.loadFile('index.html')
})

/**
 * 全局安装  
 * npm install -g electron  
 * 
 * 局部安装
 * npm install --save-dev electron
 * 
 */