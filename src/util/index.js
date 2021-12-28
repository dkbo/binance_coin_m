import moment from 'moment'

// import base64 from 'hi-base64'
// axios.defaults.withCredentials = true

// export const warnMessageBox = options => ({
//     show: true,
//     zIndex: 2000,
//     type: 'warning',
//     ...options
// })

/**
 * base 64 編碼
 * @param {string} str 要編碼的字串
 */
// export const b64EncodeUnicode = str => base64.encode(str)

// /**
//  * base 64 Bytes 編碼
//  * @param {string} arr 要編碼的字串
//  */
// export const b64EncodeUnicodeBytes = arr => b64EncodeUnicode(new Uint8Array(arr))

// /**
//  * base 64 解碼
//  * @param {string} str 要解碼的字串
//  */
// export const b64DecodeUnicode = str => base64.decode(str)

// /**
//  * base 64 Bytes 解碼
//  * @param {string} str 要解碼的字串
//  */
// export const b64DecodeUnicodeBytes = str => base64.decode.bytes(str)

/**
 * 判斷是否為 json 格式
 * true 轉換成 javascript 可用的格式
 * false 返回空字串
 * @param {string} string json 字串
 */
export const handleJson = string => {
    try {
        return JSON.parse(string)
    } catch (error) {
        return ''
    }
}
/**
 * 設定 localStorage
 * true 返回 localStorage 並進行 json 檢測
 * false 返回空字串
 * @param {string} key localStorage 的 Key
 * @param {string} data 資料
 * @param {boolean} isJson 是否 Json
 */
export const setStorage = (key, data, isJson = true) => {
    if (isJson) {
        localStorage[key] = JSON.stringify(data)
        return
    }
    localStorage[key] = data
}

/**
 * 取得 localStorage 並判斷有無
 * true 返回 localStorage 並進行 json 檢測
 * false 返回空字串
 * @param {string} key localStorage 的 Key
 * @param {boolean} isJson 是否 Json
 */
export const getStorage = (key, isJson = true) => {
    try {
        const storage = localStorage[key]
        return isJson ? handleJson(storage) : storage || ''
    } catch (err) {
        return ''
    }
}

/**
 * 取得 Cookie
 * @param {string} cname Cookie Name
 */
export const getCookie = cname => {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
            return decodeURIComponent(c.substring(name.length, c.length))
        }
    }
    return ''
}

/**
 * 深複製
 * @param {any} state 要複製的資料
 */
export const returnState = data => JSON.parse(JSON.stringify(data))

/**
 * 千分號逗點
 * @param {string|number} number 金額
 */
export const thousandComma = number => {
    let num = returnState(number)
    num = parseFloat(num).toFixed(2)
    const pattern = /(-?\d+)(\d{3})/

    while (pattern.test(num)) {
        num = num.replace(pattern, '$1,$2')
    }
    return num
}
/**
 * 千分號逗點/小數點最多五位
 * @param {string|number} number 金額
 */
export const formatNumber = (number, dit = 6) => {
    const pattern = /(\d+)(\d{3})/
    const tails = /\.?0*$/
    // let num = returnState(number)
    let num = parseFloat(number)
        .toFixed(dit)
        .replace(tails, '')
        .split('.')

    while (pattern.test(num[0])) {
        num[0] = num[0].replace(pattern, '$1,$2')
    }

    num = num.join('.')
    return num === 'NaN' ? '' : num
}

export const formatDate = data => {
    if (data) {
        const split = data.split(' ')
        const date = split[0]
        const time = split[1]
        return moment(date).format('MM-DD-YYYY') + '\n' + time
    }
    return ''
}
