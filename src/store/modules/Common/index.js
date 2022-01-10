import * as fn from '@API/account'
import * as PremiumIndexFn from '@API/PremiumIndex'
import * as listenkeyFn from '@API/listenkey'
Object.assign(fn, PremiumIndexFn, listenkeyFn)

// 共用資訊
const state = {
    accountList: [],
    accountDList: [],
    premiumIndexList: [],
    tickers: {},
    tickers2: {},
    listenKey: ''
}

const actions = {
    async [_M.FETCH](action, payload) {
        const { key, ...obj } = payload
        const res = await fn[key](action, obj)
        return res
    },
    [_M.SET_TEMP_DATA]({ commit }, payload) {
        commit(_M.SET_TEMP_DATA, payload)
    }
}
const mutations = {
    [_M.SET_TEMP_DATA](state, payload = {}) {
        state[payload.temp] = payload.data
    }
}
const getters = {
    accountList: state => state.accountList,
    accountDList: state => state.accountDList,
    accountAssetsD: state => state.accountDList.assets || [],
    premiumIndexList: state => state.premiumIndexList.filter(({symbol}) => symbol.includes('_PERP')),
    marketUSDList: (state, getters) => {
        const obj = {}
        getters.premiumIndexList.forEach((data) => (obj[data.pair.replace('USD', '')] = data.markPrice))
        return obj
    },
    filterAccountDListAssets: (state, getters) => {
        return getters.accountAssetsD
            .filter(({walletBalance}) => +walletBalance)
            .map((data) => {
                const data2 = state.premiumIndexList.find(({symbol}) => symbol === `${data.asset}USD_PERP`)
                if (data2) {
                    data.lastFundingRate = data2.lastFundingRate
                    data.lastFundingCount = (data2.lastFundingRate * data.positionInitialMargin).strip()
                    data.usdPrice = data2.markPrice
                }
                return data
            })
    },
    listenKey: state => state.listenKey,
    tickers: state => state.tickers,
    tickers2: state => state.tickers2
}

export default {
    state,
    actions,
    mutations,
    getters
}
