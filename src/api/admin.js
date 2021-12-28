import { API } from '@API'

export const admin_C = async ({ dispatch }, payload) => {
    const data = [
        _M.POST,
        API.admin,
        payload
    ]
    const res = await dispatch(_M.AXIOS, data, { root: true })
    return res
}

export const admin_R = ({ dispatch, commit }, payload) => {
    const params = payload
    const data = [
        _M.GET,
        API.admin,
        { params }
    ]
    dispatch(_M.AXIOS, data, { root: true }).then(({ data, ...page }) => {
        commit(_M.SET_TABLE_DATA, data)
        commit(_M.SET_PAGES, page)
        commit(_M.SET_LOADING, false, { root: true })
    })
}
export const admin_U = async ({ dispatch }, payload) => {
    const data = [
        _M.PUT,
        `${API.admin}/${payload.id}`,
        payload
    ]
    const res = await dispatch(_M.AXIOS, data, { root: true })
    return res
}
