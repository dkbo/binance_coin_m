import { API } from '@API'

export const PremiumIndexD_R = ({ dispatch, commit }, payload) => {
    const params = payload
    const { temp } = payload
    delete params.temp
    const data = [
        API[3].premiumIndex,
        { params }
    ]
    dispatch(_M.AXIOS, data, { root: true }).then((data) => {
        commit(_M.SET_TEMP_DATA, {temp, data})
        commit(_M.SET_LOADING, false, { root: true })
    })
}