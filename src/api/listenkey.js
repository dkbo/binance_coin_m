import { API } from '@API'

export const listenkeyD_U = async ({ dispatch, commit }, payload) => {
    const params = payload
    const { temp } = payload
    delete params.temp
    const data = [
        API[3].listenKey,
        { params }
    ]
    const res = await dispatch(_M.AXIOS, data, { root: true }).then(({listenKey}) => {
        commit(_M.SET_TEMP_DATA, {temp, data: listenKey})
        commit(_M.SET_LOADING, false, { root: true })
        return data
    })
    return res
}