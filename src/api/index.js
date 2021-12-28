const url = (path) => `https://api.binance.com/${path}`
const durl = (path) => `https://dapi.binance.com/${path}`

// ApiFn
export let API = {
    // 現貨 api
    1: {
        // 無權限
        apiRestrictions: {
            method: 'get',
            url: url('sapi/v1/account/apiRestrictions'),
            msg: '查詢用戶API Key權限'
        },
        // 無權限
        account: {
            method: 'get',
            url: url('sapi/v1/capital/config/getall'),
            msg: '現貨帳户資料'
        },
        accountConfig: {
            method: 'get',
            url: url('api/v3/account'),
            msg: '現貨帳户資料'
        },
        order: {
            method: 'post',
            url: url('api/v3/order'),
            msg: '現貨交易'
        },
        orderTest: {
            method: 'post',
            url: url('api/v3/order/test'),
            msg: '現貨交易(測試)'
        },
        transfer: {
            method: 'post',
            url: url('sapi/v1/futures/transfer'),
            msg: '劃轉'
        }
    },
    3: {
        // 幣本位API
        account: {
            method: 'get',
            url: durl('dapi/v1/account'),
            msg: '幣本位帳户資料'
        },
        income: {
            method: 'get',
            url: durl('dapi/v1/income'),
            msg: '獲取賬戶損益資金流水'
        },
        order: {
            method: 'post',
            url: durl('dapi/v1/order'),
            msg: '幣本位合約交易'
        },
        orderTest: {
            method: 'post',
            url: durl('dapi/v1/order/test'),
            msg: '幣本位合約(測試)'
        },
        leverage: {
            method: 'post',
            url: durl('dapi/v1/leverage'),
            msg: '調整開倉槓桿'
        },
        premiumIndex: {
            method: 'get',
            url: durl('dapi/v1/premiumIndex'),
            msg: '最新現貨指數價格和'
        },
        fundingRate: {
            method: 'get',
            url: durl('dapi/v1/fundingRate'),
            msg: '查詢永續合約資金費率歷史'
        }
    }
}

export const Storage = {
    // locale: 'locale'
    binanceConfig: 'binanceConfig'
}
export const Forage = {}
