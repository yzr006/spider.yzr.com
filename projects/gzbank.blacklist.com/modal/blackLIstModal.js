const Sequelize = require('sequelize')

module.exports = {
    'mmc': {
        'type': Sequelize.STRING, // 字段类型
        'allowNull': true,         // 是否允许为NULL
    },
    'createDate': {
        'type': Sequelize.STRING, // 字段类型
        'allowNull': true,         // 是否允许为NULL
    },
}