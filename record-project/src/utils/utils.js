import{ VIDEO_PATH } from './constant'
const path = window.require('path')
const fs = window.require('fs')


/** 创建目录 */
export function mkdirDirectory (pathUrl) {
  return new Promise(resolve => {
    if (!fs.existsSync(pathUrl)) {
      const res = fs.mkdirSync(pathUrl, { recursive: true })
      if (res) {
        resolve(true)
      }
    } else {
      resolve(true)
    }
  })
}

/** 保存 */
export function saveMedia (blob) {
  return new Promise((resolve, reject) => {
    const times = new Date().getTime()

    mkdirDirectory(VIDEO_PATH).then(() => {
      const localPath = path.join(VIDEO_PATH, `${times}.mp4`)
      const reader = new FileReader()
      reader.onload = () => {
        const buffer = Buffer.from(reader.result)
        fs.writeFile(localPath, buffer, {}, (err, res) => {
          if (err) return console.error(err)
        })
      }
      reader.onerror = err => {
        reject(err)
      }
      reader.readAsArrayBuffer(blob)
      reader.onloadend = () => {
        resolve()
      }
    })
  })
}

/** 获取指文件列表 */
export function directoryFiles(){
  if(!fs.existsSync(VIDEO_PATH)){
    return []
  }
  const filenames = fs.readdirSync(VIDEO_PATH)
  const filts = filenames.filter((item) => {
    const filePath = path.join(VIDEO_PATH,item)
    return fs.statSync(filePath).isFile()
  })

  return filts
}

/** 时间转换 */
export function timestampToTime(timestamp, isMs = false){
  let intPart = Math.floor(timestamp)
  if (isMs) {
    intPart = Math.floor(timestamp / 1000)
  }
  const h =
    Math.floor(intPart / 3600) < 10
      ? '0' + Math.floor(intPart / 3600)
      : Math.floor(intPart / 3600)

  const m =
    Math.floor((intPart / 60) % 60) < 10
      ? '0' + Math.floor((intPart / 60) % 60)
      : Math.floor((intPart / 60) % 60)

  const s =
    Math.floor(intPart % 60) < 10
      ? '0' + Math.floor(intPart % 60)
      : Math.floor(intPart % 60)

  return `${h}:${m}:${s}`
}