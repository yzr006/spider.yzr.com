let { obj2Params } = require('./../../common/utils')
let config = require('./config.json')

let getUrl = async () => config.baseOrigin + await obj2Params(config.urlParams)

module.exports = getUrl()