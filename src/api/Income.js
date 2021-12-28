import { API } from '@API'

/**
"TRANSFER",
"WELCOME_BONUS",
"FUNDING_FEE",  資金費率
"REALIZED_PNL",
"COMMISSION", 手續費
"INSURANCE_CLEAR",
"DELIVERED_SETTELMENT"
 */
export const incomeD_R = ({ dispatch, commit }, payload) => {
    const params = payload
    const { temp } = payload
    delete params.temp
    const data = [
        API[3].income,
        { params }
    ]
    dispatch(_M.AXIOS, data, { root: true }).then((data) => {
        commit(_M.SET_TEMP_DATA, {temp, data: data.reverse()})
        commit(_M.SET_LOADING, false, { root: true })
    })
}