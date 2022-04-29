'use strict'
import { app, screen } from 'electron'
import Launch from './wins/launch'

import {
  BASE_WIN_WIDTH,
  BASE_WIN_HEIGHT,
  DESIGNE_LAUNCH_WIDTH,
  DESIGNE_LAUNCH_HEIGHT
} from './utils/constant'
import Main from 'electron/main'

app.on('ready', async () => {
  const rect = screen.getPrimaryDisplay().bounds
  const launcW = (rect.widht / BASE_WIN_WIDTH) * DESIGNE_LAUNCH_WIDTH
  const launcH = (rect.height / BASE_WIN_HEIGHT) * DESIGNE_LAUNCH_HEIGHT
  const LaunchPage = new Launch({
    width:launcW,
    height:launcH
  })

  LaunchPage.on('show',function(){
    console.log('启动页启动了')

    new MainWindow = new Main()

    MainWindow.on('show',functoin(){
      LaunchPage.close()
    })
  })
})

