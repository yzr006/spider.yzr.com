const http = require('http')
const url = require('url')
const getPage = require('./getPage')
let { reqPathFilter } = require('./../../common/utils')

const start = () => {
    let onRequest = async (req, res) => {
        let pageContext = await getPage().catch(e => e.toString())
        if(!reqPathFilter(req.url)){
            console.log('小垃圾：', req.url)
        }else{
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=UTF-8',
            })
            res.write(pageContext || 'ERR')
        }
        res.end()
    }
    
    http.createServer(onRequest).listen(3000)
    console.log('server started!')
}

module.exports = {start}