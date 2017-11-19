const mysql = require('mysql')
process.env.NODE_ENV = 'development'
let config = require('./config.js')[process.env.NODE_ENV]

console.log('ENV: ', process.env.NODE_ENV)

const connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database,
})

function myQuery(sql, params) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params || '', (error, result, field) => {
            if (error) {
                reject(error)
            }
            resolve({result, field})
        })
    })
}

function clearTable(){
    return new Promise(async (resolve, reject) => {
        const rst = await myQuery('delete from gzbank_blacklist').catch(e => {
            reject(e)
        })
        resolve(rst)
    })
}

function saveData(jsonData) {
    return new Promise(async (resolve, reject) => {
        try {
            await connection.connect()
            // 插入之前，先清空数据
            await clearTable().catch(e => {
                reject(e.message)
            })

            const sql = 'insert into gzbank_blacklist (mcc) values ?'
            const params = jsonData
            const rst = await myQuery(sql, [params]).catch(e => {
                reject(e.message)
            })
            // console.log(rst.result)
            // jsonData.some(async (element, index) => {
            //     // if (index > 10) {
            //     //     return true
            //     // }
            // })
            // await connection.end()
            resolve('data inserted！')
        } catch(e) {
            // await connection.end()
            reject(e.message)
        } finally {
            await connection.end()
        }
    })
}



module.exports = {
    saveData,
}