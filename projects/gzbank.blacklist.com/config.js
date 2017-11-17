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
        host: '65.49.203.30',
        port: '3306',
        user: 'admin',
        password: 'admin',
        database: 'spider_yzr',
    },
}