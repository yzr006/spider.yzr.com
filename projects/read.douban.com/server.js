// 用来启动一个node服务的模块
const http = require('http')
const spider = require('./spider')

const start = () => {
    let onRequest = async (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        })
        res.write(await spider || 'ERR')
        res.end()
    }
    
    http.createServer(onRequest).listen(3000)
    console.log('server started at: http://127.0.0.1:3000/')   
}

module.exports = {start}