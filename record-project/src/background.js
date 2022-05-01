'use strict'
import { app, screen } from 'electron'
import Launch from './wins/launch'
import Dashboard from './wins/dashboard'

import {
  BASE_WIN_WIDTH,
  BASE_WIN_HEIGHT,
  DESIGNE_LAUNCH_WIDTH,
  DESIGNE_LAUNCH_HEIGHT,
  DESIGNE_DASHBOARD_WIDTH,
  DESIGNE_DASHBOARD_HEIGHT
} from './utils/constant'
// import Main from 'electron/main'

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

