//爬虫的主要业务逻辑模块
const phantom = require('phantom')
const cheerio = require('cheerio')

const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
// const urlStr = 'https://read.douban.com/kind/105?start=0&sort=hot'

/**
 * 从每一页的html代码中，提取需要的数据，拼装成json
 * @param {string} htmlText 
 * @param {string} pageNum 
 */
function html2json(htmlText, pageNum) {
    const $ = cheerio.load(htmlText)
    let booksList = []

    return new Promise((resolve, reject) => {
        $('.ebook-list').find('.store-item').each((index, ele) => {
            booksList.push({
                order: `${pageNum}_${index + 1}`,
                name: $(ele).find('.title > a').text(),
                price: $(ele).find('.discount-price').text() || $(ele).find('.price-tag').text(),
                author: $(ele).find('.author-item').text(),
                rating: $(ele).find('.rating-average').text() || '0',
                rateCount: $(ele).find('.ratings-link > span').text(),
                desc: $(ele).find('.article-desc-brief').text(),
            })
        })
        // resolve(JSON.stringify(booksList))
        resolve(booksList)
    })
}

/**
 * 主要抓取逻辑函数
 * @param {string} maxPage
 */
async function getPageData(maxPage) {
    // 定义一个存储返回结果的数组
    let rstArr = []

    // 创建一个phantom实例，传入一些创建参数
    const instance = await phantom.create([
        '--ignore-ssl-errors=yes',
        '--load-images=no',
        '--web-security=false',
    ])

    // 用phantom实例，创建一个页面实例
    const page = await instance.createPage()
    // 设置浏览器页面的宽高
    await page.property('viewportSize', { width: 1024, height: 768 })
    // 设置浏览器的UA，可以防范一些反爬虫措施
    await page.property('settings', { 
        userAgent: userAgent,
    })
    
    // 根据传入的最大页数，循环抓取数据
    for(let i = 1; i <= maxPage; i++){
        // 生成抓取页面的url
        let url = `https://read.douban.com/kind/105?start=${(i - 1) * 20}&sort=hot`
        
        // 打开页面
        const status = await page.open(url)
        // 获取页面的html内容
        const content = await page.property('content')
        // 用cheerio加载页面内容，方便使用jq语法获取各种元素
        const $ = cheerio.load(content)
        
        // 获取页面内容转换成的，由所需信息转换成的对象数组
        const currentArr = await html2json($('article.col').html(), i).catch(e => {
            console.log(e.toString())
        })
        // 循环结束时，把结果拼到一起
        rstArr = rstArr.concat(currentArr)
    }

    // 关闭phantom实例
    await instance.exit()
    
    // 返回一个promise异步对象
    return new Promise((resolve, reject) => {
        // 处理一些自定义数据逻辑

        // 按评分排序
        rstArr.sort((a, b) => {
            if(a.rating < b.rating){
                return -1
            }
            if(a.rating > b.rating){
                return 1
            }
            return 0
        })

        // 过滤出几个前端关键词
        // rstArr = rstArr.filter(item => {
        //     return item.name.indexOf('js') > -1 || item.name.indexOf('css') > -1 || item.name.indexOf('html') > -1
        // })

        resolve(JSON.stringify(rstArr))
    })
}

/**
 * 出口函数
 */
async function getSpiderResult() {
    // 设定最大抓取页数，调用getPageData，返回结果
    return await getPageData(2).catch(e => {
        console.log(e.toString())
    })
}

module.exports = getSpiderResult()