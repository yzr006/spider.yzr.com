const http = require('http')
const url = require('url')

const start = () => {
    let onRequest = async (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        })
        res.write('' || 'ERR')
        res.end()
    }
    
    http.createServer(onRequest).listen(3000)
    console.log('server started!')
}

module.exports = {start}