// D盘下面的 videos
import { VIDEO_PATH } from './constant'
const path = window.require('path')
const fs = window.require('fs')

const mkdirDirectory = (pathUrl) => {
  return new Promise(resolve => {
    if(!fs.existsSync(pathUrl)){
      const res = fs.mkdirSync(pathUrl,{ recursive:true })
      if(res){
        resolve(true)
      }
    }else{
      resolve(true)
    }
  })
}

export const saveVideo = (blob) => {
  return new Promise((resolve,reject) => {
    const times = new Date().getTime()
    mkdirDirectory(VIDEO_PATH).then(() => {
      console.log('创建了')
      const videoPath = path.join(VIDEO_PATH,`${times}.mp4`)
      const reader = new FileReader()
      reader.readAsArrayBuffer(blob)
      reader.onload = () => {
        const buffer = Buffer.from(reader.result)
        fs.writeFile(videoPath,buffer,{},(err,res) => {
          if(err) return
        })
      }
      reader.onerror = (err) => {
        reject(err)
      }
      reader.onloadend = () => {
        resolve()
      }
    })
  })
}

export const directoryFiles = () => {
  if(!fs.existsSync(VIDEO_PATH)){
    return []
  }
  const filenames = fs.readdirSync(VIDEO_PATH)
  const files = filenames.filter(item => {
    const filepath = path.join(VIDEO_PATH,item)
    return fs.statSync(filepath).isFile()
  })
  return files
}

export const timeFormat = (time) => {
  const h = Math.floor(time/3600) < 10 ? '0'+Math.floor(time/3600) : Math.floor(time/3600)
  const m = Math.floor((time / 60) % 60) < 10 ? '0'+Math.floor((time / 60) % 60) : Math.floor((time / 60) % 60)
  const s = Math.floor(time % 60) < 10 ? '0'+Math.floor(time % 60) : Math.floor(time % 60)

  return `${h}:${m}:${s}`
}