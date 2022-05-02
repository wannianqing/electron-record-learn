'use strict'
import { app, screen, desktopCapturer, ipcMain, shell } from 'electron'
import Launch from './wins/launch'
import Dashboard from './wins/dashboard'

import {
  BASE_WIN_WIDTH,
  BASE_WIN_HEIGHT,
  DESIGNE_LAUNCH_WIDTH,
  DESIGNE_LAUNCH_HEIGHT,
  DESIGNE_DASHBOARD_WIDTH,
  DESIGNE_DASHBOARD_HEIGHT,
  VIDEO_PATH
} from './utils/constant'

import { httpServer } from '@/utils/server'

const path = require('path')
// import Main from 'electron/main'

const getSize = () => {
  const {size,scaleFactor} = screen.getPrimaryDisplay()
  return {
    width:size.width * scaleFactor,
    height:size.height * scaleFactor
  }
}

app.on('ready', async () => {
  const rect = screen.getPrimaryDisplay().bounds
  const launcW = (rect.width / BASE_WIN_WIDTH) * DESIGNE_LAUNCH_WIDTH
  const launcH = (rect.height / BASE_WIN_HEIGHT) * DESIGNE_LAUNCH_HEIGHT

  const dashW = (rect.width / BASE_WIN_WIDTH) * DESIGNE_DASHBOARD_WIDTH
  const dashH = (rect.height / BASE_WIN_HEIGHT) * DESIGNE_DASHBOARD_HEIGHT
  const LaunchPage = new Launch({
    width:launcW,
    height:launcH
  })

  LaunchPage.on('show',function(){
    console.log('启动页启动了')

    httpServer()

    setTimeout(() => {
      const DashboardPage = new Dashboard({
        width:dashW,
        height:dashH
      })
  
      DashboardPage.on('show',() => {
        LaunchPage.close()
      })
    },2000)

    // MainWindow.on('show',functoin(){
    //   LaunchPage.close()
    // })
  })
})

ipcMain.on('directory-open',(event,data) => {
  const file = path.join(VIDEO_PATH,data)
  shell.showItemInFolder(file)
})

ipcMain.on('recive-desktop',async (event) => {
  const sizeInfo = getSize()
  const source = await desktopCapturer.getSources({
    types: ['window', 'screen'],
    thumbnailSize:sizeInfo
  })

  event.reply('reply-source',source[0])
})

