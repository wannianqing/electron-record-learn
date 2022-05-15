import{ VIDEO_PATH } from './constant'
const path = require('path')
const http = require('http')
const url = require('url')
const fs = require('fs')
const net = require('net')
const port = 9000
export function httpServer (callback){
  const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url).pathname
    const realPath = path.join(VIDEO_PATH, pathName)
    fs.readFile(decodeURIComponent(realPath), (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain;charset=utf-8'
        })
        res.write('404')
        res.end()
      } else {
        res.writeHead(200, {
          'Content-Length': Buffer.byteLength(data)
        })
        res.write(data)
        res.end('ok')
      }
    })
  })

  const serverUrl = `http://localhost:9000`
  server.listen(9000, '127.0.0.1', () => {
    // console.log('服务开启成功！！！')
    console.log('静态文件服务地址 :>> ', serverUrl)
    callback()
  })
}

function portIsOccupied (checkPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer().listen(checkPort, '127.0.0.1')
    server.on('listening', () => {
      console.log(`the server is runnint on port ${checkPort}`)
      server.close()
      // 使用注入进程环境变量的方式进行状态共享
      process.env.DEV_PORT = checkPort
      process.env.PROD_PORT = checkPort
      // 返回可用端口
      resolve(checkPort)
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // 占用端口号+1
        resolve(portIsOccupied(checkPort + 1))
        console.log(`this port ${checkPort} is occupied.try another.`)
      } else {
        reject(err)
      }
    })
  })
}
