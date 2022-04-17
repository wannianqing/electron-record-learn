const { app, BrowserWindow } = require('electron')


app.on('quit',function(){
  console.log('quit')
})

app.on('before-quit',function(){
  console.log('before-quit')
})

app.on('will-quit',function(){
  console.log('will-quit')
})

app.on('browser-window-created',function(){
  console.log('browser-window-created')
})

app.on('ready',function(){
  console.log('ready')
})


app.whenReady().then(() => {
  console.log('whenReady')
  const mainWin = new BrowserWindow({
    width:800,
    height:600
  })

  mainWin.loadFile('index.html')
})


/**
 * 生命周期
 * 
 * ready  应用程序初始化完成
 * 
 * browser-window-created 窗口创建完成触发
 * 
 * before-quit 窗口关闭之前
 * 
 * will-quit 窗口关闭了 但是程序还没有关闭， 即将关闭
 * 
 * quit 应用程序关闭触发
 * 
 * whenReady() then()
 * 
 * requestSingleInstanceLock() true  或者 false   禁止双开。
 * 
 * second-instance事件
 */