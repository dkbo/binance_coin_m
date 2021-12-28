import { API } from '@API'

export const account_R = ({ dispatch, commit }, payload) => {
    const params = payload
    const { temp } = payload
    delete params.temp
    const data = [
        API[1].account,
        { params }
    ]
    dispatch(_M.AXIOS, data, { root: true }).then((data) => {
        commit(_M.SET_TEMP_DATA, {temp, data})
        commit(_M.SET_LOADING, false, { root: true })
    })
}

export const accountD_R = async ({ dispatch, commit }, payload) => {
    const params = payload
    const { temp } = payload
    delete params.temp
    const data = [
        API[3].account,
        { params }
    ]
    const res = await dispatch(_M.AXIOS, data, { root: true }).then((data) => {
        commit(_M.SET_TEMP_DATA, {temp, data})
        commit(_M.SET_LOADING, false, { root: true })
        return data
    })
    return res
}

export const accountAPI_R = ({ dispatch, commit }, payload) => {
    const params = payload
    const { temp } = payload
    delete params.temp
    const data = [
        API[1].apiRestrictions,
        { params }
    ]
    dispatch(_M.AXIOS, data, { root: true }).then((data) => {
        commit(_M.SET_TEMP_DATA, {temp, data})
        commit(_M.SET_LOADING, false, { root: true })
    })
}