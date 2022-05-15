const { ipcRenderer } = window.require('electron')

export const screenBounds = () => {
  return new Promise(resolve => {
    ipcRenderer.on('transport-bounds',(event,args) => {
      resolve(args)
    })
    ipcRenderer.send('recive-bounds')
  })
}


export const screenImg = async () => {
  return new Promise(resolve => {
    ipcRenderer.send('recive-desktop')

    ipcRenderer.on('transport-source',(event,args) => {
      resolve(args)
    })
  })
}
