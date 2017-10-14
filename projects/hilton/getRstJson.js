const cheerio = require('cheerio')
const getHtmlObj = require('./getNeededContent')

module.exports = (htmlText) => {
    let $ = cheerio.load(getHtmlObj(htmlText))
    let rstArr = []
    const resultDoms = $('.search_results').find('div.result')
    // console.log('resultDoms is:', resultDoms)
    // Object.keys(resultDoms).forEach(key => {
    //     // resultDoms[key]
    //     rstArr.push({title: resultDoms[key].find('h2').text()})
    // })
    resultDoms.each(function(i, ele){
        // console.log('ele is: ', ele)
        rstArr.push({title: $(this).find('h2').text()})
    })

    return rstArr.length || 'No Results.'
}