module.exports = {
    obj2Params(obj){
        return new Promise((resolve, reject) => {
            let rst = ''
            Object.keys(obj).forEach(val => {
                // console.log('current value is: ', obj[val])
                rst += `${val}=${obj[val]}&`
            })
            resolve(rst)
        })
    },
    reqPathFilter(path){
        let keyWordsReg = [/^.*\.js.*$/, /^.*\.css.*$/]
        for(let reg of keyWordsReg){
            if(reg.test(path)){
                return false
            }
        }
        return true
    }
}