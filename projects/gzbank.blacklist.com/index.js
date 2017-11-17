const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const db = require('./db.js')

// 暂时不用这种方式获取数据
const dom2json = function(domStr) {
    return new Promise((resolve, reject) => {
        try {
            const $ = cheerio.load(domStr)
            let jsonData = []
            // console.log('tr list length: ', $('tr').length)
            // console.log($('#tb').html())
            $('#tb > tr').each((index, element) => {
                // if (index > 10) {
                //     return
                // }
                // console.log('element is: ', element)
                const dataItem = []
                $(element).find('td').each((i, ele) => {
                    // console.log('ele text: ', $(ele).text())
                    dataItem[i] = $(ele).text()
                })
                if (dataItem.length > 0) {
                    jsonData.push(dataItem)
                }
                // console.log('jsonData is: ', jsonData)

                // console.log('innerText is: ', colList[0].text())
            })
            // console.log('data length is: ', jsonData.length)
            resolve(jsonData)
            // console.log('jsonData is: ', jsonData)
        } catch(e) {
            reject(e.message)
        }
    })
}

const start = async function() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // await page.goto('http://r.creditcard.gzcb.com.cn/zzshua/tb.html')
    await page.goto('http://r.creditcard.gzcb.com.cn/zzshua/tb.html', {"waitUntil" : "networkidle2"});
    console.log('page loaded!')
    const pageHtml = await page.content()
    // const jsonData = await dom2json(pageHtml).catch(e => {
    //     console.log(e)
    // })
    const jsonData = await page.evaluate(() => {
        let arrTemp = arr0.concat(arr)
        let arrRst = arrTemp.map(ele => {
            return [ele]
        })
        return arrRst
    })
    const rst = await db.saveData(jsonData).catch(e => {
        console.log(e)
    })
    console.log(rst)
    // console.log(123)
    await page.close()
    await browser.close()
}

start()