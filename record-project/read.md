## 项目搭建

新建一个空目录作为项目目录，初始化项目，填写对应的属性项

```shell
npm init
```

或执行命令，直接生成默认

```shell
npm init -y 
```

全局安装`electron`，安装后可以使用electron命令

```shell
npm install -g electron
```

检测是否安装，执行命令，输出了版本号则代表全局electron安装成功

```shell
electron -v
```

全局安装electron外，当前项目也需要安装electron依赖

```shell
npm install --save-dev electron
```

运行程序，在当前项目执行命令

```shell
electron .
```

此时给我们报一个错误，告诉我们找不到`package.json`中指定的有效的应用入口文件

![image-20220408105658049](D:\electron-course\read-img\image-20220408105658049.png)

在根目录新建入口文件index.js，再新建一个index.html文件。 然后我们在这两个文件分别添加点内容

```javascript
// index.js
const {app, BrowserWindow} = require('electron')

app.on('ready',function(){
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile('index.html')
})
```

```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <p>第一个electron应用</p>
</body>
</html>
```

我们在对`package.json`做一点更改，运行命令`npm start`

```json
{
    "scripts":{
        "start":"electron ."
    }
}
```

我们可以看到，桌面打开了一个应用，这就是我们第一个electron应用程序

<font color="red">如果输出中文乱码，可以更改package.json命令 ` "start":“chcp 65001 && electron .”`</font>

## 进程

electron中进程分为两部分，一个是主进程、一个是渲染进程

#### 主进程

前面我们把第一个electron应用跑起来了，在前面我们有一个入口文件index.js。项目启动时会运行这个index.js脚本，应用把这个脚本当做主脚本，也叫作主进程。

- 主进程是在Node.js环境中运行的，所以它可以使用Node的模块。

- 主进程负责控制应用程序的声明周期、显示界面、管理渲染进程等

- 一个electron只有一个主进程。

#### 渲染进程

渲染进程是负责渲染用户界面展示的，web渲染环境就是渲染进程。electron应用是使用chromium来展示页面的，chromuim是chrome浏览器引擎，electron的每个页面都运行着一个渲染进程。 



我们先来对项目做点修改，新增文件`home.js`

```javascript
function sum(a,b){
  return a+b
}

document.querySelector('.handleSum').addEventListener('click',function(){
  console.log(sum(1,4))
})
```

修改index.html

```html
<body>
  <p>首页</p>
  <button class="handleSum">相加</button>
  <script src="./home.js"></script>
</body>
```

然后再运行项目，我们可以和页面进行交互。



## app 模块

app模块控制应用程序的声明周期，它属于主进程模块。我们可以在主进程中引入并使用。 

我们来看下一个应用从启动到关闭它的生命周期是怎么样的

#### 事件

- will-finish-launching：应用程序完成基本启动，windows上该事件等同于 `ready` 
- ready：当electron完成初始化触发
- will-quit：当所有窗口都关闭，并且应用程序即将退出时触发
- quit：应用程序退出时触发



## BrowserWindow模块

BrowserWindow模块用于创建和控制应用窗口，它属于主进程模块。

BrowserWindow是一个类，创建窗口，需要使用new实例化它，在实例化的过程中我们可以给它传入配置选项来自定义窗口。

#### 配置项

实例化时，我们可以传入 `width`,`height` 设置窗口的宽高

除了width、height设置外，还有很多的配置项可以设置。

- maxWidth、maxHeight、minWidth、minHeight：设置最大最小宽高。 我们可以对窗口进行拖拉伸缩，设定了这几个配置，就指定窗口可伸缩的大小
- frame配置项：指定创建的窗口是否有边框，默认为true，设置为false则没有自带的边框栏
- transparent配置项：可以让窗口变透明，当frame为true时不生效。 我们可以借助这个配置实现一个全屏画板工具

- webPreferences配置项：这个配置项是一个很重要的配置项，它是一个对象，用于设置网页功能
  - nodeIntegration：是否开启node支持，默认false。 
  - contextIsolation：是否开启上下文隔离，默认为true



我们知道在只有主进程的脚本处于nodeJS环境，而渲染进程脚本还是处于web环境，渲染进程不可以使用nodeJs，而我们要用，需要将这个属性`nodeIntegration`设置为true即可

我们在`home.js`中添加代码， 引入node的path模块

```javascript
const path = require('path')
function sum(a,b){
  return a+b
}
document.querySelector('.handleSum').addEventListener('click',function(){
  console.log(sum(1,4))
  console.log(path.resolve(__dirname))
})
```

运行项目，会有如下报错，不可以使用require的方式

![image-20220408170315950](D:\electron-course\read-img\image-20220408170315950.png)

我们需要设置`nodeIntegration`为true和 设置`contextIsolation`为false

#### 方法

实例化之后得到实例化对象，可以调用BrowserWindow类提供的方法 `loadFile()` 加载html文件

**loadFile(filePath)**：filePath是相对于应用程序根目录的HTML文件路径

除了这个外，再介绍一个 `loadURL()`方法，`loadFile()`是加载html文件，而`loadURL()`加载的是远程地址，比如

```javascript
winInstance.loadURL('http://www.baidu.com')
```

BrowserWindow模块除了上面提到的外还有非常多的配置项和方法，在后面实战章节，我们接触到了会做讲解。



## 进程通信

我们知道electron分为了主进程和渲染进程，他们之间是不会共享内存和状态的。 而真实项目时，主进程和渲染进程之间的数据传输又是必须的，就比如我们演示案例中实现的鼠标拖动客户端让它随着鼠标在桌面上移动位置，就要用到进程通信。

首先我们要介绍两个模块：主进程的 `ipcMain`模块、渲染进程的`ipcRenderer`模块

#### ipcMain

从主进程异步通信到渲染进程，它是一个事件发射器，通过它可以接收到从渲染进程发送过来的消息

```javascript
ipcMain.on(channel,(event,args) => {
    console.log(args)
})
```



```javascript
// 主进程 index.js
ipcMain.on('recive-home',(event,args)=>{
    console.log(args,'接收到')
    event.reply('recive-renderer','返回给渲染进程的')
})
```

#### 渲染进程

从渲染器进程异步通信到主进程，

```javascript
// home.js
const { ipcRenderer } = require('electron')
function sum(a,b){
  return a+b
}

document.querySelector('.handleSum').addEventListener('click',function(){
  console.log(sum(1,4))
  ipcRenderer.send('recive-home','home传递过来')
})

ipcRenderer.on('recive-renderer',(event,arg) => {
  console.log(arg,'接收到来自主进程的')
})
```



## 设置托盘

客户端打开，在右下角会有一个托盘显示，使用主进程的 Tray 模块可以设置托盘。我们需要照一张icon图当做图片图标

```javaSCRIPT
const {Tray} = require('electron')
app.on('ready',function(){
    const tray = new Tray(path.join(__dirname,'./icon.png'))
})
```

托盘图标设置完成，鼠标移动到上面，可以显示一行提示，Tray提供方法 `setToolTip()`

```javascript
tray.setToolTip('This is my application.')
```

**设置上下文菜单**

```javascript
tray.setContextMenu(Menu)
```

Menu的生成，需要引入Menu类， Menu的静态方法`Menu.buildFromTemplate()`生成菜单选项

```javascript
const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
])
```

`buildFromTemplate()`方法接收的是一个数组，menuItem数组





## 创建vue+electron项目

1. vue-cli创建一个vue项目 `vue create electron-vue`

2. 进入项目目录安装electron `npm install --save-dev electron`

3. 安装依赖包`vue-cli-plugin-electron-builder`

4. 执行命令 `vue add electron-builder`

执行`vue add electron-builder`后，会在项目结构中生成 `src/background.js`

package.json的scripts会新增几条命令

```json
{
    "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
+    "electron:build": "vue-cli-service electron:build",
+    "electron:serve": "vue-cli-service electron:serve",
+    "postinstall": "electron-builder install-app-deps",
+    "postuninstall": "electron-builder install-app-deps"
  },
}
```



## 项目初始化

**sass依赖**：css样式我选择sass来写,sass-loader我制定了版本安装，避免一些版本错误

```shell
yarn add -D sass sass-loader@10.0.1
```

**lib-flexible、px2rem-loader**：安装这两个做页面自适应

**新建vue.config.js**：并添加配置

```javascript
module.exports = {
  css:{
    scss:{
      additionalData:'@import "~@/assets/styles/variables.scss";'
    },
    postcss:{
      plugins:[
        px2rem({
          remUnit:120
        })
      ]
    }
  }
}
```



我们需要使用remote模块，需要安装依赖。早期版本的electron可以直接使用

```javascript
const { remote } = require('electron')
```

后来的版本remote的用法大变动，我们需要引入引来

```shell
npm install --save-dev @electron/reomte
```

并且需要在主进程中添加，开启允许渲染进程开始remote

```javascript
require('@electron/remote/main').initialize()
// 渲染线程开启remote electron 14+
require("@electron/remote/main").enable(this.windowInstance.webContents)
```

打包后发现 can not find @electron/remote 报错。



如果有eslint报错： 

<font color="red">error  Newline required at end of file but not found  eol-last</font>

```
"rules": {
    "@typescript-eslint/explicit-module-boundary-types":"off",
    "key-spacing": "off",
    "eol-last":"off",
    "arrow-spacing":"off",
    "no-trailing-spaces":"off",
    "space-before-function-paren":"off",
    "space-before-blocks":"off"
}
```

在package.json中添加对应的规则 如："key-spacing":"off"