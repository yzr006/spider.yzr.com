module.exports = {
    development: {
        connectionLimit : 20,
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'spider_yzr',
    },
    production: {
        connectionLimit : 20,
        host: 'localhost',
        port: '3306',
        user: 'admin',
        password: 'Admin001+-*/',
        database: 'yzr_spider',
    },
}