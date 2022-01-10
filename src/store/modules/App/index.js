import {getStorage, setStorage} from '@UTIL'
import {Storage} from '@API'
import * as fn from '@API/PremiumIndex'
// 共用資訊
const state = {
    isLoading: false,
    binanceConfig: getStorage(Storage.binanceConfig) || {},
    auth: undefined,
    errors: {}
}

const actions = {
    async [_M.APP_INIT]({ getters, commit, dispatch }) {
        if (getters.isDev) {
            window['gc'] = () => getters.pageGetter
        }
        if (state.binanceConfig.API_KEY) {
            dispatch(_M.AXIOS_SET_HEADERS, state.binanceConfig)
            await dispatch(_M.FETCH, {
                key: 'listenkeyD_U',
                temp: 'listenKey'
            })
            await dispatch(_M.WSS_CONNECT)
        }
    },
    async [_M.FETCH_LOGIN](actions, payload) {
        const { commit, dispatch } = actions
        dispatch(_M.AXIOS_SET_HEADERS, payload)
        commit(_M.SET_TEMP_DATA, {
            temp: 'binanceConfig',
            data: payload
        })
        const res = await dispatch(_M.FETCH, {
            key: 'accountD_R',
            temp: 'auth'
        })
        if (res) {
            setStorage(Storage.binanceConfig, payload)
        } else {
            dispatch(_M.FETCH_LOGOUT)
        }
        return true
    },
    [_M.FETCH_LOGOUT]({ commit }) {
        commit(_M.SET_TEMP_DATA, {temp: 'binanceConfig'})
        setStorage(Storage.binanceConfig, {})
    },
    [_M.SET_LOADING]({ commit }, payload) {
        commit(_M.SET_LOADING, payload)
    }
}
const mutations = {
    // 是否載入中
    [_M.SET_LOADING](state, payload) {
        state.isLoading = payload
    },
    [_M.SET_TEMP_DATA](state, payload = {}) {
        state[payload.temp] = payload.data
    }
}
const getters = {
    route: (state, getters, { route }) => route,
    isLoading: state => state.isLoading,
    isDev: () => process.env.NODE_ENV === 'development',
    binanceConfig: state => state.binanceConfig,
    // (當前頁面)的所有getter
    pageGetter: (state, getters) => getters,
    errors: () => state.errors
}

export default {
    state,
    actions,
    mutations,
    getters
}
