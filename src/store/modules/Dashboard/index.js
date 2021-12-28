import * as fn from '@API/account'
// 共用資訊
const state = {
}

const actions = {
    async [_M.FETCH](action, payload) {
        const { key, ...obj } = payload
        const res = await fn[key](action, obj)
        return res
    },
    [_M.RESET]({ commit }) {
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

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
