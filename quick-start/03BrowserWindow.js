const { app, BrowserWindow } = require('electron')

app.on('ready',function(){
  const mainWin = new BrowserWindow({
    width:800,
    height:600,
    resizable:true,     // 规定窗口是否可以改变尺寸  默认是true
    // maxWidth:1000,
    // maxHeight:800,
    // minWidth:600,
    // minHeight:400,
    show:false,        // 设置窗口是否显示  默认true  
    webPreferences:{
      nodeIntegration:true,   // 是否支持开启node，默认false
      contextIsolation:false  // 是否开启上下文隔离  默认是true
    }
  })

  mainWin.loadFile('./index.html')

  // mainWin.setBounds({
  //   x:500,
  //   y:500
  // })

  // mainWin.setPosition(10,10)

  mainWin.once('ready-to-show',function(){
    console.log('ready-to-show')
    mainWin.show()
  })

  mainWin.on('show',function(){
    mainWin.maximize()

    // minimize()
    // close()
  })

  // mainWin.loadURL('http://www.baidu.com')

  // mainWin.loadURL('http://localhost/sport.mp4')
})


/**
 * loadFile  用于加载本地文件，可以使用相对路径 也可以使用绝对路径
 * 也可以加载非项目中的文件  loadFile 不止可以加载html文件 也可以加载其他文件
 * 
 * loadURL 用于加载远程文件
 * 
 * maxWidth   maxHeight  minWidth minHeight
 * 
 * show() 方法  控制窗口的显示
 * 
 * webPreference:{}
 */