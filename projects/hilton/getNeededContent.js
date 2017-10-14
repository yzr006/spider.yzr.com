const cheerio = require('cheerio')

module.exports = htmlText => {
    let $ = cheerio.load(htmlText)
    $('#loadingOverlay').remove()
    $('.flyout').remove()
    $('script').remove()
    
    // console.log('htmlText: ', htmlText)
    
    let rst = $('.search_results').html() || $('body').html() || 'no results.'
    // let rst = $('.search_results') || $('body') || 'no results.'

    return rst
}