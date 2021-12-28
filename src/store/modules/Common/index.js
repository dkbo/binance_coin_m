import * as fn from '@API/account'
import * as PremiumIndexFn from '@API/PremiumIndex'
Object.assign(fn, PremiumIndexFn)

// 共用資訊
const state = {
    accountList: [],
    accountDList: [],
    premiumIndexList: []
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
                    data.ddd = data2.interestRate
                    data.ccc = (data2.interestRate * data.positionInitialMargin).strip()
                    data.usdPrice = data2.markPrice
                }
                return data
            })
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
