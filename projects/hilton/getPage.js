const phantom = require('phantom')
const reqUrl = require('./getUrl')
const getNeeded = require('./getNeededContent')
const getRstJson = require('./getRstJson')
const config = require('./config.json')
// const { reqPathFilter } = require('./../../common/utils')

let getPage = async () => {
    console.info('getPage方法被调用！')
    let url = await reqUrl
    console.log('url is: ',url)

    const instance = await phantom.create()
    const page = await instance.createPage()
    await page.property('viewportSize', { width: 800, height: 600 })
    await page.property('settings', { userAgent: config.userAgent })
    
    await page.on('onResourceRequested', true, function(requestData, networkRequest) {
        console.log('requesting1: ', requestData.url)
    })

    const status = await page.open(url)
    const content = await page.property('content')
    // const neededPart = getNeeded(content)
    const neededPart = getRstJson(content)
    
    await instance.exit()
    
    return neededPart
}

module.exports = getPage