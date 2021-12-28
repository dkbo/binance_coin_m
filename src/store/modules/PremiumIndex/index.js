import * as fn from '@API/PremiumIndex'
// 共用資訊
const state = {
    list: []
}

const actions = {
    async [_M.FETCH](action, payload) {
        const { key, ...obj } = payload
        const res = await fn[key](action, obj)
        return res
    },
    [_M.RESET]({ commit }) {
        commit(_M.SET_TEMP_DATA, {temp: 'list', data: []})
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
    list: state => state.list
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
